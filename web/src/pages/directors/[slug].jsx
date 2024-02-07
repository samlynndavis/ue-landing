import React from 'react';
import Link from '../../components/Link';
import ProjectTile from '../../components/ProjectTile';
import Seo from '../../components/Seo';

import {
	getSiteData,
	getAllDirectorSlugs,
	getDirectorBySlug,
} from '../../api/sanity';

import reduce from 'lodash/reduce';

export const getStaticPaths = async () => {
	const allDirectorSlugs = await getAllDirectorSlugs();

	return {
		paths: allDirectorSlugs.map(slug => ({
			params: {
				slug,
			},
		})),
		fallback: 'blocking',
	};
};

export const getStaticProps = async ({params}) => {
	const {slug} = params;

	const [site, director] = await Promise.all([
		getSiteData(),
		getDirectorBySlug(slug),
	]);

	return {
		props: {
			...site,
			...director,
		},
		revalidate: 60,
	};
};

const Director = ({config = {}, seo = {}, title, projects = []}) => {
	const defaultMeta = config?.seo || seo || {};

	const fallbackMeta = {
		metaTitle: `${title} - Universal Element®`,
		openGraphTitle: `${title} - Universal Element®`,
		twitterTitle: `${title} - Universal Element®`,
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
						title="Back to directors"
						url="/work?type=director"
						className="text-14 text-center mt-100 1000:mt-80 link--underline--hover w-fit mx-auto">
						Work / Directors
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

export default Director;
