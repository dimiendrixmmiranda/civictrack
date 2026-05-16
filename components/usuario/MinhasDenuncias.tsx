import { useRouter } from "next/navigation";
import TabelaDeProblemas from "../tabelaDeProblemas/TabelaDeProblemas";
import { useUser } from "@/hooks/useUser";
import { useMinhasDenuncias } from "@/hooks/useDenunciasMe";

export default function MinhasDenuncias() {
    const router = useRouter()
    const { user, loading } = useUser()
    const { denuncias } = useMinhasDenuncias()

    const denunciasDoMes = denuncias.filter((denuncia) => {

        const dataDenuncia = new Date(denuncia.createdAt)

        const hoje = new Date()

        return (
            dataDenuncia.getMonth() === hoje.getMonth() &&
            dataDenuncia.getFullYear() === hoje.getFullYear()
        )
    })
    const denunciasAbertasDoMes = denuncias.filter(denuncia => denuncia.status === 'aberto').filter((denuncia) => {

        const dataDenuncia = new Date(denuncia.createdAt)

        const hoje = new Date()

        return (
            dataDenuncia.getMonth() === hoje.getMonth() &&
            dataDenuncia.getFullYear() === hoje.getFullYear()
        )
    })
    const denunciasResolvidas = denuncias.filter(denuncia => denuncia.status === 'resolvido').filter((denuncia) => {

        const dataDenuncia = new Date(denuncia.createdAt)

        const hoje = new Date()

        return (
            dataDenuncia.getMonth() === hoje.getMonth() &&
            dataDenuncia.getFullYear() === hoje.getFullYear()
        )
    })

    const precoDasDenunciasResolvidas = denuncias
        .filter(
            d =>
                d.status === 'resolvido' &&
                d.custo !== '' &&
                d.custo != null
        )
        .reduce((total, denuncia) => {
            return total + parseFloat(denuncia.custo)
        }, 0)


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

    const categoriasFixas = [
        "infraestrutura",
        "iluminacao",
        "limpeza",
        "meio-ambiente",
        "drenagem",
        "seguranca",
        "outros",
    ]

    const categorias = categoriasFixas.map((categoria) => {

        const quantidade = denuncias.filter(
            denuncia => denuncia.categoria === categoria
        ).length

        return {
            name: categoria,
            value: quantidade
        }
    })
    return (
        <div className="my-1 mr-3">
            <div className="bg-cinza p-4 min-h-full">
                <h2 className="font-bebas text-4xl">Lista de todas as suas denúncias:</h2>
                <div className="bg-cinza">
                    <TabelaDeProblemas altura="h-full" denuncias={denuncias} qtdeDeLinhas={denuncias.length} />
                </div>
            </div>
        </div>
    )
}