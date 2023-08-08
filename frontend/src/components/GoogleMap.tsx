import { createRef, useCallback, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import HomeContext from "../context/HomeContext";
import PetInfoWindowContent from "./PetInfoWindowContent";
import Pet from "../interfaces/Pet";

export default function GoogleMap() {
    const context = useContext(HomeContext);
    const mapRef = createRef<HTMLElement>();

    return (
        <>
            <div
                id="google-map"
                ref={mapRef as React.RefObject<HTMLDivElement>}
                style={{ display: context.shouldShowMap && !context.hasError ? "block" : "none" }}
                />
        </>
    );
};