'use client'

import { useForm } from 'react-hook-form'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const { register, handleSubmit } = useForm()
  const router = useRouter()

  const onSubmit = async (data: any) => {
    await api.post('/auth/register', data)
    router.push('/login')
  }

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Register</h1>

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
          Register
        </button>
      </form>
    </div>
  )
}