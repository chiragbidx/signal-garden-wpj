// ─── Hero ───────────────────────────────────────────────────────────────────
export type HeroContent = {
  badgeInner: string;
  badgeOuter: string;
  titleBefore: string;
  titleHighlight: string;
  titleAfter: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  heroImageLight: string;
  heroImageDark: string;
  heroImageAlt: string;
};

// ─── Sponsors ───────────────────────────────────────────────────────────────
export type SponsorItem = { icon: string; name: string };
export type SponsorsContent = {
  heading: string;
  items: SponsorItem[];
};

// ─── Benefits ───────────────────────────────────────────────────────────────
export type BenefitItem = { icon: string; title: string; description: string };
export type BenefitsContent = {
  eyebrow: string;
  heading: string;
  description: string;
  items: BenefitItem[];
};

// ─── Feature Grid ───────────────────────────────────────────────────────────
export type FeatureItem = { icon: string; title: string; description: string };
export type FeaturesContent = {
  eyebrow: string;
  heading: string;
  subtitle: string;
  items: FeatureItem[];
};

// ─── Services ───────────────────────────────────────────────────────────────
export type ServiceItem = { title: string; description: string; pro: boolean };
export type ServicesContent = {
  eyebrow: string;
  heading: string;
  subtitle: string;
  items: ServiceItem[];
};

// ─── Testimonials ───────────────────────────────────────────────────────────
export type TestimonialItem = {
  image: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
};
export type TestimonialsContent = {
  eyebrow: string;
  heading: string;
  reviews: TestimonialItem[];
};

// ─── Team ───────────────────────────────────────────────────────────────────
export type SocialLink = { name: string; url: string };
export type TeamMember = {
  imageUrl: string;
  firstName: string;
  lastName: string;
  positions: string[];
  socialNetworks: SocialLink[];
};
export type TeamContent = {
  eyebrow: string;
  heading: string;
  members: TeamMember[];
};

// ─── Pricing ────────────────────────────────────────────────────────────────
export type PricingPlan = {
  title: string;
  popular: boolean;
  price: number;
  description: string;
  buttonText: string;
  benefits: string[];
};
export type PricingContent = {
  eyebrow: string;
  heading: string;
  subtitle: string;
  priceSuffix: string;
  plans: PricingPlan[];
};

// ─── Contact ────────────────────────────────────────────────────────────────
export type ContactInfoBlock = { label: string; value: string | string[] };
export type ContactContent = {
  eyebrow: string;
  heading: string;
  description: string;
  mailtoAddress: string;
  info: {
    address: ContactInfoBlock;
    phone: ContactInfoBlock;
    email: ContactInfoBlock;
    hours: ContactInfoBlock;
  };
  formSubjects: string[];
  formSubmitLabel: string;
};

// ─── FAQ ────────────────────────────────────────────────────────────────────
export type FaqItem = { question: string; answer: string };
export type FaqContent = {
  eyebrow: string;
  heading: string;
  items: FaqItem[];
};

// ─── Footer ─────────────────────────────────────────────────────────────────
export type FooterLink = { label: string; href: string };
export type FooterColumn = { heading: string; links: FooterLink[] };
export type FooterContent = {
  brandName: string;
  columns: FooterColumn[];
  copyright: string;
  attribution: { label: string; href: string };
};

// ─── Navbar ─────────────────────────────────────────────────────────────────
export type NavRoute = { href: string; label: string };
export type NavFeature = { title: string; description: string };
export type NavbarContent = {
  brandName: string;
  routes: NavRoute[];
  featureDropdownLabel: string;
  featureImage: { src: string; alt: string };
  features: NavFeature[];
  signInLabel: string;
  signUpLabel: string;
  dashboardLabel: string;
  githubLink: { href: string; ariaLabel: string };
};

// ─── Root ───────────────────────────────────────────────────────────────────
export type HomeContent = {
  hero: HeroContent;
  sponsors: SponsorsContent;
  benefits: BenefitsContent;
  features: FeaturesContent;
  services: ServicesContent;
  testimonials: TestimonialsContent;
  team: TeamContent;
  pricing: PricingContent;
  contact: ContactContent;
  faq: FaqContent;
  footer: FooterContent;
  navbar: NavbarContent;
};

// ─── Defaults ───────────────────────────────────────────────────────────────

export const defaultHomeContent: HomeContent = {
  // ── Hero ─────────────────────────────────────────────────────────────────
  hero: {
    badgeInner: "Now Streaming",
    badgeOuter: "StreamPilot is live",
    titleBefore: "Discover, organize and",
    titleHighlight: "pilot your streaming",
    titleAfter: "adventure together",
    subtitle:
      "Your team's personal dashboard for browsing, curating, and tracking movies and series across the world’s best streaming platforms.",
    primaryCta: { label: "Start Curating", href: "#library" },
    secondaryCta: { label: "See the library", href: "#library" },
    heroImageLight: "/hero-image-light.jpeg",
    heroImageDark: "/hero-image-dark.jpeg",
    heroImageAlt: "StreamPilot dashboard preview",
  },

  // ── Sponsors ─────────────────────────────────────────────────────────────
  sponsors: {
    heading: "Built with trusted tools",
    items: [
      { icon: "Film", name: "TMDb" },
      { icon: "Crown", name: "Vercel" },
      { icon: "Play", name: "Next.js" },
      { icon: "Clapboard", name: "Railway" },
      { icon: "Puzzle", name: "Postgres" },
      { icon: "Vegan", name: "Stripe" },
      { icon: "Ghost", name: "OpenAI" },
    ],
  },

  // ── Benefits ─────────────────────────────────────────────────────────────
  benefits: {
    eyebrow: "Why StreamPilot",
    heading: "Entertainment, organized for you and your team",
    description:
      "StreamPilot lets individuals and teams collaboratively discover, organize, and track the best movies and series with a slick, intuitive interface.",
    items: [
      {
        icon: "Search",
        title: "Universal Discovery",
        description:
          "Search and add movies or series from a global database with rich metadata.",
      },
      {
        icon: "Bookmark",
        title: "All Your Shows, One Place",
        description:
          "Centralize your watchlist and reviews—never lose track of what you or your team want to stream next.",
      },
      {
        icon: "Users",
        title: "Collaborate & Curate",
        description:
          "Rate, review, and mark watched status together—all updates are team-scoped by default.",
      },
      {
        icon: "Wand2",
        title: "Personal & Team Tracking",
        description:
          "Every user can track what they’ve seen, leave reviews, and see team-wide activity at a glance.",
      },
    ],
  },

  // ── Features ─────────────────────────────────────────────────────────────
  features: {
    eyebrow: "Features",
    heading: "Everything you need to curate together",
    subtitle:
      "Modern dashboard, fast search, one-click additions, and private team collaboration. All in one place.",
    items: [
      {
        icon: "ClipboardList",
        title: "Team Library",
        description: "Create a shared library for your team with organization and filter tools.",
      },
      {
        icon: "Star",
        title: "Ratings & Reviews",
        description: "Rate and leave short reviews on any movie or series—see team and individual ratings.",
      },
      {
        icon: "CheckCircle2",
        title: "Watched Tracking",
        description: "Mark titles as watched/unwatched and see your personal progress.",
      },
      {
        icon: "SlidersHorizontal",
        title: "Sort & Filter",
        description: "Organize by title, date, status, or average team rating.",
      },
      {
        icon: "Rocket",
        title: "Fast Search",
        description: "Powerful public search for movies and series—add any title with one click.",
      },
      {
        icon: "Cloud",
        title: "Cloud Synced",
        description: "Your data is always up to date and accessible by your team anywhere.",
      },
    ],
  },

  // ── Services ─────────────────────────────────────────────────────────────
  services: {
    eyebrow: "Services",
    heading: "What sets StreamPilot apart",
    subtitle:
      "Focused on simplicity, speed, and collaborative enjoyment. Organize your entertainment life, solo or with a team.",
    items: [
      { title: "Easy Movie & Series Search", description: "Quickly find any title—add to your team's library instantly.", pro: false },
      { title: "Watched Tracking per User", description: "Keep an accurate log of what every team member has watched.", pro: false },
      { title: "Collaborative Reviews", description: "Share thoughts, record ratings, and see what your teammates recommend.", pro: false },
      { title: "Data Privacy", description: "Your team’s data stays private—visible only to members.", pro: true },
    ],
  },

  // ── Testimonials ─────────────────────────────────────────────────────────
  testimonials: {
    eyebrow: "Testimonials",
    heading: "Why teams love StreamPilot",
    reviews: [
      {
        image: "/demo-img.jpg",
        name: "Priya Talwar",
        role: "Movie Nights Organizer",
        comment: "StreamPilot has become the hub for our friend group's weekly streaming picks. The shared ratings and feedback are so helpful.",
        rating: 5.0,
      },
      {
        image: "/demo-img.jpg",
        name: "Lucas Green",
        role: "Startup CTO",
        comment: "Our team used to share shows in chat. Now it’s all tracked—and reviewing what’s watched is as easy as it should be.",
        rating: 4.9,
      },
      {
        image: "/demo-img.jpg",
        name: "Allison Zhang",
        role: "Club Coordinator",
        comment: "No more double-watching. The watched/unwatched filter is my favorite StreamPilot feature!",
        rating: 4.8,
      },
      {
        image: "/demo-img.jpg",
        name: "Mohammed El-Sayed",
        role: "Product Engineer",
        comment: "It finally feels like we have a dashboard as polished as our favorite streaming platforms.",
        rating: 5.0,
      },
    ],
  },

  // ── Team ─────────────────────────────────────────────────────────────────
  team: {
    eyebrow: "Team",
    heading: "Meet the StreamPilot team",
    members: [
      {
        imageUrl: "/team1.jpg",
        firstName: "Chirag",
        lastName: "Dodiya",
        positions: ["Founder", "Product Architect"],
        socialNetworks: [
          { name: "LinkedIn", url: "https://www.linkedin.com/in/chiragdodiya/" },
          { name: "Github", url: "https://github.com/chiragdodiya" },
        ],
      },
      // Keep or adjust additional members as relevant
      {
        imageUrl: "/team2.jpg",
        firstName: "Sofia",
        lastName: "Green",
        positions: ["UI Engineer"],
        socialNetworks: [
          { name: "LinkedIn", url: "https://www.linkedin.com/" },
        ],
      },
      {
        imageUrl: "/team3.jpg",
        firstName: "Rahul",
        lastName: "Mehra",
        positions: ["Backend Lead"],
        socialNetworks: [
          { name: "Github", url: "https://github.com/" },
        ],
      },
    ],
  },

  // ── Pricing ──────────────────────────────────────────────────────────────
  pricing: {
    eyebrow: "Pricing",
    heading: "Plans for every streamer",
    subtitle: "StreamPilot is free while in beta. Paid team plans coming soon with more collaboration features.",
    priceSuffix: "/month",
    plans: [
      {
        title: "Free",
        popular: true,
        price: 0,
        description: "No limits for individuals or small teams during beta.",
        buttonText: "Start free",
        benefits: [
          "Unlimited titles",
          "Team dashboard",
          "Movie/series search",
          "Watched tracking",
          "Ratings & reviews",
        ],
      },
    ],
  },

  // ── Contact ──────────────────────────────────────────────────────────────
  contact: {
    eyebrow: "Contact",
    heading: "Say hello to the StreamPilot crew",
    description:
      "Questions, feedback, or partnership inquiries? Reach out anytime—we love talking all things streaming.",
    mailtoAddress: "hi@chirag.co",
    info: {
      address: { label: "Base", value: "Remote-first • Worldwide" },
      phone: { label: "Phone", value: "" },
      email: { label: "Email", value: "hi@chirag.co" },
      hours: { label: "Availability", value: ["Mon - Fri", "10AM - 8PM"] },
    },
    formSubjects: [
      "StreamPilot Demo",
      "Feature Request",
      "Streaming API Integration",
      "Support",
    ],
    formSubmitLabel: "Send message",
  },

  // ── FAQ ──────────────────────────────────────────────────────────────────
  faq: {
    eyebrow: "FAQ",
    heading: "Frequently Asked Questions",
    items: [
      {
        question: "Is StreamPilot really free?",
        answer: "Yes! While in beta, all features are available at no cost.",
      },
      {
        question: "Can my teammates join the same library?",
        answer: "Of course! Invite them to your team and build your shared collection together.",
      },
      {
        question: "What streaming platforms are supported?",
        answer: "StreamPilot is API-based—add and track anything discoverable via TMDb.",
      },
      {
        question: "How is my data secured?",
        answer: "All team data and collections are private by default—no sharing outside your invited members.",
      },
    ],
  },

  // ── Footer ───────────────────────────────────────────────────────────────
  footer: {
    brandName: "StreamPilot",
    columns: [
      {
        heading: "Contact",
        links: [
          { label: "hi@chirag.co", href: "mailto:hi@chirag.co" },
          { label: "GitHub", href: "https://github.com/chiragdodiya" },
        ],
      },
      {
        heading: "Product",
        links: [
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "Contact", href: "#contact" },
        ],
      },
      {
        heading: "Help",
        links: [
          { label: "FAQ", href: "#faq" },
          { label: "Docs", href: "https://nextjs.org/docs" },
        ],
      },
      {
        heading: "Socials",
        links: [
          { label: "GitHub", href: "https://github.com/chiragdodiya" },
        ],
      },
    ],
    copyright: "\u00a9 2026 StreamPilot.",
    attribution: { label: "Built on Next.js", href: "https://nextjs.org" },
  },

  // ── Navbar ───────────────────────────────────────────────────────────────
  navbar: {
    brandName: "StreamPilot",
    routes: [
      { href: "/#testimonials", label: "Testimonials" },
      { href: "/#team", label: "Team" },
      { href: "/#contact", label: "Contact" },
      { href: "/#faq", label: "FAQ" },
    ],
    featureDropdownLabel: "Key Features",
    featureImage: { src: "/demo-img.jpg", alt: "StreamPilot preview" },
    features: [
      {
        title: "Search & Add",
        description: "Lightning-fast movie and series discovery from global sources.",
      },
      {
        title: "Team Collaboration",
        description: "Curate, comment, and rate titles together in a team dashboard.",
      },
      {
        title: "Watched & Ratings",
        description: "Mark progress and see the team’s aggregate recommendations.",
      },
    ],
    signInLabel: "Sign in",
    signUpLabel: "Sign up",
    dashboardLabel: "My Dashboard",
    githubLink: {
      href: "https://github.com/chiragdodiya/streampilot",
      ariaLabel: "View StreamPilot GitHub",
    },
  },
};

export function getHomeContent(): HomeContent {
  return defaultHomeContent;
}