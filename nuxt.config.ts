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
      'Cormorant Garamond': [400, 500, 600, 700],
      'Lato': [300, 400, 700],
    },
    display: 'swap',
    preconnect: true,
    preload: true,
  },
})
