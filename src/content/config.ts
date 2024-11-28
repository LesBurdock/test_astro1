import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    // Title and description
    title: z.string(),
    description: z.string(),
    
    // Publication and update dates
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    
    // Image fields with validation for cover image width
    heroImage: z.string().optional(),
    littleImage: image().refine((img) => img.width >= 1080, {
      message: "Image must be at least 1080 pixels wide!",
    }).optional(),  // Optional so it's not required
  }),
});

export const collections = { blog: blogCollection };
