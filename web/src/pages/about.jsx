import React, {useRef} from 'react';
import Seo from '../components/Seo';
import Link from '../components/Link';
import BlockContent from '@sanity/block-content-to-react';
import sanityImage from 'buena-suerte/lib/utils/sanityImage';

import {AnimatePresence, m as motion} from 'framer-motion';
import {getSiteData, getAboutPage, getAboutPageDraft} from '../api/sanity';

import {useStore} from '../store/useStore';
import useIntersection from 'buena-suerte/lib/hooks/useIntersection';

import reduce from 'lodash/reduce';
import richText from '../serializers/richText';

import cx from 'classnames';

const ROUTE_DURATION = 400;

export const getStaticProps = async ({preview, previewData}) => {
	const pageRequest = preview
		? getAboutPageDraft(previewData.draftId)
		: getAboutPage();

	const [site, aboutpage] = await Promise.all([getSiteData(), pageRequest]);

	return {
		props: {
			...site,
			...aboutpage,
		},
		revalidate: 60,
	};
};

const AboutPage = ({
	config = {},
	seo = {},
	awards = [],
	clients = [],
	description,
	image,
}) => {
	const defaultMeta = config?.seo || seo || {};

	const {isDarkMode} = useStore(({isDarkMode}) => ({isDarkMode}));

	const fallbackMeta = {
		metaTitle: 'Contact - Eмоте Filмs®',
		openGraphTitle: 'Contact - Eмоте Filмs®',
		twitterTitle: 'Contact - Eмоте Filмs®',
		openGraphImage: defaultMeta?.openGraphImage,
		twitterImage: defaultMeta?.twitterImage,
	};

	const descriptionIntersectionRef = useRef(null);
	const isDescriptionIntersecting = useIntersection(
		descriptionIntersectionRef,
		{
			threshold: 0.33,
			once: false,
		},
	);

	const clientsIntersectionRef = useRef(null);
	const isClientsIntersecting = useIntersection(clientsIntersectionRef, {
		threshold: 0.33,
		once: false,
	});

	const awardsIntersectionRef = useRef(null);
	const isAwardsIntersecting = useIntersection(awardsIntersectionRef, {
		threshold: 0.33,
		once: false,
	});

	// const scrollTo = ({ref}) => {
	// 	if (!ref) return;

	// 	const offset = ref.current.getBoundingClientRect().top + window.scrollY;

	// 	window.scrollTo({
	// 		top: offset,
	// 		behavior: 'smooth',
	// 	});
	// };

	// useEffect(() => {

	// }, [
	// 	isDescriptionIntersecting,
	// 	isClientsIntersecting,
	// 	isAwardsIntersecting,
	// ]);

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

	const descriptionSection = (
		<div ref={descriptionIntersectionRef} className="col-span-1">
			<div className="min-h-full-screen relative flex flex-col justify-center items-center px-20">
				<div className="pt-150 1000:pt-0 grid grid-cols-1 1000:grid-cols-12 gap-17">
					<div className="col-span-1 1000:col-span-6 1000:col-start-4">
						{description && (
							<div className="text-18 1000:text-20 text-center rich-text line-break font-serif">
								<BlockContent
									blocks={description}
									serializers={richText}
								/>
							</div>
						)}
					</div>
				</div>
				<div className="pt-100 1000:pt-0 1000:absolute 1000:left-1/2 1000:-translate-x-1/2 bottom-20 1000:bottom-140 flex flex-col  justify-center items-center gap-7">
					<p className="font-serif text-14">↓</p>
				</div>
			</div>
		</div>
	);

	const clientsSection = clients && (
		<div ref={clientsIntersectionRef} className="col-span-1">
			<div className="min-h-full-screen relative pt-100 1000:pt-0 px-20 flex flex-col justify-center">
				<div className="1000:absolute 1000:left-1/2 1000:-translate-x-1/2 top-110 1000:top-140 flex flex-col  justify-center items-center gap-7">
					<p className="font-serif text-14 rotate-180 transform-center">
						↓
					</p>
				</div>

				<div className="grid grid-cols-12 gap-x-5 1000:gap-x-20">
					<div className="col-start-1 1000:col-start-2 col-span-12 1000:col-span-10 grid grid-cols-2 1000:grid-cols-6 1000:gap-y-60 1000:gap-x-95">
						{clients.map(({_key, image, alt, link}) => (
							<div
								className={cx(
									'aspect-square 1000:aspect-unset flex flex-col justify-center items-center transition-colors duration-400',
								)}
								key={_key}>
								{link ? (
									<Link
										title={
											alt ? `Client: ${alt}` : 'Client'
										}
										className="h-full w-full"
										url={`${link}`}>
										<img
											key={_key}
											alt={alt}
											src={sanityImage(image.url, {
												w: 300,
											})}
											className={cx(
												'h-auto w-full object-contain transition-all duration-400 ',
												{
													'grayscale invert':
														isDarkMode,
												},
											)}
										/>
									</Link>
								) : (
									<img
										key={_key}
										alt={alt}
										src={sanityImage(image.url, {
											w: 1000,
										})}
										className={cx(
											'h-auto w-full object-contain transition-all duration-400 ',
											{
												'grayscale invert': isDarkMode,
											},
										)}
									/>
								)}
							</div>
						))}
					</div>
				</div>

				<div className="pt-100 1000:pt-0 1000:absolute 1000:left-1/2 1000:-translate-x-1/2 bottom-20 1000:bottom-140 flex flex-col  justify-center items-center gap-7">
					<p className="font-serif text-14">↓</p>
				</div>
			</div>
		</div>
	);

	const awardsSection = awards && (
		<div ref={awardsIntersectionRef} className="col-span-1">
			<div className="min-h-full-screen relative pb-50 pt-100 1000:pt-200 px-20 flex flex-col justify-center">
				<div className="1000:absolute 1000:left-1/2 1000:-translate-x-1/2 top-110 1000:top-140 flex flex-col  justify-center items-center gap-7">
					<p className="font-serif text-14 rotate-180 transform-center">
						↓
					</p>
				</div>
				<ul className="w-full grid grid-cols-4 1000:w-1/2 1000:mx-auto 1000:flex 1000:flex-wrap 1000:justify-center gap-18 1000:gap-70">
					{awards.map(({_key, title, year, image}) => (
						<li
							key={_key}
							className="col-span-2 1000:basis-1/3 text-center ">
							{image && (
								<div className="h-0 pt-[100%] relative">
									<img
										key={image._key}
										alt={image.alt || title}
										src={sanityImage(image.url, {
											w: 300,
										})}
										className={cx(
											'w-full h-full object-contain absolute inset-0 transition-all duration-400 max-w-200 mx-auto',
											{
												'grayscale invert': isDarkMode,
											},
										)}
									/>
								</div>
							)}
							<p className="mt-60 1000:mt-12 text-14 leading-18 italic font-serif">
								{title}
							</p>
							<p className="mt-5 text-14 leading-18">{year}</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);

	const headerElement = (
		<p className="hidden 1000:block fixed top-4 left-1/2 -translate-x-1/2 font-serif italic text-24 z-10">
			<AnimatePresence mode="wait">
				{isDescriptionIntersecting &&
					!isAwardsIntersecting &&
					!isClientsIntersecting && (
						<motion.span
							initial={{opacity: 0}}
							animate={{opacity: 1}}
							exit={{opacity: 0}}
							transition={{
								duration: ROUTE_DURATION / 1000,
							}}>
							About
						</motion.span>
					)}
				{isClientsIntersecting && !isAwardsIntersecting && (
					<motion.span
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
						transition={{
							duration: ROUTE_DURATION / 1000,
						}}>
						Clients
					</motion.span>
				)}
				{isAwardsIntersecting && (
					<motion.span
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
						transition={{
							duration: ROUTE_DURATION / 1000,
						}}>
						Awards
					</motion.span>
				)}
			</AnimatePresence>
		</p>
	);

	return (
		<React.Fragment>
			<Seo {...meta} />
			<section className="grid grid-cols-1 gap-20 ">
				{headerElement}
				{descriptionSection}
				{clientsSection}
				{awardsSection}
			</section>
		</React.Fragment>
	);
};

export default AboutPage;
