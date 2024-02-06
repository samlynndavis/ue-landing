import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '2em'}} symbol="👟" />;

export default {
	name: 'footer',
	title: 'Footer',
	_id: 'footer',
	icon: Icon,
	type: 'document',
	fields: [
		{
			name: 'address',
			title: 'Address',
			type: 'richText',
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
		{
			name: 'coordinates',
			title: 'Coordinates',
			type: 'string',
		},
	],
	preview: {
		prepare: () => ({ title: 'Footer'}),
	},
};
