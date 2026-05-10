'use client'

import Denuncia from "@/interfaces/Denuncia"
import { useEffect, useState } from "react"

export function useDenuncias() {
    const [denuncias, setDenuncias] = useState<Denuncia[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadDenuncia() {
            try {
                const res = await fetch("/api/denuncias")
                const data = await res.json()

                if (res.ok) {
                    setDenuncias(data)
                } else {
                    setDenuncias([])
                }
            } catch (err) {
                setDenuncias([])
            } finally {
                setLoading(false)
            }
        }

        loadDenuncia()
    }, [])

    return { denuncias, loading }
}