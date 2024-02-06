const algoliasearch = require('algoliasearch');
const sanityClient = require('@sanity/client');
const groq = require('groq');
require('../utils/dot-env');

const sanity = sanityClient({
	projectId: process.env.SANITY_PROJECT_ID,
	dataset:  process.env.SANITY_DATASET,
	token: process.env.SANITY_WRITE_API_TOKEN,
	apiVersion: process.env.SANITY_API_VERSION,
	useCdn: false,
});

// Sanity Query Setup
const asset = groq`{
	_type,
	_key,
	alt,
	'dimensions': asset->metadata.dimensions,
	'url': asset->url,
}`;


const allListenPosts = groq`*[
	_type == "listenPost" &&
	!(_id in path("drafts.**")) &&
	publishedAt < now()
] | order(publishedAt desc, title) {
	'objectID': _id,
	'slug': slug.current,
	title,
	publishedAt,
	'slug': slug.current,
	genres[] {
		_key,
		'title': @->title
	},
	'image': thumbnail ${asset},
	track ${asset}
}`;

const allLearnPosts = groq`*[
	_type == "learnPost" &&
	!(_id in path("drafts.**")) &&
	publishedAt < now()
] | order(publishedAt desc, title) {
	'objectID': _id,
	title,
	publishedAt,
	'slug': slug.current,
	'badge': badge->title,
	'authors': authorsList[] {
		_key,
		'title': @->title
	},
	'image': carousel[0] ${asset},
}`;

const allProducts = groq`*[
	_type == "product" &&
	!(_id in path("drafts.**"))
] | order(publishedAt desc, title) {
	'objectID': _id,
	title,
	'artist': artist->title,
	'slug': slug.current,
	'badge': badge.current,
	'image': image ${asset},
	genres[] {
		_key,
		'title': @->title
	},
}`;

// Sanity Query

const querySearchItems = async () => {
	const listenPosts = await sanity.fetch(allListenPosts);
	const learnPosts = await sanity.fetch(allLearnPosts);
	const products = await sanity.fetch(allProducts);

	return {
		listenPosts,
		learnPosts,
		products
	};
};

(async function () {
	try {
		const {listenPosts, learnPosts, products} = await querySearchItems();


		// initialize the client with your environment variables
		const client = algoliasearch(
			process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
			process.env.ALGOLIA_ADMIN_API_KEY,
		);

		// initialize the index with your index name
		const listenIndex = client.initIndex(
			process.env.NEXT_PUBLIC_ALGOLIA_LISTEN_INDEX,
		);

		const learnIndex = client.initIndex(
			process.env.NEXT_PUBLIC_ALGOLIA_LEARN_INDEX,
		);

		const productsIndex = client.initIndex(
			process.env.NEXT_PUBLIC_ALGOLIA_PRODUCTS_INDEX,
		);

		// save the objects!
		const listenAlgoliaResponse = await listenIndex.saveObjects(listenPosts);
		const learnAlgoliaResponse = await learnIndex.saveObjects(learnPosts);
		const productsAlgoliaResponse = await productsIndex.saveObjects(products);

		// check the output of the response in the console
		console.log(
			`🎉 Successfully added ${
				listenAlgoliaResponse.objectIDs.length
			} Listen Post records to Algolia search. Object IDs:\n${listenAlgoliaResponse.objectIDs.join(
				'\n',
			)}`,
		);
		console.log(
			`🎉 Successfully added ${
				learnAlgoliaResponse.objectIDs.length
			} Learn Post records to Algolia search. Object IDs:\n${learnAlgoliaResponse.objectIDs.join(
				'\n',
			)}`,
		);
		console.log(
			`🎉 Successfully added ${
				productsAlgoliaResponse.objectIDs.length
			} Products records to Algolia search. Object IDs:\n${productsAlgoliaResponse.objectIDs.join(
				'\n',
			)}`,
		);

		return;
	} catch (error) {
		console.log(error);
	}
})();
