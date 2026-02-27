'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold"
      >
        U
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg py-2">
          
          <Link
            href="/dashboard"
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Dashboard
          </Link>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Logout
          </button>

        </div>
      )}
    </div>
  )
}