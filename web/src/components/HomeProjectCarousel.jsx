import React, {useState, useRef, useEffect} from 'react';
import Link from './Link';
import Arrow from './Arrow';

import SanityMuxPlayer from 'sanity-mux-player';

import {m as motion, AnimatePresence} from 'framer-motion';

import useHover from 'buena-suerte/lib/hooks/useHover';
import {useKeenSlider} from 'keen-slider/react';

import 'keen-slider/keen-slider.min.css';
import cx from 'classnames';

const ROUTE_DURATION = 400;

const HomeProjectCarousel = ({list = []}) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [loaded, setLoaded] = useState(false);
	const [sliderRef, instanceRef] = useKeenSlider({
		initial: 0,
		slideChanged(slider) {
			setCurrentSlide(slider.track.details.rel);
		},
		created() {
			setLoaded(true);
		},
		slides: {
			perView: 1,
			spacing: 20,
		},
	});
	const [leftPosition, setLeftPosition] = useState({
		top: '0',
		left: '0',
	});
	const [rightPosition, setRightPosition] = useState({
		top: '0',
		left: '0',
	});

	const [isHovering, hoverProps] = useHover();
	const [isHoveringLeftButton, leftButtonHoverProps] = useHover();
	const [isHoveringRightButton, rightButtonHoverProps] = useHover();

	const onClickLeft = () => {
		setCurrentSlide(
			currentSlide - 1 < 0 ? list.length - 1 : currentSlide - 1,
		);
	};

	const onClickRight = () => {
		setCurrentSlide(
			currentSlide + 1 > list.length - 1 ? 0 : currentSlide + 1,
		);
	};

	const videoRef = useRef();

	useEffect(() => {
		const videoElement = videoRef.current.getVideoElement();
		if (videoElement) {
			if (isHovering) videoElement.play();
			else videoElement.pause();
		}
	}, [isHovering]);

	const mouseMoveHandler = ({clientX, clientY}) => {
		if (isHoveringLeftButton) {
			setLeftPosition({
				top: clientY,
				left: clientX,
			});
		}
		if (isHoveringRightButton) {
			setRightPosition({
				top: clientY,
				left: clientX,
			});
		}
	};

	useEffect(() => {
		if (isHoveringLeftButton || isHoveringRightButton)
			window.addEventListener('mousemove', mouseMoveHandler);
		else window.removeEventListener('mousemove', mouseMoveHandler);
		return () => {
			window.removeEventListener('mousemove', mouseMoveHandler);
		};
	}, [isHoveringLeftButton, isHoveringRightButton]);

	const mobileButtons = loaded && (
		<div className="mt-16 flex justify-between 1000:hidden px-20">
			<button
				{...leftButtonHoverProps}
				title="Previous"
				className="1000:absolute 1000:top-1/2 1000:-translate-y-1/2 1000:left-0 py-10 cursor-none"
				onClick={e =>
					e.stopPropagation() || instanceRef.current?.prev()
				}>
				<Arrow />
			</button>

			<p className="text-center text-16 font-serif italic 1000:hidden ">
				{currentSlide + 1}/{list.length}
			</p>

			<button
				{...rightButtonHoverProps}
				title="Next"
				className="1000:absolute 1000:top-1/2 1000:-translate-y-1/2 1000:right-0 py-10 cursor-none"
				onClick={e =>
					e.stopPropagation() || instanceRef.current?.next()
				}>
				<Arrow className="rotate-180" />
			</button>
		</div>
	);

	const mobileCarousel = (
		<div className="1000:hidden px-20 overflow-hidden">
			<div
				className="keen-slider"
				style={{overflow: 'visible'}}
				ref={sliderRef}>
				{list.map(
					(
						{
							title,
							slug,
							thumbnail,
							video,
							director,
							agency,
							dop,
							category,
							year,
						},
						index,
					) => (
						<Link
							title={title}
							url={`/work/${slug}`}
							className="keen-slider__slide">
							<p className="text-center text-20 italic font-serif">
								{title}
							</p>
							<div {...hoverProps} className="mt-16">
								<div className="rounded-6 overflow-hidden relative h-0 pt-[56.25%]">
									<div className="absolute inset-0 h-full w-full">
										<SanityMuxPlayer
											ref={videoRef}
											assetDocument={thumbnail || video}
											autoload
											loop
											muted
											showControls={false}
											playsInline
										/>
									</div>
								</div>
								<div className="hidden 1000:flex justify-between mt-15">
									<div className="flex gap-43">
										{director && (
											<p className="font-12 col-span-1">
												Director:{' '}
												<span className="font-12 col-span-2 italic font-serif">
													{director.title}
												</span>
											</p>
										)}
										{dop && (
											<p className="font-12 col-span-1">
												DOP:{' '}
												<span className="font-12 col-span-2 italic font-serif">
													{dop}
												</span>
											</p>
										)}
										{agency && (
											<p className="font-12 col-span-1">
												Agency:{' '}
												<span className="font-12 col-span-2 italic font-serif">
													{agency.title}
												</span>
											</p>
										)}
										{category && (
											<p className="font-12 col-span-1">
												Category:{' '}
												<span className="font-12 col-span-2 italic font-serif">
													{category.title}
												</span>
											</p>
										)}
									</div>
									{year && (
										<p className="text-right font-12">
											EF©{year}
										</p>
									)}
								</div>
							</div>
							<div className="mt-24 grid grid-cols-4 gap-20 1000:hidden">
								<div className="col-span-3 grid grid-cols-3">
									{list[currentSlide].director && (
										<React.Fragment>
											<p className="font-12 col-span-1">
												Director:
											</p>
											<p className="font-12 col-span-2 italic font-serif">
												{
													list[currentSlide].director
														.title
												}
											</p>
										</React.Fragment>
									)}
									{list[currentSlide].dop && (
										<React.Fragment>
											<p className="font-12 col-span-1">
												DOP:
											</p>
											<p className="font-12 col-span-2 italic font-serif">
												{list[currentSlide].dop}
											</p>
										</React.Fragment>
									)}
									{list[currentSlide].agency && (
										<React.Fragment>
											<p className="font-12 col-span-1">
												Agency:
											</p>
											<p className="font-12 col-span-2 italic font-serif">
												{
													list[currentSlide].agency
														.title
												}
											</p>
										</React.Fragment>
									)}
									{list[currentSlide].production && (
										<React.Fragment>
											<p className="font-12 col-span-1">
												Production:
											</p>
											<p className="font-12 col-span-2 italic font-serif">
												{
													list[currentSlide]
														.production.title
												}
											</p>
										</React.Fragment>
									)}
								</div>
								<div className="col-span-1">
									{list[currentSlide].year && (
										<p className="text-right font-12">
											EF©{list[currentSlide].year}
										</p>
									)}
								</div>
							</div>
						</Link>
					),
				)}
			</div>
		</div>
	);

	const desktopButtons = (
		<React.Fragment>
			<p
				style={{...leftPosition}}
				className={cx(
					'hidden 1000:block 1000:fixed text-center text-16 font-serif italic transition-opacity duration-200 -translate-x-1/2 -translate-y-1/2 pointer-events-none',
					{
						'opacity-0': !isHoveringLeftButton,
						'opacity-100': isHoveringLeftButton,
					},
				)}>
				{currentSlide - 2 < 0 ? list.length : currentSlide}/
				{list.length}
			</p>
			<button
				{...leftButtonHoverProps}
				title="Previous"
				className="hidden 1000:block 1000:absolute 1000:top-1/2 1000:-translate-y-1/2 1000:left-20 py-10 cursor-none"
				onClick={onClickLeft}>
				<Arrow />
			</button>

			<button
				{...rightButtonHoverProps}
				title="Next"
				className="hidden 1000:block 1000:absolute 1000:top-1/2 1000:-translate-y-1/2 1000:right-20 py-10 cursor-none"
				onClick={onClickRight}>
				<Arrow className="rotate-180" />
			</button>
			<p
				style={{...rightPosition}}
				className={cx(
					'hidden 1000:block 1000:fixed text-center text-16 font-serif italic transition-opacity duration-200 -translate-x-1/2 -translate-y-1/2 pointer-events-none',
					{
						'opacity-0': !isHoveringRightButton,
						'opacity-100': isHoveringRightButton,
					},
				)}>
				{currentSlide + 2 > list.length ? 1 : currentSlide + 2}/
				{list.length}
			</p>
		</React.Fragment>
	);

	const desktopCarousel = (
		<div className="1000:block relative">
			<motion.div
				key={currentSlide}
				initial={{opacity: 0}}
				animate={{opacity: 1}}
				exit={{opacity: 0}}
				transition={{duration: ROUTE_DURATION / 1000}}
				className="hidden 1000:block max-w-[800px] w-1/2 mx-auto">
				<Link
					title={list[currentSlide].title}
					url={`/work/${list[currentSlide].slug}`}>
					<p className="text-center text-20 italic font-serif">
						{list[currentSlide].title}
					</p>
					<div {...hoverProps} className="mt-16">
						<div className="rounded-6 overflow-hidden relative h-0 pt-[56.25%]">
							<div className="absolute inset-0 h-full w-full">
								<SanityMuxPlayer
									ref={videoRef}
									assetDocument={
										list[currentSlide].thumbnail ||
										list[currentSlide].video
									}
									autoload
									loop
									muted
									showControls={false}
									playsInline
								/>
							</div>
						</div>
						<div className="hidden 1000:flex justify-between mt-15">
							<div className="flex gap-43">
								{list[currentSlide].director && (
									<p className="font-12 col-span-1">
										Director:{' '}
										<span className="font-12 col-span-2 italic font-serif">
											{list[currentSlide].director.title}
										</span>
									</p>
								)}
								{list[currentSlide].dop && (
									<p className="font-12 col-span-1">
										DOP:{' '}
										<span className="font-12 col-span-2 italic font-serif">
											{list[currentSlide].dop}
										</span>
									</p>
								)}
								{list[currentSlide].agency && (
									<p className="font-12 col-span-1">
										Agency:{' '}
										<span className="font-12 col-span-2 italic font-serif">
											{list[currentSlide].agency.title}
										</span>
									</p>
								)}
								{list[currentSlide].category && (
									<p className="font-12 col-span-1">
										Category:{' '}
										<span className="font-12 col-span-2 italic font-serif">
											{list[currentSlide].category.title}
										</span>
									</p>
								)}
							</div>
							{list[currentSlide].year && (
								<p className="text-right font-12">
									EF©{list[currentSlide].year}
								</p>
							)}
						</div>
					</div>
				</Link>
				<div className="mt-24 grid grid-cols-4 gap-20 1000:hidden">
					<div className="col-span-3 grid grid-cols-3">
						{list[currentSlide].director && (
							<React.Fragment>
								<p className="font-12 col-span-1">Director:</p>
								<p className="font-12 col-span-2 italic font-serif">
									{list[currentSlide].director.title}
								</p>
							</React.Fragment>
						)}
						{list[currentSlide].dop && (
							<React.Fragment>
								<p className="font-12 col-span-1">DOP:</p>
								<p className="font-12 col-span-2 italic font-serif">
									{list[currentSlide].dop}
								</p>
							</React.Fragment>
						)}
						{list[currentSlide].agency && (
							<React.Fragment>
								<p className="font-12 col-span-1">Agency:</p>
								<p className="font-12 col-span-2 italic font-serif">
									{list[currentSlide].agency.title}
								</p>
							</React.Fragment>
						)}
						{list[currentSlide].production && (
							<React.Fragment>
								<p className="font-12 col-span-1">
									Production:
								</p>
								<p className="font-12 col-span-2 italic font-serif">
									{list[currentSlide].production.title}
								</p>
							</React.Fragment>
						)}
					</div>
					<div className="col-span-1">
						{list[currentSlide].year && (
							<p className="text-right font-12">
								EF©{list[currentSlide].year}
							</p>
						)}
					</div>
				</div>
			</motion.div>

			{desktopButtons}
		</div>
	);

	return (
		<div className="h-full ">
			{mobileCarousel}
			{desktopCarousel}

			{mobileButtons}
		</div>
	);
};

export default HomeProjectCarousel;
