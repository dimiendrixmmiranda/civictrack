import CarrosselTecnologico from "@/components/sobre/CarrosselTecnologico";
import Template from "@/components/template/Template";
import Image from "next/image";
import { FaCode, FaEye, FaHeart, FaStar, FaTools } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import { TbTargetArrow } from "react-icons/tb";

export default function Page() {
    return (
        <Template>
            <section
                className="
                p-4 text-white
                bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,1.2)),url('/cidade/praca.png')]
                bg-cover bg-center
                min-h-screen
                md:p-6
            "
            >
                <div className="xl:grid xl:grid-cols-2 xl:gap-10 max-w-[1440px] mx-auto">
                    <button className="bg-verde-claro border-2 border-verde p-1 px-4 font-bebas text-2xl rounded-2xl mb-4 col-start-1 col-end-3 max-w-[250px]" style={{ textShadow: '1px 1px 2px black' }}>
                        Sobre o projeto
                    </button>
                    <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <h2 className="font-bebas text-6xl">Sobre o <b className="text-verde-claro">CIVICTRACK</b></h2>
                            <p className="">
                                O Civictrack é uma plataforma desenvolvida para facilitar o registro, a gestão e o acompanhamento de problemas urbanos. Nosso objetivo é conectar cidadãos e gestores para transformar dados em ações e tornar as cidades melhores para todos.
                            </p>
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="relative w-[250px] h-[250px] md:w-[300px] md:h-[300px] xl:w-[280px] xl:h-[280px]">
                                <Image alt="Imagem do sobre" src={'/logo/sobre.png'} fill className="object-cover" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 md:grid md:grid-cols-3 xl:grid xl:grid-cols-3 xl:gap-5">
                        <div className="flex flex-col justify-center items-center bg-azul-escuro p-4 max-w-[350px] mx-auto max-h-[340px] rounded-lg h-full my-auto">
                            <TbTargetArrow className="text-8xl" />
                            <h3 className="font-bebas text-4xl">Missão</h3>
                            <p className="text-center text-sm">
                                Promover cidades mais seguras, organizadas e transparentes através da tecnologia e da participação cidadã.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center items-center bg-azul-escuro p-4 max-w-[350px] mx-auto max-h-[340px] rounded-lg h-full my-auto">
                            <FaEye className="text-8xl" />
                            <h3 className="font-bebas text-4xl">Visão</h3>
                            <p className="text-center text-sm">
                                Ser referência nacional em soluções tecnológicas para gestão de problemas urbanos e inteligência cidadã.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center items-center bg-azul-escuro p-4 max-w-[350px] w-full mx-auto max-h-[340px] rounded-lg h-full my-auto">
                            <FaHeart className="text-8xl" />
                            <h3 className="font-bebas text-4xl">Valores</h3>
                            <ul>
                                <li className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full bg-verde"></div>
                                    <p>Transparência</p>
                                </li>
                                <li className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full bg-verde"></div>
                                    <p>Participação Cidadã</p>
                                </li>
                                <li className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full bg-verde"></div>
                                    <p>Inovação</p>
                                </li>
                                <li className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full bg-verde"></div>
                                    <p>Compromisso Social</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="xl:col-start-1 xl:col-end-3">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <FaTools className="xl:text-6xl text-verde-claro" />
                                    <h2 className="font-bebas xl:text-6xl mt-1">Mapa de funcionalidades</h2>
                                </div>
                                <p>Confira os principais recursos do CivicTrack organizados por nível de maturidade.</p>
                            </div>
                            <div className="xl:grid xl:grid-cols-4 gap-4 2xl:gap-6">
                                <div>
                                    <div className="bg-cinza p-4 rounded-md flex flex-col gap-3 w-fit">
                                        <div className="flex items-center gap-1 text-xl">
                                            <div className="w-4 h-4 bg-verde rounded-full"></div>
                                            <h4><b className="text-verde">1.Core</b> (Essencial)</h4>
                                        </div>
                                        <ul>
                                            <li className="flex items-center gap-1">
                                                <FiTarget className="text-verde" />
                                                <p>Gestão completa de problemas (CRUD)</p>
                                            </li>
                                            <li className="flex items-center gap-1">
                                                <FiTarget className="text-verde" />
                                                <p>Gestão completa de problemas (CRUD)</p>
                                            </li>
                                            <li className="flex items-center gap-1">
                                                <FiTarget className="text-verde" />
                                                <p>Gestão completa de problemas (CRUD)</p>
                                            </li>
                                            <li className="flex items-center gap-1">
                                                <FiTarget className="text-verde" />
                                                <p>Gestão completa de problemas (CRUD)</p>
                                            </li>
                                            <li className="flex items-center gap-1">
                                                <FiTarget className="text-verde" />
                                                <p>Gestão completa de problemas (CRUD)</p>
                                            </li>
                                        </ul>
                                        <div className="bg-green-800/40 rounded-xl p-2 grid grid-cols-[40px_1fr] gap-2 max-w-[380px]">
                                            <div className="w-10 h-10 bg-verde flex justify-center items-center rounded-xl my-auto">
                                                <FaStar />
                                            </div>
                                            <p className="leading-5 text-sm">Base sólida para qualquer cidade começar a organizar seus problemas urbanos</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="bg-cinza p-4 rounded-md flex flex-col gap-3 w-fit">
                                        <div className="flex items-center gap-1 text-xl">
                                            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                                            <h4><b className="text-yellow-500">2.Intermediário</b></h4>
                                        </div>
                                        <ul>
                                            <li className="flex items-center gap-1">
                                                <FiTarget className="text-yellow-500" />
                                                <p>Gestão completa de problemas (CRUD)</p>
                                            </li>
                                            <li className="flex items-center gap-1">
                                                <FiTarget className="text-yellow-500" />
                                                <p>Gestão completa de problemas (CRUD)</p>
                                            </li>
                                            <li className="flex items-center gap-1">
                                                <FiTarget className="text-yellow-500" />
                                                <p>Gestão completa de problemas (CRUD)</p>
                                            </li>
                                            <li className="flex items-center gap-1">
                                                <FiTarget className="text-yellow-500" />
                                                <p>Gestão completa de problemas (CRUD)</p>
                                            </li>
                                            <li className="flex items-center gap-1">
                                                <FiTarget className="text-yellow-500" />
                                                <p>Gestão completa de problemas (CRUD)</p>
                                            </li>
                                        </ul>
                                        <div className="bg-yellow-500/40 rounded-xl p-2 grid grid-cols-[40px_1fr] gap-2 max-w-[380px]">
                                            <div className="w-10 h-10 bg-yellow-500 flex justify-center items-center rounded-xl my-auto">
                                                <FaStar />
                                            </div>
                                            <p className="leading-5 text-sm">Base sólida para qualquer cidade começar a organizar seus problemas urbanos</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="bg-cinza p-4 rounded-md flex flex-col gap-3 w-fit">
                                        <div className="flex items-center gap-1 text-xl">
                                            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                                            <h4><b className="text-red-500">3.Avançado</b></h4>
                                        </div>
                                        <ul>
                                            <li className="flex items-center gap-1">
                                                <FiTarget className="text-red-500" />
                                                <p>Gestão completa de problemas (CRUD)</p>
                                            </li>
                                            <li className="flex items-center gap-1">
                                                <FiTarget className="text-red-500" />
                                                <p>Gestão completa de problemas (CRUD)</p>
                                            </li>
                                            <li className="flex items-center gap-1">
                                                <FiTarget className="text-red-500" />
                                                <p>Gestão completa de problemas (CRUD)</p>
                                            </li>
                                            <li className="flex items-center gap-1">
                                                <FiTarget className="text-red-500" />
                                                <p>Gestão completa de problemas (CRUD)</p>
                                            </li>
                                            <li className="flex items-center gap-1">
                                                <FiTarget className="text-red-500" />
                                                <p>Gestão completa de problemas (CRUD)</p>
                                            </li>
                                        </ul>
                                        <div className="bg-green-800/40 rounded-xl p-2 grid grid-cols-[40px_1fr] gap-2 max-w-[380px]">
                                            <div className="w-10 h-10 bg-red-500 flex justify-center items-center rounded-xl my-auto">
                                                <FaStar />
                                            </div>
                                            <p className="leading-5 text-sm">Base sólida para qualquer cidade começar a organizar seus problemas urbanos</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="bg-cinza p-4 rounded-md flex flex-col gap-3 w-fit">
                                        <div className="flex items-center gap-1 text-xl">
                                            <div className="w-4 h-4 bg-violet-500 rounded-full"></div>
                                            <h4><b className="text-violet-500">4.Diferenciais</b></h4>
                                        </div>
                                        <ul>
                                            <li className="flex items-center gap-1">
                                                <FiTarget className="text-violet-500" />
                                                <p>Gestão completa de problemas (CRUD)</p>
                                            </li>
                                            <li className="flex items-center gap-1">
                                                <FiTarget className="text-violet-500" />
                                                <p>Gestão completa de problemas (CRUD)</p>
                                            </li>
                                            <li className="flex items-center gap-1">
                                                <FiTarget className="text-violet-500" />
                                                <p>Gestão completa de problemas (CRUD)</p>
                                            </li>
                                            <li className="flex items-center gap-1">
                                                <FiTarget className="text-violet-500" />
                                                <p>Gestão completa de problemas (CRUD)</p>
                                            </li>
                                            <li className="flex items-center gap-1">
                                                <FiTarget className="text-violet-500" />
                                                <p>Gestão completa de problemas (CRUD)</p>
                                            </li>
                                        </ul>
                                        <div className="bg-green-800/40 rounded-xl p-2 grid grid-cols-[40px_1fr] gap-2 max-w-[380px]">
                                            <div className="w-10 h-10 bg-violet-500 flex justify-center items-center rounded-xl my-auto">
                                                <FaStar />
                                            </div>
                                            <p className="leading-5 text-sm">Base sólida para qualquer cidade começar a organizar seus problemas urbanos</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-cinza p-4 rounded-xl xl:col-start-1 xl:col-end-3 xl:grid xl:grid-cols-[auto_1fr] xl:gap-6 xl:px-8 xl:py-0">
                        <div className="flex items-center text-center gap-2">
                            <div className="bg-verde-claro p-2 rounded-2xl">
                                <FaCode className="xl:text-4xl font-bebas" />
                            </div>
                            <h3 className="font-bebas text-4xl">Tecnologias Utilizadas</h3>
                        </div>
                        <div className="overflow-hidden">
                            <CarrosselTecnologico />
                        </div>
                    </div>
                </div>
            </section>
        </Template>
    )
}