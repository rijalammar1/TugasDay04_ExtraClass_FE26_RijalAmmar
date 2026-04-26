"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const router = useRouter()

  const handleLogout = () => {
    router.push("/login")
  }

  return (
    <nav className="border-b border-gray-100 bg-white">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/foods">
          <span className="text-sm font-semibold tracking-widest uppercase text-gray-900">
            Food Recipe
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/foods/create">
            <span className="text-xs tracking-widest uppercase text-black  cursor-pointer">
              Create Food Recipes
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="text-xs tracking-widest uppercase text-red-600  cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
