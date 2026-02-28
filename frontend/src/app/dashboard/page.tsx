'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { api } from '@/lib/api'

export default function DashboardPage() {
  const router = useRouter()
  const { register, handleSubmit } = useForm()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      router.replace('/login')
      return
    }

    api.get('/auth/me')
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        localStorage.removeItem('token')
        router.replace('/login')
      })
  }, [])
  const onSubmit = async (data: any) => {
    await api.post('/blogs', {
      ...data,
      isPublished: data.isPublished === 'true',
    })

    router.push('/')
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="p-10 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Blog</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('title')}
          placeholder="Title"
          className="border p-2 w-full"
        />

        <textarea
          {...register('content')}
          placeholder="Content"
          className="border p-2 w-full"
          rows={5}
        />

        <select {...register('isPublished')} className="border p-2 w-full">
          <option value="false">Draft</option>
          <option value="true">Publish</option>
        </select>

        <button className="bg-black text-white px-4 py-2 w-full">
          Create Blog
        </button>
      </form>
    </div>
  )
}