import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Coleção de projetos do portfólio.
 * Um arquivo Markdown por projeto em: src/content/projetos/
 *
 * Frontmatter obrigatório: title, description, category, date
 * Opcionais: tags, thumb, url, client, year, featured, order, draft
 */
const projetos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projetos' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['institucional', 'comunidade', 'landing']),
    tags: z.array(z.string()).default([]),
    /** Caminho da screenshot em /public (ex.: "/projetos/nome.jpg"). Vazio => placeholder. */
    thumb: z.string().optional(),
    thumbAlt: z.string().optional(),
    /** Link para o site publicado. */
    url: z.string().url().optional(),
    client: z.string().optional(),
    year: z.number().int().optional(),
    date: z.coerce.date(),
    featured: z.boolean().default(false),
    /** Menor número aparece primeiro (empate resolvido por data desc). */
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projetos };
