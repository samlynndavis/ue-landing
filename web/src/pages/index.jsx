import React, {useRef, useState, useEffect} from 'react';
// import HomeProjectCarousel from '../components/HomeProjectCarousel';
import Seo from '../components/Seo';
import LogoSmall from '../components/Logo';
import BlockContent from '@sanity/block-content-to-react';

import {m as motion, AnimatePresence} from 'framer-motion';
import {getSiteData, getHomepage, getHomepageDraft} from '../api/sanity';
import {useStore} from '../store/useStore';

import reduce from 'lodash/reduce';
import richText from '../serializers/richText';

const ROUTE_DURATION = 400;

export const getStaticProps = async ({preview, previewData}) => {
	const pageRequest = preview
		? getHomepageDraft(previewData.draftId)
		: getHomepage();

	const [site, homepage] = await Promise.all([getSiteData(), pageRequest]);

	return {
		props: {
			...site,
			...homepage,
		},
		revalidate: 60,
	};
};

const Homepage = ({config = {}, seo = {}, list = [], description}) => {
	const [descHeight, setDescHeight] = useState(0);

	const descEl = useRef(null);

	const determineHeight = () => {
		if (descEl.current) {
			if (window.innerWidth < 1000) {
				setDescHeight(
					descEl.current.getBoundingClientRect().height + 50,
				);
			} else {
				setDescHeight(descEl.current.getBoundingClientRect().height);
			}
		}
	};

	useEffect(() => {
		determineHeight();
		window.addEventListener('resize', determineHeight);
		return () => {
			window.removeEventListener('resize', determineHeight);
		};
	}, []);

	const defaultMeta = config?.seo || seo || {};

	const fallbackMeta = {
		metaTitle: 'Universal Element®',
		openGraphTitle: 'Universal Element®',
		twitterTitle: 'Universal Element®',
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

	const {hasSeenIntro} = useStore(({hasSeenIntro}) => ({hasSeenIntro}));

	return (
		<React.Fragment>
			<Seo {...meta} />
			<AnimatePresence mode="wait">
				<motion.section
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					exit={{opacity: 0}}
					transition={{
						delay: hasSeenIntro ? 0 : ROUTE_DURATION / 1000,
						duration: ROUTE_DURATION / 1000,
					}}
					className="flex flex-col 1000:h-full-screen 1000:max-h-full-screen font-sans">
					<div
						style={{
							// height: `calc(var(--vh) - ${descHeight}px)`,
						}}>
							<div className="flex flex-col items-center justify-center relative mx-auto 1000:px-100 px-45 py-40">
								<h1 className="1000:text-48 text-18 1000:leading-60 leading-28 1000:py-100 py-40">Universal Element brings to you the purest water nature intended, made possible by science, in the way nature intended.</h1>
								<div className="800:flex 800:flex-col 1000:grid 1000:grid-cols-2 1000:gap-100 1000:py-100 gap-50 text-justify">
										<div className="pb-20">
											<div>
												<h2 className="1000:text-24 text-18 1000:pb-20 pb-10 uppercase">
												Water Bottles
												</h2>
												<p className="1000:text-16 text-13 pb-20 leading-24">Our anti-microbial 550ml and 800ml water bottles are based on the patented Merella technology originally developed for the healthcare sector. For the bottle to self-sanitise, it only needs to be left empty for 5 minutes. Independent lab tests have confirmed that 99% bacteria disappear within that time.</p>
												<p className="1000:text-16 text-13 pb-20 leading-24">The technology is not silver-coating based. Rather the molecules are compounded into our plastic, and the self-sanitising properties become inherent to the bottle. Our anti-microbial additive cannot be washed out, abraded away, or leached into the beverages.</p>
											</div>
											<div className="pb-20">
										<p className="1000:text-16 text-13 leading-24 pb-10">Merella is a polymer. Polymer is Greek for ”many units”. Our anti-microbial additive is a macromolecule containing thousands of anti-microbial moieties packaged together. It combines the antimicrobial performance of small molecule quaternary ammonium compounds with the cleansing function of surfactants. A large molecule, it is stable within the material it is compounded with, and will not leach. The performance of the macromolecule is greater than the sum of its parts.</p>
									</div>
											{/* <ul className="list-disc pl-20">
												<li className="pb-10 text-11">Merella is a polymer ▹ Polymer is Greek for ”many ones” ▹ Macromolecule containing thousands of antimicrobial moieties packaged together ▹ Combines the antimicrobial performance of small molecule quaternary ammonium compounds with the cleansing function of surfactants (e.g. soap) The performance of the macromolecule is greater than the sum of its parts.</li>
												<li className="pb-10 text-11">Merella is an additive ▹ Plastics are composed of polymers (e.g. polypropylene, polystyrene, etc.) and additives (e.g. colorants, plasticizers, rheological modifiers, etc.) It is incorporated at 1-5% wt/wt ▹ Compounded and dissolved into commodity plastics and materials.</li>
												<li className="pb-10 text-11">The antimicrobial performance becomes inherent to the carrier material. It cannot be washed, worn, or abraded away.</li>
											</ul> */}
										</div>
										{/* <div className="pb-20">
										<h2 className="1000:text-24 text-18 1000:pb-30 pb-10 uppercase">The Science</h2>
										<p className="1000:text-16 text-13 leading-24 pb-10">Merella is a polymer. Polymer is Greek for ”many units”. Our anti-microbial additive is a macromolecule containing thousands of anti-microbial moieties packaged together. It combines the antimicrobial performance of small molecule quaternary ammonium compounds with the cleansing function of surfactants. A large molecule, it is stable within the material it is compounded with, and will not leach. The performance of the macromolecule is greater than the sum of its parts.</p>
									</div> */}
									<div className="">
										<h2 className="1000:text-24 text-18 1000:pb-20 pb-10 uppercase">
										Refill Stations
										</h2>
										<p className="1000:text-16 text-13 leading-24 1000:pb-20 pb-10">We use state of the art science to make absolutely pure yet affordable drinking water available to all. Our technology combines a 2-stage carbon filtration followed by the highest grade Reverse Osmosis membranes, followed by a deionization module. The process ensures the finest of hazardous micro-organisms are removed.</p>
										<p className="1000:text-16 text-13 leading-24 1000:pb-20 pb-10">Our water is filtrated in-situ, at a close to zero-carbon footprint. It uses the most powerful technology and eliminates forever chemicals, nitrates, phosphates and metals, pathogens, synthetic and natural oestrogen, and microplastics. Those contaminants have been proven to damage our health, and are all too often present in our tap water, whilst microplastics have made their way into bottled water.</p>
										<p className="1000:text-16 text-13 leading-24 pb-10">We also support Green Chemistry in its quest to innovate and restore nature’s wonders. Green Chemistry’s pledge is to eliminate persistent, bioaccumulative, toxic contaminants altogether, not just temporarily dilute them or recycle them somewhere else.</p>
										
										{/* <p className="1000:text-16 text-13 leading-24 pb-10">Our mission is to make absolutely pure drinking water available to all, in the streets, at a fraction of the price of bottled water and its microplastics. Our mission I to be kind to your health and to the health of our planet. Both go hand in hand. We are also supporting Green Chemistry in its quest to innovate whilst being kind to nature. Green Chemistry’s pledge is to eliminate contaminants altogether, not just temporarily dilute them or recycle them somewhere else. Watch out for our re-fill stations.</p> */}
									</div>
									</div>
									<LogoSmall className="w-auto text-current 1000:absolute 1000:flex hidden" />
								</div>
							</div>
						{/* <HomeProjectCarousel list={list} /> */}
					{description && (
						<div ref={descEl} className="1000:py-50 ">
							<div className="font-sans line-break text-center rich-text text-18 1000:text-24 mx-auto max-w-[58ch] w-full">
								<BlockContent
									blocks={description}
									serializers={richText}
								/>
							</div>
						</div>
					)}
				</motion.section>
			</AnimatePresence>
		</React.Fragment>
	);
};

export default Homepage;
