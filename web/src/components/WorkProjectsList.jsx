import React, {useState, useEffect} from 'react';
import ProjectTile from './ProjectTile';

import {m as motion, AnimatePresence} from 'framer-motion';

import chunk from 'lodash/chunk';

const ROUTE_DURATION = 400;

const WorkProjectsList = ({
	selectedType,
	selectedCategory,
	list,
	filteredCategoryPosts,
}) => {
	const chunkedList = chunk(list, 12);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isUpdatingList, setIsUpdatingList] = useState(false);

	const scrollListener = () => {
		if (
			currentIndex < chunkedList.length - 1 &&
			window.innerHeight + window.scrollY >= document.body.offsetHeight
		) {
			setIsUpdatingList(true);
			setCurrentIndex(currentIndex + 1);
			setIsUpdatingList(false);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', scrollListener);
		return () => {
			window.removeEventListener('scroll', scrollListener);
		};
	}, [currentIndex]);

	return (
		<AnimatePresence mode="wait">
			{!selectedType && (
				<motion.section
					key={selectedType}
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					exit={{opacity: 0}}
					transition={{duration: ROUTE_DURATION / 1000}}
					className="mt-56 1000:mt-35 1000:pb-56 1700:py-56 px-16">
					<AnimatePresence mode="wait">
						{!selectedCategory && (
							<motion.div
								key={selectedCategory}
								className="grid grid-cols-4 1000:grid-cols-12 gap-20 1000:gap-y-36"
								initial={{
									opacity: 0,
									y: 20,
								}}
								animate={{
									opacity: 1,
									y: 0,
								}}
								exit={{
									opacity: 0,
									y: 20,
								}}
								transition={{duration: ROUTE_DURATION / 1000}}>
								{chunkedList
									.slice(0, currentIndex + 1)
									.flat()
									.map(({_key, ...project}) => (
										<AnimatePresence>
											<motion.div
												initial={{opacity: 0}}
												animate={{opacity: 1}}
												exit={{opacity: 0}}
												transition={{
													duration:
														ROUTE_DURATION / 1000,
												}}
												key={_key}
												className="col-span-4">
												<ProjectTile {...project} />
											</motion.div>
										</AnimatePresence>
									))}
								{currentIndex < chunkedList.length - 1 && (
									<p className="col-span-4 1000:col-span-12 font-sans text-12 py-80 underline text-center">
										{isUpdatingList
											? 'Loading...'
											: 'More...'}
									</p>
								)}
							</motion.div>
						)}
						{selectedCategory && filteredCategoryPosts.length > 0 && (
							<motion.div
								key={selectedCategory}
								className="grid grid-cols-4 1000:grid-cols-12 gap-20"
								initial={{
									opacity: 0,
									y: 20,
								}}
								animate={{
									opacity: 1,
									y: 0,
								}}
								exit={{
									opacity: 0,
									y: 20,
								}}
								transition={{duration: ROUTE_DURATION / 1000}}>
								{filteredCategoryPosts.map(
									({_key, ...project}) => (
										<div key={_key} className="col-span-4">
											<ProjectTile {...project} />
										</div>
									),
								)}
							</motion.div>
						)}
					</AnimatePresence>
				</motion.section>
			)}
		</AnimatePresence>
	);
};

export default WorkProjectsList;
