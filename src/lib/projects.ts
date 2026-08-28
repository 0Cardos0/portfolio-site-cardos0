import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projetos'>;

const isPublished = ({ data }: Project) =>
  import.meta.env.PROD ? !data.draft : true;

/** Ordena: `order` asc, depois data desc. */
const byOrderThenDate = (a: Project, b: Project) =>
  a.data.order - b.data.order || b.data.date.valueOf() - a.data.date.valueOf();

/** Todos os projetos publicados, já ordenados. */
export async function getProjects(): Promise<Project[]> {
  const entries = await getCollection('projetos', isPublished);
  return entries.sort(byOrderThenDate);
}

/** Apenas os destacados (`featured: true`). */
export async function getFeaturedProjects(): Promise<Project[]> {
  return (await getProjects()).filter((p) => p.data.featured);
}
