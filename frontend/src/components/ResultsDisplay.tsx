import { useContext } from "react"
import HomeContext from "../context/HomeContext"
import Pet from "../interfaces/Pet";
import "./ResultsDisplay.css";

export default function ResultsDisplay() {
    const context = useContext(HomeContext);
    
    if (context.hasError) {
        return (
            <section className="error">
                Error: {context.errorMessage}
            </section>
        );
    }
    
    if (context.isLoading) {
        return (
            <section className="loading">
                <span className="loader"></span>
            </section>
        );
    }

    if (context.shouldShowMap) {
        return (
            <section className="results">
                <ul>
                    {context.visiblePets.map(
                        (p: Pet) => 
                        <li key={p.id}>{p.id}, {p.name}, {p.species}: {p.location?.lat}, {p.location?.lng}</li>
                    )}
                </ul>
            </section>
        );
    }

    return (
        <span className="material-symbols-outlined large-icon">
            pets
        </span>
    );
}