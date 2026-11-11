import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import { FaLinkedin, FaUserCircle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// ============================================================
// TEAM DATA - Update with actual team member information
// ============================================================
// TO ADD YOUR PHOTO:
// 1. Save your photo as: frontend/public/images/team/firstname-lastname.jpg
//    (Example: aaron.jpg)
// 2. Change image: null to image: "/images/team/firstname-lastname.jpg"
// 3. See frontend/public/images/team/README.md for detailed instructions
// ============================================================
const TEAM_MEMBERS = [
  {
    id: "1",
    name: "Rohan Yelandur",
    role: "Co-President & Ambassador",
    bio: "Rohan is a 3rd year Computer Science major who loves competing in hackathons. He's excited to help students grow with Claude.",
    image: "/images/team/rohan.jpg",
    linkedin: "https://www.linkedin.com/in/rohan-yelandur/",
  },
  {
    id: "2",
    name: "Aaron Sulbaran",
    role: "Co-President & Ambassador",
    bio: "Aaron is a 4th year Electrical and Computer Engineering major with a passion for building cool projects. He is excited to be a part of the Claude Builder Club and help bring AI to the UT Austin community.",
    image: "/images/team/aaron.jpeg", // TO ADD PHOTO: Save as /frontend/public/images/team/aaron.jpg, then change to: "/images/team/aaron.jpg"
    linkedin: "https://www.linkedin.com/in/aaron-sulbaran/",
    x: "https://x.com/imaaronsulbaran",
  },
];

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image: string | null;
  linkedin?: string;
  x?: string;
}

const PREVIOUS_AMBASSADORS: TeamMember[] = [
  {
    id: "p1",
    name: "Jessica Zhu",
    role: "Previous ambassador",
    image: "/images/team/jessica.jpg",
    linkedin: "https://www.linkedin.com/in/jessica-zhu-/",
  },
  {
    id: "p2",
    name: "Tisha Chhatbar",
    role: "Previous ambassador",
    image: "/images/team/tisha.jpg",
    linkedin: "https://www.linkedin.com/in/tisha-chhatbar/",
  },
  {
    id: "p4",
    name: "Cesar Monagas Romero",
    role: "Previous ambassador",
    image: "/images/team/cesar.jpg",
    linkedin: "https://www.linkedin.com/in/cesarmonagasromero/",
  },
  {
    id: "p5",
    name: "Miranda Ye",
    role: "Previous ambassador",
    image: "/images/team/miranda.jpg",
    linkedin: "https://www.linkedin.com/in/miranda-ye/",
  },
  {
    id: "p3",
    name: "Vaishnuv Thiagarajan",
    role: "Previous ambassador",
    image: "/images/team/vaishnuv.jpg",
    linkedin: "https://www.linkedin.com/in/vaishnuv-thiagarajan/",
  },
];

function TeamCard({ member, className = "" }: { member: TeamMember; className?: string }) {
  return (
    <div className={`flex h-full flex-col rounded-xl bg-card p-5 sm:p-6 ${className}`}>
      {/* Profile Image */}
      <div className="mb-4 flex justify-center">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="h-24 w-24 rounded-full object-cover sm:h-32 sm:w-32"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-tan sm:h-32 sm:w-32">
            <FaUserCircle className="h-16 w-16 text-ink/30 sm:h-20 sm:w-20" />
          </div>
        )}
      </div>

      {/* Info grows to fill the card, so the social row sits at the same
          height on every card in a row, whatever the bio length. */}
      <div className="flex-1 text-center">
        <h3 className="text-xl text-ink">
          {member.name}
        </h3>
        <p className="mt-1 text-sm text-primary">
          {member.role}
        </p>
        {member.bio && (
          <p className="mt-3 text-[15px] text-subtle">
            {member.bio}
          </p>
        )}
      </div>

      {/* Social Links */}
      <div className="mt-5 flex justify-center gap-3">
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-tan"
            aria-label={`${member.name}'s LinkedIn`}
          >
            <FaLinkedin className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>
        )}
        {member.x && (
          <a
            href={member.x}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-tan"
            aria-label={`${member.name} on X`}
          >
            <FaXTwitter className="h-4 w-4" />
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

      <main className="flex-1 text-ink">
        <PageHeader
          title="Meet the team"
          intro="The Claude Ambassadors leading the Builder Club at UT Austin"
          field="tan"
          art="hands"
        />

        {/* Team Grid */}
        <section className="mx-auto max-w-3xl px-4 py-10 sm:px-8 sm:py-16">
          <div className="grid gap-6 sm:grid-cols-2">
            {TEAM_MEMBERS.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </section>

        <section className="px-4 pb-10 sm:px-8 sm:pb-16">
          <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-subtle">
            Questions about the club? Email us at{" "}
            <a href="mailto:claudeattexas@gmail.com" className="text-primary underline underline-offset-4">
              claudeattexas@gmail.com
            </a>
            .
          </p>
        </section>

        {/* Previous Ambassadors Section */}
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-8 sm:pb-16">
          <h2 className="mb-8 text-center text-2xl md:text-3xl">
            Previous ambassadors
          </h2>
          {/* Two centered rows: 2 on top, 3 below, so an odd count still reads as a pyramid */}
          <div className="flex flex-col gap-6">
            {[PREVIOUS_AMBASSADORS.slice(0, 2), PREVIOUS_AMBASSADORS.slice(2)].map((row) => (
              <div key={row[0].id} className="flex flex-wrap justify-center gap-6">
                {row.map((member) => (
                  <TeamCard
                    key={member.id}
                    member={member}
                    className="w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
                  />
                ))}
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
