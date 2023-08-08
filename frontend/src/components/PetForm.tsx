import { useContext, useRef, useState } from "react";
import HomeContext from "../context/HomeContext";
import axios from "axios";
import Pet from "../interfaces/Pet";
import LocationInput from "./LocationInput";

export default function PetForm() {
    const context = useContext(HomeContext);
    interface formDataType {[key:string]: FormDataEntryValue}
    const responseBody: formDataType = {};
    const [ curLocation, setCurLocation] = useState<google.maps.places.PlaceResult | undefined>();

    const handleSubmit = () => {
        context.setIsLoading(true);
        context.setHasError(false);
        context.setErrorMessage("");

        axios.get(`${process.env.REACT_APP_API_BASE_URL}/pets`, {
            params: responseBody
        })
            .then(res => {
                const pets: Pet[] = res.data?.animals.map(async (a: any) => {
                    const address1 = a?.contact?.address?.address1;
                    const city = a?.contact?.address?.city;
                    const state = a?.contact?.address?.state;
                    const postcode = a?.contact?.address?.postcode;
                    const country = a?.contact?.address?.country;
                    const address: string = [address1, city, state, postcode, country].filter(v => v !== null).join(" ");

                    const location = await convertAddress(address);
                    a.location = location ?? {};

                    return a;
                });
                Promise.all(pets)
                    .then(function(completePetPromises) {
                        context.setVisiblePets(completePetPromises);
                        context.setShouldShowMap(true);
                        context.setIsLoading(false);
                    })
                    .catch();
            })
            .catch(error => {
                context.setErrorMessage(error.message);
                context.setHasError(true);
                context.setIsLoading(false);
            });
    }

    const convertAddress = async (address: string) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_GEOCODING_API_BASE_URL}/json`, {
                params: {
                    address: address,
                    key: process.env.REACT_APP_GEOCODING_API_KEY,
                }
            });
            return res.data?.results?.[0]?.geometry?.location;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <form className="pet-form"
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget as HTMLFormElement);
                if (typeof curLocation !== "undefined") {
                    formData.append("location", `${curLocation?.geometry?.location?.lat()},${curLocation?.geometry?.location?.lng()}`);
                }

                formData.forEach((value, property:string) => responseBody[property] = value);
                handleSubmit();
            }}
        >
            <label htmlFor="species">Species</label>
            <select name="species" id="species">
                <option value="any">Any</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
            </select>
            <select name="gender" id="gender">
                <option value="any">Any</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <LocationInput onLocationChange={setCurLocation} />
            <input type="submit" value="Go!" />
        </form>
        </>
    );
}