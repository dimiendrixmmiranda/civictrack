'use client'
import { useDenuncias } from "@/hooks/useDenuncias";
import Link from "next/link";
import { IoIosInformationCircle } from "react-icons/io";

export default function TabelaDeProblemas() {
    const { denuncias } = useDenuncias()

    return (
        <section className="bg-black col-start-1 col-end-2 row-start-1 row-end-3">
            <div className="bg-cinza p-4 flex flex-col gap-4 rounded-xl">
                <div className="flex justify-between items-center">
                    <h2 className="font-bebas text-2xl">Problemas recentes</h2>
                    <Link href={'/'} className="flex items-center gap-1 bg-azul-escuro p-1 rounded-full md:py-2 md:px-4">
                        <IoIosInformationCircle className="text-2xl md:text-xl" />
                        <p className="hidden md:flex">
                            Ver Todas as denúncias
                        </p>
                    </Link>
                </div>
                <div className="overflow-x-auto barraTabela">
                    <div className="flex flex-col min-w-[1000px]">
                        <div className="
                            grid
                            grid-cols-[40px_minmax(0,1fr)_80px]
                            lg:grid-cols-[40px_minmax(0,1fr)_130px_130px_130px_130px_130px]
                            gap-3
                            border-y-2
                            border-zinc-700
                            py-2
                        ">
                            <div></div>
                            <div className="truncate">
                                Problema
                            </div>
                            <div className="hidden lg:block">
                                Categoria
                            </div>
                            <div className="hidden lg:block">
                                Risco
                            </div>
                            <div className="hidden lg:block">
                                Prioridade
                            </div>
                            <div className="hidden lg:block">
                                Status
                            </div>
                            <div className="hidden lg:block">
                                Data
                            </div>
                            <div className="lg:hidden">
                                Info
                            </div>
                        </div>

                        {denuncias.slice(0,5).map((problema) => (
                            <div
                                key={problema.id}
                                className="
                                    grid
                                    grid-cols-[40px_minmax(0,1fr)_80px]
                                    lg:grid-cols-[40px_minmax(200,1fr)_130px_130px_130px_130px_130px]
                                    gap-3
                                    py-3
                                    border-b
                                    border-zinc-800
                                "
                            >
                                <div className="flex items-center justify-center">
                                    <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                                </div>
                                <div className="truncate flex flex-col">
                                    <p className="font-bold">{problema.tipoDoProblema}</p>
                                    <span className="barraSpan">{problema.endereco.rua}, {problema.endereco.numero} - {problema.endereco.bairro}</span>
                                </div>
                                <div className="hidden capitalize lg:block">
                                    {problema.categoria.replaceAll('-', ' ')}
                                </div>
                                <div className="hidden capitalize lg:block">
                                    {problema.risco ? problema.risco : 'Não definido'}
                                </div>
                                <div className="hidden lg:block">
                                    {problema.prioridade ? problema.prioridade : 'Não definido'}
                                </div>
                                <div className="hidden capitalize lg:block">
                                    {problema.status.replaceAll('-', ' ')}
                                </div>
                                <div className="hidden lg:block">
                                    {new Date(problema.createdAt).toLocaleDateString("pt-BR")}
                                </div>
                                <div className="lg:hidden">
                                    Info
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <Link href={'/'} className="flex items-center justify-center gap-1 p-2 rounded-full">
                        <IoIosInformationCircle className="text-2xl md:text-xl" />
                        <p className="hidden md:flex">
                            Ver Todas as denúncias
                        </p>
                    </Link>
                </div>
            </div>
        </section>
    )
}