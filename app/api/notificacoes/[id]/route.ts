import { prisma } from "@/lib/prisma"

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    try {

        const { id } = await params

        const notification = await prisma.notification.update({

            where: {
                id
            },

            data: {
                read: true
            }
        })

        return Response.json(notification)

    } catch (error) {

        console.error(error)

        return Response.json(
            { error: 'Erro interno' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    try {

        const { id } = await params

        await prisma.notification.delete({

            where: {
                id
            }
        })

        return Response.json({
            message: 'Notificação deletada'
        })

    } catch (error) {

        console.error(error)

        return Response.json(
            { error: 'Erro interno' },
            { status: 500 }
        )
    }
}