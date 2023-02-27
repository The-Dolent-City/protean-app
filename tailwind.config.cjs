const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts,css}'],
	theme: {
		extend: {
			colors: {
				base: {
					50: colors.zinc['50'],
					100: colors.zinc['100'],
					200: colors.zinc['200'],
					300: colors.zinc['300'],
					400: colors.zinc['400'],
					500: colors.zinc['500'],
					600: colors.zinc['600'],
					700: colors.zinc['700'],
					800: colors.zinc['800'],
					900: colors.zinc['900'],
					950: '#0f0f12'
				},
				primary: colors.blue
			},
			fontSize: {
				xs: ['0.75rem', '1rem']
			}
		}
	},
	plugins: [require('@tailwindcss/line-clamp')]
};
