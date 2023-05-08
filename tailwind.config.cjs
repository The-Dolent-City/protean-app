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
				sans: 'InterVariable, Inter, Helvetica, Arial, sans-serif',
				dice: ['Dicier']
			},
			fontSize: {
				xs: ['0.75rem', '1rem']
			},
			width: {
				xs: '20rem',
				sm: '24rem',
				md: '28rem',
				lg: '32rem',
				xl: '36rem',
				'2xl': '42rem',
				'3xl': '48rem',
				'4xl': '56rem',
				'5xl': '64rem',
				'6xl': '72rem',
				'7xl': '80rem'
			}
		}
	},
	plugins: []
};
