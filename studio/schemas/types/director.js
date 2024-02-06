import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '2em'}} symbol="🎬" />;

export default {
	name: 'director',
	title: 'Director',
	icon: Icon,
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Director',
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
				'Format should be "director-title". Click "Generate" to auto-generate.',
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
