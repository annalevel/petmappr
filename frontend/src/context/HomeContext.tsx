import React from 'react';
import HomeContextProps from '../interfaces/HomeContextProps';

const HomeContext = React.createContext<HomeContextProps>({
    isLoading: false,
    setIsLoading: () => {},
    hasError: false,
    setHasError: () => {},
    errorMessage: "",
    setErrorMessage: () => {},
    shouldShowMap: false,
    setShouldShowMap: () => {},
    visiblePets: [],
    setVisiblePets: () => {},
    hasGoogleAPILoaded: false,
    setHasGoogleAPILoaded: () => {},
    map: null,
    petInfoPopup: null,
    setPetInfoPopup: () => {},
});
export default HomeContext;