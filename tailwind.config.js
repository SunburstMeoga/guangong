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
                'icon-undertone': '#34383C',
                'success-undertone': '#4E6165',
                'success-word': '#7EC99C',
                'icon-gray': '#A1A1AA',
                'theme-primary': '#E20F2A',
                'primary-word': '#171414',
                'module-card': '#402C30',
                'card-title': '#8D8C94',
                'card-content': '#FBFBFB'
            },
            backgroundImage: {
                'market-product': "url('@/assets/market-product-bg.png')",
                'home-product': "url('@/assets/home-product-bg.png')"

            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
