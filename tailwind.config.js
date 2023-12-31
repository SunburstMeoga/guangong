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
                'card-content': '#FBFBFB',
                'card-introduce': '#1F2937',
                'tips-word': '#71717a',
                'swipe-bull': '#3f3f46',
                'card-border': '#1F2A38',
                'bottom-content': '#27272A',
                'cover-content': '#18181B',
                'language-content': '#414145',
                'more-content': '#3C3C3D',
                'shops-content': '#E5E7EB',
                'more-word': '#CBCFD5',
                'assets-word': '#D1D5DB'
            },
            backgroundImage: {
                'market-product': "url('@/assets/market-product-bg.png')",
                'home-product': "url('@/assets/home-product-bg.png')",
                'personal-bg': "url('@/assets/personal-bg1.png')",
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
