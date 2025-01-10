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
  media: 
  // isProduction ? 
  {
        loadCustomStore: async () => {
          const pack = await import("next-tinacms-cloudinary");
          return pack.TinaCloudCloudinaryMediaStore;
        },
      },
    // : {
    //     tina: {
    //       publicFolder: "",
    //       mediaRoot: "src/assets/images",
    //       static: false, // Default is false
    //     },
    //   },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
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
                    name: "width",
                    label: "width",
                    type: "number",
                  },
                  {
                    name: "heigth",
                    label: "height",
                    type: "number",
                  },
                ],
              },
            ],
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