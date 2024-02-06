import React from 'react';
import NextLink from 'next/link';

const Link = ({
	_type,
	title,
	url,
	slug,
	openInNewWindow,
	name,
	editName,
	children,
	className,
	linkProps = {scroll: false},
	...props
}) => {
	if (url && url.indexOf('/') === 0) {
		return (
			<NextLink {...linkProps} href={url}>
				<a
					{...props}
					className={className}
					title={title}
					target={openInNewWindow ? '_blank' : undefined}
					rel={openInNewWindow ? 'noopener noreferrer' : undefined}
					href={url}>
					{children || title}
				</a>
			</NextLink>
		);
	} else {
		return (
			<a
				{...props}
				className={className}
				title={title}
				target={openInNewWindow ? '_blank' : undefined}
				rel={openInNewWindow ? 'noopener noreferrer' : undefined}
				href={url}>
				{children || title}
			</a>
		);
	}
};

export default Link;
