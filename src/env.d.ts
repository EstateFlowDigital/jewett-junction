/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {
    // Add custom locals here
  }
}

interface ImportMetaEnv {
  readonly WEBFLOW_API_TOKEN: string;
  readonly WEBFLOW_SITE_ID: string;
  readonly SITE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
