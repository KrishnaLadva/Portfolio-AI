import { useState } from 'react';
import { Download, Eye, EyeOff } from 'lucide-react';
import type { ProfileData } from '../types/portfolio';

interface ResumeSectionProps {
  profile: ProfileData;
}

export default function ResumeSection({ profile }: ResumeSectionProps) {
  const [showPdfPreview, setShowPdfPreview] = useState(false);

  return (
    <section id="resume" className="scroll-mt-24 mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-[#E6E1D8] bg-white p-6 sm:p-10">
        <div className="flex flex-col gap-6 border-b border-[#E6E1D8] pb-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-[#2563EB]">Curriculum Vitae</p>
            <h2 className="mt-2 font-editorial text-3xl font-semibold tracking-tight text-[#18181B]">
              Download Resume
            </h2>
            <p className="mt-2 max-w-xl text-sm text-[#52525B]">
              Access the complete PDF version of my resume with education details, technical
              skills, and academic project documentation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setShowPdfPreview((prev) => !prev)}
              aria-expanded={showPdfPreview}
              className="inline-flex items-center gap-2 rounded-lg border border-[#D4CEC3] bg-[#FAF8F5] px-4 py-2.5 text-sm font-medium text-[#18181B] transition-colors hover:border-[#18181B]"
            >
              {showPdfPreview ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
              <span>{showPdfPreview ? 'Hide PDF Preview' : 'Preview PDF'}</span>
            </button>

            <a
              href={profile.resumePdfUrl}
              download="Krishna_Ladva_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-lg bg-[#18181B] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#27272A]"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span>Download Resume (PDF)</span>
            </a>
          </div>
        </div>

        {/* Structured Resume Snapshot */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                Education
              </h3>
              <p className="mt-2 text-base font-semibold text-[#18181B]">
                {profile.education.degree}
              </p>
              <p className="mt-0.5 text-sm text-[#52525B]">{profile.education.institution}</p>
              <p className="mt-0.5 text-sm text-[#71717A] tabular-nums">
                Year of Graduation: {profile.education.graduationYear}
              </p>
            </div>

            <div className="border-t border-[#F2EFE9] pt-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                Core Strengths
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#52525B]">
                {profile.strengths.join(' · ')}
              </p>
            </div>

            <div className="border-t border-[#F2EFE9] pt-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                Languages
              </h3>
              <p className="mt-2 text-sm text-[#52525B]">{profile.languages.join(' · ')}</p>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-7">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                Academic Project Highlight
              </h3>
              <p className="mt-2 text-base font-semibold text-[#18181B]">
                NextAura — Ethnic Fashion E-commerce Website
              </p>
              <p className="mt-1 text-xs font-medium text-[#2563EB]">
                MERN Stack (MongoDB, Express.js, React.js, Node.js)
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-[#52525B]">
                <li>• Developed a responsive full-stack e-commerce website for ethnic fashion.</li>
                <li>• Implemented user authentication, product filtering, search, and cart flows.</li>
                <li>• Integrated Razorpay for online payments and built an admin management panel.</li>
              </ul>
            </div>

            <div className="border-t border-[#F2EFE9] pt-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                Technical &amp; Marketing Skills
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#18181B]">
                {profile.technicalSkills.join(' · ')}
              </p>
            </div>
          </div>
        </div>

        {/* Optional Embedded PDF Viewer */}
        {showPdfPreview && (
          <div className="mt-8 overflow-hidden rounded-xl border border-[#E6E1D8] bg-[#FAF8F5]">
            <iframe
              src={profile.resumePdfUrl}
              title="Krishna Ladva Resume PDF"
              className="h-[560px] w-full"
            />
          </div>
        )}
      </div>
    </section>
  );
}
