'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { api } from '@/lib/api'

export default function BlogPage() {
  const { slug } = useParams()
  const [blog, setBlog] = useState<any>(null)
  const [comments, setComments] = useState<any[]>([])
  const [newComment, setNewComment] = useState('')
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  useEffect(() => {
    if (!slug) return

    api.get(`/public/blogs/${slug}`).then((res: any) => {
      setBlog(res.data)
      setLikeCount(res.data._count?.likes || 0)
    })
  }, [slug])

  useEffect(() => {
    if (!blog?.id) return

    api.get(`/public/blogs/${blog.id}/comments`).then((res: any) => {
      setComments(res.data)
    })
  }, [blog])

  const handleLike = async () => {
    if (!blog?.id) return

    const token = localStorage.getItem('token')
    if (!token) {
      alert('Login to like')
      return
    }

    if (!liked) {
      const res = await api.post(`/blogs/${blog.id}/like`)
      setLikeCount(res.data.likeCount)
      setLiked(true)
    } else {
      const res = await api.delete(`/blogs/${blog.id}/like`)
      setLikeCount(res.data.likeCount)
      setLiked(false)
    }
  }

  const handleComment = async () => {
    if (!blog?.id) return
    if (!newComment.trim()) return

    const token = localStorage.getItem('token')
    if (!token) {
      alert('Login to comment')
      return
    }

    const res = await api.post(`/blogs/${blog.id}/comments`, {
      content: newComment,
    })

    setComments(res.data)
    setNewComment('')
  }

  if (!blog) return <div>Loading...</div>

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">{blog.title}</h1>

      <p className="mt-4">{blog.content}</p>

      <p className="text-sm text-gray-500 mt-4">
        Author: {blog.user.email}
      </p>

      {/* LIKE BUTTON */}
      <div className="mt-6">
        <button
          onClick={handleLike}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {liked ? 'Unlike' : 'Like'} ({likeCount})
        </button>
      </div>

      {/* COMMENT SECTION */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>

        <div className="flex gap-2 mb-4">
          <input
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="border p-2 flex-1"
          />
          <button
            onClick={handleComment}
            className="bg-black text-white px-4 py-2"
          >
            Post
          </button>
        </div>

        {comments.map(comment => (
          <div key={comment.id} className="border p-3 mb-2 rounded">
            <p>{comment.content}</p>
            <p className="text-xs text-gray-500">
              {comment.user.email}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}