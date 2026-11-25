import type { BlogArticle } from '../types/blog';

export const BLOG_SECTION_META = {
  kicker: 'Field Notes & Journal',
  heading: 'Notes, Experiments & A Little Overthinking',
  intro:
    'Things I’m learning about marketing, AI, creativity, and turning ‘what if?’ into something you can actually click.',
};

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'i-asked-ai-for-a-caption-restaurant-website',
    title: 'I Asked AI for a Caption. Somehow, I Ended Up Building a Restaurant Website.',
    subtitle:
      'A beginner’s adventure through digital marketing, creative chaos, and the surprisingly important price of paneer.',
    excerpt:
      'I set out to learn a little AI for better captions and content ideas. Somewhere between “make this caption more engaging” and “how does the backend verify this?”, I ended up building Pier 25—an AI-assisted restaurant prototype—and rethinking what actually makes creative work useful.',
    author: 'Krishna Ladva',
    date: '25 November 2026',
    tags: ['AI', 'Digital Marketing', 'Creative Learning', 'Building in Public'],
    coverVisual: {
      src: '/assets/aistudio/download__11__b1aa9aaa.jpg',
      alt: 'Editorial moodboard poster reading Don’t Overthink It with flowing blue ribbon curves on warm paper',
      caption: 'Moodboard graphic from my visual diary — reminder while learning new tools.',
    },
    marginVisual: {
      src: '/assets/aistudio/download__12__7ddfefb8.jpg',
      alt: 'Minimalist continuous-line sketchbook illustration of a hand writing, a laptop, and a coffee mug',
      caption: 'Sketchbook illustration representing notes, drafts, and late-evening iterations.',
    },
    leadBlocks: [
      { type: 'paragraph', text: 'Let me explain how this was supposed to go.' },
      { type: 'paragraph', text: 'I was going to learn a little AI.' },
      {
        type: 'paragraph',
        text: 'A few better captions. Some content ideas. Perhaps a neat weekly calendar that would make Monday morning feel less like an unexpected plot twist.',
      },
      {
        type: 'paragraph',
        text: 'Instead, I found myself thinking about restaurant menus, customer journeys, JavaScript, table reservations, and why a payment success message needs more evidence than a cheerful green tick.',
      },
      {
        type: 'paragraph',
        text: 'Somewhere between “make this caption more engaging” and “how does the backend verify this?”, the project became considerably more interesting.',
      },
      { type: 'paragraph', text: 'Welcome to my learning journey.' },
      {
        type: 'paragraph',
        text: 'There is curiosity. There is trial and error. There are probably too many browser tabs.',
      },
      {
        type: 'paragraph',
        text: 'But there is also a useful discovery: learning AI starts to make sense when you connect it to a problem you actually understand.',
      },
    ],
    sections: [
      {
        id: 'the-blank-caption-box',
        heading: '1. The Blank Caption Box: A Tiny Rectangle With Big Demands',
        headingLevel: 2,
        stickerNote: '5 questions before prompting',
        blocks: [
          {
            type: 'paragraph',
            text: 'Working in social media marketing means spending time with a deceptively difficult question:',
          },
          { type: 'paragraph', text: '“What should we say?”' },
          {
            type: 'paragraph',
            text: 'It sounds simple until you need a message that fits the brand, speaks to the right person, has a clear purpose, and does not sound like seventeen other posts they scrolled past this morning.',
          },
          {
            type: 'paragraph',
            text: 'Naturally, I wanted to understand how AI could help.',
          },
          {
            type: 'paragraph',
            text: 'My first instinct was to ask for something catchy.',
          },
          {
            type: 'paragraph',
            text: 'The trouble is that “catchy” is a mood, not a complete brief.',
          },
          {
            type: 'paragraph',
            text: 'A funny caption for a café might be inappropriate for a training institute. A post designed to start a conversation needs a different approach from one asking someone to register.',
          },
          { type: 'paragraph', text: 'The tool needs direction. So do I.' },
          {
            type: 'paragraph',
            text: 'I’m learning to answer five questions before asking AI to write:',
          },
          {
            type: 'list',
            items: [
              'Who are we talking to?',
              'What do they care about?',
              'What are we offering?',
              'What facts can we support?',
              'What should the reader do next?',
            ],
          },
          {
            type: 'paragraph',
            text: 'Once those are clear, I can judge the output more intelligently.',
          },
          {
            type: 'paragraph',
            text: 'Does the hook connect to the actual message? Is the benefit specific? Would this brand really say that? Is the call to action reasonable?',
          },
          {
            type: 'paragraph',
            text: 'The first draft becomes something I can work with.',
          },
          {
            type: 'paragraph',
            text: 'And yes, sometimes the most useful edit is deleting an enthusiastic sentence that says absolutely nothing.',
          },
        ],
      },
      {
        id: 'ai-is-fast-my-judgement-still-has-homework',
        heading: '2. AI Is Fast. My Judgement Still Has Homework.',
        headingLevel: 2,
        blocks: [
          {
            type: 'paragraph',
            text: 'One useful thing about AI is how quickly it can produce alternatives.',
          },
          {
            type: 'paragraph',
            text: 'I can explore several hooks, different tones, or a few ways to structure a carousel without starting from zero every time.',
          },
          {
            type: 'paragraph',
            text: 'But more options create another job: choosing well.',
          },
          {
            type: 'paragraph',
            text: 'Five versions of a weak idea are still five versions of a weak idea.',
          },
          {
            type: 'paragraph',
            text: 'I need to understand the audience, check the claims, and decide whether the message belongs in the campaign.',
          },
          {
            type: 'paragraph',
            text: 'My current approach is to treat AI like a very quick creative collaborator that needs a clear brief and an editor.',
          },
          { type: 'paragraph', text: 'It can suggest. I still need to think.' },
          {
            type: 'paragraph',
            text: 'That is actually encouraging. It means my marketing knowledge, taste, and curiosity remain useful while I learn the technology.',
          },
          {
            type: 'blockquote',
            text: 'My goal is to become better at recognising which ideas deserve to become real work.',
            note: 'Margin reminder',
          },
        ],
      },
      {
        id: 'my-campaign-spreadsheet-had-a-plot-twist',
        heading: '3. My Campaign Spreadsheet Had a Plot Twist',
        headingLevel: 2,
        blocks: [
          {
            type: 'paragraph',
            text: 'One practical exercise brought me back to something less glamorous than an AI demo: an advertising spreadsheet.',
          },
          {
            type: 'paragraph',
            text: 'There were campaign names, spending figures, impressions, and results.',
          },
          {
            type: 'paragraph',
            text: 'At first, I wanted a clean answer: which campaign performed best?',
          },
          {
            type: 'paragraph',
            text: 'Then I noticed that “results” did not mean the same thing in every row.',
          },
          {
            type: 'paragraph',
            text: 'Some campaigns reported link clicks. Others reported leads, messaging conversations, landing-page views, or app installs.',
          },
          { type: 'paragraph', text: 'That changes the question.' },
          {
            type: 'paragraph',
            text: 'A person opening a menu is at a different stage from someone booking a table. A low-cost click does not automatically tell me whether the visitor became a customer.',
          },
          {
            type: 'paragraph',
            text: 'Comparing everything by one cost figure would hide those differences.',
          },
          {
            type: 'paragraph',
            text: 'This is where I began to see a more useful role for AI in analysis.',
          },
          {
            type: 'paragraph',
            text: 'It could help explain calculations, organise observations, and suggest questions to investigate.',
          },
          {
            type: 'paragraph',
            text: 'But if the data does not include qualified leads, customers, or revenue, it cannot honestly tell me the entire business outcome.',
          },
          {
            type: 'paragraph',
            text: 'A confident paragraph cannot fill a missing column.',
          },
          {
            type: 'paragraph',
            text: 'Sometimes the next useful action is asking the team for better information.',
          },
        ],
      },
      {
        id: 'so-naturally-i-built-a-restaurant-prototype',
        heading: '4. So, Naturally, I Built a Restaurant Prototype',
        headingLevel: 2,
        stickerNote: 'Pier 25 prototype',
        blocks: [
          {
            type: 'paragraph',
            text: 'I already had basic JavaScript experience from an earlier project, and I wanted to explore something interactive.',
          },
          {
            type: 'paragraph',
            text: 'That became Pier 25: my AI-assisted restaurant web application prototype.',
          },
          {
            type: 'paragraph',
            text: 'The idea brings together menu discovery, reservations, cart checkout, AI guest assistance, and an owner-management interface.',
          },
          {
            type: 'paragraph',
            text: 'Working on it has introduced me to a special kind of excitement:',
          },
          { type: 'paragraph', text: '“That looks finished!”' },
          { type: 'paragraph', text: 'Followed shortly by:' },
          { type: 'paragraph', text: '“What happens if someone refreshes?”' },
          {
            type: 'paragraph',
            text: 'A website can look convincing before its behaviour is reliable.',
          },
          {
            type: 'paragraph',
            text: 'A reservation needs more than an attractive confirmation card. An order needs a persistent record. A payment needs verification. An AI assistant needs information it can trust.',
          },
          {
            type: 'paragraph',
            text: 'I’m learning to look beyond the screenshot and follow the whole journey.',
          },
          {
            type: 'paragraph',
            text: 'What happens before the click? What happens afterward? What happens when something fails?',
          },
          {
            type: 'paragraph',
            text: 'Those questions are useful for both development and marketing.',
          },
        ],
      },
      {
        id: 'four-friends-one-menu-absolutely-no-decision',
        heading: '5. Four Friends, One Menu, Absolutely No Decision',
        headingLevel: 2,
        stickerNote: 'Idea: Plan My Table',
        blocks: [
          {
            type: 'paragraph',
            text: 'One restaurant problem I keep coming back to is choosing what to order.',
          },
          { type: 'paragraph', text: 'Imagine four friends.' },
          {
            type: 'paragraph',
            text: 'One prefers mild food.\nOne is watching the budget.\nOne wants a burger.\nOne says, “Anything is fine,” which somehow contributes nothing to the final decision.',
          },
          {
            type: 'paragraph',
            text: 'An idea I’m exploring for Pier 25 is “Plan My Table”.',
          },
          { type: 'paragraph', text: 'A guest could enter:' },
          {
            type: 'paragraph',
            text: '“We are four people, want vegetarian food, prefer mild spice, and have a total budget of ₹1,500.”',
          },
          {
            type: 'paragraph',
            text: 'The feature could suggest combinations from the actual menu, with quantities and a clear total.',
          },
          { type: 'paragraph', text: 'The important word is actual.' },
          {
            type: 'paragraph',
            text: 'Prices would come from the menu database. Availability would come from the restaurant’s records. Code would calculate the bill. AI would explain why the suggestions match the preferences.',
          },
          {
            type: 'paragraph',
            text: 'If portion guidance is missing, the system should say so. If allergy information is uncertain, staff should help. If the budget is too low, the interface should explain that clearly.',
          },
          {
            type: 'paragraph',
            text: 'I want an assistant that helps choose dinner.',
          },
          {
            type: 'paragraph',
            text: 'The price of paneer should remain firmly outside its imagination.',
          },
        ],
      },
      {
        id: 'creativity-can-mean-removing-a-feature',
        heading: '6. Creativity Can Mean Removing a Feature',
        headingLevel: 2,
        blocks: [
          {
            type: 'paragraph',
            text: 'Building a project makes almost every new idea feel tempting.',
          },
          {
            type: 'paragraph',
            text: 'Search? Add it.\nPersonalisation? Interesting.\nA dashboard? Naturally.\nA dashboard explaining the dashboard?',
          },
          { type: 'paragraph', text: 'Perhaps everyone needs a glass of water.' },
          { type: 'paragraph', text: 'I’m learning to pause and ask:' },
          { type: 'paragraph', text: '“What will this help someone do?”' },
          {
            type: 'paragraph',
            text: 'For a guest, the answer might be finding suitable food, understanding the total, or requesting a table.',
          },
          {
            type: 'paragraph',
            text: 'For the owner, it might be seeing orders that need attention.',
          },
          {
            type: 'paragraph',
            text: 'For a marketer, it might be learning which message brought relevant enquiries.',
          },
          {
            type: 'paragraph',
            text: 'That question helps me choose where to spend my time.',
          },
          {
            type: 'paragraph',
            text: 'A simpler screen can be a creative improvement. So can a clearer sentence. So can deciding that a feature is unnecessary.',
          },
        ],
      },
      {
        id: 'my-beginners-creativity-exercise',
        heading: '7. My Beginner’s Creativity Exercise',
        headingLevel: 2,
        blocks: [
          {
            type: 'paragraph',
            text: 'Here is an exercise I want to keep using: take one problem and sketch five possible solutions before choosing one.',
          },
          { type: 'paragraph', text: 'For group food selection, my list could be:' },
          {
            type: 'list',
            items: [
              'A budget filter.',
              'Restaurant-approved sharing combos.',
              'A short preference quiz.',
              'A staff-assisted enquiry.',
              'An AI meal planner.',
            ],
          },
          { type: 'paragraph', text: 'Then I can compare them.' },
          {
            type: 'paragraph',
            text: 'Which is easiest to understand?\nWhich needs the least maintenance?\nWhich can handle the available information accurately?\nWhich can I test with a small prototype?',
          },
          {
            type: 'paragraph',
            text: 'The most useful answer might combine two ideas.',
          },
          {
            type: 'paragraph',
            text: 'Approved combinations with an AI explanation, for example, could offer flexibility while keeping the menu grounded.',
          },
          {
            type: 'paragraph',
            text: 'Exploring alternatives gives creativity something concrete to work on.',
          },
        ],
      },
      {
        id: 'what-im-taking-to-my-first-devfest',
        heading: '8. What I’m Taking to My First DevFest',
        headingLevel: 2,
        stickerNote: 'DevFest Ahmedabad',
        blocks: [
          {
            type: 'paragraph',
            text: 'As I prepare for my first DevFest Ahmedabad, I want to bring more than a list of technologies I have heard about.',
          },
          { type: 'paragraph', text: 'I want to bring questions.' },
          {
            type: 'paragraph',
            text: 'How do developers test whether an AI feature is dependable?\nHow do businesses decide whether it is worth maintaining?\nWhat would an experienced builder simplify in my prototype?\nWhat should I learn next to make my work more useful?',
          },
          {
            type: 'paragraph',
            text: 'I also want to hear the less polished stories.',
          },
          {
            type: 'paragraph',
            text: 'The assumption that turned out to be wrong.\nThe first version that confused users.\nThe feature that looked impressive but solved very little.\nThe small change that made everything easier.',
          },
          { type: 'paragraph', text: 'Those are stories I can learn from.' },
          {
            type: 'paragraph',
            text: 'My goal is to return with one practical experiment, rather than a collection of ideas that never leave my notes.',
          },
        ],
      },
      {
        id: 'what-ill-measure-before-calling-something-better',
        heading: '9. What I’ll Measure Before Calling Something Better',
        headingLevel: 2,
        blocks: [
          {
            type: 'paragraph',
            text: 'I want my projects to help me learn how to evaluate improvement.',
          },
          {
            type: 'paragraph',
            text: 'For an AI-assisted report, I can record preparation time, review time, and mistakes found.',
          },
          {
            type: 'paragraph',
            text: 'For a meal planner, I can watch whether someone understands the questions, finds a suitable selection, and stays within the budget.',
          },
          {
            type: 'paragraph',
            text: 'For a marketing message, I need a measure that matches its objective.',
          },
          {
            type: 'paragraph',
            text: 'I also need to avoid giving AI credit for every positive change. A different audience, offer, date, or budget can affect the outcome.',
          },
          {
            type: 'paragraph',
            text: 'Testing will not always give me a dramatic answer.',
          },
          {
            type: 'paragraph',
            text: 'It can still give me the next useful question.',
          },
        ],
      },
      {
        id: 'still-learning-still-clicking-try-again',
        heading: '10. Still Learning. Still Clicking “Try Again”.',
        headingLevel: 2,
        blocks: [
          { type: 'paragraph', text: 'I am early in this journey.' },
          {
            type: 'paragraph',
            text: 'I’m a social media marketing intern with basic JavaScript knowledge, learning how customer needs, creative thinking, data, and AI-assisted development connect.',
          },
          {
            type: 'paragraph',
            text: 'Pier 25 is a prototype. Some ideas are experiments. My understanding is growing alongside the work.',
          },
          {
            type: 'paragraph',
            text: 'For now, the process I want to follow is:',
          },
          {
            type: 'paragraph',
            text: 'Notice a problem.\nAsk better questions.\nSketch a few approaches.\nBuild a small version.\nWatch someone use it.\nImprove what needs improving.',
          },
          {
            type: 'paragraph',
            text: 'And occasionally ask AI to help with a caption.',
          },
          {
            type: 'paragraph',
            text: 'I did come here for that, after all.',
          },
          { type: 'divider' },
        ],
      },
      {
        id: 'a-question-for-your-next-creative-project',
        heading: 'A question for your next creative project',
        headingLevel: 3,
        blocks: [
          {
            type: 'paragraph',
            text: 'Think of one small task that regularly frustrates you.',
          },
          {
            type: 'paragraph',
            text: 'What information would help?\nWhat would a useful result look like?\nHow could you test a simple solution?',
          },
          { type: 'paragraph', text: 'That is a worthwhile place to begin.' },
          {
            type: 'linkCard',
            label: 'Explore the project behind this story:',
            linkText: 'Pier 25 on GitHub',
            href: 'https://github.com/KrishnaLadva/pier-25',
          },
        ],
      },
    ],
  },
];
