import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker } from 'react-leaflet/Marker'
import { Popup } from 'react-leaflet/Popup'
import { useMap } from 'react-leaflet/hooks'
import { LatLngLiteral, Layer, LeafletEvent, Map, Marker as TMarker } from 'leaflet'
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

import "leaflet/dist/leaflet.css"
import "leaflet-geosearch/dist/geosearch.css";
import "./index.css"
import { useEffect, useMemo, useRef } from 'react'
import { MapPinIcon } from '@heroicons/react/24/outline'
import { rem } from '@mantine/core'

export const SFAX_COORDS: LatLngLiteral = { lat: 34.7394361, lng: 10.7604024 }

interface GeoSearchEvent extends LeafletEvent {
    location?: {
        label: string
        x: number // lon
        y: number // lat
    };
}

interface LeafletMapProps {
    position: LatLngLiteral
    onPositionChange: (coords: LatLngLiteral) => void
}

export default function LeafletMap({ position, onPositionChange }: LeafletMapProps) {

    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "35vh", width: "100%", borderRadius: 10, colorScheme: "light", direction: "ltr" }}>
            <MapContent
                position={position}
                updatePosition={(coords) => onPositionChange(coords)}
            />
        </MapContainer>
    )
}


interface LeafletgeoSearchProps {
    map: Map,
    updatePosition: (coords: LatLngLiteral) => void
}


function LeafletgeoSearch({ map, updatePosition }: LeafletgeoSearchProps) {
    useEffect(() => {
        const provider = new OpenStreetMapProvider();

        const searchControl = new (GeoSearchControl as any)({
            provider,
            autoClose: true,
            // keepResult: true,
            retainZoomLevel: true,
            showMarker: false,
            // style: 'bar',
        });

        map?.addControl(searchControl);

        map?.on('geosearch/showlocation', (e) => {
            const event = e as GeoSearchEvent
            if (event.location) {
                const { y: lat, x: lng } = event.location
                updatePosition({ lat, lng })
                map.flyTo({ lat, lng }, map.getZoom());
            }
            console.log(event.location);

        });

        document.querySelector("button.reset")?.addEventListener("click", () => {
            console.log("click");

        })

        return () => { map?.removeControl(searchControl) };
    }, [])

    return null;
}


interface FlyToButtonProps {
    map: Map,
    updatePosition: (coords: LatLngLiteral) => void
}

function FlyToButton({ map, updatePosition }: FlyToButtonProps) {
    const onClick = () => {
        map?.locate().on("locationfound", function (e) {
            updatePosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        });
    };

    return (
        <div className='current_location_btn_container'>
            <button type='button' title='Your current position' className="current_location_btn" onClick={onClick}>
                <MapPinIcon style={{ width: rem(22), height: rem(22) }} />
            </button>
        </div>
    );
}

interface MapContentProps {
    position: LatLngLiteral
    updatePosition: (coords: LatLngLiteral) => void
}

function MapContent({ position, updatePosition }: MapContentProps) {
    const map = useMap()
    const markerRef = useRef<TMarker>(null)
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    updatePosition(marker.getLatLng())
                }
            },
        }),
        [],
    )
    return (
        <>
            <FlyToButton
                map={map}
                updatePosition={updatePosition}
            />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {position && (
                <Marker
                    draggable
                    position={position}
                    eventHandlers={eventHandlers}
                    ref={markerRef}
                >
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            )}
            <LeafletgeoSearch
                map={map}
                updatePosition={updatePosition}
            />
        </>
    )
}