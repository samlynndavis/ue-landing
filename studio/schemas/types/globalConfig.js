import React from 'react';
import Emoji from 'a11y-react-emoji';


const Icon = () => <Emoji style={{fontSize: '2em'}} symbol="⚙️" />;

export default {
	name: 'globalConfig',
	_id: 'globalConfig',
	title: 'Global Config',
	icon: Icon,
	type: 'document',
	groups: [
		{name: 'contact', title: 'Contact Info', default: true},
		{name: 'seo', title: 'SEO'},
	],
	fields: [
		{
			name: 'address',
			title: 'Address',
			type: 'richText',
			group: 'contact'
		},
		{
			name: 'phone',
			title: 'Phone',
			type: 'string',
			group: 'contact'
		},
		{
			name: 'email',
			title: 'Email',
			type: 'string',
			group: 'contact'
		},
		{
			name: 'coordinates',
			title: 'Coordinates',
			type: 'string',
			group: 'contact'
		},
		{
			type: 'seo',
			name: 'seo',
			title: 'SEO',
			group: 'seo'
		},
	],
	preview: {
		prepare: () => ({title: 'Global Config SEO'}),
	},
};
