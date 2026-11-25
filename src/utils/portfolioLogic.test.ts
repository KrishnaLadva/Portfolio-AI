import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_PROFILE, PORTFOLIO_PROJECTS } from '../data/portfolioData';
import {
  buildPortfolioContextPrompt,
  filterAndRankProjects,
  getSmartRecommendations,
  hasValidationErrors,
  validateContactForm,
  wrapSlideIndex,
} from './portfolioLogic';

test('wrapSlideIndex cycles cleanly across positive and negative bounds', () => {
  assert.equal(wrapSlideIndex(0, 6), 0);
  assert.equal(wrapSlideIndex(6, 6), 0);
  assert.equal(wrapSlideIndex(-1, 6), 5);
  assert.equal(wrapSlideIndex(7, 6), 1);
  assert.equal(wrapSlideIndex(2, 0), 0);
});

test('filterAndRankProjects filters by category and search terms accurately', () => {
  const all = filterAndRankProjects(PORTFOLIO_PROJECTS, 'All', '');
  assert.equal(all.length, PORTFOLIO_PROJECTS.length);

  const webOnly = filterAndRankProjects(PORTFOLIO_PROJECTS, 'Website Designs', '');
  assert.equal(webOnly.length, 1);
  assert.equal(webOnly[0].id, 'nextaura-ecommerce');

  const mernSearch = filterAndRankProjects(PORTFOLIO_PROJECTS, 'All', 'razorpay mern');
  assert.ok(mernSearch.length >= 1);
  assert.equal(mernSearch[0].id, 'nextaura-ecommerce');

  const emptySearch = filterAndRankProjects(PORTFOLIO_PROJECTS, 'All', 'xyznonexistentterm');
  assert.equal(emptySearch.length, 0);
});

test('getSmartRecommendations excludes the active project and returns relevant neighbors', () => {
  const nextAura = PORTFOLIO_PROJECTS.find((p) => p.id === 'nextaura-ecommerce');
  assert.ok(nextAura);

  const recs = getSmartRecommendations(nextAura, PORTFOLIO_PROJECTS, 3);
  assert.equal(recs.length, 3);
  assert.ok(recs.every((r) => r.id !== nextAura.id));
});

test('validateContactForm catches empty and invalid fields and accepts valid input', () => {
  const emptyErrors = validateContactForm({
    name: '',
    email: 'invalid-email',
    collaborationType: '',
    message: 'hi',
  });
  assert.equal(hasValidationErrors(emptyErrors), true);
  assert.ok(emptyErrors.name);
  assert.ok(emptyErrors.email);
  assert.ok(emptyErrors.collaborationType);
  assert.ok(emptyErrors.message);

  const validErrors = validateContactForm({
    name: 'Aarav Mehta',
    email: 'aarav@example.com',
    collaborationType: 'Digital Marketing Internship',
    message: 'We would love to invite Krishna for an internship interview.',
  });
  assert.equal(hasValidationErrors(validErrors), false);
});

test('buildPortfolioContextPrompt includes factual resume details and strict grounding rules', () => {
  const prompt = buildPortfolioContextPrompt(DEFAULT_PROFILE, PORTFOLIO_PROJECTS);
  assert.ok(prompt.includes('Swaminarayan University'));
  assert.ok(prompt.includes('NextAura'));
  assert.ok(prompt.includes('NEVER invent'));
  assert.ok(prompt.includes('Academic Build'));
  assert.equal(
    DEFAULT_PROFILE.heroHeadline,
    'Creative content. Thoughtful marketing. Built for the web.',
  );
  assert.equal(
    DEFAULT_PROFILE.roleTitle,
    'Digital Marketing Intern · BCA Graduate · Ahmedabad',
  );
  assert.equal(DEFAULT_PROFILE.aboutIntro.includes('student graduating'), false);
  assert.equal(DEFAULT_PROFILE.linkedinUrl, 'https://www.linkedin.com/in/krishnaladva09');
  assert.ok(prompt.includes('https://www.linkedin.com/in/krishnaladva09'));
});

test('NextAura case study includes all 16 real local views ordered 01 through 16', () => {
  const nextAura = PORTFOLIO_PROJECTS.find((p) => p.id === 'nextaura-ecommerce');
  assert.ok(nextAura?.views);
  assert.equal(nextAura.views.length, 16);
  assert.deepEqual(
    nextAura.views.map((v) => v.number),
    ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16'],
  );
  assert.equal(nextAura.views[0].title, 'Account Access');
  assert.equal(nextAura.views[15].title, 'Architecture');
  assert.ok(nextAura.views.every((v) => v.imageUrl.startsWith('/assets/aistudio/')));
});
