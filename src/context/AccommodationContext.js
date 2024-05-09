import { createContext, useState } from "react";

export const AccommodationContext = createContext();

export const AccommodationProvider = ({ children }) => {
  const [addAccommodationEnable, setAddAccommodationEnable] = useState(false);
  const [showPropertyGallery, setShowPropertyGallery] = useState(false);

  return (
    <AccommodationContext.Provider
      value={{
        addAccommodationEnable,
        setAddAccommodationEnable,
        showPropertyGallery, 
        setShowPropertyGallery
      }}
    >
      {children}
    </AccommodationContext.Provider>
  );
};
