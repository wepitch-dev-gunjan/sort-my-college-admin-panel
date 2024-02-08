import { createContext, useState } from "react";

export const BannerContext = createContext();

export const BannerProvider = ({ children }) => {
  const [banners, setBanners] = useState([])
  const [addBannerMode, setAddBannerMode] = useState(false)
  return <BannerContext.Provider value={{
    addBannerMode, setAddBannerMode,
    banners, setBanners
  }} >
    {children}
  </BannerContext.Provider>
}