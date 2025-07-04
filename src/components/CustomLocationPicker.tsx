import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import L from "leaflet";

const defaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

export default function CustomLocationPicker({
    initialLocation,
    onChange,
    icon = defaultIcon,
}: {
    initialLocation: [number, number] | null;
    onChange?: (location: [number, number] | null) => void;
    icon?: L.Icon;
}) {
    const [position, setPosition] = useState<[number, number] | null>(initialLocation);

    useEffect(() => {
        setPosition(initialLocation);
    }, [initialLocation]);

    useEffect(() => {
        if (onChange) {
            onChange(position);
        }
    }, [position, onChange]);

    const LocationMarker = () => {
        const map = useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setPosition([lat, lng]);
                map.flyTo(e.latlng, map.getZoom());
                map.setView(e.latlng, map.getZoom());
            },
            mouseover() {
                map.getContainer().style.cursor = "crosshair";
            },
            drag() {
                map.getContainer().style.cursor = "grab";
            },
            dragend() {
                map.getContainer().style.cursor = "crosshair";
            },
        });

        return position === null ? null : <Marker icon={icon} position={position} />;
    };

    return (
        <MapContainer
            center={initialLocation || [6.924, 79.856]}
            zoom={13}
            style={{ height: "200px", width: "100%" }}
        >
            <Box
                sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    zIndex: 1000,
                    backgroundColor: "transparent",
                    backdropFilter: "blur(10px)",
                    borderRadius: "5px",
                    padding: "5px",
                }}
            >
                {position && (
                    <Box>
                        <Typography variant="body2">Latitude: {position[0]}</Typography>
                        <Typography variant="body2">Longitude: {position[1]}</Typography>
                    </Box>
                )}
            </Box>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker />
            {/* Hidden inputs removed, as well as react-hook-form Controller */}
        </MapContainer>
    );
}
