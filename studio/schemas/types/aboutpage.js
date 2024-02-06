import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '2em'}} symbol="📇" />;
const AwardIcon = () => <Emoji style={{fontSize: '2em'}} symbol="🏆" />;
const ClientIcon = () => <Emoji style={{fontSize: '2em'}} symbol="™️" />;

const award = {
	name: 'award',
	title: 'Award',
	type: 'object',
	icon: AwardIcon,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'year',
			title: 'Year',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'image',
			title: 'Image',
			type: 'imageAlt',
			description: 'Optional',
		},
		{
			name: 'link',
			title: 'Link',
			type: 'url',
			description: 'Optional',
		},
	],
	preview: {
		select: {
			title: 'link',
			media: 'image',
		},
		prepare: ({title, media}) => ({
			title: title || 'Award',
			media,
		}),
	},
};

const client = {
	name: 'client',
	title: 'Client',
	type: 'object',
	icon: ClientIcon,
	fields: [
		{
			name: 'image',
			title: 'Logo',
			type: 'imageAlt',
			validation: Rule => Rule.required(),
		},
		{
			name: 'link',
			title: 'Link',
			type: 'url',
			description: 'Optional',
		},
	],
	preview: {
		select: {
			title: 'link',
			media: 'image',
		},
		prepare: ({title, media}) => ({
			title: title || 'Client',
			media,
		}),
	},
};

export default {
	name: 'aboutpage',
	_id: 'aboutpage',
	title: 'About Page',
	icon: Icon,
	type: 'document',
	groups: [
		{name: 'main', title: 'Main', default: true},
		{name: 'seo', title: 'SEO'},
	],
	fields: [
		{
			name: 'description',
			title: 'Description',
			type: 'richText',
			group: 'main',
		},
		{
			name: 'awards',
			title: 'Awards List',
			type: 'array',
			of: [ award ],
			group: 'main',
		},
		{
			name: 'clients',
			title: 'Clients',
			type: 'array',
			of: [ client ],
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
		prepare: () => ({title: 'About Page'}),
	},
};
