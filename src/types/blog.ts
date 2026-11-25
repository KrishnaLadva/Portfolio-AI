export type BlogContentBlock =
  | {
      type: 'paragraph';
      text: string;
    }
  | {
      type: 'list';
      items: string[];
    }
  | {
      type: 'blockquote';
      text: string;
      note?: string;
    }
  | {
      type: 'divider';
    }
  | {
      type: 'linkCard';
      label: string;
      linkText: string;
      href: string;
    };

export interface BlogArticleSection {
  id: string;
  heading: string;
  headingLevel?: 2 | 3;
  stickerNote?: string;
  blocks: BlogContentBlock[];
}

export interface BlogVisualAsset {
  src: string;
  alt: string;
  caption: string;
}

export interface BlogArticle {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  author: string;
  date: string;
  tags: string[];
  coverVisual: BlogVisualAsset;
  marginVisual?: BlogVisualAsset;
  leadBlocks: BlogContentBlock[];
  sections: BlogArticleSection[];
}

export interface BlogTocItem {
  id: string;
  title: string;
  level: 2 | 3;
}
