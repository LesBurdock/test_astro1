import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
process.env.GITHUB_BRANCH ||
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.HEAD ||
  'main';

const isProduction = process.env.NODE_ENV === 'production'; // Fixed case



export default defineConfig({
  
  // site: 'https://lesBurdock.github.io',
  // base: 'test-astro1',

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  branch,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media:{
    tina: {
      // Check environment to decide where to store media
      publicFolder: "",  // Leave this empty, or set to an empty string
      mediaRoot: process.env.NODE_ENV === 'production' 
        ? 'tina-cloud'  // Use Tina Cloud in production
        : 'src/assets/images',  // Use local storage in development
      static: true,  // Mark files as static
    }, },
  schema: {
    collections: [
      {
        name: "blog",
        label: "Blog",
        path: "src/content/blog",
        format: 'mdx',
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              {
                name: "ImageInsert",
                label: "Image Insert into Text",
                fields: [
                  {
                    name: "src",
                    label: "src",
                    type: "image",
                  },
                  {
                    name: "alt",
                    label: "alt",
                    type: "string",
                  },
                  {
                    name: "layout",
                    label: "Select Layout Size",
                    type: 'string',
                    description: 'Select a layout for this post',
                    options: ["large", "half", "tiny"], // Available layout options
                    required: true,
                  },
                ],
              },
              {
                name: "EmbedFrontmatter",
                label: "Embed Image",
                fields: [
                  {
                    name: "imageField",
                    label: "Select Image",
                    type: "string",
                    options: ["Image1", "littleImage"], // User can choose between image1 and 
                  },
                ],
              }, {
                name: "EmbedPdfLink",
                label: "Embed PDF Link",
                fields: [
                  {
                    name: "PDFLink",
                    label: "Select PDF",
                    type: "image",
                  }, {
                    name: "alt",
                    label: "alt",
                    type: "string",
                  },
                ],
              },
            ],
          }, 
          {
            type: "image",
            name: "Image1",
            label: "Image1",
            required: false,
          },
          {
            type: "image",
            name: "littleImage",
            label: "Little Image",
            required: false,
          },
        ],
      },
    ],
  },
});