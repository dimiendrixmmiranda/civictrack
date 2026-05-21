'use client'

import Denuncia from "@/interfaces/Denuncia"
import { useEffect, useState } from "react"

export interface NotificationType {
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

export function useNotifications() {

    const [notifications, setNotifications] = useState<NotificationType[]>([])

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState<string | null>(null)

    async function fetchNotifications() {

        try {

            setLoading(true)

            setError(null)

            const response = await fetch('/api/notificacoes')

            if (!response.ok) {
                throw new Error('Erro ao buscar notificações')
            }

            const data = await response.json()

            setNotifications(data)

        } catch (error) {

            console.error(error)

            setError('Erro ao carregar notificações')

        } finally {

            setLoading(false)
        }
    }

    async function markAsRead(notificationId: string) {

        try {

            console.log(notificationId)

            const response = await fetch(
                `/api/notificacoes/${notificationId}`,
                {
                    method: 'PATCH'
                }
            )

            console.log(response)

            if (!response.ok) {
                throw new Error('Erro ao marcar')
            }

            setNotifications((prev) =>
                prev.map((notification) => {

                    if (notification.id === notificationId) {

                        return {
                            ...notification,
                            read: true
                        }
                    }

                    return notification
                })
            )

        } catch (error) {

            console.error(error)
        }
    }

    async function markAllAsRead() {

        try {

            await fetch('/api/notificacoes/read-all', {
                method: 'PATCH'
            })

            setNotifications((prev) =>
                prev.map((notification) => ({
                    ...notification,
                    read: true
                }))
            )

        } catch (error) {

            console.error(error)
        }
    }

    async function deleteNotification(notificationId: string) {

        try {

            await fetch(`/api/notificacoes/${notificationId}`, {
                method: 'DELETE'
            })

            setNotifications((prev) =>
                prev.filter(
                    (notification) =>
                        notification.id !== notificationId
                )
            )

        } catch (error) {

            console.error(error)
        }
    }

    const unreadCount = notifications.filter(
        (notification) => !notification.read
    ).length

    useEffect(() => {

        fetchNotifications()

        const interval = setInterval(() => {

            fetchNotifications()

        }, 30000)

        return () => clearInterval(interval)

    }, [])

    return {
        notifications,
        loading,
        error,
        unreadCount,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        deleteNotification
    }
}