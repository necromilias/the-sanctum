import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: "6dac69d1-9aee-4fef-9f07-115a4ebabc2f",
  token: "ac6476e3df6827d30d95ed7c6757de15eb797382",

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
      {
        name: "service",
        label: "Services",
        path: "content/services",
        format: "json",
          fields: [
            { type: "string", name: "name", label: "Name", isTitle: true, required: true },
            { type: "string", name: "description", label: "Description" },
            { type: "string", name: "url", label: "URL", required: true },
            { type: "string", name: "icon_name", label: "Icon Name" },
            { type: "string", name: "category", label: "Category" },
            { type: "number", name: "display_order", label: "Display Order" },
            { type: "boolean", name: "is_active", label: "Active", default: true },
          ],
      },
      {
        name: "project",
        label: "Projects",
        path: "content/projects",
        format: "json",
          fields: [
            { type: "string", name: "title", label: "Title", isTitle: true, required: true },
            { type: "string", name: "description", label: "Description" },
            { type: "string", name: "technologies", label: "Technologies", list: true },
            { type: "string", name: "live_url", label: "Live URL" },
            { type: "string", name: "github_url", label: "GitHub URL" },
            { type: "string", name: "status", label: "Status", options: ["planned", "in-progress", "completed"] },
            { type: "datetime", name: "started_at", label: "Started At" },
            { type: "number", name: "display_order", label: "Display Order" },
          ],
      },
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
