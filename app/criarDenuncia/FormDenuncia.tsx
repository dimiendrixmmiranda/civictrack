'use client'

import { useState } from "react";
import { useRef } from "react"
import dynamic from "next/dynamic"

const MapSelector = dynamic(
    () => import("@/components/mapSelector/MapSelector"),
    {
        ssr: false
    }
)

const problemasPorCategoria = {
    infraestrutura: [
        "Buraco",
        "Calçada quebrada",
        "Sinalização danificada"
    ],

    iluminacao: [
        "Poste apagado",
        "Fiação exposta",
        "Luz piscando"
    ],

    limpeza: [
        "Lixo acumulado",
        "Entulho",
        "Terreno abandonado"
    ],

    "meio-ambiente": [
        "Árvore caída",
        "Queimada",
        "Poluição"
    ],

    drenagem: [
        "Bueiro entupido",
        "Alagamento",
        "Vazamento"
    ],

    segurança: [
        "Semáforo quebrado",
        "Via perigosa",
        "Falta de sinalização"
    ],

    outro: [
        "Outro problema"
    ]
}

const iconesCategoria = {
    infraestrutura: "/leaflet/buraco.png",

    iluminacao: "/leaflet/lampada.png",

    limpeza: "/leaflet/lixo.png",

    "meio-ambiente": "/leaflet/meio-ambiente.png",

    drenagem: "/leaflet/alagamento.png",

    segurança: "/leaflet/seguranca.png",

    outro: "/leaflet/pino.png",
}

export default function FormDenuncia() {
    const [categoria, setCategoria] = useState("")
    const [tipoDoProblema, setTipoDoProblema] = useState("")
    const [imagem, setImagem] = useState<string | null>(null)
    const [rua, setRua] = useState('')
    const [numero, setNumero] = useState('')
    const [bairro, setBairro] = useState('')
    const [complemento, setComplemento] = useState('')
    const [lat, setLat] = useState(-23.498135049294113)
    const [lng, setLng] = useState(-49.924035990689596)

    const [loading, setLoading] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)

    async function handleCreateDenuncia(
        e: React.FormEvent
    ) {

        e.preventDefault()

        try {

            setLoading(true)

            // VALIDAÇÕES
            if (!categoria || !tipoDoProblema || !rua || !numero || !bairro || !lat || !lng) {

                alert("Selecione a categoria")

                return
            }

            if (!categoria) {

                alert("Selecione o tipo do problema")

                return
            }

            if (!rua || !bairro) {

                alert("Preencha o endereço")

                return
            }

            const res = await fetch("/api/denuncias", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                credentials: "include",

                body: JSON.stringify({
                    categoria,
                    tipoDoProblema,
                    imagem,
                    risco: '',
                    prioridade: '',
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

            alert("Denúncia criada com sucesso!")

            // REDIRECIONA
            window.location.href = "/criarDenuncia"

        } catch (err) {

            console.error(err)

            alert("Erro ao criar denúncia")

        } finally {

            setLoading(false)
        }
    }

    function removerImagem() {

        setImagem(null)

        if (inputRef.current) {
            inputRef.current.value = ""
        }
    }

    async function handleUpload(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = e.target.files?.[0]

        if (!file) return

        const formData = new FormData()

        formData.append("file", file)

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData
        })

        const data = await res.json()
        setImagem(data.url)
        console.log(data.url)
    }

    return (
        <form className="flex flex-col gap-6 max-w-xl">
            <fieldset className="flex flex-col gap-2">

                <label htmlFor="categoria">
                    Selecione a categoria do problema
                </label>

                <select
                    id="categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="p-3 rounded border"
                >
                    <option value="">
                        Selecione
                    </option>

                    <option value="infraestrutura">
                        Infraestrutura
                    </option>

                    <option value="iluminacao">
                        Iluminação
                    </option>

                    <option value="limpeza">
                        Limpeza
                    </option>

                    <option value="meio-ambiente">
                        Meio Ambiente
                    </option>

                    <option value="drenagem">
                        Drenagem
                    </option>

                    <option value="segurança">
                        Segurança
                    </option>

                    <option value="outro">
                        Outro
                    </option>
                </select>

            </fieldset>
            {
                categoria && (
                    <>
                        <fieldset className="flex flex-col gap-2">

                            <label htmlFor="problema">
                                Tipo do problema
                            </label>

                            <select
                                id="problema"
                                className="p-3 rounded border"
                                onChange={(e) => setTipoDoProblema(e.target.value)}

                            >
                                <option value="">
                                    Selecione
                                </option>

                                {
                                    problemasPorCategoria[
                                        categoria as keyof typeof problemasPorCategoria
                                    ].map((problema) => (
                                        <option
                                            key={problema}
                                            value={problema}
                                        >
                                            {problema}
                                        </option>
                                    ))
                                }

                            </select>

                        </fieldset>

                        <fieldset>
                            <h3>Dados do endereço próximo ao problema:</h3>
                            <fieldset className="flex flex-col">
                                <label htmlFor="rua">
                                    Nome da rua
                                </label>
                                <input type="text" name="rua" id="rua" value={rua} onChange={(e) => setRua(e.target.value)} className="border-2 border-black p-2 rounded-md" />
                            </fieldset>
                            <fieldset className="flex flex-col">
                                <label htmlFor="numero">
                                    Número
                                </label>
                                <input type="text" name="numero" id="numero" value={numero} onChange={(e) => setNumero(e.target.value)} className="border-2 border-black p-2 rounded-md" />
                            </fieldset>
                            <fieldset className="flex flex-col">
                                <label htmlFor="bairro">
                                    Bairro
                                </label>
                                <input type="text" name="bairro" id="bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} className="border-2 border-black p-2 rounded-md" />
                            </fieldset>
                            <fieldset className="flex flex-col">
                                <label htmlFor="complemento">
                                    complemento
                                </label>
                                <input type="text" name="complemento" id="complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)} className="border-2 border-black p-2 rounded-md" />
                            </fieldset>
                        </fieldset>

                        <div className="flex flex-col gap-4">

                            <label className="font-medium">
                                Adicione uma imagem do problema
                            </label>

                            {/* INPUT */}
                            <input
                                type="file"
                                accept="image/*"
                                ref={inputRef}
                                onChange={handleUpload}
                                className={
                                    `    
                                        file:bg-verde
                                        file:border-0
                                        file:text-white
                                        file:px-4
                                        file:py-2
                                        file:rounded
                                        file:cursor-pointer
                                        ${imagem ? 'hidden' : 'block'}
                                    `
                                }
                            />

                            {/* PREVIEW */}
                            {
                                imagem && (
                                    <div className="relative w-fit">

                                        <img
                                            src={imagem}
                                            alt="Preview"
                                            className="
                                                    w-64
                                                    h-40
                                                    object-cover
                                                    rounded-lg
                                                    border
                                                "
                                        />

                                        <button
                                            type="button"
                                            onClick={removerImagem}
                                            className="
                                                absolute
                                                top-2
                                                right-2
                                                bg-red-500
                                                text-white
                                                px-2
                                                py-1
                                                rounded
                                                text-sm
                                            "
                                        >
                                            Remover
                                        </button>

                                    </div>
                                )
                            }
                        </div>
                        <MapSelector
                            lat={lat}
                            lng={lng}

                            iconUrl={
                                iconesCategoria[
                                categoria as keyof typeof iconesCategoria
                                ]
                            }

                            onChange={(novaLat, novaLng) => {
                                setLat(novaLat)
                                setLng(novaLng)
                            }}
                        />
                        <button className="bg-azul-claro text-white font-bebas text-4xl pt-1.5 rounded-xl" onClick={handleCreateDenuncia}>Enviar Denúncia!</button>
                    </>
                )
            }
        </form>
    )
}