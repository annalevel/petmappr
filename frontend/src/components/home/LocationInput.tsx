import { useRef, useEffect, useContext, useState } from "react";
import HomeContext from "../../context/HomeContext";

export default function LocationInput({ onLocationChange }: { onLocationChange: React.Dispatch<React.SetStateAction<google.maps.places.PlaceResult | undefined>> }) {
    const context = useContext(HomeContext);
    const [ curInputValue, setCurInputValue ] = useState<string>("");
    const autoCompleteRef = useRef<google.maps.places.Autocomplete>();
    const inputRef = useRef<HTMLInputElement>();
    const options = {
        componentRestrictions: {
            country: ["us", "ca"]
        },
        fields: ["formatted_address", "geometry"],
        types: ["street_address", "postal_code", "neighborhood", "locality"]
    };

    useEffect(() => {
        if (context.hasGoogleAPILoaded) {
            autoCompleteRef.current = new window.google.maps.places.Autocomplete(
                inputRef.current!,
                options
            );
            autoCompleteRef.current.addListener("place_changed", () => {
                const place = autoCompleteRef.current!.getPlace();
                onLocationChange(place);
                setCurInputValue(place?.formatted_address ?? "");
            });
        }
    }, [context.hasGoogleAPILoaded]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setCurInputValue(newValue);
        onLocationChange(undefined);
    };
    
    return (
        <>

            <input type="text" name="location" id="location" value={curInputValue} onChange={handleChange} ref={inputRef as React.RefObject<HTMLInputElement>} />
        </>
    );
}