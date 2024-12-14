import ProjectCard from "../ui/components/ProjectCard"

type Project = {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  link: string
}

const projects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A full-featured online store built with Next.js and Stripe integration.',
    image: '/placeholder.svg?height=200&width=300',
    tags: ['Next.js', 'React', 'Stripe', 'Tailwind CSS'],
    link: 'https://example.com/ecommerce'
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A Trello-like application for managing tasks and projects.',
    image: '/placeholder.svg?height=200&width=300',
    tags: ['React', 'Redux', 'Node.js', 'MongoDB'],
    link: 'https://example.com/taskmanager'
  },
  {
    id: '3',
    title: 'Weather Forecast Dashboard',
    description: 'Real-time weather information with interactive maps and charts.',
    image: '/placeholder.svg?height=200&width=300',
    tags: ['React', 'D3.js', 'OpenWeatherMap API'],
    link: 'https://example.com/weather'
  },
  {
    id: '4',
    title: 'Social Media Analytics Tool',
    description: 'Analyze and visualize social media engagement and growth metrics.',
    image: '/placeholder.svg?height=200&width=300',
    tags: ['Python', 'Django', 'React', 'Chart.js'],
    link: 'https://example.com/socialanalytics'
  }
]
const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">My Project Showcase</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default page