import React from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';

const Seo = ({
	metaTitle = 'Universal Element®',
	metaDescription,
	metaKeywords,
	openGraphTitle = 'Universal Element®',
	openGraphDescription,
	openGraphImage,
	twitterUser = '',
	twitterTitle = 'Universal Element®',
	twitterDescription,
	twitterImage,
	siteName = 'Universal Element®',
	siteUrl = 'https://www.universal-element.com/',
	disallowRobots,
}) => {
	const {asPath} = useRouter();

	return (
		<Head>
			{metaTitle && <title>{metaTitle}</title>}
			{metaDescription && (
				<meta name="description" content={metaDescription} />
			)}
			<meta name="keywords" content={metaKeywords} />

			<meta property="og:url" content={`${siteUrl}${asPath}`} />
			<meta property="og:title" content={openGraphTitle} />
			<meta property="og:site_name" content={siteName} />
			<meta property="og:description" content={openGraphDescription} />
			{openGraphImage && (
				<meta property="og:image" content={openGraphImage.url} />
			)}

			<meta name="twitter:site" content={twitterUser} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={twitterTitle} />
			<meta name="twitter:description" content={twitterDescription} />
			<meta name="twitter:url" content={`${siteUrl}${asPath}`} />
			{twitterImage && (
				<meta name="twitter:image:src" content={twitterImage.url} />
			)}
			{disallowRobots && (
				<meta name="robots" content="noindex, nofollow" />
			)}
		</Head>
	);
};

export default Seo;
