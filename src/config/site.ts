/**
 * Configuração central do site.
 *
 * Os VALORES ficam em `src/data/site.json` — é esse arquivo que o painel
 * (/admin) edita. Aqui ficam só os tipos e o carregamento tipado.
 */
import data from '../data/site.json';

export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  /** Número exibido em destaque. Use "--" enquanto não tiver o valor real. */
  number: string;
  label: string;
}

export interface Service {
  title: string;
  description: string;
}

export interface Step {
  title: string;
  description: string;
}

export interface ContactLink {
  label: string;
  href: string;
  /** Marca o botão principal (estilo preenchido). */
  primary?: boolean;
  /** Exibe o rótulo como texto selecionável, sem virar link clicável. */
  plain?: boolean;
  /** Mostra um ícone no lugar do texto. Suportado: 'whatsapp'. */
  icon?: 'whatsapp';
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  /** URL absoluta do site, sem barra final. Também definida em astro.config.mjs. */
  url: string;
  locale: string;
  author: string;
  nav: NavLink[];
  hero: {
    eyebrow: string;
    /** Use {palavra} para destacar termos com a cor de acento. */
    heading: string;
    lead: string;
    primaryCta: NavLink;
    secondaryCta: NavLink;
    /** Linha curta de reforço abaixo dos botões. Deixe vazio para ocultar. */
    note?: string;
  };
  services: {
    tag: string;
    heading: string;
    lead: string;
    items: Service[];
  };
  process: {
    tag: string;
    heading: string;
    lead: string;
    steps: Step[];
  };
  about: {
    tag: string;
    heading: string;
    /** Cada string vira um parágrafo. */
    paragraphs: string[];
    stats: Stat[];
    /** Foto de apresentação. Arquivo em /public. Deixe undefined para ocultar. */
    photo?: {
      src: string;
      alt: string;
    };
  };
  projects: {
    tag: string;
    heading: string;
    lead: string;
  };
  contact: {
    tag: string;
    heading: string;
    lead: string;
    links: ContactLink[];
  };
  social: {
    github?: string;
    instagram?: string;
    linkedin?: string;
  };
  analytics: {
    /**
     * Domínio cadastrado no Plausible (ex.: 'cardos0.com.br').
     * Vazio = analytics desativado. O script só carrega no build de produção.
     */
    plausibleDomain: string;
    /** Plausible self-hosted: URL completa do script. Vazio = plausible.io padrão. */
    plausibleSrc?: string;
  };
}

export const site = data as SiteConfig;

/** Categorias usadas na barra de filtros e no schema dos projetos. */
export const projectCategories = [
  { id: 'all', label: 'Todos' },
  { id: 'institucional', label: 'Institucional' },
  { id: 'comunidade', label: 'Comunidade' },
  { id: 'landing', label: 'Landing Page' },
] as const;

export type ProjectCategory = Exclude<
  (typeof projectCategories)[number]['id'],
  'all'
>;
