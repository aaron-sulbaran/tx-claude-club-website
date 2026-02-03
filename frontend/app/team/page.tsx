import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaLinkedin, FaEnvelope, FaUserCircle } from "react-icons/fa";

// ============================================================
// TEAM DATA - Update with actual team member information
// ============================================================
// TO ADD YOUR PHOTO:
// 1. Save your photo as: frontend/public/images/team/firstname-lastname.jpg
//    (Example: aaron-sulbaran.jpg)
// 2. Change image: null to image: "/images/team/firstname-lastname.jpg"
// 3. See frontend/public/images/team/README.md for detailed instructions
// ============================================================
const TEAM_MEMBERS = [
  {
    id: "1",
    name: "Aaron Sulbaran",
    role: "Ambassador",
    bio: "Aaron is a 3rd Year Electrical and Computer Engineering major with a passion for building cool projects. He is excited to be a part of the Claude Builder Club and help bring AI to the UT Austin community.",
    image: "/images/team/aaron-sulbaran.jpeg", // TO ADD PHOTO: Save as /frontend/public/images/team/aaron-sulbaran.jpg, then change to: "/images/team/aaron-sulbaran.jpg"
    linkedin: "https://www.linkedin.com/in/aaron-sulbaran/",
    email: "aaronsulbaran@utexas.edu",
  },
  {
    id: "2",
    name: "Jessica Zhu",
    role: "Ambassador",
    bio: "Brief bio about this team member and their involvement with the club.",
    image: null, // TO ADD PHOTO: Save as /frontend/public/images/team/jessica-zhu.jpg, then change to: "/images/team/jessica-zhu.jpg"
    linkedin: "https://www.linkedin.com/in/jessica-zhu-/",
    email: "email@utexas.edu",
  },
  {
    id: "3",
    name: "Rohan Yelandur",
    role: "Ambassador",
    bio: "Rohan is a 2nd year Coputer Science major who loves competing in hackathons. He's excited to help students grow with Claude.",
    image: "/images/team/rohan.jpg",
    linkedin: "https://www.linkedin.com/in/rohan-yelandur/",
    email: "rohan.yelandur@utexas.edu",
  },
  {
    id: "4",
    name: "Tisha Chhatbar",
    role: "Ambassador",
    bio: "Brief bio about this team member and their involvement with the club.",
    image: null, // TO ADD PHOTO: Save as /frontend/public/images/team/tisha-chhatbar.jpg, then change to: "/images/team/tisha-chhatbar.jpg"
    linkedin: "https://www.linkedin.com/in/tisha-chhatbar/",
    email: "email@utexas.edu",
  },
];

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string | null;
  linkedin?: string;
  email?: string;
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="group rounded-xl border border-muted/20 bg-surface p-4 shadow-sm transition-all hover:border-primary/30 hover:shadow-md sm:p-6">
      {/* Profile Image */}
      <div className="mb-4 flex justify-center">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="h-24 w-24 rounded-full object-cover ring-2 ring-muted/20 transition-all group-hover:ring-primary/30 sm:h-32 sm:w-32"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-cream ring-2 ring-muted/20 transition-all group-hover:ring-primary/30 sm:h-32 sm:w-32">
            <FaUserCircle className="h-16 w-16 text-primary/40 sm:h-20 sm:w-20" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="text-center">
        <h3 className="text-base font-bold text-foreground sm:text-lg">
          {member.name}
        </h3>
        <p className="mt-1 text-xs font-medium text-primary sm:text-sm">
          {member.role}
        </p>
        <p className="mt-2 text-xs text-foreground/60 sm:mt-3 sm:text-sm">
          {member.bio}
        </p>
      </div>

      {/* Social Links */}
      <div className="mt-4 flex justify-center gap-3">
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-muted/10 text-foreground/50 transition-colors hover:bg-primary/10 hover:text-primary"
            aria-label={`${member.name}'s LinkedIn`}
          >
            <FaLinkedin className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>
        )}
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-muted/10 text-foreground/50 transition-colors hover:bg-primary/10 hover:text-primary"
            aria-label={`Email ${member.name}`}
          >
            <FaEnvelope className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>
        )}
      </div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Hero */}
        <section className="border-b border-muted/20 bg-surface px-4 py-10 text-center sm:px-8 sm:py-16 md:py-20">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            Meet the Team
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-foreground/70 sm:mt-6 sm:text-base md:text-lg">
            The Claude Ambassadors leading the Builder Club at UT Austin
          </p>
        </section>

        {/* Team Grid */}
        <section className="mx-auto max-w-5xl px-4 py-10 sm:px-8 sm:py-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM_MEMBERS.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </section>

        {/* Join the Team CTA */}
        <section className="border-t border-muted/20 bg-cream/50 px-4 py-10 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-xl font-bold text-foreground sm:text-2xl md:text-3xl">
              Want to Get Involved?
            </h2>
            <p className="mt-3 text-sm text-foreground/70 sm:mt-4 sm:text-base">
              We&apos;re always looking for passionate students to help grow the Claude
              Builder Club. Reach out if you&apos;re interested in joining the team!
            </p>
            <a
              href="mailto:claudeattexas@gmail.com"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark sm:mt-8 sm:px-8 sm:py-3 sm:text-base"
            >
              <FaEnvelope className="h-4 w-4" />
              Contact Us
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
