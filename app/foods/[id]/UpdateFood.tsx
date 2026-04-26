"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function UpdateFood({
  food,
  onCancel,
}: {
  food: any
  onCancel: () => void
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: food.name,
    description: food.description,
    imageUrl: food.imageUrl || "",
    ingredients: food.ingredients,
    type: food.type,
  })

  const handleUpdate = async () => {
    setLoading(true)
    await fetch(`/api/update-food/${food.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: food.id, ...form }),
    })
    setLoading(false)
    onCancel()
    router.refresh()
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-black">Update Recipe</h2>

      <div className="flex flex-col gap-3">
        <input
          className="border p-2 rounded w-full text-black"
          placeholder="Nama makanan"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <textarea
          className="border p-2 rounded w-full text-black"
          placeholder="Deskripsi"
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          className="border p-2 rounded w-full text-black"
          placeholder="URL Gambar"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        />

        <textarea
          className="border p-2 rounded w-full text-black"
          placeholder="Bahan-bahan"
          rows={3}
          value={form.ingredients}
          onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
        />

        <select
          className="border p-2 rounded w-full text-gray-700"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="fresh">Fresh</option>
          <option value="upf">UPF</option>
        </select>

        <div className="flex gap-3 mt-2">
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="flex-1 bg-black text-white font-semibold rounded-xl py-3 hover:bg-gray-800 transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl py-3 hover:bg-gray-50 transition cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  )
}
