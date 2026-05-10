'use client'

import User from "@/interfaces/user"
import { useEffect, useState } from "react"

export function useUser() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadUser() {
            try {
                const res = await fetch("/api/register")
                const data = await res.json()

                if (res.ok) {
                    setUser(data)
                } else {
                    setUser(null)
                }
            } catch (err) {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        loadUser()
    }, [])

    return { user, loading }
}