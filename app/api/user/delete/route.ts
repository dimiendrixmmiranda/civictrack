import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"

export async function PATCH() {

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

        await prisma.user.update({
            where: {
                id: payload.userId
            },
            
            data: {
                deleted: true,

                name: "Usuário removido",

                email: `removido_${Date.now()}@deleted.com`,

                imagem: "/usuario/default.png"
            }
        })

        cookieStore.delete("token")

        return Response.json({
            success: true
        })

    } catch (error) {

        console.error(error)

        return Response.json(
            { error: "Erro interno" },
            { status: 500 }
        )
    }
}