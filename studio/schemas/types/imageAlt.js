import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '2rem'}} symbol="🖼" />;

export default {
	name: 'imageAlt',
	title: 'Image (w/ Alt)',
	icon: Icon,
	type: 'image',
	fields: [
		{
			name: 'alt',
			type: 'string',
			title: 'Alt Text',
		},
	],
};
