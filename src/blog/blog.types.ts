// src/blog/blog.types.ts

export interface BlogPost {
  /** Eindeutige ID des Blog-Posts */
  id: string;
  /** Titel des Blog-Posts */
  title: string;
  /** Kurze Zusammenfassung für die Übersicht */
  excerpt: string;
  /** Vollständiger Inhalt des Blog-Posts */
  content: string;
  /** Datum der Veröffentlichung (ISO-Format: YYYY-MM-DD) */
  date: string;
  /** Optionales Bild für den Blog-Post */
  image?: string;
  /** Tags für die Suche */
  tags?: string[];
  /** Ob der Post featured/spezial hervorgehoben werden soll */
  featured?: boolean;
}

/** Feste Kategorien für die Filter-Buttons */
export const BLOG_CATEGORIES = ['Events', 'Neuigkeiten'] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export interface BlogData {
  posts: BlogPost[];
}
