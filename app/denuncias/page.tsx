'use client'
import Template from "@/components/template/Template";
import { useDenuncias } from "@/hooks/useDenuncias";
import Image from "next/image";
import { useState } from "react";
import { AiFillContainer } from "react-icons/ai";
import { CgSearchLoading } from "react-icons/cg";
import { FaRegBell, FaRegCommentDots, FaRegFlag, FaRegHeart, FaUserCheck } from "react-icons/fa";
import { FaArrowsRotate, FaLocationDot } from "react-icons/fa6";
import { IoFilterSharp } from "react-icons/io5";
import { MdDateRange, MdOutlinePerson2, MdReportProblem } from "react-icons/md";
import { TbChartInfographic } from "react-icons/tb";

export default function Page() {
    const [busca, setBusca] = useState('')
    const [categoria, setCategoria] = useState('')
    const [status, setStatus] = useState('')

    const { denuncias } = useDenuncias()

    const [active, setActive] = useState<'todas-as-denuncias' | 'minhas-denuncias' | 'favoritos' | 'acompanhar' | 'estatisticas'>('todas-as-denuncias')

    return (
        <Template>
            <div className="bg-cinza min-h-screen p-4 2xl:p-8">
                <div className="flex flex-col xl:grid xl:grid-cols-[200px_1fr_300px] xl:gap-8 2xl:grid-cols-[300px_1fr_400px]">
                    <div className="flex-1 flex flex-col gap-4">
                        <ul className="flex flex-col gap-1">
                            <li onClick={(e) => setActive('todas-as-denuncias')} className={`flex items-center gap-2 p-2 rounded-xl hover:bg-green-900 cursor-pointer hover:text-white duration-500 transition-all ${active === 'todas-as-denuncias' ? 'bg-green-900 text-white' : 'text-zinc-400'}`}>
                                <FaRegFlag className="text-green-500" />
                                <span>Todas as Denúncias</span>
                            </li>

                            <li onClick={(e) => setActive('minhas-denuncias')} className={`flex items-center gap-2 p-2 rounded-xl hover:bg-green-900 cursor-pointer hover:text-white duration-500 transition-all ${active === 'minhas-denuncias' ? 'bg-green-900 text-white' : 'text-zinc-400'}`}>
                                <MdOutlinePerson2 className="text-green-500" />
                                <span>Minhas Denúncias</span>
                            </li>

                            <li onClick={(e) => setActive('favoritos')} className={`flex items-center gap-2 p-2 rounded-xl hover:bg-green-900 cursor-pointer hover:text-white duration-500 transition-all ${active === 'favoritos' ? 'bg-green-900 text-white' : 'text-zinc-400'}`}>
                                <FaRegHeart className="text-green-500" />
                                <span>Favoritos</span>
                            </li>
                            <li onClick={(e) => setActive('acompanhar')} className={`flex items-center gap-2 p-2 rounded-xl hover:bg-green-900 cursor-pointer hover:text-white duration-500 transition-all ${active === 'acompanhar' ? 'bg-green-900 text-white' : 'text-zinc-400'}`}>
                                <CgSearchLoading className="text-green-500" />
                                <span>Acompanhar</span>
                            </li>

                            <li onClick={(e) => setActive('estatisticas')} className={`flex items-center gap-2 p-2 rounded-xl hover:bg-green-900 cursor-pointer hover:text-white duration-500 transition-all ${active === 'estatisticas' ? 'bg-green-900 text-white' : 'text-zinc-400'}`}>
                                <TbChartInfographic className="text-green-500" />
                                <span>Estatisticas</span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="border-b-2 border-zinc-600 pb-4">
                            <h2 className="font-bebas text-4xl">Denúncias</h2>
                            <span>Acompanhe, explore e ajude a resolver problemas na sua cidade.</span>
                        </div>
                        <div className="flex flex-col items-center gap-4 md:flex-row">
                            <input className="p-3 rounded border border-zinc-500" type="search" name="buscar" id="buscar" placeholder="Buscar Denúncias" value={busca} onChange={(e) => setBusca(e.target.value)} />
                            <select
                                id="categoria"
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                                className="p-3 rounded border border-zinc-500"
                            >
                                <option className="bg-zinc-500 text-zinc-200" value="">
                                    Selecione
                                </option>

                                <option className="bg-zinc-500 text-zinc-200" value="infraestrutura">
                                    Infraestrutura
                                </option>

                                <option className="bg-zinc-500 text-zinc-200" value="iluminacao">
                                    Iluminação
                                </option>

                                <option className="bg-zinc-500 text-zinc-200" value="limpeza">
                                    Limpeza
                                </option>

                                <option className="bg-zinc-500 text-zinc-200" value="meio-ambiente">
                                    Meio Ambiente
                                </option>

                                <option className="bg-zinc-500 text-zinc-200" value="drenagem">
                                    Drenagem
                                </option>

                                <option className="bg-zinc-500 text-zinc-200" value="seguranca">
                                    Segurança
                                </option>

                                <option className="bg-zinc-500 text-zinc-200" value="outro">
                                    Outro
                                </option>
                            </select>
                            <select className="p-3 rounded border border-zinc-500" name="risco" id="risco" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="" className="bg-zinc-500 text-zinc-200">Status</option>
                                <option value="aberto" className="bg-zinc-500 text-zinc-200">Aberto</option>
                                <option value="em-andamento" className="bg-zinc-500 text-zinc-200">Em Andamento</option>
                                <option value="resolvido" className="bg-zinc-500 text-zinc-200">Resolvido</option>
                            </select>
                            <button className="flex items-center gap-1 border-2 border-cinza-2 p-2 bg-zinc-600 rounded-xl whitespace-nowrap">
                                <IoFilterSharp />
                                <p className="font-bebas text-xl">Mais filtros</p>
                            </button>
                        </div>
                        <div>
                            <ul className="flex flex-col gap-4">
                                {
                                    denuncias.map((denuncia => {
                                        return (
                                            <li key={denuncia.id}>
                                                <div className="flex flex-col bg-cinza-2 p-2 rounded-xl md:grid grid-cols-[180px_1fr] gap-2 xl:p-4">
                                                    <div className="relative w-[180px] h-[130px] border border-verde rounded-lg">
                                                        <Image alt={denuncia.tipoDoProblema} src={denuncia.imagem} fill className="object-cover" />
                                                    </div>
                                                    <div className="flex flex-col w-full">
                                                        <div className="flex justify-between">
                                                            <div className="flex items-center gap-1">
                                                                <div className="relative w-8 h-8"><Image alt="icone da denuncia" src={`/categorias/${denuncia.categoria}.png`} fill className="object-cover" /></div>
                                                                <h4 className="capitalize font-bebas text-xl mt-1">{denuncia.categoria}</h4>
                                                            </div>
                                                            <div>
                                                                <p className="uppercase font-bold border-2 border-cinza rounded-xl px-2 py-1">{denuncia.status}</p>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h3>{denuncia.tipoDoProblema}</h3>
                                                        </div>
                                                        <div>
                                                            <p>{denuncia.endereco.rua}, {denuncia.endereco.numero} - {denuncia.endereco.bairro} ({denuncia.endereco.complemento})</p>
                                                        </div>
                                                        <div className="flex items-center mt-auto">
                                                            <div className="flex items-center gap-1">
                                                                <MdDateRange className="text-xl" />
                                                                <p className="mt-1">
                                                                    {new Date(denuncia.createdAt).toLocaleString('pt-BR', {
                                                                        day: '2-digit',
                                                                        month: '2-digit',
                                                                        year: 'numeric',
                                                                        hour: '2-digit',
                                                                        minute: '2-digit'
                                                                    })}
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <FaLocationDot />
                                                                <span>1,2Km de você!</span>
                                                            </div>
                                                            <div className="ml-auto">
                                                                <button><FaRegCommentDots /></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    }))
                                }
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div className="bg-cinza-2 p-4 rounded-xl">
                            <h3 className="font-bebas text-2xl">Resumo</h3>
                            <div>
                                <ul className="2xl:grid 2xl:grid-cols-2 2xl:gap-4">
                                    <li className="flex gap-2 justify-center items-center bg-cinza p-2 rounded-xl">
                                        <div className="text-verde">
                                            <AiFillContainer className="text-5xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-bebas text-2xl leading-6 text-verde">158</h3>
                                            <span className="text-sm">Total</span>
                                        </div>
                                    </li>
                                    <li className="flex gap-2 justify-center items-center bg-cinza p-2 rounded-xl">
                                        <div className="text-red-600">
                                            <MdReportProblem className="text-5xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-bebas text-2xl leading-6 text-red-600">250</h3>
                                            <span className="text-sm">Abertas</span>
                                        </div>
                                    </li>
                                    <li className="flex gap-2 justify-center items-center bg-cinza p-2 rounded-xl">
                                        <div className="text-verde">
                                            <FaArrowsRotate className="text-5xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-bebas text-2xl leading-6 text-verde">25</h3>
                                            <span className="text-sm">Em análise</span>
                                        </div>
                                    </li>
                                    <li className="flex gap-2 justify-center items-center bg-cinza p-2 rounded-xl">
                                        <div className="text-verde">
                                            <FaUserCheck className="text-5xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-bebas text-2xl leading-6 text-verde">108</h3>
                                            <span className="text-sm">Resolvidos</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-cinza-2 p-4 rounded-xl">
                            <h3 className="font-bebas text-2xl">Categorias</h3>
                        </div>
                    </div>
                </div>
            </div>
        </Template>
    )
}