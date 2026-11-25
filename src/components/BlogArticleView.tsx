import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Link2,
} from 'lucide-react';
import type { BlogArticle, BlogContentBlock } from '../types/blog';
import {
  buildBlogArticleHash,
  calculateReadingProgress,
  extractTableOfContents,
  formatReadingTime,
} from '../utils/blogLogic';

interface BlogArticleViewProps {
  article: BlogArticle;
  onBackToBlog: () => void;
}

export default function BlogArticleView({ article, onBackToBlog }: BlogArticleViewProps) {
  const articleRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState<string>(article.sections[0]?.id ?? '');
  const [copied, setCopied] = useState(false);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [coverBroken, setCoverBroken] = useState(false);
  const [marginBroken, setMarginBroken] = useState(false);

  const tocItems = extractTableOfContents(article);
  const readingTime = formatReadingTime(article);

  useEffect(() => {
    setProgress(0);
    setActiveSectionId(article.sections[0]?.id ?? '');
    setCopied(false);
    setMobileTocOpen(false);
  }, [article]);

  useEffect(() => {
    function updateScrollMetrics() {
      const el = articleRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const articleTop = window.scrollY + rect.top;
      const pct = calculateReadingProgress(
        window.scrollY,
        articleTop,
        el.offsetHeight,
        window.innerHeight,
      );
      setProgress(pct);

      const headingElements = tocItems
        .map((item) => document.getElementById(item.id))
        .filter((node): node is HTMLElement => Boolean(node));

      let currentId = tocItems[0]?.id ?? '';
      const activeThreshold = Math.max(220, Math.round(window.innerHeight * 0.28));
      for (const heading of headingElements) {
        const headingTop = heading.getBoundingClientRect().top;
        if (headingTop <= activeThreshold) {
          currentId = heading.id;
        }
      }
      if (currentId) {
        setActiveSectionId(currentId);
      }
    }

    updateScrollMetrics();
    window.addEventListener('scroll', updateScrollMetrics, { passive: true });
    window.addEventListener('resize', updateScrollMetrics, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateScrollMetrics);
      window.removeEventListener('resize', updateScrollMetrics);
    };
  }, [tocItems]);

  async function handleCopyLink() {
    const shareHash = buildBlogArticleHash(article.slug);
    const shareUrl = `${window.location.origin}${window.location.pathname}${shareHash}`;

    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        throw new Error('Clipboard API unavailable');
      }
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = shareUrl;
      textarea.setAttribute('readonly', 'true');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 2600);
  }

  function handleJumpToSection(sectionId: string) {
    const target = document.getElementById(sectionId);
    if (!target) return;
    setActiveSectionId(sectionId);
    setMobileTocOpen(false);
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    target.focus({ preventScroll: true });
  }

  function renderBlock(block: BlogContentBlock, key: string) {
    if (block.type === 'paragraph') {
      const lines = block.text.split('\n');
      return (
        <p key={key} className="text-[16.5px] leading-[1.82] text-[#27272A] sm:text-[17.5px]">
          {lines.map((line, i) => (
            <span key={i}>
              {line}
              {i < lines.length - 1 && <br />}
            </span>
          ))}
        </p>
      );
    }

    if (block.type === 'list') {
      return (
        <ul
          key={key}
          className="my-5 space-y-2.5 rounded-xl border border-[#E6E1D8] bg-white px-5 py-4 text-[16px] leading-relaxed text-[#27272A]"
        >
          {block.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB]"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    }

    if (block.type === 'blockquote') {
      return (
        <figure
          key={key}
          className="relative my-8 rounded-2xl border-2 border-[#18181B] bg-[#F5F0E6] p-6 shadow-[6px_6px_0px_0px_#E6E1D8] sm:p-7"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-3 left-8 h-5 w-20 -rotate-2 rounded-xs border border-[#D4CEC3] bg-white/90"
          />
          <blockquote className="font-editorial text-xl font-medium italic leading-relaxed text-[#18181B] sm:text-2xl">
            “{block.text}”
          </blockquote>
          {block.note && (
            <figcaption className="mt-3 font-handwritten text-xl font-semibold text-[#2563EB]">
              — {block.note}
            </figcaption>
          )}
        </figure>
      );
    }

    if (block.type === 'divider') {
      return (
        <div key={key} className="my-10 flex items-center gap-4" role="separator">
          <div className="h-px flex-1 bg-[#E6E1D8]" />
          <span className="font-handwritten text-xl font-semibold text-[#71717A]">
            * * *
          </span>
          <div className="h-px flex-1 bg-[#E6E1D8]" />
        </div>
      );
    }

    if (block.type === 'linkCard') {
      return (
        <div
          key={key}
          className="mt-7 flex flex-col gap-3 rounded-2xl border-2 border-[#18181B] bg-white p-5 shadow-[5px_5px_0px_0px_#E6E1D8] sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <div>
            <p className="text-sm font-medium text-[#52525B]">{block.label}</p>
            <p className="mt-0.5 font-editorial text-lg font-semibold text-[#18181B]">
              {block.linkText}
            </p>
          </div>
          <a
            href={block.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#18181B] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2563EB] whitespace-nowrap shrink-0"
          >
            <span>{block.linkText}</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      );
    }

    return null;
  }

  return (
    <article
      ref={articleRef}
      aria-labelledby="article-title"
      className="relative bg-[#FAF8F5] pb-20"
    >
      {/* Slim Sticky Reading Progress Indicator (4px height to respect mobile sticky budget) */}
      <div
        role="progressbar"
        aria-label="Article reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        className="sticky top-[69px] z-30 h-1 w-full bg-[#E6E1D8] md:top-[65px]"
      >
        <div
          className="h-full bg-[#2563EB] transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Top Utility Navigation Row */}
      <div className="border-b border-[#E6E1D8] bg-[#FAF8F5]">
        <div className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={onBackToBlog}
            className="inline-flex items-center gap-2 rounded-lg border border-[#D4CEC3] bg-white px-3.5 py-2 text-sm font-medium text-[#18181B] transition-colors hover:border-[#18181B] hover:bg-[#F2EFE9] whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to Blog</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="hidden text-xs font-mono font-medium text-[#71717A] tabular-nums sm:inline">
              {progress}% read
            </span>
            <button
              type="button"
              onClick={() => void handleCopyLink()}
              className="inline-flex items-center gap-2 rounded-lg border border-[#18181B] bg-white px-3.5 py-2 text-sm font-medium text-[#18181B] transition-colors hover:bg-[#F2EFE9] whitespace-nowrap shrink-0"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-[#15803D]" aria-hidden="true" />
                  <span>Link Copied</span>
                </>
              ) : (
                <>
                  <Link2 className="h-4 w-4 text-[#2563EB]" aria-hidden="true" />
                  <span>Copy Article Link</span>
                </>
              )}
            </button>
          </div>
        </div>
        {copied && (
          <div className="sr-only" role="status">
            Article link copied to clipboard.
          </div>
        )}
      </div>

      {/* Article Header */}
      <header
        className="border-b border-[#E6E1D8] bg-[#FAF8F5] pt-10 pb-12 sm:pt-14 sm:pb-14"
        style={{
          backgroundImage: 'radial-gradient(#D8D1C5 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      >
        <div className="mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <p className="font-handwritten text-2xl font-semibold text-[#2563EB]">
                field notes · learning in public
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-[#52525B] sm:text-sm">
                <span className="font-semibold text-[#18181B]">{article.author}</span>
                <span aria-hidden="true">·</span>
                <time dateTime="2026-11-25">{article.date}</time>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-[#2563EB] tabular-nums">{readingTime}</span>
              </div>

              <h1
                id="article-title"
                className="mt-4 font-editorial font-semibold tracking-tight text-[#18181B] [text-wrap:balance]"
                style={{ fontSize: 'clamp(2rem, 3.6vw, 3.15rem)', lineHeight: 1.12 }}
              >
                {article.title}
              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#52525B] sm:text-xl">
                {article.subtitle}
              </p>

              <p className="mt-5 text-xs font-medium text-[#71717A] sm:text-sm">
                {article.tags.join(' · ')}
              </p>
            </div>

            <div className="lg:col-span-4">
              <figure className="relative mx-auto max-w-[280px] rounded-2xl border-2 border-[#18181B] bg-white p-3 shadow-[7px_7px_0px_0px_#E6E1D8] rotate-1">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-3 left-1/2 h-5 w-20 -translate-x-1/2 rotate-2 rounded-xs border border-[#D4CEC3] bg-[#F5F0E6]/90"
                />
                <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#F2EFE9]">
                  {!coverBroken ? (
                    <img
                      src={article.coverVisual.src}
                      alt={article.coverVisual.alt}
                      referrerPolicy="no-referrer"
                      onError={() => setCoverBroken(true)}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center p-4 text-center">
                      <BookOpen className="h-6 w-6 text-[#2563EB]" aria-hidden="true" />
                    </div>
                  )}
                </div>
                <figcaption className="mt-2.5 px-1 text-[11px] leading-snug text-[#52525B]">
                  {article.coverVisual.caption}
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </header>

      {/* Main Article Body + Clickable Table of Contents */}
      <div className="mx-auto max-w-[1160px] px-4 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        {/* Mobile Collapsible Table of Contents */}
        <div className="mb-8 lg:hidden">
          <div className="rounded-2xl border-2 border-[#18181B] bg-white shadow-[5px_5px_0px_0px_#E6E1D8]">
            <button
              type="button"
              onClick={() => setMobileTocOpen((prev) => !prev)}
              aria-expanded={mobileTocOpen}
              aria-controls="mobile-article-toc"
              className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
            >
              <div>
                <p className="font-handwritten text-lg font-semibold text-[#2563EB]">
                  jump to a chapter
                </p>
                <p className="text-sm font-semibold text-[#18181B]">
                  Table of Contents ({tocItems.length} sections)
                </p>
              </div>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-[#18181B] transition-transform duration-150 ${
                  mobileTocOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {mobileTocOpen && (
              <nav
                id="mobile-article-toc"
                aria-label="Article table of contents"
                className="border-t border-[#E6E1D8] px-4 py-3"
              >
                <ol className="space-y-1.5">
                  {tocItems.map((item) => {
                    const isActive = activeSectionId === item.id;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => handleJumpToSection(item.id)}
                          className={`w-full rounded-lg px-2.5 py-2 text-left text-sm transition-colors ${
                            isActive
                              ? 'bg-[#EFF6FF] font-semibold text-[#2563EB]'
                              : 'text-[#52525B] hover:bg-[#F2EFE9] hover:text-[#18181B]'
                          }`}
                        >
                          {item.title}
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </nav>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Desktop Sticky Sidebar: Table of Contents & Sketchbook Note */}
          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-22 space-y-4">
              <div className="rounded-2xl border-2 border-[#18181B] bg-white p-4 shadow-[6px_6px_0px_0px_#E6E1D8]">
                <div className="flex items-baseline justify-between gap-2 border-b border-[#E6E1D8] pb-2.5">
                  <h2 className="font-editorial text-lg font-semibold text-[#18181B]">
                    Contents
                  </h2>
                  <span className="font-mono text-xs font-medium text-[#2563EB] tabular-nums">
                    {progress}%
                  </span>
                </div>

                <nav aria-label="Article table of contents" className="mt-2.5">
                  <ol className="space-y-0.5">
                    {tocItems.map((item) => {
                      const isActive = activeSectionId === item.id;
                      return (
                        <li key={item.id}>
                          <button
                            type="button"
                            onClick={() => handleJumpToSection(item.id)}
                            aria-current={isActive ? 'location' : undefined}
                            className={`w-full rounded-lg px-2.5 py-1.5 text-left text-xs leading-snug transition-colors ${
                              isActive
                                ? 'bg-[#EFF6FF] font-semibold text-[#2563EB]'
                                : 'text-[#52525B] hover:bg-[#F2EFE9] hover:text-[#18181B]'
                            }`}
                          >
                            {item.title}
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                </nav>
              </div>

              {article.marginVisual && (
                <figure className="rounded-2xl border border-[#E6E1D8] bg-white p-3 shadow-2xs">
                  <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#F2EFE9]">
                    {!marginBroken ? (
                      <img
                        src={article.marginVisual.src}
                        alt={article.marginVisual.alt}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={() => setMarginBroken(true)}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center p-4 text-center text-xs text-[#52525B]">
                        {article.marginVisual.alt}
                      </div>
                    )}
                  </div>
                  <figcaption className="mt-2 text-xs leading-snug text-[#52525B]">
                    {article.marginVisual.caption}
                  </figcaption>
                </figure>
              )}
            </div>
          </aside>

          {/* Comfortable Reading Column (~65ch) */}
          <div className="lg:col-span-8">
            <div className="mx-auto max-w-[66ch] space-y-5">
              {/* Lead Narrative */}
              <div className="space-y-5">
                {article.leadBlocks.map((block, idx) =>
                  renderBlock(block, `lead-${idx}`),
                )}
              </div>

              {/* Numbered & Closing Sections */}
              <div className="mt-12 space-y-12">
                {article.sections.map((section) => {
                  const HeadingTag = section.headingLevel === 3 ? 'h3' : 'h2';
                  return (
                    <section
                      key={section.id}
                      id={section.id}
                      tabIndex={-1}
                      className="scroll-mt-28 focus:outline-none"
                    >
                      {section.stickerNote && (
                        <p className="mb-1.5 font-handwritten text-xl font-semibold text-[#2563EB]">
                          ↳ {section.stickerNote}
                        </p>
                      )}
                      <HeadingTag
                        className={`font-editorial font-semibold tracking-tight text-[#18181B] [text-wrap:balance] ${
                          section.headingLevel === 3
                            ? 'text-xl sm:text-2xl'
                            : 'text-2xl sm:text-[1.75rem]'
                        }`}
                      >
                        {section.heading}
                      </HeadingTag>

                      <div className="mt-5 space-y-5">
                        {section.blocks.map((block, bIdx) =>
                          renderBlock(block, `${section.id}-${bIdx}`),
                        )}
                      </div>
                    </section>
                  );
                })}
              </div>

              {/* Bottom Article Actions */}
              <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-[#E6E1D8] pt-8">
                <button
                  type="button"
                  onClick={onBackToBlog}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#18181B] px-5 py-2.5 text-sm font-medium text-white shadow-[4px_4px_0px_0px_#2563EB] transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#27272A] whitespace-nowrap shrink-0"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  <span>Back to Blog</span>
                </button>

                <button
                  type="button"
                  onClick={() => void handleCopyLink()}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#18181B] bg-white px-4 py-2.5 text-sm font-medium text-[#18181B] transition-colors hover:bg-[#F2EFE9] whitespace-nowrap shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-[#15803D]" aria-hidden="true" />
                      <span>Link Copied</span>
                    </>
                  ) : (
                    <>
                      <Link2 className="h-4 w-4 text-[#2563EB]" aria-hidden="true" />
                      <span>Copy Article Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
