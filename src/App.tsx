import { useEffect, useState } from 'react';
import { DEFAULT_PROFILE, PORTFOLIO_PROJECTS } from './data/portfolioData';
import type { PortfolioProject, ProfileData } from './types/portfolio';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CanvaCarouselSection from './components/CanvaCarouselSection';
import PortfolioBoard from './components/PortfolioBoard';
import MoodboardStrip from './components/MoodboardStrip';
import ProjectDetailModal from './components/ProjectDetailModal';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import AICreativeLab from './components/AICreativeLab';
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

  useEffect(() => {
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // Ignore storage quota issues
    }
  }, [profile]);

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
      <Navbar brandName={profile.name} />

      <main>
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

        <ResumeSection profile={profile} />

        <ContactSection profile={profile} />
      </main>

      <footer className="border-t border-[#E6E1D8] bg-[#FAF8F5] py-8">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-4 px-4 text-xs text-[#71717A] sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {profile.name} · {profile.location}
          </p>
          <div className="flex items-center gap-5">
            <a href="#portfolio" className="hover:text-[#18181B]">
              Portfolio
            </a>
            <a href="#resume" className="hover:text-[#18181B]">
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
