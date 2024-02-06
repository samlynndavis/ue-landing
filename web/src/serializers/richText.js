import React from 'react';
import {defaultSerializers} from '@sanity/block-content-to-react';

export default {
	types: {
		block: props => {
			const {style = 'normal'} = props.node;

			if (style === 'h1') {
				return <h2>{props.children}</h2>;
			} else if (style === 'h2') {
				return <h3>{props.children}</h3>;
			} else if (style === 'h3') {
				return <h4>{props.children}</h4>;
			}

			// Fall back to default handling
			return defaultSerializers.types.block(props);
		},
	},
	marks: {
		logo: ({children}) => <span className="font-sans">{children}</span>,
	},
};
