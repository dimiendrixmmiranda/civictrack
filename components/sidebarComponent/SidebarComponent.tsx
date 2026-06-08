
import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { GiHamburgerMenu } from 'react-icons/gi';
import { usePathname } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import Link from 'next/link';
import { FaFacebook, FaHome, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import { TbInfoHexagonFilled } from 'react-icons/tb';
import { PiExclamationMarkFill } from 'react-icons/pi';
import { MdPermPhoneMsg } from 'react-icons/md';
import { AiFillInstagram } from 'react-icons/ai';
import { RiLoginBoxFill } from 'react-icons/ri';
import Image from 'next/image';

export default function SidebarComponent() {
    const [visibleRight, setVisibleRight] = useState(false);
    const pathname = usePathname()
    const { user } = useUser()

    return (
        <div className="card w-full h-full flex justify-center items-center">
            <div className="flex gap-2 justify-center items-center text-2xl">
                <Button
                    icon={<GiHamburgerMenu />}
                    onClick={() => setVisibleRight(true)}
                />
            </div>

            <Sidebar visible={visibleRight} header={<h2 className='font-bold text-3xl'>Menu</h2>} position="right" onHide={() => setVisibleRight(false)} className='bg-azul-escuro p-4'>
                <div className='mt-2 flex flex-col gap-4 h-[98%]'>
                    <ul className="flex flex-col justify-start items-start gap-2">
                        <li
                            className={`
                                flex
                                justify-center
                                items-center
                                p-2
                                transition-all
                                border-b-2
                                text-lg
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
                                text-lg
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
                                text-lg
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
                                text-lg
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
                    <div className='mt-auto '>
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
                                        rounded-xl
                                        transition-all
                                        p-1
                                        bg-verde
                                    "
                                >

                                    <div className="
                                        relative
                                        w-10
                                        h-10
                                        flex
                                        justify-center
                                        items-center
                                        rounded-full
                                        overflow-hidden
                                        bg-zinc-900
                                    ">
                                        <Image
                                            alt="Imagem do usuario"
                                            src={user.imagem}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>

                                    <div
                                        className="flex gap-2 items-center"
                                        style={{ textShadow: '1px 1px 2px black' }}
                                    >
                                        <h3 className="text-lg leading-6 mb-1">
                                            Bem vindo <b className='font-bold'>{user.name?.split(" ")[0]}</b>
                                        </h3>
                                    </div>

                                </Link>
                            ) : (
                                <div
                                    className="
                                    flex
                                    justify-center
                                    text-xs
                                    lg:text-sm
                                    items-center
                                    p-2
                                    rounded-xl
                                    bg-cinza
                                    transition-all
                                    bg-verde
                                    hover:bg-azul-claro
                                "
                                    style={{ textShadow: '1px 1px 2px black' }}
                                >
                                    <Link
                                        href={'/login'}
                                        className="flex items-center text-lg font-bold gap-1"
                                    >
                                        <div>
                                            <RiLoginBoxFill />
                                        </div>
                                        <span>Entre ou Cadastre-se</span>
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                    <div className="flex flex-col gap-4">
                        <div>
                            <h3 className="font-bebas text-2xl text-verde">Siga-nos</h3>
                            <div className="w-[40px] h-1 bg-verde"></div>
                        </div>
                        <div>
                            <ul className="flex items-center gap-4">
                                <li>
                                    <Link href={'/'}>
                                        <div className="bg-blue-600 p-2 rounded-full w-fit">
                                            <FaFacebook className="text-2xl" />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/'}>
                                        <div className="bg-pink-500 p-2 rounded-full w-fit">
                                            <AiFillInstagram className="text-2xl" />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/'}>
                                        <div className="bg-indigo-600 p-2 rounded-full w-fit">
                                            <FaTwitter className="text-2xl" />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/'}>
                                        <div className="bg-blue-400 p-2 rounded-full w-fit">
                                            <FaLinkedin className="text-2xl" />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/'}>
                                        <div className="bg-red-600 p-2 rounded-full w-fit">
                                            <FaYoutube className="text-2xl" />
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Sidebar>
        </div>
    )
}
