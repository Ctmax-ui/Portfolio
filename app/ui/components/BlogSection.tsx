import { FaGlobe } from "react-icons/fa";
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export interface BlogPost {
    id:string,title:string,excerpt:string,date:string,image:string,slug:string
}


export default function BlogSection() {
  const posts: BlogPost[] = [
    {
      id: '1',
      title: 'Elevate your mornings with perfectly brewed coffee',
      excerpt: 'I design products that are more than pretty. I make them shippable and usable.',
      date: '2024-05-15',
      image: '/placeholder.svg?height=200&width=300',
      slug: 'perfectly-brewed-coffee'
    },
    {
      id: '2',
      title: 'Mastering the clock: A guide to time management',
      excerpt: 'I design products that are more than pretty. I make them shippable and usable.',
      date: '2024-05-10',
      image: '/placeholder.svg?height=200&width=300',
      slug: 'time-management-guide'
    },
    {
      id: '3',
      title: 'Homeward bound: Crafting a productive home office',
      excerpt: 'I design products that are more than pretty. I make them shippable and usable.',
      date: '2024-05-05',
      image: '/placeholder.svg?height=200&width=300',
      slug: 'productive-home-office'
    }
  ]

  return (
    <section className="px-5 py-5" id="blog">
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 backdrop-blur-sm mb-4">
          <FaGlobe className="w-4 h-4 text-emerald-500" />
          <span className="text-sm font-medium text-zinc-200">BLOG</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
          Latest <span className="text-emerald-500">Insights</span>
        </h2>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blogs/${post.slug}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 ">
                <div className="grid md:grid-cols-[200px,1fr] gap-6 p-6">
                  <div className="relative aspect-[3/2] md:aspect-square overflow-hidden rounded-lg border">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-col justify-center">
                    <div className="text-sm text-slate-900 mb-2">
                      {formatDate(post.date)}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-500 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-slate-200 mb-4">{post.excerpt}</p>
                    <button
                      className="text-white border w-fit px-3 py-2 h-auto font-semibold hover:text-emerald-400 hover:no-underline"
                    >
                      Read More...
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
          href={'/blogs'}
            className=" text-slate-900 hover:bg-emerald-500 hover:text-white px-4 py-2 outline outline-emerald-500 hover:outline-emerald-500 transition-all"
          >
            More Post
          </Link>
        </div>
      </div>
    </section>
  )
}

