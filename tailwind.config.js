/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            fontFamily: {
                body: ["DM Sans", "sans-serif"],
            },
            colors: {
                primary: "#f62682",
                secondary: "#6f5cf1",
            },
        },
    },
    plugins: [],
};
