import { prisma } from "./prisma"

type CriarNotificacaoProps = {
    title: string
    message: string
    type: 'denuncia-criada' | 'risco-definido' | 'prioridade-definida' | 'custo-definido' | 'denuncia-concluida'
    userId: string
    denunciaId?: string
}

export async function criarNotificacao({
    title,
    message,
    type,
    userId,
    denunciaId
}: CriarNotificacaoProps) {

    await prisma.notification.create({
        data: {
            title,
            message,
            type,
            userId,
            denunciaId
        }
    })

}