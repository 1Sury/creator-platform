/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#10B981', // Emerald green for accents
                secondary: '#3B82F6', // Blue for buttons
                background: '#F9FAFB', // Light gray for background
                darkBackground: '#1F2937', // Dark gray for dark mode
                card: 'rgba(255, 255, 255, 0.95)', // Glassmorphism for light mode
                darkCard: 'rgba(31, 41, 55, 0.95)', // Glassmorphism for dark mode
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-in-out',
                'slide-up': 'slideUp 0.3s ease-in-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
    darkMode: 'class',
}