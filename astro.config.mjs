// Loading environment variables from .env files
// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
import { loadEnv } from "vite";
const {
  PUBLIC_SANITY_STUDIO_PROJECT_ID,
  PUBLIC_SANITY_STUDIO_DATASET,
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET,
} = loadEnv(import.meta.env.MODE, process.cwd(), "");
import { defineConfig } from "astro/config";
// import isPreviewMode from './src/utils/isPreviewMode';

// Different environments use different variables
const projectId = PUBLIC_SANITY_STUDIO_PROJECT_ID || PUBLIC_SANITY_PROJECT_ID;
const dataset = PUBLIC_SANITY_STUDIO_DATASET || PUBLIC_SANITY_DATASET;

import sanity from "@sanity/astro";
import react from "@astrojs/react";

// Change this depending on your hosting provider (Vercel, Netlify etc)
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  // Hybrid+adapter is required to support embedded Sanity Studio
  // output: "hybrid",
  output: 'hybrid',
  adapter: netlify({
    imageCDN: true,
  }),
  image: {
      domains: ['sanity.io'],
      remotePatterns: [{
      protocol: 'https',
      hostname: '**.sanity.io',
    }],
    },
    
  integrations: [sanity({
    projectId,
    dataset,
    studioBasePath: "/admin",
    useCdn: false,
    // `false` if you want to ensure fresh data
    apiVersion: "2023-05-31", // Set to date of setup to use the latest API version
    // perspective: isPreviewMode? 'previewDrafts' : 'published', 
    // token: isPreviewMode ? import.meta.env.PUBLIC_SANITY_AUTH_TOKEN : undefined,
    // ignoreBrowserTokenWarning: isPreviewMode ? true : false

  }), // Required for Sanity Studio
  react(), icon()]
});


import { createClient } from "@sanity/client";

import icon from "astro-icon";

// Initialize Sanity client
const client = createClient({
  projectId: projectId,
  dataset: dataset,
  useCdn: false, // Ensure no accidental 'stale' data
  apiVersion: "2023-05-03", // use current date (YYYY-MM-DD) to target the latest API version
});

// Fetch our redirects from Sanity via GROQ
const redirectData = await client.fetch(
  `*[_type == "redirect"]{
      "from": from.current,
      "to": to.current
    }`
);

// Create empty object to add our redirects to
const redirects = {};