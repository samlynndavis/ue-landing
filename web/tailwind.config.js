const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	mode: 'jit',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		screens: {
			400: '400px',
			600: '600px',
			800: '800px',
			1000: '1000px',
			1200: '1200px',
			1400: '1400px',
			1600: '1600px',
			1700: '1700px',
			1800: '1800px',
			2000: '2000px',
		},
		colors: {
			current: 'currentColor',
			transparent: 'transparent',
			black: '#000000',
			white: '#ffffff',
			grey: '#E6E7E8',
		},
		fontSize: {
			...new Array(100)
				.fill()
				.map((_, i) => i)
				.reduce((acc, val) => {
					acc[val] = `${val / 10}rem`;
					return acc;
				}, {}),
		},
		fontWeight: {
			medium: 500,
			500: 500,
		},
		lineHeight: {
			DEFAULT: 'initial',
			...new Array(100)
				.fill()
				.map((_, i) => i)
				.reduce((acc, val) => {
					acc[val] = `${val / 10}rem`;
					return acc;
				}, {}),
		},
		letterSpacing: {
			...new Array(5)
				.fill()
				.map((_, i) => i)
				.reduce((acc, val) => {
					acc[val] = `0.0${val}rem`;
					return acc;
				}, {}),
		},
		spacing: {
			...new Array(600)
				.fill()
				.map((_, i) => i)
				.reduce((acc, val) => {
					acc[val] = `${val / 10}rem`;
					return acc;
				}, {}),
		},
		fontFamily: {
			sans: [
				'ABC Oracle Book',
				// 'Helvetica Neue LT Pro',
				'ui-sans',
				'Helvetica Neue',
				'Helvetica',
				'sans-serif',
				...defaultTheme.fontFamily.sans,
			],
			serif: [
				'Self Modern',
				'ui-serif',
				'Georgia',
				'Times New Roman',
				'Times',
				'serif',
				...defaultTheme.fontFamily.serif,
			],
		},
		borderRadius: {
			6: '0.6rem',
			10: '1rem',
			20: '2rem',
			full: '9999rem'
		},
		extend: {
			transitionDuration: {
				...new Array(5000)
					.fill()
					.map((_, i) => i)
					.reduce((acc, val) => {
						acc[val] = `${val}ms`;
						return acc;
					}, {}),
			},
			width: {
				...new Array(1600)
					.fill()
					.map((_, i) => i)
					.reduce((acc, val) => {
						acc[val] = `${val / 10}rem`;
						return acc;
					}, {}),
			},
			maxWidth: {
				...new Array(1600)
					.fill()
					.map((_, i) => i)
					.reduce((acc, val) => {
						acc[val] = `${val / 10}rem`;
						return acc;
					}, {}),
			},
			height: {
				...new Array(1600)
					.fill()
					.map((_, i) => i)
					.reduce((acc, val) => {
						acc[val] = `${val / 10}rem`;
						return acc;
					}, {}),
				'full-screen': 'var(--vh)',
				about: 'calc(var(--vh) * 3)',
			},
			maxHeight: {
				...new Array(1600)
					.fill()
					.map((_, i) => i)
					.reduce((acc, val) => {
						acc[val] = `${val / 10}rem`;
						return acc;
					}, {}),
				'full-screen': 'var(--vh)',
				about: 'calc(var(--vh) * 3)',
			},
			minHeight: {
				...new Array(1600)
					.fill()
					.map((_, i) => i)
					.reduce((acc, val) => {
						acc[val] = `${val / 10}rem`;
						return acc;
					}, {}),
				'full-screen': 'var(--vh)',
				about: 'calc(var(--vh) * 3)',
			},
			zIndex: {
				...new Array(11)
					.fill()
					.map((_, i) => i)
					.reduce((acc, val) => {
						acc[val] = val;
						return acc;
					}, {}),
				cart: '11',
			},

			transitionProperty: {
				spacing: 'margin, padding',
				underline: 'text-decoration-color',
			},
			aspectRatio: {
				'3/5': '3 / 5',
				'16/9': '16 / 9',
				'12/8': '12 / 8',
				square: '1 / 1',
				unset: 'unset',
			},
			flexBasis: {
				'1/3': 'calc(33.333% - 47px)',
			},
		},
	},
	variants: {
		extend: {},
	},
	corePlugins: {
		gridTemplateColumns: true,
	},
};
