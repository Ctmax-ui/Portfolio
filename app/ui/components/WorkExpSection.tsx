import { IoDocumentText } from "react-icons/io5";

export default function WorkExperienceSection() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentDate = new Date();
  const experiences: {
    company: string;
    period: string;
    title: string;
    description: string;
  }[] = [
    {
      company: "Maybe Your Company.",
      period: `${months[currentDate.getMonth()]} ${currentDate.getFullYear()} - Ꝏ`,
      title: "Full Stack Web Developer, MERN STACK, ETC.",
      description: "My skills aren't just for show, They will significantly benefit your team.",
    },
    {
      company: "W3 Web School.",
      period: "June 2023 - June 2024",
      title: "Full Stack Web Developer Intern.",
      description:
        "Learning to code is one of my greatest achievements, equipping me with valuable skills and opening doors for growth. It has taught me to think critically, solve problems, and embrace continuous learning.",
    },
    {
      company: "Ray Computer.",
      period: "2022 - 2023",
      title: "L1 Desktop Eupport Engineer.",
      description: "learned Computer-hardware, Os, Software.",
    },
  ];

  return (
    <section className="px-6 py-5" id="resume">
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 backdrop-blur-sm mb-3 dark:bg-slate-100">
          <IoDocumentText className="w-4 h-4 text-emerald-500" />
          <span className="text-sm font-medium text-zinc-200 dark:text-black">RESUME</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-emerald-500 mb-3">
          <span className="text-black dark:text-white">Work</span> Experience
        </h2>

        <div className="relative space-y-8">
          <div className="absolute left-[7px] top-[7px] bottom-[7px] w-[2px] bg-zinc-800" />

          {experiences.map((experience, index) => (
            <div
              key={index}
              className="relative grid grid-cols-[auto,1fr] gap-6 md:gap-8"
            >
              <div className="relative">
                <div className="w-4 h-4 rounded-full bg-zinc-950 border-2 border-emerald-500" />
              </div>

              <div className="space-y-2">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {experience.company}
                  </h3>
                  <span className="text-slate-800 dark:text-slate-300 text-sm">
                    {experience.period}
                  </span>
                </div>

                <h4 className="text-lg font-medium text-emerald-500">
                  {experience.title}
                </h4>
                <p className="text-slate-800 dark:text-slate-200">{experience.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
