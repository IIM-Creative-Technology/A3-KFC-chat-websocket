module.exports = {
    content: [
        "./components/**/*.{html,js,vue}",
        "./pages/**/*.{html,js,vue}",
    ],
    theme: {
        extend: {
        
        },
    },
    plugins: [
        
    ],
    variants: {
        extend: {
            transitionProperty: ['hover'],
            scale: ['active'],
            transform: ['active'],
        }
    }
}