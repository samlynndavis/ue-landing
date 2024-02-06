import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '2em'}} symbol="📝" />;

export default {
	name: 'page',
	title: 'Page',
	icon: Icon,
	type: 'document',

	groups: [
		{name: 'main', title: 'Main', default: true},
		{name: 'seo', title: 'SEO'},
	],
	fields: [
		//
		// === Main ===
		//

		{
			name: 'title',
			title: 'Title',
			type: 'string',
			group: 'main',
			validation: Rule => Rule.required(),
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96,
			},
			group: 'main',
			validation: Rule => Rule.required(),
		},
		{
			type: 'pageComponentList',
			name: 'components',
			title: 'Components',
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
		select: {
			title: 'title',
			subtitle: 'url',
		},
		prepare({title, subtitle}) {
			return {
				title,
				subtitle,
				media: <Icon />,
			};
		},
	},
};
