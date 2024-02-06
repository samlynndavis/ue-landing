import '../styles/main.scss';

import React, {useState, useEffect} from 'react';

import IntroSplash from '../components/IntroSplash';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from 'next/head';

import {getSiteData} from '../api/sanity';

import Router from 'next/router';
import {
	m as motion,
	AnimatePresence,
	LazyMotion,
	domAnimation,
} from 'framer-motion';

import {useStore} from '../store/useStore';
import useLowPowerMode from '../hooks/useLowPowerMode';

import isBrowser from '../utils/isBrowser';

const ROUTE_DURATION = 400;

export const getStaticProps = async ({params}) => {
	const [site] = await Promise.all([getSiteData()]);

	return {
		props: {
			...site,
		},
	};
};

const App = ({Component, pageProps, router}) => {
	const {asPath} = router;

	const isLowPowerMode = useLowPowerMode();

	const {setProjects, isDarkMode, hydrateDarkMode, toggleHasSeenIntro} =
		useStore(
			({
				setProjects,
				isDarkMode,
				hydrateDarkMode,
				toggleHasSeenIntro,
			}) => ({
				setProjects,
				isDarkMode,
				hydrateDarkMode,
				toggleHasSeenIntro,
			}),
		);

	const [isLoading, setLoading] = useState(false);

	const {config, projects, splash} = pageProps;

	const resetScroll = () => {
		setTimeout(() => {
			window.scrollTo(0, 0);
		}, 100);
	};

	const calculateVh = () => {
		const vh = window.innerHeight;
		document.documentElement.style.setProperty('--vh', vh + 'px');
	};

	useEffect(() => {
		calculateVh();
		global.addEventListener('resize', calculateVh);
		return () => {
			global.removeEventListener('resize', calculateVh);
		};
	}, []);

	// Kick off side effects
	useEffect(() => {
		setProjects(projects);
	}, []);

	useEffect(() => {
		hydrateDarkMode();
		// hydrateIntro();
	}, []);

	useEffect(() => {
		if (isLowPowerMode) toggleHasSeenIntro();
	}, [isLowPowerMode]);

	// Setup Next router events
	useEffect(() => {
		Router.events.on('routeChangeStart', (url, {shallow}) => {
			// Bail if we're just changing URL parameters

			if (
				(url.indexOf('?') > -1 &&
					url.split('?')[0] === asPath.split('?')[0]) ||
				shallow
			)
				return;

			// Otherwise, start loading
			setLoading(true);
		});

		Router.events.on('routeChangeComplete', () => {
			setLoading(false);
		});

		Router.events.on('routeChangeError', () => {
			setLoading(false);
		});
	}, []);

	// Set cursor based on loading state
	useEffect(() => {
		if (isBrowser && isLoading) {
			window.document.documentElement.classList.add('cursor-wait');
		} else {
			window.document.documentElement.classList.remove('cursor-wait');
		}
	}, [isLoading]);

	// Toggle Dark mode
	useEffect(() => {
		if (isBrowser && isDarkMode) {
			window.document.documentElement.classList.add('bg-black');
			window.document.documentElement.classList.remove('bg-[#C3D4D6]');
		} else {
			window.document.documentElement.classList.remove('bg-black');
			window.document.documentElement.classList.add('bg-[#C3D4D6]');
		}
	}, [isDarkMode]);

	// The scroll location on the page is not restored on history changes
	// TODO: https://github.com/vercel/next.js/issues/3303
	useEffect(() => {
		window.history.scrollRestoration = 'manual';
	}, [router]);

	// Site credit on load
	useEffect(() => {
		// Code credit
		console.group('Site Credits');
		console.log(
			'Web Design by Bureau for Visual Communications https://www.bvk.international/',
		);
		console.log(
			'Web Development by Buena Suerte https://buena-suerte.studio',
		);
		console.groupEnd();
	}, []);

	const animatedRoutes = (
		<AnimatePresence mode="wait" onExitComplete={resetScroll}>
			<motion.main
				key={asPath?.split('?')[0]}
				initial={{opacity: 0}}
				animate={{opacity: 1}}
				exit={{opacity: 0}}
				transition={{
					duration: ROUTE_DURATION / 1000,
				}}
				className="min-h-full-screen flex flex-col">
				<Component {...pageProps} loading={isLoading} />
			</motion.main>
			<Footer asPath={asPath} {...config} />
		</AnimatePresence>
	);

	const siteFragment = (
		<LazyMotion features={domAnimation} strict>
			<motion.div
				initial={{opacity: 0}}
				animate={{opacity: 1}}
				exit={{opacity: 0}}
				transition={{duration: ROUTE_DURATION / 1000}}>
				<IntroSplash splash={splash} asPath={asPath} />
				<Header asPath={asPath} />
				{animatedRoutes}
			</motion.div>
		</LazyMotion>
	);

	const headStyles = <Head />;

	return (
		<React.Fragment>
			{headStyles}
			{siteFragment}
		</React.Fragment>
	);
};

export default App;
