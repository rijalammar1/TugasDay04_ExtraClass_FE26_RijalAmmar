// app/api/foods/[id]/route.ts

import { prisma } from "@/lib/prisma"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params

  if (!id) {
    return Response.json({ error: "Id Tidak di temukan" }, { status: 400 })
  }

  const food = await prisma.food.findUnique({
    where: { id },
  })

  if (!food) {
    return Response.json({ error: "Not found" }, { status: 404 })
  }

  return Response.json(food)
}
