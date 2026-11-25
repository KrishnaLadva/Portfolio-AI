import { useState } from 'react';
import { Check, Pencil, RotateCcw, X } from 'lucide-react';
import type { ProfileData } from '../types/portfolio';

interface AboutSectionProps {
  profile: ProfileData;
  onUpdateProfile: (next: ProfileData) => void;
  onResetProfile: () => void;
}

export default function AboutSection({
  profile,
  onUpdateProfile,
  onResetProfile,
}: AboutSectionProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<ProfileData>(profile);
  const [skillsInput, setSkillsInput] = useState(profile.technicalSkills.join(', '));
  const [savedFeedback, setSavedFeedback] = useState(false);

  function startEditing() {
    setDraft(profile);
    setSkillsInput(profile.technicalSkills.join(', '));
    setEditing(true);
    setSavedFeedback(false);
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const parsedSkills = skillsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    onUpdateProfile({
      ...draft,
      technicalSkills: parsedSkills.length > 0 ? parsedSkills : profile.technicalSkills,
    });
    setEditing(false);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 3000);
  }

  function handleReset() {
    onResetProfile();
    setEditing(false);
    setSavedFeedback(false);
  }

  return (
    <section id="about" className="scroll-mt-24 border-y border-[#E6E1D8] bg-[#F2EFE9]/60 py-16">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#2563EB]">About Me</p>
            <h2 className="mt-2 font-editorial text-3xl font-semibold tracking-tight text-[#18181B] sm:text-4xl">
              Grounded in Code, Driven by Digital Storytelling
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {savedFeedback && (
              <span role="status" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#15803D]">
                <Check className="h-4 w-4" aria-hidden="true" />
                <span>Profile updated</span>
              </span>
            )}
            {!editing && (
              <button
                type="button"
                onClick={startEditing}
                className="inline-flex items-center gap-2 rounded-lg border border-[#D4CEC3] bg-white px-4 py-2 text-sm font-medium text-[#18181B] transition-colors hover:border-[#18181B]"
              >
                <Pencil className="h-4 w-4" aria-hidden="true" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        {!editing ? (
          <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
            {/* Hanging Studio Lanyard ID Pass Column */}
            <div className="flex flex-col items-center lg:col-span-4">
              <div className="h-10 w-5 rounded-t-sm border-x-2 border-t-2 border-[#18181B] bg-[#2563EB]" />
              <div className="h-3.5 w-10 rounded-sm border-2 border-[#18181B] bg-[#D4CEC3]" />
              <div className="w-full max-w-[300px] -rotate-1 rounded-2xl border-2 border-[#18181B] bg-white p-4 shadow-[8px_8px_0px_0px_#E6E1D8]">
                <div className="overflow-hidden rounded-xl border border-[#E6E1D8] bg-[#F7DEC8] aspect-[4/5]">
                  <img
                    src={profile.photoUrl}
                    alt={`${profile.name} portrait`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-full w-full scale-[1.08] object-cover object-[50%_68%]"
                  />
                </div>
                <div className="mt-3.5 flex items-center justify-between border-t border-[#E6E1D8] pt-3">
                  <div>
                    <p className="font-editorial text-base font-semibold text-[#18181B]">
                      {profile.name}
                    </p>
                    <p className="text-[11px] font-medium text-[#52525B]">
                      BCA &apos;{profile.education.graduationYear.slice(-2)} ·{' '}
                      {profile.location.split(',')[0]}
                    </p>
                  </div>
                  <span className="font-mono text-[11px] font-semibold text-[#2563EB]">
                    ID-2026
                  </span>
                </div>
              </div>
            </div>

            {/* Bio & Resume Facts Column */}
            <div className="space-y-8 lg:col-span-8">
              <div>
                <p className="text-base leading-relaxed text-[#18181B] sm:text-lg">
                  {profile.aboutIntro}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 border-t border-[#E6E1D8] pt-6 sm:grid-cols-2">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                    Education
                  </h3>
                  <p className="mt-2 text-base font-semibold text-[#18181B]">
                    {profile.education.degree}
                  </p>
                  <p className="mt-1 text-sm text-[#52525B]">
                    {profile.education.institution} <span aria-hidden="true">·</span> Class of{' '}
                    {profile.education.graduationYear}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                    Focus &amp; Interests
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#18181B]">
                    {profile.interests.join(' · ')}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 border-t border-[#E6E1D8] pt-6 sm:grid-cols-2">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                    Personal Strengths
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#52525B]">
                    {profile.strengths.join(' · ')}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                    Languages Spoken
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#52525B]">
                    {profile.languages.join(' · ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Inline Editable Profile Form */
          <form
            onSubmit={handleSave}
            className="mt-8 rounded-2xl border border-[#E6E1D8] bg-white p-6 sm:p-8"
          >
            <div className="flex items-center justify-between border-b border-[#E6E1D8] pb-4">
              <h3 className="font-editorial text-xl font-semibold text-[#18181B]">
                Edit Profile Information
              </h3>
              <button
                type="button"
                onClick={() => setEditing(false)}
                aria-label="Cancel profile editing"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#71717A] hover:bg-[#F2EFE9] hover:text-[#18181B]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="edit-name" className="block text-xs font-semibold text-[#52525B]">
                  Full Name
                </label>
                <input
                  id="edit-name"
                  type="text"
                  required
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-[#D4CEC3] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#18181B]"
                />
              </div>
              <div>
                <label htmlFor="edit-role" className="block text-xs font-semibold text-[#52525B]">
                  Role Title
                </label>
                <input
                  id="edit-role"
                  type="text"
                  required
                  value={draft.roleTitle}
                  onChange={(e) => setDraft({ ...draft, roleTitle: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-[#D4CEC3] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#18181B]"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="edit-headline" className="block text-xs font-semibold text-[#52525B]">
                  Hero Headline
                </label>
                <input
                  id="edit-headline"
                  type="text"
                  required
                  value={draft.heroHeadline}
                  onChange={(e) => setDraft({ ...draft, heroHeadline: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-[#D4CEC3] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#18181B]"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="edit-hero-intro" className="block text-xs font-semibold text-[#52525B]">
                  Hero Introduction
                </label>
                <textarea
                  id="edit-hero-intro"
                  rows={2}
                  required
                  value={draft.heroIntro}
                  onChange={(e) => setDraft({ ...draft, heroIntro: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-[#D4CEC3] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#18181B]"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="edit-about-intro" className="block text-xs font-semibold text-[#52525B]">
                  About Me Summary
                </label>
                <textarea
                  id="edit-about-intro"
                  rows={3}
                  required
                  value={draft.aboutIntro}
                  onChange={(e) => setDraft({ ...draft, aboutIntro: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-[#D4CEC3] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#18181B]"
                />
              </div>
              <div>
                <label htmlFor="edit-email" className="block text-xs font-semibold text-[#52525B]">
                  Email Address
                </label>
                <input
                  id="edit-email"
                  type="email"
                  required
                  value={draft.email}
                  onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-[#D4CEC3] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#18181B]"
                />
              </div>
              <div>
                <label htmlFor="edit-phone" className="block text-xs font-semibold text-[#52525B]">
                  Phone Number
                </label>
                <input
                  id="edit-phone"
                  type="text"
                  value={draft.phone}
                  onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-[#D4CEC3] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#18181B]"
                />
              </div>
              <div>
                <label htmlFor="edit-location" className="block text-xs font-semibold text-[#52525B]">
                  Location
                </label>
                <input
                  id="edit-location"
                  type="text"
                  value={draft.location}
                  onChange={(e) => setDraft({ ...draft, location: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-[#D4CEC3] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#18181B]"
                />
              </div>
              <div>
                <label htmlFor="edit-linkedin" className="block text-xs font-semibold text-[#52525B]">
                  Exact LinkedIn Profile URL
                </label>
                <input
                  id="edit-linkedin"
                  type="url"
                  value={draft.linkedinUrl}
                  onChange={(e) => setDraft({ ...draft, linkedinUrl: e.target.value })}
                  placeholder="https://www.linkedin.com/in/your-exact-profile"
                  className="mt-1.5 w-full rounded-lg border border-[#D4CEC3] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#18181B]"
                />
              </div>
              <div>
                <label htmlFor="edit-nextaura-demo" className="block text-xs font-semibold text-[#52525B]">
                  NextAura Live Demo URL
                </label>
                <input
                  id="edit-nextaura-demo"
                  type="url"
                  value={draft.nextAuraLiveDemoUrl}
                  onChange={(e) => setDraft({ ...draft, nextAuraLiveDemoUrl: e.target.value })}
                  placeholder="https://nextaura-demo.vercel.app"
                  className="mt-1.5 w-full rounded-lg border border-[#D4CEC3] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#18181B]"
                />
              </div>
              <div>
                <label htmlFor="edit-nextaura-github" className="block text-xs font-semibold text-[#52525B]">
                  NextAura GitHub Repo URL
                </label>
                <input
                  id="edit-nextaura-github"
                  type="url"
                  value={draft.nextAuraGithubUrl}
                  onChange={(e) => setDraft({ ...draft, nextAuraGithubUrl: e.target.value })}
                  placeholder="https://github.com/username/nextaura"
                  className="mt-1.5 w-full rounded-lg border border-[#D4CEC3] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#18181B]"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="edit-skills" className="block text-xs font-semibold text-[#52525B]">
                  Technical Skills (comma-separated)
                </label>
                <input
                  id="edit-skills"
                  type="text"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-[#D4CEC3] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#18181B]"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#E6E1D8] pt-5">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#52525B] hover:bg-[#F2EFE9] hover:text-[#18181B]"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                <span>Reset to Resume Defaults</span>
              </button>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="rounded-lg border border-[#D4CEC3] bg-white px-4 py-2 text-sm font-medium text-[#18181B] hover:bg-[#F2EFE9]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#2563EB] px-5 py-2 text-sm font-medium text-white hover:bg-[#1D4ED8]"
                >
                  Save Profile
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
