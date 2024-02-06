import React, {useState, useEffect} from 'react';
import Link from './Link';

import dynamic from 'next/dynamic';

const WorkFullScreenVideoPlayer = dynamic(() =>
	import('./WorkFullScreenVideoPlayer'),
);

import {m as motion, AnimatePresence} from 'framer-motion';

import {useStore} from '../store/useStore';

const ROUTE_DURATION = 400;

const VideoPlayerWrapper = ({video, poster, selectedItem, isDarkMode}) => {
	if (!video) return null;
	const [shouldPlay, setShouldPlay] = useState(false);

	useEffect(() => {
		const header = document.querySelector('.header');
		const shouldRenderVideo = selectedItem?._id === video?._id;
		setShouldPlay(shouldRenderVideo);

		if (shouldRenderVideo) {
			header.classList.remove('bg-black', 'bg-grey');
		}
		return () => {
			setShouldPlay(false);
			header.classList.add(isDarkMode ? 'bg-black' : 'bg-grey');
		};
	}, [selectedItem]);

	return (
		<AnimatePresence mode="wait">
			{shouldPlay && (
				<motion.div
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					exit={{opacity: 0}}
					transition={{duration: ROUTE_DURATION / 1000}}
					className="fixed inset-0 pointer-events-none z-0 h-screen w-screen">
					<WorkFullScreenVideoPlayer poster={poster} video={video} />
				</motion.div>
			)}
		</AnimatePresence>
	);
};

const WorkColumnsList = ({
	selectedType,
	selectedCategory,
	directors,
	agencies,
	productionCompanies,
}) => {
	const [selectedItem, setSelectedItem] = useState(null);

	const {isDarkMode} = useStore(({isDarkMode}) => ({isDarkMode}));

	// const {query} = useRouter();

	const backgroundVideos = (
		<React.Fragment>
			{selectedType === 'director' && (
				<React.Fragment>
					{directors.map(({_key, video, poster}) => (
						<VideoPlayerWrapper
							key={_key}
							video={video}
							poster={poster}
							selectedItem={selectedItem}
							isDarkMode={isDarkMode}
						/>
					))}
				</React.Fragment>
			)}
			{selectedType === 'production' && (
				<React.Fragment>
					{productionCompanies.map(({_key, video, poster}) => (
						<VideoPlayerWrapper
							key={_key}
							video={video}
							poster={poster}
							selectedItem={selectedItem}
							isDarkMode={isDarkMode}
						/>
					))}
				</React.Fragment>
			)}
			{selectedType === 'agency' && (
				<React.Fragment>
					{agencies.map(({_key, video, poster}) => (
						<VideoPlayerWrapper
							key={_key}
							video={video}
							poster={poster}
							selectedItem={selectedItem}
							isDarkMode={isDarkMode}
						/>
					))}
				</React.Fragment>
			)}
		</React.Fragment>
	);

	const directorsList = selectedType === 'director' && (
		<React.Fragment>
			{directors.map(({_key, title, video, slug}) => (
				<li key={_key} className="col-span-1 text-center">
					<Link
						title={`Director: ${title}`}
						url={`/directors/${slug}`}
						onMouseEnter={() => setSelectedItem(video)}
						onMouseLeave={() => setSelectedItem(null)}
						className="font-serif hover:italic text-24 leading-42 cursor-pointer">
						{title}
					</Link>
				</li>
			))}
		</React.Fragment>
	);

	const productionList = selectedType === 'production' && (
		<React.Fragment>
			{productionCompanies.map(({_key, title, video, slug}) => (
				<li key={_key} className="col-span-1 text-center">
					<Link
						title={`Production Company: ${title}`}
						url={`/production-companies/${slug}`}
						onMouseEnter={() => setSelectedItem(video)}
						onMouseLeave={() => setSelectedItem(null)}
						className="font-serif hover:italic text-24 leading-42 cursor-pointer">
						{title}
					</Link>
				</li>
			))}
		</React.Fragment>
	);

	const agencyList = selectedType === 'agency' && (
		<React.Fragment>
			{agencies.map(({_key, title, video, slug}) => (
				<li key={_key} className="col-span-1 text-center">
					<Link
						title={`Agency: ${title}`}
						url={`/agencies/${slug}`}
						onMouseEnter={() => setSelectedItem(video)}
						onMouseLeave={() => setSelectedItem(null)}
						className="font-serif hover:italic text-24 leading-42 cursor-pointer">
						{title}
					</Link>
				</li>
			))}
		</React.Fragment>
	);

	return (
		<React.Fragment>
			<AnimatePresence mode="wait">
				{selectedType && (
					<motion.section
						key={selectedType}
						initial={{
							opacity: 0,
							y: 10,
						}}
						animate={{
							opacity: 1,
							y: 0,
						}}
						exit={{
							opacity: 0,
							y: 10,
						}}
						transition={{duration: (ROUTE_DURATION * 1.2) / 1000}}
						className="mt-56 1000:mt-0 1000:fixed 1000:inset-0 1000:flex 1000:flex-col 1000:justify-center px-16 z-8 ">
						<AnimatePresence mode="wait">
							<motion.div
								key={selectedType}
								className="grid grid-cols-4 1000:grid-cols-12 gap-20"
								initial={{
									opacity: 0,
									y: 10,
								}}
								animate={{
									opacity: 1,
									y: 0,
								}}
								exit={{
									opacity: 0,
									y: 10,
								}}
								transition={{
									duration: (ROUTE_DURATION * 1.2) / 1000,
								}}>
								<ul className="col-span-4 1000:col-span-8 1000:col-start-3 grid grid-cols-1 1000:grid-cols-3">
									{directorsList}
									{productionList}
									{agencyList}
								</ul>
							</motion.div>
						</AnimatePresence>
					</motion.section>
				)}
			</AnimatePresence>
			{backgroundVideos}
		</React.Fragment>
	);
};

export default WorkColumnsList;
