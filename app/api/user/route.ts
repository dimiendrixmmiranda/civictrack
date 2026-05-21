import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"

export async function PATCH(req: NextRequest) {

    try {

        const cookieStore = await cookies()

        const token = cookieStore.get("token")?.value

        if (!token) {

            return NextResponse.json(
                { error: "Não autenticado" },
                { status: 401 }
            )
        }

        const payload = verifyToken(token)

        if (!payload) {

            return NextResponse.json(
                { error: "Token inválido" },
                { status: 401 }
            )
        }

        const body = await req.json()

        const {
            name,
            email,
            telefone,
            imagem,
            endereco
        } = body

        const updatedUser = await prisma.user.update({

            where: {
                id: payload.userId
            },

            data: {

                ...(name && { name }),

                ...(email && { email }),

                ...(telefone && { telefone }),

                ...(imagem && { imagem }),

                ...(endereco && {

                    endereco: {

                        upsert: {

                            update: {

                                rua: endereco.rua,

                                numero: endereco.numero,

                                bairro: endereco.bairro,

                                complemento: endereco.complemento,

                                latitude: endereco.latitude,

                                longitude: endereco.longitude
                            },

                            create: {

                                rua: endereco.rua,

                                numero: endereco.numero,

                                bairro: endereco.bairro,

                                complemento: endereco.complemento,

                                latitude: endereco.latitude,

                                longitude: endereco.longitude
                            }
                        }
                    }
                })
            },

            include: {
                endereco: true
            }
        })

        return NextResponse.json(updatedUser)

    } catch (err) {

        console.error(err)

        return NextResponse.json(
            {
                error: "Erro ao atualizar usuário"
            },
            {
                status: 500
            }
        )
    }
}