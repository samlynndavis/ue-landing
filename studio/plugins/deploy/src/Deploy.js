import React, {useState, useEffect} from 'react';
import {nanoid} from 'nanoid';
import axios from 'axios';
import client from 'part:@sanity/base/client';
import {
	studioTheme,
	ThemeProvider,
	ToastProvider,
	useToast,
	Box,
	Card,
	Stack,
	Heading,
	Button,
	Spinner,
	Dialog,
	TextInput,
	Label,
	Flex,
	KBD,
} from '@sanity/ui';
import {AddIcon, ArrowRightIcon} from '@sanity/icons';

const WEBHOOK_TYPE = 'webhook_deploy';
const WEBHOOK_QUERY = `*[_type == "${WEBHOOK_TYPE}"] | order(_createdAt)`;

const MIGRATION_TYPE = 'sanity_db_migration';
const MIGRATION_QUERY = `*[_type == "${MIGRATION_TYPE}"] | order(_createdAt)`;

//
// === Deploy Item ===
//

const DeployItem = ({hook}) => {
	const toast = useToast();
	const [lastDeploy, setLastDeploy] = useState(nanoid());
	const [isDeleting, setIsDeleting] = useState(false);
	const [isConfirmOpen, setConfirmOpen] = useState(false);

	const onDelete = async () => {
		setIsDeleting(true);

		try {
			await client.delete(hook._id);
		} catch (error) {
			toast.push({
				status: 'error',
				title: 'An error occured in deleting this webhook.',
			});
		}

		setIsDeleting(false);

		toast.push({
			status: 'success',
			title: `Deleted ${hook.title}!`,
		});

		setConfirmOpen(false);
	};

	const onDeploy = async () => {
		try {
			await axios.post(hook.url, {});
		} catch (error) {
			toast.push({
				status: 'error',
				title: 'An error occured in deploying this webhook.',
			});
		}

		setLastDeploy(nanoid());

		toast.push({
			status: 'success',
			title: `Deployed ${hook.title}!`,
		});
	};

	const confirmDialog = isConfirmOpen && (
		<Dialog
			width={1}
			header={`Delete ${hook.title}`}
			onClose={() => setConfirmOpen(false)}>
			<Box padding={4} paddingTop={0}>
				<Box marginBottom={4}>
					<p>
						This deletes your deploy button, but will not delete the
						environment. This is a permanent action. You'll need to
						re-add this environment.
					</p>
				</Box>
				{isDeleting ? (
					<Spinner />
				) : (
					<Button
						tone="critical"
						text="Permanently Delete"
						onClick={onDelete}
					/>
				)}
			</Box>
		</Dialog>
	);

	return (
		<Card padding={4} radius={2} shadow={1}>
			<Flex justify="space-between" align="center">
				<Flex justify="flex-start" align="center">
					<p style={{margin: 0}}>{hook.title || 'Netlify'}</p>
					<Box marginLeft={2}>
						<KBD style={{display: 'block'}}>{hook.url}</KBD>
					</Box>
					<Box marginLeft={2}>
						<img
							key={lastDeploy}
							src={hook.statusBadgeUrl}
							style={{display: 'block'}}
						/>
					</Box>
				</Flex>
				<Flex justify="flex-end" align="center">
					<Box>
						<Button
							tone="critical"
							text="Delete"
							onClick={() => setConfirmOpen(true)}
						/>
					</Box>
					<Box marginLeft={2}>
						<Button
							tone="primary"
							text="Start Deploy"
							onClick={onDeploy}
						/>
					</Box>
				</Flex>
			</Flex>
			{confirmDialog}
		</Card>
	);
};

//
// === List of Deploys ===
//

const DeployList = () => {
	const [isLoadingInitialList, setIsLoading] = useState(false);
	const [activeDeletingId, setActiveDeletingId] = useState(null);
	const [webhooks, setWebhooks] = useState([]);

	const fetchInitialList = () => {
		setIsLoading(true);

		client.fetch(WEBHOOK_QUERY).then(webhooks => {
			setWebhooks(webhooks);
			setIsLoading(false);
		});
	};

	const onSubscriptionUpdate = async res => {
		const wasCreated = res.mutations.some(item =>
			Object.prototype.hasOwnProperty.call(item, 'create'),
		);
		const wasDeleted = res.mutations.some(item =>
			Object.prototype.hasOwnProperty.call(item, 'delete'),
		);

		if (wasCreated) {
			setWebhooks([...webhooks, res.result]);
		} else if (wasDeleted) {
			setWebhooks(webhooks.filter(hook => hook._id !== res.documentId));
		}
	};

	// Fetch all to start
	useEffect(fetchInitialList, []);

	// Listen to webhook changes
	useEffect(() => {
		const subscription = client
			.listen(WEBHOOK_QUERY, {}, {includeResult: true})
			.subscribe(onSubscriptionUpdate);

		// Unsubscribe
		return () => {
			subscription.unsubscribe();
		};
	}, [onSubscriptionUpdate]);

	return isLoadingInitialList ? (
		<Box marginY={4}>
			<Spinner />
		</Box>
	) : (
		<Stack space={4}>
			{webhooks.map(hook => (
				<DeployItem key={hook._id} hook={hook} />
			))}
			{!webhooks.length && (
				<Card padding={4} radius={2} shadow={1}>
					There are no environments yet.
				</Card>
			)}
		</Stack>
	);
};

//
// === New Hooks Modal ===
//

const NewWebhookModal = ({onClose}) => {
	const toast = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [pendingHook, setPendingHook] = useState({
		title: '',
		url: '',
		statusBadgeUrl: '',
	});
	const isFormDisabled =
		!pendingHook.title || !pendingHook.url || !pendingHook.statusBadgeUrl;

	const onCloseNewModal = () => {
		onClose(false);
	};

	const onSubmit = async event => {
		event.preventDefault();

		setIsLoading(true);

		try {
			await client.create({
				_id: `netlify-deploy.${nanoid()}`,
				_type: WEBHOOK_TYPE,
				title: pendingHook.title,
				url: pendingHook.url,
				statusBadgeUrl: pendingHook.statusBadgeUrl,
			});
		} catch (error) {
			toast.push({
				status: 'error',
				title: 'An error occured in creating this webhook.',
			});
		}

		setIsLoading(false);

		toast.push({
			status: 'success',
			title: `Added ${pendingHook.title}!`,
		});

		onCloseNewModal();
	};

	return (
		<Dialog
			width={1}
			header="New Netlify Enviroment"
			onClose={onCloseNewModal}>
			<Box padding={4}>
				<form onSubmit={onSubmit}>
					<Stack space={5}>
						<Box>
							<Box marginBottom={3}>
								<Label>Title</Label>
							</Box>
							<TextInput
								value={pendingHook.title}
								onChange={event =>
									setPendingHook({
										...pendingHook,
										title: event.target.value,
									})
								}
							/>
						</Box>
						<Box>
							<Box marginBottom={3}>
								<Label>URL</Label>
							</Box>
							<TextInput
								value={pendingHook.url}
								onChange={event =>
									setPendingHook({
										...pendingHook,
										url: event.target.value,
									})
								}
							/>
						</Box>
						<Box>
							<Box marginBottom={3}>
								<Label>Status Badge URL</Label>
							</Box>
							<TextInput
								value={pendingHook.statusBadgeUrl}
								onChange={event =>
									setPendingHook({
										...pendingHook,
										statusBadgeUrl: event.target.value,
									})
								}
							/>
						</Box>
						<Box>
							{isLoading ? (
								<Spinner />
							) : (
								<Button
									disabled={isFormDisabled}
									type="submit"
									tone="primary"
									text={
										isFormDisabled
											? 'Fill out required fields.'
											: 'Create'
									}
								/>
							)}
						</Box>
					</Stack>
				</form>
			</Box>
		</Dialog>
	);
};

//
// === Migration Item ===
//

const MigrationItem = ({migration}) => {
	const toast = useToast();
	const [isDeleting, setIsDeleting] = useState(false);
	const [isConfirmOpen, setConfirmOpen] = useState(false);

	const onDelete = async () => {
		setIsDeleting(true);

		try {
			await client.delete(migration._id);
		} catch (error) {
			toast.push({
				status: 'error',
				title: 'An error occured in deleting this migration.',
			});
		}

		setIsDeleting(false);

		toast.push({
			status: 'success',
			title: `Deleted ${migration.source} -> ${migration.endpoint}!`,
		});

		setConfirmOpen(false);
	};

	const onMigrate = async () => {
		try {
			await axios.post(
				migration.url,
				{event_type: migration.type},
				{
					headers: {
						Accept: 'application/vnd.github.everest-preview+json',
						Authorization: `token ${migration.apiKey}`,
					},
				},
			);

			console.log('sup');

			toast.push({
				status: 'success',
				title: `Started migration!`,
			});
		} catch (error) {
			toast.push({
				status: 'error',
				title: 'An error occured in starting this migration.',
			});
		}
	};

	const confirmDialog = isConfirmOpen && (
		<Dialog
			width={1}
			header={`Delete ${migration.source} -> ${migration.endpoint}`}
			onClose={() => setConfirmOpen(false)}>
			<Box padding={4} paddingTop={0}>
				<Box marginBottom={4}>
					<p>
						This deletes your migrate button, but will not delete
						the environment. This is a permanent action. You'll need
						to re-add this environment.
					</p>
				</Box>
				{isDeleting ? (
					<Spinner />
				) : (
					<Button
						tone="critical"
						text="Permanently Delete"
						onClick={onDelete}
					/>
				)}
			</Box>
		</Dialog>
	);

	return (
		<Card padding={4} radius={2} shadow={1}>
			<Flex justify="space-between" align="center">
				<Flex
					justify="flex-start"
					align="center"
					style={{width: '50%'}}>
					<Box>
						<Box marginBottom={2}>
							<Flex justify="flex-start" align="center">
								<KBD style={{display: 'block'}}>
									{migration.source}
								</KBD>
								<ArrowRightIcon />
								<KBD style={{display: 'block'}}>
									{migration.endpoint}
								</KBD>
								<Box marginLeft={2}>
									<img
										src={migration.statusBadgeUrl}
										style={{display: 'block'}}
									/>
								</Box>
							</Flex>
						</Box>
						<Box marginBottom={2}>
							<KBD style={{wordBreak: 'break-word'}}>
								{migration.type}
							</KBD>
						</Box>
						<Box marginBottom={2}>
							<KBD style={{wordBreak: 'break-word'}}>
								{migration.url}
							</KBD>
						</Box>
						<KBD
							style={{display: 'block', wordBreak: 'break-word'}}>
							{migration.apiKey}
						</KBD>
					</Box>
				</Flex>
				<Flex justify="flex-end" align="center">
					<Box>
						<Button
							tone="critical"
							text="Delete"
							onClick={() => setConfirmOpen(true)}
						/>
					</Box>
					<Box marginLeft={2}>
						<Button
							tone="primary"
							text="Start Migration"
							onClick={onMigrate}
						/>
					</Box>
				</Flex>
			</Flex>
			{confirmDialog}
		</Card>
	);
};

//
// === List of Migrations ===
//

const MigrationList = () => {
	const [isLoadingInitialList, setIsLoading] = useState(false);
	const [activeDeletingId, setActiveDeletingId] = useState(null);
	const [migrations, setMigrations] = useState([]);

	const fetchInitialList = () => {
		setIsLoading(true);

		client.fetch(MIGRATION_QUERY).then(migrations => {
			setMigrations(migrations);
			setIsLoading(false);
		});
	};

	const onSubscriptionUpdate = async res => {
		const wasCreated = res.mutations.some(item =>
			Object.prototype.hasOwnProperty.call(item, 'create'),
		);
		const wasDeleted = res.mutations.some(item =>
			Object.prototype.hasOwnProperty.call(item, 'delete'),
		);

		if (wasCreated) {
			setMigrations([...migrations, res.result]);
		} else if (wasDeleted) {
			setMigrations(
				migrations.filter(
					migrations => migrations._id !== res.documentId,
				),
			);
		}
	};

	// Fetch all to start
	useEffect(fetchInitialList, []);

	// Listen to webhook changes
	useEffect(() => {
		const subscription = client
			.listen(MIGRATION_QUERY, {}, {includeResult: true})
			.subscribe(onSubscriptionUpdate);

		// Unsubscribe
		return () => {
			subscription.unsubscribe();
		};
	}, [onSubscriptionUpdate]);

	return isLoadingInitialList ? (
		<Box marginY={4}>
			<Spinner />
		</Box>
	) : (
		<Stack space={4}>
			{migrations.map(migration => (
				<MigrationItem key={migration._id} migration={migration} />
			))}
			{!migrations.length && (
				<Card padding={4} radius={2} shadow={1}>
					There are no migrations yet.
				</Card>
			)}
		</Stack>
	);
};

//
// === New Migration Modal ===
//

const NewMigrationModal = ({onClose}) => {
	const toast = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [pendingMigration, setPendingMigration] = useState({
		source: '',
		endpoint: '',
		url: '',
		type: '',
		apiKey: '',
	});
	const isFormDisabled =
		!pendingMigration.source ||
		!pendingMigration.endpoint ||
		!pendingMigration.statusBadgeUrl ||
		!pendingMigration.url ||
		!pendingMigration.type ||
		!pendingMigration.apiKey;

	const onCloseNewModal = () => {
		onClose(false);
	};

	const onSubmit = async event => {
		event.preventDefault();

		setIsLoading(true);

		try {
			await client.create({
				_id: `netlify-db-migration.${nanoid()}`,
				_type: MIGRATION_TYPE,
				source: pendingMigration.source,
				endpoint: pendingMigration.endpoint,
				statusBadgeUrl: pendingMigration.statusBadgeUrl,
				url: pendingMigration.url,
				type: pendingMigration.type,
				apiKey: pendingMigration.apiKey,
			});
		} catch (error) {
			toast.push({
				status: 'error',
				title: 'An error occured in creating this migration.',
			});
		}

		setIsLoading(false);

		toast.push({
			status: 'success',
			title: `Added ${pendingMigration.source} -> ${pendingMigration.endpoint}!`,
		});

		onCloseNewModal();
	};

	return (
		<Dialog
			width={1}
			header="New Sanity Migration"
			onClose={onCloseNewModal}>
			<Box padding={4}>
				<form onSubmit={onSubmit}>
					<Stack space={5}>
						<Box>
							<Box marginBottom={3}>
								<Label>Sanity Dataset (Source)</Label>
							</Box>
							<TextInput
								value={pendingMigration.source}
								onChange={event =>
									setPendingMigration({
										...pendingMigration,
										source: event.target.value,
									})
								}
							/>
						</Box>
						<Box>
							<Box marginBottom={3}>
								<Label>Sanity Dataset (Endpoint)</Label>
							</Box>
							<TextInput
								value={pendingMigration.endpoint}
								onChange={event =>
									setPendingMigration({
										...pendingMigration,
										endpoint: event.target.value,
									})
								}
							/>
						</Box>
						<Box>
							<Box marginBottom={3}>
								<Label>Github Action URL</Label>
							</Box>
							<TextInput
								value={pendingMigration.url}
								onChange={event =>
									setPendingMigration({
										...pendingMigration,
										url: event.target.value,
									})
								}
							/>
						</Box>
						<Box>
							<Box marginBottom={3}>
								<Label>Status Badge URL</Label>
							</Box>
							<TextInput
								value={pendingMigration.statusBadgeUrl}
								onChange={event =>
									setPendingMigration({
										...pendingMigration,
										statusBadgeUrl: event.target.value,
									})
								}
							/>
						</Box>
						<Box>
							<Box marginBottom={3}>
								<Label>Github Action Type</Label>
							</Box>
							<TextInput
								value={pendingMigration.type}
								onChange={event =>
									setPendingMigration({
										...pendingMigration,
										type: event.target.value,
									})
								}
							/>
						</Box>
						<Box>
							<Box marginBottom={3}>
								<Label>
									Github Action Personal Access Token
								</Label>
							</Box>
							<TextInput
								value={pendingMigration.apiKey}
								onChange={event =>
									setPendingMigration({
										...pendingMigration,
										apiKey: event.target.value,
									})
								}
							/>
						</Box>
						<Box>
							{isLoading ? (
								<Spinner />
							) : (
								<Button
									disabled={isFormDisabled}
									type="submit"
									tone="primary"
									text={
										isFormDisabled
											? 'Fill out required fields.'
											: 'Create'
									}
								/>
							)}
						</Box>
					</Stack>
				</form>
			</Box>
		</Dialog>
	);
};

//
// === Main App ===
//

const Deploy = () => {
	const [isNewWebhookModalOpen, setNewWebhookModalOpen] = useState(false);
	const [isNewMigrationModalOpen, setNewMigrationModalOpen] = useState(false);

	const netlifyEnvironments = (
		<Box padding={4}>
			<Box marginY={4}>
				<Heading as="h1" size={2}>
					Netlify Environments
				</Heading>
			</Box>
			<DeployList />
			<Box marginTop={4}>
				<Button
					icon={AddIcon}
					tone="primary"
					text="New Environment"
					onClick={() => setNewWebhookModalOpen(true)}
				/>
			</Box>
		</Box>
	);

	const migrations = (
		<Box padding={4}>
			<Box marginY={4}>
				<Heading as="h1" size={2}>
					Migrations
				</Heading>
			</Box>
			<MigrationList />
			<Box marginTop={4}>
				<Button
					icon={AddIcon}
					tone="primary"
					text="New Migration"
					onClick={() => setNewMigrationModalOpen(true)}
				/>
			</Box>
		</Box>
	);

	const newWebhookModal = isNewWebhookModalOpen && (
		<NewWebhookModal onClose={() => setNewWebhookModalOpen(false)} />
	);

	const newMigrationModal = isNewMigrationModalOpen && (
		<NewMigrationModal onClose={() => setNewMigrationModalOpen(false)} />
	);

	return (
		<Box>
			{netlifyEnvironments}
			{newWebhookModal}
			{migrations}
			{newMigrationModal}
		</Box>
	);
};

export default () => (
	<ThemeProvider theme={studioTheme}>
		<ToastProvider>
			<Deploy />
		</ToastProvider>
	</ThemeProvider>
);
