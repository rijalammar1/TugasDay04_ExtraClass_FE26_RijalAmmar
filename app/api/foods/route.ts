import { prisma } from "@/lib/prisma"

export async function GET() {
  const foods = await prisma.food.findMany()

  return Response.json(foods)
}
