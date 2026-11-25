import { useEffect, useState } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Mail,
  Pause,
  Play,
} from 'lucide-react';
import type { PortfolioProject, ProfileData } from '../types/portfolio';
import { wrapSlideIndex } from '../utils/portfolioLogic';

interface CanvaCarouselSectionProps {
  profile: ProfileData;
  projects: PortfolioProject[];
  onSelectProject: (project: PortfolioProject) => void;
}

const SLIDE_META = [
  { id: 'cover', number: '01', label: 'Cover Spread' },
  { id: 'content-index', number: '02', label: 'Content 01–05' },
  { id: 'story-pass', number: '03', label: 'About Pass' },
  { id: 'nextaura-feature', number: '04', label: 'NextAura Build' },
  { id: 'skills-collage', number: '05', label: 'Skills & Works' },
  { id: 'wrap-contact', number: '06', label: 'And That’s a Wrap' },
];

const CONTENT_COLUMNS = [
  {
    num: '1',
    topNum: '01',
    bgClass: 'bg-[#4F75C2]',
    projectId: 'nextaura-ecommerce',
    shortLabel: 'NEXTAURA',
    caption: 'Full-stack MERN ethnic fashion e-commerce platform',
  },
  {
    num: '2',
    topNum: '02',
    bgClass: 'bg-[#D7CCBE]',
    projectId: 'handloom-instagram-carousels',
    shortLabel: 'WOVEN',
    caption: 'Editorial 6-slide Instagram carousel concept in Canva',
  },
  {
    num: '3',
    topNum: '03',
    bgClass: 'bg-[#97B16C]',
    projectId: 'elements-campaign-board',
    shortLabel: 'LOOKBOOK',
    caption: 'Seasonal social campaign moodboard & launch copy',
  },
  {
    num: '4',
    topNum: '04',
    bgClass: 'bg-[#E65446]',
    projectId: 'seo-keyword-architecture',
    shortLabel: 'SEO MAP',
    caption: 'Apparel keyword architecture & topic cluster blueprint',
  },
  {
    num: '5',
    topNum: '05',
    bgClass: 'bg-[#7894D8]',
    projectId: 'ai-prompt-visual-lab',
    shortLabel: 'AI LAB',
    caption: 'ChatGPT & Canva AI prompt engineering experiments',
  },
];

export default function CanvaCarouselSection({
  profile,
  projects,
  onSelectProject,
}: CanvaCarouselSectionProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const totalSlides = SLIDE_META.length;

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => wrapSlideIndex(prev + 1, totalSlides));
    }, 5000);
    return () => window.clearInterval(timer);
  }, [isPlaying, totalSlides]);

  function goPrev() {
    setActiveSlide((prev) => wrapSlideIndex(prev - 1, totalSlides));
  }

  function goNext() {
    setActiveSlide((prev) => wrapSlideIndex(prev + 1, totalSlides));
  }

  function openProjectById(id: string) {
    const found = projects.find((p) => p.id === id);
    if (found) onSelectProject(found);
  }

  const nextAura = projects.find((p) => p.id === 'nextaura-ecommerce') ?? projects[0];

  return (
    <section
      id="carousel-deck"
      className="scroll-mt-24 mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8"
    >
      {/* Canva Presentation Header Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[#2563EB]">Canva-Style Portfolio Carousel</p>
          <h2 className="mt-1 font-editorial text-3xl font-semibold tracking-tight text-[#18181B] sm:text-4xl">
            Swipe Through My Visual Portfolio Deck
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[#52525B] sm:text-base">
            Inspired by editorial Canva decks and zine moodboards — browse all 6 spreads or jump
            directly into any numbered project card.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span
            aria-live="polite"
            className="mr-2 font-mono text-xs font-medium text-[#52525B] tabular-nums"
          >
            {SLIDE_META[activeSlide].number} / 0{totalSlides}
          </span>
          <button
            type="button"
            onClick={() => setIsPlaying((prev) => !prev)}
            aria-label={isPlaying ? 'Pause carousel auto-advance' : 'Auto-play carousel'}
            className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-[#D4CEC3] bg-white px-3 text-xs font-medium text-[#18181B] transition-colors hover:border-[#18181B]"
          >
            {isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Autoplay</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous carousel slide"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#D4CEC3] bg-white text-[#18181B] transition-colors hover:border-[#18181B]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next carousel slide"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#18181B] text-white transition-colors hover:bg-[#27272A]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Canva Slide Stage */}
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Canva-style portfolio carousel"
        className="mt-7 overflow-hidden rounded-2xl border-2 border-[#18181B] bg-[#F4EFE6] shadow-[8px_8px_0px_0px_#E6E1D8]"
      >
        {/* SLIDE 01: COVER SPREAD (Full Unobstructed Name + Editorial Intro) */}
        {activeSlide === 0 && (
          <div className="relative min-h-[440px] p-6 sm:p-10 lg:min-h-[500px] lg:p-14 flex flex-col justify-between overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="font-handwritten text-2xl font-semibold text-[#18181B] sm:text-3xl">
                Hi. Since you&apos;re new here,
              </p>
              <div className="overflow-hidden rounded-xl border border-[#18181B]/25 bg-white p-1 shadow-xs">
                <img
                  src="/assets/aistudio/1__089f2097.jpg"
                  alt="Peace and productivity graphic banner"
                  referrerPolicy="no-referrer"
                  className="h-9 w-24 rounded-lg object-cover sm:h-10 sm:w-28"
                />
              </div>
              <p className="font-handwritten text-2xl font-semibold text-[#18181B] sm:text-3xl">
                let me be your tour guide.
              </p>
            </div>

            <div className="my-8 flex flex-col items-center justify-center text-center">
              <p className="font-handwritten text-2xl font-semibold text-[#2563EB] sm:text-3xl">
                This is
              </p>

              {/* Full unobstructed Canva-style display lettering */}
              <h3 className="mt-1 select-none font-editorial text-4xl font-bold uppercase tracking-tight text-[#EC4899]/80 sm:text-6xl lg:text-7xl leading-none">
                {profile.name}
              </h3>

              <div className="mt-6 max-w-xl">
                <p className="font-editorial text-2xl font-semibold text-[#18181B] sm:text-3xl">
                  {profile.heroHeadline}
                </p>
                <p className="mt-2.5 text-sm text-[#52525B] sm:text-base">
                  {profile.education.degree} · {profile.education.institution} (
                  {profile.education.graduationYear})
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#18181B]/15 pt-4 text-xs font-medium text-[#52525B]">
              <span>{profile.roleTitle}</span>
              <span>By {profile.name} · Slide 01</span>
            </div>
          </div>
        )}

        {/* SLIDE 02: SHOURYA-INSPIRED COLOR-BLOCKED NUMBERED CONTENT INDEX (01-05) */}
        {activeSlide === 1 && (
          <div className="min-h-[460px] bg-white p-6 sm:p-10 lg:min-h-[520px] flex flex-col justify-between">
            <div className="text-center">
              <div className="flex items-center justify-center gap-6 font-mono text-xs font-semibold text-[#D4A373] sm:gap-14">
                {CONTENT_COLUMNS.map((col) => (
                  <span key={col.topNum} className="tabular-nums">
                    {col.topNum}
                  </span>
                ))}
              </div>
              <h3 className="mt-1 font-sans text-4xl font-black tracking-[0.18em] text-[#18181B]/12 sm:text-6xl">
                CONTENT
              </h3>
              <p className="-mt-4 text-xs font-medium text-[#52525B] sm:text-sm">
                Click any numbered pillar below to inspect the project breakdown
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-5">
              {CONTENT_COLUMNS.map((col) => {
                const proj = projects.find((p) => p.id === col.projectId);
                return (
                  <button
                    key={col.num}
                    type="button"
                    onClick={() => openProjectById(col.projectId)}
                    className="group flex flex-col text-left focus:outline-none"
                  >
                    <div
                      className={`relative flex h-56 w-full flex-col justify-between overflow-hidden rounded-xl p-3.5 transition-transform duration-200 group-hover:-translate-y-1 sm:h-64 ${col.bgClass}`}
                    >
                      {proj && (
                        <div className="h-28 w-full overflow-hidden rounded-lg border border-black/15 bg-white shadow-sm">
                          <img
                            src={proj.imageUrl}
                            alt={proj.imageAlt}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className={`h-full w-full transition-transform duration-200 group-hover:scale-105 ${
                              proj.viewGroups?.length ? 'bg-white object-contain p-0.5' : 'object-cover'
                            }`}
                          />
                        </div>
                      )}
                      <span className="font-sans text-6xl font-black leading-none text-white/95 tabular-nums">
                        {col.num}
                      </span>
                    </div>
                    <p className="mt-2.5 text-xs font-bold tracking-wide text-[#18181B] group-hover:text-[#2563EB]">
                      {col.shortLabel}
                    </p>
                    <p className="mt-0.5 text-[11px] leading-snug text-[#52525B]">{col.caption}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* SLIDE 03: HANGING LANYARD PASS + WARM GRID & GINGHAM BIO SPREAD */}
        {activeSlide === 2 && (
          <div className="relative min-h-[460px] p-6 sm:p-10 lg:min-h-[520px] grid grid-cols-1 items-center gap-8 lg:grid-cols-12 overflow-hidden">
            {/* Hanging Lanyard Pass with Wavy Checker Strap Accent */}
            <div className="relative flex flex-col items-center lg:col-span-5">
              <div className="h-8 w-5 overflow-hidden rounded-t-sm border-x-2 border-t-2 border-[#18181B]">
                <img
                  src="/assets/aistudio/iPhone_wallpaper_a21cd8b7.jpg"
                  alt=""
                  aria-hidden="true"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="h-3 w-8 rounded-sm border-2 border-[#18181B] bg-[#D4CEC3]" />
              <div className="w-60 rounded-2xl border-2 border-[#18181B] bg-white p-3.5 shadow-[6px_6px_0px_0px_#18181B]">
                <div className="aspect-[4/5] w-full overflow-hidden rounded-xl border border-[#E6E1D8] bg-[#F7DEC8]">
                  <img
                    src={profile.photoUrl}
                    alt={`${profile.name} studio badge`}
                    referrerPolicy="no-referrer"
                    className="h-full w-full scale-[1.08] object-cover object-[50%_70%]"
                  />
                </div>
                <div className="mt-3 border-t border-[#E6E1D8] pt-2.5 text-center">
                  <p className="font-editorial text-lg font-semibold text-[#18181B]">
                    {profile.name}
                  </p>
                  <p className="text-[11px] font-medium text-[#2563EB]">
                    BCA &apos;{profile.education.graduationYear.slice(-2)} ·{' '}
                    {profile.location.split(',')[0]}
                  </p>
                </div>
              </div>
            </div>

            {/* Editorial Bio & Paper Texture Pin */}
            <div className="space-y-6 lg:col-span-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-handwritten text-2xl font-semibold text-[#2563EB]">
                    Hi, I&apos;m Krishna!
                  </p>
                  <h3 className="mt-1 font-editorial text-2xl font-semibold text-[#18181B] sm:text-3xl">
                    Bridging Technical Execution With Digital Marketing
                  </h3>
                </div>
                <div className="hidden sm:flex shrink-0 items-center gap-2">
                  <img
                    src="/assets/aistudio/download__9__f3b18449.jpg"
                    alt="Warm yellow grid aesthetic card"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-14 w-11 rounded-lg border border-[#18181B]/30 object-cover -rotate-2 shadow-xs"
                  />
                  <img
                    src="/assets/aistudio/download__10__e2db32fa.jpg"
                    alt="Yellow gingham blank notebook with star sticker"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-14 w-11 rounded-lg border border-[#18181B]/30 object-cover rotate-2 shadow-xs"
                  />
                </div>
              </div>

              <p className="text-sm leading-relaxed text-[#52525B] sm:text-base">
                {profile.aboutIntro}
              </p>

              <div className="grid grid-cols-1 gap-5 border-t border-[#18181B]/15 pt-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                    Education
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#18181B]">
                    {profile.education.degree}
                  </p>
                  <p className="text-xs text-[#52525B]">
                    {profile.education.institution} ({profile.education.graduationYear})
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                    Strengths &amp; Languages
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#52525B]">
                    {profile.strengths.slice(0, 4).join(' · ')}
                  </p>
                  <p className="mt-1 text-xs font-medium text-[#18181B]">
                    {profile.languages.join(' · ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 04: NEXTAURA ACADEMIC PROJECT FEATURE + DUAL DESKTOP/MOBILE SCREENS */}
        {activeSlide === 3 && (
          <div className="min-h-[460px] bg-white p-6 sm:p-10 lg:min-h-[520px] grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="relative lg:col-span-6">
              <div className="relative overflow-hidden rounded-xl border border-[#E6E1D8] bg-[#F2EFE9]">
                <img
                  src={nextAura.imageUrl}
                  alt={nextAura.imageAlt}
                  referrerPolicy="no-referrer"
                  className={
                    nextAura.viewGroups?.length
                      ? 'aspect-[16/10] w-full bg-white object-contain p-1.5'
                      : 'aspect-[16/10] w-full object-cover'
                  }
                />
                {nextAura.secondaryImageUrl && (
                  <div className="absolute right-3 bottom-3 w-[24%] min-w-[74px] max-w-[96px] overflow-hidden rounded-xl border-2 border-[#18181B] bg-white shadow-lg">
                    <img
                      src={nextAura.secondaryImageUrl}
                      alt={nextAura.secondaryImageAlt || `${nextAura.title} preview`}
                      referrerPolicy="no-referrer"
                      className="aspect-[3/4] w-full object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="mt-3 flex items-center gap-3 rounded-xl border border-[#E6E1D8] bg-[#FAF8F5] p-2.5">
                <img
                  src="/assets/aistudio/sticker__photography__instagram__style__mood__sticker_store__minimalistic__fashion__story__brand_e3f633b5.jpg"
                  alt="Minimalist illustration of hands typing on a laptop"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-12 w-16 rounded-lg object-cover border border-[#E6E1D8]"
                />
                <p className="font-handwritten text-lg font-semibold text-[#18181B]">
                  MERN storefront, Razorpay test checkout &amp; admin panel
                </p>
              </div>
            </div>

            <div className="space-y-4 lg:col-span-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB]">
                Academic Project · MERN Stack
              </p>
              <h3 className="font-editorial text-2xl font-semibold text-[#18181B] sm:text-3xl">
                {nextAura.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#52525B]">{nextAura.overview}</p>
              <ul className="space-y-1.5 text-xs text-[#18181B] sm:text-sm">
                {nextAura.contribution.slice(0, 4).map((point, idx) => (
                  <li key={idx}>• {point}</li>
                ))}
              </ul>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onSelectProject(nextAura)}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#18181B] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#27272A]"
                >
                  <span>Inspect Full Case Study</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 05: STACEY-STYLE SKILLS & WORKS COLLAGE */}
        {activeSlide === 4 && (
          <div className="min-h-[460px] p-6 sm:p-10 lg:min-h-[520px] grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-handwritten text-2xl font-semibold text-[#EC4899]">
                    what&apos;s in my toolkit
                  </p>
                  <h3 className="mt-1 font-editorial text-4xl font-bold text-[#18181B] sm:text-5xl">
                    Skills &amp; <span className="italic text-[#2563EB]">Works</span>
                  </h3>
                </div>
                <img
                  src="/assets/aistudio/download__11__b1aa9aaa.jpg"
                  alt="Don't overthink it illustration poster"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="hidden sm:block h-16 w-12 rounded-lg border border-[#18181B]/30 object-cover rotate-3 shadow-xs"
                />
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#52525B]">
                Every board in this portfolio applies my real resume toolkit across social storytelling,
                search strategy, AI prompting, and full-stack web builds.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 border-t border-[#18181B]/15 pt-4 text-sm font-medium text-[#18181B]">
                {profile.technicalSkills.map((skill) => (
                  <div key={skill} className="truncate">
                    · {skill}
                  </div>
                ))}
              </div>

              {/* Mini Personal Vibes Strip */}
              <div className="mt-5 flex items-center gap-3">
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-11-18_at_3.03.55_PM_50a6dc2c.jpeg"
                  alt="Cap embroidered with CEO of overthinking"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-12 w-12 rounded-lg border border-[#18181B]/25 object-cover -rotate-2"
                />
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-11-18_at_3.03.54_PM__1__bf0c2a97.jpeg"
                  alt="Tote bag reading PhD Permanent head damage"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-12 w-12 rounded-lg border border-[#18181B]/25 object-cover rotate-2"
                />
                <span className="font-handwritten text-lg font-semibold text-[#52525B]">
                  personality-first marketing
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:col-span-6">
              {projects.slice(1, 5).map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectProject(item)}
                  className={`group overflow-hidden rounded-xl border border-[#18181B]/20 bg-white p-2.5 text-left shadow-xs transition-transform hover:-translate-y-1 ${
                    idx % 2 === 0 ? '-rotate-1' : 'rotate-1'
                  }`}
                >
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#F2EFE9]">
                    <img
                      src={item.imageUrl}
                      alt={item.imageAlt}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="mt-2 truncate text-xs font-semibold text-[#18181B] group-hover:text-[#2563EB]">
                    {item.title}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SLIDE 06: "AND THAT'S A WRAP" ENVELOPE SPREAD + CANDID DENIM PHOTO */}
        {activeSlide === 5 && (
          <div className="min-h-[460px] p-6 sm:p-10 lg:min-h-[520px] flex flex-col justify-between">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 my-auto">
              <div className="space-y-4 lg:col-span-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB]">
                  Ready to Collaborate
                </p>
                <h3 className="font-editorial text-4xl font-bold leading-tight text-[#18181B] sm:text-5xl">
                  and that&apos;s <span className="italic text-[#EC4899]">a wrap.</span>
                </h3>
                <p className="text-sm leading-relaxed text-[#52525B]">
                  Thank you for flipping through my portfolio deck. I&apos;m actively seeking a
                  Digital Marketing Internship or Fresher Digital Marketing role.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1D4ED8]"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    <span>Message Me</span>
                  </a>
                  <a
                    href={profile.resumePdfUrl}
                    download="Krishna_Ladva_Resume.pdf"
                    className="inline-flex items-center gap-2 rounded-lg border border-[#18181B] bg-white px-4 py-2.5 text-sm font-medium text-[#18181B] hover:bg-[#F2EFE9]"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    <span>Resume PDF</span>
                  </a>
                </div>
              </div>

              {/* Pastel Envelope Note Card + Tilted Candid Cafe Photo */}
              <div className="lg:col-span-7 flex flex-col sm:flex-row items-center justify-center gap-5">
                <div className="w-40 shrink-0 rotate-2 rounded-2xl border-2 border-[#18181B] bg-white p-2 shadow-[5px_5px_0px_0px_#E6E1D8]">
                  <div className="aspect-[3/4] overflow-hidden rounded-xl bg-[#F2EFE9]">
                    <img
                      src="/assets/aistudio/WhatsApp_Image_2026-11-18_at_3.03.54_PM_dac850bf.jpeg"
                      alt="Krishna smiling in denim jacket at cafe"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="mt-1.5 text-center font-handwritten text-base font-semibold text-[#18181B]">
                    see you soon!
                  </p>
                </div>

                <div className="relative max-w-sm rounded-2xl border-2 border-[#18181B] bg-[#FBCFE8]/55 p-5 shadow-[8px_8px_0px_0px_#18181B]">
                  <div className="rounded-xl border border-[#18181B]/20 bg-white p-5 -rotate-1 shadow-xs">
                    <p className="font-handwritten text-2xl leading-snug text-[#18181B]">
                      Thank you so much for taking the time to look through my portfolio! I always
                      appreciate new opportunities to learn, create, and grow in digital marketing.
                    </p>
                    <div className="mt-4 border-t border-[#E6E1D8] pt-3 text-xs text-[#52525B]">
                      <p className="font-semibold text-[#18181B]">{profile.email}</p>
                      <p className="tabular-nums">{profile.phone} · {profile.location}</p>
                      {profile.linkedinUrl.trim() && (
                        <a
                          href={profile.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-block font-semibold text-[#2563EB] hover:underline"
                        >
                          {profile.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Canva Bottom Slide Tray */}
      <div
        role="tablist"
        aria-label="Carousel slide selector"
        className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3"
      >
        {SLIDE_META.map((slide, idx) => {
          const isActive = activeSlide === idx;
          return (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveSlide(idx)}
              className={`rounded-xl border p-2.5 text-left transition-all duration-150 ${
                isActive
                  ? 'border-[#2563EB] bg-white shadow-xs ring-1 ring-[#2563EB]'
                  : 'border-[#E6E1D8] bg-[#F2EFE9]/70 hover:border-[#18181B]/40 hover:bg-white'
              }`}
            >
              <span className="block font-mono text-[11px] font-semibold text-[#2563EB] tabular-nums">
                {slide.number}
              </span>
              <span className="mt-0.5 block truncate text-xs font-medium text-[#18181B]">
                {slide.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
