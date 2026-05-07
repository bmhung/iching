import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon-180x180.png", "icon.svg"],
      manifest: {
        name: "Mai Hoa Dịch Số · Plum Blossom Oracle",
        short_name: "Mai Hoa",
        description: "Mai Hoa Dịch Số — Plum Blossom Oracle. Cast I Ching readings by time, number, sound, or spontaneity.",
        theme_color: "#9d2933",
        background_color: "#f7f1e3",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: "/",
        lang: "vi",
        icons: [
          { src: "pwa-64x64.png", sizes: "64x64", type: "image/png" },
          { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
          { src: "maskable-icon-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        // Cache the app shell and assets for offline use. Reading data lives in
        // localStorage and is independent of the SW cache.
        globPatterns: ["**/*.{js,css,html,svg,png,ico,woff2}"],
        // Allow large precaches — the bundle includes the full hexagram tables
        // and translations.
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
      },
    }),
  ],
});
