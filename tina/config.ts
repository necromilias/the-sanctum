import { defineConfig } from "tinacms";

const branch = process.env.GITHUB_BRANCH || "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,   // from Tina Cloud
  token: process.env.TINA_TOKEN,                     // from Tina Cloud

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      // Services Collection
      {
        name: "service",
        label: "Services",
        path: "content/services",
        format: "json",
          fields: [
            { type: "string", name: "name", label: "Name", required: true, isTitle: true },
            { type: "string", name: "description", label: "Description" },
            { type: "string", name: "url", label: "URL", required: true },
            { type: "string", name: "icon_name", label: "Icon Name (Lucide)" },
                            { type: "string", name: "category", label: "Category" },
                            { type: "number", name: "display_order", label: "Display Order" },
                            { type: "boolean", name: "is_active", label: "Active", default: true },
          ],
      },

      // Projects Collection
      {
        name: "project",
        label: "Projects",
        path: "content/projects",
        format: "json",
          fields: [
            { type: "string", name: "title", label: "Title", required: true, isTitle: true },
            { type: "string", name: "description", label: "Description" },
            {
              type: "string",
              name: "technologies",
              label: "Technologies",
              list: true,           // This makes it an array
              ui: {
                component: "tags"   // Nice UI for adding tags
              }
            },
            { type: "string", name: "live_url", label: "Live URL" },
            { type: "string", name: "github_url", label: "GitHub URL" },
            {
              type: "string",
              name: "status",
              label: "Status",
              options: ["planned", "in-progress", "completed"],
              required: true
            },
            { type: "datetime", name: "started_at", label: "Started At" },
            { type: "number", name: "display_order", label: "Display Order" },
          ],
      },

      // About Sections
      {
        name: "about",
        label: "About Sections",
        path: "content/about",
        format: "json",
          fields: [
            { type: "string", name: "section_type", label: "Section Type", options: ["bio", "skills", "timeline", "contact"] },
            { type: "string", name: "title", label: "Title" },
            { type: "rich-text", name: "content", label: "Content", isBody: true },
            { type: "number", name: "display_order", label: "Display Order" },
          ],
      },
    ],
  },
});
