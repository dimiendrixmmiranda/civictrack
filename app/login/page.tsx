'use client'

import Template from "@/components/template/Template";
import { useState } from "react";

import dynamic from "next/dynamic"
import InputSenha from "@/components/inputSenha/InputSenha";

const MapSelector = dynamic(
    () => import("@/components/mapSelector/MapSelector"),
    {
        ssr: false
    }
)
export default function Page() {
    const [formAtivo, setFormAtivo] = useState<'login' | 'cadastro'>('cadastro')

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
        const enderecoCompleto = `${rua}, ${numero}, ${bairro}, Carlópolis, Paraná, Brasil`

        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(enderecoCompleto)}&bounded=1&viewbox=-49.9741,-23.4486,-49.8741,-23.5486`
        )

        const data = await res.json()

        if (!data.length) {
            setMostrarMapa(true)
            alert("Endereço não encontrado. Selecione no mapa.")
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
                    className="border rounded-md border-verde p-1.5 w-full"
                    onChange={(e) => setValor(e.target.value)}
                />
            </fieldset>
        )
    }

    return (
        <Template>
            <div className="min-h-[90vh] h-full bg-branco text-black p-4 flex flex-col">
                <div className="grid grid-cols-2 gap-2 justify-center items-center w-full max-w-[600px] mx-auto">
                    <button onClick={() => setFormAtivo('login')} className={`${formAtivo === 'login' ? 'bg-azul-claro' : 'bg-verde-claro'} font-bebas text-2xl text-white rounded-md`} style={{ textShadow: '1px 1px 2px black' }}>Login</button>
                    <button onClick={() => setFormAtivo('cadastro')} className={`${formAtivo === 'cadastro' ? 'bg-azul-claro' : 'bg-verde-claro'}  font-bebas text-2xl text-white rounded-md`} style={{ textShadow: '1px 1px 2px black' }}>Cadastro</button>
                </div>
                <div className="mt-6">
                    {
                        formAtivo === 'cadastro' ? (
                            <form className="p-2 border-2 border-verde rounded-xl max-w-[600px] w-full mx-auto">
                                <h2 className="font-bebas text-2xl">Cadastro</h2>
                                {gerarCampo("nome", "Informe seu nome completo:", nome, setNome)}
                                {gerarCampo("email", "Informe seu email:", email, setEmail)}
                                <div className="md:grid md:grid-cols-2 md:gap-4">
                                    {gerarCampo("senha", "Crie uma senha", senha, setSenha)}
                                    {gerarCampo("confirmacaoSenha", "Confirme sua senha", confirmacaoSenha, setConfirmacaoSenha)}
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
                                    {gerarCampo("telefone", "Informe seu telefone", telefone, setTelefone)}
                                </div>
                                <div className="mt-4 flex flex-col">
                                    <h2 className="font-bebas text-2xl">Endereço</h2>
                                    <div className="grid grid-cols-[1fr_60px] gap-x-4">
                                        {gerarCampo("rua", "Nome da rua", rua, setRua)}
                                        {gerarCampo("numero", "Nº", numero, setNumero)}
                                        <div className="col-start-1 col-end-3">
                                            {gerarCampo("bairro", "Bairro", bairro, setBairro)}
                                        </div>
                                        {gerarCampo("complemento", "complemento", complemento, setComplemento)}
                                    </div>
                                    <div className="mt-2">
                                        <button type="button" onClick={buscarEndereco} className="bg-azul-escuro text-white w-full rounded-md py-2 font-bebas leading-6 text-xl">
                                            Buscar no mapa
                                        </button>
                                    </div>
                                    {mostrarMapa && (
                                        <div className="w-full h-[300px] mt-4">
                                            <MapSelector
                                                lat={lat}
                                                lng={lng}
                                                onChange={(novaLat, novaLng) => {
                                                    setLat(novaLat)
                                                    setLng(novaLng)
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                                {/* sexo */}
                                <button onClick={handleCreateAccount} disabled={loading} className="mt-4 bg-verde-claro flex rounded-md w-full text-center justify-center items-center text-white font-bebas text-3xl py-1 pt-1.5" style={{ textShadow: '1px 1px 2px black' }}>
                                    Criar Conta
                                </button>
                            </form>
                        ) : (
                            <form className="p-2 border-2 border-verde rounded-xl max-w-[600px] w-full mx-auto">
                                <h2 className="font-bebas text-2xl">Login</h2>
                                {gerarCampo("email", "Informe seu email:", email, setEmail)}
                                <InputSenha id="senha" textoLabel="Senha" senha={senha} setSenha={setSenha}/>
                                <button onClick={handleLogin} disabled={loading} className="mt-4 bg-verde-claro flex rounded-md w-full text-center justify-center items-center text-white font-bebas text-3xl py-1 pt-1.5" style={{ textShadow: '1px 1px 2px black' }}>
                                    Entrar
                                </button>
                            </form>
                        )
                    }
                </div>
            </div>
        </Template>
    )
}