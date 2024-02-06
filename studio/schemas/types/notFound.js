import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '2em'}} symbol="🆘" />;

export default {
	name: 'notFound',
	_id: 'notFound',
	title: '404 Page',
	icon: Icon,
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: Rule => Rule.required(),
		},
	],
	preview: {
		prepare: () => ({title: '404 Page'}),
	},
};
