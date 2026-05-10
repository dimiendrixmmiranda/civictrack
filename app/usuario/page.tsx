'use client'
import Template from "@/components/template/Template";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TbLayoutDashboard } from "react-icons/tb";

export default function Page() {
    const { user, loading } = useUser()
    const router = useRouter()

    console.log(user)

    if (loading) return <p>Carregando...</p>

    if (!user) return <p>Não logado</p>

    async function fazerLogout() {
        await fetch("/api/logout", {
            method: "POST"
        })

        router.push("/login")
        router.refresh()
    }

    return (
        <Template>
            <button onClick={fazerLogout}>fazer logaut</button>
            {
                user.role === 'admin' ? (
                    <div>
                        <Link href={'/admin/dashboard'} className="flex items-center gap-1 bg-red-600">
                            <TbLayoutDashboard />
                            <p>
                                Painel de Administradores
                            </p>
                        </Link>
                    </div>
                ) : ''
            }
        </Template>
    )
}