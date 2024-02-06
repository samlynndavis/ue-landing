import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '2em'}} symbol="🧢" />;

export default {
	name: 'header',
	_id: 'header',
	title: 'Header',
	icon: Icon,
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			hidden: true,
			validation: Rule => Rule.required(),
		},
		{
			name: 'mobileMenu',
			title: 'Mobile Menu',
			type: 'ctaList',
		},
		{
			name: 'desktopMenu',
			title: 'Desktop Menu',
			type: 'ctaList',
		},
	],
	preview: {
		select: {
			title: 'title',
		},
		prepare: selection => ({
			...selection,
			media: <Icon />,
		}),
	},
};
