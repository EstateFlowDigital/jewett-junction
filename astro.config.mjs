import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Update this to your Webflow Cloud URL when deployed
  site: process.env.SITE_URL || 'http://localhost:4321',
  // Note: base is NOT set because Webflow Cloud handles the mount path
  // Links should NOT include /jewett-junction/ prefix - Webflow Cloud adds it automatically
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
  // Note: assetsPrefix not needed - Webflow Cloud mount path handles this
  trailingSlash: 'never',
});
