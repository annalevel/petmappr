import { createRef, useCallback, useContext, useEffect, useState } from "react";
import HomeContext from "../context/HomeContext";
import PetInfoWindowContent from "./PetInfoWindowContent";
import Pet from "../interfaces/Pet";

export default function GoogleMap() {
    const context = useContext(HomeContext);
    const mapRef = createRef<HTMLElement>();
    const [ markers, setMarkers ] = useState<google.maps.Marker[]>([]);

    const handleMarkerClick = useCallback((pet: Pet, marker: google.maps.Marker) => {
        return () => {
            context.petInfoPopup?.setContent(PetInfoWindowContent(pet));
            context.petInfoPopup?.open({
                anchor: marker,
                map: context.map
            });
        };
    }, [context.petInfoPopup, context.map]);

    useEffect(() => {
        if (context.map) {
            const newMarkers: google.maps.Marker[] = [];
            const bounds = new google.maps.LatLngBounds();

            context.visiblePets.forEach(pet => {
                if (pet.location.lat !== null && pet.location.lng !== null) {
                    const petPosition = new google.maps.LatLng(pet.location.lat, pet.location.lng);
                    const marker = new google.maps.Marker({
                        position: petPosition,
                        title: pet.name,
                        map: context.map,
                    });
                    bounds.extend(petPosition);

                    marker.addListener("click", handleMarkerClick(pet, marker));
                    newMarkers.push(marker);
                }
            });
            
            context.map.fitBounds(bounds);
            
            setMarkers(prevMarkers => {
                prevMarkers.forEach(prevMarker => {
                    prevMarker.setVisible(false);
                    prevMarker.setMap(null);
                });
                return newMarkers;
            });
        }
    }, [context.visiblePets, context.map, handleMarkerClick]);

    return (
        <>
            <div
                id="google-map"
                ref={mapRef as React.RefObject<HTMLDivElement>}
                style={{ display: context.shouldShowMap && !context.hasError ? "block" : "none" }}
                />
        </>
    );
};