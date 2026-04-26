import { notFound } from "next/navigation"
import FoodDetail from "./FoodDetail"

async function getFood(id: string) {
  const res = await fetch(`http://localhost:3000/api/foods/${id}`, {
    cache: "no-store",
  })

  if (!res.ok) return null

  return res.json()
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (!id) return notFound()

  const food = await getFood(id)

  if (!food) return notFound()

  return <FoodDetail food={food} />
}
