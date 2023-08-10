import React from 'react';
import HomeContextProps from '../interfaces/HomeContextProps';

const HomeContext = React.createContext<HomeContextProps>({
    status: 'initial',
    setStatus: () => {},
    errorMessage: "",
    setErrorMessage: () => {},
    visiblePets: [],
    setVisiblePets: () => {},
    hasGoogleAPILoaded: false,
    setHasGoogleAPILoaded: () => {},
    map: null,
    petInfoPopup: null,
    setPetInfoPopup: () => {},
});
export default HomeContext;