import React from 'react';
import Seo from '../components/Seo';
import PageComponentList from '../components/PageComponentList';
import {
	getAllPageSlugs,
	getPageBySlug,
	getPageById,
	getSiteData,
} from '../api/sanity';

export const getStaticPaths = async () => {
	const allPageSlugs = await getAllPageSlugs();

	return {
		paths: allPageSlugs.map(slug => ({
			params: {slug},
		})),
		fallback: 'blocking',
	};
};

export const getStaticProps = async ({params, preview, previewData}) => {
	const {slug} = params;

	const pageRequest = preview
		? getPageById(previewData.draftId)
		: getPageBySlug(slug);

	const [site, page] = await Promise.all([getSiteData(), pageRequest]);

	return {
		props: {
			...site,
			...page,
			layoutTemplate: 'Layout',
			layout: {},
		},
		revalidate: 60,
	};
};

export default ({config = {}, title, seo = {}, components = []}) => {
	const defaultMeta = config?.seo || {};
	const fallbackMeta = {
		metaTitle: `${title} - Universal Element®`,
		openGraphTitle: `${title} - Universal Element®`,
		twitterTitle: `${title} - Universal Element®`,
	};

	const meta = {
		...defaultMeta,
		...seo,
		...fallbackMeta,
	};

	return (
		<div>
			<Seo {...meta} />
			<PageComponentList components={components} />
		</div>
	);
};
