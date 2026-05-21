export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 20px 80px rgba(14, 165, 233, 0.18)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at top, rgba(56, 189, 248, 0.18), transparent 40%), linear-gradient(180deg, #020617 0%, #0f172a 100%)",
      },
    },
  },
  plugins: [],
};
