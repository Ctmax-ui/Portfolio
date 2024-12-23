import Image from "next/image";
import Link from "next/link";
import { MdOutlineWork } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";

export interface projectTypes {
  id: string;
  title: string;
  category: string;
  image: string;
  link: string;
  liveDemoUrl?: string;
}

const ProjectsSection = () => {
  const projects: projectTypes[] = [
    {
      id: "1",
      title: "MERN User Auth",
      category: "Authentication  & Authorization",
      image: "/extra/advance-user-auth.png",
      link: "#",
      liveDemoUrl: "",
    },
    {
      id: "2",
      title: "Fishbone Digram",
      category: "Analysis Tool",
      image: "/extra/fishbone.png",
      link: "#",
    },
    {
      id: "3",
      title: "Mingle Movies",
      category: "Movie details Website",
      image: "/extra/minglemovies.png",
      link: "#",
    },
  ];

  return (
    <section className="px-6 py-6" id="projects">
      <div className="max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 backdrop-blur-sm mb-3">
          <MdOutlineWork className="w-4 h-4 text-emerald-500" />
          <span className="text-sm font-medium text-zinc-200">PORTFOLIO</span>
        </div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white ">
            Latest <span className="text-emerald-500">Projects</span>
          </h2>
          <Link
            href={"/projects"}
            className="py-3 px-5 bg-emerald-500 font-bold text-white flex justify-between items-center gap-2"
          >
            More Projects <FaArrowRightLong />
          </Link>
        </div>
        
        <div className="space-y-8">
          <Link href={projects[0].link} className="block group">
            <div className="relative ">
              <div className="aspect-[2/.98] rounded-2xl border border-zinc-800 relative p-2 overflow-hidden">
                <Image
                  src={projects[0].image}
                  alt={projects[0].title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105 object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="text-emerald-500 text-sm mb-2">
                      {projects[0].category}
                    </div>
                    <h3 className="text-white text-xl font-semibold">
                      {projects[0].title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.slice(1).map((project) => (
              <Link
                key={project.id}
                href={project.link}
                className="block group"
              >
                <div className="relative overflow-hidden rounded-xl border border-zinc-800">
                  <div className="aspect-[2/.98] relative">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105 "
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="text-emerald-500 text-sm mb-2">
                          {project.category}
                        </div>
                        <h3 className="text-white text-lg font-semibold">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 mb-3 text-center">
          <Link
            href={"/projects"}
            className=" text-emerald-500 hover:bg-emerald-500 hover:text-white px-8 py-2 outline border-2 border-emerald-500 hover:border-emerald-500 transition-all outline-none font-semibold "
          >
            More Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
