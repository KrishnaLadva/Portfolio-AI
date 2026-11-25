import { useState } from 'react';
import { ArrowUpRight, Loader2, Sparkles } from 'lucide-react';
import { AI_LAB_WORKFLOWS } from '../data/portfolioData';
import type { PortfolioProject, ProfileData } from '../types/portfolio';
import { buildPortfolioContextPrompt } from '../utils/portfolioLogic';

interface AICreativeLabProps {
  profile: ProfileData;
  projects: PortfolioProject[];
  onSelectProject: (project: PortfolioProject) => void;
}

const ROLE_OPTIONS = [
  'Digital Marketing Intern',
  'Social Media & Content Intern',
  'SEO & Copywriting Fresher',
  'Frontend + Marketing Hybrid',
];

interface DiscoveryBrief {
  summary: string;
  alignmentPoints: string[];
  recommendedProjectIds: string[];
}

export default function AICreativeLab({
  profile,
  projects,
  onSelectProject,
}: AICreativeLabProps) {
  const [selectedRole, setSelectedRole] = useState(ROLE_OPTIONS[0]);
  const [brief, setBrief] = useState<DiscoveryBrief | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleGenerateBrief(role: string) {
    setSelectedRole(role);
    setLoading(true);
    setError('');

    try {
      const contextPrompt = buildPortfolioContextPrompt(profile, projects);
      const response = await fetch('/api/ai/discover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roleFocus: role, contextPrompt }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Could not generate AI discovery brief.');
      }
      setBrief({
        summary: data.summary ?? '',
        alignmentPoints: Array.isArray(data.alignmentPoints) ? data.alignmentPoints : [],
        recommendedProjectIds: Array.isArray(data.recommendedProjectIds)
          ? data.recommendedProjectIds
          : [],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to reach AI discovery service.');
    } finally {
      setLoading(false);
    }
  }

  const recommendedProjects = (brief?.recommendedProjectIds ?? [])
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is PortfolioProject => Boolean(p));

  return (
    <section id="ai-lab" className="scroll-mt-24 border-y border-[#E6E1D8] bg-[#F2EFE9]/50 py-16">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-[#2563EB]">AI Creative Lab</p>
            <h2 className="mt-2 font-editorial text-3xl font-semibold tracking-tight text-[#18181B] sm:text-4xl">
              How I Pair AI Tools With Human Craft
            </h2>
            <p className="mt-3 max-w-2xl text-base text-[#52525B]">
              I integrate ChatGPT and Canva AI across research, SEO planning, visual prototyping,
              and React web builds—always refining outputs with human editorial clarity.
            </p>
          </div>
        </div>

        {/* 6 AI Workflow Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {AI_LAB_WORKFLOWS.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-2xl border border-[#E6E1D8] bg-white p-6"
            >
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-mono text-xs font-medium text-[#2563EB] tabular-nums">
                    {item.number}.
                  </span>
                  <span className="text-xs text-[#71717A]">{item.tools}</span>
                </div>
                <h3 className="mt-2 font-editorial text-xl font-semibold text-[#18181B]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#52525B]">{item.description}</p>
              </div>

              <div className="mt-5 border-t border-[#F2EFE9] pt-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#71717A]">
                  Workflow Prompt Example
                </p>
                <p className="mt-1.5 text-xs italic leading-relaxed text-[#18181B]">
                  {item.samplePrompt}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive AI Role-Match Discovery Panel */}
        <div className="mt-10 rounded-2xl border border-[#E6E1D8] bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB]">
                AI-Powered Content Discovery
              </p>
              <h3 className="mt-1 font-editorial text-2xl font-semibold text-[#18181B]">
                Explore Role Alignment Using My Real Profile
              </h3>
              <p className="mt-1.5 text-sm text-[#52525B]">
                Select a role focus to generate a factual brief connecting my resume skills and
                projects to your team&apos;s needs.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {ROLE_OPTIONS.map((role) => {
                const isSelected = selectedRole === role && brief !== null;
                return (
                  <button
                    key={role}
                    type="button"
                    disabled={loading}
                    onClick={() => void handleGenerateBrief(role)}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'bg-[#2563EB] text-white'
                        : 'bg-[#F2EFE9] text-[#18181B] hover:bg-[#E6E1D8]'
                    } disabled:opacity-60`}
                  >
                    {loading && selectedRole === role ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                    ) : (
                      <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    <span>{role}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <div role="alert" className="mt-5 rounded-xl border border-[#E6E1D8] bg-[#FAF8F5] p-4 text-sm text-[#52525B]">
              {error}
            </div>
          )}

          {brief && !loading && (
            <div className="mt-6 grid grid-cols-1 gap-6 border-t border-[#E6E1D8] pt-6 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                  Factual Role Fit: {selectedRole}
                </p>
                <p className="mt-2 text-base leading-relaxed text-[#18181B]">{brief.summary}</p>
                <ul className="mt-4 space-y-2 text-sm text-[#52525B]">
                  {brief.alignmentPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB]" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                  Recommended Boards to Inspect
                </p>
                <div className="mt-3 space-y-3">
                  {recommendedProjects.map((proj) => (
                    <button
                      key={proj.id}
                      type="button"
                      onClick={() => onSelectProject(proj)}
                      className="flex w-full items-center justify-between gap-3 rounded-xl border border-[#E6E1D8] bg-[#FAF8F5] p-3 text-left transition-colors hover:border-[#2563EB]"
                    >
                      <div className="min-w-0">
                        <p className="text-[11px] font-medium text-[#2563EB]">{proj.category}</p>
                        <p className="mt-0.5 text-sm font-semibold text-[#18181B] truncate">
                          {proj.title}
                        </p>
                      </div>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-[#52525B]" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
