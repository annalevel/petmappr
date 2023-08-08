import GoogleMap from "../components/GoogleMap";
import PetForm from "../components/PetForm";
import HomeContext from "../context/HomeContext";
import { useState } from "react";
import Pet from "../interfaces/Pet";

export default function Home() {
    const [ hasError, setHasError ] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    const [ shouldShowMap, setShouldShowMap ] = useState<boolean>(false);
    const [ visiblePets, setVisiblePets ] = useState<Pet[]>([]);

    return (
        <HomeContext.Provider value={{
            hasError: hasError,
            setHasError: setHasError,
            errorMessage: errorMessage,
            setErrorMessage: setErrorMessage,
            shouldShowMap: shouldShowMap,
            setShouldShowMap: setShouldShowMap,
            visiblePets: visiblePets,
            setVisiblePets: setVisiblePets,
            }}>
            <PetForm />
            {shouldShowMap && !hasError ? <GoogleMap /> : null}
            {hasError
                ? <p>Error: {errorMessage}</p>
                : <p>{visiblePets.map((p: Pet) => <li key={p.id}>{p.id}, {p.name}, {p.species}: {p.location?.lat}, {p.location?.lng}</li>)}</p>
            }
        </HomeContext.Provider>
    );
}