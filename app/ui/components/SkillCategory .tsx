import Image from "next/image"

interface SkillCategory {
  icon: React.ReactNode
  title: string
  skills: {
    name: string
    logo: string
  }[]
}

export default function SkillsSection() {
  const skillCategories: SkillCategory[] = [
    {
      icon: <p>👨‍💻</p>,
      title: "Programming and Markup Languages",
      skills: [
        { name: "HTML5", logo: "/logos/html.svg" },
        { name: "CSS3", logo: "/logos/css.svg" },
        { name: "JavaScript", logo: "/logos/javascript.svg" },
        { name: "Python", logo: "/logos/python.svg" },
        { name: "PHP", logo: "/logos/php.svg" },
      ]
    },
    {
      icon: <p>🧰</p>,
      title: "Frameworks and Libraries",
      skills: [
        { name: "nodeJS", logo: "/logos/nodejs.svg" },
        { name: "React", logo: "/logos/react.svg" },
        { name: "nextJS", logo: "/logos/nextjs.svg" },
        { name: "npm", logo: "/logos/npm.svg" },
        { name: "Tailwind", logo: "/logos/tailwind.svg" },
        { name: "Sass", logo: "/logos/sass.svg" },
        { name: "Bootstrap", logo: "/logos/bs.svg" },
        { name: "jQuery", logo: "/logos/jq.svg" },
        { name: "Laravel", logo: "/logos/laravel.svg" },
      ]
    },
    {
      icon: <p>💻</p>,
      title: "Software and Tools",
      skills: [
        { name: "Git", logo: "/logos/git.svg" },
        { name: "GitHub", logo: "/logos/github.svg" },
        { name: "VS Code", logo: "/logos/vscode.svg" },
        { name: "Notion", logo: "/logos/notion.svg" },
        { name: "Wordpress", logo: "/logos/wordpress.svg" },
        { name: "Figma", logo: "/logos/figma.svg" },
        { name: "Canva", logo: "/logos/canva.svg" }
      ]
    },
    {
      icon: <p>🌐</p>,
      title: "Database & Cloud Hostings",
      skills: [
        { name: "MongoDB", logo: "/logos/mongodb.svg" },
        { name: "MySQL", logo: "/logos/mysql.svg" },
        { name: "Vercel", logo: "/logos/vercel.svg" },
        { name: "Render", logo: "/logos/renderco.jpg" },

      ]
    }
  ]

  return (
    <section className=" px-6 py-4" id="skills">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-emerald-500 mb-5"><span className="text-black dark:text-white">My</span> Advantages</h2>
        
        <div className="space-y-6">
          {skillCategories.map((category, index) => (
            <div key={index}>
              <div className="flex items-center gap-3 mb-3">
                {category.icon}
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                  {category.title}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="group relative border border-transparent bg-zinc-900/50 dark:bg-transparrent dark:border-white dark:bg-slate-200 backdrop-blur-sm rounded-lg transition-transform hover:-translate-y-1 h-[60px] w-[60px]"
                  >
                    <div className="aspect-square relative flex items-center justify-center ">
                      {/* Logo container with hover effect */}
                      <div className="reative w-10 h-10 transition-all duration-300 group-hover:scale-110 flex items-center justify-center">
                        <Image
                          src={skill.logo}
                          alt={`${skill.name} logo`}
                          width={100}
                          height={100}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      
                      {/* Tooltip */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-zinc-800 text-zinc-200 text-xs py-1 px-2 rounded whitespace-nowrap">
                          {skill.name}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

