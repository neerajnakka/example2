// components/Navbar.jsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full">
      {/* Glassmorphism bar */}
      <div className="bg-gray-900/80 backdrop-blur-xl border-b border-purple-700/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
              <span className="text-xl font-bold text-white hidden md:block">
                NextJS Docker K8s Project
              </span>
            </div>

            {/* Right-aligned nav (desktop only) */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className={`text-lg font-medium transition-colors ${
                  pathname === '/'
                    ? 'text-purple-300'
                    : 'text-gray-300 hover:text-purple-300'
                }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`text-lg font-medium transition-colors ${
                  pathname === '/about'
                    ? 'text-purple-300'
                    : 'text-gray-300 hover:text-purple-300'
                }`}
              >
                About
              </Link>
              <Link
                href="/deploy"
                className={`text-lg font-medium transition-colors ${
                  pathname === '/deploy'
                    ? 'text-purple-300'
                    : 'text-gray-300 hover:text-purple-300'
                }`}
              >
                Deploy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
