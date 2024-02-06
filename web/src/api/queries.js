import groq from 'groq';

//
// === Components ===
//
const slug = groq`'slug': slug.current`;

export const link = groq`{
	_key,
	_type,
	openInNewWindow,
	title,
	url,
}`;

export const pageLink = groq`{
	_key,
	_type,
	openInNewWindow,
	title,
	'name': page->title,
	'slug': page->slug.current,
}`;

export const cta = groq`{
	...,
	_type == 'link' => ${link},
	_type == 'pageLink' => ${pageLink},
}`;

export const asset = groq`{
	_type,
	_key,
	alt,
	'dimensions': asset->metadata.dimensions,
	'url': asset->url,
	'lqip': asset->metadata.lqip
}`;

export const video = groq`{
	...,
	asset->,
}`;

export const richText = groq`[]{
	...,
	'asset': asset->,
}`;

export const seo = groq`{
	hideFromSitemap,
	disallowRobots,
	metaTitle,
	metaDescription,
	metaKeywords,
	openGraphTitle,
	openGraphDescription,
	openGraphImage ${asset},
	twitterTitle,
	twitterDescription,
	twitterImage ${asset},
}`;

export const productTile = groq`{
	_key,
	_id,
	title,
	${slug},
	productType,
	badge,
	mainImage ${asset},
	hoverImage ${asset},
	'cents': product->cents,
}`;

//
// === Page Components ===
//

export const componentList = groq`[]{
	_type,
	_key,
	...,

}`;

//
// === Documents ===
//


// Get homepage from active layout
export const homepage = groq`*[
	_type == "homepage" &&
	!(_id in path("drafts.**"))
][0] {
	list[] {
		_key,
		'title': @->title,
		'slug': @->slug.current,
		'video': @->video.asset->,
		'thumbnail': @->thumbnail.asset->,
		'director': @->director-> {
			title,
			'slug': slug.current,
		},
		'agency': @->agency-> {
			title,
			'slug': slug.current,
		},
		'category': @->category-> {
			title,
			'slug': slug.current,
		},
		dop,
		'year': @->year,
	},
	description ${richText},
	seo ${seo}
}`;

export const homepageDraft = id => groq`*[
	_type == "homepage" &&
	_id == "${id}"
][0] {
	list[] {
		_key,
		'title': @->title,
		'slug': @->slug.current,
		'video': @->video.asset->,
		'thumbnail': @->thumbnail.asset->,
		'director': @->director-> {
			title,
			'slug': slug.current,
		},
		'agency': @->agency-> {
			title,
			'slug': slug.current,
		},
		'production': @->category-> {
			title,
			'slug': slug.current,
		},
		dop,
		'year': @->year,
	},
	description ${richText},
	seo ${seo}
}`;

export const contactpage = groq`*[
	_type == "contactpage" &&
	_id == 'contactpage'
] [0] {
	team[] {
		_key,
		name,
		title,
		phone,
		email
	},
	links[] ${link},
	seo ${seo}
}`;

export const contactpageDraft = id => groq`*[
	_type == "contactpage" &&
	_id == "${id}"
][0] {
	team[] {
		_key,
		name,
		title,
		phone,
		email
	},
	links[] ${link},
	seo ${seo}
}`;

export const notFoundPage = groq`*[
	_type == "notFound" &&
	!(_id in path("drafts.**"))
][0] {
	title,
}`;

export const pageSlugs = groq`*[
	_type == "page" &&
	!(_id in path("drafts.**"))
].slug.current`;

export const pageBySlug = slug => groq`*[
	_type == "page" &&
	slug.current == "${slug}" &&
	!(_id in path("drafts.**"))
][0] {
	...
}`;

export const pageById = id => groq`*[
	_type == "page" &&
	_id == "${id}"
][0] {
	...
}`;

// Projects

const projectItems = groq`
	'_key': _id,
	_id,
	title,
	'slug': slug.current,
	'thumbnail': thumbnail.asset->,
	'cover': videoCover ${asset},
	'video': video.asset->,
	'category': category->title,
	'director': director-> {
		title,
		'slug': slug.current,
	},
	'agency': agency-> {
		title,
		'slug': slug.current,
	},
	'production': production-> {
		title,
		'slug': slug.current,
	},
	seo ${seo}
`;

export const getAllProjects = groq`*[
	_type == "project" &&
	!(_id in path("drafts.**"))
]  | order(_createdAt asc) {
	_id,
	title,
	'slug': slug.current,
}`;

export const projectSlugs = groq`*[
	_type == "project" &&
	!(_id in path("drafts.**"))
].slug.current`;

export const projectBySlug = slug => groq`*[
	_type == "project" &&
	slug.current == "${slug}" &&
	!(_id in path("drafts.**"))
][0] {
	${projectItems},
	dop,
	format,
	duration,
	year,
	seo ${seo},
}`;

export const projectById = id => groq`*[
	_type == "project" &&
	_id == "${id}"
][0] {
	${projectItems},
	dop,
	format,
	duration,
	year,
	seo ${seo},
}`;

const workpageItems = groq`
	list[] {
		_key,
		'title': @->title,
		'slug': @->slug.current,
		'video': @->video.asset->,
		'cover': @->videoCover ${asset},
		'thumbnail': @->thumbnail.asset->,
		'director': @->director-> {
			title,
			'slug': @->slug.current,
		},
		'agency': @->agency-> {
			title,
			'slug': @->slug.current,
		},
		'category': @->category->title,
	},
	filters[] {
		_key,
		'category': category->title,
		list[] {
			_key,
			'title': @->title,
			'slug': @->slug.current,
			'video': @->video.asset->,
			'cover': @->videoCover ${asset},
			'thumbnail': @->thumbnail.asset->,
			'director': @->director-> {
				title,
				'slug': @->slug.current,
			},
			'agency': @->agency-> {
				title,
				'slug': @->slug.current,
			},
			'category': @->category->title,
		},
	},
	seo ${seo},
`;

export const workpage = groq`*[
	_type == "workpage" &&
	!(_id in path("drafts.**"))
][0] {
	${workpageItems}
}`;

export const workpageDraft = id => groq`*[
	_type == "workpage" &&
	_id == "${id}"
][0] {
	${workpageItems}
}`;

export const allProjects = groq`*[
	_type == "project"  &&
	!(_id in path("drafts.**"))
] {
	${projectItems}
}`;

export const allCategories = groq`*[
	_type == "category"
]{
	'_key': _id,
	title
}`;

export const allAgencies = groq`*[
	_type == "agency"
] | order(lower(title) asc) {
	'_key': _id,
	title,
	'slug': slug.current,
	'poster': videoCover ${asset},
	'video': video.asset->,
}`;

export const allDirectors = groq`*[
	_type == "director"
] | order(lower(title) asc) {
	'_key': _id,
	title,
	'slug': slug.current,
	'poster': videoCover ${asset},
	'video': video.asset->,
}`;

export const allProductionCompanies = groq`*[
	_type == "production"
] | order(lower(title) asc) {
	'_key': _id,
	title,
	'slug': slug.current,
	'poster': videoCover ${asset},
	'video': video.asset->,
}`;

export const directorSlugs = groq`*[
	_type == "director" &&
	!(_id in path("drafts.**"))
].slug.current`;

export const agencySlugs = groq`*[
	_type == "agency" &&
	!(_id in path("drafts.**"))
].slug.current`;

export const productionSlugs = groq`*[
	_type == "production" &&
	!(_id in path("drafts.**"))
].slug.current`;

export const directorBySlug = slug => groq`*[
	_type == "director" &&
	slug.current == "${slug}"
][0] {
	title,
	"projects": *[_type == "project" && references(^._id)] {
		title,
		'slug': slug.current,
		'video': video.asset->,
		'thumbnail': thumbnail.asset->,
		'cover': videoCover ${asset},
		'director': director-> {
			title,
			'slug': slug.current,
		},
		'agency': agency-> {
			title,
			'slug': slug.current,
		},
		'category': category-> {
			title,
			'slug': slug.current,
		},
	}
}`;

export const agencyBySlug = slug => groq`*[
	_type == "agency" &&
	slug.current == "${slug}"
][0] {
	title,
	"projects": *[_type == "project" && references(^._id)] {
		title,
		'slug': slug.current,
		'video': video.asset->,
		'thumbnail': thumbnail.asset->,
		'cover': videoCover ${asset},
		'director': director-> {
			title,
			'slug': slug.current,
		},
		'agency': agency-> {
			title,
			'slug': slug.current,
		},
		'category': category-> {
			title,
			'slug': slug.current,
		},
	}
}`;

export const productionBySlug = slug => groq`*[
	_type == "production" &&
	slug.current == "${slug}"
][0] {
	title,
	"projects": *[_type == "project" && references(^._id)] {
		title,
		'slug': slug.current,
		'video': video.asset->,
		'thumbnail': thumbnail.asset->,
		'cover': videoCover ${asset},
		'director': director-> {
			title,
			'slug': slug.current,
		},
		'agency': agency-> {
			title,
			'slug': slug.current,
		},
		'category': category-> {
			title,
			'slug': slug.current,
		},
	}
}`;

//
// === Globals ===
//

export const globalConfig = groq`*[
	_type == "globalConfig" &&
	!(_id in path("drafts.**"))
][0] {
	address ${richText},
	phone,
	email,
	coordinates,
	seo ${seo},
}`;

export const splash = groq`*[
	_type == "splash" &&
	!(_id in path("drafts.**"))
][0] {
	'video': video.asset->,
}`;
