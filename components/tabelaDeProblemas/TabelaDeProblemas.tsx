'use client'
import { useDenuncias } from "@/hooks/useDenuncias";
import Denuncia from "@/interfaces/Denuncia";
import Image from "next/image";
import Link from "next/link";
import { IoIosInformationCircle } from "react-icons/io";

interface TabelaDeProblemasProps {
    denuncias: Denuncia[]
    qtdeDeLinhas: number
    altura: string
}

export default function TabelaDeProblemas({ denuncias, qtdeDeLinhas, altura }: TabelaDeProblemasProps) {

    return (
        <section className="col-start-1 col-end-2">
            <div className="bg-cinza-2 p-4 flex flex-col gap-4 rounded-xl overflow-hidden">
                <div className="flex justify-between items-center">
                    <h2 className="font-bebas text-2xl">Problemas recentes</h2>
                    <Link href={'/'} className="flex items-center gap-1 bg-azul-escuro p-1 rounded-full md:py-2 md:px-4">
                        <IoIosInformationCircle className="text-2xl md:text-xl" />
                        <p className="hidden md:flex">
                            Ver Todas as denúncias
                        </p>
                    </Link>
                </div>
                <div className={`overflow-x-auto ${altura} barraTabela flex flex-col justify-center items-center`}>
                    {
                        denuncias.length > 0 ? (
                            <div className="flex flex-col w-full h-full mb-auto">
                                <div className="
                                    grid
                                    grid-cols-[40px_minmax(0,1fr)_80px]
                                    lg:grid-cols-[40px_minmax(0,1fr)_130px_130px_130px_130px_130px]
                                    gap-3
                                    border-y-2
                                    border-cinza-2
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
                                {denuncias.slice(0, (qtdeDeLinhas || denuncias.length)).map((problema) => (
                                    <div
                                        key={problema.id}
                                        className="
                                    grid
                                    grid-cols-[40px_minmax(0,1fr)_80px]
                                    lg:grid-cols-[40px_minmax(200,1fr)_130px_130px_130px_130px_130px]
                                    gap-3
                                    py-3
                                    border-b
                                    border-cinza-2
                                "
                                    >
                                        <div className="flex items-center justify-center">
                                            <div className="w-8 h-8 rounded-full relative">
                                                <Image alt={problema.categoria} src={`/categorias/${problema.categoria}.png`} fill className="object-cover"/>
                                            </div>
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
                        ) : (
                            <div className="flex justify-center items-center w-full h-full">
                                <h2 className="font-bebas text-4xl text-center">Nenhuma denúncia cadastrada!</h2>
                            </div>
                        )
                    }
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