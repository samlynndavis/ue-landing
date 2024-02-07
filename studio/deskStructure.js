import S from '@sanity/desk-tool/structure-builder';
import React from 'react';
import Emoji from 'a11y-react-emoji';
import EyeIcon from 'part:@sanity/base/eye-icon';
import EditIcon from 'part:@sanity/base/edit-icon';
import IframePreview from './admin/components/IframePreview.jsx';

const PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL;
const PREVIEW_TOKEN = process.env.SANITY_STUDIO_CMS_PREVIEW_TOKEN;

const PageIcon = () => <Emoji style={{ fontSize: '2em' }} symbol="📝" />;

//
// === Pages ===
//

const pageMenuItem = S.listItem()
	.title('Pages')
	.schemaType('page')
	.child(
		S.documentTypeList('page')
			.title('Other Pages')
			.child(documentId =>
				S.document()
					.documentId(documentId)
					.schemaType('page')
					.views([
						S.view.form().icon(EditIcon),
						S.view
							.component(IframePreview)
							.options({
								previewURL: PREVIEW_URL,
								token: PREVIEW_TOKEN,
							})
							.title('Draft Preview')
							.icon(EyeIcon),
					]),
			),
	);

const allPageMenuItem = S.listItem()
	.title('Pages')
	.icon(PageIcon)
	.child(
		S.list()
			.title('Pages')
			.items([
				S.listItem()
					.title('Home Page')
					.schemaType('homepage')
					.child(
						S.document()
							.documentId('homepage')
							.schemaType('homepage')
							.views([
								S.view.form().icon(EditIcon),
								S.view
									.component(IframePreview)
									.options({
										previewURL: PREVIEW_URL,
										token: PREVIEW_TOKEN,
									})
									.title('Draft Preview')
									.icon(EyeIcon),
							]),
					),
				S.listItem()
					.title('Work Page')
					.schemaType('workpage')
					.child(
						S.document()
							.documentId('workpage')
							.schemaType('workpage')
							.views([
								S.view.form().icon(EditIcon),
								S.view
									.component(IframePreview)
									.options({
										previewURL: PREVIEW_URL,
										token: PREVIEW_TOKEN,
									})
									.title('Draft Preview')
									.icon(EyeIcon),
							]),
					),
				S.listItem()
					.title('Contact Page')
					.schemaType('contactpage')
					.child(
						S.document()
							.documentId('contactpage')
							.schemaType('contactpage')
							.views([
								S.view.form().icon(EditIcon),
								S.view
									.component(IframePreview)
									.options({
										previewURL: PREVIEW_URL,
										token: PREVIEW_TOKEN,
									})
									.title('Draft Preview')
									.icon(EyeIcon),
							]),
					),
				pageMenuItem,
				S.listItem()
					.title('404 Page')
					.schemaType('notFound')
					.child(
						S.document()
							.documentId('notFound')
							.schemaType('notFound')
							.views([
								S.view.form().icon(EditIcon),
								S.view
									.component(IframePreview)
									.options({
										previewURL: PREVIEW_URL,
										token: PREVIEW_TOKEN,
									})
									.title('Draft Preview')
									.icon(EyeIcon),
							]),
					),
			]),
	);

//
// === Projects ===
//

const projectsMenuItem = S.listItem()
	.title('All Projects')
	.schemaType('project')
	.child(
		S.documentTypeList('project')
			.title('All Projects')
			.child(documentId =>
				S.document()
					.documentId(documentId)
					.schemaType('project')
					.views([
						S.view.form().icon(EditIcon),
						S.view
							.component(IframePreview)
							.options({
								previewURL: PREVIEW_URL,
								token: PREVIEW_TOKEN,
							})
							.title('Draft Preview')
							.icon(EyeIcon),
					]),
			),
	);

//
// === Directors, Agencies, & Production Houses ===
//

const directorsMenuItem = S.listItem()
	.title('All Directors')
	.schemaType('director')
	.child(
		S.documentTypeList('director')
			.title('All Directors')
			.child(documentId =>
				S.document()
					.documentId(documentId)
					.schemaType('director')
					.views([
						S.view.form().icon(EditIcon),
						S.view
							.component(IframePreview)
							.options({
								previewURL: PREVIEW_URL,
								token: PREVIEW_TOKEN,
							})
							.title('Draft Preview')
							.icon(EyeIcon),
					]),
			),
	);

const agenciesMenuItem = S.listItem()
	.title('All Agencies')
	.schemaType('agency')
	.child(
		S.documentTypeList('agency')
			.title('All Agencies')
			.child(documentId =>
				S.document()
					.documentId(documentId)
					.schemaType('agency')
					.views([
						S.view.form().icon(EditIcon),
						S.view
							.component(IframePreview)
							.options({
								previewURL: PREVIEW_URL,
								token: PREVIEW_TOKEN,
							})
							.title('Draft Preview')
							.icon(EyeIcon),
					]),
			),
	);

const productionsMenuItem = S.listItem()
	.title('All Production Companies')
	.schemaType('production')
	.child(
		S.documentTypeList('production')
			.title('All Production Companies')
			.child(documentId =>
				S.document()
					.documentId(documentId)
					.schemaType('production')
					.views([
						S.view.form().icon(EditIcon),
						S.view
							.component(IframePreview)
							.options({
								previewURL: PREVIEW_URL,
								token: PREVIEW_TOKEN,
							})
							.title('Draft Preview')
							.icon(EyeIcon),
					]),
			),
	);

const categoriesMenuItem = S.listItem()
	.title('All Categories')
	.schemaType('category')
	.child(
		S.documentTypeList('category')
			.title('All Categories')
			.child(documentId =>
				S.document()
					.documentId(documentId)
					.schemaType('category')
					.views([
						S.view.form().icon(EditIcon),
						S.view
							.component(IframePreview)
							.options({
								previewURL: PREVIEW_URL,
								token: PREVIEW_TOKEN,
							})
							.title('Draft Preview')
							.icon(EyeIcon),
					]),
			),
	);

//
// === Config ===
//

const globalConfig = S.listItem()
	.title('Global Config')
	.schemaType('globalConfig')
	.child(
		S.document()
			.documentId('globalConfig')
			.schemaType('globalConfig')
			.views([
				S.view.form().icon(EditIcon),
				S.view
					.component(IframePreview)
					.options({
						previewURL: PREVIEW_URL,
						token: PREVIEW_TOKEN,
					})
					.title('Draft Preview')
					.icon(EyeIcon),
			]),
	);

const splash = S.listItem()
	.title('Splash')
	.schemaType('splash')
	.child(S.document().documentId('splash').schemaType('splash'));

//
// === Structure ===
//

export default () =>
	S.list()
		.title('Content')
		.items([
			allPageMenuItem,
			S.divider(),
			directorsMenuItem,
			productionsMenuItem,
			agenciesMenuItem,
			categoriesMenuItem,
			S.divider(),
			projectsMenuItem,
			S.divider(),
			globalConfig,
			splash,
		]);
