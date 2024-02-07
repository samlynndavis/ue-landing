import React from 'react';
import Seo from '../components/Seo';
import Link from '../components/Link';
import Logo from '../components/Logo';
import BlockContent from '@sanity/block-content-to-react';

import {getSiteData, getContactPage, getContactPageDraft} from '../api/sanity';

import reduce from 'lodash/reduce';
import richText from '../serializers/richText';

export const getStaticProps = async ({preview, previewData}) => {
	const pageRequest = preview
		? getContactPageDraft(previewData.draftId)
		: getContactPage();

	const [site, contactpage] = await Promise.all([getSiteData(), pageRequest]);

	return {
		props: {
			...site,
			...contactpage,
		},
		revalidate: 60,
	};
};

const ContactPage = ({config = {}, seo = {}, team = [], links = []}) => {
	const defaultMeta = config?.seo || seo || {};

	const fallbackMeta = {
		metaTitle: 'Contact - Universal Element®',
		openGraphTitle: 'Contact - Universal Element®',
		twitterTitle: 'Contact - Universal Element®',
		openGraphImage: defaultMeta?.openGraphImage,
		twitterImage: defaultMeta?.twitterImage,
	};

	const meta = reduce(
		[defaultMeta, fallbackMeta, seo],
		(meta = {}, metaObject = {}) => {
			const newMeta = {...meta};
			const keys = Object.keys(metaObject || {});

			keys.forEach(key => {
				if (!metaObject[key]) return; // Avoid null values
				newMeta[key] = metaObject[key];
			});

			return newMeta;
		},
		{},
	);

	const {address, phone, email} = config;

	const contactSection = (
		<div className="grid col-span-4 1000:col-span-4 1000:col-start-5 grid-cols-1 gap-45 1000:gap-36 1000:text-center mt-150 1000:mt-150">
			<div className="col-span-1 text-center">
				<Logo className="h-28 w-auto mx-auto" />
			</div>
			<div className="col-span-1 flex gap-50 1000:gap-28 mx-auto">
				<div className="col-span-1">
					{address && (
						<div className="text-14 leading-16 rich-text line-break text-center">
							<BlockContent
								blocks={address}
								serializers={richText}
							/>
						</div>
					)}
				</div>

				<div className="col-span-1 text-center">
					<Link
						title="Call us"
						className="block text-14 leading-16 link--underline--hover w-fit mx-auto"
						url={`tel:${phone}`}>
						{phone}
					</Link>
					<Link
						title="Email us"
						className="block text-14 leading-16 link--underline--hover w-fit mx-auto"
						url={`mailto:${email}`}>
						{email}
					</Link>
				</div>
			</div>
		</div>
	);

	const teamInfoElement = team && (
		<div className="mt-78 1000:mt-116 col-span-4 1000:col-span-8 1000:col-start-3 grid grid-cols-4 1000:grid-cols-8 gap-54 1000:gap-y-82">
			{team.map(({_key, name, title, phone, email}) => (
				<div
					key={_key}
					className="col-span-4 1000:col-span-2 text-14 text-center">
					<p className="font-serif text-24 leading-27 whitespace-nowrap">
						{name}
					</p>
					<p className="mt-20 1000:mt-24 text-14 leading-16 font-serif italic">
						{title}
					</p>
					<Link
						title="Call us"
						className="mt-5 block text-14 leading-16 link--underline--hover w-fit mx-auto"
						url={`tel:${phone}`}>
						{phone}
					</Link>
					<Link
						title="Email us"
						className="mt-5 block text-14 leading-16 link--underline--hover w-fit mx-auto"
						url={`mailto:${email}`}>
						{email}
					</Link>
				</div>
			))}
			{links && (
				<div className="col-span-4 1000:col-span-8 text-center">
					<p className="font-serif text-14 leading-16 1000:text-24 1000:leading-24 italic">
						@
					</p>
					<div className="mt-9 1000:mt-20 flex flex-col 1000:flex-row justify-center gap-10">
						{links.map(({_key, ...link}) => (
							<Link
								key={_key}
								{...link}
								className="block text-14 leading-16 link--underline--hover w-fit mx-auto 1000:mx-0"
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);

	return (
		<React.Fragment>
			<Seo {...meta} />
			<section className="grid grid-cols-4 1000:grid-cols-12 px-16 pb-60 gap-20">
				{contactSection}
				{teamInfoElement}
			</section>
		</React.Fragment>
	);
};

export default ContactPage;
