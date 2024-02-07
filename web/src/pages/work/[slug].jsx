import React, {useState, useRef, useEffect} from 'react';
import Link from '../../components/Link';
import Seo from '../../components/Seo';
import MuxPlayer from '@mux/mux-player-react';

import {
	getSiteData,
	getAllProjectSlugs,
	getProjectById,
	getProjectBySlug,
} from '../../api/sanity';

import {useStore} from '../../store/useStore';
import useHover from 'buena-suerte/lib/hooks/useHover';
import reduce from 'lodash/reduce';
import cx from 'classnames';

export const getStaticPaths = async () => {
	const allProjectSlugs = await getAllProjectSlugs();

	return {
		paths: allProjectSlugs.map(slug => ({
			params: {
				slug,
			},
		})),
		fallback: 'blocking',
	};
};

export const getStaticProps = async ({params, preview, previewData}) => {
	const {slug} = params;

	const productRequest = preview
		? getProjectById(previewData.draftId)
		: getProjectBySlug(slug);

	const [site, product] = await Promise.all([getSiteData(), productRequest]);

	return {
		props: {
			...site,
			...product,
		},
		revalidate: 60,
	};
};

const Project = ({
	config = {},
	seo = {},
	_id,
	title,
	category,
	video,
	cover,
	director,
	dop,
	production,
	agency,
	format,
	duration,
	year,
}) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isHovering, hoverProps] = useHover();
	const [prevSlug, setPrevSlug] = useState();
	const [nextSlug, setNextSlug] = useState();

	const {projectsList} = useStore(({projectsList}) => ({projectsList}));

	useEffect(() => {
		if (projectsList.length > 0) {
			const current = projectsList.findIndex(
				project => project._id === _id,
			);

			setNextSlug(projectsList[(current + 1) % projectsList.length].slug);
			setPrevSlug(
				projectsList[
					current - 1 < 0 ? projectsList.length - 1 : current - 1
				].slug,
			);
		}
	}, [projectsList, _id]);

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

	const projectHero = (
		<div className="pt-100 1400:pt-125 grid grid-cols-4 1000:grid-cols-12 px-16 1000:px-0 gap-20">
			<div className="text-center text-14 1000:hidden col-span-4">
				<Link
					title={`View ${category} projects`}
					url={`/work?category=${encodeURI(category)}`}>
					<span className="underline">Work</span> {' / '}
					<span className="underline">{category}</span>
				</Link>
			</div>
			<div className="col-span-4 1000:col-span-12 1000:grid 1000:grid-cols-12 1000:gap-20 items-baseline">
				<div className="hidden 1000:flex col-span-3  items-baseline gap-60">
					<Link
						title="← Previous Project"
						url={`/work/${prevSlug}`}
						className="font-sans text-12 underline transition-underline duration-400 hover:decoration-transparent">
						←Previous Project
					</Link>

					<Link
						title="Next Project →"
						url={`/work/${nextSlug}`}
						className="font-sans text-12 underline transition-underline duration-400 hover:decoration-transparent">
						Next Project →
					</Link>
				</div>
				<p className="mt-14 text-center font-serif italic text-20 leading 1000:text-24 1000:col-span-6 1000:col-start-4">
					{title}
				</p>
				<div className="hidden 1000:block col-span-2 col-end-13 text-right">
					<Link
						title={`Back to ${category}`}
						url={`/work?category=${encodeURI(category)}`}
						className="font-sans text-12 underline transition-underline duration-400 hover:decoration-transparent">
						⮐ Work/{category}
					</Link>
				</div>
			</div>
		</div>
	);

	const projectVideo = (
		<div
			{...hoverProps}
			className="z-10 rounded-6 overflow-hidden relative w-full col-span-4 1000:col-span-8 1000:col-start-2">
			{video?.playbackId && (
				<div className="image-fill h-0 pt-[56.5%]">
					<MuxPlayer
						poster={cover?.url}
						playbackId={video.playbackId}
						paused={!isPlaying}
						metadata={{
							video_title: title,
						}}
						streamType="on-demand"
					/>
				</div>
			)}
		</div>
	);

	const projectBody = (
		<div className="py-16 1000:pt-53 1700:pt-84 1000:pb-100  grid grid-cols-4 1000:grid-cols-12 px-16 gap-20 ">
			<div className="col-span-4 1000:col-span-10 1000:col-start-2 grid grid-cols-4 1000:grid-cols-10 gap-20 relative z-1">
				{year && (
					<div
						style={{writingMode: 'vertical-lr'}}
						className="hidden 1000:block absolute left-0 top-1/2 -translate-y-1/2 rotate-180 text-center">
						EF
						<span className="rotate-90 inline-block">©</span>
						{year}
					</div>
				)}
				{projectVideo}
				{(format || duration) && (
					<div
						style={{writingMode: 'vertical-lr'}}
						className="hidden 1000:flex absolute right-0 top-1/2 -translate-y-1/2 rotate-180 justify-center w-full h-full gap-100">
						{format && (
							<p className="text-12 font-sans">
								Format:{' '}
								<span className="font-serif italic">
									{format}
								</span>
							</p>
						)}
						{duration && (
							<p className="text-12 font-sans">
								Duration:{' '}
								<span className="font-serif italic">
									{duration}
								</span>
							</p>
						)}
					</div>
				)}
			</div>
			<div className="col-span-4 1000:col-span-10 1000:col-start-2 flex flex-col 1000:flex-row mt-30 1000:mt-96 justify-center items-center gap-10 1000:gap-76">
				{director && (
					<p className="text-12 font-sans flex gap-15 1000:gap-7 items-baseline">
						Director:{' '}
						<Link
							title={director.title}
							url={`/directors/${director.slug}`}
							className="font-serif italic underline decoration-transparent transition-underline duration-400 hover:decoration-current">
							{director.title}
						</Link>
					</p>
				)}
				{dop && (
					<p className="text-12 font-sans flex gap-15 1000:gap-7 items-baseline">
						DOP: <span className="font-serif italic">{dop}</span>
					</p>
				)}
				{production && (
					<p className="text-12 font-sans flex gap-15 1000:gap-7 items-baseline">
						Production:{' '}
						<Link
							title={production.title}
							url={`/production-companies/${production.slug}`}
							className="font-serif italic underline decoration-transparent transition-underline duration-400 hover:decoration-current">
							{production.title}
						</Link>
					</p>
				)}
				{agency && (
					<p className="text-12 font-sans flex gap-15 1000:gap-7 items-baseline">
						Agency:{' '}
						<Link
							title={agency.title}
							url={`/agencies/${agency.slug}`}
							className="font-serif italic underline decoration-transparent transition-underline duration-400 hover:decoration-current">
							{agency.title}
						</Link>
					</p>
				)}
			</div>
		</div>
	);

	return (
		<React.Fragment>
			<Seo {...meta} />
			<section className="w-full 1000:w-[75vw] 1400:max-w-[1200px] mx-auto 1000:h-full-screen ">
				{projectHero}
				{projectBody}
			</section>
		</React.Fragment>
	);
};

export default Project;
