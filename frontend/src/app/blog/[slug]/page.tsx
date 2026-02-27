'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { api } from '@/lib/api'

export default function BlogPage() {
  const { slug } = useParams()
  const [blog, setBlog] = useState<any>(null)

  useEffect(() => {
    api.get(`/public/blogs/${slug}`).then((res: any) => {
      setBlog(res.data)
    })
  }, [slug])

  if (!blog) return <div>Loading...</div>

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <p className="mt-4">{blog.content}</p>
      <p className="text-sm text-gray-500 mt-4">
        Author: {blog.user.email}
      </p>
    </div>
  )
}