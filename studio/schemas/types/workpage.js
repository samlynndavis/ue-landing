import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '2em'}} symbol="🎨" />;
const FilterIcon = () => <Emoji style={{fontSize: '2em'}} symbol="🗃" />;

const filter = {
	name: 'filter',
	title: 'Filtered Group',
	icon: FilterIcon,
	type: 'object',
	fields: [
		{
			name: 'category',
			title: 'Category',
			type: 'reference',
			to: [{type: 'category'}],
			validation: Rule => Rule.required(),
		},
		{
			name: 'list',
			title: 'Filtered Projects',
			type: 'array',
			of: [{type: 'reference', to: [{type: 'project'}]}],
		},
	],
	preview: {
		select: {
			title: 'category.title',
			subtitle: 'list.length',
		},
		prepare: ({title, subtitle}) => ({
			title,
			subtitle: `${subtitle} project(s)`,
		}),
	},
};

export default {
	name: 'workpage',
	_id: 'workpage',
	title: 'Work Page',
	icon: Icon,
	type: 'document',
	groups: [
		{name: 'main', title: 'Main', default: true},
		{name: 'seo', title: 'SEO'},
	],
	fields: [
		{
			name: 'list',
			title: 'Featured Projects',
			type: 'array',
			of: [{type: 'reference', to: [{type: 'project'}]}],
			group: 'main',
		},
		{
			name: 'filters',
			title: 'Filtered Categories',
			type: 'array',
			of: [filter],
			group: 'main',
		},
		//
		// === Meta ===
		//
		{
			type: 'seo',
			name: 'seo',
			group: 'seo',
		},
	],
	preview: {
		prepare: () => ({title: 'Work Page'}),
	},
};
