import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '2em'}} symbol="🔗" />;

export default {
	name: 'link',
	title: 'Link',
	icon: Icon,
	type: 'object',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'url',
			title: 'URL',
			type: 'url',
			description:
				'If linking to internal pages, just add the slug. (e.g. linking to About will be "about", Visit page will be "visit", etc.). If linking to email, use mailto:your@email',
			validation: Rule =>
				Rule.required().uri({
					allowRelative: true,
					scheme: ['http', 'https', 'tel', 'mailto'],
				}),
		},
		{
			name: 'openInNewWindow',
			title: 'Open In New Window',
			type: 'boolean',
			layout: 'checkbox',
		},
	],
	preview: {
		select: {
			title: 'title',
		},
	},
};
