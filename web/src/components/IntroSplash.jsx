import React, {useEffect, useState} from 'react';
import Logo from './Logo';
import SanityMuxPlayer from 'sanity-mux-player';
// import MuxPlayer from '@mux/mux-player-react';

import useInterval from 'buena-suerte/lib/hooks/useInterval';
import {m as motion, AnimatePresence} from 'framer-motion';

import {useStore} from '../store/useStore';

const ROUTE_DURATION = 400;

const IntroSplash = ({asPath, splash}) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const {hasSeenIntro, toggleHasSeenIntro} = useStore(
		({hasSeenIntro, toggleHasSeenIntro}) => ({
			hasSeenIntro,
			toggleHasSeenIntro,
		}),
	);

	useInterval(
		() => {
			toggleHasSeenIntro();
		},
		isPlaying ? 5000 : null,
	);

	const escapeKeyListener = e => {
		if (e.key === 'Escape') {
			toggleHasSeenIntro();
		}
	};

	useEffect(() => {
		setIsPlaying(hasSeenIntro === false);
	}, [hasSeenIntro]);

	useEffect(() => {
		if (isPlaying) {
			window.addEventListener('keydown', escapeKeyListener);
		} else {
			window.removeEventListener('keydown', escapeKeyListener);
		}
		return () => {
			window.removeEventListener('keydown', escapeKeyListener);
		};
	}, []);

	return (
		<AnimatePresence mode="wait">
			{asPath === '/' && !hasSeenIntro && (
				<motion.section
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					exit={{opacity: 0}}
					transition={{duration: ROUTE_DURATION / 1000}}
					className="z-[11] fixed inset-0 h-full-screen w-screen bg-[#C3D4D6]">
					<button
						onClick={toggleHasSeenIntro}
						title="Skip Intro"
						className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[11] cursor-pointer">
						{/* <h1 className="h-32 1000:h-full w-auto text-30"> Universal Element provides naturally purified water to as many as possible, both at home and on the go, by using existing scientific methods efficiently and effectively. </h1> */}
						<Logo className="w-auto" />
					</button>
					{splash?.video && (
						<div className="image-fill h-full-screen w-screen fixed inset-0">
							<SanityMuxPlayer
								assetDocument={splash.video}
								poster={false}
								autoload
								autoplay
								loop
								muted
								showControls={false}
								playsInline
								className="h-full-screen w-screen "
							/>
						</div>
					)}
				</motion.section>
			)}
		</AnimatePresence>
	);
};

export default IntroSplash;
