import type { BlogArticle, BlogContentBlock, BlogTocItem } from '../types/blog';

export const BLOG_HASH_PREFIX = '#blog/';

function countWordsInBlock(block: BlogContentBlock): number {
  if (block.type === 'paragraph' || block.type === 'blockquote') {
    return block.text.trim().split(/\s+/).filter(Boolean).length;
  }
  if (block.type === 'list') {
    return block.items
      .join(' ')
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
  }
  if (block.type === 'linkCard') {
    return `${block.label} ${block.linkText}`.trim().split(/\s+/).filter(Boolean).length;
  }
  return 0;
}

export function countArticleWords(article: BlogArticle): number {
  const titleWords = `${article.title} ${article.subtitle}`.trim().split(/\s+/).filter(Boolean).length;
  const leadWords = article.leadBlocks.reduce((sum, block) => sum + countWordsInBlock(block), 0);
  const sectionWords = article.sections.reduce((sum, section) => {
    const headingWords = section.heading.trim().split(/\s+/).filter(Boolean).length;
    const blockWords = section.blocks.reduce((bSum, block) => bSum + countWordsInBlock(block), 0);
    return sum + headingWords + blockWords;
  }, 0);

  return titleWords + leadWords + sectionWords;
}

export function calculateReadingTimeMinutes(article: BlogArticle, wordsPerMinute = 200): number {
  const words = countArticleWords(article);
  if (words <= 0) return 1;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function formatReadingTime(article: BlogArticle, wordsPerMinute = 200): string {
  const minutes = calculateReadingTimeMinutes(article, wordsPerMinute);
  return `${minutes} min read`;
}

export function extractTableOfContents(article: BlogArticle): BlogTocItem[] {
  return article.sections.map((section) => ({
    id: section.id,
    title: section.heading,
    level: section.headingLevel ?? 2,
  }));
}

export function buildBlogArticleHash(slug: string): string {
  return `${BLOG_HASH_PREFIX}${encodeURIComponent(slug)}`;
}

export function parseBlogSlugFromHash(hash: string): string | null {
  if (!hash) return null;
  const normalized = hash.startsWith('#') ? hash : `#${hash}`;
  if (!normalized.startsWith(BLOG_HASH_PREFIX)) return null;
  const rawSlug = normalized.slice(BLOG_HASH_PREFIX.length).split('?')[0].trim();
  if (!rawSlug) return null;
  try {
    return decodeURIComponent(rawSlug);
  } catch {
    return rawSlug;
  }
}

export function findArticleBySlug(articles: BlogArticle[], slug: string | null): BlogArticle | null {
  if (!slug) return null;
  return articles.find((article) => article.slug === slug) ?? null;
}

export function calculateReadingProgress(
  scrollY: number,
  articleTop: number,
  articleHeight: number,
  viewportHeight: number,
): number {
  const scrollableDistance = articleHeight - viewportHeight * 0.65;
  if (scrollableDistance <= 0) {
    return scrollY >= articleTop ? 100 : 0;
  }
  const progress = ((scrollY - articleTop) / scrollableDistance) * 100;
  return Math.max(0, Math.min(100, Math.round(progress)));
}
