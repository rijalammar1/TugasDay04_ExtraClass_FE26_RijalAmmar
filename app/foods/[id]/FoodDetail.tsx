"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import UpdateFood from "./UpdateFood"

export default function FoodDetail({ food }: { food: any }) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this recipe?")) return
    await fetch(`/api/delete-food/${food.id}`, { method: "DELETE" })
    router.push("/foods")
  }

  return (
    <div className="min-h-screen bg-[#FFFAF5]">
      <div className="relative h-80 w-full">
        <img
          src={food.imageUrl}
          alt={food.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <Link
          href="/foods"
          className="absolute top-6 left-6 bg-white/20 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full hover:bg-white/30 transition"
        >
          Back
        </Link>

        <div className="absolute bottom-6 left-6 right-6">
          {food.type && (
            <span className="bg-orange-400 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block">
              {food.type === "fresh" ? "Fresh" : "UPF"}
            </span>
          )}
          <h1 className="text-4xl font-black text-white">{food.name}</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        {!isEditing ? (
          <>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {food.description}
            </p>

            {food.ingredients && (
              <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8">
                <h2 className="font-black text-gray-900 text-lg mb-3">
                  Ingredients
                </h2>
                <p className="text-gray-500 leading-relaxed">
                  {food.ingredients}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 bg-black text-white font-semibold rounded-xl py-3 hover:bg-gray-800 transition cursor-pointer"
              >
                Update Recipe
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 bg-white border border-red-200 text-red-500 font-semibold rounded-xl py-3 hover:bg-red-50 transition cursor-pointer"
              >
                Delete Recipe
              </button>
            </div>
          </>
        ) : (
          <UpdateFood food={food} onCancel={() => setIsEditing(false)} />
        )}
      </div>
    </div>
  )
}
