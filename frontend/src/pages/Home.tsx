import GoogleMap from "../components/GoogleMap";
import PetForm from "../components/PetForm";
import HomeContext from "../context/HomeContext";
import { useState } from "react";
import Pet from "../interfaces/Pet";

export default function Home() {
    const [ shouldShowMap, setShouldShowMap ] = useState<boolean>(false);
    const [ visiblePets, setVisiblePets ] = useState<Pet[]>([]);

    return (
        <HomeContext.Provider value={{
            shouldShowMap: shouldShowMap,
            setShouldShowMap: setShouldShowMap,
            visiblePets: visiblePets,
            setVisiblePets: setVisiblePets,
            }}>
            <PetForm />
            {shouldShowMap ? <GoogleMap /> : null}
            <p>{visiblePets.map((p: Pet) => <li key={p.id}>{p.id}, {p.name}, {p.species}: {p.location?.lat}, {p.location?.lng}</li>)}</p>
        </HomeContext.Provider>
    );
}