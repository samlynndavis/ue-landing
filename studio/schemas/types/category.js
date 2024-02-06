import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '2em'}} symbol="🏷" />;

export default {
	name: 'category',
	title: 'Category',
	icon: Icon,
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Category',
			description: 'e.g. "Commercial", "Film", "Promo", etc.',
			type: 'string',
			validation: Rule => Rule.required(),
		},
	],
};
