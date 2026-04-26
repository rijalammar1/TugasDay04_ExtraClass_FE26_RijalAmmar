import { prisma } from "@/lib/prisma"

export async function PUT(req: Request) {
  const body = await req.json()
  const { id, ...data } = body

  const food = await prisma.food.update({
    where: { id },
    data,
  })

  return Response.json(food)
}
