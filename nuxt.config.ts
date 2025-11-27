import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['~/assets/stylesheets/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  googleFonts: {
    families: {
      'Cormorant Garamond': {
        wght:  [400, 500, 600, 700],
        ital: [400,500]
      },
      // 'Lato': [300, 400, 700],
      'Roboto': [300,400,500],
    },
    display: 'swap',
    preconnect: true,
    preload: true,
  },

  modules: [
    'nuxt-keen-slider'
  ]
})
