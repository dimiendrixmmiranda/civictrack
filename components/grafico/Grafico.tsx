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

interface GraficoProps {
    categorias: { name: string, value: number }[]
}

export default function Grafico({ categorias }: GraficoProps) {
    const todosZerados = categorias.map(cat => cat.value).reduce((a, b) => a + b)
    console.log(todosZerados)
    return (
        <div className="col-start-2 col-end-3 w-full h-[300px] flex flex-col bg-cinza-2 rounded-xl p-4">
            <h2 className="text-white font-bebas text-3xl">
                Problemas por categoria
            </h2>
            {
                todosZerados > 0 ? (
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
                        <div className="flex-col gap-2 my-auto hidden md:flex xl:hidden 2xl:flex">
                            <div className="flex flex-col capitalize gap-1.5">
                                {
                                    categorias.map((cat, i) => {
                                        return (
                                            <div className="flex items-center gap-2" key={i}>
                                                <div className="w-5 h-5 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                                                <p className="text-sm">{cat.name}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                ):(
                    <div className="flex w-full h-full justify-center items-center text-center font-bebas text-xl px-10">
                        <h2>Nenhuma denúncia feita! Faça uma nova denúncia e veja as estatísticas aqui!</h2>
                    </div>
                )
            }
        </div>
    )
}