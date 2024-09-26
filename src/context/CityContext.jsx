import {createContext, useState} from "react";

export const CityContext = createContext(null)

export const CityProvider = (props) => {
    const [city, setCity] = useState('Patna')
    return (
        <CityContext.Provider value={{city, setCity,}}>
            {props.children}
        </CityContext.Provider>
    )
}