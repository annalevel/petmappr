import Pet from "./Pet";

export default interface HomeContextProps {
    shouldShowMap: boolean;
    setShouldShowMap: React.Dispatch<React.SetStateAction<boolean>>;
    visiblePets: Pet[];
    setVisiblePets: React.Dispatch<React.SetStateAction<Pet[]>>;
}