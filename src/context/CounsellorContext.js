import { createContext, useContext, useEffect, useState } from "react";
import { AdminContext } from "./AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
import { backend_url } from "../config";

export const CounsellorContext = createContext();

export const CounsellorProvider = ({ children }) => {
  const [counsellors, setCounsellors] = useState([]);
  const [outstandingBalancePopUp, setOutstandingBalancePopUp] = useState(false);

  return (
    <CounsellorContext.Provider
      value={{
        counsellors,
        setCounsellors,
        outstandingBalancePopUp,
        setOutstandingBalancePopUp,
      }}
    >
      {children}
    </CounsellorContext.Provider>
  );
};
