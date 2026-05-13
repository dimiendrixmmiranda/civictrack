'use client'
import Template from "@/components/template/Template";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillInstagram } from "react-icons/ai";
import { BsFillSendFill } from "react-icons/bs";
import { FaClock, FaFacebook, FaMapMarkerAlt, FaPhone, FaYoutube } from "react-icons/fa";
import { GiPadlock } from "react-icons/gi";
import { IoLogoWhatsapp, IoMailSharp } from "react-icons/io5";

export default function Page() {
    const { user } = useUser()
    console.log(user)

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [assunto, setAssunto] = useState('')
    const [mensagem, setMensagem] = useState('')

    useEffect(() => {
        if(user){
            setNome(user.name)
            setEmail(user.email)
        }
    },[user])

    return (
        <Template>
            <section
                className="
                p-4 text-white
                bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,1.2)),url('/cidade/praca.png')]
                bg-cover bg-center
                min-h-screen
                md:p-6
                xl:p-10
            "
            >
                <div className="xl:grid xl:grid-cols-2 xl:gap-10 max-w-[1440px] mx-auto">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <h2 className="font-bebas text-6xl">Entre em <b className="text-verde-claro">contato!</b></h2>
                                <p className="">
                                    Estamos aqui para ouvir você! Seja para tirar dúvidas, sugerir melhorias, parcerias ou falar sobre o CivicTrack, nossa equipe está pronta para responder.
                                </p>
                            </div>
                            <div className="flex justify-center items-center">
                                <div className="relative w-[250px] h-[250px] md:w-[300px] md:h-[300px] xl:w-[280px] xl:h-[280px]">
                                    <Image alt="Imagem do sobre" src={'/logo/contato.png'} fill className="object-cover" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h2 className="font-bebas text-4xl">Canais de Atendimento</h2>
                            <div className="flex flex-col gap-2">
                                <Link href={'/'}>
                                    <div className="bg-cinza/80 p-4 rounded-xl grid grid-cols-[60px_1fr] gap-2 md:grid-cols-[60px_1fr_auto] duration-500 transition-all hover:bg-cinza">
                                        <div className="text-5xl flex justify-center items-center text-verde">
                                            <IoMailSharp />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-xl">Email</h3>
                                            <span className="text-sm leading-4 text-zinc-400">Envie sua mensagem para a nossa equipe.</span>
                                        </div>
                                        <div className="hidden md:flex w-full h-full justify-center items-center text-verde font-semibold">
                                            <p>dimiendrixmmiranda@gmail.com</p>
                                        </div>
                                    </div>
                                </Link>
                                <Link href={'/'}>
                                    <div className="bg-cinza/80 p-4 rounded-xl grid grid-cols-[60px_1fr] gap-2 md:grid-cols-[60px_1fr_auto] duration-500 transition-all hover:bg-cinza">
                                        <div className="text-5xl flex justify-center items-center text-verde">
                                            <FaPhone />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-xl">Telefone</h3>
                                            <span className="text-sm leading-4 text-zinc-400">Fale diretamente com a nossa equipe.</span>
                                        </div>
                                        <div className="hidden md:flex w-full h-full justify-center items-center text-verde font-semibold">
                                            <p>(43) 9 88252886</p>
                                        </div>
                                    </div>
                                </Link>
                                <Link href={'/'}>
                                    <div className="bg-cinza/80 p-4 rounded-xl grid grid-cols-[60px_1fr] gap-2 md:grid-cols-[60px_1fr_auto] duration-500 transition-all hover:bg-cinza">
                                        <div className="text-5xl flex justify-center items-center text-verde">
                                            <FaClock />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-xl">Horário de Atendimento</h3>
                                            <span className="text-sm leading-4 text-zinc-400">De segunda a sexta-feira, das 08h às 18h</span>
                                        </div>
                                        <div className="hidden md:flex w-full h-full justify-center items-center text-verde font-semibold">
                                            <p>08h às 18h</p>
                                        </div>
                                    </div>
                                </Link>
                                <Link href={'/'}>
                                    <div className="bg-cinza/80 p-4 rounded-xl grid grid-cols-[60px_1fr] gap-2 md:grid-cols-[60px_1fr_auto] duration-500 transition-all hover:bg-cinza">
                                        <div className="text-5xl flex justify-center items-center text-verde">
                                            <FaMapMarkerAlt />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-xl">Endereço</h3>
                                            <span className="text-sm leading-4 text-zinc-400">Avenida da Criatividade, 07 - Centro</span>
                                        </div>
                                        <div className="hidden md:flex w-full h-full justify-center items-center text-verde font-semibold">
                                            <p>Ver no mapa</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="bg-cinza p-6 rounded-xl py-10 flex flex-col gap-4 xl:p-10">
                        <h3 className="font-bebas text-4xl">Envie sua mensagem</h3>
                        <form className="flex flex-col gap-4 h-full" action="https://formsubmit.co/dimiendrixmmiranda@gmail.com" method="POST">
                            <div className="flex flex-col xl:grid xl:grid-cols-2 xl:gap-x-4">
                                <input type="text" name="nome" id="nome" className="bg-zinc-800 p-2 rounded-md" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome completo..." />
                                <input type="email" name="email" id="email" className="bg-zinc-800 p-2 rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                            </div>
                            <input type="text" name="assunto" id="assunto" className="bg-zinc-800 p-2 rounded-md" value={assunto} onChange={(e) => setAssunto(e.target.value)} placeholder="Assunto" />
                            <textarea name="mensagem" id="mensagem" className="w-full flex-1 bg-zinc-800 rounded-md p-4"value={mensagem} onChange={(e) => setMensagem(e.target.value)} placeholder="Sua mensagem..."></textarea>
                            <button className="bg-verde flex items-center justify-center gap-2 text-4xl py-2 pt-3 rounded-xl">
                                <div>
                                    <BsFillSendFill />
                                </div>
                                <div>
                                    <p className="font-bebas" style={{textShadow: '1px 1px 2px black'}}>Enviar mensagem</p>
                                </div>
                            </button>
                            <span className="flex items-center gap-1 text-center text-lg justify-center">
                                <GiPadlock /> Seus dados estão seguros conosco!
                            </span>
                        </form>
                    </div>
                    <div className="col-start-1 col-end-3 flex flex-col gap-6 justify-center items-center bg-cinza p-4 rounded-xl lg:grid lg:grid-cols-2">
                        <div className="flex flex-col justify-center items-center gap-4 md:grid md:grid-cols-[auto_1fr]">
                            <div className="relative w-[200px] h-[200px] md:w-[120px] md:h-[120px]">
                                <Image alt="Usuarios" src={'/logo/contato-footer.png'} fill className="object-cover" />
                            </div>
                            <div>
                                <h3 className="font-bebas text-3xl text-verde">Participe da transformação</h3>
                                <span>
                                    Sua participação é essencial para construirmos uma cidade mais transparente e eficiente para todos.
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 xl:grid xl:grid-cols-[340px_1fr]">
                            <div>
                                <h4 className="font-bebas text-3xl">Siga nossas redes socias</h4>
                                <p>Acompanhe nossas novidades e participe da comunidade CivicTrack.</p>
                            </div>
                            <ul className="grid grid-cols-4 my-auto">
                                <li>
                                    <Link href={'/'}>
                                        <div className="p-2 rounded-full bg-green-400 w-fit mx-auto text-3xl">
                                            <IoLogoWhatsapp />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/'}>
                                        <div className="p-2 rounded-full bg-pink-600 w-fit mx-auto text-3xl">
                                            <AiFillInstagram />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/'}>
                                        <div className="p-2 rounded-full bg-blue-700 w-fit mx-auto text-3xl">
                                            <FaFacebook />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/'}>
                                        <div className="p-2 rounded-full bg-red-700 w-fit mx-auto text-3xl">
                                            <FaYoutube />
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </Template>
    )
}