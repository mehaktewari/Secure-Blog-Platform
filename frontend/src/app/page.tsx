'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import Link from 'next/link'

export default function Home() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/public/feed')
      .then(res => {
        console.log("BLOG RESPONSE:", res.data)
        setBlogs(res.data)
      })
      .catch(err => {
        console.error("API ERROR:", err.response?.config?.url)
      })
  }, [])

  return (
    <div>
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-6">
            Secure Blog Platform
          </h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            A modern full-stack blog platform with authentication,
            likes, comments, rate limiting, background jobs and more.
          </p>
        </div>
      </section>

      {/* BLOG FEED */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-12">
          Latest Posts
        </h2>

        {loading && (
          <div className="text-center text-gray-500">
            Loading posts...
          </div>
        )}

        {!loading && blogs.length === 0 && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-10 shadow-md text-center text-gray-500 dark:text-gray-400">
            No blogs yet. Create your first post 🚀
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map(blog => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 block"
            >
              <h3 className="text-xl font-semibold mb-3">
                {blog.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {blog.summary || blog.content?.slice(0, 140)}...
              </p>

              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>👍 {blog._count?.likes ?? 0}</span>
                <span>💬 {blog._count?.comments ?? 0}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}