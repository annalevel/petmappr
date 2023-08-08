import React from 'react';
import HomeContextProps from '../interfaces/HomeContextProps';

const HomeContext = React.createContext<HomeContextProps>({
    hasError: false,
    setHasError: () => {},
    errorMessage: "",
    setErrorMessage: () => {},
    shouldShowMap: false,
    setShouldShowMap: () => {},
    visiblePets: [],
    setVisiblePets: () => {},
});
export default HomeContext;