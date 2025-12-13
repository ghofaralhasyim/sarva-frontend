import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: [
    '~/assets/stylesheets/fonts.css',
    '~/assets/stylesheets/main.css'
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  googleFonts: {
    families: {
      // 'Cormorant Garamond': {
      //   wght: [300, 400, 600, 700],
      //   ital: [300, 400],
      //   variable: false,
      // },
      'Lato': [300, 400, 700],
    },
    display: 'swap',
    preconnect: true,
    preload: true,
  },

  modules: [
    'nuxt-keen-slider',
    '@nuxt/icon'
  ]
})
