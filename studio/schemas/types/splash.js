import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '2em'}} symbol="💦" />;

export default {
	name: 'splash',
	_id: 'splash',
	title: 'Intro Video (Splash)',
	icon: Icon,
	type: 'document',
	fields: [
		{
			name: 'video',
			title: 'Video',
			description:
				'❓ Optional. If no video is provided, the logo will appear alone.',
			type: 'mux.video',
		},
	],
	preview: {
		prepare: () => ({title: 'Intro Video (Splash)'}),
	},
};
