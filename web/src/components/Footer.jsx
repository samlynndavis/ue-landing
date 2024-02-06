import React from 'react';
import Link from './Link';
import EFLogo from './EFLogo';
import BlockContent from '@sanity/block-content-to-react';

import {m as motion, AnimatePresence} from 'framer-motion';

import {useStore} from '../store/useStore';

import cx from 'classnames';
import richText from '../serializers/richText';

const ROUTE_DURATION = 400;

const Footer = ({address, phone, email, coordinates, asPath}) => {
	const {isDarkMode} = useStore(({isDarkMode}) => ({
		isDarkMode,
	}));
	return (
		// <footer
		// 	className={cx(
		// 		'mt-auto p-16 pt-1 grid grid-cols-4 1000:grid-cols-12 gap-y-32 1000:gap-y-20 gap-20 items-end z-9 relative footer',
		// 		{
		// 			'1000:mt-0 1000:sticky 1000:bottom-0': asPath === '/about',
		// 			'snap-start': asPath !== '/about',
		// 			'bg-[#C3D4D6]': !isDarkMode,
		// 			'bg-black': isDarkMode,
		// 		},
		// 	)}>
		// 	<div className="col-span-2 1000:hidden rich-text line-break text-12 leading-14">
		// 		<BlockContent blocks={address} serializers={richText} />
		// 	</div>
		// 	<div className="col-span-2 1000:hidden">
		// 		<Link
		// 			url={`tel:${phone}`}
		// 			className="font-sans text-12 leading-14 block underline transition-underline duration-400 decoration-transparent hover:decoration-current">
		// 			{phone}
		// 		</Link>
		// 		<Link
		// 			url={`mailto:${email}`}
		// 			className="font-sans text-12 leading-14 block underline transition-underline duration-400 decoration-transparent hover:decoration-current">
		// 			{email}
		// 		</Link>
		// 	</div>
		// 	<div className="col-span-4 1000:col-span-2">
		// 		<div className="flex justify-between 1000:static items-baseline">
		// 			<p className="uppercase text-18">
		// 				<EFLogo className="h-14 w-auto -translate-y-2 inline-block" />

		// 				{new Date().getFullYear()}
		// 			</p>
		// 			<p className="font-serif italic text-12 leading-20 1000:hidden">
		// 				{coordinates}
		// 			</p>
		// 		</div>
		// 		<p className="font-sans text-8 leading-10 mt-8">
		// 			Copyright Emote Films® {new Date().getFullYear()}. All
		// 			rights reserved. The Emote Films logo and logotype are the
		// 			property of Emote Films D.O.O. and cannot be used or
		// 			reproduced without explicit consent
		// 		</p>
		// 	</div>
		// 	<AnimatePresence mode="wait">
		// 		{asPath !== '/contact' && (
		// 			<motion.div
		// 				initial={{opacity: 0}}
		// 				animate={{opacity: 1}}
		// 				exit={{opacity: 0}}
		// 				transition={{duration: ROUTE_DURATION / 1000}}
		// 				className="hidden 1000:block col-span-1 col-start-4">
		// 				<Link
		// 					url="/work"
		// 					className="font-sans text-12 underline">
		// 					Work →
		// 				</Link>
		// 			</motion.div>
		// 		)}
		// 	</AnimatePresence>
		// 	<AnimatePresence mode="wait">
		// 		{asPath !== '/contact' && (
		// 			<motion.div
		// 				initial={{opacity: 0}}
		// 				animate={{opacity: 1}}
		// 				exit={{opacity: 0}}
		// 				transition={{duration: ROUTE_DURATION / 1000}}
		// 				className="hidden 1000:block col-span-1">
		// 				<Link
		// 					url="/about"
		// 					className="font-sans text-12 underline">
		// 					About →
		// 				</Link>
		// 			</motion.div>
		// 		)}
		// 	</AnimatePresence>
		// 	<AnimatePresence mode="wait">
		// 		{asPath !== '/contact' && (
		// 			<motion.div
		// 				initial={{opacity: 0}}
		// 				animate={{opacity: 1}}
		// 				exit={{opacity: 0}}
		// 				transition={{duration: ROUTE_DURATION / 1000}}
		// 				className="hidden 1000:block col-span-1">
		// 				<Link
		// 					url="/contact"
		// 					className="font-sans text-12 underline">
		// 					Contact →
		// 				</Link>
		// 			</motion.div>
		// 		)}
		// 	</AnimatePresence>
		// 	<AnimatePresence mode="wait">
		// 		{asPath !== '/contact' && (
		// 			<motion.div
		// 				initial={{opacity: 0}}
		// 				animate={{opacity: 1}}
		// 				exit={{opacity: 0}}
		// 				transition={{duration: ROUTE_DURATION / 1000}}
		// 				className="hidden 1000:block col-span-2 col-start-8 rich-text line-break text-12 leading-14">
		// 				<BlockContent blocks={address} serializers={richText} />
		// 			</motion.div>
		// 		)}
		// 	</AnimatePresence>

		// 	<motion.div
		// 		initial={{opacity: 0}}
		// 		animate={{opacity: 1}}
		// 		exit={{opacity: 0}}
		// 		transition={{duration: ROUTE_DURATION / 1000}}
		// 		className="col-span-3 col-end-13 hidden 1000:flex justify-between items-end">
		// 		{asPath !== '/contact' && (
		// 			<nav>
		// 				<Link
		// 					url={`tel:${phone}`}
		// 					className="font-sans text-12 leading-14 block underline transition-underline duration-400 decoration-transparent hover:decoration-current w-fit">
		// 					{phone}
		// 				</Link>
		// 				<Link
		// 					url={`mailto:${email}`}
		// 					className="font-sans text-12 leading-14 block underline transition-underline duration-400 decoration-transparent hover:decoration-current w-fit">
		// 					{email}
		// 				</Link>
		// 			</nav>
		// 		)}
		// 		<Link
		// 			title="View on Google Maps"
		// 			url={`https://www.google.com/maps/place/${coordinates}`}
		// 			openInNewWindow
		// 			className="font-serif italic text-12 leading-20 link--underline--hover ml-auto">
		// 			{coordinates}
		// 		</Link>
		// 	</motion.div>
		// </footer>
		<footer
			className={cx(
				'mt-auto p-16 pt-1 flex justify-center items-center z-9 relative footer',
				{
					'1000:mt-0 1000:sticky 1000:bottom-0': asPath === '/about',
					'snap-start': asPath !== '/about',
					'bg-[#C3D4D6]': !isDarkMode,
					'bg-black': isDarkMode,
				},
			)}>
			{/* <div className="col-span-2 1000:hidden rich-text line-break text-12 leading-14">
				<BlockContent blocks={address} serializers={richText} />
			</div>
			<div className="col-span-2 1000:hidden">
				<Link
					url={`tel:${phone}`}
					className="font-sans text-12 leading-14 block underline transition-underline duration-400 decoration-transparent hover:decoration-current">
					{phone}
				</Link>
				<Link
					url={`mailto:${email}`}
					className="font-sans text-12 leading-14 block underline transition-underline duration-400 decoration-transparent hover:decoration-current">
					{email}
				</Link>
			</div>
			<div className="col-span-4 1000:col-span-2">
				<div className="flex justify-between 1000:static items-baseline">
					<p className="uppercase text-18">
						<EFLogo className="h-14 w-auto -translate-y-2 inline-block" />

						{new Date().getFullYear()}
					</p>
					<p className="font-serif italic text-12 leading-20 1000:hidden">
						{coordinates}
					</p>
				</div>
				<p className="font-sans text-8 leading-10 mt-8">
					Copyright Emote Films® {new Date().getFullYear()}. All
					rights reserved. The Emote Films logo and logotype are the
					property of Emote Films D.O.O. and cannot be used or
					reproduced without explicit consent
				</p>
			</div> */}
			<AnimatePresence mode="wait">
				{asPath !== '/contact' && (
					<motion.div
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
						transition={{duration: ROUTE_DURATION / 1000}}
						className="hidden 1000:block col-span-1 col-start-4">
						{/* <Link
							url="/work"
							className="font-sans text-12 underline">
							Work →
						</Link> */}
						<div className="bg-[#709094] rounded-full w-24 h-24" url="/" />
					</motion.div>
				)}
			</AnimatePresence>
			{/* <AnimatePresence mode="wait">
				{asPath !== '/contact' && (
					<motion.div
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
						transition={{duration: ROUTE_DURATION / 1000}}
						className="hidden 1000:block col-span-1">
						<Link
							url="/about"
							className="font-sans text-12 underline">
							About →
						</Link>
					</motion.div>
				)}
			</AnimatePresence>
			<AnimatePresence mode="wait">
				{asPath !== '/contact' && (
					<motion.div
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
						transition={{duration: ROUTE_DURATION / 1000}}
						className="hidden 1000:block col-span-1">
						<Link
							url="/contact"
							className="font-sans text-12 underline">
							Contact →
						</Link>
					</motion.div>
				)}
			</AnimatePresence>
			<AnimatePresence mode="wait">
				{asPath !== '/contact' && (
					<motion.div
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
						transition={{duration: ROUTE_DURATION / 1000}}
						className="hidden 1000:block col-span-2 col-start-8 rich-text line-break text-12 leading-14">
						<BlockContent blocks={address} serializers={richText} />
					</motion.div>
				)}
			</AnimatePresence> */}

			<motion.div
				initial={{opacity: 0}}
				animate={{opacity: 1}}
				exit={{opacity: 0}}
				transition={{duration: ROUTE_DURATION / 1000}}
				className="col-span-3 col-end-13 hidden 1000:flex justify-between items-end">
				{asPath !== '/contact' && (
					<nav>
						<Link
							url={`tel:${phone}`}
							className="font-sans text-12 leading-14 block underline transition-underline duration-400 decoration-transparent hover:decoration-current w-fit">
							{phone}
						</Link>
						<Link
							url={`mailto:${email}`}
							className="font-sans text-12 leading-14 block underline transition-underline duration-400 decoration-transparent hover:decoration-current w-fit">
							{email}
						</Link>
					</nav>
				)}
				{/* <Link
					title="View on Google Maps"
					url={`https://www.google.com/maps/place/${coordinates}`}
					openInNewWindow
					className="font-serif italic text-12 leading-20 link--underline--hover ml-auto">
					{coordinates}
				</Link> */}
			</motion.div>
		</footer>
	);
};

export default Footer;
