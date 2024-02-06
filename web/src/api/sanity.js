import sanityClient from '@sanity/client';
import * as queries from './queries';
// import chunk from 'lodash/chunk';
// import reduce from 'lodash/reduce';

const useCdn = process.env.SANITY_USE_CDN === 'true';

const client = sanityClient({
	projectId: process.env.SANITY_PROJECT_ID,
	dataset: process.env.SANITY_DATASET,
	token: useCdn ? null : process.env.SANITY_API_TOKEN,
	apiVersion: process.env.SANITY_API_VERSION,
	useCdn,
});

export default client;

//
// === Sanity API Requests ===
//

// Site
export const getSiteData = async () => {
	const [config, projects, splash] = await Promise.all([
		client.fetch(queries.globalConfig),
		client.fetch(queries.getAllProjects),
		client.fetch(queries.splash),
	]);

	return {
		config,
		projects,
		splash,
	};
};

// Pages
export const getHomepage = () => client.fetch(queries.homepage);
export const getHomepageDraft = id => client.fetch(queries.homepageDraft(id));
export const getContactPage = () => client.fetch(queries.contactpage);
export const getContactPageDraft = id =>
	client.fetch(queries.contactpageDraft(id));

export const getWorkPage = async () => {
	const [workpage, categories, directors, agencies, production, projects] =
		await Promise.all([
			client.fetch(queries.workpage),
			client.fetch(queries.allCategories),
			client.fetch(queries.allDirectors),
			client.fetch(queries.allAgencies),
			client.fetch(queries.allProductionCompanies),
			client.fetch(queries.allProjects),
		]);

	return {
		...workpage,
		categories,
		directors,
		agencies,
		productionCompanies: production,
		projects,
	};
};

export const getWorkPageDraft = async id => {
	const [workpage, categories, directors, agencies, production, projects] =
		await Promise.all([
			client.fetch(queries.workpageDraft(id)),
			client.fetch(queries.allCategories),
			client.fetch(queries.allDirectors),
			client.fetch(queries.allAgencies),
			client.fetch(queries.allProductionCompanies),
			client.fetch(queries.allProjects),
		]);

	return {
		...workpage,
		categories,
		directors,
		agencies,
		productionCompanies: production,
		projects,
	};
};


// export const getAboutPage = () => client.fetch(queries.aboutpage);
export const getAbouPageDraft = id => client.fetch(queries.aboutpageDraft(id));

// Dynamic Pages
export const getAllPageSlugs = () => client.fetch(queries.pageSlugs);
export const getPageBySlug = slug => client.fetch(queries.pageBySlug(slug));
export const getPageById = id => client.fetch(queries.pageById(id));
export const getNotFoundPage = () => client.fetch(queries.notFoundPage);

// Projects
export const getAllProjectSlugs = () => client.fetch(queries.projectSlugs);
export const getAllProjects = () => client.fetch(queries.allProjects);
export const getProjectBySlug = slug =>
	client.fetch(queries.projectBySlug(slug));
export const getProjectById = id => client.fetch(queries.projectById(id));

// Directors, Agencies, Production Companies
export const getAllDirectorSlugs = () => client.fetch(queries.directorSlugs);
export const getDirectorBySlug = slug =>
	client.fetch(queries.directorBySlug(slug));
export const getAllAgencySlugs = () => client.fetch(queries.agencySlugs);
export const getAgencyBySlug = slug =>
	client.fetch(queries.agencyBySlug(slug));
export const getAllProductionCompanySlugs = () => client.fetch(queries.productionSlugs);
export const getProductionBySlug = slug =>
	client.fetch(queries.productionBySlug(slug));
