const getHost = () => {
	return process.env.SANITY_STUDIO_FRONTEND_URL;
};

export default function resolveProductionUrl(document) {
	switch (document._type) {
		case 'product':
			return `${getHost()}/products/${document.slug.current}`;
		case 'collection':
			return `${getHost()}/collections/${document.slug.current}`;
		case 'page':
			return `${getHost()}/${document.slug.current}`;
	}

	return null;
}
