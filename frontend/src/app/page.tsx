'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

export default function Home() {
  const [blogs, setBlogs] = useState<any[]>([])

  useEffect(() => {
    api.get('/public/feed').then((res: any) => {
      setBlogs(res.data.data)
    })
  }, [])

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Public Feed</h1>

      {blogs.map(blog => (
        <div key={blog.id} className="border p-4 mb-4 rounded">
          <h2 className="text-xl font-semibold">{blog.title}</h2>
          <p>{blog.summary || blog.content.slice(0, 100)}</p>
          <p className="text-sm text-gray-500">
            Likes: {blog._count.likes} | Comments: {blog._count.comments}
          </p>
        </div>
      ))}
    </div>
  )
}