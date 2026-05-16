'use client'
import Image from "next/image";
import { BsBox2HeartFill } from "react-icons/bs";
import { FaCheckDouble, FaClipboardList, FaExclamationTriangle, FaHeart, FaLeaf } from "react-icons/fa";
import Grafico from "../grafico/Grafico";
import TabelaDeProblemas from "../tabelaDeProblemas/TabelaDeProblemas";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useMinhasDenuncias } from "@/hooks/useDenunciasMe";

export default function Painel() {
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
        <div className="flex flex-col gap-6 m-4 2xl:h-[700px] 2xl:overflow-y-scroll barra 2xl:pr-4">
            <div className="md:grid md:grid-cols-2 bg-cinza p-2 rounded-xl lg:grid-cols-[auto_1fr] xl:px-6">
                <div className="grid grid-cols-[60px_1fr] items-center gap-3 xl:grid-cols-[100px_1fr]">
                    <div className="relative w-[60px] h-[60px] rounded-full bg-zinc-500 overflow-hidden xl:w-[100px] xl:h-[100px]">
                        <Image alt="Imagem do Usuário" src={user.imagem || '/cidade/cidade.jpg'} unoptimized fill className="object-cover" />
                    </div>
                    <div>
                        <h3 className="font-bebas text-4xl mt-1 xl:text-6xl">Olá, {user.name.split(' ')[0]} 👋​</h3>
                        <p className="text-xs xl:text-base">Acompanhe suas denúncias e ajude a transformar sua cidade</p>
                    </div>
                </div>
                <div className="relative w-full hidden md:flex lg:justify-end lg:items-end">
                    <div className="relative h-[110px] w-[400px]">
                        <Image alt="Imagem cidade" src={'/usuario/cidade.png'} fill className="object-contain" />
                    </div>
                </div>
            </div>
            <div>
                <ul className="mx-auto flex flex-col justify-center items-center gap-4 md:grid md:grid-cols-2 lg:grid-cols-4">
                    <li className="flex justify-center w-full">
                        <div className="bg-azul-escuro p-3 flex gap-2 rounded-xl w-full">
                            <div className="w-15 h-15 bg-azul-claro flex justify-center items-center rounded-2xl">
                                <FaClipboardList className="text-4xl" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bebas text-2xl leading-6">Total de problemas</span>
                                <div className="flex gap-1 mt-auto">
                                    <p className="font-bold text-3xl">{denuncias.length || 0}</p>
                                    <span className="self-end text-blue-400">+{denunciasDoMes.length} este mês</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="flex justify-center">
                        <div className="bg-azul-escuro p-3 flex gap-2 rounded-xl w-full">
                            <div className="w-15 h-15 bg-red-600 flex justify-center items-center rounded-2xl">
                                <FaExclamationTriangle className="text-4xl" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bebas text-2xl leading-6">Abertos</span>
                                <div className="flex gap-1 mt-auto">
                                    <p className="font-bold text-3xl">{denuncias.filter(denuncia => denuncia.status == 'aberto').length}</p>
                                    <span className="self-end text-red-400">+{denunciasAbertasDoMes.length} este mes</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="flex justify-center">
                        <div className="bg-azul-escuro p-3 flex gap-2 rounded-xl w-full">
                            <div className="w-15 h-15 bg-green-600 flex justify-center items-center rounded-2xl">
                                <FaCheckDouble className="text-4xl" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bebas text-2xl leading-6">Resolvidos</span>
                                <div className="flex gap-1 mt-auto">
                                    <p className="font-bold text-3xl">{denuncias.filter(denuncia => denuncia.status === 'resolvido').length}</p>
                                    <span className="self-end text-green-400">+{denunciasResolvidas.length} este mes</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="flex justify-center">
                        <div className="bg-azul-escuro p-3 flex gap-2 rounded-xl w-full">
                            <div className="w-15 h-15 bg-purple-600 flex justify-center items-center rounded-2xl">
                                <RiMoneyDollarCircleFill className="text-4xl" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bebas text-lg leading-6">Custo Estimado Total</span>
                                <p className="text-2xl mt-auto font-bold">R${precoDasDenunciasResolvidas.toFixed(2) || '0,00'}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="flex flex-col gap-4 xl:grid xl:grid-cols-[900px_1fr] 2xl:grid-cols-[minmax(600px,1fr)_480px]">
                <TabelaDeProblemas denuncias={denuncias} qtdeDeLinhas={4} altura="h-[360px]" />
                <div className="flex flex-col gap-4">
                    <Grafico categorias={categorias} />
                    <div className="flex flex-col w-full gap-6 md:grid md:grid-cols-2">
                        <div className="p-4 bg-cinza w-full col-span-2 rounded-xl flex flex-col gap-4">
                            <div className="flex flex-col">
                                <h3 className="font-bebas text-3xl">Impacto das suas denúncias</h3>
                                <p>Você ja ajudou a melhorar sua cidade!</p>
                            </div>
                            <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                                <div className="grid grid-cols-[64px_1fr] gap-2">
                                    <div className="w-16 h-16 rounded-full bg-verde my-auto mx-auto flex justify-center items-center text-2xl">
                                        <BsBox2HeartFill />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-zinc-400 leading-4 text-sm">Pessoas Impactadas</p>
                                        <h4 className="font-bebas text-4xl">1250+</h4>
                                    </div>
                                </div>
                                <div className="grid grid-cols-[64px_1fr] gap-2">
                                    <div className="w-16 h-16 rounded-full bg-verde my-auto mx-auto flex justify-center items-center text-2xl">
                                        <FaLeaf />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-zinc-400 leading-4 text-sm">Problemas resolvidos</p>
                                        <h4 className="font-bebas text-4xl">5</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-3 bg-cinza rounded-xl p-4 grid grid-cols-[64px_1fr] gap-4 lg:grid-cols-[64px_auto_1fr]">
                <div className="w-16 h-16 relative rounded-full bg-green-900 flex justify-center items-center">
                    <FaHeart className="text-green-400 text-2xl" />
                </div>
                <div className="flex flex-col justify-center">
                    <h2 className="font-bebas text-2xl">Obrigado por fazer parte da mudança!</h2>
                    <span className="hidden md:block">Cada denúncia sua contribui para uma cidade melhor para todos</span>
                </div>
                <div className="w-full hidden lg:flex justify-end">
                    <div className="w-[200px] h-[70px] relative">
                        <Image alt="IMagem banco de praça" src={'/usuario/banco-de-praca.png'} fill className="object-contain" />
                    </div>
                </div>
            </div>
        </div>
    )
}