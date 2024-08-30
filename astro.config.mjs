import { defineConfig } from 'astro/config';
import netlify from "@astrojs/netlify";
import tailwind from "@astrojs/tailwind";
import db from "@astrojs/db";
import auth from "auth-astro";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: netlify(),
  integrations: [tailwind(), db(), auth(), react()],
  experimental: {
    actions: true
  }
});