import Pet from "./Pet";

export default interface HomeContextProps {
    hasError: boolean;
    setHasError: React.Dispatch<React.SetStateAction<boolean>>;
    errorMessage: string;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    shouldShowMap: boolean;
    setShouldShowMap: React.Dispatch<React.SetStateAction<boolean>>;
    visiblePets: Pet[];
    setVisiblePets: React.Dispatch<React.SetStateAction<Pet[]>>;
}