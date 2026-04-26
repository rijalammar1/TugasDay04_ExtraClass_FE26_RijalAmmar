import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const body = await req.json()

  const food = await prisma.food.create({
    data: {
      name: body.name,
      description: body.description,
      ingredients: body.ingredients,
      imageUrl: body.imageUrl,
      type: body.type ?? "fresh", // ✅ default "fresh" kalau tidak dikirim
    },
  })

  return Response.json(food)
}
