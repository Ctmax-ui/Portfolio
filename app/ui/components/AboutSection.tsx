import Link from "next/link";
import { FaPerson } from "react-icons/fa6";
import { MdOutlineOpenInNew } from "react-icons/md";



export default function AboutSection({
  name = "Debjeet Biswas",
  bio = `a passionate coder who finds joy in creating
technology that truly serves end users. Learning to code has
been my greatest achievement, as it empowers me to build
almost anything I imagine. I love diving into new technologies
and discovering their potential to solve real-world problems.`,
  contactInfo = {
    phone: "+(2) 870 174 302",
    languages: ["English", "Hindi", "Bengali"],
    github: "github.com/Ctmax-ui",
    currentlyLearning: "NextJS & Python",
    email: "workdebjeet@gmail.com",
  },
  statistics = [
    { value: "1+", label: "Years Of Experience" },
    { value: "5+", label: "Technologies" },
    { value: "50+", label: "Personal Projects" },
    { value: "100+", label: "Readed Books" },
  ],
}: {
  name?: string;
  bio?: string;
  contactInfo?: {
    phone: string;
    languages: string[];
    github: string;
    currentlyLearning: string;
    email: string;
  };
  statistics?: {
    value: string;
    label: string;
  }[];
}) {
  return (
    <div className=" px-6 py-12">
      <div className="">
        {/* About Me Label */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 backdrop-blur-sm mb-8">
          <div className="text-emerald-500 text-2xl">
            <FaPerson />
          </div>
          <span className="text-sm font-medium text-zinc-200">ABOUT ME</span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          About <span className="text-emerald-500">Me</span>
        </h2>

        {/* Bio */}
        <p className="text-slate-800 text-lg mb-8 text-wrap">
          Hi, my name is <span className=" font-semibold">{name}</span> {bio}
        </p>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-slate-900">
          <div className="space-y-4">
            {/* <div className="flex gap-4">
              <span className="">Phone</span>
              <span className="">:</span>
              <span className="text-">{contactInfo.phone}</span>
            </div> */}
            <div className="flex gap-4">
              <span className="">Language</span>
              <span className="">:</span>
              <span className="text-slate-900 font-semibold">
                {contactInfo?.languages.join(", ")}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="">GitHub</span>
              <span className="">:</span>
              <Link href={`https://www.${contactInfo?.github}`} className="text-blue-700 underline font-semibold flex gap-1 items-center flex-wrap text-wrap">{contactInfo?.github}<MdOutlineOpenInNew /></Link>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4">
              <span className="">Learning</span>
              <span className="">:</span>
              <span className="text-slate-900 font-semibold">{contactInfo?.currentlyLearning}</span>
            </div>
            <div className="flex gap-4">
              <span className="">Email</span>
              <span className="">:</span>
              <Link href={`mailto:${contactInfo.email}`} className="text-blue-700 font-semibold text-wrap">{contactInfo?.email}</Link>
              
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statistics?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-emerald-500 text-3xl md:text-4xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-slate-900 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
