import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{ fontSize: '2em' }} symbol="📝" />;

const logoStyle = ({ children }) => (
	<span style={{ fontWeight: 500 }}>{children}</span>
);

export default {
	name: 'richText',
	title: 'Rich Text',
	icon: Icon,
	type: 'array',
	of: [
		{
			type: 'block',
			styles: [
				{
					title: 'Normal',
					value: 'normal',
				},
				{
					title: 'Heading H1',
					value: 'h1',
				},
				{
					title: 'Heading H2',
					value: 'h2',
				},
				{
					title: 'Heading H3',
					value: 'h3',
				},
			],
			marks: {
				decorators: [
					{
						title: 'Strong',
						value: 'strong',
					},
					{
						title: 'Emphasis',
						value: 'em',
					},
					{
						title: 'Logo',
						value: 'logo',
						blockEditor: {
							render: logoStyle,
							icon: () => (
								<span style={{ fontWeight: 500 }}>
									Universal Element®
								</span>
							),
						},
					},
				],
				annotations: [
					{
						name: 'link',
						type: 'object',
						title: 'Link',
						fields: [
							{
								name: 'title',
								title: 'Title',
								type: 'string',
							},
							{
								name: 'href', // this is for blocks only
								title: 'URL',
								type: 'url',
								validation: Rule =>
									Rule.required().uri({
										allowRelative: true,
										scheme: [
											'http',
											'https',
											'tel',
											'mailto',
										],
									}),
							},
							{
								name: 'openInNewWindow',
								title: 'Open In New Window',
								type: 'boolean',
								layout: 'checkbox',
							},
						],
					},
				],
			},
		},
	],
};
