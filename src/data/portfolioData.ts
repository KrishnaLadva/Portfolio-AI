import type {
  AILabWorkflow,
  PortfolioProject,
  ProfileData,
  ProjectCategory,
  SkillCategoryGroup,
} from '../types/portfolio';

export const PORTFOLIO_CATEGORIES: ProjectCategory[] = [
  'All',
  'Website Designs',
  'Instagram Creatives',
  'Social Media Campaigns',
  'SEO Projects',
  'AI Experiments',
  'Content Strategy',
  'Marketing Research',
];

export interface MoodboardPin {
  id: string;
  imageUrl: string;
  caption: string;
  tag: string;
  aspectClass: string;
  tiltClass: string;
  imageClassName?: string;
}

export const MOODBOARD_PINS: MoodboardPin[] = [
  {
    id: 'mb-peace',
    imageUrl: '/assets/aistudio/1__089f2097.jpg',
    caption: 'Peace & Productivity',
    tag: 'Theme Banner',
    aspectClass: 'aspect-[16/9]',
    tiltClass: '-rotate-1',
  },
  {
    id: 'mb-headphones',
    imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_3.17.10_PM__1__650c56bd.jpeg',
    caption: 'Creative Focus Mode',
    tag: 'Behind the Scenes',
    aspectClass: 'aspect-[3/4]',
    tiltClass: 'rotate-1',
  },
  {
    id: 'mb-calendar-butterflies',
    imageUrl: '/assets/aistudio/Screenshot_2026-08-08_145718_7a1686c0.png',
    caption: 'Calendar Collage & Butterflies',
    tag: 'Canva Collage',
    aspectClass: 'aspect-[5/6]',
    tiltClass: '-rotate-1',
    imageClassName: 'object-[50%_82%] scale-[1.12]',
  },
  {
    id: 'mb-overthink-poster',
    imageUrl: '/assets/aistudio/download__11__b1aa9aaa.jpg',
    caption: "Don't Overthink It",
    tag: 'Typography Mood',
    aspectClass: 'aspect-[3/4]',
    tiltClass: '-rotate-1',
  },
  {
    id: 'mb-cap',
    imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_3.03.55_PM_50a6dc2c.jpeg',
    caption: 'CEO of Overthinking',
    tag: 'Personal Vibe',
    aspectClass: 'aspect-[3/4]',
    tiltClass: 'rotate-2',
  },
  {
    id: 'mb-pixel-post',
    imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_3.17.10_PM_deb2f9ba.jpeg',
    caption: 'How Was This Month For You?',
    tag: 'Instagram Graphic',
    aspectClass: 'aspect-[4/5]',
    tiltClass: '-rotate-1',
  },
  {
    id: 'mb-chai',
    imageUrl: '/assets/aistudio/I_think_so___502dd031.jpg',
    caption: 'The Chai Story',
    tag: 'Visual Storytelling',
    aspectClass: 'aspect-[9/14]',
    tiltClass: 'rotate-1',
  },
  {
    id: 'mb-cafe-smile',
    imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_3.17.08_PM_022084bd.jpeg',
    caption: 'Ahmedabad Cafe Notes',
    tag: 'Candid',
    aspectClass: 'aspect-[3/4]',
    tiltClass: '-rotate-2',
  },
  {
    id: 'mb-just-one-reel',
    imageUrl: '/assets/aistudio/Adulting_Is_Weird_Comic_-_Gauri_Mokate_9b0a6568.jpg',
    caption: 'Just One Reel…',
    tag: 'Social Culture',
    aspectClass: 'aspect-[4/3]',
    tiltClass: 'rotate-1',
  },
  {
    id: 'mb-mirror-headphones',
    imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_3.17.09_PM_2373d82c.jpeg',
    caption: 'Stripes & Playlists',
    tag: 'Daily Aesthetic',
    aspectClass: 'aspect-[3/4]',
    tiltClass: '-rotate-1',
  },
  {
    id: 'mb-great-lighting',
    imageUrl: '/assets/aistudio/download__8__0fef640c.jpg',
    caption: 'Great Lighting = Great Ideas',
    tag: 'Workspace Doodle',
    aspectClass: 'aspect-[4/5]',
    tiltClass: 'rotate-1',
  },
  {
    id: 'mb-phd-tote',
    imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_3.03.54_PM__1__bf0c2a97.jpeg',
    caption: 'Permanent Head Damage Tote',
    tag: 'Copy Humor',
    aspectClass: 'aspect-[3/4]',
    tiltClass: '-rotate-2',
  },
  {
    id: 'mb-snoopy',
    imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_3.17.09_PM__1__65d8c948.jpeg',
    caption: 'Off-Duty Mood',
    tag: 'Candid',
    aspectClass: 'aspect-[3/4]',
    tiltClass: 'rotate-1',
  },
  {
    id: 'mb-starbucks',
    imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_3.03.55_PM__1__55bab183.jpeg',
    caption: 'Coffee & Campaign Ideas',
    tag: 'Lifestyle',
    aspectClass: 'aspect-[3/4]',
    tiltClass: '-rotate-1',
  },
  {
    id: 'mb-denim-cafe',
    imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_3.03.54_PM_dac850bf.jpeg',
    caption: 'Denim & Bright Walls',
    tag: 'Candid',
    aspectClass: 'aspect-[3/4]',
    tiltClass: 'rotate-1',
  },
  {
    id: 'mb-gingham-journal',
    imageUrl: '/assets/aistudio/download__10__e2db32fa.jpg',
    caption: 'Gingham & Gold Star Notes',
    tag: 'Paper Texture',
    aspectClass: 'aspect-[9/14]',
    tiltClass: '-rotate-1',
  },
  {
    id: 'mb-checker',
    imageUrl: '/assets/aistudio/iPhone_wallpaper_a21cd8b7.jpg',
    caption: 'Wavy Teal Checker',
    tag: 'Color Theme',
    aspectClass: 'aspect-[9/14]',
    tiltClass: 'rotate-1',
  },
];

export const DEFAULT_PROFILE: ProfileData = {
  name: 'Krishna Ladva',
  roleTitle: 'Digital Marketing Intern · BCA Graduate · Ahmedabad',
  heroHeadline: 'Creative content. Thoughtful marketing. Built for the web.',
  heroIntro:
    'Enthusiastic and creative BCA graduate based in Ahmedabad, combining hands-on web development with social media marketing, Canva visual storytelling, SEO fundamentals, and AI-assisted workflows.',
  aboutIntro:
    'I am a Bachelor of Computer Applications (BCA) graduate (Class of 2026) from Swaminarayan University, seeking a Digital Marketing Internship or Fresher Digital Marketing role. Passionate about social media marketing, content creation, branding, and digital trends, I enjoy bridging creative storytelling with technical execution.',
  location: 'Ahmedabad, Gujarat, India',
  phone: '+91 70436 02164',
  email: 'krishnaladva25@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/krishnaladva09',
  nextAuraLiveDemoUrl: '',
  nextAuraGithubUrl: '',
  photoUrl: '/assets/aistudio/Screenshot_2026-08-04_171956_fc452a27.png',
  resumePdfUrl: '/assets/aistudio/KRISHNA_LADVA_7d3144bb.pdf',
  education: {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Swaminarayan University',
    graduationYear: '2026',
  },
  interests: [
    'SEO & Search Intent',
    'Social Media Marketing',
    'AI Creative Workflows',
    'Web Technologies',
  ],
  technicalSkills: [
    'Social Media Marketing (Basic)',
    'Canva',
    'Basic SEO',
    'Keyword Research',
    'Instagram Marketing',
    'Email Marketing (Basic)',
    'HTML5 – CSS',
    'AI Tools (ChatGPT, Canva AI)',
    'Basic Analytics',
    'Copywriting',
    'MERN Stack (Academic Project)',
  ],
  strengths: [
    'Quick Learner',
    'Problem Solving',
    'Teamwork',
    'Time Management',
    'Adaptability',
    'Good Communication',
  ],
  languages: ['English', 'Hindi', 'Gujarati'],
};

export const SKILL_CATEGORIES: SkillCategoryGroup[] = [
  {
    id: 'seo-content',
    title: 'SEO & Content Marketing',
    subtitle: 'Foundational organic search & persuasive copywriting',
    skills: [
      {
        name: 'Basic SEO',
        context: 'On-page structure, heading hierarchy, meta titles, and clean semantic HTML.',
      },
      {
        name: 'Keyword Research',
        context: 'Identifying search intent themes and topic clusters for content planning.',
      },
      {
        name: 'Copywriting',
        context: 'Writing crisp hooks, product descriptions, captions, and calls to action.',
      },
      {
        name: 'Basic Analytics',
        context: 'Reviewing engagement patterns and content performance fundamentals.',
      },
    ],
  },
  {
    id: 'social-media',
    title: 'Social Media Marketing',
    subtitle: 'Visual-first channel storytelling and audience engagement',
    skills: [
      {
        name: 'Social Media Marketing (Basic)',
        context: 'Planning consistent content themes aligned with digital trends and brand tone.',
      },
      {
        name: 'Instagram Marketing',
        context: 'Designing carousel narratives, reel concepts, and grid-cohesive post layouts.',
      },
    ],
  },
  {
    id: 'campaign-strategy',
    title: 'Meta Ads & Campaign Strategy',
    subtitle: 'Structured campaign planning & foundational audience thinking',
    skills: [
      {
        name: 'Campaign Concepting',
        context: 'Structuring awareness-to-consideration messaging flows for visual feeds.',
      },
      {
        name: 'Basic Analytics & Funnel Framing',
        context: 'Applying foundational analytics thinking and copy angles for campaign testing.',
      },
    ],
  },
  {
    id: 'content-creation',
    title: 'Content Creation',
    subtitle: 'Editorial layout craft and multi-channel brand assets',
    skills: [
      {
        name: 'Canva',
        context: 'Building editorial carousels, lookbook templates, posters, and brand kits.',
      },
      {
        name: 'Email Marketing (Basic)',
        context: 'Drafting structured welcome sequences, launch announcements, and subject lines.',
      },
    ],
  },
  {
    id: 'ai-tools',
    title: 'AI Tools & Automation',
    subtitle: 'Accelerating research, ideation, and visual iteration',
    skills: [
      {
        name: 'ChatGPT',
        context: 'Prompting for audience angles, SEO outlines, caption variations, and research.',
      },
      {
        name: 'Canva AI',
        context: 'Rapidly exploring visual compositions, layout adaptations, and creative concepts.',
      },
    ],
  },
  {
    id: 'web-tech',
    title: 'Web Development & Technologies',
    subtitle: 'Full-stack foundation from BCA coursework & NextAura',
    skills: [
      {
        name: 'HTML5 – CSS',
        context: 'Responsive layouts, accessible semantic markup, and editorial styling.',
      },
      {
        name: 'MERN Stack (MongoDB, Express.js, React.js, Node.js)',
        context: 'Built NextAura ethnic fashion storefront with auth, search, cart & admin panel.',
      },
      {
        name: 'Razorpay Integration',
        context: 'Integrated online payment checkout flow in the NextAura academic build.',
      },
    ],
  },
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'nextaura-ecommerce',
    title: 'NextAura — Ethnic Fashion E-commerce Website',
    category: 'Website Designs',
    nature: 'Academic Project',
    proofStatus: 'Academic Build · Functional Full-Stack App',
    aspectClass: 'aspect-[16/9]',
    imageUrl: '/src/assets/images/nextaura_desktop_screen_1795424559558.jpg',
    imageAlt:
      'Desktop laptop screen displaying the NextAura ethnic fashion e-commerce storefront with Sarees, Kurtis, Lehengas, search, and shopping bag',
    secondaryImageUrl: '/src/assets/images/nextaura_mobile_screen_1795424559428.jpg',
    secondaryImageAlt:
      'Mobile smartphone screen showing NextAura product detail view with size selection, Add to Cart, and Razorpay checkout',
    shortDescription:
      'Full-stack MERN e-commerce storefront for ethnic fashion featuring auth, category filters, search, cart, Razorpay checkout, and admin management.',
    brief:
      'Build an end-to-end ethnic fashion e-commerce web application as my flagship BCA academic project—connecting customer discovery, secure checkout, and store administration in a single responsive platform.',
    overview:
      'NextAura is my flagship BCA academic project: a complete full-stack e-commerce web application built for an ethnic fashion storefront using the MERN stack (MongoDB, Express.js, React.js, Node.js).',
    problemAndObjective:
      'Ethnic fashion shoppers need effortless discovery across categories alongside trustworthy checkout, while store owners require straightforward product and order control. The objective was to engineer an end-to-end storefront and admin workflow in one cohesive interface.',
    creativeConcept:
      'Clean editorial browsing paired with structured category filtering, prominent garment imagery, and friction-free cart and checkout journeys designed for both desktop and mobile screens.',
    process: [
      'Mapped core customer and admin user flows (browse, filter, search, auth, cart, checkout, order updates).',
      'Designed MongoDB schemas and Express.js REST APIs for products, users, carts, and orders.',
      'Built responsive React.js storefront views for desktop and mobile with HTML5 & CSS styling.',
      'Integrated Razorpay payment checkout and tested end-to-end order creation from storefront to admin dashboard.',
    ],
    views: [
      {
        number: '01',
        title: 'Account Access',
        caption: 'Account creation and user login screen for NextAura customers.',
        imageUrl: '/assets/aistudio/01-account-access_e6eb7039.jpg',
      },
      {
        number: '02',
        title: 'Catalogue',
        caption: 'All Products storefront with search bar, discount badges, and filter sidebar.',
        imageUrl: '/assets/aistudio/02-product-catalogue_609246f2.jpg',
      },
      {
        number: '03',
        title: 'Cart',
        caption: 'Shopping cart summary listing selected garments, line totals, and Pay action.',
        imageUrl: '/assets/aistudio/03_bfcd09ee.jpg',
      },
      {
        number: '04',
        title: 'UPI',
        caption: 'Alternative test-mode checkout option: Razorpay UPI QR screen.',
        imageUrl: '/assets/aistudio/04_badcffe8.jpg',
      },
      {
        number: '05',
        title: 'Cards',
        caption: 'Alternative test-mode checkout option: card details entry form.',
        imageUrl: '/assets/aistudio/05_f001275e.jpg',
      },
      {
        number: '06',
        title: 'Netbanking',
        caption: 'Alternative test-mode checkout option: bank search and netbanking selector.',
        imageUrl: '/assets/aistudio/06_23d0b1e7.jpg',
      },
      {
        number: '07',
        title: 'Wallets',
        caption: 'Alternative test-mode checkout option: Mobikwik, Airtel Payments Bank, and Ola Money.',
        imageUrl: '/assets/aistudio/07_617893a5.jpg',
      },
      {
        number: '08',
        title: 'Pay Later',
        caption: 'Alternative test-mode checkout option: LazyPay, ICICI, FlexiPay, and Pay Later providers.',
        imageUrl: '/assets/aistudio/08_2b83a700.jpg',
      },
      {
        number: '09',
        title: 'Bank Redirect',
        caption: 'Test-mode checkout redirect state loading the bank authorization page.',
        imageUrl: '/assets/aistudio/09_4f686700.jpg',
      },
      {
        number: '10',
        title: 'Test Bank Simulator',
        caption: 'Razorpay demo bank simulator page to test Success or Failure outcomes.',
        imageUrl: '/assets/aistudio/10_47fd400e.jpg',
      },
      {
        number: '11',
        title: 'Payment Confirmation Progress',
        caption: 'Test-mode payment confirmation progress view (not a verified live payment).',
        imageUrl: '/assets/aistudio/11_1be3cf2e.jpg',
      },
      {
        number: '12',
        title: 'Admin Dashboard',
        caption: 'Manage AURA admin dashboard showing total users, orders, revenue, and products.',
        imageUrl: '/assets/aistudio/12_5a31e6c9.jpg',
      },
      {
        number: '13',
        title: 'Product Management',
        caption: 'Admin Manage Products view with Add Product, Edit, and Delete controls.',
        imageUrl: '/assets/aistudio/13_9f19a135.jpg',
      },
      {
        number: '14',
        title: 'Order Management',
        caption: 'Admin Manage Orders view with Delivered, Shipped, and Pending status controls.',
        imageUrl: '/assets/aistudio/14_434eaa2a.jpg',
      },
      {
        number: '15',
        title: 'User Management',
        caption: 'Admin Manage Users directory displaying customer profiles with Edit and Delete actions.',
        imageUrl: '/assets/aistudio/15_6a6598c7.jpg',
      },
      {
        number: '16',
        title: 'Architecture',
        caption: 'Three-tier MERN architecture diagram: React.js UI, Express Router, and MongoDB.',
        imageUrl: '/assets/aistudio/16_49ae7ae9.jpg',
      },
    ],
    toolsUsed: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Razorpay', 'HTML5 – CSS'],
    contribution: [
      'Developed a responsive full-stack e-commerce website for ethnic fashion.',
      'Implemented user authentication and authorization flows.',
      'Built product listing, category filtering, search, and shopping cart features.',
      'Integrated Razorpay for secure online payments.',
      'Created an admin panel for product and order management.',
      'Designed a responsive and user-friendly interface.',
    ],
    deliverables: [
      'Responsive React storefront (Desktop & Mobile views)',
      'Node.js + Express REST API & MongoDB database models',
      'User authentication & authorization flow',
      'Razorpay payment integration & Admin product/order panel',
    ],
    learnings:
      'Building NextAura taught me how clean product categorization, fast search filtering, and mobile checkout clarity directly shape user trust—insights I now bring into digital marketing and landing page conversion thinking.',
    finalOutcome:
      'Delivered a working full-stack academic e-commerce application connecting customer discovery, cart checkout, and administrative inventory workflows (academic project, not commercially launched).',
    tags: ['MERN Stack', 'E-commerce', 'React.js', 'Razorpay', 'UX Design', 'Full-Stack'],
  },
  {
    id: 'handloom-instagram-carousels',
    title: 'Monthly Reflection — Pixel Avatar Instagram Visual',
    category: 'Instagram Creatives',
    nature: 'Concept Study',
    proofStatus: 'Untested Concept · Self-Initiated Visual',
    aspectClass: 'aspect-[3/4]',
    imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_3.17.10_PM_deb2f9ba.jpeg',
    imageAlt:
      'Pixel-art portrait of Krishna in a floral meadow with Instagram engagement icons and monthly check-in prompt',
    shortDescription:
      'Playful pixel-art character graphic designed for community check-in posts with handwritten typography and interactive comment prompts.',
    brief:
      'Create a relatable, human-centered Instagram feed visual concept designed to invite organic comments and profile connection without looking like a polished corporate ad.',
    overview:
      'A personal Instagram creative graphic pairing custom pixel-art illustration with outdoor floral photography and conversational community-building prompts ("How was this month for you? Join me in my journey!").',
    problemAndObjective:
      'Feed posts often feel impersonal and static. The goal was to craft a warm, memorable visual hook that invites comments, shares, and audience conversation.',
    creativeConcept:
      'Mixing nostalgic 8-bit pixel character personality with sunlit floral photography and clean white handwritten display typography.',
    process: [
      'Selected a warm floral backdrop photo with strong natural contrast for top-aligned text.',
      'Paired a pixel-art character illustration with a direct, open-ended monthly check-in question.',
      'Tested readability and engagement icon spacing at 4:5 Instagram feed proportions in Canva.',
    ],
    toolsUsed: ['Canva', 'Canva AI', 'Copywriting', 'Instagram Marketing'],
    contribution: [
      'Combined custom pixel-art portrait overlay with natural outdoor photography.',
      'Crafted an open-ended community prompt designed to invite replies and saves.',
      'Balanced visual contrast and clean white Instagram engagement iconography.',
    ],
    deliverables: [
      '4:5 Instagram feed graphic',
      'Conversational headline & caption prompt pairing',
    ],
    learnings:
      'Practiced framing top-third typography contrast on natural photography and writing low-friction questions that feel native to Instagram feeds. (Concept study—not run as a paid campaign.)',
    finalOutcome:
      'Produced a shareable Instagram community post concept blending personal branding with conversational copy.',
    tags: ['Instagram', 'Canva', 'Pixel Art', 'Copywriting', 'Community'],
  },
  {
    id: 'elements-campaign-board',
    title: 'Relatable Reels & Chai Visual Storytelling',
    category: 'Social Media Campaigns',
    nature: 'Concept Study',
    proofStatus: 'Untested Concept · Campaign Moodboard',
    aspectClass: 'aspect-[4/3]',
    imageUrl: '/assets/aistudio/Adulting_Is_Weird_Comic_-_Gauri_Mokate_9b0a6568.jpg',
    imageAlt: 'Illustrated desk scene with laptop, coffee mug, and comic speech bubble reading Just One Reel',
    shortDescription:
      'Social media campaign concept using relatable doodle-over-photo storytelling and conversational speech bubbles for Gen-Z audience connection.',
    brief:
      'Explore how mixed-media illustration over real workspace photography can turn everyday habits ("Just One Reel...") into thumb-stopping social hooks.',
    overview:
      'A social media creative study inspired by mixed-media comic-over-photography trends ("Just One Reel..." & "The Chai Story") to spark organic relatability in feed and reel cover formats.',
    problemAndObjective:
      'Polished stock ads frequently get scrolled past. The objective was to explore warm, relatable mixed-media storytelling that feels native to social feeds.',
    creativeConcept:
      'Pairing cozy warm-lit photography with clean white-outlined line illustrations, comic speech bubbles, and witty everyday copy.',
    process: [
      'Audited mixed-media doodle-over-photo formats performing well with student and Gen-Z audiences.',
      'Drafted short comic-bubble hooks connecting late-night scrolling habits to creative storytelling.',
      'Assembled reusable moodboard templates in Canva for Reels covers and story frames.',
    ],
    toolsUsed: ['Canva', 'Social Media Marketing (Basic)', 'Copywriting', 'Instagram Marketing'],
    contribution: [
      'Curated mixed-media comic-over-photo references for relatable brand storytelling.',
      'Drafted short conversational hooks and caption pairs for Instagram Reels & Stories.',
      'Mapped a warm visual palette linking cozy workspace scenes with brand voice.',
    ],
    deliverables: [
      'Mixed-media social campaign moodboard',
      'Reels cover hook & speech-bubble copy variations',
    ],
    learnings:
      'Learned how speech-bubble pacing guides the viewer eye in the first second of scroll. Labeled clearly as an untested concept study ready for A/B testing.',
    finalOutcome:
      'Built a cohesive mixed-media social campaign moodboard tailored for relatable engagement.',
    tags: ['Campaign Strategy', 'Reels', 'Social Media', 'Storytelling', 'Mixed Media'],
  },
  {
    id: 'seo-keyword-architecture',
    title: 'Ethnic Apparel SEO & Topic Cluster Blueprint',
    category: 'SEO Projects',
    nature: 'Self-Initiated Board',
    proofStatus: 'Untested Concept · Self-Initiated SEO Plan',
    aspectClass: 'aspect-[4/3]',
    imageUrl: '/src/assets/images/pin_seo_audit_1794993292214.jpg',
    imageAlt: 'Printed SEO keyword architecture chart and topic cluster index cards on linen desk',
    shortDescription:
      'Keyword research and on-page SEO hierarchy blueprint structuring pillar pages, category intent, and internal topic clusters.',
    brief:
      'Design a structured search-intent and internal-linking blueprint for an ethnic apparel storefront like NextAura so product categories and styling guides reinforce one another.',
    overview:
      'Drawing from the product categories built for NextAura, this self-initiated SEO study maps search intent from broad category discovery down to informational styling guides.',
    problemAndObjective:
      'E-commerce category pages frequently lack supporting informational content and clean heading structures. The objective was to practice organizing keywords into clear pillar and cluster hierarchies.',
    creativeConcept:
      'Treating SEO architecture like an editorial index: clear pillar hubs, sub-topic cards, search intent notes, and clean on-page HTML5 heading plans.',
    process: [
      'Collected seed terms across Sarees, Kurtis, and festive wear categories from the NextAura catalog.',
      'Separated commercial category intent keywords from informational styling/care queries.',
      'Outlined H1–H3 semantic structures, meta titles, and internal link pathways back to category pages.',
    ],
    toolsUsed: ['Basic SEO', 'Keyword Research', 'HTML5 – CSS', 'Copywriting'],
    contribution: [
      'Grouped core category keywords and long-tail informational queries into topic clusters.',
      'Drafted sample meta titles, meta descriptions, and H1–H3 heading outlines.',
      'Mapped internal linking paths between guide articles and storefront categories.',
    ],
    deliverables: [
      'Apparel keyword cluster hierarchy map',
      'On-page HTML5 heading & meta title checklist',
    ],
    learnings:
      'Reinforced how semantic HTML headings and search intent separation make e-commerce content easier for both shoppers and search crawlers to understand. (Unpublished study—no live traffic claims.)',
    finalOutcome:
      'Created a structured keyword architecture sheet and on-page SEO checklist applicable to apparel e-commerce websites.',
    tags: ['Basic SEO', 'Keyword Research', 'On-Page SEO', 'Topic Clusters'],
  },
  {
    id: 'ai-prompt-visual-lab',
    title: 'Great Lighting = Great Ideas — AI & Workspace Study',
    category: 'AI Experiments',
    nature: 'Self-Initiated Board',
    proofStatus: 'Self-Initiated Workflow · Prompt Library',
    aspectClass: 'aspect-[3/4]',
    imageUrl: '/assets/aistudio/download__8__0fef640c.jpg',
    imageAlt: 'Sunlit window workspace photo overlaid with a minimalist white line-art illustration working on a laptop',
    shortDescription:
      'Mixed-media creative experiments combining ChatGPT prompt frameworks, Canva AI visual ideation, and crisp doodle-over-photo overlays.',
    brief:
      'Build a repeatable human-in-the-loop prompt system using ChatGPT and Canva AI so AI-assisted social copy and visual mockups retain a distinct human voice.',
    overview:
      'An ongoing creative lab documenting repeatable ChatGPT prompt frameworks and Canva AI layout experiments paired with clean line-art doodle overlays.',
    problemAndObjective:
      'Generic AI outputs feel robotic and off-brand. The objective was to test constraint-driven prompts (audience tone, format limits, visual lighting cues) to produce usable creative starting points.',
    creativeConcept:
      'Minimalist white outline illustrations layered over sunlit architectural workspaces to communicate creative clarity and AI-assisted flow.',
    process: [
      'Tested constraint-first ChatGPT prompts specifying audience, word limits, and banned clichés.',
      'Iterated on Canva AI visual compositions paired with sunlit photography and white line doodles.',
      'Created a 4-point human editing pass to fact-check claims and sharpen conversational rhythm.',
    ],
    toolsUsed: ['ChatGPT', 'Canva AI', 'Copywriting'],
    contribution: [
      'Built prompt templates for Instagram hook variations, SEO meta drafts, and email subject testing.',
      'Tested Canva AI layout and visual ideation workflows for mixed-media moodboarding.',
      'Documented human editing checklists to keep final copy natural and accurate.',
    ],
    deliverables: [
      '6 reusable prompt frameworks (social, SEO, research, UI)',
      'Editorial human-review checklist',
    ],
    learnings:
      'Discovered that giving AI explicit negative constraints (what to avoid) and a concrete format produces far stronger first drafts than broad open-ended requests.',
    finalOutcome:
      'Assembled a repeatable AI-assisted ideation workflow used across content, SEO, and visual brainstorming tasks.',
    tags: ['ChatGPT', 'Canva AI', 'Prompt Engineering', 'Creative Workflow'],
  },
  {
    id: 'brand-voice-content-calendar',
    title: 'Notebook & Laptop Content Planning System',
    category: 'Content Strategy',
    nature: 'Concept Study',
    proofStatus: 'Untested Concept · Editorial Framework',
    aspectClass: 'aspect-[3/4]',
    imageUrl: '/assets/aistudio/download__13__388bdbd8.jpg',
    imageAlt: 'Cutout collage of handwritten bullet journal notebook, laptop mockup, and star cutouts',
    shortDescription:
      'Scrapbook-style content calendar and brand voice system bridging handwritten weekly planning with digital publishing templates.',
    brief:
      'Create a lightweight weekly content calendar and brand voice reference that a small marketing team or creator can actually maintain consistently.',
    overview:
      'A content strategy board designed to keep brand communication warm, organized, and consistent across weekly Instagram pillars and email touchpoints.',
    problemAndObjective:
      'Inconsistent posting happens when teams lack clear content pillars and tone rules. The objective was to create a lightweight, practical voice guide and weekly cadence.',
    creativeConcept:
      'Paper-cutout collage aesthetics combining bullet-journal planning, star stickers, and crisp digital calendar layouts.',
    process: [
      'Defined four balanced weekly pillars: Product Story, Behind the Scenes, Styling Utility, and Community Prompt.',
      'Drafted tone rules contrasting "what we sound like" vs. "what we avoid" to keep captions authentic.',
      'Paired weekly Instagram feed themes with matching basic email newsletter touchpoints.',
    ],
    toolsUsed: ['Copywriting', 'Canva', 'Email Marketing (Basic)', 'ChatGPT'],
    contribution: [
      'Defined four core content pillars and tone guidelines (warm, clear, non-pushy).',
      'Structured a 4-week editorial calendar grid pairing feed posts with email touchpoints.',
      'Drafted reusable caption frameworks with clear hooks and engagement prompts.',
    ],
    deliverables: [
      '4-week content pillar matrix',
      'Brand voice dos/don’ts card & email touchpoint outline',
    ],
    learnings:
      'Saw how connecting email subjects directly to weekly social pillars reduces blank-page friction. Marked as an untested conceptual system ready for team execution.',
    finalOutcome:
      'Delivered a clean brand voice reference and monthly content planning structure ready for small-team execution.',
    tags: ['Content Strategy', 'Brand Voice', 'Editorial Calendar', 'Copywriting'],
  },
  {
    id: 'audience-persona-journey-study',
    title: 'The Chai Story — Audience Insights & Cultural Hooks',
    category: 'Marketing Research',
    nature: 'Concept Study',
    proofStatus: 'Untested Concept · Cultural Insight Study',
    aspectClass: 'aspect-[3/4]',
    imageUrl: '/assets/aistudio/I_think_so___502dd031.jpg',
    imageAlt: 'Sunlit wooden table with two chai glasses and comic speech bubbles reading The Chai Story',
    shortDescription:
      'Cultural storytelling and audience research exploring how everyday rituals and regional humor shape relatable digital brand hooks.',
    brief:
      'Investigate how everyday Indian cultural moments (like chai conversations) and multilingual warmth (English, Hindi, Gujarati) can anchor relatable awareness-stage marketing.',
    overview:
      'A marketing research study connecting user-experience thinking from my BCA background with culturally grounded digital storytelling across English, Hindi, and Gujarati audiences.',
    problemAndObjective:
      'Marketing messages miss the mark when creators ignore everyday cultural rituals. The goal was to align relatable micro-moments with awareness-stage messaging.',
    creativeConcept:
      'Everyday sunlit photography paired with playful comic dialogue bubbles and multilingual audience warmth.',
    process: [
      'Listed common pre-purchase trust questions and everyday cultural touchpoints for young urban shoppers.',
      'Mapped how conversational hooks at the awareness stage transition naturally into product discovery.',
      'Prototyped visual dialogue frames pairing warm chai photography with concise storytelling prompts.',
    ],
    toolsUsed: ['Basic Analytics', 'Keyword Research', 'ChatGPT', 'Social Media Marketing (Basic)'],
    contribution: [
      'Mapped buyer questions across discovery, product comparison, and checkout stages.',
      'Explored how everyday cultural touchpoints boost organic shares and saves.',
      'Connected audience insight notes directly to storefront and social content formats.',
    ],
    deliverables: [
      'Buyer awareness-to-checkout question map',
      'Cultural storytelling visual hook prototypes',
    ],
    learnings:
      'Practiced translating user empathy from software UX flows into culturally relatable campaign hooks. Untested concept study with zero fabricated performance numbers.',
    finalOutcome:
      'Produced a culturally grounded audience insight study linking everyday storytelling to digital discovery.',
    tags: ['Marketing Research', 'Storytelling', 'Audience Insights', 'Basic Analytics'],
  },
];

export const AI_LAB_WORKFLOWS: AILabWorkflow[] = [
  {
    id: 'ai-content-gen',
    number: '01',
    title: 'Content Generation',
    tools: 'ChatGPT · Copywriting',
    description:
      'Drafting multi-angle Instagram captions, email welcome sequences, and carousel micro-copy with strict tone constraints before human editorial refinement.',
    samplePrompt:
      '"Write 3 warm, concise Instagram carousel hooks for a handloom ethnic collection without hype or clichés."',
    outputFocus: 'Hook variations & readable brand copy',
  },
  {
    id: 'ai-marketing-research',
    number: '02',
    title: 'Marketing Research',
    tools: 'ChatGPT · Basic Analytics',
    description:
      'Synthesizing audience pain points, seasonal shopping questions, and competitor positioning hypotheses to inform persona boards and campaign angles.',
    samplePrompt:
      '"List top pre-purchase questions first-time online ethnic wear shoppers ask before checkout."',
    outputFocus: 'Audience objections & messaging pillars',
  },
  {
    id: 'ai-brainstorming',
    number: '03',
    title: 'Creative Brainstorming',
    tools: 'ChatGPT · Canva AI',
    description:
      'Exploring campaign themes, reel storyboard concepts, and editorial naming directions to move rapidly from blank page to curated moodboard.',
    samplePrompt:
      '"Brainstorm 5 visual storytelling themes pairing heritage textiles with modern minimal styling."',
    outputFocus: 'Campaign concepts & storyboard outlines',
  },
  {
    id: 'ai-seo-workflows',
    number: '04',
    title: 'SEO Workflows',
    tools: 'ChatGPT · Keyword Research · Basic SEO',
    description:
      'Clustering seed keywords by search intent, drafting clear H1–H3 article outlines, and refining meta titles and descriptions within snippet character limits.',
    samplePrompt:
      '"Group these apparel keywords into category vs. informational blog clusters and suggest clean meta titles."',
    outputFocus: 'Topic clusters & on-page meta drafts',
  },
  {
    id: 'ai-visual-gen',
    number: '05',
    title: 'Image & Visual Generation',
    tools: 'Canva AI · Canva',
    description:
      'Testing layout variations, moodboard textures, and background compositions in Canva AI to prototype cohesive social feed aesthetics.',
    samplePrompt:
      '"Generate minimalist warm-linen editorial background variations for a 4:5 Instagram lookbook slide."',
    outputFocus: 'Feed layouts & visual moodboards',
  },
  {
    id: 'ai-web-dev',
    number: '06',
    title: 'Website Development',
    tools: 'ChatGPT · React · HTML5 – CSS',
    description:
      'Accelerating UI debugging, semantic HTML accessibility checks, and responsive CSS layout iteration while building projects like NextAura.',
    samplePrompt:
      '"Review this React category filter component for keyboard accessibility and clean responsive grid spacing."',
    outputFocus: 'Clean components & responsive UI polish',
  },
];
