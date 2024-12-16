import { defineCollection, z } from 'astro:content';


const blogCollection = defineCollection({
  type: 'content',
  schema: () => z.object({
    // Title and description
    title: z.string(),
    description: z.string(),
    
    // Publication and update dates
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    
    // Image fields with validation for cover image width
    heroImage: z.string().optional(),
    littleImage:z.string().optional(), // Optional so the field can be omitted
  }),
});

export const collections = { blog: blogCollection };

