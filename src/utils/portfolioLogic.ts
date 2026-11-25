import type {
  ContactFormErrors,
  ContactFormValues,
  PortfolioProject,
  ProfileData,
  ProjectCategory,
} from '../types/portfolio';

export function filterAndRankProjects(
  projects: PortfolioProject[],
  category: ProjectCategory,
  searchQuery: string,
  aiRankedIds?: string[] | null,
): PortfolioProject[] {
  const categoryFiltered =
    category === 'All' ? projects : projects.filter((project) => project.category === category);

  const trimmed = searchQuery.trim().toLowerCase();
  if (!trimmed) {
    return categoryFiltered;
  }

  const terms = trimmed.split(/\s+/).filter(Boolean);

  const scored = categoryFiltered
    .map((project) => {
      const haystack = [
        project.title,
        project.category,
        project.nature,
        project.shortDescription,
        project.overview,
        project.creativeConcept,
        ...project.toolsUsed,
        ...project.tags,
      ]
        .join(' ')
        .toLowerCase();

      let score = 0;
      for (const term of terms) {
        if (project.title.toLowerCase().includes(term)) score += 5;
        if (project.category.toLowerCase().includes(term)) score += 4;
        if (project.toolsUsed.some((t) => t.toLowerCase().includes(term))) score += 4;
        if (project.tags.some((t) => t.toLowerCase().includes(term))) score += 3;
        if (haystack.includes(term)) score += 1;
      }

      if (aiRankedIds && aiRankedIds.includes(project.id)) {
        const idx = aiRankedIds.indexOf(project.id);
        score += Math.max(1, 20 - idx * 3);
      }

      return { project, score };
    })
    .filter((entry) => entry.score > 0);

  scored.sort((a, b) => b.score - a.score);
  return scored.map((entry) => entry.project);
}

export function getSmartRecommendations(
  activeProject: PortfolioProject,
  allProjects: PortfolioProject[],
  limit = 3,
): PortfolioProject[] {
  const candidates = allProjects.filter((p) => p.id !== activeProject.id);
  const activeTools = new Set(activeProject.toolsUsed.map((t) => t.toLowerCase()));
  const activeTags = new Set(activeProject.tags.map((t) => t.toLowerCase()));

  const scored = candidates.map((candidate) => {
    let relevance = 0;
    for (const tool of candidate.toolsUsed) {
      if (activeTools.has(tool.toLowerCase())) relevance += 3;
    }
    for (const tag of candidate.tags) {
      if (activeTags.has(tag.toLowerCase())) relevance += 2;
    }
    if (candidate.nature === 'Academic Project') {
      relevance += 1;
    }
    return { candidate, relevance };
  });

  scored.sort((a, b) => b.relevance - a.relevance);
  return scored.slice(0, limit).map((item) => item.candidate);
}

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const collaborationType = values.collaborationType.trim();
  const message = values.message.trim();

  if (!name) {
    errors.name = 'Please enter your name.';
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!collaborationType) {
    errors.collaborationType = 'Please choose a collaboration topic.';
  }

  if (!message) {
    errors.message = 'Please share a brief message.';
  } else if (message.length < 10) {
    errors.message = 'Message should be at least 10 characters.';
  }

  return errors;
}

export function hasValidationErrors(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function buildPortfolioContextPrompt(
  profile: ProfileData,
  projects: PortfolioProject[],
): string {
  const projectLines = projects
    .map(
      (p) =>
        `- [${p.id}] "${p.title}" (${p.category} · ${p.proofStatus}): ${p.shortDescription} Tools: ${p.toolsUsed.join(', ')}. Deliverables: ${p.deliverables.join('; ')}. Outcome: ${p.finalOutcome}`,
    )
    .join('\n');

  return `You are the interactive AI Portfolio Assistant for ${profile.name}.
Answer questions from recruiters, hiring managers, and visitors clearly, warmly, and concisely.

STRICT FACTUALITY RULES:
1. Only state facts present in the profile and portfolio items below.
2. NEVER invent past employers, internships, client names, certifications, awards, or numerical campaign metrics (no fabricated ROAS, CTR, traffic percentages, or revenue figures).
3. Distinguish clearly between her real Academic Project (NextAura) and her Concept Studies / Self-Initiated Boards.
4. If asked about something not in her resume/portfolio, honestly state that it is not listed in her current profile and offer what she does have experience in.

PROFILE DATA:
- Name: ${profile.name}
- Role Focus: ${profile.roleTitle}
- Location: ${profile.location}
- Email: ${profile.email}
- Phone: ${profile.phone}${profile.linkedinUrl.trim() ? `\n- LinkedIn: ${profile.linkedinUrl}` : ''}
- Education: ${profile.education.degree} at ${profile.education.institution} (Year of Graduation: ${profile.education.graduationYear})
- Bio: ${profile.aboutIntro}
- Interests: ${profile.interests.join(', ')}
- Technical Skills: ${profile.technicalSkills.join(', ')}
- Strengths: ${profile.strengths.join(', ')}
- Languages: ${profile.languages.join(', ')}

PORTFOLIO BOARDS & PROJECTS:
${projectLines}`;
}

export function wrapSlideIndex(index: number, total: number): number {
  if (total <= 0) return 0;
  return ((index % total) + total) % total;
}
