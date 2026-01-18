import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: "autoUpdate",
      strategies: "registerSW",
      includeAssets: ["favicon.svg", "robots.txt"],

      manifest: {
        name: "Lazni Admin",
        short_name: "Lazni",
        description: "Панель адміністрування Lazni Kyiv",
        theme_color: "#102724",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          { src: "/192.png", sizes: "192x192", type: "image/png" },
          { src: "/512.png", sizes: "512x512", type: "image/png" },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
