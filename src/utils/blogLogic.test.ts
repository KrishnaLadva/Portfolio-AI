import test from 'node:test';
import assert from 'node:assert/strict';
import { BLOG_ARTICLES } from '../data/blogData';
import {
  buildBlogArticleHash,
  calculateReadingProgress,
  calculateReadingTimeMinutes,
  countArticleWords,
  extractTableOfContents,
  findArticleBySlug,
  formatReadingTime,
  parseBlogSlugFromHash,
} from './blogLogic';

test('calculateReadingTimeMinutes and formatReadingTime compute deterministic time from full article text', () => {
  const article = BLOG_ARTICLES[0];
  const wordCount = countArticleWords(article);
  assert.ok(wordCount > 900, `Expected full article word count > 900, got ${wordCount}`);

  const minutes = calculateReadingTimeMinutes(article, 200);
  assert.equal(minutes, Math.ceil(wordCount / 200));
  assert.equal(formatReadingTime(article, 200), `${minutes} min read`);
});

test('extractTableOfContents returns all article section anchors in order', () => {
  const article = BLOG_ARTICLES[0];
  const toc = extractTableOfContents(article);

  assert.equal(toc.length, 11);
  assert.equal(toc[0].id, 'the-blank-caption-box');
  assert.equal(toc[0].title, '1. The Blank Caption Box: A Tiny Rectangle With Big Demands');
  assert.equal(toc[4].id, 'four-friends-one-menu-absolutely-no-decision');
  assert.equal(toc[10].id, 'a-question-for-your-next-creative-project');
  assert.equal(toc[10].level, 3);
});

test('hash routing helpers parse and build stable article URLs without breaking section anchors', () => {
  const article = BLOG_ARTICLES[0];
  const hash = buildBlogArticleHash(article.slug);
  assert.equal(hash, '#blog/i-asked-ai-for-a-caption-restaurant-website');

  assert.equal(parseBlogSlugFromHash(hash), article.slug);
  assert.equal(parseBlogSlugFromHash('#blog'), null);
  assert.equal(parseBlogSlugFromHash('#portfolio'), null);
  assert.equal(parseBlogSlugFromHash(''), null);

  assert.equal(findArticleBySlug(BLOG_ARTICLES, article.slug)?.title, article.title);
  assert.equal(findArticleBySlug(BLOG_ARTICLES, 'non-existent-slug'), null);
});

test('calculateReadingProgress clamps smoothly between 0 and 100', () => {
  assert.equal(calculateReadingProgress(0, 100, 2000, 800), 0);
  assert.equal(calculateReadingProgress(100, 100, 2000, 800), 0);
  const mid = calculateReadingProgress(840, 100, 2000, 800);
  assert.ok(mid > 40 && mid < 60);
  assert.equal(calculateReadingProgress(5000, 100, 2000, 800), 100);
});
