import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function PATCH(req: NextRequest) {
    try {
        const user = await prisma.user.findFirst()
        const body = await req.json()

        const {
            name,
            email,
            telefone,
            imagem,
            endereco,
        } = body

        // PEGAR USUÁRIO LOGADO
        const userId = user?.id

        const updatedUser = await prisma.user.update({

            where: {
                id: userId
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