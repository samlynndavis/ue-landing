import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '2em'}} symbol="🎬" />;

export default {
	name: 'project',
	title: 'Project',
	icon: Icon,
	type: 'document',
	groups: [
		{name: 'main', title: 'Main', default: true},
		{name: 'seo', title: 'SEO'},
	],
	fields: [
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
			name: 'thumbnail',
			title: 'Video Thumbnail',
			description: 'Short video for the project tile',
			type: 'mux.video',
			group: 'main',
		},
		{
			name: 'video',
			title: 'Video',
			type: 'mux.video',
			group: 'main',
		},
		{
			name: 'videoCover',
			title: 'Video Cover Image',
			type: 'imageAlt',
			description:
				'Should be the first frame of the video. If none used, Mux will auto generate one',
			group: 'main',
		},
		{
			name: 'category',
			title: 'Category',
			type: 'reference',
			to: [{type: 'category'}],
			group: 'main',
		},
		{
			name: 'year',
			title: 'Year',
			type: 'string',
			group: 'main',
		},
		{
			name: 'format',
			title: 'Format',
			type: 'string',
			group: 'main',
		},
		{
			name: 'duration',
			title: 'Duration',
			type: 'string',
			group: 'main',
		},
		{
			name: 'director',
			title: 'Director',
			type: 'reference',
			to: [{type: 'director'}],
			group: 'main',
		},
		{
			name: 'dop',
			title: 'DOP',
			type: 'string',
			group: 'main',
		},
		{
			name: 'production',
			title: 'Production',
			type: 'reference',
			to: [{type: 'production'}],
			group: 'main',
		},
		{
			name: 'agency',
			title: 'Agency',
			type: 'reference',
			to: [{type: 'agency'}],
			group: 'main',
		},
		//
		// === Seo ===
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
			subtitle: 'type',
			media: 'videoCover',
		},
		prepare: ({title, subtitle, media}) => ({
			title,
			subtitle,
			media,
		}),
	},
};
