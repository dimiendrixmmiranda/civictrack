'use client'
import { useDenuncias } from "@/hooks/useDenuncias"
import { FaCheckDouble, FaClipboardList, FaExclamationTriangle } from "react-icons/fa"
import { RiMoneyDollarCircleFill } from "react-icons/ri"

export default function Dados() {
    const { denuncias } = useDenuncias()

    const denunciasDoMes = denuncias.filter((denuncia) => {

        const dataDenuncia = new Date(denuncia.createdAt)

        const hoje = new Date()

        return (
            dataDenuncia.getMonth() === hoje.getMonth() &&
            dataDenuncia.getFullYear() === hoje.getFullYear()
        )
    })
    const denunciasAbertasDoMes = denuncias.filter(denuncia => denuncia.status === 'aberto').filter((denuncia) => {

        const dataDenuncia = new Date(denuncia.createdAt)

        const hoje = new Date()

        return (
            dataDenuncia.getMonth() === hoje.getMonth() &&
            dataDenuncia.getFullYear() === hoje.getFullYear()
        )
    })
    const denunciasResolvidas = denuncias.filter(denuncia => denuncia.status === 'resolvido').filter((denuncia) => {

        const dataDenuncia = new Date(denuncia.createdAt)

        const hoje = new Date()

        return (
            dataDenuncia.getMonth() === hoje.getMonth() &&
            dataDenuncia.getFullYear() === hoje.getFullYear()
        )
    })

    const precoDasDenunciasResolvidas = denuncias
        .filter(
            d =>
                d.status === 'resolvido' &&
                d.custo !== '' &&
                d.custo != null
        )
        .reduce((total, denuncia) => {
            return total + parseFloat(denuncia.custo)
        }, 0)


    return (
        <section className="bg-black w-full p-4 -mt-1">
            <ul className="mx-auto max-w-[1300px] flex flex-col justify-center items-center gap-4 md:grid md:grid-cols-2 lg:grid-cols-4">
                <li className="flex justify-center w-full">
                    <div className="bg-azul-escuro p-3 flex gap-2 rounded-xl w-full">
                        <div className="w-15 h-15 bg-azul-claro flex justify-center items-center rounded-2xl">
                            <FaClipboardList className="text-4xl" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bebas text-2xl leading-6">Total de problemas</span>
                            <div className="flex gap-1 mt-auto">
                                <p className="font-bold text-3xl">{denuncias.length || 0}</p>
                                <span className="self-end text-blue-400">+{denunciasDoMes.length} este mês</span>
                            </div>
                        </div>
                    </div>
                </li>
                <li className="flex justify-center">
                    <div className="bg-azul-escuro p-3 flex gap-2 rounded-xl w-full">
                        <div className="w-15 h-15 bg-red-600 flex justify-center items-center rounded-2xl">
                            <FaExclamationTriangle className="text-4xl" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bebas text-2xl leading-6">Abertos</span>
                            <div className="flex gap-1 mt-auto">
                                <p className="font-bold text-3xl">{denuncias.filter(denuncia => denuncia.status == 'aberto').length}</p>
                                <span className="self-end text-red-400">+{denunciasAbertasDoMes.length} este mes</span>
                            </div>
                        </div>
                    </div>
                </li>
                <li className="flex justify-center">
                    <div className="bg-azul-escuro p-3 flex gap-2 rounded-xl w-full">
                        <div className="w-15 h-15 bg-green-600 flex justify-center items-center rounded-2xl">
                            <FaCheckDouble className="text-4xl" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bebas text-2xl leading-6">Resolvidos</span>
                            <div className="flex gap-1 mt-auto">
                                <p className="font-bold text-3xl">{denuncias.filter(denuncia => denuncia.status === 'resolvido').length}</p>
                                <span className="self-end text-green-400">+{denunciasResolvidas.length} este mes</span>
                            </div>
                        </div>
                    </div>
                </li>
                <li className="flex justify-center">
                    <div className="bg-azul-escuro p-3 flex gap-2 rounded-xl w-full">
                        <div className="w-15 h-15 bg-purple-600 flex justify-center items-center rounded-2xl">
                            <RiMoneyDollarCircleFill className="text-4xl" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bebas text-lg leading-6">Custo Estimado Total</span>
                            <p className="text-2xl mt-auto font-bold">R${precoDasDenunciasResolvidas.toFixed(2) || '0,00'}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
    )
}