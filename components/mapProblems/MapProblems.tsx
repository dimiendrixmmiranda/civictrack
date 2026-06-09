'use client'

import L from "leaflet"

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from "react-leaflet"

import "leaflet/dist/leaflet.css"
import Image from "next/image"

type MapProblem = {

    id: string

    categoria: string

    risco: string

    tipoDoProblema: string

    endereco: {
        latitude: number
        longitude: number
    }
}

type Props = {
    problemas: MapProblem[]
}

export default function MapProblems({
    problemas
}: Props) {

    function getIconByRisk(risco: string) {

        let icon = "/leaflet/risco/default.png"

        if (risco === "baixo") {
            icon = "/leaflet/risco/baixo.png"
        }
        if (risco === "medio") {
            icon = "/leaflet/risco/medio.png"
        }
        if (risco === "alto") {
            icon = "/leaflet/risco/alto.png"
        }

        return L.icon({

            iconUrl: icon,

            shadowUrl: "/leaflet/marker-shadow.png",

            iconSize: [35, 45],

            iconAnchor: [17, 45]
        })
    }

    return (
        <MapContainer
            center={[-23.4981, -49.9240]}
            zoom={13}
            style={{
                width: "100%",
                height: '300px'
            }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                problemas.map((problema => {
                    console.log(problema)
                    return (
                        <Marker
                            key={problema.id}
                            position={[
                                problema.endereco.latitude,
                                problema.endereco.longitude
                            ]}
                            icon={getIconByRisk(problema.risco)}
                        >
                            <Popup>
                                <div className="text-black flex flex-col gap-2">
                                    <h2 className="font-bold">
                                        {problema.tipoDoProblema}
                                    </h2>
                                    <div className="relative w-full h-20 border border-lg rounded-xl">
                                        {/* <Image alt={problema.tipoDoProblema} src={problema.}/> */}
                                    </div>
                                    <p className="m-0!">Categoria: {problema.categoria}</p>
                                    <p className="m-0!">Risco: {problema.risco ? problema.risco : 'Não definido'}</p>
                                </div>
                            </Popup>
                        </Marker>
                    )
                }))
            }

        </MapContainer>
    )
}