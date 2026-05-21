'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiFillInstagram } from "react-icons/ai";
import { FaCheck, FaFacebook, FaHeadphones, FaHeart, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { FiAlertCircle, FiAlertTriangle, FiBell, FiHeart, FiHome, FiInfo, FiLogOut, FiMail, FiSettings, FiUser } from "react-icons/fi";
import { IoMailSharp } from "react-icons/io5";

export default function Rodape() {
    const [email, setEmail] = useState('')
    return (
        <footer className="bg-cinza">
            <div className="max-w-[1440px] mx-auto p-4 flex flex-col gap-8 md:p-8 lg:grid lg:grid-cols-[300px_1fr]">
                <div className="flex flex-col gap-4">
                    <Link href={'/'} className="flex items-center gap-1">
                        <div className="relative w-10 h-10">
                            <Image
                                alt="Logo do projeto CivicTrack"
                                src={'/logo/logo.png'}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h2 className="font-bebas text-3xl mt-1.5">
                            CivicTrack
                        </h2>
                    </Link>
                    <p>Plataforma inteligente que conecta os cidadãos e gestores para transformar problemas urbanos em soluções reais</p>
                    <ul>
                        <li>
                            <div className="flex gap-2 items-center">
                                <FaCheck className="bg-green-600 p-1 rounded-full" />
                                <p>Transparência</p>
                            </div>
                        </li>
                        <li>
                            <div className="flex gap-2 items-center">
                                <FaCheck className="bg-green-600 p-1 rounded-full" />
                                <p>Participação cidadã</p>
                            </div>
                        </li>
                        <li>
                            <div className="flex gap-2 items-center">
                                <FaCheck className="bg-green-600 p-1 rounded-full" />
                                <p>Inovação</p>
                            </div>
                        </li>
                        <li>
                            <div className="flex gap-2 items-center">
                                <FaCheck className="bg-green-600 p-1 rounded-full" />
                                <p>Compromisso com a cidade</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="md:grid grid-cols-3">
                    <div className="flex flex-col gap-4">
                        <div>
                            <h3 className="font-bebas text-2xl text-verde pb-1">Navegação</h3>
                            <div className="w-[50px] h-1 bg-verde"></div>
                        </div>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <Link href={'/'} className="flex items-center gap-2">
                                    <FiHome />
                                    <p>Início</p>
                                </Link>
                            </li>

                            <li>
                                <Link href={'/sobre'} className="flex items-center gap-2">
                                    <FiInfo />
                                    <p>Sobre</p>
                                </Link>
                            </li>

                            <li>
                                <Link href={'/denuncias'} className="flex items-center gap-2">
                                    <FiAlertTriangle />
                                    <p>Denúncias</p>
                                </Link>
                            </li>

                            <li>
                                <Link href={'/contato'} className="flex items-center gap-2">
                                    <FiMail />
                                    <p>Contato</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div>
                            <h3 className="font-bebas text-2xl text-verde pb-1">Usuário</h3>
                            <div className="w-[50px] h-1 bg-verde"></div>
                        </div>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <Link href={'/usuario'} className="flex items-center gap-2">
                                    <FiUser />
                                    <p>Meu perfil</p>
                                </Link>
                            </li>

                            <li>
                                <Link href={'/usuario'} className="flex items-center gap-2">
                                    <FiAlertCircle />
                                    <p>Minhas Denúncias</p>
                                </Link>
                            </li>

                            <li>
                                <Link href={'/usuario'} className="flex items-center gap-2">
                                    <FiHeart />
                                    <p>Favoritos</p>
                                </Link>
                            </li>

                            <li>
                                <Link href={'/usuario'} className="flex items-center gap-2">
                                    <FiBell />
                                    <p>Notificações</p>
                                </Link>
                            </li>

                            <li>
                                <Link href={'/usuario'} className="flex items-center gap-2">
                                    <FiSettings />
                                    <p>Configurações</p>
                                </Link>
                            </li>

                            <li>
                                <Link href={'/usuario'} className="flex items-center gap-2">
                                    <FiLogOut />
                                    <p>Sair</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div>
                            <h3 className="font-bebas text-2xl text-verde pb-1">Contato</h3>
                            <div className="w-[50px] h-1 bg-verde"></div>
                        </div>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <Link href={'/'} className="flex items-center gap-2">
                                    <FiUser />
                                    <p>contato@civictrack.com</p>
                                </Link>
                            </li>
                            <li>
                                <Link href={'/'} className="flex items-center gap-2">
                                    <FiUser />
                                    <p>11 9 9999-9999</p>
                                </Link>
                            </li>
                            <li>
                                <Link href={'/'} className="flex items-center gap-2">
                                    <FiUser />
                                    <p>Rua Antonio Benedito Alves de Lara, 300</p>
                                </Link>
                            </li>
                        </ul>
                        <div className="border-2 border-black p-2 bg-verde rounded-lg grid grid-cols-[40px_1fr] gap-3">
                            <div className="w-10 h-10 rounded-full bg-white mx-auto my-auto flex justify-center items-center">
                                <FaHeadphones className="text-3xl text-green-600" />
                            </div>
                            <div style={{ textShadow: '1px 1px 2px black' }}>
                                <h4 className="font-bebas text-xl">Precisa de ajuda?</h4>
                                <p className="text-[.6em]">Fale conosco, estamos prontos para te atender.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 lg:col-span-3 xl:grid xl:grid-cols-[1fr_350px] xl:gap-6">
                    <div className="flex flex-col items-center gap-3 bg-cinza-2 p-2 rounded-xl md:flex-row lg:p-4 lg:gap-6 lg:grid lg:grid-cols-[auto_1fr]">
                        <div className="grid grid-cols-[40px_1fr] gap-2 lg:grid-cols-[70px_1fr] lg:gap-5">
                            <div className="w-10 h-10 bg-verde rounded-full mx-auto my-auto flex justify-center items-center lg:w-[70px] lg:h-[70px]">
                                <IoMailSharp className="text-2xl lg:text-4xl"/>
                            </div>
                            <div className="flex flex-col">
                                <h4 className="font-bebas text-2xl lg:text-4xl">Fique por dentro!</h4>
                                <span className="text-xs lg:text-base">Receba novidades e informações sobre sua cidade</span>
                            </div>
                        </div>
                        <div className="border-2 border-cinza rounded-xl grid grid-cols-[1fr_100px] md:grid-cols-[1fr_150px]">
                            <input className="w-full px-2 py-1" type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Seu melhor email" />
                            <button className="text-sm bg-verde p-1 rounded-lg md:text-lg md:p-2">Inscrever-se</button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 my-auto">
                        <div>
                            <h3 className="font-bebas text-2xl text-verde">Siga-nos</h3>
                            <div className="w-[40px] h-1 bg-verde"></div>
                        </div>
                        <div>
                            <ul className="flex items-center gap-4">
                                <li>
                                    <Link href={'/'}>
                                        <div className="bg-blue-600 p-2 rounded-full w-fit">
                                            <FaFacebook className="text-2xl"/>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/'}>
                                        <div className="bg-pink-500 p-2 rounded-full w-fit">
                                            <AiFillInstagram className="text-2xl"/>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/'}>
                                        <div className="bg-indigo-600 p-2 rounded-full w-fit">
                                            <FaTwitter className="text-2xl"/>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/'}>
                                        <div className="bg-blue-400 p-2 rounded-full w-fit">
                                            <FaLinkedin className="text-2xl"/>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/'}>
                                        <div className="bg-red-600 p-2 rounded-full w-fit">
                                            <FaYoutube className="text-2xl"/>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 border-t-2 border-zinc-500 pt-4 lg:col-span-3 lg:flex-row lg:justify-between">
                    <span className="text-center">© 2025 <b className="text-verde">CivicTrack</b>. Todos os direitos reservados.</span>
                    <p className="text-center text-[.7em] flex gap-1 justify-center items-center lg:text-base">Desenvolvido com <FaHeart className="text-verde" /> para uma cidade melhor</p>
                </div>
            </div>
        </footer>
    )
}