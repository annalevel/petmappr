import Pet from "./Pet";

export default interface HomeContextProps {
    status: string;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
    errorMessage: string;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    visiblePets: Pet[];
    setVisiblePets: React.Dispatch<React.SetStateAction<Pet[]>>;
    hasGoogleAPILoaded: boolean;
    setHasGoogleAPILoaded: React.Dispatch<React.SetStateAction<boolean>>;
    map: google.maps.Map | null;
    petInfoPopup: google.maps.InfoWindow | null;
    setPetInfoPopup: React.Dispatch<React.SetStateAction<google.maps.InfoWindow | null>>;
}