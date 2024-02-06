import React, {useState, useEffect} from 'react';
import WorkProjectsList from '../../components/WorkProjectsList';
import WorkColumnsList from '../../components/WorkColumnsList';
import Seo from '../../components/Seo';

import {getSiteData, getWorkPage, getWorkPageDraft} from '../../api/sanity';
import {useRouter} from 'next/router';

import reduce from 'lodash/reduce';
import filter from 'lodash/filter';
import find from 'lodash/find';
import cx from 'classnames';

export const getStaticProps = async ({preview, previewData}) => {
	const pageRequest = preview
		? getWorkPageDraft(previewData.draftId)
		: getWorkPage();

	const [site, workpage] = await Promise.all([getSiteData(), pageRequest]);

	return {
		props: {
			...site,
			...workpage,
		},
		revalidate: 60,
	};
};

const Homepage = ({
	config = {},
	seo = {},
	categories = [],
	directors = [],
	agencies = [],
	productionCompanies = [],
	list = [],
	projects = [],
	filters,
}) => {
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [selectedType, setSelectedType] = useState(null);
	const [filteredCategoryPosts, setFilteredCategoryPosts] = useState([]);

	const defaultMeta = config?.seo || seo || {};

	const {push, query} = useRouter();

	const fallbackMeta = {
		metaTitle: 'Work – Eмоте Filмs®',
		openGraphTitle: 'Work – Eмоте Filмs®',
		twitterTitle: 'Work – Eмоте Filмs®',
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

	const updateParams = ({filterType, value}) => {
		if (value === null) {
			push('/work', undefined, {
				shallow: true,
			});
			return;
		}
		const query = `${filterType}=${value}`;

		push(`/work?${query}`, undefined, {
			shallow: true,
		});
	};

	useEffect(() => {
		const filteredCategory = find(filters, {category: selectedCategory});

		setFilteredCategoryPosts(filteredCategory?.list || []);
	}, [selectedCategory]);

	const onClickCategory = category => {
		setSelectedType(null);
		setSelectedCategory(selectedCategory !== category ? category : null);
		updateParams({
			filterType: selectedCategory !== category ? 'category' : null,
			value: selectedCategory !== category ? category : null,
		});
	};

	const onClickType = type => {
		setSelectedCategory(null);
		setSelectedType(selectedType !== type ? type : null);
		updateParams({
			filterType: selectedType !== type ? 'type' : null,
			value: selectedType !== type ? type : null,
		});
	};

	useEffect(() => {
		if (query) {
			if (query?.type) {
				setSelectedType(decodeURI(query.type));
			}
			if (query?.category) {
				setSelectedCategory(decodeURI(query.category));
			}
		}
	}, [query]);

	const filtersElement = (
		<section className="pt-120 1000:pt-86 px-32 flex flex-col gap-36 1000:gap-24 z-9 relative">
			<div className="flex justify-center align-baseline gap-40 flex-wrap">
				<button
					title="View All"
					className="cursor-pointer"
					onClick={() => onClickCategory(null)}>
					<span
						className={cx('text-14 hover:font-serif hover:italic', {
							'font-sans': selectedCategory !== null,
							'font-serif italic':
								!selectedCategory && !selectedType,
						})}>
						All
					</span>
				</button>
				{filters?.map(({_key, category}) => (
					<button
						title={`View ${category}`}
						key={_key}
						className="cursor-pointer"
						onClick={() => onClickCategory(category)}>
						<span
							style={{width: `${category.length + 3}ch`}}
							className={cx(
								'text-14 hover:font-serif hover:italic',
								{
									'font-sans': category !== selectedCategory,
									'font-serif italic':
										category === selectedCategory,
								},
							)}>
							{category}
						</span>
					</button>
				))}
			</div>
			<div className="flex justify-center align-baseline gap-40 flex-wrap">
				<button
					title="View Directors"
					className="cursor-pointer"
					onClick={() => onClickType('director')}>
					<span
						className={cx('text-14', {
							'font-sans': selectedType !== 'director',
							'font-serif italic': selectedType === 'director',
						})}>
						Director
					</span>
				</button>
				<button
					title="View Production Companies"
					className="cursor-pointer"
					onClick={() => onClickType('production')}>
					<span
						className={cx('text-14', {
							'font-sans': selectedType !== 'production',
							'font-serif italic': selectedType === 'production',
						})}>
						Production
					</span>
				</button>
				<button
					title="View Agencies"
					className="cursor-pointer"
					onClick={() => onClickType('agency')}>
					<span
						className={cx('text-14', {
							'font-sans': selectedType !== 'agency',
							'font-serif italic': selectedType === 'agency',
						})}>
						Agency
					</span>
				</button>
			</div>
		</section>
	);

	return (
		<React.Fragment>
			<Seo {...meta} />
			{filtersElement}
			<WorkProjectsList
				selectedType={selectedType}
				selectedCategory={selectedCategory}
				list={list}
				filteredCategoryPosts={filteredCategoryPosts}
			/>
			<WorkColumnsList
				selectedType={selectedType}
				selectedCategory={selectedCategory}
				directors={directors}
				agencies={agencies}
				productionCompanies={productionCompanies}
			/>
		</React.Fragment>
	);
};

export default Homepage;
