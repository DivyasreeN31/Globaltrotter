/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        "primary-dark": "#2563EB",
        "primary-hover": "#2563EB",
        "background-light": "#F3F4F6",
        "background-dark": "#111827",
        "surface-light": "#FFFFFF",
        "surface-dark": "#1F2937",
        "card-light": "#FFFFFF",
        "card-dark": "#1F2937",
        "border-light": "#E5E7EB",
        "border-dark": "#374151",
        "text-light": "#1F2937",
        "text-dark": "#F9FAFB",
        "text-main-light": "#111827",
        "text-main-dark": "#F9FAFB",
        "text-secondary-light": "#6B7280",
        "text-secondary-dark": "#9CA3AF",
        "text-sub-light": "#64748B",
        "text-sub-dark": "#94A3B8",
        "text-muted-light": "#6B7280",
        "text-muted-dark": "#9CA3AF",
        "subtext-light": "#6B7280",
        "subtext-dark": "#9CA3AF",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
      },
    },
  },
  plugins: [],
}

