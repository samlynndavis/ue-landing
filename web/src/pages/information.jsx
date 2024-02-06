import React from 'react';
import Seo from '../components/Seo';

import {getAboutPage, getAboutPageDraft, getSiteData} from '../api/sanity';

import reduce from 'lodash/reduce';

export const getStaticProps = async ({preview, previewData}) => {
	const pageRequest = preview
		? getAboutPageDraft(previewData.draftId)
		: getAboutPage();

	const [site, aboutpage] = await Promise.all([getSiteData(), pageRequest]);

	return {
		props: {
			...site,
			...aboutpage,
		},
		revalidate: 60,
	};
};

const InformationPage = ({config, seo}) => {
	const defaultMeta = config?.seo || seo || {};

	const fallbackMeta = {
		metaTitle: 'Information - Eмоте Filмs®',
		openGraphTitle: 'Information - Eмоте Filмs®',
		twitterTitle: 'Information - Eмоте Filмs®',
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

	return (
		<React.Fragment>
			<Seo {...meta} />
		</React.Fragment>
	);
};

export default InformationPage;
