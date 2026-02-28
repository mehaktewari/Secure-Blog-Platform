'use client'

import { useForm } from 'react-hook-form'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const { register, handleSubmit } = useForm()
  const router = useRouter()

  const onSubmit = async (data: any) => {
    const res = await api.post('/auth/login', data)

    localStorage.setItem('token', res.data.access_token)

    router.push('/dashboard')
  }

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('email')}
          placeholder="Email"
          className="border p-2 w-full"
        />

        <input
          {...register('password')}
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
        />

        <button className="bg-black text-white px-4 py-2 w-full">
          Login
        </button>
      </form>
    </div>
  )
}