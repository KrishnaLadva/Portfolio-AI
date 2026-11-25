import { useState } from 'react';
import { ArrowDownRight, Download, Layers, MessageSquareText } from 'lucide-react';
import type { ProfileData } from '../types/portfolio';

interface HeroSectionProps {
  profile: ProfileData;
  onOpenAssistant: () => void;
}

export default function HeroSection({ profile, onOpenAssistant }: HeroSectionProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-[#E6E1D8] bg-[#FAF8F5] pt-8 pb-12 sm:pt-12 sm:pb-16"
      style={{
        backgroundImage: 'radial-gradient(#D8D1C5 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }}
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Pinterest-Zine Editorial Column */}
          <div className="lg:col-span-6">
            <p className="font-handwritten text-2xl font-semibold text-[#2563EB] sm:text-3xl -rotate-1 inline-block">
              Hi, since you&apos;re new here — let me be your tour guide.
            </p>

            <div className="mt-3 flex flex-wrap items-baseline gap-3">
              <span className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-[#52525B]">
                {profile.name}
              </span>
              <span aria-hidden="true" className="text-[#71717A]">·</span>
              <span className="font-mono text-xs font-medium text-[#71717A]">
                PORTFOLIO &apos;26
              </span>
            </div>

            <h1
              className="mt-4 font-editorial font-semibold tracking-tight text-[#18181B] [text-wrap:balance]"
              style={{ fontSize: 'clamp(2.35rem, 4.3vw, 3.85rem)', lineHeight: 1.07 }}
            >
              {profile.heroHeadline}
            </h1>

            <p className="mt-3 text-sm font-semibold tracking-wide text-[#2563EB] sm:text-base">
              {profile.roleTitle}
            </p>

            <p className="mt-4 max-w-xl rounded-xl bg-[#FAF8F5]/90 py-1 text-base leading-relaxed text-[#52525B] sm:text-lg">
              {profile.heroIntro}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 rounded-lg bg-[#18181B] px-5 py-3 text-sm font-medium text-white shadow-[4px_4px_0px_0px_#2563EB] transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#27272A] whitespace-nowrap shrink-0"
              >
                <span>View My Work</span>
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={profile.resumePdfUrl}
                download="Krishna_Ladva_Resume.pdf"
                className="inline-flex items-center gap-2 rounded-lg border border-[#18181B] bg-white px-5 py-3 text-sm font-medium text-[#18181B] transition-colors duration-150 hover:bg-[#F2EFE9] whitespace-nowrap shrink-0"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                <span>Download Résumé</span>
              </a>
            </div>

            {/* Secondary lightweight options */}
            <div className="mt-4 flex flex-wrap items-center gap-5 text-sm">
              <a
                href="#carousel-deck"
                className="inline-flex items-center gap-1.5 font-medium text-[#52525B] underline decoration-[#D4CEC3] underline-offset-4 transition-colors hover:text-[#18181B] hover:decoration-[#18181B]"
              >
                <Layers className="h-3.5 w-3.5 text-[#2563EB]" aria-hidden="true" />
                <span>Explore Canva Deck</span>
              </a>
              <button
                type="button"
                onClick={onOpenAssistant}
                className="inline-flex items-center gap-1.5 font-medium text-[#2563EB] underline decoration-[#BFDBFE] underline-offset-4 transition-colors hover:text-[#1D4ED8] hover:decoration-[#2563EB]"
              >
                <MessageSquareText className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Ask Portfolio AI</span>
              </button>
            </div>

            {/* Subtle Pinterest Scrapbook Desk Keepsakes */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#moodboard"
                className="group inline-flex items-center gap-3 rounded-xl border border-[#18181B]/20 bg-white p-2 pr-3.5 shadow-[3px_3px_0px_0px_#E6E1D8] transition-transform duration-150 hover:-translate-y-0.5"
              >
                <img
                  src="/assets/aistudio/1__089f2097.jpg"
                  alt="Peace and productivity theme banner"
                  referrerPolicy="no-referrer"
                  className="h-10 w-16 rounded-lg object-cover"
                />
                <span className="font-handwritten text-base font-semibold text-[#18181B] group-hover:text-[#2563EB]">
                  peace &amp; productivity
                </span>
              </a>

              <a
                href="#moodboard"
                className="group inline-flex items-center gap-2.5 rounded-xl border border-[#18181B]/20 bg-white p-2 pr-3.5 shadow-[3px_3px_0px_0px_#E6E1D8] transition-transform duration-150 hover:-translate-y-0.5 -rotate-1 hover:rotate-0"
              >
                <img
                  src="/assets/aistudio/download__12__7ddfefb8.jpg"
                  alt="Minimalist line art drawing of hand, laptop, and coffee mug"
                  referrerPolicy="no-referrer"
                  className="h-10 w-10 rounded-lg object-cover"
                />
                <span className="font-handwritten text-base font-semibold text-[#18181B] group-hover:text-[#2563EB]">
                  sketchbook notes
                </span>
              </a>

              <a
                href="#moodboard"
                className="group inline-flex items-center gap-2.5 rounded-xl border border-[#18181B]/20 bg-white p-2 pr-3.5 shadow-[3px_3px_0px_0px_#E6E1D8] transition-transform duration-150 hover:-translate-y-0.5 rotate-1 hover:rotate-0"
              >
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-11-18_at_3.17.08_PM_022084bd.jpeg"
                  alt="Candid photo of Krishna smiling at an Ahmedabad cafe"
                  referrerPolicy="no-referrer"
                  className="h-10 w-10 rounded-lg object-cover"
                />
                <span className="font-handwritten text-base font-semibold text-[#18181B] group-hover:text-[#2563EB]">
                  visual diary →
                </span>
              </a>
            </div>
          </div>

          {/* Right Annotated Pinterest Portrait Composition (Inspired by Reference Boards) */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-[600px]">
              {/* Staggered playful PORTFOLIO header behind/above portrait frame */}
              <div
                aria-hidden="true"
                className="mb-3 flex select-none items-end justify-center gap-0.5 font-sans text-4xl font-black tracking-tight text-[#18181B] sm:text-5xl"
              >
                <span className="-rotate-6 inline-block">P</span>
                <span className="translate-y-1 rotate-3 inline-block">O</span>
                <span className="-rotate-3 inline-block">R</span>
                <span className="-translate-y-1 rotate-2 inline-block">T</span>
                <span className="translate-y-0.5 -rotate-6 inline-block text-[#2563EB]">F</span>
                <span className="rotate-6 inline-block">O</span>
                <span className="-rotate-3 inline-block">L</span>
                <span className="translate-y-1 rotate-3 inline-block">I</span>
                <span className="-rotate-6 inline-block">O</span>
              </div>

              {/* Center portrait with crisp editorial cutout frame */}
              <div className="relative mx-auto w-[260px] sm:w-[270px]">
                <div className="overflow-hidden rounded-2xl border-2 border-[#18181B] bg-[#F7DEC8] shadow-[10px_10px_0px_0px_#E6E1D8] aspect-[4/5]">
                  {!imgError ? (
                    <img
                      src={profile.photoUrl}
                      alt={`Studio portrait of ${profile.name}`}
                      referrerPolicy="no-referrer"
                      onError={() => setImgError(true)}
                      className="h-full w-full scale-[1.08] object-cover object-[50%_70%]"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-[#F2EFE9] p-8 text-center">
                      <span className="font-editorial text-5xl font-semibold text-[#18181B]">
                        KL
                      </span>
                    </div>
                  )}
                </div>

                {/* Desktop Annotated Callouts with Hand-Drawn Curved SVG Arrows */}
                <div className="hidden sm:block">
                  {/* Top-Left Annotation */}
                  <div className="absolute top-2 -left-44 w-40 text-right">
                    <p className="font-handwritten text-xl leading-tight font-semibold text-[#18181B]">
                      BCA &apos;{profile.education.graduationYear.slice(-2)} ·{' '}
                      {profile.education.institution}
                    </p>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 80 42"
                      className="ml-auto mt-1 h-7 w-14 text-[#2563EB]"
                      fill="none"
                    >
                      <path
                        d="M6 8 C34 4, 54 16, 68 34"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M58 32 L70 36 L67 24"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  {/* Top-Right Annotation */}
                  <div className="absolute top-8 -right-44 w-40 text-left">
                    <p className="font-handwritten text-xl leading-tight font-semibold text-[#18181B]">
                      Based in {profile.location.split(',')[0]}
                    </p>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 80 42"
                      className="mr-auto mt-1 h-7 w-14 text-[#E11D48]"
                      fill="none"
                    >
                      <path
                        d="M72 8 C46 4, 24 16, 12 34"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M22 32 L10 36 L13 24"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  {/* Bottom-Left Annotation */}
                  <div className="absolute bottom-8 -left-44 w-40 text-right">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 80 42"
                      className="ml-auto mb-1 h-7 w-14 text-[#E11D48]"
                      fill="none"
                    >
                      <path
                        d="M12 36 C34 30, 52 22, 68 8"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M58 10 L70 6 L66 18"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="font-handwritten text-xl leading-tight font-semibold text-[#18181B]">
                      Speaks {profile.languages.join(', ')}
                    </p>
                  </div>

                  {/* Bottom-Right Annotation */}
                  <div className="absolute -right-44 bottom-4 w-40 text-left">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 80 42"
                      className="mr-auto mb-1 h-7 w-14 text-[#2563EB]"
                      fill="none"
                    >
                      <path
                        d="M68 36 C44 30, 26 22, 12 8"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M22 10 L10 6 L14 18"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="font-handwritten text-xl leading-tight font-semibold text-[#18181B]">
                      Social Media · Canva · SEO · MERN
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile Annotation Cards below portrait (zero overlap) */}
              <div className="mt-5 grid grid-cols-2 gap-3 sm:hidden">
                <div className="rounded-xl border border-[#E6E1D8] bg-white p-3">
                  <p className="font-handwritten text-lg font-semibold text-[#2563EB]">
                    BCA &apos;{profile.education.graduationYear.slice(-2)}
                  </p>
                  <p className="text-xs text-[#52525B]">{profile.education.institution}</p>
                </div>
                <div className="rounded-xl border border-[#E6E1D8] bg-white p-3">
                  <p className="font-handwritten text-lg font-semibold text-[#E11D48]">
                    {profile.location.split(',')[0]}
                  </p>
                  <p className="text-xs text-[#52525B]">{profile.languages.join(' · ')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
