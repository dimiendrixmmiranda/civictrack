import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"

export async function GET() {

    try {

        const cookieStore = await cookies()

        const token = cookieStore.get("token")?.value

        if (!token) {
            return Response.json(
                { error: "Não autenticado" },
                { status: 401 }
            )
        }

        const payload = verifyToken(token)

        if (!payload) {
            return Response.json(
                { error: "Token inválido" },
                { status: 401 }
            )
        }

        const denuncias = await prisma.denuncia.findMany({

            where: {
                userId: payload.userId
            },

            include: {
                endereco: true,

                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        imagem: true
                    }
                }
            },

            orderBy: {
                createdAt: "desc"
            }
        })

        return Response.json(denuncias)

    } catch (error) {

        console.error(error)

        return Response.json(
            { error: "Erro interno" },
            { status: 500 }
        )
    }
}