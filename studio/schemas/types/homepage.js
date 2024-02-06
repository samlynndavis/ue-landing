import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '2em'}} symbol="🏡" />;

export default {
	name: 'homepage',
	_id: 'homepage',
	title: 'Home Page',
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
			name: 'description',
			title: 'Description',
			type: 'richText',
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
		prepare: () => ({title: 'Home Page'}),
	},
};
