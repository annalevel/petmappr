import React from 'react';
import HomeContextProps from '../interfaces/HomeContextProps';

const HomeContext = React.createContext<HomeContextProps>({
    shouldShowMap: false,
    setShouldShowMap: () => {},
    visiblePets: [],
    setVisiblePets: () => {},
});
export default HomeContext;