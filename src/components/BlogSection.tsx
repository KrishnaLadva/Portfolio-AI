import { useState } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import type { BlogArticle } from '../types/blog';
import { BLOG_SECTION_META } from '../data/blogData';
import { formatReadingTime } from '../utils/blogLogic';

interface BlogSectionProps {
  articles: BlogArticle[];
  onOpenArticle: (slug: string) => void;
}

export default function BlogSection({ articles, onOpenArticle }: BlogSectionProps) {
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});
  const featuredArticle = articles[0];

  if (!featuredArticle) return null;

  const readingTime = formatReadingTime(featuredArticle);
  const isImageBroken = brokenImages[featuredArticle.slug];

  return (
    <section
      id="blog"
      className="scroll-mt-24 border-b border-[#E6E1D8] bg-[#FAF8F5] py-16"
      style={{
        backgroundImage: 'radial-gradient(#DDD6CA 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }}
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="font-handwritten text-2xl font-semibold text-[#2563EB]">
              {BLOG_SECTION_META.kicker}
            </p>
            <h2 className="mt-1 font-editorial text-3xl font-semibold tracking-tight text-[#18181B] sm:text-4xl [text-wrap:balance]">
              {BLOG_SECTION_META.heading}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#52525B]">
              {BLOG_SECTION_META.intro}
            </p>
          </div>
          <p className="font-handwritten text-xl font-semibold text-[#52525B]">
            featured journal note
          </p>
        </div>

        {/* Featured Article Scrapbook Card */}
        <article className="mt-10 rounded-2xl border-2 border-[#18181B] bg-white p-6 shadow-[8px_8px_0px_0px_#E6E1D8] sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Editorial Moodboard Visual (Honest Scrapbook Framing) */}
            <div className="lg:col-span-5">
              <figure className="relative mx-auto max-w-sm rounded-2xl border-2 border-[#18181B] bg-[#FAF8F5] p-3 shadow-[5px_5px_0px_0px_#E6E1D8] -rotate-1 transition-transform duration-200 hover:rotate-0">
                {/* Subtle masking-tape scrapbook strip */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-2 rounded-xs border border-[#D4CEC3] bg-[#F5F0E6]/90 shadow-2xs"
                />
                <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#F2EFE9]">
                  {!isImageBroken ? (
                    <img
                      src={featuredArticle.coverVisual.src}
                      alt={featuredArticle.coverVisual.alt}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setBrokenImages((prev) => ({ ...prev, [featuredArticle.slug]: true }))
                      }
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-[#F5F0E6] p-6 text-center">
                      <BookOpen className="h-7 w-7 text-[#2563EB]" aria-hidden="true" />
                      <p className="mt-2 font-editorial text-lg font-semibold text-[#18181B]">
                        {featuredArticle.title}
                      </p>
                    </div>
                  )}
                </div>
                <figcaption className="mt-2.5 flex items-center justify-between gap-2 px-1">
                  <span className="font-handwritten text-lg font-semibold text-[#18181B]">
                    notes from the desk
                  </span>
                  <span className="text-[11px] font-medium text-[#71717A]">
                    Moodboard visual
                  </span>
                </figcaption>
              </figure>
            </div>

            {/* Article Summary & Metadata */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-[#52525B]">
                <span className="text-[#18181B]">{featuredArticle.author}</span>
                <span aria-hidden="true">·</span>
                <time dateTime="2026-11-25">{featuredArticle.date}</time>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-[#2563EB] tabular-nums">{readingTime}</span>
              </div>

              <h3 className="mt-3 font-editorial text-2xl font-semibold leading-snug tracking-tight text-[#18181B] sm:text-3xl [text-wrap:balance]">
                {featuredArticle.title}
              </h3>

              <p className="mt-2.5 text-sm font-medium leading-relaxed text-[#2563EB] sm:text-base">
                {featuredArticle.subtitle}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-[#52525B] sm:text-base">
                {featuredArticle.excerpt}
              </p>

              <div className="mt-5 border-t border-[#E6E1D8] pt-4">
                <p className="text-xs font-medium text-[#71717A]">
                  {featuredArticle.tags.join(' · ')}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onOpenArticle(featuredArticle.slug)}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#18181B] px-5 py-3 text-sm font-medium text-white shadow-[4px_4px_0px_0px_#2563EB] transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#27272A] whitespace-nowrap shrink-0"
                >
                  <span>Read the Story →</span>
                </button>
                <span className="font-handwritten text-xl font-semibold text-[#52525B]">
                  10 sections · Pier 25 &amp; marketing notes
                </span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
