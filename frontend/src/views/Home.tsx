import GoogleMap from "../components/home/GoogleMap";
import PetForm from "../components/home/PetForm";
import HomeContext from "../context/HomeContext";
import { useEffect, useState } from "react";
import Pet from "../interfaces/Pet";
import { Helmet } from "react-helmet-async";
import ResultsDisplay from "../components/home/ResultsDisplay";

export default function Home() {
    // Status can be initial (ready to submit but no display), loading, error, or displaying
    const [ status, setStatus ] = useState<string>("initial");
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    const [ visiblePets, setVisiblePets ] = useState<Pet[]>([]);
    const [ map, setMap] = useState<google.maps.Map | null>(null);
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
        setPetInfoPopup(new google.maps.InfoWindow());
        setMap(newMap);
        setHasGoogleAPILoaded(true);
    };
    
    return (
        <HomeContext.Provider value={{
            status: status,
            setStatus: setStatus,
            errorMessage: errorMessage,
            setErrorMessage: setErrorMessage,
            visiblePets: visiblePets,
            setVisiblePets: setVisiblePets,
            hasGoogleAPILoaded: hasGoogleAPILoaded,
            setHasGoogleAPILoaded: setHasGoogleAPILoaded,
            map: map,
            petInfoPopup: petInfoPopup,
            setPetInfoPopup: setPetInfoPopup,
            }}>
            <PetForm />
            <section id="results-wrapper">
                <GoogleMap />
                <ResultsDisplay />
            </section>
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