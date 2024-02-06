import React, {useState, useEffect} from 'react';
// import Logo from './Logo';
import Link from './Link';

import {m as motion, AnimatePresence} from 'framer-motion';
import cx from 'classnames';

import {useStore} from '../store/useStore';

const ROUTE_DURATION = 400;

const Header = ({asPath}) => {
	const [hasScrolled, setHasScrolled] = useState(false);

	const scrollListener = () => {
		const {scrollY} = window;

		setHasScrolled(scrollY > 40);
	};

	useEffect(() => {
		window.addEventListener('scroll', scrollListener);
	}, []);

	const {isMobileMenuOpen, toggleMobileMenu, isDarkMode, toggleDarkMode} =
		useStore(
			({
				isMobileMenuOpen,
				toggleMobileMenu,
				isDarkMode,
				toggleDarkMode,
			}) => ({
				isMobileMenuOpen,
				toggleMobileMenu,
				isDarkMode,
				toggleDarkMode,
			}),
		);

	const desktopNav = (
		<nav className="gap-36 hidden 1000:flex">
			{/* <Link
				title="Work"
				className="font-sans text-12 transition-underline duration-400 underline decoration-transparent hover:decoration-current"
				url="/work">
				Work
			</Link>
			<Link
				title="About"
				className="font-sans text-12 transition-underline duration-400 underline decoration-transparent hover:decoration-current"
				url="/about">
				About
			</Link>
			<Link
				title="Contact"
				className="font-sans text-12 transition-underline duration-400 underline decoration-transparent hover:decoration-current"
				url="/contact">
				Contact
			</Link> */}
			{/* <button
				title="Toggle dark mode"
				onClick={toggleDarkMode}
				className="cursor-pointer font-sans text-12 transition-underline duration-400 underline decoration-transparent hover:decoration-current">
				{isDarkMode ? 'Light' : 'Dark'}
			</button> */}
			<div className="bg-[#709094] rounded-full w-24 h-24" url="/" />
		</nav>
	);

	const mobileMenuButton = (
		<button
			title="Toggle mobile menu"
			onClick={toggleMobileMenu}
			className="1000:hidden z-10">
			<AnimatePresence mode="wait">
				{isMobileMenuOpen ? (
					<motion.span
						key={isMobileMenuOpen}
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
						transition={{duration: ROUTE_DURATION / 1000}}>
						⮐
					</motion.span>
				) : (
					<motion.span
						key={isMobileMenuOpen}
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
						transition={{duration: ROUTE_DURATION / 1000}}
						className="text-12">
						Menu
					</motion.span>
				)}
			</AnimatePresence>
		</button>
	);

	const mobileMenu = (
		<nav
			className={cx(
				'fixed inset-0 flex flex-col justify-center items-center gap-40 1000:hidden transition-all duration-400 ',
				{
					'opacity-0 pointer-events-none': !isMobileMenuOpen,
					'opacity-100 pointer-events-auto': isMobileMenuOpen,
					'bg-[#C3D4D6]': !isDarkMode,
					'bg-black': isDarkMode,
				},
			)}>
			{/* <Link
				title="Work"
				className="font-serif italic text-24"
				onClick={toggleMobileMenu}
				url="/work">
				Work
			</Link>
			<Link
				title="About"
				className="font-serif italic text-24"
				onClick={toggleMobileMenu}
				url="/about">
				About
			</Link>
			<Link
				title="Contact"
				className="font-serif italic text-24"
				onClick={toggleMobileMenu}
				url="/contact">
				Contact
			</Link> */}
			{/* <button
				title="Toggle dark mode"
				onClick={() => {
					toggleDarkMode();
				}}
				className="font-serif italic text-24">
				{isDarkMode ? 'Light' : 'Dark'}
			</button> */}
			<div className="bg-[#709094] rounded-full w-24 h-24" url="/" />
		</nav>
	);

	return (
		<motion.header
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			exit={{opacity: 0}}
			transition={{
				delay: asPath === '/' ? ROUTE_DURATION / 1000 : 0,
				duration: ROUTE_DURATION / 1000,
			}}
			className={cx(
				'fixed top-0 left-0 right-0 z-10 p-16 pt-16 flex justify-between header',
				{
					'bg-[#C3D4D6] 1000:bg-transparent': !isDarkMode,
					'1000:bg-[#C3D4D6]': !isDarkMode && hasScrolled,
					'bg-black 1000:bg-transparent': isDarkMode,
					'1000:bg-black': isDarkMode && hasScrolled,
				},
			)}>
			<div className="bg-[#709094] rounded-full w-24 h-24" url="/">
				{/* <Logo className="1000:h-15 w-auto text-current" /> */}
			</div>
			{desktopNav}
			<AnimatePresence mode="wait">
				{(asPath?.split('?')[0] === '/work' ||
					asPath?.includes('/work/')) && (
					<motion.p
						key={asPath?.split('?')[0]}
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
						transition={{duration: ROUTE_DURATION / 1000}}
						className="hidden 1000:block fixed left-1/2 -translate-x-1/2 font-serif italic text-24 top-4">
						Work
					</motion.p>
				)}
			</AnimatePresence>
			<AnimatePresence mode="wait">
				{asPath === '/contact' && (
					<motion.p
						key={asPath}
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
						transition={{duration: ROUTE_DURATION / 1000}}
						className="hidden 1000:block fixed left-1/2 -translate-x-1/2 font-serif italic text-24 top-4">
						Contact
					</motion.p>
				)}
			</AnimatePresence>
			{mobileMenuButton}
			{mobileMenu}
		</motion.header>
	);
};

export default Header;
