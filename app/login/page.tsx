"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import foodImg from "../img/food-1.jpg"

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const login = async () => {
    setError("")
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setError("Email atau password salah")
      return
    }

    router.push("/foods")
  }

  return (
    <div className="min-h-screen bg-white flex">
      <div className="hidden lg:block w-1/2 sticky top-0 h-screen">
        <img
          src={foodImg.src}
          alt="food background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8">
        <div className="w-full max-w-sm">
          <div className="mb-10">
            <h1 className="text-4xl font-black text-black mb-2">Welcome</h1>
            <p className="text-gray-400 text-sm">
              Sign in to continue to the Food App
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 block">
                Email
              </label>
              <input
                className="border-b-2 border-gray-200 focus:border-black outline-none p-2 w-full transition-all duration-200 text-black bg-transparent text-base"
                placeholder="nama@email.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 block">
                Password
              </label>
              <input
                className="border-b-2 border-gray-200 focus:border-black outline-none p-2 w-full transition-all duration-200 text-black bg-transparent text-base"
                placeholder=" your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              onClick={login}
              disabled={loading}
              className="bg-black hover:bg-gray-800 text-white font-semibold rounded-xl py-4 w-full transition-all duration-200 disabled:opacity-50 mt-2 text-sm tracking-wide"
            >
              {loading ? "Login" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
