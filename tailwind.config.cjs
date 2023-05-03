const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts,css}'],
	theme: {
		extend: {
			colors: {
				base: colors.zinc,
				primary: colors.blue
			},
			fontFamily: {
				sans: 'InterVariable, Inter, Helvetica, Arial, sans-serif'
			},
			fontSize: {
				xs: ['0.75rem', '1rem']
			}
		}
	},
	plugins: []
};
