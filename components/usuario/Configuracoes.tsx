'use client'
import { FaEyeSlash, FaMoon, FaRegBell, FaRegStar, FaSun, FaTv } from "react-icons/fa";
import { GoGear, GoShieldCheck } from "react-icons/go";
import { IoChatboxEllipsesOutline, IoMailUnreadOutline, IoShieldCheckmarkSharp } from "react-icons/io5";
import Switch from "../switch/Switch";
import { useState } from "react";
import { CgBrowser } from "react-icons/cg";
import { GiPadlockOpen } from "react-icons/gi";
import { SlGraph } from "react-icons/sl";
import { BiWorld } from "react-icons/bi";
import { IoIosArrowForward, IoIosCodeDownload } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";

export default function Configuracoes() {
    const [tema, setTema] = useState<'escuro' | 'claro'>('escuro')

    const [emailNotificacao, setEmailNotificacao] = useState(true)
    const [navegador, setNavegador] = useState(true)
    const [denunciasProximas, setDenunciasProximas] = useState(true)
    const [atualizacaoStatus, setAtualizacaoStatus] = useState(true)

    const [perfilPublico, setPerfilPublico] = useState(true)
    const [localizacaoAproximada, setLocalizacaoAproximada] = useState(true)

    const [idioma, setIdioma] = useState<'portugues' | 'ingles'>('portugues')
    const [segurancaConta, setSeguracaConta] = useState(true)

    const gerarCampo = (
        icone: React.ReactNode,
        titulo: string,
        descricao: string,
        checked: boolean,
        onChange: () => void,
        border: boolean = true,
    ) => {
        return (
            <div className={`
                ${border ? 'border-b-2 border-zinc-600' : ''}
                grid
                grid-cols-[1fr_auto]
                items-center
                pb-3
            `}>
                <div className="flex items-center gap-2">
                    <div className="text-4xl text-verde">
                        {icone}
                    </div>
                    <div>
                        <h4 className="font-bold text-lg leading-5">
                            {titulo}
                        </h4>
                        <p className="text-sm text-zinc-300">
                            {descricao}
                        </p>
                    </div>

                </div>
                <Switch
                    checked={checked}
                    onChange={onChange}
                />
            </div>
        )
    }

    return (
        <div className="bg-cinza xl:pl-8">
            <div className="p-4 min-h-full flex flex-col gap-6">
                <div>
                    <div className="flex items-center gap-2">
                        <GoGear className="text-4xl text-verde" />
                        <h2 className="font-bebas text-4xl mt-1.5">Configurações</h2>
                    </div>
                    <p>Gerencie suas informações pessoais e preferências da conta.</p>
                </div>

                <div className="xl:grid xl:grid-cols-2 xl:gap-8">
                    <div className="bg-cinza-2 p-4 rounded-xl">
                        <div className="flex items-center gap-2">
                            <FaTv className="text-4xl text-verde" />
                            <div className="flex flex-col gap-1">
                                <h2 className="text-2xl font-bebas leading-5">Aparência</h2>
                                <span className="leading-4">Personalize como o CivicTrack é exibido para você.</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div>
                                <h3 className="font-bebas text-2xl">Tema</h3>
                                <p>Escolha o tema que mais combina com você</p>
                            </div>
                            <div className="grid grid-cols-2">
                                <div onClick={() => setTema('escuro')} className={`cursor-pointer flex flex-col justify-center items-center bg-cinza-2 p-4 w-full h-[130px] mx-auto rounded-lg ${tema == 'escuro' ? 'border-2 border-verde' : ''}`}>
                                    <FaMoon className="text-5xl" />
                                    <h4 className="font-bold text-xl">Escuro</h4>
                                    <span className="text-sm">Tema escuro</span>
                                </div>
                                <div onClick={() => setTema('claro')} className={`cursor-pointer flex flex-col justify-center items-center bg-cinza-2 p-4 w-full h-[130px] mx-auto rounded-lg ${tema == 'claro' ? 'border-2 border-verde' : ''}`}>
                                    <FaSun className="text-5xl" />
                                    <h4 className="font-bold text-xl">Claro</h4>
                                    <span className="text-sm">Tema claro</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 xl:grid xl:grid-cols-[auto_1fr]">
                                <div>
                                    <h3 className="font-bebas text-2xl">Cor de destaque</h3>
                                    <p>Escolha a cor principal do sistema.</p>
                                </div>
                                <div className="xl:my-auto">
                                    <ul className="grid grid-cols-5">
                                        <li className="flex justify-center items-center">
                                            <button className="bg-verde w-10 h-10 rounded-full"></button>
                                        </li>
                                        <li className="flex justify-center items-center">
                                            <button className="bg-blue-600 w-10 h-10 rounded-full"></button>
                                        </li>
                                        <li className="flex justify-center items-center">
                                            <button className="bg-violet-700 w-10 h-10 rounded-full"></button>
                                        </li>
                                        <li className="flex justify-center items-center">
                                            <button className="bg-orange-600 w-10 h-10 rounded-full"></button>
                                        </li>
                                        <li className="flex justify-center items-center">
                                            <button className="bg-red-700 w-10 h-10 rounded-full"></button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 bg-cinza-2 p-4 rounded-xl">
                        <div className="flex items-center gap-2">
                            <FaRegBell className="text-4xl text-verde" />
                            <div className="flex flex-col gap-1">
                                <h2 className="text-2xl font-bebas leading-5">Notificações</h2>
                                <span className="leading-4">Gerencie como e quando você recebe notificações.</span>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col gap-4">
                                {gerarCampo(<IoMailUnreadOutline />, 'Notificações por email', 'Receba as atualizações importantes por email.', emailNotificacao, () => setEmailNotificacao(!emailNotificacao))}
                                {gerarCampo(<CgBrowser />, 'Notificações no navegador', 'Receba alertas sobre suas denúncias', navegador, () => setNavegador(!navegador))}
                                {gerarCampo(<FaRegStar />, 'Novas denúncias próximas', 'Seja notificado sobre novas denúncias na região', denunciasProximas, () => setDenunciasProximas(!denunciasProximas))}
                                {gerarCampo(<IoChatboxEllipsesOutline />, 'Atualizações de Status', 'Receba atualizações quando suas denúncias forem alteradas', atualizacaoStatus, () => setAtualizacaoStatus(!atualizacaoStatus), false)}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 bg-cinza-2 p-4 rounded-xl">
                        <div className="flex items-center gap-2">
                            <GoShieldCheck className="text-4xl text-verde" />
                            <div className="flex flex-col gap-1">
                                <h2 className="text-2xl font-bebas leading-5">Privacidade</h2>
                                <span className="leading-4">Gerencie suas preferências de privacidade</span>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col gap-4">
                                {gerarCampo(<GiPadlockOpen />, 'Perfil público', 'Permitir que os outros usuários vejam seu perfil', perfilPublico, () => setPerfilPublico(!perfilPublico))}
                                {gerarCampo(<FaRegStar />, 'Mostrar localização aproximada', 'Exibir sua localização aproximada nas denúncias', localizacaoAproximada, () => setLocalizacaoAproximada(!denunciasProximas))}
                                {gerarCampo(<FaRegStar />, 'Dados e privacidade', 'Gerencie seus dados pessoais e preferências de privacidade', localizacaoAproximada, () => setLocalizacaoAproximada(!denunciasProximas), false)}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 bg-cinza-2 p-4 rounded-xl">
                        <div className="flex items-center gap-2">
                            <SlGraph className="text-4xl text-verde" />
                            <div className="flex flex-col gap-1">
                                <h2 className="text-2xl font-bebas leading-5">Outras Configurações</h2>
                                <span className="leading-4">Configurações adicionais da sua conta.</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-4">
                                <div className="
                                border-b-2
                                border-zinc-600
                                grid
                                grid-cols-[1fr_auto]
                                items-center
                                pb-3
                            ">
                                    <div className="flex items-center gap-2">
                                        <div className="text-4xl text-verde">
                                            <BiWorld />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg leading-5">
                                                Idioma
                                            </h4>
                                            <p className="text-sm text-zinc-300">
                                                Selecione o idioma do sistema.
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <select name="idioma" id="idioma" value={idioma} onChange={(e) => setIdioma(e.target.value as 'portugues' | 'ingles')} className="bg-zinc-600 rounded-md p-1">
                                            <option value="">Selecione</option>
                                            <option value="portugues">Português</option>
                                            <option value="ingles">Inglês</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {gerarCampo(<IoShieldCheckmarkSharp />, 'Verificação em duas etapas', 'Aumente a segurança da sua conta', segurancaConta, () => setSeguracaConta(!segurancaConta))}
                            <div className="flex flex-col gap-4">
                                <div className="
                                border-b-2
                                border-zinc-600
                                grid
                                grid-cols-[1fr_auto]
                                items-center
                                pb-3
                            ">
                                    <div className="flex items-center gap-2">
                                        <div className="text-4xl text-verde">
                                            <IoIosCodeDownload />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg leading-5">
                                                Exportar meus dados
                                            </h4>
                                            <p className="text-sm text-zinc-300">
                                                Baixe uma cópia dos seus dados
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <button><IoIosArrowForward /></button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="
                                grid
                                grid-cols-[1fr_auto]
                                items-center
                                pb-3
                            ">
                                    <div className="flex items-center gap-2">
                                        <div className="text-4xl text-red-600">
                                            <FaRegTrashCan />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg leading-5">
                                                Excluir minha conta
                                            </h4>
                                            <p className="text-sm text-zinc-300">
                                                Essa ação não pode ser desfeita
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="text-red-600 border border-red-500 px-2 py-1 rounded-md hover:bg-red-500 hover:text-white transition-all duration-300">Excluir conta</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}