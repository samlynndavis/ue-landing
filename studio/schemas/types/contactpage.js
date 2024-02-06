import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '2em'}} symbol="☎️" />;
const PersonIcon = () => <Emoji style={{fontSize: '2em'}} symbol="👤" />;

const person = {
	name: 'person',
	title: 'Person',
	type: 'object',
	icon: PersonIcon,
	fields: [
		{
			name: 'name',
			title: 'Name',
			type: 'string',
		},
		{
			name: 'title',
			title: 'Title',
			type: 'string',
		},
		{
			name: 'phone',
			title: 'Phone',
			type: 'string',
		},
		{
			name: 'email',
			title: 'Email',
			type: 'string',
		},
	],
	preview: {
		select: {
			title: 'name',
		},
		prepare: ({title}) => ({title}),
	},
};


export default {
	name: 'contactpage',
	_id: 'contactpage',
	title: 'Contact Page',
	icon: Icon,
	type: 'document',
	groups: [
		{name: 'main', title: 'Main', default: true},
		{name: 'seo', title: 'SEO'},
	],
	fields: [
		{
			name: 'team',
			title: 'Team',
			type: 'array',
			of: [person],
			group: 'main',
		},
		{
			name: 'links',
			title: 'Social Links',
			type: 'ctaList',
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
		prepare: () => ({title: 'Contact Page'}),
	},
};
