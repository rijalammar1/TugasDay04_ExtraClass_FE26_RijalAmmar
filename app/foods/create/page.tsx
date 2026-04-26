"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"

export default function CreateFoodPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    ingredients: "",
    type: "fresh",
  })

  const submit = async () => {
    setLoading(true)
    await fetch("/api/create-food", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    setLoading(false)
    router.push("/foods")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-md mx-auto px-4 py-10">
        <h1 className="text-xl font-semibold text-black mb-6">
          Create a Food Recipe
        </h1>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-black mb-1.5">
              Food Name
            </label>
            <input
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-black outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
              placeholder="e.g., Beef Rendang"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-black mb-1.5">
              Description
            </label>
            <textarea
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-black outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400 resize-none"
              placeholder="Description"
              rows={3}
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-black mb-1.5">
              Image URL
            </label>
            <input
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-black outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
              placeholder="https://..."
              value={data.imageUrl}
              onChange={(e) => setData({ ...data, imageUrl: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-black mb-1.5">
              Ingredients
            </label>
            <textarea
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-black outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400 resize-none"
              placeholder="List the ingredients"
              rows={4}
              value={data.ingredients}
              onChange={(e) =>
                setData({ ...data, ingredients: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-black mb-1.5">
              Type
            </label>
            <select
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-black outline-none focus:border-gray-400 transition-colors"
              value={data.type}
              onChange={(e) => setData({ ...data, type: e.target.value })}
            >
              <option value="fresh">Fresh</option>
              <option value="upf">UPF</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => router.back()}
              className="flex-1 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg py-3 transition-colors mt-1 hover:bg-gray-50 cursor-pointer"
            >
              Back
            </button>

            <button
              onClick={submit}
              disabled={loading}
              className="flex-1 bg-gray-900 hover:bg-gray-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg py-3 transition-colors mt-1 cursor-pointer"
            >
              {loading ? "Saving Recipe" : "Save Recipe"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
