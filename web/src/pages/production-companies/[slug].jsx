import React from 'react';
import Link from '../../components/Link';
import ProjectTile from '../../components/ProjectTile';
import Seo from '../../components/Seo';

import {
	getSiteData,
	getAllProductionCompanySlugs,
	getProductionBySlug,
} from '../../api/sanity';

import reduce from 'lodash/reduce';

export const getStaticPaths = async () => {
	const allProductionCompanySlugs = await getAllProductionCompanySlugs();

	return {
		paths: allProductionCompanySlugs.map(slug => ({
			params: {
				slug,
			},
		})),
		fallback: 'blocking',
	};
};

export const getStaticProps = async ({params}) => {
	const {slug} = params;

	const [site, productionCompany] = await Promise.all([
		getSiteData(),
		getProductionBySlug(slug),
	]);

	return {
		props: {
			...site,
			...productionCompany,
		},
		revalidate: 60,
	};
};

const Production = ({config = {}, seo = {}, title, projects = []}) => {
	const defaultMeta = config?.seo || seo || {};

	const fallbackMeta = {
		metaTitle: `${title} - Eмоте Filмs®`,
		openGraphTitle: `${title} - Eмоте Filмs®`,
		twitterTitle: `${title} - Eмоте Filмs®`,
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
			{title && (
				<React.Fragment>
					<Link
						title="Back to production companies"
						url="/work?type=production"
						className="text-14 text-center mt-100 1000:mt-80 link--underline--hover w-fit mx-auto">
						Work / Production
					</Link>
					<h1 className="text-center font-serif italic text-20 1000:text-24 mt-20">
						{title}
					</h1>
				</React.Fragment>
			)}
			<section className="grid grid-cols-4 1000:grid-cols-12 gap-20 mt-36 1000:mt-84 px-8 1000:px-16">
				{projects.map(({_key, ...project}) => (
					<div key={_key} className="col-span-4">
						<ProjectTile {...project} />
					</div>
				))}
			</section>
		</React.Fragment>
	);
};

export default Production;
