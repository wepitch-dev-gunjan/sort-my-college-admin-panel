import { createContext, useContext, useEffect, useState } from "react";
import { AdminContext } from "./AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
import { backend_url } from "../config";

export const CounsellorContext = createContext();

export const CounsellorProvider = ({ children }) => {
  const [counsellors, setCounsellors] = useState([])

  return (
    <CounsellorContext.Provider value={{
      counsellors, setCounsellors
    }} >
      {children}
    </CounsellorContext.Provider>
  )
}