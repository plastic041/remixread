module.exports = {
  mode: "jit",
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Pretendard JP",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "Roboto",
          "Helvetica Neue",
          "Segoe UI",
          "Apple SD Gothic Neo",
          "Noto Sans KR",
          "Malgun Gothic",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "sans-serif",
        ],
      },
      colors: {
        mint: {
          1: "hsl(165, 80.0%, 98.8%)",
          2: "hsl(164, 88.2%, 96.7%)",
          3: "hsl(164, 76.6%, 93.3%)",
          4: "hsl(165, 68.8%, 89.5%)",
          5: "hsl(165, 60.6%, 84.5%)",
          6: "hsl(165, 53.5%, 76.9%)",
          7: "hsl(166, 50.7%, 66.1%)",
          8: "hsl(168, 52.8%, 51.0%)",
          9: "hsl(167, 65.0%, 66.0%)",
          10: "hsl(167, 59.3%, 63.1%)",
          11: "hsl(172, 72.0%, 28.5%)",
          12: "hsl(172, 70.0%, 12.0%)",
        },
      },
    },
  },
  plugins: [],
};
