import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    status: z.enum(["active", "completed", "experimental", "archived"]).default("experimental"),
    featured: z.boolean().default(false),
    order: z.number().default(100),
    technologies: z.array(z.string()).default([]),
    cover: z.string(),
    gallery: z.array(z.object({
      src: z.string(),
      alt: z.string(),
      caption: z.string().optional()
    })).default([]),
    links: z.object({
      github: z.string().url().optional(),
      demo: z.string().url().optional(),
      documentation: z.string().url().optional()
    }).default({})
  })
});

export const collections = { projects };
