import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    // Title and description
    //loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/blog" }),
    title: z.string(),
    description: z.string(),
    
    // Publication and update dates
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    
    // Image fields with validation for cover image width
    heroImage: z.string().optional(),
    Image1: image().optional().or(z.string().optional()),
    littleImage: image().optional().or(z.string().optional()),   // Optional so the field can be omitted
  }),
});

export const collections = { blog: blogCollection };

