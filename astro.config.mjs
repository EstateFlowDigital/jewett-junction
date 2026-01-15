import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Update this to your Webflow Cloud URL when deployed
  site: process.env.SITE_URL || 'http://localhost:4321',
  base: '/jewett-junction/site',
  output: 'server',
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19
      // Required for Webflow Cloud deployment
      alias: import.meta.env.PROD ? {
        "react-dom/server": "react-dom/server.edge",
      } : undefined,
    },
  },
  build: {
    assetsPrefix: '/jewett-junction/site',
  },
  trailingSlash: 'never',
});
