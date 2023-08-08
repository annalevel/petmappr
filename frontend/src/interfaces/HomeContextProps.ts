import Pet from "./Pet";

export default interface HomeContextProps {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    hasError: boolean;
    setHasError: React.Dispatch<React.SetStateAction<boolean>>;
    errorMessage: string;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    shouldShowMap: boolean;
    setShouldShowMap: React.Dispatch<React.SetStateAction<boolean>>;
    visiblePets: Pet[];
    setVisiblePets: React.Dispatch<React.SetStateAction<Pet[]>>;
    hasGoogleAPILoaded: boolean;
    setHasGoogleAPILoaded: React.Dispatch<React.SetStateAction<boolean>>;
}