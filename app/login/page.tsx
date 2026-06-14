'use client'

import Template from "@/components/template/Template";
import { useEffect, useState } from "react";

import dynamic from "next/dynamic"
import InputSenha from "@/components/inputSenha/InputSenha";
import { FaRegUser } from "react-icons/fa";
import Dialog from "@/components/caixaDeDialogo/CaixaDeDialogo";
import Image from "next/image";
import Link from "next/link";
import { IoLogIn, IoShieldCheckmarkOutline, IoShieldCheckmarkSharp } from "react-icons/io5";
import { LuLeaf } from "react-icons/lu";
import { HiUserGroup } from "react-icons/hi";
import { ImStatsBars } from "react-icons/im";
import { useSearchParams } from "next/navigation";

const MapSelector = dynamic(
    () => import("@/components/mapSelector/MapSelector"),
    {
        ssr: false
    }
)
export default function Page() {
    const [formAtivo, setFormAtivo] = useState<'login' | 'cadastro'>('login');

    useEffect(() => {
        const form = sessionStorage.getItem('formAtivo');

        if (form === 'cadastro') {
            setFormAtivo('cadastro');
        } else {
            setFormAtivo('login');
        }
    }, [])
    // const [formAtivo, setFormAtivo] = useState<'login' | 'cadastro'>('cadastro')

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmacaoSenha, setConfirmacaoSenha] = useState('')
    const [sexo, setSexo] = useState<'masculino' | 'feminino' | 'nao-informado' | ''>('')
    const [telefone, setTelefone] = useState('')
    const [rua, setRua] = useState('')
    const [numero, setNumero] = useState('')
    const [bairro, setBairro] = useState('')
    const [complemento, setComplemento] = useState('')

    const [loading, setLoading] = useState(false)


    const [lat, setLat] = useState(-23.498135049294113)
    const [lng, setLng] = useState(-49.924035990689596)
    const [mostrarMapa, setMostrarMapa] = useState(false)

    const [abrirDialogEndereco, setAbrirDialogEndereco] = useState(false)

    console.log(lat, lng)

    async function handleCreateAccount(e: React.FormEvent) {
        e.preventDefault() // 🔥 MUITO IMPORTANTE (evita reload do form)

        try {
            setLoading(true)

            // validação básica
            if (!nome || !email || !senha) {
                alert("Preencha os campos obrigatórios")
                return
            }

            if (senha !== confirmacaoSenha) {
                alert("Senhas não conferem")
                return
            }

            if (!lat || !lng) {
                alert("Selecione o endereço no mapa")
                return
            }

            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    name: nome,
                    email,
                    password: senha,
                    sexo,
                    telefone,

                    endereco: {
                        rua,
                        numero,
                        bairro,
                        complemento,
                        latitude: lat,
                        longitude: lng
                    }
                })
            })

            const data = await res.json()

            if (!res.ok) {
                alert(data.error)
                return
            }

            // valida sessão
            const me = await fetch("/api/register", {
                credentials: "include"
            })

            if (!me.ok) {
                alert("Sessão não criada")
                return
            }

            // redireciona
            window.location.href = "/usuario"

        } catch (err) {
            console.error(err)
            alert("Erro ao criar conta")
        } finally {
            setLoading(false)
        }
    }

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()

        try {
            setLoading(true)

            if (!email || !senha) {
                alert("Preencha email e senha")
                return
            }

            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    email,
                    password: senha
                })
            })

            const data = await res.json()

            if (!res.ok) {
                alert(data.error)
                return
            }

            // 🔥 valida sessão (igual no register)
            const me = await fetch("/api/register", {
                credentials: "include"
            })

            if (!me.ok) {
                alert("Sessão não criada")
                return
            }

            // 🔥 redireciona
            window.location.href = "/usuario"

        } catch (err) {
            console.error(err)
            alert("Erro ao fazer login")
        } finally {
            setLoading(false)
        }
    }

    async function buscarEndereco() {
        const enderecoCompleto =
            `${rua}, ${numero}, ${bairro}, Carlópolis, Paraná, Brasil`
        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(enderecoCompleto)}&bounded=1&viewbox=-49.9741,-23.4486,-49.8741,-23.5486`
        )
        const data = await res.json()
        if (!data.length) {

            setAbrirDialogEndereco(true)

            return
        }
        setLat(parseFloat(data[0].lat))
        setLng(parseFloat(data[0].lon))
        setMostrarMapa(true)
    }

    function gerarCampo(
        id: string,
        textoLabel: string,
        valor: string,
        placeholder: string,
        setValor: (valor: string) => void,
        type: string = "text"
    ) {
        return (
            <fieldset className="flex flex-col w-full">
                <label htmlFor={id}>{textoLabel}</label>
                <input
                    type={type}
                    name={id}
                    id={id}
                    value={valor}
                    placeholder={placeholder}
                    className="border rounded-md border-verde p-1.5 w-full"
                    onChange={(e) => setValor(e.target.value)}
                />
            </fieldset>
        )
    }

    function gerarQualidades(icone: React.ReactNode, titulo: string, descricao: string) {
        return (
            <div className={`grid grid-cols-[40px_1fr] gap-2 text-white gap-1 p-2`}>
                <div className="text-4xl flex justify-center items-center text-verde xl:text-6xl">
                    {icone}
                </div>
                <div className="flex flex-col">
                    <h4 className="font-bebas text-2xl mt-1">{titulo}</h4>
                    <p className="hidden lg:block text-sm line-clamp-2 -mt-1">{descricao}</p>
                </div>
            </div>
        )
    }

    return (
        <Template>
            <section
                className="
                text-white
                bg-[linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.4)),url('/cidade/parque.png')]
                bg-cover bg-center
                md:p-4
            "
            >
                <div className="min-h-[90vh] h-full text-black p-4 flex flex-col">
                    <div className="text-white bg-verde rounded-xl text-center p-2 font-bebas text-2xl mb-4 md:hidden" style={{ textShadow: '1px 1px 2px black' }}>
                        {
                            formAtivo === 'login' ? <p onClick={() => setFormAtivo('cadastro')}>Ainda não é cadastrado? Crie sua conta agora</p> : <p onClick={() => setFormAtivo('login')}>Já é cadastrado? Faça login agora mesmo!</p>
                        }
                    </div>
                    <div>
                        {
                            formAtivo === 'cadastro' ? (
                                <form className="relative p-2 border-2 border-verde flex flex-col justify-center items-center rounded-xl w-full mx-auto bg-white text-black gap-4 lg:p-8 lg:max-w-[1150px] xl:p-8 xl:h-[705px] xl:my-auto">
                                    <div className="hidden md:block absolute top-2 right-2 leading-5 text-white bg-verde rounded-xl text-center p-2 font-bebas text-lg mb-4 max-w-[140px] cursor-pointer" style={{ textShadow: '1px 1px 2px black' }}>
                                        <p onClick={() => setFormAtivo('login')}>Já é cadastrado? Faça login agora mesmo!</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2 justify-center">
                                            <FaRegUser className="text-5xl" />
                                            <div className="flex flex-col">
                                                <h2 className="font-bebas text-4xl">Cadastro</h2>
                                                <div className="h-1 -mt-1 w-[70%] bg-verde"></div>
                                            </div>
                                        </div>
                                        <span className="text-center">Crie sua conta e faça parte da mudança!</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="lg:grid lg:grid-cols-2 lg:gap-10">
                                            <div className="flex flex-col gap-1">
                                                {gerarCampo("nome", "Informe seu nome completo:", nome, 'Digite seu nome completo', setNome)}
                                                {gerarCampo("email", "Informe seu email:", email, 'Digite seu melhor email', setEmail)}
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="md:grid md:grid-cols-2 md:gap-4">
                                                    {gerarCampo("senha", "Crie uma senha", senha, 'Minimo 6 caracteres', setSenha)}
                                                    {gerarCampo("confirmacaoSenha", "Confirme sua senha", confirmacaoSenha, 'Confirme sua senha', setConfirmacaoSenha)}
                                                </div>
                                                <div className="md:grid md:grid-cols-2 md:gap-4">
                                                    <fieldset className="flex flex-col">
                                                        <label htmlFor="sexo">Sexo</label>

                                                        <select
                                                            name="sexo"
                                                            id="sexo"
                                                            value={sexo}
                                                            onChange={(e) => setSexo(e.target.value as typeof sexo)}
                                                            className="border rounded-md border-verde p-1.5"
                                                        >
                                                            <option value="" disabled>
                                                                Selecione
                                                            </option>
                                                            <option value="masculino">Masculino</option>
                                                            <option value="feminino">Feminino</option>
                                                            <option value="nao-informado">Prefiro não dizer</option>
                                                        </select>
                                                    </fieldset>
                                                    {gerarCampo("telefone", "Informe seu telefone", telefone, '(00) 0 000000000', setTelefone)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex flex-col lg:grid lg:grid-cols-2 lg:gap-8">
                                            <div>
                                                <h2 className="font-bebas text-2xl">Endereço</h2>
                                                <div className="grid grid-cols-[1fr_60px] gap-x-4 gap-1">
                                                    {gerarCampo("rua", "Nome da rua", rua, 'Ex: Rua das flores', setRua)}
                                                    {gerarCampo("numero", "Nº", numero, '000', setNumero)}
                                                    <div className="col-start-1 col-end-3">
                                                        {gerarCampo("bairro", "Bairro", bairro, 'Ex: Centro', setBairro)}
                                                    </div>
                                                    <div className="col-span-2">
                                                        {gerarCampo("complemento", "Complemento", complemento, 'Ex: Apartamento 101, Bloco A', setComplemento)}
                                                    </div>
                                                </div>
                                                <div className="mt-2">
                                                    <button type="button" onClick={buscarEndereco} className="bg-azul-escuro text-white w-full rounded-md py-2 font-bebas leading-6 text-xl">
                                                        Buscar no mapa
                                                    </button>
                                                </div>
                                                <Dialog
                                                    open={abrirDialogEndereco}
                                                    onClose={() => setAbrirDialogEndereco(false)}
                                                    onConfirm={() => {
                                                        setMostrarMapa(true)
                                                        setAbrirDialogEndereco(false)
                                                    }}
                                                    title="Endereço não encontrado"
                                                    description="
                                                    Não conseguimos localizar esse endereço automaticamente.
                                                    Você pode selecionar o local manualmente no mapa.
                                                "
                                                    confirmText="Selecionar no mapa"
                                                />
                                            </div>
                                            <div>
                                                <div className="w-full h-[260px] mt-4 rounded-xl overflow-hidden" style={{ boxShadow: `0 0 2px 1px ${mostrarMapa ? 'green' : 'black'}` }}>
                                                    <MapSelector
                                                        lat={lat}
                                                        lng={lng}
                                                        onChange={(novaLat, novaLng) => {
                                                            setLat(novaLat)
                                                            setLng(novaLng)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={handleCreateAccount} disabled={loading} className="mt-4 bg-verde-claro flex rounded-md w-full text-center justify-center items-center text-white font-bebas text-3xl py-1 pt-1.5" style={{ textShadow: '1px 1px 2px black' }}>
                                        Criar Conta
                                    </button>
                                </form>
                            ) : (
                                <form className="relative p-2 border-2 border-verde flex flex-col justify-center items-center rounded-xl w-full mx-auto bg-cinza-2 w-full text-white gap-4 lg:p-8 lg:max-w-[1150px] xl:p-8 xl:h-[705px] xl:my-auto">
                                    <div className="hidden md:block absolute top-2 right-2 leading-5 text-white bg-verde rounded-xl text-center p-2 font-bebas text-lg mb-4 max-w-[140px] cursor-pointer" style={{ textShadow: '1px 1px 2px black' }}>
                                        <p onClick={() => setFormAtivo('cadastro')}>Ainda não é cadastrado? Crie sua conta agora</p>
                                    </div>
                                    <div className="flex flex-col justify-center items-center gap-2 w-full">
                                        <div className="relative w-20 h-20">
                                            <Image alt="Logo do civictrack" src={'/logo/logo.png'} fill className="object-contain" />
                                        </div>
                                        <div className="flex flex-col">
                                            <h2 className="font-bebas text-4xl">Bem vindo de volta!</h2>
                                            <div className="w-[50%] h-1 bg-verde mx-auto"></div>
                                        </div>
                                        <p className="text-center">
                                            Acesse sua conta e continue ajudando a transformar sua cidade!
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        {gerarCampo("email", "Informe seu email:", email, 'seuEmail@gmail.com', setEmail)}
                                        <InputSenha id="senha" textoLabel="Senha" senha={senha} setSenha={setSenha} />
                                    </div>
                                    <div className="flex flex-col gap-2 text-white md:justify-between md:flex-row w-full">
                                        <div>
                                            <input type="checkbox" name="lembrarDeMim" id="lembrarDeMim" />
                                            <label htmlFor="lembrarDeMim">Lembrar de mim</label>
                                        </div>
                                        <div>
                                            <Link href={'/'}>Esqueceu sua senha?</Link>
                                        </div>
                                    </div>
                                    <button onClick={handleLogin} disabled={loading} className="mt-4 bg-verde-claro flex rounded-md w-full text-center justify-center items-center gap-2 text-white font-bebas text-3xl py-1 pt-1.5" style={{ textShadow: '1px 1px 2px black' }}>
                                        <IoLogIn />
                                        <p className="mt-[0.5px]">Entrar</p>
                                    </button>
                                    <div className="grid grid-cols-[1fr_50px_1fr] w-full">
                                        <div className="w-full h-[.5px] bg-zinc-600 my-auto"></div>
                                        <p className="w-full flex justify-center items-center">Ou</p>
                                        <div className="w-full h-[.5px] bg-zinc-600 my-auto"></div>
                                    </div>
                                    <div className="flex w-full">
                                        <button className="text-xl gap-2 border border-zinc-600 w-full p-3 rounded-xl flex justify-center items-center hover:bg-rose-700 duration-500 transition-all hover:text-shadow-[1px_1px_2px_black] hover:border-rose-400">
                                            <div className="relative w-8 h-8">
                                                <Image alt="google" src={'/google.png'} fill className="object-contain" />
                                            </div>
                                            <span>Entrar com o Google</span>
                                        </button>
                                    </div>
                                    <div className="bg-cinza grid grid-cols-[60px_1fr] p-2 rounded-xl md:grid-cols-[80px_1fr] w-full">
                                        <div className="flex justify-center items-center">
                                            <IoShieldCheckmarkSharp className="text-4xl md:text-6xl" />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h3 className="font-bebas text-2xl leading-6.5">Sua conta faz a diferença</h3>
                                            <span className="hidden md:block">Seus dados estão protegidos com criptografia e nunca serão compartilhados.</span>
                                        </div>
                                    </div>
                                </form>
                            )
                        }
                    </div>
                    <div className="flex flex-col gap-4 mx-auto mt-4 md:grid md:grid-cols-2 lg:grid lg:grid-cols-4 max-w-[1400px]">
                        {gerarQualidades(<IoShieldCheckmarkOutline />, 'Segurança Garantida', 'Seus dados protegidos com criptografia de ponta a ponta')}
                        {gerarQualidades(<LuLeaf />, 'Impacto Real', 'Suas denúncias geram mudanças na cidade')}
                        {gerarQualidades(<HiUserGroup />, 'Comunidade Ativa', 'Milhares de cidadãos fazendo a diferença')}
                        {gerarQualidades(<ImStatsBars />, 'Transparência total', 'Acompanhe o andamento das suas denúncias')}
                    </div>
                </div>
            </section>
        </Template>
    )
}