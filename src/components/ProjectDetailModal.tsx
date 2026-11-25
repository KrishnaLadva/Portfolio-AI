import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, ExternalLink, Github, Pencil, X } from 'lucide-react';
import type { PortfolioProject, ProfileData } from '../types/portfolio';
import { getSmartRecommendations } from '../utils/portfolioLogic';

interface ProjectDetailModalProps {
  project: PortfolioProject | null;
  allProjects: PortfolioProject[];
  profile: ProfileData;
  onUpdateProfile: (next: ProfileData) => void;
  onClose: () => void;
  onSelectProject: (project: PortfolioProject) => void;
}

export default function ProjectDetailModal({
  project,
  allProjects,
  profile,
  onUpdateProfile,
  onClose,
  onSelectProject,
}: ProjectDetailModalProps) {
  const [editingLinks, setEditingLinks] = useState(false);
  const [demoInput, setDemoInput] = useState(profile.nextAuraLiveDemoUrl);
  const [githubInput, setGithubInput] = useState(profile.nextAuraGithubUrl);
  const [linksSavedNote, setLinksSavedNote] = useState(false);

  useEffect(() => {
    setEditingLinks(false);
    setLinksSavedNote(false);
    setDemoInput(profile.nextAuraLiveDemoUrl);
    setGithubInput(profile.nextAuraGithubUrl);
  }, [project?.id, profile.nextAuraLiveDemoUrl, profile.nextAuraGithubUrl]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const isNextAura = project.id === 'nextaura-ecommerce';
  const hasViews = Boolean(project.views && project.views.length > 0);
  const liveDemoUrl = (isNextAura ? profile.nextAuraLiveDemoUrl : project.liveDemoUrl)?.trim() || '';
  const githubUrl = (isNextAura ? profile.nextAuraGithubUrl : project.githubUrl)?.trim() || '';
  const recommendations = getSmartRecommendations(project, allProjects, 3);

  function handleSaveNextAuraLinks(e: React.FormEvent) {
    e.preventDefault();
    onUpdateProfile({
      ...profile,
      nextAuraLiveDemoUrl: demoInput.trim(),
      nextAuraGithubUrl: githubInput.trim(),
    });
    setEditingLinks(false);
    setLinksSavedNote(true);
    window.setTimeout(() => setLinksSavedNote(false), 3000);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-[#E6E1D8] bg-[#FAF8F5] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Sticky Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-[#E6E1D8] bg-[#FAF8F5]/95 px-6 py-4 backdrop-blur-md">
          <div className="min-w-0">
            <p className="text-xs font-medium text-[#2563EB] truncate">
              {project.category} <span aria-hidden="true">·</span> {project.nature}
            </p>
            <h2
              id="project-modal-title"
              className="mt-0.5 font-editorial text-xl font-semibold text-[#18181B] truncate sm:text-2xl"
            >
              {project.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E6E1D8] bg-white text-[#18181B] transition-colors hover:bg-[#F2EFE9]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {/* Proof Status Bar + NextAura Live Demo & GitHub Controls */}
          <div className="mb-6 flex flex-col gap-3 rounded-xl border border-[#E6E1D8] bg-white px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#71717A]">
                Verification &amp; Scope
              </p>
              <p className="mt-0.5 font-mono text-xs font-semibold text-[#18181B]">
                {project.proofStatus}
              </p>
            </div>

            {isNextAura && (
              <div className="flex flex-wrap items-center gap-2.5">
                {liveDemoUrl ? (
                  <a
                    href={liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#2563EB] px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-[#1D4ED8]"
                  >
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Live Demo</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => setEditingLinks(true)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#D4CEC3] bg-[#FAF8F5] px-3.5 py-2 text-xs font-medium text-[#18181B] transition-colors hover:border-[#2563EB] hover:text-[#2563EB]"
                  >
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Live Demo</span>
                  </button>
                )}

                {githubUrl ? (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#18181B] px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-[#27272A]"
                  >
                    <Github className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>GitHub</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => setEditingLinks(true)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#D4CEC3] bg-[#FAF8F5] px-3.5 py-2 text-xs font-medium text-[#18181B] transition-colors hover:border-[#18181B]"
                  >
                    <Github className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>GitHub</span>
                  </button>
                )}

                {(liveDemoUrl || githubUrl) && (
                  <button
                    type="button"
                    onClick={() => setEditingLinks((prev) => !prev)}
                    aria-label="Edit Live Demo and GitHub URLs"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#E6E1D8] text-[#52525B] hover:bg-[#F2EFE9] hover:text-[#18181B]"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                )}

                {linksSavedNote && (
                  <span role="status" className="inline-flex items-center gap-1 text-xs font-medium text-[#15803D]">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Saved</span>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Inline NextAura URL Editor (saves real URLs without fabricating links) */}
          {isNextAura && editingLinks && (
            <form
              onSubmit={handleSaveNextAuraLinks}
              className="mb-6 rounded-xl border border-[#2563EB]/30 bg-[#EFF6FF]/60 p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold text-[#18181B]">
                  Add Your Real NextAura Live Demo &amp; GitHub Links
                </p>
                <button
                  type="button"
                  onClick={() => setEditingLinks(false)}
                  className="text-xs font-medium text-[#52525B] hover:text-[#18181B]"
                >
                  Cancel
                </button>
              </div>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="modal-nextaura-demo" className="block text-[11px] font-semibold text-[#52525B]">
                    Live Demo URL
                  </label>
                  <input
                    id="modal-nextaura-demo"
                    type="url"
                    value={demoInput}
                    onChange={(e) => setDemoInput(e.target.value)}
                    placeholder="https://nextaura-demo.vercel.app"
                    className="mt-1 w-full rounded-lg border border-[#D4CEC3] bg-white px-3 py-2 text-xs text-[#18181B]"
                  />
                </div>
                <div>
                  <label htmlFor="modal-nextaura-github" className="block text-[11px] font-semibold text-[#52525B]">
                    GitHub Repository URL
                  </label>
                  <input
                    id="modal-nextaura-github"
                    type="url"
                    value={githubInput}
                    onChange={(e) => setGithubInput(e.target.value)}
                    placeholder="https://github.com/username/nextaura"
                    className="mt-1 w-full rounded-lg border border-[#D4CEC3] bg-white px-3 py-2 text-xs text-[#18181B]"
                  />
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <button
                  type="submit"
                  className="rounded-lg bg-[#2563EB] px-4 py-1.5 text-xs font-medium text-white hover:bg-[#1D4ED8]"
                >
                  Save Project Links
                </button>
              </div>
            </form>
          )}

          {/* Hero Media for boards without a dedicated Views gallery */}
          {!hasViews && (
            project.secondaryImageUrl ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
                <div className="overflow-hidden rounded-xl border border-[#E6E1D8] bg-[#F2EFE9] sm:col-span-8">
                  <div className="border-b border-[#E6E1D8] bg-white px-3 py-1.5 text-[11px] font-medium text-[#52525B]">
                    Desktop Storefront Screen
                  </div>
                  <img
                    src={project.imageUrl}
                    alt={project.imageAlt}
                    referrerPolicy="no-referrer"
                    className="aspect-[16/10] w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-xl border border-[#E6E1D8] bg-[#F2EFE9] sm:col-span-4">
                  <div className="border-b border-[#E6E1D8] bg-white px-3 py-1.5 text-[11px] font-medium text-[#52525B]">
                    Mobile Checkout Screen
                  </div>
                  <img
                    src={project.secondaryImageUrl}
                    alt={project.secondaryImageAlt || `${project.title} mobile screen`}
                    referrerPolicy="no-referrer"
                    className="aspect-[3/4] h-full max-h-[340px] w-full object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-[#E6E1D8] bg-[#F2EFE9]">
                <img
                  src={project.imageUrl}
                  alt={project.imageAlt}
                  referrerPolicy="no-referrer"
                  className="max-h-[420px] w-full object-cover"
                />
              </div>
            )
          )}

          {/* Structured Case Breakdown (Brief -> Process -> Deliverables -> Learnings) */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-8">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#2563EB]">
                  The Brief
                </h3>
                <p className="mt-2 text-base leading-relaxed text-[#18181B]">{project.brief}</p>
              </div>

              <div className="border-t border-[#E6E1D8] pt-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                  Problem &amp; Objective
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#52525B]">
                  {project.problemAndObjective}
                </p>
              </div>

              <div className="border-t border-[#E6E1D8] pt-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                  My Process
                </h3>
                <ol className="mt-2.5 space-y-2 text-sm text-[#52525B]">
                  {project.process.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="mt-0.5 font-mono text-xs font-semibold text-[#2563EB] tabular-nums">
                        0{idx + 1}.
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {!hasViews && (
                <div className="border-t border-[#E6E1D8] pt-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                    My Contribution
                  </h3>
                  <ul className="mt-2.5 space-y-2 text-sm text-[#52525B]">
                    {project.contribution.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="space-y-5 lg:col-span-4">
              <div className="rounded-xl border border-[#E6E1D8] bg-white p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                  Final Deliverables
                </h3>
                <ul className="mt-3 space-y-2 text-xs leading-relaxed text-[#18181B]">
                  {project.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#18181B]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-[#E6E1D8] bg-white p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                  What I Learned
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#52525B]">
                  {project.learnings}
                </p>
              </div>

              <div className="rounded-xl border border-[#E6E1D8] bg-white p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                  Tools Used
                </h3>
                <p className="mt-3 text-sm leading-relaxed font-medium text-[#18181B]">
                  {project.toolsUsed.join(' · ')}
                </p>
              </div>

              <div className="rounded-xl border border-[#E6E1D8] bg-white p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                  Outcome &amp; Context
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#52525B]">
                  {project.finalOutcome}
                </p>
              </div>
            </div>
          </div>

          {/* Views Gallery (placed directly after My Process) */}
          {hasViews && project.views && (
            <div className="mt-8 border-t border-[#E6E1D8] pt-6">
              <div>
                <h3 className="font-editorial text-xl font-semibold text-[#18181B]">Views</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#52525B]">
                  Real local NextAura screenshots ordered 01–16 across customer, test-mode
                  checkout, admin, and architecture views. Payment options are alternative checkout
                  methods, and Razorpay screens represent test-mode options and progress rather than
                  verified live payments.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                {project.views.map((view) => (
                  <figure
                    key={view.number}
                    className="flex flex-col overflow-hidden rounded-xl border border-[#E6E1D8] bg-white"
                  >
                    <div className="flex items-center justify-center bg-[#F2EFE9]/70 p-2">
                      <img
                        src={view.imageUrl}
                        alt={`${view.number} ${view.title} — ${view.caption}`}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="h-auto max-h-[300px] w-full object-contain"
                      />
                    </div>
                    <figcaption className="border-t border-[#E6E1D8] px-4 py-3">
                      <p className="text-sm font-semibold text-[#18181B]">
                        <span className="mr-2 font-mono text-xs font-semibold text-[#2563EB] tabular-nums">
                          {view.number}
                        </span>
                        <span>{view.title}</span>
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-[#52525B]">{view.caption}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>

              <div className="mt-8 border-t border-[#E6E1D8] pt-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                  My Contribution
                </h3>
                <ul className="mt-2.5 grid grid-cols-1 gap-2 text-sm text-[#52525B] sm:grid-cols-2">
                  {project.contribution.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Smart Project Recommendations */}
          <div className="mt-10 border-t border-[#E6E1D8] pt-8">
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-[#2563EB]">Smart Recommendations</p>
                <h3 className="mt-1 font-editorial text-xl font-semibold text-[#18181B]">
                  More Boards Like This
                </h3>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {recommendations.map((rec) => (
                <button
                  key={rec.id}
                  type="button"
                  onClick={() => onSelectProject(rec)}
                  className="group flex flex-col overflow-hidden rounded-xl border border-[#E6E1D8] bg-white text-left transition-colors hover:border-[#2563EB]"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#F2EFE9]">
                    <img
                      src={rec.imageUrl}
                      alt={rec.imageAlt}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-3.5">
                    <p className="text-[11px] font-medium text-[#71717A]">{rec.category}</p>
                    <div className="mt-1 flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-[#18181B] group-hover:text-[#2563EB] line-clamp-2">
                        {rec.title}
                      </p>
                      <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-[#71717A] group-hover:text-[#2563EB]" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
