const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors')

module.exports = {
    darkMode: 'class',
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            }
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            gray: colors.trueGray,
            red: colors.red,
            yellow: colors.amber,
            green: colors.green,
            blue: colors.blue,
            orange: colors.orange,
            indigo: colors.indigo
        }
    },
    variants: {},
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
