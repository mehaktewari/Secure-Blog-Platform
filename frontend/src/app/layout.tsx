import '../globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'
import ProfileDropdown from '@/components/ProfileDropdown'

export const metadata: Metadata = {
  title: 'Secure Blog Platform',
  description: 'Modern secure full-stack blog platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300">
        
        {/* NAVBAR */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-800 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

            {/* LOGO */}
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              SecureBlog
            </Link>

            {/* NAV LINKS */}
            <nav className="flex items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-300">
              
              {["Home", "Dashboard"].map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="relative group transition"
                >
                  <span className="group-hover:text-indigo-600 dark:group-hover:text-blue-400 transition-colors">
                    {item}
                  </span>
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indigo-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}

              <Link
                href="/login"
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-sm"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-sm"
              >
                Register
              </Link>

              <ThemeToggle />
              <ProfileDropdown />
            </nav>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  )
}