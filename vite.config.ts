import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import {VitePWA} from "vite-plugin-pwa"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
        VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'مواقيت الصلاة ، والتقويم الهجري',
        short_name: 'مواقيت الصلاة',
        description: 'مواقيت الصلاة ، والتقويم الهجري',
        theme_color: '#c0583e75',
        background_color: '#c0583e75',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'images/favicon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'images/favicon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'images/favicon-180x180.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'images/favicon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'images/favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})
