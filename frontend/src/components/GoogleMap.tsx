import { createRef, useCallback, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import HomeContext from "../context/HomeContext";
import PetInfoWindowContent from "./PetInfoWindowContent";
import Pet from "../interfaces/Pet";

export default function GoogleMap() {
    const context = useContext(HomeContext);
    const mapRef = createRef<HTMLElement>();
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
    const [petInfoPopup, setPetInfoPopup] = useState<google.maps.InfoWindow | null>(null);

    useEffect(() => {
        (window as any).initMap = initMap;
    });

    const initMap = () => {
        // Approximate center of continental USA
        let latitude = 37.0902;
        let longitude = -95.7129;
        const newMap = new window.google.maps.Map(
            document.getElementById("google-map")!,
            {
                center: new window.google.maps.LatLng(latitude, longitude),
                zoom: 4,
                mapTypeId: window.google.maps.MapTypeId.ROADMAP,
                gestureHandling: "greedy",
            }
        );

        const newPetInfoPopup = new google.maps.InfoWindow();
        setPetInfoPopup(newPetInfoPopup);
        setMap(newMap);
    };
    
    const handleMarkerClick = useCallback((pet: Pet, marker: google.maps.Marker) => {
            return () => {
                petInfoPopup?.setContent(PetInfoWindowContent(pet));
                petInfoPopup?.open({
                    anchor: marker,
                    map,
                });
            };
    }, [petInfoPopup, map]);
    
    useEffect(() => {
        if (map) {
            const newMarkers: google.maps.Marker[] = [];
            const bounds = new google.maps.LatLngBounds();

            context.visiblePets.forEach(pet => {
                if (pet.location.lat !== null && pet.location.lng !== null) {
                    const petPosition = new google.maps.LatLng(pet.location.lat, pet.location.lng);
                    const marker = new google.maps.Marker({
                        position: petPosition,
                        title: pet.name,
                        map: map,
                    });
                    bounds.extend(petPosition);
    
                    marker.addListener("click", handleMarkerClick(pet, marker));
                    newMarkers.push(marker);
                }
            });
            
            map.fitBounds(bounds);
            setMarkers(prevMarkers => {
                prevMarkers.forEach(prevMarker => {
                    prevMarker.setVisible(false);
                    prevMarker.setMap(null);
                });
                return newMarkers;
            });
        }
    }, [context.visiblePets, map, handleMarkerClick]);

    return (
        <>
            <div
                id="google-map"
                ref={mapRef as React.RefObject<HTMLDivElement>}
            >
            </div>
            <Helmet>
                <script
                    type="text/javascript"
                    async={true}
                    defer={true}
                    src={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&callback=initMap`}
                />
            </Helmet>
        </>
    );
};