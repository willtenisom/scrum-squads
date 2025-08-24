// tailwind.config.ts
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        success: "#22c55e",
        danger: "#ef4444",
        text: "#111827",
        background: "#f3f4f6",
        card: "#ffffff",
        squad1: "#ffffff",
        squad2: "#e0f2fe",
        squad3: "#ecfdf5",
        squad4: "#f5f3ff",
        squad5: "#fee2e2",

        entryBg: "#f9fafb",
        divider: "#e5e7eb",
        memberEmail: "#6b7280",
        disabledInput: "#f0f0f0",
      },
    },
  },
  plugins: [],
};
