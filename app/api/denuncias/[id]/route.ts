import { prisma } from "@/lib/prisma"

import { cookies } from "next/headers"

import { verifyToken } from "@/lib/auth"
import { criarNotificacao } from "@/lib/notificacao"

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
            },

            include: {
                user: true
            }
        })

        if (risco) {
            await criarNotificacao({
                title: 'Risco definido',
                message: `O risco da sua denúncia foi definido como ${risco}.`,
                type: 'risco-definido',
                userId: denuncia.userId,
                denunciaId: denuncia.id
            })
        }
        if (prioridade) {
            await criarNotificacao({
                title: 'Prioridade Definida',
                message: `A prioridade da sua denúncia foi definido como ${prioridade}.`,
                type: 'prioridade-definida',
                userId: denuncia.userId,
                denunciaId: denuncia.id
            })
        }
        if (custo) {
            await criarNotificacao({
                title: 'Custo Definido',
                message: `O custo para a solução da sua denúncia foi definido com o valor de R$${custo}.`,
                type: 'custo-definido',
                userId: denuncia.userId,
                denunciaId: denuncia.id
            })
        }
        if (status) {
            await criarNotificacao({
                title: 'Concluído!',
                message: `Sua denúncia foi concluida com sucesso! Obrigado por ajudar nossa cidade.`,
                type: 'denuncia-concluida',
                userId: denuncia.userId,
                denunciaId: denuncia.id
            })
        }

        return Response.json(denuncia)

    } catch (error) {

        console.error(error)

        return Response.json(
            { error: "Erro interno" },
            { status: 500 }
        )
    }
}