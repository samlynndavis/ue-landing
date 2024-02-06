import React, {useState, useRef} from 'react';

import useIntersection from 'buena-suerte/lib/hooks/useIntersection';
import sanityImage from 'buena-suerte/lib/utils/sanityImage';

import isString from 'lodash/isString';
import cx from 'classnames';

const Image = ({
	alt,
	lqip,
	src,
	sources = [],
	className,
	imgProps = {},
	pictureProps = {},
	lazy = true,
	lazyThreshold = 0,
	lazyBlur = true,
	...props
}) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const target = useRef(null);
	const isIntersected = useIntersection(target, {
		threshold: 0.15,
		once: true,
	});
	const fullResolutionEnabled = !lazy || (lazy && isIntersected);
	const showFullResolution = !lazy || (lazy && isIntersected && isLoaded);

	const handleLoad = () => {
		requestAnimationFrame(() => {
			setIsLoaded(true);
		});
	};

	const sourceTags =
		fullResolutionEnabled &&
		sources.map((source, index) => {
			const {media, url, ...config} = source;
			let srcSet;

			if (Object.keys(config).length === 0) {
				srcSet = source;
			} else {
				srcSet = sanityImage(url, config);
			}

			return <source key={index} srcSet={srcSet} media={media} />;
		});

	let imageUrl;

	if (isString(src)) {
		imageUrl = src;
	} else if (src.url) {
		const {url, ...config} = src;
		imageUrl = sanityImage(url, config);
	} else {
		console.warn('Image is missing src.');
	}

	const {className: imgClassName, ...restImgProps} = imgProps;

	const imgTag = (
		<img
			{...restImgProps}
			className={cx(imgClassName, {
				'blur-sm': !showFullResolution && lazyBlur,
			})}
			src={fullResolutionEnabled ? imageUrl : lqip}
			alt={alt}
			onLoad={fullResolutionEnabled ? handleLoad : null}
		/>
	);

	return (
		<div
			ref={target}
			className={cx('image overflow-hidden', className)}
			{...props}>
			<picture {...pictureProps}>
				{sourceTags}
				{imgTag}
			</picture>
		</div>
	);
};

export default Image;
