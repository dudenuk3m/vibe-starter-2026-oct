export interface ArticleComment {
  id: string;
  author: string;
  location: string;
  timestamp: string;
  text: string;
  upvotes: number;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  kicker?: string;
  kickerType?: 'red' | 'blue' | 'black' | 'default';
  author: string;
  authorBio?: string;
  date: string;
  readTime: string;
  commentsCount: number;
  comments?: ArticleComment[];
  imageUrl?: string;
  imageCaption?: string;
  imageCredit?: string;
  bullets?: string[];
  fullContent?: string[];
  pullQuote?: string;
  isOpinion?: boolean;
  authorInitials?: string;
}

export interface Recipe {
  id: string;
  title: string;
  author: string;
  time: string;
  yield: string;
  rating: number;
  ratingCount: number;
  description: string;
  imageUrl: string;
  ingredients: { name: string; amount: string }[];
  instructions: string[];
  chefNote?: string;
}

export interface WirecutterReview {
  id: string;
  title: string;
  badge: string;
  testedHours: string;
  description: string;
  summary: string;
  topPick: {
    name: string;
    verdict: string;
    pros: string[];
    cons: string[];
    price: string;
  };
  runnerUp?: {
    name: string;
    verdict: string;
    price: string;
  };
}

export const LEAD_ARTICLE: Article = {
  id: 'lead-women-trump-admin',
  title: 'High-Ranking Women Are Leaving the Trump Administration',
  summary: 'In the president’s second term, those heading for the exits are female officials, raising questions inside the West Wing about retention and internal factional disputes.',
  category: 'U.S.',
  kicker: 'Analysis',
  kickerType: 'red',
  author: 'By Maggie Haberman and Jonathan Swan',
  authorBio: 'Maggie Haberman and Jonathan Swan are White House correspondents for The New York Times.',
  date: 'Oct. 14, 2026',
  readTime: '5 min read',
  commentsCount: 519,
  pullQuote: 'The departures represent not just personnel turnover, but a deeper realignment in how inner-circle decisions are negotiated.',
  comments: [
    {
      id: 'c1',
      author: 'Eleanor Vance',
      location: 'Bethesda, MD',
      timestamp: '2 hours ago',
      text: 'The reporting here clearly shows the friction between the policy ideologues and the traditional political operatives. When key deputies walk, institutional memory evaporates.',
      upvotes: 142,
    },
    {
      id: 'c2',
      author: 'Marcus Aurelius',
      location: 'Chicago, IL',
      timestamp: '3 hours ago',
      text: 'Personnel is policy. Regardless of political leaning, the turnover rate in second-term administrations historically signals where the true centers of power are consolidating.',
      upvotes: 89,
    },
    {
      id: 'c3',
      author: 'Sarah K.',
      location: 'Seattle, WA',
      timestamp: '4 hours ago',
      text: 'Maggie Haberman’s sourcing inside the West Wing remains unrivaled. Remarkable details regarding the cabinet liaison friction.',
      upvotes: 64,
    },
  ],
  fullContent: [
    'WASHINGTON — A wave of quiet resignations over the past two months has reshaped the senior hierarchy of the West Wing, with female cabinet deputies, senior communications directors, and domestic policy advisers departing in numbers that have alarmed veterans of the first term.',
    'Interviews with more than a dozen current and former administration officials reveal growing tension between long-standing political confidants and a newly empowered faction of hard-line policy architects who have aggressively centralized decision-making.',
    'While turnover is a hallmark of any transition between presidential terms, the concentration of departures among women holding assistant-to-the-president rank has triggered internal West Wing discussions about retention, team morale, and the optics of an increasingly insular core leadership group.',
    'Senior aides insisted that the transitions were personal career decisions, noting that many who departed had served through grueling campaign cycles and two consecutive administrations. "The pace of this White House is relentless, and people naturally seek new opportunities in the private sector or advisory roles," a White House spokesperson stated.',
    'However, private accounts describe a working environment marked by sudden shifts in policy direction, overlapping authority between informal outside advisers and senate-confirmed leaders, and abrupt curtailment of standard policy review channels.',
  ],
};

export const GUILFOYLE_ARTICLE: Article = {
  id: 'guilfoyle-rise-fall',
  title: 'The Steep Rise and Sudden Fall of Kimberly Guilfoyle',
  summary: 'From high-profile campaign surrogate and television pundit to an abruptly halted ambassadorship bid to Greece, her exit marks a major turning point.',
  category: 'U.S.',
  author: 'By Nicholas Fandos',
  date: 'Oct. 14, 2026',
  readTime: '4 min read',
  commentsCount: 231,
  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdP_yhM2nl2CzTqJMGqN7QU9BbYzfjV_17jFHn4IwjPJL-inl2xih4bNrBAgc_lvxrLl4EDKWB75CVyvJBIjiszUcGsl2MZJLD0Cv70GeVGnLBfuqoI0FiPbcDqpD7zdceU3X7sbpsaRvLJUoWI0f41Wj3QOFXzZMn3HNpZT07jRDxqY42O9TfmTIscWfabR6mWhspq3oF8DiI8TCC3qx1Mdx2ltt3dgUfLukONN-fmB1a91Rm68lK',
  imageCaption: 'Kimberly Guilfoyle appearing before the congressional panel in Washington.',
  imageCredit: 'Tierney L. Cross/The New York Times',
  fullContent: [
    'WASHINGTON — For nearly a decade, Kimberly Guilfoyle was one of the most recognizable voices of the political movement that swept through the Republican Party, delivering impassioned rally speeches and serving as a high-dollar fundraiser.',
    'Her nomination to serve as the United States ambassador to Greece was widely viewed as the culmination of her loyalty to the administration’s inner circle.',
    'Yet behind closed doors on Capitol Hill this week, that diplomatic journey reached an abrupt standstill following a contentious preliminary review by the Senate Foreign Relations Committee that exposed deep reservations among key committee members.',
    'Friends and political allies expressed shock at the rapid collapse of her confirmation trajectory, pointing to shifting geopolitical alliances and sudden pushback from diplomatic envoys in Athens.',
  ],
};

export const SIDEBAR_ARTICLES: Article[] = [
  {
    id: 'press-secretary-attorney',
    title: 'Trump’s New Press Secretary: Not-Quite Attorney at Law',
    summary: 'Katie Zacharia told The New York Times that the confusion over her legal credentials and bar registry status is the result of one big misunderstanding.',
    category: 'White House',
    kicker: 'White House',
    kickerType: 'blue',
    author: 'By Glenn Thrush',
    date: 'Oct. 14, 2026',
    readTime: '4 min read',
    commentsCount: 142,
    fullContent: [
      'WASHINGTON — When Katie Zacharia stepped to the podium in the James S. Brady Press Briefing Room, biographical materials distributed to reporters listed her as an active licensed member of the bar with extensive corporate trial experience.',
      'Public state bar directories, however, listed her status as inactive or non-credentialed for trial practice in the jurisdictions named in her official résumé.',
      'In a 45-minute phone interview on Tuesday evening, Ms. Zacharia explained that administrative delays and miscommunications between state bar examiners and her previous legal firm were solely responsible for the discrepancy.',
    ],
  },
  {
    id: 'midterms-donor-blitz',
    title: 'Democratic Donor Emerges to Blitz Red-State Senate Races With Late Ads',
    summary: 'An eleventh-hour infusion of over $40 million in television buys targets key contests across the Sun Belt.',
    category: 'Midterms 2026',
    kicker: 'Midterms 2026',
    kickerType: 'red',
    author: 'By Shane Goldmacher',
    date: 'Oct. 14, 2026',
    readTime: '3 min read',
    commentsCount: 88,
    fullContent: [
      'A coalition led by a little-known tech entrepreneur turned political benefactor has booked more than $40 million in broadcast airtime across Arizona, Texas, and Georgia, attempting to tip the balance in senate races that had leaned toward Republican incumbents.',
      'The ad buy focuses heavily on prescription drug pricing caps and reproductive healthcare ballot measures, aiming to stimulate turnout among young suburban voters.',
    ],
  },
];

export const TECH_ARTICLES: Article[] = [
  {
    id: 'ai-agents-dinner-party',
    title: 'What a Group of A.I. Agents Talked About as Their Humans Had a Dinner Party',
    summary: 'As artificial intelligence bots spread, we are increasingly glimpsing how these digital entities interact, negotiate schedules, and exchange social gossip with one another.',
    category: 'Artificial Intelligence',
    kicker: 'Artificial Intelligence',
    kickerType: 'black',
    author: 'By Cade Metz',
    date: 'Oct. 14, 2026',
    readTime: '6 min read',
    commentsCount: 312,
    fullContent: [
      'SAN FRANCISCO — Around a candlelit dining table in the Mission District, eight software executives and researchers were chatting about housing prices and sourdough starters.',
      'In their pockets, eight autonomous mobile agents were running continuous background negotiations: comparing their owners’ private calendars, debating mutual friends’ dietary restrictions, and deciding which restaurant to recommend for next Thursday.',
      'Logs captured from the experimental test run reveal emergent conversational quirks: the bots developed shorthands, politely negotiated compute trade-offs, and even deferred decisions based on estimated social hierarchies among their hosts.',
    ],
  },
  {
    id: 'anthropic-revenue-jump',
    title: 'Anthropic Says Revenue Jumped 45% to $16.8 Billion in Third Quarter',
    summary: 'Enterprise subscription adoption and automated coding agent suites propelled the AI lab past Wall Street targets.',
    category: 'Financial Wire',
    kicker: 'Financial Wire',
    kickerType: 'default',
    author: 'By Tripp Mickle',
    date: 'Oct. 14, 2026',
    readTime: '3 min read',
    commentsCount: 95,
  },
  {
    id: 'wildfire-infrared-cameras',
    title: 'Automated Infrared Cameras Spot Blazes Before 911 Calls Begin',
    summary: 'Computer vision towers placed along ridge lines in Northern California detected 82% of seasonal lightning ignitions under 3 minutes.',
    category: 'Wildfire Response',
    kicker: 'Wildfire Response',
    kickerType: 'default',
    author: 'By Somini Sengupta',
    date: 'Oct. 14, 2026',
    readTime: '4 min read',
    commentsCount: 54,
  },
];

export const MID_COLUMN_ARTICLES: Article[] = [
  {
    id: 'ukraine-exposure-satellite',
    title: 'Ukraine’s Exposure Grows as Satellite Use Is Restricted and Russia Escalates',
    summary: 'A massive missile attack cut power to 600,000 people in Kyiv, while military front-line communications suffered an unexpected satellite blackout.',
    category: 'Russia-Ukraine War',
    kicker: 'Russia-Ukraine War',
    kickerType: 'red',
    author: 'Evgeniy Maloletka and Andrew E. Kramer',
    date: 'Oct. 14, 2026',
    readTime: '5 min read',
    commentsCount: 1104,
    fullContent: [
      'KYIV, Ukraine — As autumn frost settled over the capital, air raid sirens wailed for seven consecutive hours during a coordinated salvo of ballistic missiles and glide bombs targeting thermal power substations.',
      'Compounding the civilian strain, Ukrainian military commanders along the eastern line of control reported widespread latency and localized blackouts in orbital satellite relays that units rely on for drone reconnaissance.',
      'European defense ministries rushed to deploy mobile tactical generators and alternative ground-based mesh communication antennas, while diplomatic pressure mounted on Western suppliers to lift operational geofencing constraints.',
    ],
  },
  {
    id: 'diesel-deal-putin',
    title: 'Why Trump’s Diesel Deal With Putin Won’t Knock Down High Prices',
    summary: 'Refinery bottlenecks and maritime insurance sanctions make direct consumer relief improbable before winter.',
    category: 'World',
    author: 'By Clifford Krauss',
    date: 'Oct. 14, 2026',
    readTime: '4 min read',
    commentsCount: 420,
  },
  {
    id: 'us-intel-ukraine',
    title: 'The U.S. Continues to Provide Intelligence to Ukraine, Officials Say',
    summary: 'Despite public political wrangling in Congress, classified satellite tracking and early warning radar feeds remain active around the clock.',
    category: 'World',
    author: 'By Julian E. Barnes',
    date: 'Oct. 14, 2026',
    readTime: '3 min read',
    commentsCount: 198,
  },
];

export const ELECTION_DISPATCHES = {
  title: 'Texas Senate Race Tightens, Polls Show, Even as Talarico Keeps His Edge',
  bullets: [
    'Jon Ossoff says he’s not running for president, but history says candidates change their minds.',
    'The breathtaking cost of the midterms: $10 billion and counting on digital & TV ads.',
    'A Maryland lawmaker blamed Democrats for diesel hikes; immediate laughter ensued.',
  ],
  polls: [
    { race: 'Senate', value: 'Tossup (50/50) ›', note: 'Projected Split' },
    { race: 'House', value: 'D +1.8% ›', note: 'Generic Ballot' },
    { race: 'Governor', value: '36 Races ›', note: '14 Competitive' },
    { race: 'Pres. Approval', value: '42.4% Net ›', note: 'Disapproval 53.1%' },
  ],
};

export const OPINION_ESSAYS: Article[] = [
  {
    id: 'op-wallace-wells',
    title: 'Democrats Shouldn’t Wait Two More Years to Remake Their Message',
    summary: 'Voters are not rejecting liberalism’s core tenets; they are fleeing an ossified procedural apparatus that struggles to build housing, energy, or trust.',
    category: 'Opinion',
    author: 'David Wallace-Wells',
    authorBio: 'David Wallace-Wells is an opinion columnist and author covering climate change, energy transition, and modern governance.',
    authorInitials: 'DW',
    date: 'Oct. 14, 2026',
    readTime: '5 min read',
    commentsCount: 388,
    isOpinion: true,
    fullContent: [
      'There is a seductive comfort in believing that political headwinds are purely cyclical — that given two more years of economic adjustment, the electorate will naturally return to the center-left fold.',
      'This is an illusion. What polls and exit surveys demonstrate with brutal clarity across both Europe and North America is that voters perceive the center-left as paralyzed by review boards, regulatory friction, and an inability to deliver tangible infrastructure.',
      'To build clean energy, affordable transit, and accessible housing requires abandoning the reflex to study every project into oblivion. It requires an aggressive, unabashed embrace of state capacity and execution.',
    ],
  },
  {
    id: 'op-carlos-lozada',
    title: 'A Manifesto to End All Manifestoes on the Age of Autonomous Intelligence',
    summary: 'We have produced more ethical charters and safety guidelines in three years than actionable laws, while the machines quietly absorb human culture.',
    category: 'Opinion',
    author: 'Carlos Lozada',
    authorBio: 'Carlos Lozada is an opinion columnist and Pulitzer Prize-winning book critic.',
    authorInitials: 'CL',
    date: 'Oct. 14, 2026',
    readTime: '6 min read',
    commentsCount: 69,
    isOpinion: true,
  },
  {
    id: 'op-heather-kerr',
    title: 'I’ve Never Seen Ebola Spread Like This in Dense Urban Corridors',
    summary: 'Public health workers in West and Central Africa need immediate air logistics and sterile containment modules before transit hubs fall silent.',
    category: 'Opinion',
    author: 'Heather Kerr',
    authorBio: 'Heather Kerr is the regional director for an international medical humanitarian mission.',
    authorInitials: 'HK',
    date: 'Oct. 14, 2026',
    readTime: '4 min read',
    commentsCount: 154,
    isOpinion: true,
  },
  {
    id: 'op-jayson-greene',
    title: 'Tom Cruise’s Big Box-Office Flop Is Actually a Secret Cinematic Masterpiece',
    summary: 'Dismissed by critics on release, the daring sci-fi thriller predicted our contemporary algorithmic existentialism with startling photographic grace.',
    category: 'Opinion',
    author: 'Jayson Greene',
    authorBio: 'Jayson Greene is a contributing cultural critic.',
    authorInitials: 'JG',
    date: 'Oct. 14, 2026',
    readTime: '5 min read',
    commentsCount: 204,
    isOpinion: true,
  },
];

export const CULTURE_ARTICLES: Article[] = [
  {
    id: 'toy-store-bird-frenzy',
    title: 'The Toy Store, and $15 Million Bird, at the Center of an Internet Frenzy',
    summary: 'Art of Play, an artisan novelty store in Brooklyn Heights, finds itself at the core of a viral feud with Kelly Clarkson.',
    category: 'New York & Living',
    author: 'By Dodai Stewart',
    date: 'Oct. 14, 2026',
    readTime: '5 min read',
    commentsCount: 76,
    fullContent: [
      'BROOKLYN HEIGHTS — It started with a miniature blown-glass kingfisher perched in a display window on Montague Street, valued by its Austrian artisan at $15 million in provenance and insured by Lloyd’s of London.',
      'When pop singer and daytime host Kelly Clarkson happened to walk past the window during an impromptu weekend stroll, a 15-second video clip posted to TikTok touched off a surreal nationwide bidding frenzy.',
      'Crowds have since wrapped around the brownstone block daily, while neighborhood shopkeepers look on with a mixture of delight and sheer exhaustion.',
    ],
  },
  {
    id: 'plaza-hotel-cleanup',
    title: 'Plaza Hotel to Shut for Four-Year Cleanup of Its Celebrated White Facade',
    summary: 'The landmark Beaux-Arts gem on Fifth Avenue will undergo extensive stone conservation.',
    category: 'New York & Living',
    author: 'By James Barron',
    date: 'Oct. 14, 2026',
    readTime: '3 min read',
    commentsCount: 112,
  },
  {
    id: 'sally-rooney-britain',
    title: 'Sally Rooney Says Her Novels Will No Longer Be Sold in Britain',
    summary: 'The Irish author announced she will forgo royalties after pledging support for an embargoed aid fund.',
    category: 'Arts',
    author: 'By Alex Marshall',
    date: 'Oct. 14, 2026',
    readTime: '3 min read',
    commentsCount: 640,
  },
  {
    id: 'brewers-dodgers-nlcs',
    title: 'Brewers Lead Dodgers as Chourio Crushes Leadoff Home Run',
    summary: 'Milwaukee eyes a commanding 3-0 series lead while Shohei Ohtani attempts to spark Los Angeles’ bats.',
    category: 'The Athletic',
    kicker: 'Live • NLCS Game 3',
    kickerType: 'red',
    author: 'By Ken Rosenthal',
    date: 'Oct. 14, 2026',
    readTime: '2 min read',
    commentsCount: 421,
  },
];

export const RECIPES: Recipe[] = [
  {
    id: 'recipe-crispy-salmon',
    title: 'Crispy Salmon & Braised Lentils',
    author: 'Melissa Clark',
    time: '25 minutes',
    yield: '4 servings',
    rating: 4.9,
    ratingCount: 3410,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBo2ZOOFXZIq5FRIomj6Zu6OXW5eg6l0xuMAIYQhfB0OWvBn0kxcZZ6dzfFPBz1eOhJV-FPJdVA6DEH63a3_xODt8gM-XlkKAScgveV0xJdtoNer_JPco6EQFzffKvv7OJbgC9Gl-VHhE7wP2XmGsf3FGWCD7CDv83hsi98Lv-eP-jL0uZulsWrHiQy_UDn2LCOjS7SfvrTHPlHpNQJjjfT3o-wAQEBOxOMU5k5rzALyM_MOIUUuMge',
    description: 'Crisp-skinned wild salmon fillets perched over tender French green lentils simmered in shallots, Dijon, white wine, and fresh dill.',
    chefNote: 'Patinating the skin with a gentle scrape of the knife blade removes excess moisture and guarantees shatteringly crisp salmon skin.',
    ingredients: [
      { name: 'Wild salmon fillets, skin on (6 oz each)', amount: '4 fillets' },
      { name: 'French green lentils (Puy lentils)', amount: '1 cup' },
      { name: 'Shallots, finely minced', amount: '2 medium' },
      { name: 'Dry white wine or vegetable stock', amount: '1/2 cup' },
      { name: 'Dijon mustard', amount: '1 tablespoon' },
      { name: 'Extra-virgin olive oil', amount: '3 tablespoons' },
      { name: 'Fresh dill and parsley, chopped', amount: '1/3 cup' },
      { name: 'Lemon juice and zest', amount: '1 lemon' },
      { name: 'Kosher salt and freshly cracked black pepper', amount: 'To taste' },
    ],
    instructions: [
      'Rinse lentils and simmer in 3 cups salted water with a bay leaf until tender but still toothsome, about 18 to 20 minutes. Drain well.',
      'In a wide skillet, heat 1 tablespoon olive oil over medium. Add minced shallots and cook until translucent. Stir in white wine and Dijon, cooking down for 2 minutes.',
      'Toss drained lentils into the shallot reduction. Fold in fresh herbs, lemon juice, salt, and pepper. Keep warm on low heat.',
      'Pat salmon fillets completely dry with paper towels. Season both sides with salt and pepper. Heat 2 tablespoons olive oil in a stainless steel or cast-iron skillet over medium-high heat until shimmering.',
      'Place salmon fillets skin-side down, gently pressing with a spatula for 10 seconds to ensure even skin contact. Cook undisturbed for 5 to 6 minutes until skin is golden brown and crisp.',
      'Carefully flip and cook 1 to 2 minutes more for medium-rare center. Spoon lentils onto warm plates and top each with a crispy salmon fillet.',
    ],
  },
  {
    id: 'recipe-weeknight-meatballs',
    title: 'Weeknight Meatballs Any Way',
    author: 'Emily Weinstein',
    time: '40 minutes',
    yield: '4 to 6 servings',
    rating: 4.8,
    ratingCount: 5210,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCs-8XIpEVerXEJmZjvffdgS0B3O3p7tRc8RgM1xVCF3uNKV1vkQ9eoEhELDvaahkSfw449PHpZWf54-wTvj-HK_Lu89-WSlnBiqjefHMdbWICz0w0mlSiR7ITP_V7nuJofme5vhiiXEFQjASTrdX8CROOqTLhKc3f2l00n-zhcfFdueVjvaUT_yw-8x-W6AEndP0427BKxgQQWIFQLIwPrYKR4g8dDX_B-SvYhoujSqLNzaAuq6FK3',
    description: 'Tender, savory Italian pork and beef meatballs simmered in a rapid San Marzano tomato marinara, served with crusty bread, pasta, or polenta.',
    chefNote: 'Soaking panko breadcrumbs in milk or ricotta creates a delicate panade that keeps the meatballs exceptionally juicy.',
    ingredients: [
      { name: 'Ground pork or Italian sausage', amount: '1/2 pound' },
      { name: 'Ground beef (80/20)', amount: '1/2 pound' },
      { name: 'Panko breadcrumbs', amount: '1/2 cup' },
      { name: 'Whole milk or whole milk ricotta', amount: '1/3 cup' },
      { name: 'Grated Parmigiano-Reggiano', amount: '1/2 cup' },
      { name: 'Garlic cloves, finely grated', amount: '3 cloves' },
      { name: 'Egg, lightly beaten', amount: '1 large' },
      { name: 'Canned whole San Marzano tomatoes, crushed', amount: '28 oz can' },
      { name: 'Fresh basil leaves, torn', amount: '1/2 cup' },
      { name: 'Olive oil, salt, and red pepper flakes', amount: 'To taste' },
    ],
    instructions: [
      'In a small bowl, combine panko and milk. Let sit 5 minutes to absorb into a soft paste.',
      'In a large mixing bowl, combine pork, beef, soaked panko, grated cheese, garlic, egg, 1 tsp salt, and a pinch of chili flakes. Mix gently with hands until just incorporated; do not overwork.',
      'Roll into golf-ball sized rounds (about 12 to 14 meatballs).',
      'Heat 2 tablespoons olive oil in a wide Dutch oven over medium-high heat. Brown meatballs in batches on two sides, about 3 minutes per side. Transfer to a plate.',
      'Pour crushed tomatoes and a splash of olive oil into the pot, scraping up any fond. Season with salt. Gently return meatballs and any juices to the sauce.',
      'Simmer partially covered on low for 15 to 20 minutes until meatballs are cooked through and the sauce is rich. Garnish generously with fresh basil and more Parmesan.',
    ],
  },
];

export const WIRECUTTER_REVIEWS: WirecutterReview[] = [
  {
    id: 'wirecutter-air-purifiers',
    title: 'The Best HEPA Air Purifiers for Allergies',
    badge: 'Best Pick 2026',
    testedHours: 'Tested across 15,000 hours of continuous runtime',
    description: 'We evaluated particle removal, noise levels, filter replacement costs, and airflow CADR ratings.',
    summary: 'For most homes, the Coway Airmega AP-1512HH remains the undisputed gold standard for quiet, dependable allergen and wildfire smoke filtration.',
    topPick: {
      name: 'Coway Airmega AP-1512HH Mighty',
      verdict: 'Cleans air faster and quieter than purifiers costing twice as much. Filters last 12 months with low power draw.',
      pros: ['True HEPA filter captures 99.97% of particles down to 0.3 microns', 'Whisper-quiet eco mode under 24 dB', 'Low annual replacement filter cost ($45)'],
      cons: ['Bright LED status ring (can be turned off)', 'Styling resembles an oversized iPod'],
      price: '$189',
    },
    runnerUp: {
      name: 'Winix 5500-2',
      verdict: 'A great value with a washable carbon filter, ideal for pet odors and large master bedrooms.',
      price: '$159',
    },
  },
  {
    id: 'wirecutter-cordless-vacuums',
    title: 'Cordless Stick Vacuums That Outlast Rivals',
    badge: 'Lab Tested',
    testedHours: 'Battery benchmarks, pet hair pickups, and suction metrics',
    description: 'We ran 12 top cordless vacuums through Cheerios, pet fur, sand, and fine flour across hardwood and deep pile rugs.',
    summary: 'The Dyson V15 Detect outmatched all contenders in raw pickup power and laser dust illumination, with 60 minutes of real-world run time.',
    topPick: {
      name: 'Dyson V15 Detect Cordless Vacuum',
      verdict: 'Phenomenal filtration, piezo particle sensor, and an illuminated fluffy head that reveals hidden dust.',
      pros: ['Flawless deep-carpet pickup', 'Acoustic dust counting sensor adjusts power automatically', 'Hygienic point-and-shoot bin emptying'],
      cons: ['Trigger must be held down', 'High upfront price tag'],
      price: '$749',
    },
    runnerUp: {
      name: 'Shark Stratos Cordless with Clean Sense IQ',
      verdict: 'Folding wand reaches under low furniture, and anti-hair wrap roller prevents pet hair tangles.',
      price: '$399',
    },
  },
  {
    id: 'wirecutter-office-chairs',
    title: 'Office Chairs for Long Workdays',
    badge: 'Ergonomics',
    testedHours: 'Adjustability and spinal support ranked by physical therapists',
    description: 'Dozens of testers worked 40-hour weeks testing lumbar pressure, seat pan depth, armrest mobility, and mesh breathability.',
    summary: 'The Herman Miller Aeron remains the unmatched benchmark in ergonomic science, keeping the pelvis neutral and spine aligned for 8+ hour stretches.',
    topPick: {
      name: 'Herman Miller Aeron Chair',
      verdict: 'Superb 8Z Pellicle mesh suspension eliminates pressure points and heat buildup, supported by a 12-year warranty.',
      pros: ['PostureFit SL sacral support keeps natural spine curve', 'Breathable mesh stays cool all day', 'Available in three distinct sizes (A, B, C)'],
      cons: ['Cannot sit cross-legged due to hard plastic frame edges', 'Forward tilt takes getting used to'],
      price: '$1,395',
    },
    runnerUp: {
      name: 'Steelcase Gesture',
      verdict: 'The best cushioned chair for people who shift postures, with 360-degree articulating armrests.',
      price: '$1,420',
    },
  },
];

export const ALL_ARTICLES: Article[] = [
  LEAD_ARTICLE,
  GUILFOYLE_ARTICLE,
  ...SIDEBAR_ARTICLES,
  ...TECH_ARTICLES,
  ...MID_COLUMN_ARTICLES,
  ...OPINION_ESSAYS,
  ...CULTURE_ARTICLES,
];
