import glsl from 'vite-plugin-glsl'
import svgLoader from 'vite-svg-loader'

import meta from './public/data/meta.json'
import organization from './public/data/organization.json'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      title: meta.data.siteTitle,
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no'
        },
        { hid: 'description', name: 'description', content: meta.data.siteDescription },
        { name: 'format-detection', content: 'telephone=no' },
        { hid: 'canonical', rel: 'canonical', href: meta.data.socialUrl },
        { name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:site', name: 'twitter:site', content: meta.data.socialUrl },
        { name: 'twitter:creator', content: meta.data.socialHandle },
        { hid: 'twitter:image', name: 'twitter:image', content: meta.data.socialCard },
        { property: 'og:type', content: 'website' },
        { hid: 'og:title', property: 'og:title', content: meta.data.siteTitle },
        { hid: 'og:description', property: 'og:description', content: meta.data.siteDescription },
        { hid: 'og:url', property: 'og:url', content: meta.data.socialUrl },
        { property: 'og:site_name', content: meta.data.siteName },
        { hid: 'og:image', property: 'og:image', content: meta.data.socialCard }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;600;700&display=swap'
        }
      ],
      script: [{ type: 'application/ld+json', json: organization }]
    }
  },

  css: ['@/public/framework.css'],

  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: ['mapState']
      }
    ]
  ],

  vite: {
    plugins: [svgLoader(), glsl({ compress: true })],
    css: {
      preprocessorOptions: {
        scss: {
          sourceMap: true,
          additionalData: `
            @import "@/assets/scss/_variables.scss";
            @import "@/assets/scss/_mixins.scss";
            @import "@/assets/scss/_functions.scss";
          `
        }
      }
    }
  }
})
