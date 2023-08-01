// tailwind.config.js
module.exports = {
    mode: 'jit',
    purge: [
        './src/**/*.{vue,js,ts,jsx,tsx}',
        './public/index.html'
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                'primary-black': '#121212',
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
