'use client'

import { useState } from 'react'

import L, { Marker as LeafletMarker } from "leaflet"

import {
    MapContainer,
    TileLayer,
    Marker,
    useMapEvents
} from 'react-leaflet'

import "leaflet/dist/leaflet.css"

delete (L.Icon.Default.prototype as any)._getIconUrl

type Props = {
    lat: number
    lng: number
    iconUrl?: string
    onChange: (lat: number, lng: number) => void
}

function LocationMarker({
    lat,
    lng,
    iconUrl,
    onChange
}: Props) {

    const [position, setPosition] = useState<[number, number]>([
        lat,
        lng
    ])

    const customIcon = L.icon({

        // ÍCONE PRINCIPAL
        iconUrl: iconUrl || "/leaflet/default.png",

        // SOMBRA
        shadowUrl: "/leaflet/default.png",

        // TAMANHO
        iconSize: [30, 50],

        // POSIÇÃO
        iconAnchor: [20, 40],
    })

    useMapEvents({
        click(e) {

            const { lat, lng } = e.latlng

            setPosition([lat, lng])

            onChange(lat, lng)
        }
    })

    return (
        <Marker
            position={position}
            icon={customIcon}
            draggable={true}
            eventHandlers={{
                dragend: (e) => {

                    const marker = e.target as LeafletMarker

                    const pos = marker.getLatLng()

                    setPosition([pos.lat, pos.lng])

                    onChange(pos.lat, pos.lng)
                }
            }}
        />
    )
}

export default function MapSelector({
    lat,
    lng,
    iconUrl,
    onChange
}: Props) {

    return (
        <MapContainer
            center={[lat, lng]}
            zoom={15}
            style={{
                height: "100%",
                width: "100%"
            }}
        >

            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <LocationMarker
                lat={lat}
                lng={lng}
                iconUrl={iconUrl}
                onChange={onChange}
            />

        </MapContainer>
    )
}