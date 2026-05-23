'use client'
import Dialog from "@/components/caixaDeDialogo/CaixaDeDialogo";
import Template from "@/components/template/Template";
import Configuracoes from "@/components/usuario/Configuracoes";
import MeuPerfil from "@/components/usuario/MeuPerfil";
import MinhasDenuncias from "@/components/usuario/MinhasDenuncias";
import Notificacoes from "@/components/usuario/Notificacoes";
import NovaDenuncia from "@/components/usuario/NovaDenuncia";
import Painel from "@/components/usuario/Painel";
import { useMinhasDenuncias } from "@/hooks/useDenunciasMe";
import { useNotifications } from "@/hooks/useNotificacoes";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { FiAlertCircle, FiBell, FiGrid, FiLogOut, FiPlusCircle, FiSettings, FiUser } from "react-icons/fi";
import { TbLayoutDashboard } from "react-icons/tb";

export default function Page() {
    const router = useRouter()
    const { user, loading } = useUser()
    const { denuncias } = useMinhasDenuncias()
    const {
        notifications,
        unreadCount,
    } = useNotifications()
    const [active, setActive] = useState<'painel' | 'minhas-denuncias' | 'nova-denuncia' | 'notificacoes' | 'meu-perfil' | 'configuracoes' | 'sair'>('painel')
    const [notificacoesNaoLidas, setNotificacoesNaoLidas] = useState<number>(0)
    const [abrirLogout, setAbrirLogout] = useState(false)

    useEffect(() => {
        const notNaoLidas = notifications.filter(not => not.read === false).length
        if (notNaoLidas) setNotificacoesNaoLidas(notNaoLidas)
    }, [notifications, denuncias])

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

    function renderizarTela(active: string) {
        switch (active) {
            case 'painel':
                return (
                    <Painel />
                )
            case 'minhas-denuncias':
                return (
                    <MinhasDenuncias />
                )
            case 'nova-denuncia':
                return (
                    <NovaDenuncia />
                )
            case 'notificacoes':
                return (
                    <Notificacoes />
                )
            case 'meu-perfil':
                return (
                    <MeuPerfil />
                )
            case 'configuracoes':
                return (
                    <Configuracoes />
                )
            default:
                break;
        }
    }

    if (loading) return <div className="min-w-full min-h-screen flex justify-center items-center bg-cinza">
        <h2 className="text-4xl font-bebas">Carregando</h2>
    </div>
    if (!user) return <p>Não logado</p>
    
    return (
        <Template>
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
            <div className="bg-cinza 2xl:grid 2xl:grid-cols-[300px_1fr]">
                <div className="w-full p-4 flex flex-col gap-6 border-r-2 border-zinc-600 2xl:block">
                    <div className="grid grid-cols-[80px_1fr] gap-4">
                        <div className="relative w-[80px] h-[80px] rounded-full overflow-hidden bg-green-500 border-2 border-black">
                            <Image alt="Imagem do usuário" src={user.imagem} fill unoptimized className="object-cover" />
                        </div>
                        <div className="min-w-0 flex flex-col justify-center">
                            <h2 className="font-bebas text-4xl leading-7">{user.name.split(' ')[0]}</h2>
                            <p className="truncate">
                                {user.email}
                            </p>
                            <span className="bg-verde w-fit p-1 rounded-full px-3 text-sm" style={{ textShadow: '1px 1px 2px black' }}>{user.role === 'user' ? 'Usuario' : 'Admin'}</span>
                        </div>
                    </div>
                    <div className="flex-1 mt-4 flex flex-col gap-4">
                        <h2 className="text-zinc-400">Menu</h2>
                        <ul className="flex flex-col gap-1">
                            <li onClick={(e) => setActive('painel')} className={`flex items-center gap-2 p-2 rounded-xl hover:bg-green-900 cursor-pointer hover:text-white duration-500 transition-all ${active === 'painel' ? 'bg-green-900 text-white' : 'text-zinc-400'}`}>
                                <FiGrid className="text-green-500" />
                                <span>Painel</span>
                            </li>

                            <li onClick={(e) => setActive('minhas-denuncias')} className={`flex items-center gap-2 p-2 rounded-xl hover:bg-green-900 cursor-pointer hover:text-white duration-500 transition-all ${active === 'minhas-denuncias' ? 'bg-green-900 text-white' : 'text-zinc-400'}`}>
                                <FiAlertCircle className="text-green-500" />
                                <span>Minhas Denúncias</span>
                            </li>

                            <li onClick={(e) => setActive('nova-denuncia')} className={`flex items-center gap-2 p-2 rounded-xl hover:bg-green-900 cursor-pointer hover:text-white duration-500 transition-all ${active === 'nova-denuncia' ? 'bg-green-900 text-white' : 'text-zinc-400'}`}>
                                <FiPlusCircle className="text-green-500" />
                                <span>Nova Denúncia</span>
                            </li>

                            <li onClick={(e) => setActive('notificacoes')} className={`flex items-center gap-2 p-2 rounded-xl hover:bg-green-900 cursor-pointer hover:text-white duration-500 transition-all ${active === 'notificacoes' ? 'bg-green-900 text-white' : 'text-zinc-400'}`}>
                                <FiBell className="text-green-500" />
                                <span>Notificações</span>
                                <p className="ml-auto text-sm bg-verde w-6 h-5 flex justify-center items-center rounded-full text-white">{notificacoesNaoLidas}</p>
                            </li>

                            <li onClick={(e) => setActive('meu-perfil')} className={`flex items-center gap-2 p-2 rounded-xl hover:bg-green-900 cursor-pointer hover:text-white duration-500 transition-all ${active === 'meu-perfil' ? 'bg-green-900 text-white' : 'text-zinc-400'}`}>
                                <FiUser className="text-green-500" />
                                <span>Meu Perfil</span>
                            </li>

                            <li onClick={(e) => setActive('configuracoes')} className={`flex items-center gap-2 p-2 rounded-xl hover:bg-green-900 cursor-pointer hover:text-white duration-500 transition-all ${active === 'configuracoes' ? 'bg-green-900 text-white' : 'text-zinc-400'}`}>
                                <FiSettings className="text-green-500" />
                                <span>Configurações</span>
                            </li>

                            <li
                                onClick={() => setAbrirLogout(true)}
                                className={`flex items-center gap-2 p-2 rounded-xl cursor-pointer hover:bg-red-900 hover:text-white duration-500 transition-all ${active === 'sair'
                                    ? 'bg-red-900 text-white'
                                    : 'text-zinc-400'
                                    }`}
                            >
                                <FiLogOut className="text-red-500" />
                                <span>Sair</span>
                            </li>
                            <Dialog
                                open={abrirLogout}
                                onClose={() => setAbrirLogout(false)}
                                onConfirm={async () => {
                                    await fazerLogout()
                                    setAbrirLogout(false)
                                }}
                                title="Deseja realmente sair?"
                                description="Você será desconectado da sua conta."
                                confirmText="Sair"
                            />
                        </ul>
                    </div>
                    <div className="border-2 border-zinc-600 rounded-xl p-4 mt-4">
                        <h3 className="font-bebas text-2xl">Quer ajudar mais?</h3>
                        <p>Sua participação melhora a cidade para todos!</p>
                        <Link href={'/criarDenuncia'} className="flex bg-verde items-center justify-center font-bold text-lg py-1 rounded-md gap-1 mt-4" style={{ textShadow: '1px 1px 2px black' }}>
                            <FaPlusCircle />
                            <p>Fazer nova denúncia</p>
                        </Link>
                    </div>
                </div>
                {
                    renderizarTela(active)
                }
                {/* <div className="flex flex-col gap-6 m-4">
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
                </div> */}
            </div>
        </Template>
    )
}