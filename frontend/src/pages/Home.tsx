import GoogleMap from "../components/GoogleMap";
import PetForm from "../components/PetForm";
import HomeContext from "../context/HomeContext";
import { createRef, useCallback, useEffect, useState } from "react";
import Pet from "../interfaces/Pet";
import { Helmet } from "react-helmet-async";
import PetInfoWindowContent from "../components/PetInfoWindowContent";

export default function Home() {
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ hasError, setHasError ] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    const [ shouldShowMap, setShouldShowMap ] = useState<boolean>(false);
    const [ visiblePets, setVisiblePets ] = useState<Pet[]>([]);
    const [ map, setMap] = useState<google.maps.Map | null>(null);
    const [ markers, setMarkers ] = useState<google.maps.Marker[]>([]);
    const [ petInfoPopup, setPetInfoPopup ] = useState<google.maps.InfoWindow | null>(null);
    const [ hasGoogleAPILoaded, setHasGoogleAPILoaded ] = useState<boolean>(false);

    useEffect(() => {
        (window as any).initMap = initMap;
    }, []);

    useEffect(() => {
        if (typeof window.google !== "undefined" && !map) {
            const mapElement = document.getElementById("google-map");
            if (typeof mapElement !== "undefined") {
                initMap();
            }
        }
    }, [map]);

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
        setHasGoogleAPILoaded(true);
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

            visiblePets.forEach(pet => {
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
    }, [visiblePets, map, handleMarkerClick]);

    return (
        <HomeContext.Provider value={{
            isLoading: isLoading,
            setIsLoading: setIsLoading,
            hasError: hasError,
            setHasError: setHasError,
            errorMessage: errorMessage,
            setErrorMessage: setErrorMessage,
            shouldShowMap: shouldShowMap,
            setShouldShowMap: setShouldShowMap,
            visiblePets: visiblePets,
            setVisiblePets: setVisiblePets,
            hasGoogleAPILoaded: hasGoogleAPILoaded,
            setHasGoogleAPILoaded: setHasGoogleAPILoaded
            }}>
            <PetForm />
            
            <GoogleMap />
            {hasError
                ? <p>Error: {errorMessage}</p>
                : isLoading
                    ? <p>Loading...</p>
                    : shouldShowMap
                        ? 
                            <section>
                                <ul>{visiblePets.map((p: Pet) => <li key={p.id}>{p.id}, {p.name}, {p.species}: {p.location?.lat}, {p.location?.lng}</li>)}</ul>
                            </section>
                        : null
            }
            <Helmet>
                <script
                    type="text/javascript"
                    async={true}
                    defer={true}
                    src={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`}
                />
            </Helmet>
        </HomeContext.Provider>
    );
}