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
    { value: "1y+", label: "Total Work Experience." },
    { value: "4+", label: "Freelancing Works." },
    { value: "50+", label: "Personal Projects." },
    { value: "100+", label: "Readed Books." },
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
    <section className=" px-6 py-12 cursor-default" id="about">
      <div className="">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full dark:bg-slate-100 bg-zinc-900/50 backdrop-blur-sm mb-8">
          <div className="text-emerald-500 text-2xl">
            <FaPerson />
          </div>
          <span className="text-sm font-medium dark:text-slate-900 text-zinc-200">ABOUT ME</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-emerald-500 mb-6">
          <span className="text-black dark:text-white">About</span> Me
        </h2>
        <p className="text-slate-800 text-lg mb-8 text-wrap dark:text-slate-200">
          Hi, my name is <span className=" font-semibold">{name}</span> {bio}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-slate-900">
          <div className="space-y-4">
            <div className="flex gap-4">
              <span className="dark:text-white">Language</span>
              <span className="">:</span>
              <span className="text-slate-900 font-semibold dark:text-white">
                {contactInfo?.languages.join(", ")}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="dark:text-white">GitHub</span>
              <span className="">:</span>
              <Link href={`https://www.${contactInfo?.github}`} className="text-blue-700 underline font-semibold flex gap-1 items-center flex-wrap text-wrap">{contactInfo?.github}<MdOutlineOpenInNew /></Link>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4">
              <span className="dark:text-white">Learning</span>
              <span className="">:</span>
              <span className="text-slate-900 font-semibold dark:text-slate-200">{contactInfo?.currentlyLearning}</span>
            </div>
            <div className="flex gap-4">
              <span className="dark:text-white">Email</span>
              <span className="">:</span>
              <Link href={`mailto:${contactInfo.email}`} className="text-blue-700 font-semibold text-wrap">{contactInfo?.email}</Link>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statistics?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-emerald-500 text-3xl md:text-4xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-slate-900 text-sm dark:text-white">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
