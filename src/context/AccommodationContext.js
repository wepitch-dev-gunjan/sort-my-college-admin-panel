import { createContext, useState } from "react";

export const AccommodationContext = createContext();

export const AccommodationProvider = ({ children }) => {
    const [addAccommodationEnable, setAddAccommodationEnable] = useState(false);

    return(
        <AccommodationContext.Provider
        value={{
            addAccommodationEnable,
            setAddAccommodationEnable,
        }}
        >
            {children}
        </AccommodationContext.Provider>
    )
}