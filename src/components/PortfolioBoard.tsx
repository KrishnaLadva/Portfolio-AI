import { useState } from 'react';
import { ArrowUpRight, Loader2, Search, Sparkles, X } from 'lucide-react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import type { PortfolioProject, ProjectCategory } from '../types/portfolio';
import { PORTFOLIO_CATEGORIES } from '../data/portfolioData';
import { filterAndRankProjects } from '../utils/portfolioLogic';

interface PortfolioBoardProps {
  projects: PortfolioProject[];
  onSelectProject: (project: PortfolioProject) => void;
}

const DISCOVERY_PROMPTS = [
  'E-commerce & MERN',
  'Instagram & Canva',
  'SEO & Keywords',
  'AI Prompts & Strategy',
];

export default function PortfolioBoard({ projects, onSelectProject }: PortfolioBoardProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiRankedIds, setAiRankedIds] = useState<string[] | null>(null);
  const [aiNote, setAiNote] = useState<string>('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string>('');
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});
  const [hasFiltered, setHasFiltered] = useState(false);

  const visibleProjects = filterAndRankProjects(projects, activeCategory, searchQuery, aiRankedIds);

  async function runAISearch(queryText: string) {
    const trimmed = queryText.trim();
    if (!trimmed) {
      setAiRankedIds(null);
      setAiNote('');
      setAiError('');
      return;
    }

    setAiLoading(true);
    setAiError('');
    try {
      const response = await fetch('/api/ai/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: trimmed, projects }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Unable to run AI portfolio discovery.');
      }
      setAiRankedIds(Array.isArray(data.matchedIds) ? data.matchedIds : []);
      setAiNote(typeof data.discoveryNote === 'string' ? data.discoveryNote : '');
    } catch (err) {
      setAiError(
        err instanceof Error ? err.message : 'AI search is currently unavailable; showing instant keyword matches.',
      );
      setAiRankedIds(null);
    } finally {
      setAiLoading(false);
    }
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    setHasFiltered(true);
    void runAISearch(searchQuery);
  }

  function handleClearSearch() {
    setHasFiltered(true);
    setSearchQuery('');
    setAiRankedIds(null);
    setAiNote('');
    setAiError('');
  }

  function handleQuickPrompt(prompt: string) {
    setHasFiltered(true);
    setSearchQuery(prompt);
    setActiveCategory('All');
    void runAISearch(prompt);
  }

  return (
    <section
      id="portfolio"
      className="scroll-mt-24 mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium text-[#2563EB]">Creative Portfolio Board</p>
          <h2 className="mt-2 font-editorial text-3xl font-semibold tracking-tight text-[#18181B] sm:text-4xl [text-wrap:balance]">
            Curated Builds, Visual Studies &amp; Strategy Pins
          </h2>
          <p className="mt-3 max-w-2xl text-base text-[#52525B]">
            Explore my academic MERN e-commerce build alongside self-initiated marketing, SEO,
            Instagram, and AI creative studies. Click any board to inspect the full case breakdown.
          </p>
        </div>

        {/* AI-Powered Search & Discovery Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="w-full max-w-lg"
          role="search"
          aria-label="AI portfolio search"
        >
          <div className="flex items-center gap-2 rounded-xl border border-[#E6E1D8] bg-white p-1.5 shadow-xs focus-within:border-[#2563EB]">
            <Search className="ml-2.5 h-4 w-4 shrink-0 text-[#71717A]" aria-hidden="true" />
            <label htmlFor="portfolio-search-input" className="sr-only">
              Search portfolio boards
            </label>
            <input
              id="portfolio-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (!e.target.value.trim()) {
                  setAiRankedIds(null);
                  setAiNote('');
                  setAiError('');
                }
              }}
              placeholder="Search skills, Canva, MERN, SEO..."
              className="w-full bg-transparent px-2 py-2 text-sm text-[#18181B] placeholder:text-[#71717A] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label="Clear search query"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#71717A] hover:bg-[#F2EFE9] hover:text-[#18181B]"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              type="submit"
              disabled={aiLoading || !searchQuery.trim()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#2563EB] px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap shrink-0"
            >
              {aiLoading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
              ) : (
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              <span>AI Discover</span>
            </button>
          </div>
          <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs text-[#71717A]">
            <span>Try:</span>
            {DISCOVERY_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleQuickPrompt(prompt)}
                className="font-medium text-[#52525B] underline decoration-[#D4CEC3] underline-offset-4 transition-colors hover:text-[#2563EB] hover:decoration-[#2563EB]"
              >
                {prompt}
              </button>
            ))}
          </div>
        </form>
      </div>

      {/* AI Discovery Note / Error Feedback */}
      {aiNote && (
        <div
          role="status"
          className="mt-5 rounded-xl border border-[#DBEAFE] bg-[#EFF6FF] px-4 py-3 text-sm text-[#1E3A8A]"
        >
          <span className="font-semibold">AI Discovery:</span> {aiNote}
        </div>
      )}
      {aiError && (
        <div
          role="alert"
          className="mt-5 rounded-xl border border-[#E6E1D8] bg-[#F2EFE9] px-4 py-3 text-sm text-[#52525B]"
        >
          {aiError}
        </div>
      )}

      {/* Category Filter Segmented Controls */}
      <div
        role="tablist"
        aria-label="Filter portfolio by category"
        className="mt-8 flex flex-wrap items-center gap-2 border-b border-[#E6E1D8] pb-5"
      >
        {PORTFOLIO_CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setHasFiltered(true);
                setActiveCategory(category);
              }}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-[#18181B] text-white'
                  : 'bg-[#F2EFE9] text-[#52525B] hover:bg-[#E6E1D8] hover:text-[#18181B]'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Pinterest-Inspired Masonry Grid */}
      <MotionConfig reducedMotion="user">
        <AnimatePresence mode="wait">
          {visibleProjects.length > 0 ? (
            <motion.div
              key={`${activeCategory}-${aiRankedIds ? aiRankedIds.join(',') : searchQuery.trim()}`}
              data-testid="masonry-grid"
              initial={{ opacity: 0.98 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              className="mt-8 columns-1 gap-6 space-y-6 md:columns-2 lg:columns-3"
            >
              {visibleProjects.map((project, idx) => {
                const isBroken = brokenImages[project.id];
                return (
                  <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 18, scale: 0.97 }}
                    animate={hasFiltered ? { opacity: 1, y: 0, scale: 1 } : undefined}
                    whileInView={hasFiltered ? undefined : { opacity: 1, y: 0, scale: 1 }}
                    whileHover={{ y: -4 }}
                    viewport={hasFiltered ? undefined : { once: true, amount: 0.05 }}
                    transition={{
                      duration: 0.36,
                      delay: Math.min(idx * 0.045, 0.24),
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="break-inside-avoid overflow-hidden rounded-2xl border border-[#E6E1D8] bg-white transition-shadow duration-200 hover:shadow-md"
                  >
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    aria-label={`View project: ${project.title}`}
                    className="group block w-full text-left focus:outline-none"
                  >
                  <div className={`relative w-full overflow-hidden bg-[#F2EFE9] ${project.aspectClass}`}>
                    {!isBroken ? (
                      <>
                        <img
                          src={project.imageUrl}
                          alt={project.imageAlt}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setBrokenImages((prev) => ({ ...prev, [project.id]: true }))
                          }
                          className={`h-full w-full transition-transform duration-300 group-hover:scale-[1.03] ${
                            project.viewGroups?.length ? 'bg-white object-contain p-1.5' : 'object-cover'
                          }`}
                        />
                        {project.secondaryImageUrl && (
                          <div className="absolute right-2.5 bottom-2.5 z-10 w-[23%] min-w-[68px] max-w-[92px] overflow-hidden rounded-xl border-2 border-[#18181B] bg-white shadow-lg transition-transform duration-300 group-hover:-translate-y-1">
                            <img
                              src={project.secondaryImageUrl}
                              alt={project.secondaryImageAlt || `${project.title} mobile view`}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              className="aspect-[3/4] w-full object-cover"
                            />
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center p-6 text-center">
                        <p className="font-editorial text-lg font-medium text-[#18181B]">
                          {project.title}
                        </p>
                      </div>
                    )}

                    {/* Subtle hover scrim + View Project indicator */}
                    <div className="pointer-events-none absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/65 via-black/10 to-transparent p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                      <span className="text-xs font-medium text-white/95">
                        View Case Breakdown
                      </span>
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#18181B]">
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#71717A]">
                      <span className="font-medium text-[#2563EB]">{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.nature}</span>
                    </div>

                    <p className="mt-1.5 font-mono text-[11px] font-medium text-[#52525B]">
                      {project.proofStatus}
                    </p>

                    <h3 className="mt-1.5 font-editorial text-xl font-semibold leading-snug text-[#18181B] group-hover:text-[#2563EB]">
                      {project.title}
                    </h3>

                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#52525B]">
                      {project.shortDescription}
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t border-[#F2EFE9] pt-3 text-xs text-[#71717A]">
                      <span className="truncate">{project.toolsUsed.slice(0, 3).join(' · ')}</span>
                      <span className="ml-2 shrink-0 font-medium text-[#18181B] group-hover:text-[#2563EB]">
                        View Project
                      </span>
                    </div>
                  </div>
                  </button>
                </motion.article>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="empty-portfolio-state"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-10 rounded-2xl border border-[#E6E1D8] bg-white p-10 text-center"
          >
            <h3 className="font-editorial text-xl font-semibold text-[#18181B]">
              No matching portfolio boards found
            </h3>
            <p className="mt-2 text-sm text-[#52525B]">
              Try clearing your search query or switching back to all categories.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('All');
                handleClearSearch();
              }}
              className="mt-5 inline-flex items-center justify-center rounded-lg bg-[#18181B] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#27272A]"
            >
              Show All Boards
            </button>
          </motion.div>
        )}
        </AnimatePresence>
      </MotionConfig>
    </section>
  );
}
