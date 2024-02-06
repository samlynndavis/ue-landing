import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '2em'}} symbol="👥" />;

export default {
	name: 'agency',
	title: 'Agency',
	icon: Icon,
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Agency',
			type: 'string',
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
			description:
				'Format should be "agency-title". Click "Generate" to auto-generate.',
			validation: Rule => Rule.required(),
		},
		{
			name: 'videoCover',
			title: 'Video Cover Image',
			type: 'imageAlt',
			description: 'Should be the first frame of the video.',
		},
		{
			name: 'video',
			title: 'Video',
			type: 'mux.video',
		},
	],
};
