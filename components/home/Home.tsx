'use client'
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import { RiMenuFold2Fill } from "react-icons/ri";
import { TbChartInfographic } from "react-icons/tb";
import { TiPlus } from "react-icons/ti";
import { useDenuncias } from "@/hooks/useDenuncias";

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { HiInformationCircle } from "react-icons/hi";

const MapProblems = dynamic(
    () => import("@/components/mapProblems/MapProblems"),
    {
        ssr: false
    }
)

export default function Home() {
    const { denuncias } = useDenuncias()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])
    if (!mounted) return null

    return (
        <section
            className="
                p-4 text-white
                bg-[linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,1.1)),url('/cidade/cidade.jpg')]
                bg-cover bg-center
            "
        >
            <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 xl:max-w-[1300px] xl:mx-auto xl:p-10 2xl:p-8 2xl:pt-12">
                <div className="flex flex-col gap-4 max-w-[500px] lg:p-6 lg:max-w-[600px] 2xl:max-w-full 2xl:p-0 2xl:my-auto">
                    <div className="font-bebas text-5xl xl:text-7xl">
                        <h2>Cuidar da cidade</h2>
                        <h2 className="text-verde">começa com você!</h2>
                    </div>
                    <div className="xl:text-lg">
                        Registre problemas urbanos, ajude a priorizar soluções e transforme sua cidade em um lugar melhor.
                    </div>
                    <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 xl:flex xl:flex-row xl:justify-start">
                        <Link href={'/criarDenuncia'} className="bg-verde flex items-center justify-center font-bold gap-1 rounded-lg p-2 max-w-[200px] mx-auto w-full xl:mx-0" style={{ textShadow: '1px 1px 2px black', boxShadow: '0 0 1px 1px black' }}>
                            <TiPlus className="text-lg" />
                            <span>Criar Denúncia</span>
                        </Link>
                        <Link href={'/'} className="bg-red-600 flex items-center justify-center font-bold gap-1 rounded-lg p-2 max-w-[200px] mx-auto w-full xl:mx-0" style={{ textShadow: '1px 1px 2px black', boxShadow: '0 0 1px 1px black' }}>
                            <RiMenuFold2Fill className="text-lg" />
                            <span>Ver Detalhes</span>
                        </Link>
                    </div>
                    <div>
                        <ul className="flex flex-col gap-2 justify-center items-center mt-4 md:grid md:grid-cols-3">
                            <li className="grid grid-cols-[30px_1fr] gap-2 p-2 bg-cinza rounded-xl max-w-[350px]">
                                <div className="w-[30px] h-[30px] my-auto flex justify-center items-center bg-blue-700 rounded-full p-1">
                                    <FaEye className="text-3xl" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold leading-5">Classificação Inteligente</span>
                                </div>
                            </li>
                            <li className="grid grid-cols-[30px_1fr] gap-2 p-2 bg-cinza rounded-xl max-w-[350px]">
                                <div className="w-[30px] h-[30px] my-auto flex justify-center items-center bg-yellow-700 rounded-full p-1">
                                    <TbChartInfographic className="text-3xl" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold leading-5">Priorização Automática</span>
                                </div>
                            </li>
                            <li className="grid grid-cols-[30px_1fr] gap-2 p-2 bg-cinza rounded-xl max-w-[350px]">
                                <div className="w-[30px] h-[30px] my-auto flex justify-center items-center bg-green-700 rounded-full p-1">
                                    <IoShieldCheckmark className="text-3xl" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold leading-5">Transparência Total</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="bg-azul-escuro p-4 max-w-[600px] h-fit my-auto flex flex-col gap-2">
                    <div className="flex justify-between">
                        <h3 className="font-bebas text-2xl">Mapa de problemas</h3>
                        <div className="flex items-center gap-2 bg-red-700 px-2 rounded-md">
                            <p className="text-sm rounded-md">Ver mapa completo</p>
                            <HiInformationCircle />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="w-full h-[280px] bg-zinc-600 rounded-md overflow-hidden">
                            <MapProblems
                                problemas={denuncias.filter(d => d.status == 'aberto' || d.status === 'em-andamento').map((d) => ({

                                    id: d.id,

                                    titulo: d.tipoDoProblema,

                                    categoria: d.categoria,

                                    risco: d.risco,

                                    endereco: {
                                        latitude: d.endereco.latitude,
                                        longitude: d.endereco.longitude
                                    },

                                    tipoDoProblema: d.tipoDoProblema
                                }))}
                            />
                        </div>
                        <ul className="grid grid-cols-2 md:grid-cols-4">
                            <li className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <span>Alto Risco</span>
                            </li>
                            <li className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <span>Médio Risco</span>
                            </li>
                            <li className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span>Baixo Risco</span>
                            </li>
                            <li className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                <span>Não definido</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}