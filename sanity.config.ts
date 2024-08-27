// Different environments use different variables
const projectId =
  import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID! ||
  import.meta.env.PUBLIC_SANITY_PROJECT_ID!;
const dataset =
  import.meta.env.PUBLIC_SANITY_STUDIO_DATASET! ||
  import.meta.env.PUBLIC_SANITY_DATASET!;

const previewUrls = import.meta.env.SANITY_STUDIO_PREVIEW_URLS?.split(",") || [];
const isPreviewMode = import.meta.env.PUBLIC_PREVIEW_MODE === 'true';

// Feel free to remove this check if you don't need it
if (!projectId || !dataset) {
  throw new Error(
    `Missing environment variable(s). Check if named correctly in .env file.\n\nShould be:\nPUBLIC_SANITY_STUDIO_PROJECT_ID=${projectId}\nPUBLIC_SANITY_STUDIO_DATASET=${dataset}\n\nAvailable environment variables:\n${JSON.stringify(
      import.meta.env,
      null,
      2
    )}`
  );
}

import { defineConfig } from "sanity";
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schema";
import { CogIcon, DocumentIcon } from "@sanity/icons";



// Define the actions that should be available for singleton documents
const singletonActions = new Set(["publish", "discardChanges", "restore"])

// Define the singleton document types
const singletonTypes = new Set(["settings", "about"])

export default defineConfig({
  name: "JacquesBuith",
  title: "Jacques Buith",
  projectId,
  dataset,
   plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
          // Regular document types
            S.documentTypeListItem("post").title("Posts"),
            // Our singleton type has a list item with a custom child
           
            S.listItem()
              .title("About")
              .id("about")
              .icon(DocumentIcon)
              .child(
                S.document()
                  .schemaType("about")
                  .documentId("about")
              ),
             S.listItem()
              .title("Settings")
              .id("settings")
              .icon(CogIcon)
              .child(
                // Instead of rendering a list of documents, we render a single
                // document, specifying the `documentId` manually to ensure
                // that we're editing the single instance of the document
                S.document()
                  .schemaType("settings")
                  .documentId("settings")
              ),
            // Singleton for About Page
            
          ]),
    }),
    visionTool(),
    presentationTool({
      // Required: set the base URL to the preview location in the front end
      previewUrl: import.meta.env.PUBLIC_SANITY_STUDIO_PREVIEW_URL || "http://localhost:4321",
      // previewUrl: previewUrls
    }),

  ],


  schema: {
    types: schemaTypes,

    // Filter out singleton types from the global “New document” menu options
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    // For singleton types, filter out actions that are not explicitly included
    // in the `singletonActions` list defined above
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,

      productionUrl: async (prev, context) => {
    const { getClient, dataset, document } = context;
    const client = getClient({ apiVersion: '2023-05-31' });

    if (document._type === 'post') {
      const slug = await client.fetch(
        `*[_type == 'post' && _id == $postId][0].slug.current`,
        { postId: document._id }
      );

      if (!slug) {
        return prev; // Als de slug niet wordt gevonden, gebruik de vorige URL
      }

      const params = new URLSearchParams();
      params.set('preview', 'true');
      params.set('dataset', dataset);

      return `http://localhost:4321/${slug}?${params}`;
    }

    return prev;
    }
  },

  
})

