'use client'

import { useDenuncias } from "@/hooks/useDenuncias"
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip
} from "recharts"


const COLORS = [
    "#4C8CE4",
    "#FFC81E",
    "#FFF6F6",
    "#0A7C6E",
    "#89D4FF",
    "#D62828",
    "#BFC6C4",
]

export default function Grafico() {
    const { denuncias } = useDenuncias()
    const categoriasFixas = [
        "infraestrutura",
        "iluminacao",
        "limpeza",
        "meio-ambiente",
        "drenagem",
        "seguranca",
        "outros",
    ]
    const categorias = categoriasFixas.map((categoria) => {

        const quantidade = denuncias.filter(
            denuncia => denuncia.categoria === categoria
        ).length

        return {
            name: categoria,
            value: quantidade
        }
    })

    console.log(categorias)

    return (
        <div className="col-start-2 col-end-3 w-full h-[300px] flex flex-col bg-cinza rounded-xl p-4">
            <h2 className="text-white font-bebas text-3xl">
                Problemas por categoria
            </h2>
            <div className="grid grid-cols-2 gap-4 w-full h-full">
                <div className="w-[220px] h-[220px]">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={categorias}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={3}
                                dataKey="value"
                            >
                                {categorias.map((entry, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>

                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex flex-col gap-2 my-auto">
                    <div className="flex flex-col capitalize gap-1.5">
                        {
                            categoriasFixas.map((cat, i) => {
                                return (
                                    <div className="flex items-center gap-2" key={i}>
                                        <div className="w-5 h-5 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                                        <p className="text-sm">{cat}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}