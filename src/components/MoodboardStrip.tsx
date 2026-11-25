import { MOODBOARD_PINS } from '../data/portfolioData';

export default function MoodboardStrip() {
  return (
    <section
      id="moodboard"
      className="scroll-mt-24 border-y border-[#E6E1D8] bg-[#F5F0E6] py-16"
      style={{
        backgroundImage: 'radial-gradient(#D4CEC3 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-handwritten text-2xl font-semibold text-[#2563EB]">
              the pinterest moodboard behind my work
            </p>
            <h2 className="mt-1 font-editorial text-3xl font-semibold tracking-tight text-[#18181B] sm:text-4xl">
              Visual Diary, Stickers &amp; Creative Aesthetics
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[#52525B] sm:text-base">
              A tactile scrapbook of candid moments, typography prints, chai stories, and workspace
              inspiration that shape my social media taste.
            </p>
          </div>
          <p className="font-handwritten text-xl font-semibold text-[#52525B]">
            17 curated pins · warm &amp; playful
          </p>
        </div>

        {/* Playful Pinterest Polaroid / Sticker Masonry Collage */}
        <div className="mt-10 columns-2 gap-5 space-y-5 sm:columns-3 lg:columns-4">
          {MOODBOARD_PINS.map((pin) => (
            <figure
              key={pin.id}
              className={`break-inside-avoid rounded-2xl border-2 border-[#18181B] bg-white p-2.5 shadow-[5px_5px_0px_0px_#E6E1D8] transition-transform duration-200 hover:rotate-0 hover:-translate-y-1 ${pin.tiltClass}`}
            >
              <div className={`w-full overflow-hidden rounded-xl bg-[#F2EFE9] ${pin.aspectClass}`}>
                <img
                  src={pin.imageUrl}
                  alt={pin.caption}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className={`h-full w-full object-cover ${pin.imageClassName ?? ''}`}
                />
              </div>
              <figcaption className="mt-2.5 flex items-baseline justify-between gap-2 px-1 pb-0.5">
                <span className="font-handwritten text-lg font-semibold leading-tight text-[#18181B]">
                  {pin.caption}
                </span>
                <span className="shrink-0 text-[11px] font-medium text-[#71717A]">{pin.tag}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
