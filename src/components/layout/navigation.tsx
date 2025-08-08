'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Link } from '@/i18n/navigation'

export function Navigation() {
  const { theme, setTheme } = useTheme()

  const navItems = [
    { href: '/posts', label: 'Blog' },
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
  ]

  return (
    <header className="flex items-center w-full justify-between py-10">
      <Link className="break-words" aria-label="Adam" href="/">
        <div className="flex items-center justify-between">
          <div className="h-6 text-2xl font-semibold">Adam</div>
        </div>
      </Link>
      <div className="flex items-center space-x-4 sm:space-x-6">
        <nav className="flex items-center space-x-4 sm:space-x-6">
          {navItems.map(item => (
            <Link
              key={item.href}
              className="hover:text-gray-800 dark:hover:text-white font-medium text-gray-400"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark'
            ? (
                <Sun className="size-5" />
              )
            : (
                <Moon className="size-5" />
              )}
        </div>
      </div>
    </header>
  )
}
