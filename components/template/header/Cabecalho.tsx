'use client'

import SidebarComponent from "@/components/sidebarComponent/SidebarComponent";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FaHome } from "react-icons/fa";
import { MdPermPhoneMsg } from "react-icons/md";
import { PiExclamationMarkFill } from "react-icons/pi";
import { RiLoginBoxFill } from "react-icons/ri";
import { TbInfoHexagonFilled } from "react-icons/tb";

export default function Cabecalho() {

    const { user } = useUser()

    const pathname = usePathname()

    return (
        <header className="bg-azul-escuro grid grid-cols-[1fr_40px] p-2 md:grid-cols-[auto_1fr_140px]">
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
            <ul className="hidden justify-center gap-2 md:flex">
                <li
                    className={`
                        flex
                        justify-center
                        items-center
                        p-2
                        transition-all
                        border-b-2
                        ${pathname === '/'
                            ? 'border-verde'
                            : 'border-transparent'
                        }
                    `}
                >
                    <Link
                        href={'/'}
                        className="flex items-center gap-1 font-semibold"
                    >
                        <div className={`
                            transition-all
                            ${pathname === '/'
                                ? 'text-verde'
                                : 'text-white'
                            }
                        `}>
                            <FaHome />
                        </div>

                        <span>Início</span>
                    </Link>
                </li>
                <li
                    className={`
                        flex
                        justify-center
                        items-center
                        p-2
                        transition-all
                        border-b-2
                        ${pathname === '/sobre'
                            ? 'border-verde'
                            : 'border-transparent'
                        }
                    `}
                >
                    <Link
                        href={'/sobre'}
                        className="flex items-center gap-1 font-semibold"
                    >
                        <div className={`
                            transition-all
                            ${pathname === '/sobre'
                                ? 'text-verde'
                                : 'text-white'
                            }
                        `}>
                            <TbInfoHexagonFilled />
                        </div>

                        <span>Sobre</span>
                    </Link>
                </li>
                <li
                    className={`
                        flex
                        justify-center
                        items-center
                        p-2
                        transition-all
                        border-b-2
                        ${pathname === '/denuncias'
                            ? 'border-verde'
                            : 'border-transparent'
                        }
                    `}
                >
                    <Link
                        href={'/denuncias'}
                        className="flex items-center gap-1 font-semibold"
                    >
                        <div className={`
                            transition-all
                            ${pathname === '/denuncias'
                                ? 'text-verde'
                                : 'text-white'
                            }
                        `}>
                            <PiExclamationMarkFill />
                        </div>

                        <span>Denúncias</span>
                    </Link>
                </li>
                <li
                    className={`
                        flex
                        justify-center
                        items-center
                        p-2
                        transition-all
                        border-b-2
                        ${pathname === '/contato'
                            ? 'border-verde'
                            : 'border-transparent'
                        }
                    `}
                >
                    <Link
                        href={'/contato'}
                        className="flex items-center gap-1 font-semibold"
                    >
                        <div className={`
                            transition-all
                            ${pathname === '/contato'
                                ? 'text-verde'
                                : 'text-white'
                            }
                        `}>
                            <MdPermPhoneMsg />
                        </div>

                        <span>Contato</span>
                    </Link>
                </li>

            </ul>

            <div className="hidden md:flex">
                {
                    user ? (
                        <Link
                            href={'/usuario'}
                            className="
                                grid
                                grid-cols-[40px_1fr]
                                gap-2
                                hover:bg-verde
                                cursor-pointer
                                rounded-md
                                transition-all
                                p-1
                            "
                        >

                            <div className="
                                relative
                                w-full
                                h-full
                                flex
                                justify-center
                                items-center
                                rounded-full
                                overflow-hidden
                                bg-zinc-900
                            ">
                                <Image
                                    alt="Imagem do usuario"
                                    src={'/logo/logo.png'}
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            <div
                                className="flex flex-col"
                                style={{ textShadow: '1px 1px 2px black' }}
                            >
                                <span className="text-sm">
                                    Bem vindo
                                </span>

                                <h2 className="font-bold text-center leading-5">
                                    {user.name?.split(" ")[0]}
                                </h2>
                            </div>

                        </Link>

                    ) : (

                        <ul className="w-full h-full justify-center items-center hidden md:flex">

                            <li
                                className="
                                    flex
                                    justify-center
                                    items-center
                                    p-2
                                    rounded-md
                                    bg-azul-claro
                                    transition-all
                                    hover:bg-verde
                                "
                                style={{ textShadow: '1px 1px 2px black' }}
                            >

                                <Link
                                    href={'/login'}
                                    className="flex items-center gap-1"
                                >

                                    <div>
                                        <RiLoginBoxFill />
                                    </div>

                                    <span>Entrar</span>

                                </Link>

                            </li>

                        </ul>

                    )
                }

            </div>
            <div className="md:hidden">
                <SidebarComponent />
            </div>
        </header>
    )
}