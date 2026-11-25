import { useEffect, useRef, useState } from 'react';
import { DEFAULT_PROFILE, PORTFOLIO_PROJECTS } from './data/portfolioData';
import { BLOG_ARTICLES } from './data/blogData';
import type { PortfolioProject, ProfileData } from './types/portfolio';
import {
  buildBlogArticleHash,
  findArticleBySlug,
  parseBlogSlugFromHash,
} from './utils/blogLogic';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CanvaCarouselSection from './components/CanvaCarouselSection';
import PortfolioBoard from './components/PortfolioBoard';
import MoodboardStrip from './components/MoodboardStrip';
import ProjectDetailModal from './components/ProjectDetailModal';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import AICreativeLab from './components/AICreativeLab';
import BlogSection from './components/BlogSection';
import BlogArticleView from './components/BlogArticleView';
import ResumeSection from './components/ResumeSection';
import ContactSection from './components/ContactSection';
import AIAssistantDrawer from './components/AIAssistantDrawer';

const PROFILE_STORAGE_KEY = 'krishna_ladva_profile_v2';

export default function App() {
  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<ProfileData>;
        return {
          ...DEFAULT_PROFILE,
          ...parsed,
          linkedinUrl: parsed.linkedinUrl?.trim() ? parsed.linkedinUrl : DEFAULT_PROFILE.linkedinUrl,
        };
      }
    } catch {
      // Fallback to default resume profile
    }
    return DEFAULT_PROFILE;
  });

  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [activeArticleSlug, setActiveArticleSlug] = useState<string | null>(() => {
    const slug = parseBlogSlugFromHash(window.location.hash);
    return findArticleBySlug(BLOG_ARTICLES, slug) ? slug : null;
  });
  const pendingScrollIdRef = useRef<string | null>(null);

  const activeArticle = findArticleBySlug(BLOG_ARTICLES, activeArticleSlug);

  useEffect(() => {
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // Ignore storage quota issues
    }
  }, [profile]);

  useEffect(() => {
    function handleHashChange() {
      const hash = window.location.hash;
      const slug = parseBlogSlugFromHash(hash);
      const matched = findArticleBySlug(BLOG_ARTICLES, slug);
      if (matched) {
        setActiveArticleSlug(matched.slug);
        window.scrollTo({ top: 0, behavior: 'auto' });
      } else {
        const targetId = hash.replace(/^#/, '');
        if (targetId) {
          pendingScrollIdRef.current = targetId;
        }
        setActiveArticleSlug(null);
      }
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (!activeArticle && pendingScrollIdRef.current) {
      const targetId = pendingScrollIdRef.current;
      pendingScrollIdRef.current = null;
      window.requestAnimationFrame(() => {
        if (targetId === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }, [activeArticle]);

  function handleOpenArticle(slug: string) {
    const targetHash = buildBlogArticleHash(slug);
    setActiveArticleSlug(slug);
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleNavigateSection(href: string) {
    const targetId = href.replace(/^#/, '');
    if (activeArticle) {
      pendingScrollIdRef.current = targetId;
      setActiveArticleSlug(null);
      window.location.hash = href;
      return;
    }
    if (window.location.hash !== href) {
      window.location.hash = href;
    }
    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function handleResetProfile() {
    setProfile(DEFAULT_PROFILE);
    try {
      localStorage.removeItem(PROFILE_STORAGE_KEY);
    } catch {
      // Ignore
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#18181B]">
      <Navbar
        brandName={profile.name}
        isArticleView={Boolean(activeArticle)}
        onNavigateSection={handleNavigateSection}
      />

      <main>
        {activeArticle ? (
          <BlogArticleView
            article={activeArticle}
            onBackToBlog={() => handleNavigateSection('#blog')}
          />
        ) : (
          <>
            <HeroSection
              profile={profile}
              onOpenAssistant={() => setAssistantOpen(true)}
            />

            <CanvaCarouselSection
              profile={profile}
              projects={PORTFOLIO_PROJECTS}
              onSelectProject={(project) => setSelectedProject(project)}
            />

            <PortfolioBoard
              projects={PORTFOLIO_PROJECTS}
              onSelectProject={(project) => setSelectedProject(project)}
            />

            <MoodboardStrip />

            <AboutSection
              profile={profile}
              onUpdateProfile={setProfile}
              onResetProfile={handleResetProfile}
            />

            <SkillsSection profile={profile} />

            <AICreativeLab
              profile={profile}
              projects={PORTFOLIO_PROJECTS}
              onSelectProject={(project) => setSelectedProject(project)}
            />

            <BlogSection
              articles={BLOG_ARTICLES}
              onOpenArticle={handleOpenArticle}
            />

            <ResumeSection profile={profile} />

            <ContactSection profile={profile} />
          </>
        )}
      </main>

      <footer className="border-t border-[#E6E1D8] bg-[#FAF8F5] py-8">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-4 px-4 text-xs text-[#71717A] sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {profile.name} · {profile.location}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                handleNavigateSection('#portfolio');
              }}
              className="hover:text-[#18181B]"
            >
              Portfolio
            </a>
            <a
              href="#blog"
              onClick={(e) => {
                e.preventDefault();
                handleNavigateSection('#blog');
              }}
              className="hover:text-[#18181B]"
            >
              Blog
            </a>
            <a
              href="#resume"
              onClick={(e) => {
                e.preventDefault();
                handleNavigateSection('#resume');
              }}
              className="hover:text-[#18181B]"
            >
              Resume
            </a>
            <a href={`mailto:${profile.email}`} className="hover:text-[#18181B]">
              {profile.email}
            </a>
            {profile.linkedinUrl.trim() && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#18181B]"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </footer>

      <ProjectDetailModal
        project={selectedProject}
        allProjects={PORTFOLIO_PROJECTS}
        profile={profile}
        onUpdateProfile={setProfile}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(project) => setSelectedProject(project)}
      />

      <AIAssistantDrawer
        open={assistantOpen}
        onOpenChange={setAssistantOpen}
        profile={profile}
        projects={PORTFOLIO_PROJECTS}
      />
    </div>
  );
}
