import { MapContainer, Marker, TileLayer, Tooltip, useMap } from 'react-leaflet'
import { LatLngBounds, LatLngExpression } from 'leaflet'
import { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import L from 'leaflet'
import { Salon } from '../../types/salon'

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

interface CustomMapContainerProps {
  salons: Salon[]
  hoverId: string | undefined
  scrollWheelZoom?: boolean
}

const FitBounds = ({ bounds, center }: { bounds: LatLngBounds; center?: LatLngExpression }) => {
  const map = useMap()

  useEffect(() => {
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [map, bounds])

  useEffect(() => {
    if (center) {
      map.setView(center)
    }
  }, [map, center])

  return null
}

export default function CustomMapContainer({
  salons,
  hoverId,
  scrollWheelZoom = false,
}: CustomMapContainerProps) {
  const bounds = new LatLngBounds([
    ...salons.map(salon => [Number(salon.latitude), Number(salon.longitude)] as [number, number]),
  ])
  const [center, setCenter] = useState<LatLngExpression>(bounds.getCenter())
  console.log('Hover ID in Map:', hoverId)
  useEffect(() => {
    console.log('hoverId changed:', hoverId)
    if (hoverId) {
      const salon = salons.find(salon => salon.id === hoverId)
      console.log(salon)
      if (salon) {
        setCenter([Number(salon.latitude), Number(salon.longitude)])
      }
    }
  }, [hoverId, salons])

  useEffect(() => {
    // Do something when hoverId changes
    console.log('hoverId changed:', hoverId)
    // ...update marker highlight, etc.
  }, [hoverId])

  return (
    <MapContainer minZoom={5} scrollWheelZoom={scrollWheelZoom}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {salons.map(salon => (
        <Marker
          icon={defaultIcon}
          key={salon.id}
          position={[Number(salon.latitude), Number(salon.longitude)]}
        >
          <Tooltip direction='top' offset={[-15, -15]} permanent>
            <Typography variant='subtitle2'>{salon.name}</Typography>
          </Tooltip>
        </Marker>
      ))}
      <FitBounds bounds={bounds} center={center} />
    </MapContainer>
  )
}
