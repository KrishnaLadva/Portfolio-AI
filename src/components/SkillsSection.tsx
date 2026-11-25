import { SKILL_CATEGORIES } from '../data/portfolioData';
import type { ProfileData } from '../types/portfolio';

interface SkillsSectionProps {
  profile: ProfileData;
}

export default function SkillsSection({ profile }: SkillsSectionProps) {
  return (
    <section id="skills" className="scroll-mt-24 mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-[#2563EB]">Capabilities &amp; Foundations</p>
          <h2 className="mt-2 font-editorial text-3xl font-semibold tracking-tight text-[#18181B] sm:text-4xl">
            Skills Across Marketing, Content &amp; Code
          </h2>
          <p className="mt-3 text-base text-[#52525B]">
            Organized strictly around the technical and digital marketing capabilities listed on my
            resume and applied in my BCA academic build.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="rounded-xl border border-[#18181B]/20 bg-white p-1.5 shadow-[3px_3px_0px_0px_#E6E1D8] -rotate-2">
            <img
              src="/assets/aistudio/download__12__7ddfefb8.jpg"
              alt="Single-line illustration of laptop, stylus, and mug"
              loading="lazy"
              referrerPolicy="no-referrer"
              className="h-14 w-14 rounded-lg object-cover"
            />
          </div>
          <div className="rounded-xl border border-[#18181B]/20 bg-white p-1.5 shadow-[3px_3px_0px_0px_#E6E1D8] rotate-2">
            <img
              src="/assets/aistudio/sticker__photography__instagram__style__mood__sticker_store__minimalistic__fashion__story__brand_e3f633b5.jpg"
              alt="Sticker illustration of hands typing on a laptop"
              loading="lazy"
              referrerPolicy="no-referrer"
              className="h-14 w-16 rounded-lg object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SKILL_CATEGORIES.map((group) => (
          <div
            key={group.id}
            className="flex flex-col justify-between rounded-2xl border border-[#E6E1D8] bg-white p-6 transition-shadow hover:shadow-xs"
          >
            <div>
              <h3 className="font-editorial text-xl font-semibold text-[#18181B]">
                {group.title}
              </h3>
              <p className="mt-1 text-xs text-[#71717A]">{group.subtitle}</p>

              <dl className="mt-5 space-y-4 border-t border-[#F2EFE9] pt-4">
                {group.skills.map((skill) => (
                  <div key={skill.name}>
                    <dt className="text-sm font-semibold text-[#18181B]">{skill.name}</dt>
                    <dd className="mt-0.5 text-xs leading-relaxed text-[#52525B]">
                      {skill.context}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        ))}
      </div>

      {/* Live editable resume skill inventory line with warm yellow grid accent */}
      <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-[#18181B]/20 bg-[#FAF3D3]/65 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#52525B]">
            Resume Skill Inventory
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-[#18181B]">
            {profile.technicalSkills.join(' · ')}
          </p>
        </div>
        <img
          src="/assets/aistudio/download__9__f3b18449.jpg"
          alt="Warm yellow grid texture"
          loading="lazy"
          referrerPolicy="no-referrer"
          className="hidden sm:block h-14 w-20 shrink-0 rounded-xl border border-[#18181B]/20 object-cover rotate-1"
        />
      </div>
    </section>
  );
}
