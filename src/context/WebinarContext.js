import { createContext, useState } from "react";

export const WebinarContext = createContext();

export const WebinarProvider = ({ children }) => {
  const [addMode, setAddMode] = useState(false);
  const [webinarLoading, setWebinarLoading] = useState(false);
  const [webinars, setWebinars] = useState([]);
  return (
    <WebinarContext.Provider
      value={{
        addMode,
        setAddMode,
        webinarLoading,
        setWebinarLoading,
        webinars,
        setWebinars,
      }}
    >
      {children}
    </WebinarContext.Provider>
  );
};
