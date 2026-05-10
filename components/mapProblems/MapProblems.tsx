'use client'

import L from "leaflet"

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from "react-leaflet"

import "leaflet/dist/leaflet.css"

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
                problemas.map((problema) => (

                    <Marker
                        key={problema.id}

                        position={[
                            problema.endereco.latitude,
                            problema.endereco.longitude
                        ]}

                        icon={getIconByRisk(problema.risco)}
                    >

                        <Popup>

                            <div className="text-black">

                                <h2 className="font-bold">
                                    {problema.tipoDoProblema}
                                </h2>

                                <p>
                                    Categoria:
                                    {" "}
                                    {problema.categoria}
                                </p>

                                <p>
                                    Risco:
                                    {" "}
                                    {problema.risco}
                                </p>

                            </div>

                        </Popup>

                    </Marker>
                ))
            }

        </MapContainer>
    )
}