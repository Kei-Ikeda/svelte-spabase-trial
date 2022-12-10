/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
  // https://tailwindcss.com/docs/content-configuration#safelisting-classes
  // build時には使用されているクラス名のみbuildに含める為、変数を参照しているような場合は
  // safeListに追加する（微妙）
  safelist: [
    {
      pattern: /bg-(red|blue|green|pink)-(500|700)/,
      variants: ['lg', 'hover', 'focus', 'lg:hover'],
    },
  ]
}
