'use client'
import Template from "@/components/template/Template";
import { useDenuncias } from "@/hooks/useDenuncias";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosInformationCircle } from "react-icons/io";
import { TbTriangleInvertedFilled } from "react-icons/tb";

export default function Page() {
    const { denuncias } = useDenuncias()

    const [listaDenuncias, setListaDenuncias] = useState(denuncias)
    const [custo, setCusto] = useState('')
    useEffect(() => {
        setListaDenuncias(denuncias)
    }, [denuncias])

    const [abrirRiscoId, setAbrirRiscoId] = useState<string | null>(null)
    const [selecionarRisco, setSelecionarRisco] = useState("")

    const [abrirPrioridadeId, setAbrirPrioridadeId] = useState<string | null>(null)
    const [selecionarPrioridade, setSelecionarPrioridade] = useState("")

    const [abrirStatusId, setAbrirStatusId] = useState<string | null>(null)
    const [selecionarStatus, setSelecionarStatus] = useState("")

    const [abrirCustoId, setAbrirCustoId] = useState<string | null>(null)

    const [selecionarCusto, setSelecionarCusto] = useState("")

    async function handleUpdateRisco(
        denunciaId: string,
        risco: string
    ) {

        try {

            const res = await fetch(
                `/api/denuncias/${denunciaId}`,
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        risco
                    })
                }
            )

            const data = await res.json()

            setListaDenuncias((prev) =>
                prev.map((item) =>
                    item.id === denunciaId
                        ? {
                            ...item,
                            risco
                        }
                        : item
                )
            )

            if (!res.ok) {

                alert(data.error)

                return
            }

            alert("Risco atualizado!")
            setAbrirRiscoId(null)

        } catch (error) {

            console.error(error)

            alert("Erro ao atualizar")
        }
    }
    async function handleUpdatePrioridade(
        denunciaId: string,
        prioridade: string
    ) {

        try {

            const res = await fetch(
                `/api/denuncias/${denunciaId}`,
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        prioridade
                    })
                }
            )

            const data = await res.json()
            setListaDenuncias((prev) =>
                prev.map((item) =>
                    item.id === denunciaId
                        ? {
                            ...item,
                            prioridade
                        }
                        : item
                )
            )

            if (!res.ok) {

                alert(data.error)

                return
            }

            alert("Prioridade atualizado!")
            setAbrirPrioridadeId(null)

        } catch (error) {

            console.error(error)

            alert("Erro ao atualizar")
        }
    }
    async function handleUpdateStatus(
        denunciaId: string,
        status: string
    ) {

        try {

            const res = await fetch(
                `/api/denuncias/${denunciaId}`,
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        status
                    })
                }
            )

            const data = await res.json()

            setListaDenuncias((prev) =>
                prev.map((item) =>
                    item.id === denunciaId
                        ? {
                            ...item,
                            status
                        }
                        : item
                )
            )

            if (!res.ok) {

                alert(data.error)

                return
            }

            alert("status atualizado!")
            setAbrirStatusId(null)

        } catch (error) {

            console.error(error)

            alert("Erro ao atualizar")
        }
    }

    async function handleUpdateCusto(
        denunciaId: string,
        custo: string
    ) {

        try {

            const res = await fetch(
                `/api/denuncias/${denunciaId}`,
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        custo
                    })
                }
            )

            const data = await res.json()

            setListaDenuncias((prev) =>
                prev.map((item) =>
                    item.id === denunciaId
                        ? {
                            ...item,
                            custo: custo
                        }
                        : item
                )
            )

            if (!res.ok) {

                alert(data.error)

                return
            }

            alert("Custo atualizado!")
            setAbrirCustoId(null)

        } catch (error) {

            console.error(error)

            alert("Erro ao atualizar")
        }
    }

    return (
        <Template>
            <section className="bg-black p-4">
                <div className="bg-cinza p-4 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h2 className="font-bebas text-2xl">Problemas recentes</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <div className="flex flex-col w-full">
                            <div className="
                            grid
                            grid-cols-[40px_minmax(200px,1fr)_130px_130px_130px_130px_130px_200px_130px]
                            gap-3
                            border-y-2
                            border-zinc-700
                            py-2
                        ">
                                <div></div>
                                <div className="truncate">
                                    Problema
                                </div>
                                <div className="flex items-center">
                                    Categoria
                                </div>
                                <div className="flex items-center">
                                    Risco
                                </div>
                                <div className="flex items-center">
                                    Prioridade
                                </div>
                                <div className="flex items-center">
                                    Status
                                </div>
                                <div className="flex items-center">
                                    Data
                                </div>
                                <div className="flex items-center">
                                    Imagem
                                </div>
                                <div className="flex items-center">
                                    Custo
                                </div>
                            </div>

                            {listaDenuncias.map((problema) => (
                                <div
                                    key={problema.id}
                                    className="
                                    grid
                                    grid-cols-[40px_minmax(200px,1fr)_130px_130px_130px_130px_130px_200px_130px]
                                    gap-3
                                    py-3
                                    border-b
                                    border-zinc-800
                                "
                                >
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center"></div>
                                    </div>
                                    <div className="truncate flex items-center">
                                        {problema.tipoDoProblema}
                                    </div>
                                    <div className="flex items-center">
                                        {problema.categoria}
                                    </div>
                                    <div className="flex items-center relative">
                                        {problema.risco ? problema.risco : 'Não definido'}
                                        <button
                                            onClick={() => {
                                                setAbrirRiscoId(
                                                    abrirRiscoId === problema.id
                                                        ? null
                                                        : problema.id
                                                )

                                                setSelecionarRisco(problema.risco || "")
                                            }}
                                            className="absolute top-0 right-0 text-xs"
                                        >
                                            <TbTriangleInvertedFilled />
                                        </button>
                                        {
                                            abrirRiscoId === problema.id && (
                                                <div className="w-full bg-zinc-500 absolute top-0 left-0 h-[100px] p-2 z-10">
                                                    <select name="risco" id="risco" value={selecionarRisco} onChange={(e) => setSelecionarRisco(e.target.value)} className="w-full">
                                                        <option value="">Selecione</option>
                                                        <option value="alto">Alto</option>
                                                        <option value="medio">Medio</option>
                                                        <option value="baixo">Baixo</option>
                                                    </select>
                                                    <button className="text-xs"
                                                        onClick={() =>
                                                            handleUpdateRisco(
                                                                problema.id,
                                                                selecionarRisco
                                                            )
                                                        }>
                                                        Salvar Alteração
                                                    </button>
                                                    <button onClick={() => setAbrirRiscoId(null)}>
                                                        <TbTriangleInvertedFilled />
                                                    </button>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="flex items-center relative">
                                        {problema.prioridade ? problema.prioridade : 'Não definido'}
                                        <button
                                            onClick={() => {
                                                setAbrirPrioridadeId(
                                                    abrirPrioridadeId === problema.id
                                                        ? null
                                                        : problema.id
                                                )

                                                setSelecionarPrioridade(problema.prioridade || "")
                                            }}
                                            className="absolute top-0 right-0 text-xs"
                                        >
                                            <TbTriangleInvertedFilled />
                                        </button>
                                        {
                                            abrirPrioridadeId === problema.id && (
                                                <div className="w-full bg-zinc-500 absolute top-0 left-0 h-[100px] p-2 z-10">
                                                    <input
                                                        type="number"
                                                        min={0}
                                                        max={20}
                                                        value={selecionarPrioridade}
                                                        onChange={(e) =>
                                                            setSelecionarPrioridade(e.target.value)
                                                        }
                                                        className="w-full text-black bg-amber-500"
                                                    />
                                                    <button className="text-xs"
                                                        onClick={() =>
                                                            handleUpdatePrioridade(
                                                                problema.id,
                                                                selecionarPrioridade
                                                            )
                                                        }>
                                                        Salvar Alteração
                                                    </button>
                                                    <button onClick={() => setAbrirPrioridadeId(null)}>
                                                        <TbTriangleInvertedFilled />
                                                    </button>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="flex items-center relative">
                                        {problema.status}
                                        <button
                                            onClick={() => {
                                                setAbrirStatusId(
                                                    abrirStatusId === problema.id
                                                        ? null
                                                        : problema.id
                                                )

                                                setSelecionarStatus(problema.status || "")
                                            }}
                                            className="absolute top-0 right-0 text-xs"
                                        >
                                            <TbTriangleInvertedFilled />
                                        </button>
                                        {
                                            abrirStatusId === problema.id && (
                                                <div className="w-full bg-zinc-500 absolute top-0 left-0 h-[100px] p-2 z-10">
                                                    <select name="risco" id="risco" value={selecionarStatus} onChange={(e) => setSelecionarStatus(e.target.value)} className="w-full">
                                                        <option value="aberto">Aberto</option>
                                                        <option value="em-andamento">Em Andamento</option>
                                                        <option value="resolvido">Resolvido</option>
                                                    </select>
                                                    <button className="text-xs"
                                                        onClick={() =>
                                                            handleUpdateStatus(
                                                                problema.id,
                                                                selecionarStatus
                                                            )
                                                        }>
                                                        Salvar Alteração
                                                    </button>
                                                    <button onClick={() => setAbrirStatusId(null)}>
                                                        <TbTriangleInvertedFilled />
                                                    </button>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="flex items-center">
                                        {new Date(problema.createdAt).toLocaleDateString("pt-BR")}
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-[100px] h-[50px] bg-red-500 relative">
                                            <Image alt={problema.tipoDoProblema} src={problema.imagem} fill className="object-cover" />
                                        </div>
                                    </div>
                                    <div className="flex items-center relative">
                                        {
                                            problema.status === 'resolvido' ? (
                                                <>
                                                    {
                                                        problema.custo && !isNaN(Number(problema.custo))
                                                            ? Number(problema.custo).toLocaleString(
                                                                "pt-BR",
                                                                {
                                                                    style: "currency",
                                                                    currency: "BRL"
                                                                }
                                                            )
                                                            : "Não definido"
                                                    }

                                                    <button
                                                        onClick={() => {

                                                            setAbrirCustoId(
                                                                abrirCustoId === problema.id
                                                                    ? null
                                                                    : problema.id
                                                            )

                                                            setSelecionarCusto(
                                                                problema.custo?.toString() || ""
                                                            )
                                                        }}

                                                        className="absolute top-0 right-0 text-xs"
                                                    >
                                                        <TbTriangleInvertedFilled />
                                                    </button>

                                                    {
                                                        abrirCustoId === problema.id && (

                                                            <div className="w-full bg-zinc-500 absolute top-0 left-0 p-2 z-10 flex flex-col gap-2">

                                                                <input
                                                                    type="text"

                                                                    placeholder="R$ 0,00"

                                                                    value={selecionarCusto}

                                                                    onChange={(e) =>
                                                                        setSelecionarCusto(e.target.value)
                                                                    }

                                                                    className="w-full text-black"
                                                                />

                                                                <button
                                                                    className="text-xs"

                                                                    onClick={() =>
                                                                        handleUpdateCusto(
                                                                            problema.id,
                                                                            selecionarCusto
                                                                        )
                                                                    }
                                                                >
                                                                    Salvar Alteração
                                                                </button>

                                                            </div>
                                                        )
                                                    }
                                                </>
                                            ) : (
                                                <div>
                                                    <h2 className="text-sm text-center">Problema não resolvido</h2>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <Link href={'/'} className="flex items-center justify-center gap-1 p-1 rounded-full">
                            <IoIosInformationCircle className="text-2xl md:text-xl" />
                            <p className="hidden md:flex">
                                Ver Todas as denúncias
                            </p>
                        </Link>
                    </div>
                </div>
            </section>
        </Template>
    )
}