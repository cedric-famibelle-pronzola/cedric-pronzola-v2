import { BlogPost, BlogPostMetadata } from '../types/blog';
import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

const ARTICLES_BASE_DIR = path.join(process.cwd(), 'app/articles');

async function markdownToHtml(markdown: string) {
  try {
    const result = await remark()
      .use(remarkGfm)
      .use(html, { sanitize: false })
      .process(markdown);
      
    return result.toString();
  } catch (error) {
    console.error('Error converting markdown to HTML:', error);
    return `<p>Error rendering content</p>`;
  }
}

export async function getAllPosts(locale: string = 'en'): Promise<BlogPostMetadata[]> {
  try {
    // Use the localized articles folder
    const localizedDir = path.join(ARTICLES_BASE_DIR, locale);
    
    // Fall back to the root articles directory if localized directory doesn't exist
    const articlesDir = fsSync.existsSync(localizedDir) ? localizedDir : ARTICLES_BASE_DIR;
    
    if (!fsSync.existsSync(articlesDir)) {
      console.log(`Articles directory ${articlesDir} does not exist, creating it...`);
      fsSync.mkdirSync(articlesDir, { recursive: true });
      return [];
    }

    const files = fsSync.readdirSync(articlesDir);
    const mdFiles = files.filter(file => file.endsWith('.md'));

    const posts = mdFiles.map(file => {
      const slug = file.replace(/\.md$/, '');
      const filePath = path.join(articlesDir, file);
      const fileContent = fsSync.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);
      
      return {
        slug,
        title: data.title || 'Untitled',
        description: data.description || '',
        date: data.date || new Date().toISOString(),
        author: {
          name: data.author?.name || 'Anonymous',
          url: data.author?.url || '#',
        },
      };
    });

    return posts.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('Error getting posts:', error);
    return [];
  }
}

export function getPostSlugs(locale: string = 'en'): string[] {
  try {
    // Use the localized articles folder
    const localizedDir = path.join(ARTICLES_BASE_DIR, locale);
    
    // Fall back to the root articles directory if localized directory doesn't exist
    const articlesDir = fsSync.existsSync(localizedDir) ? localizedDir : ARTICLES_BASE_DIR;
    
    if (!fsSync.existsSync(articlesDir)) {
      return [];
    }
    
    const files = fsSync.readdirSync(articlesDir);
    return files
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error getting post slugs:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string, locale: string = 'en'): Promise<BlogPost | null> {
  try {
    // Use the localized articles folder
    const localizedDir = path.join(ARTICLES_BASE_DIR, locale);
    
    // Check first in the localized directory
    let filePath = path.join(localizedDir, `${slug}.md`);
    if (!fsSync.existsSync(filePath)) {
      // If not found, check in the root articles directory
      filePath = path.join(ARTICLES_BASE_DIR, `${slug}.md`);
      if (!fsSync.existsSync(filePath)) {
        return null;
      }
    }

    const fileContent = fsSync.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const htmlContent = await markdownToHtml(content);
    
    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      content: htmlContent,
      author: {
        name: data.author?.name || 'Anonymous',
        url: data.author?.url || '#',
      },
    };
  } catch (error) {
    console.error(`Error getting post by slug "${slug}":`, error);
    return null;
  }
}
