import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

// Types
import splash from './types/splash';
import header from './types/header';
import footer from './types/footer';
import homepage from './types/homepage';
import workpage from './types/workpage';
// import aboutpage from './types/aboutpage';
import contactpage from './types/contactpage';
import page from './types/page';
import notFound from './types/notFound';

import project from './types/project';

import category from './types/category';
import director from './types/director';
import production from './types/production';
import agency from './types/agency';

import seo from './types/seo';
import richText from './types/richText';
import link from './types/link';
import pageLink from './types/pageLink';
import cta from './types/cta';
import ctaList from './types/ctaList';
import imageAlt from './types/imageAlt';
import globalConfig from './types/globalConfig';

import pageComponentList from './types/pageComponentList';

export default createSchema({
	name: 'default',
	types: schemaTypes.concat([
		splash,
		header,
		footer,
		homepage,
		workpage,
		aboutpage,
		contactpage,
		page,
		notFound,

		project,

		category,
		director,
		production,
		agency,

		seo,
		richText,
		link,
		pageLink,
		cta,
		ctaList,
		imageAlt,
		globalConfig,

		pageComponentList,
	]),
});
