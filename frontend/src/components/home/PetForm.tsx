import { useContext, useRef, useState } from "react";
import HomeContext from "../../context/HomeContext";
import axios from "axios";
import Pet from "../../interfaces/Pet";
import LocationInput from "./LocationInput";

export default function PetForm() {
    const context = useContext(HomeContext);
    interface formDataType {[key:string]: FormDataEntryValue}
    const responseBody: formDataType = {};
    const [ curLocation, setCurLocation] = useState<google.maps.places.PlaceResult | undefined>();

    const handleSubmit = () => {
        context.setStatus("loading");

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
                        context.setStatus("displaying");
                    })
                    .catch();
            })
            .catch(error => {
                context.setErrorMessage(error.message);
                context.setStatus("error");
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
        <section id="pet-form-wrapper">
            <form className="pet-form"
                onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget as HTMLFormElement);

                    formData.forEach((value, property:string) => {
                        if (property === "location") {
                            if (typeof curLocation !== "undefined") {
                                responseBody[property] = `${curLocation?.geometry?.location?.lat()},${curLocation?.geometry?.location?.lng()}`;
                            }
                        } else {
                            responseBody[property] = value;
                        }
                    });
                    
                    handleSubmit();
                }}
            >
                <fieldset>
                    <label htmlFor="species">Species</label>
                    <select name="species" id="species">
                        <option value="any">Any</option>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="gender">Gender</label>
                    <select name="gender" id="gender">
                        <option value="any">Any</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="location">Location</label>
                    <LocationInput onLocationChange={setCurLocation} />
                </fieldset>
                <input type="submit" id="pet-form-submit-button" value="Go!" />
            </form>
        </section>
    );
}