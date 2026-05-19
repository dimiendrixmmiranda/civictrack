'use client'

import { useUser } from "@/hooks/useUser"
import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { GrUpdate } from "react-icons/gr"

const MapSelector = dynamic(
    () => import("@/components/mapSelector/MapSelector"),
    {
        ssr: false
    }
)

export default function MeuPerfil() {
    const { user } = useUser()
    const [nome, setNome] = useState('')
    const [imagem, setImagem] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')

    const [numero, setNumero] = useState('')
    const [rua, setRua] = useState('')
    const [bairro, setBairro] = useState('')
    const [complemento, setComplemento] = useState('')

    const [latitude, setLatitude] = useState<number>(-23.498135049294113)
    const [longitude, setLongitude] = useState<number>(-49.924035990689596)
    const [novaLatitude, setNovaLatitude] = useState<number>(-23.498135049294113)
    const [novaLongitude, setNovaLongitude] = useState<number>(-49.924035990689596)

    const [uploadingImage, setUploadingImage] = useState(false)
    const inputImageRef = useRef<HTMLInputElement>(null)

    async function handleUploadImagem(
        e: React.ChangeEvent<HTMLInputElement>
    ) {

        const file = e.target.files?.[0]

        if (!file) return

        try {

            setUploadingImage(true)

            const formData = new FormData()

            formData.append("file", file)

            // UPLOAD
            const uploadRes = await fetch("/api/upload", {

                method: "POST",

                body: formData
            })

            const uploadData = await uploadRes.json()

            if (!uploadRes.ok) {

                alert(uploadData.error)

                return
            }

            // URL DA IMAGEM
            const imageUrl = uploadData.url

            // ATUALIZA NO STATE
            setImagem(imageUrl)

            // SALVA NO BANCO
            const res = await fetch("/api/user", {

                method: "PATCH",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    imagem: imageUrl
                })
            })

            const data = await res.json()

            if (!res.ok) {

                alert(data.error)

                return
            }

            alert("Imagem atualizada!")

        } catch (err) {

            console.error(err)

            alert("Erro ao atualizar imagem")

        } finally {

            setUploadingImage(false)
        }
    }

    useEffect(() => {
        if (user) {
            setNome(user?.name)
            setImagem(user?.imagem)
            setEmail(user?.email)
            setTelefone(user?.telefone)
            setLatitude(user.endereco.latitude)
            setLongitude(user.endereco.longitude)

            setNumero(user.endereco.numero)
            setRua(user.endereco.rua)
            setBairro(user.endereco.bairro)
            setComplemento(user.endereco.complemento)
        }
    }, [user])

    console.log(rua)

    async function atualizarPerfil() {
        const res = await fetch('/api/user', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                name: nome,
                email,
                telefone,
                endereco: {
                    rua,
                    numero,
                    bairro,
                    complemento,
                    latitude,
                    longitude
                }
            })
        })

        const data = await res.json()

        if (!res.ok) {
            alert(data.error)
            return
        }
        alert('Perfil atualizado!')
    }

    return (
        <div className="bg-cinza pl-8">
            <div className="bg-cinza p-4 min-h-full flex flex-col gap-4">
                <h2 className="font-bebas text-4xl">Meu perfil</h2>
                <div className="flex flex-col gap-6">
                    <div className="md:grid md:grid-cols-[auto_1fr] md:gap-6">
                        <div className="relative">
                            <div className="relative w-[200px] h-[200px] bg-zinc-800 rounded-full overflow-hidden border-2 border-zinc-950">
                                <Image alt="Imagem do usuario" src={imagem || '/sexo/masculino.png'} fill className="object-cover" />
                            </div>
                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    ref={inputImageRef}
                                    onChange={handleUploadImagem}
                                />
                                <button
                                    type="button"
                                    onClick={() => inputImageRef.current?.click()}
                                    className="
                                        absolute
                                        bottom-2
                                        right-2
                                        bg-verde
                                        text-white
                                        p-3
                                        rounded-full
                                        shadow-lg
                                    "
                                >
                                    {
                                        uploadingImage
                                            ? "..."
                                            : <GrUpdate />
                                    }

                                </button>

                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center w-full">
                                <input type="text" name="nome" id="nome" className="border border-zinc-500 w-full p-2 rounded-l-md" value={nome} onChange={(e) => setNome(e.target.value)} />
                                <button className={`bg-verde h-full p-2 rounded-r-md ${user?.name != nome ? 'opacity-100' : 'opacity-45'}`} onClick={atualizarPerfil}>Atualizar</button>
                            </div>
                            <div className="flex items-center w-full">
                                <input type="text" name="email" id="email" className="border border-zinc-500 w-full p-2 rounded-l-md" value={email} onChange={(e) => setNome(e.target.value)} />
                                <button className={`bg-verde h-full p-2 rounded-r-md ${user?.email != email ? 'opacity-100' : 'opacity-45'}`}>Atualizar</button>
                            </div>
                            <div className="flex items-center w-full">
                                <input type="text" name="telefone" id="telefone" className="border border-zinc-500 w-full p-2 rounded-l-md" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                                <button className={`bg-verde h-full p-2 rounded-r-md ${user?.telefone != telefone ? 'opacity-100' : 'opacity-45'}`}>Atualizar</button>
                            </div>
                            <div className="flex items-center w-full">
                                <select name="sexo" id="sexo" className="p-2 rounded border border-zinc-500 w-full">
                                    <option value="">Selecione</option>
                                    <option value="masculino">Masculino</option>
                                    <option value="feminino">Feminino</option>
                                    <option value="nao-informado">Prefiro Não Dizer</option>
                                </select>
                                <button className={`bg-verde h-full p-2 rounded-r-md ${user?.telefone != telefone ? 'opacity-100' : 'opacity-45'}`}>Atualizar</button>
                            </div>
                        </div>
                    </div>
                    <div className="md:grid md:grid-cols-2 md:gap-6">
                        <div className="w-full rounded-xl overflow-hidden">
                            <MapSelector
                                lat={latitude}
                                lng={longitude}
                                onChange={(novaLat, novaLng) => {
                                    setNovaLatitude(novaLat)
                                    setNovaLongitude(novaLng)
                                }}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <input type="text" name="rua" id="rua" className="border border-zinc-500 w-full p-2 rounded-md" value={rua} onChange={(e) => setRua(e.target.value)} />
                            <input type="text" name="numero" id="numero" className="border border-zinc-500 w-full p-2 rounded-md" value={numero} onChange={(e) => setNumero(e.target.value)} />
                            <input type="text" name="bairro" id="bairro" className="border border-zinc-500 w-full p-2 rounded-md" value={bairro} onChange={(e) => setBairro(e.target.value)} />
                            <input type="text" name="complemento" id="complemento" className="border border-zinc-500 w-full p-2 rounded-md" value={complemento} onChange={(e) => setComplemento(e.target.value)} />
                            <input type="text" name="novaLatitude" id="novaLatitude" className="border border-zinc-500 w-full p-2 rounded-md" value={novaLatitude} onChange={(e) => setNovaLatitude(parseFloat(e.target.value))} />
                            <input type="text" name="novaLongitude" id="novaLongitude" className="border border-zinc-500 w-full p-2 rounded-md" value={novaLongitude} onChange={(e) => setNovaLongitude(parseFloat(e.target.value))} />
                            <button className={`bg-verde w-full font-bebas text-2xl pt-2 pb-1 rounded-xl ${user?.endereco.rua != rua || user?.endereco.numero != numero || user?.endereco.bairro != bairro || user?.endereco.complemento != complemento ? 'opacity-100' : 'opacity-45'}`} onClick={atualizarPerfil}>Atualizar Endereço</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}