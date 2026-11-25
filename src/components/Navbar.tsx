import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  brandName: string;
  isArticleView?: boolean;
  onNavigateSection?: (href: string) => void;
}

const NAV_LINKS = [
  { label: 'Slides', href: '#carousel-deck' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Blog', href: '#blog' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Resume', href: '#resume' },
];

export default function Navbar({
  brandName,
  isArticleView = false,
  onNavigateSection,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleLinkClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    setMobileMenuOpen(false);
    if (onNavigateSection) {
      e.preventDefault();
      onNavigateSection(href);
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[#E6E1D8] bg-[#FAF8F5]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#top"
          onClick={(e) => handleLinkClick(e, '#top')}
          className="font-editorial text-xl font-semibold tracking-tight text-[#18181B] whitespace-nowrap shrink-0"
        >
          {brandName}
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const isBlogActive = isArticleView && link.href === '#blog';
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                aria-current={isBlogActive ? 'page' : undefined}
                className={`text-sm font-medium transition-colors duration-150 hover:text-[#18181B] hover:underline hover:underline-offset-4 whitespace-nowrap shrink-0 ${
                  isBlogActive
                    ? 'text-[#2563EB] underline underline-offset-4'
                    : 'text-[#52525B]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#2563EB] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#1D4ED8] whitespace-nowrap shrink-0"
          >
            Let&apos;s Connect
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#E6E1D8] bg-white text-[#18181B] md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-[#E6E1D8] bg-[#FAF8F5] px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => {
              const isBlogActive = isArticleView && link.href === '#blog';
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  aria-current={isBlogActive ? 'page' : undefined}
                  className={`py-1.5 text-base font-medium hover:text-[#2563EB] ${
                    isBlogActive ? 'text-[#2563EB]' : 'text-[#18181B]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="mt-1 inline-flex items-center justify-center rounded-lg bg-[#2563EB] px-4 py-2.5 text-sm font-medium text-white"
            >
              Let&apos;s Connect
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
