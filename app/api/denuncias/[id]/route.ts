import { prisma } from "@/lib/prisma"

import { cookies } from "next/headers"

import { verifyToken } from "@/lib/auth"

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {

        const { id } = await params

        const denuncias = await prisma.denuncia.findMany({

            where: {
                userId: id
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
                createdAt: 'desc'
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

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {

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

        // BUSCA USUÁRIO
        const user = await prisma.user.findUnique({

            where: {
                id: payload.userId
            }
        })

        if (!user) {

            return Response.json(
                { error: "Usuário não encontrado" },
                { status: 404 }
            )
        }

        // SOMENTE ADMIN
        if (user.role !== "admin") {

            return Response.json(
                { error: "Sem permissão" },
                { status: 403 }
            )
        }

        const body = await req.json()

        const {
            risco,
            prioridade,
            status,
            custo
        } = body

        const { id } = await params

        const denuncia = await prisma.denuncia.update({

            where: {
                id
            },

            data: {
                ...(risco && { risco }),
                ...(prioridade && { prioridade }),
                ...(status && { status }),

                ...(custo !== undefined && {
                    custo
                })
            }
        })

        return Response.json(denuncia)

    } catch (error) {

        console.error(error)

        return Response.json(
            { error: "Erro interno" },
            { status: 500 }
        )
    }
}