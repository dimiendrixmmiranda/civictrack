import { prisma } from "@/lib/prisma"

import { cookies } from "next/headers"

import { verifyToken } from "@/lib/auth"
import { criarNotificacao } from "@/lib/notificacao"

export async function POST(req: Request) {

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

        const body = await req.json()

        const {
            categoria,
            tipoDoProblema,
            risco,
            prioridade,
            imagem,
            custo,

            endereco
        } = body

        // VALIDAÇÃO
        if (!categoria || !tipoDoProblema) {

            return Response.json(
                { error: "Campos obrigatórios faltando" },
                { status: 400 }
            )
        }

        // CRIA ENDEREÇO
        const enderecoCriado = await prisma.endereco.create({
            data: {
                rua: endereco.rua,
                numero: endereco.numero,
                bairro: endereco.bairro,
                complemento: endereco.complemento,

                latitude: endereco.latitude,
                longitude: endereco.longitude
            }
        })

        const denuncia = await prisma.denuncia.create({

            data: {
                categoria,
                tipoDoProblema,
                risco,
                prioridade,
                imagem,
                custo,
                user: {
                    connect: {
                        id: payload.userId
                    }
                },
                endereco: {
                    connect: {
                        id: enderecoCriado.id
                    }
                }
            },

            include: {
                endereco: true,
                user: true
            }
        })

        await criarNotificacao({
            title: 'Denúncia criada',
            message: `Sua denúncia de ${categoria} foi registrada com sucesso.`,
            type: 'denuncia-criada',
            userId: payload.userId,
            denunciaId: denuncia.id
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
export async function GET() {

    try {

        const denuncias = await prisma.denuncia.findMany({

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