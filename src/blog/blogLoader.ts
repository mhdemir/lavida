// src/blog/blogLoader.ts

import type { BlogPost, BlogCategory } from './blog.types';

/**
 * Lädt alle Blog-Posts aus dem blog-Ordner.
 * Um einen neuen Blog-Post hinzuzufügen:
 * 1. Erstelle eine neue .json Datei in diesem Ordner
 * 2. Folge dem BlogPost-Format aus blog.types.ts
 * 3. Die Datei wird automatisch geladen
 */

// Statischer Import aller Blog-Dateien
// Webpack/Vite wird diese Imports zur Build-Zeit auflösen
const blogFiles = import.meta.glob('./*.json', { eager: true, import: 'default' });

export function loadAllPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const path in blogFiles) {
    const post = blogFiles[path] as BlogPost;
    if (isValidBlogPost(post)) {
      posts.push(post);
    } else {
      console.warn(`[BlogLoader] Ungültiges Blog-Format in ${path}`);
    }
  }

  // Sortiere nach Datum (neueste zuerst)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function loadFeaturedPosts(): BlogPost[] {
  return loadAllPosts().filter(post => post.featured);
}

export function loadPostById(id: string): BlogPost | undefined {
  return loadAllPosts().find(post => post.id === id);
}

/**
 * Filtert Posts nach einer der festen Kategorien
 */
export function loadPostsByCategory(category: BlogCategory): BlogPost[] {
  return loadAllPosts().filter(post => post.tags?.includes(category));
}

/**
 * Sucht in allen Posts nach einem Suchbegriff (Titel, Excerpt, Content, Tags)
 */
export function searchPosts(query: string): BlogPost[] {
  const searchTerm = query.toLowerCase().trim();
  if (!searchTerm) return loadAllPosts();

  return loadAllPosts().filter(post => {
    const inTitle = post.title.toLowerCase().includes(searchTerm);
    const inExcerpt = post.excerpt.toLowerCase().includes(searchTerm);
    const inContent = post.content.toLowerCase().includes(searchTerm);
    const inTags = post.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ?? false;
    
    return inTitle || inExcerpt || inContent || inTags;
  });
}

function isValidBlogPost(obj: unknown): obj is BlogPost {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const post = obj as Record<string, unknown>;

  return (
    typeof post.id === 'string' &&
    typeof post.title === 'string' &&
    typeof post.excerpt === 'string' &&
    typeof post.content === 'string' &&
    typeof post.date === 'string'
  );
}
