'use client'

import Denuncia from "@/interfaces/Denuncia"
import { useEffect, useState } from "react"

export function useMinhasDenuncias() {

    const [denuncias, setDenuncias] = useState<Denuncia[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        async function loadDenuncias() {

            try {

                const res = await fetch('/api/denuncias/me')

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

        loadDenuncias()

    }, [])

    return { denuncias, loading }
}