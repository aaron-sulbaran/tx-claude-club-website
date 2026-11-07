import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import {
  FaInstagram,
  FaSlack,
  FaDiscord,
  FaLinkedin,
  FaEnvelope,
  FaFileAlt,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaUsers,
  FaGithub,
  FaTwitter,
  FaYoutube,
  FaLink,
} from "react-icons/fa";
import { IconType } from "react-icons";
import { LEADERSHIP_APPLICATION_URL } from "../lib/leadership";
import { MEMBERSHIP_FORM_URL } from "../lib/membership";

// ============================================================
// LINKS CONFIGURATION
// ============================================================
// To add a new link: Copy a link object and update the fields
// To hide a link: Set visible: false (keeps it in code for later)
// To archive a link: Move it to the ARCHIVED_LINKS array below
// ============================================================

interface LinkItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  icon: IconType;
  visible: boolean; // Set to false to hide without deleting
  category?: "social" | "form" | "resource" | "community";
}

const LINKS: LinkItem[] = [
  {
    id: "leadership-application",
    title: "Leadership applications open",
    description: "Apply to join the officer team",
    url: LEADERSHIP_APPLICATION_URL,
    icon: FaUsers,
    visible: true,
    category: "form",
  },
  {
    id: "membership-form",
    title: "Membership sign-up",
    description: "Join the Claude Builder Club",
    url: MEMBERSHIP_FORM_URL,
    icon: FaFileAlt,
    visible: true,
    category: "form",
  },
  {
    id: "events",
    title: "Upcoming events",
    description: "See what's happening",
    url: "/events",
    icon: FaCalendarAlt,
    visible: true,
    category: "resource",
  },
  {
    id: "instagram",
    title: "Instagram",
    description: "Follow us for updates and behind-the-scenes",
    url: "https://www.instagram.com/texasclaude",
    icon: FaInstagram,
    visible: true,
    category: "social",
  },
  {
    id: "email",
    title: "Contact us",
    description: "Reach out via email",
    url: "mailto:claudeattexas@gmail.com",
    icon: FaEnvelope,
    visible: true,
    category: "social",
  },
];

// ============================================================
// ARCHIVED LINKS
// Move old links here to keep them for reference without showing
// ============================================================
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ARCHIVED_LINKS: LinkItem[] = [
  // Example archived link:
  // {
  //   id: "old-form",
  //   title: "Fall 2025 Sign-Up",
  //   description: "No longer active",
  //   url: "https://old-form-url.com",
  //   icon: FaFileAlt,
  //   visible: false,
  //   category: "form",
  // },
];

function LinkCard({ link }: { link: LinkItem }) {
  const Icon = link.icon;
  const isExternal = link.url.startsWith("http") || link.url.startsWith("mailto");

  return (
    <a
      href={link.url}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-4 rounded-xl bg-card p-4 transition-colors hover:bg-tan sm:p-5"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-peach sm:h-14 sm:w-14">
        <Icon className="h-5 w-5 text-ink sm:h-6 sm:w-6" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-sans text-base font-medium text-ink">
          {link.title}
        </h3>
        {link.description && (
          <p className="mt-0.5 truncate text-sm text-subtle">
            {link.description}
          </p>
        )}
      </div>
      <FaExternalLinkAlt className="h-3 w-3 shrink-0 text-ink/60 sm:h-4 sm:w-4" />
    </a>
  );
}

export default function LinksPage() {
  // Filter to only show visible links
  const visibleLinks = LINKS.filter((link) => link.visible);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 text-ink">
        <PageHeader
          title="Links"
          intro="Quick access to all our resources, forms, and social media"
          field="peach"
          art="shapes"
        />

        {/* Links Grid */}
        <section className="mx-auto max-w-2xl px-4 py-8 sm:px-8 sm:py-12">
          {visibleLinks.length > 0 ? (
            <div className="flex flex-col gap-3 sm:gap-4">
              {visibleLinks.map((link) => (
                <LinkCard key={link.id} link={link} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-card p-8 text-center">
              <FaUsers className="mx-auto h-12 w-12 text-ink/20" />
              <p className="mt-4 text-subtle">
                Links coming soon! Check back later.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
