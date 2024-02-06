import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '2em'}} symbol="🚧" />;

export default {
	name: 'pageComponentList',
	title: 'Components',
	icon: Icon,
	type: 'array',
	of: [
		{type: 'string'}, // TODO: create components
	],
};
