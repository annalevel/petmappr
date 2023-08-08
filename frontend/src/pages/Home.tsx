import GoogleMap from "../components/GoogleMap";
import PetForm from "../components/PetForm";
import HomeContext from "../context/HomeContext";
import { useState } from "react";
import Pet from "../interfaces/Pet";

export default function Home() {
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ hasError, setHasError ] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    const [ shouldShowMap, setShouldShowMap ] = useState<boolean>(false);
    const [ visiblePets, setVisiblePets ] = useState<Pet[]>([]);

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
            }}>
            <PetForm />
            {hasError
                ? <p>Error: {errorMessage}</p>
                : isLoading
                    ? <p>Loading...</p>
                    : shouldShowMap
                        ? 
                            <section>
                                <GoogleMap />
                                <ul>{visiblePets.map((p: Pet) => <li key={p.id}>{p.id}, {p.name}, {p.species}: {p.location?.lat}, {p.location?.lng}</li>)}</ul>
                            </section>
                        : null
            }
        </HomeContext.Provider>
    );
}