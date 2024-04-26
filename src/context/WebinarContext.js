import { createContext, useState } from "react";

export const WebinarContext = createContext();

export const WebinarProvider = ({ children }) => {
  const [addMode, setAddMode] = useState(false);
  const [webinarLoading, setWebinarLoading] = useState(false);
  const [webinar, setWebinar] = useState(false);
  return (
    <WebinarContext.Provider
      value={{
        addMode,
        setAddMode,
        webinarLoading,
        setWebinarLoading,
        webinar,
        setWebinar,
      }}
    >
      {children}
    </WebinarContext.Provider>
  );
};
