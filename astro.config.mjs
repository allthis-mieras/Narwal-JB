// Loading environment variables from .env files
// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
import { defineConfig } from "astro/config";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import { loadEnv } from "vite";
import netlify from '@astrojs/netlify';
import icon from "astro-icon";


const {
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET,
  PUBLIC_SANITY_USE_CDN,
  PUBLIC_SANITY_VISUAL_EDITING_ENABLED
} = loadEnv(import.meta.env.MODE, process.cwd(), "");


export default defineConfig({
  
  integrations: [sanity({
    projectId: PUBLIC_SANITY_PROJECT_ID,
    dataset: PUBLIC_SANITY_DATASET,
    apiVersion: "2023-05-31",
    studioBasePath: "/admin", 
      stega: {
        studioUrl: "/admin"
    },
    useCdn: PUBLIC_SANITY_USE_CDN === "true", 
  }), react(), icon()],
  output: 'server',
  adapter: netlify({
    imageCDN: false,
  }),
  image: {
    domains: ['sanity.io'],
    remotePatterns: [{
    protocol: 'https',
    hostname: '**.sanity.io',
  }],
  },
});

const visualEditingEnabled = PUBLIC_SANITY_VISUAL_EDITING_ENABLED === 'true';
     const perspective = visualEditingEnabled ? 'previewDrafts' : 'published';

// const client = createClient({
//  projectId: PUBLIC_SANITY_PROJECT_ID,
//     dataset: PUBLIC_SANITY_DATASET,
    
//  useCdn: false, // must be false when using 'previewDrafts'
//   perspective: perspective, // 'raw' | 'previewDrafts' | 'published'
//   apiVersion: "2023-05-03", // use current date (YYYY-MM-DD) to target the latest API version
// });


// Fetch our redirects from Sanity via GROQ
// const redirectData = await client.fetch(
//   `*[_type == "redirect"]{
//       "from": from.current,
//       "to": to.current
//     }`
// );

 // Create empty object to add our redirects to
// const redirects = {};


