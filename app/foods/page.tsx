import Link from "next/link"
import Navbar from "../../components/Navbar"

async function getFoods() {
  const res = await fetch("http://localhost:3000/api/foods", {
    cache: "no-store",
  })

  if (!res.ok) return []

  const data = await res.json()

  if (!Array.isArray(data)) return []

  return data
}

export default async function FoodsPage() {
  const foods = await getFoods()

  return (
    <div className="min-h-screen bg-[#FFFAF5]">
      <Navbar />
      <div className="bg-[#1a1a1a] text-white px-8 py-16 text-center">
        <p className="text-orange-400 text-sm font-semibold tracking-[0.3em] uppercase mb-3">
          Recipe Collection
        </p>
        <h1 className="text-5xl font-black mb-4 leading-tight">
          Discover delicious recipes from all over Indonesia
        </h1>
      </div>
      <div className="px-8 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-2">
        {foods
          .filter((f: any) => f?.id)
          .map((food: any) => (
            <Link key={food.id} href={`/foods/${food.id}`}>
              <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300">
                <div className="relative overflow-hidden h-56">
                  <img
                    src={
                      food.imageUrl ||
                      "https://picsum.photos/seed/" + food.id + "/400/300"
                    }
                    alt={food.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {food.type && (
                    <span className="absolute top-3 left-3 bg-white text-gray-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                      {food.type === "fresh" ? "Fresh" : "UPF"}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h2 className="font-black text-gray-900 text-xl leading-tight mb-2 group-hover:text-orange-500 transition-colors duration-200">
                    {food.name}
                  </h2>
                  {food.description && (
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
                      {food.description}
                    </p>
                  )}
                  {food.ingredients && (
                    <div className="flex items-center gap-2 text-xs text-gray-400 border-t border-gray-100 pt-4">
                      <p className="line-clamp-1">{food.ingredients}</p>
                    </div>
                  )}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-orange-500 text-sm font-semibold">
                      View Recipe
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
      {/* Buat Empty state */}
      {foods.length === 0 && (
        <div className="text-center py-32">
          <p className="text-xl font-black text-gray-900">No recipes yet</p>
          <p className="text-gray-400 text-sm mt-2">
            Start adding your first recipe
          </p>
        </div>
      )}
    </div>
  )
}
