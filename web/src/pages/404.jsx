import React from 'react';
import Seo from '../components/Seo';

import {getNotFoundPage, getSiteData} from '../api/sanity';

export const getStaticProps = async ({params}) => {
	const [site, notFoundPage] = await Promise.all([
		getSiteData(),
		getNotFoundPage(),
	]);

	return {
		props: {
			...site,
			...notFoundPage,
			layoutTemplate: 'Layout',
			layout: {},
		},
	};
};

const NotFoundPage = ({config = {}, title, seo = {}}) => {
	const defaultMeta = config?.seo || {};

	const fallbackMeta = {
		metaTitle: 'Not Found - Universal Element®',
		openGraphTitle: 'Not Found - Universal Element®',
		twitterTitle: 'Not Found - Universal Element®',
	};

	const meta = {
		...defaultMeta,
		...fallbackMeta,
	};

	return (
		<React.Fragment>
			<Seo {...meta} />
			<section className="hero__height df fdc">404</section>
		</React.Fragment>
	);
};

export default NotFoundPage;
