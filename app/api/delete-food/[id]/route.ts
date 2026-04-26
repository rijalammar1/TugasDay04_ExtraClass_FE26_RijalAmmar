import { prisma } from "@/lib/prisma"

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params

  await prisma.food.delete({
    where: { id },
  })

  return Response.json({ message: "The Recipe Has Been Deleted" })
}
