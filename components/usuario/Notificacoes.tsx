'use client'
import { useNotifications } from "@/hooks/useNotificacoes"
import Denuncia from "@/interfaces/Denuncia"
import Image from "next/image"
import { useState } from "react"
import Dialog from "../caixaDeDialogo/CaixaDeDialogo"

export interface Notificacao {
    id: string
    title: string
    message: string
    type: string
    read: boolean
    createdAt: Date
    userId: string
    denunciaId: string
    denuncia: Denuncia
}

export default function Notificacoes() {
    const {
        notifications,
        unreadCount,
        loading,
        markAsRead,
        deleteNotification
    } = useNotifications()

    const [notificaoSelecionada, setNotificacaoSelecionada] = useState<Notificacao | null>(null)
    const [dialogExcluiNotificacao, setDialogExcluiNotificacao] = useState(false)
    const [dialogMarcarMensagemLida, setDialogMarcarMensagemLida] = useState(false)

    return (
        <div className="bg-cinza xl:pl-8 2xl:pr-8">
            <div className="bg-cinza p-4 min-h-full flex flex-col gap-5">
                <div>
                    <h2 className="font-bebas text-4xl">Notificações</h2>
                    <p>Acompanhe suas notificações e fique por dentro de tudo.</p>
                </div>
                <div className="flex flex-col gap-8 xl:grid xl:grid-cols-2 gap-4 2xl:gap-10">
                    <div className="2xl:max-h-[500px] 2xl:overflow-y-scroll barra 2xl:pr-3">
                        <ul className="flex flex-col gap-2">
                            {
                                notifications.length > 0 ? (
                                    notifications.map(notificacao => {
                                        return (
                                            <li key={notificacao.id} onClick={() => setNotificacaoSelecionada(notificacao)}>
                                                <div className={`grid grid-cols-[50px_1fr] items-center gap-2 p-2 rounded-xl cursor-pointer ${notificacao?.read ? 'border-2 border-cinza-2': 'bg-cinza-2'}`}>
                                                    <div className="relative w-[50px] h-[50px] rounded-full">
                                                        <Image alt={notificacao.type} src={`/notificacoes/${notificacao.type}.png`} fill unoptimized className="object-cover" />
                                                    </div>
                                                    <div className="my-auto flex flex-col gap-1 justify-center mt-1.5">
                                                        <h3 className="font-bebas text-2xl leading-5">{notificacao.title}</h3>
                                                        <span className="leading-4 line-clamp-1">{notificacao.message}</span>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                ) : (
                                    <div>
                                        aqui
                                    </div>
                                )
                            }
                        </ul>
                    </div>
                    <div className="bg-cinza-2 rounded-xl p-4 flex flex-col gap-4">
                        {
                            notificaoSelecionada ? (
                                <>
                                    <div className="flex items-center gap-2">
                                        <div className="relative w-[50px] h-[50px] rounded-full">

                                            <Image
                                                alt={notificaoSelecionada.type}
                                                src={`/notificacoes/${notificaoSelecionada.type}.png`}
                                                fill
                                                unoptimized
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="my-auto flex flex-col gap-1 justify-center mt-2">
                                            <h3 className="font-bebas text-2xl leading-5">
                                                {notificaoSelecionada.title}
                                            </h3>
                                            <span className="leading-4 line-clamp-1">
                                                {notificaoSelecionada.message}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <p>
                                            Uma ótima notícia! Sua solicitação do dia{" "}
                                            {
                                                new Date(
                                                    notificaoSelecionada.denuncia.createdAt
                                                ).toLocaleDateString('pt-BR')
                                            } sobre o problema de{" "}
                                            {notificaoSelecionada.denuncia.tipoDoProblema} teve uma atualização!
                                        </p>
                                        <p>
                                            Atualização:{" "}
                                            <b className="capitalize">
                                                {notificaoSelecionada.type.replace('-', ' ')}
                                            </b>
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-auto">
                                        <button
                                            onClick={() => setDialogMarcarMensagemLida(true)}
                                            className="
                                                bg-verde
                                                font-bebas
                                                text-2xl
                                                pt-2
                                                pb-1
                                                rounded-xl
                                            "
                                            style={{
                                                textShadow: '1px 2px 2px black'
                                            }}
                                        >
                                            Marcar como lido
                                        </button>

                                        <button
                                            className="
                                                bg-red-600
                                                font-bebas
                                                text-2xl
                                                pt-2
                                                pb-1
                                                rounded-xl
                                            "
                                            style={{
                                                textShadow: '1px 2px 2px black'
                                            }}
                                            onClick={() => setDialogExcluiNotificacao(true)}
                                        >
                                            Excluir Notificação
                                        </button>
                                    </div>
                                    <Dialog
                                        open={dialogExcluiNotificacao}
                                        onClose={() => setDialogExcluiNotificacao(false)}
                                        onConfirm={() => {
                                            deleteNotification(
                                                notificaoSelecionada.id
                                            )
                                            setDialogExcluiNotificacao(false)
                                        }}
                                        title="Excluir notificação"
                                        description="
                                            Tem certeza que deseja excluir
                                            esta notificação?
                                        "
                                        confirmText="Excluir"
                                    />
                                    <Dialog
                                        open={dialogMarcarMensagemLida}
                                        onClose={() => setDialogMarcarMensagemLida(false)}
                                        onConfirm={() => {
                                            markAsRead(
                                                notificaoSelecionada.id
                                            )
                                            setDialogMarcarMensagemLida(false)
                                        }}
                                        title="Marcar notificação como lida?"
                                        description="
                                            Tem certeza que deseja marcar essa notificação como lida?
                                        "
                                        confirmText="Marcar"
                                    />
                                </>
                            ) : (

                                <div className="flex flex-col justify-center items-center h-full text-center gap-2">
                                    <div className="text-6xl">
                                        🔔
                                    </div>
                                    <h3 className="font-bebas text-3xl">
                                        Nenhuma notificação selecionada
                                    </h3>
                                    <p className="text-zinc-300">
                                        Clique em uma notificação para visualizar os detalhes.
                                    </p>
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>

        </div>
    )
}