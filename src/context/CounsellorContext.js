import { createContext, useContext, useEffect, useState } from "react";
import { AdminContext } from "./AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
import config from "@/config";
import { useParams } from "react-router-dom";
const { backend_url } = config;

export const CounsellorContext = createContext();

export const CounsellorProvider = ({ children }) => {
  const [counsellors, setCounsellors] = useState([]);
  const [outstandingBalancePopUp, setOutstandingBalancePopUp] = useState(false);
  const [outStandingBalance, setOutStandingBalance] = useState();

  const extractCounsellorIdFromUrl = () => {
    const urlSegments = window.location.pathname.split("/");
    const counsellorIndex = urlSegments.length - 1;
    return counsellorIndex !== -1 ? urlSegments[counsellorIndex] : null;
  };

  const counsellor_id = extractCounsellorIdFromUrl();
  const getOutStandingBalance = async () => {
    try {
      console.log("call", counsellor_id);
      const { data } = await axios.get(
        `${backend_url}/admin/payments/${counsellor_id}/outstanding-balance`
      );
      setOutStandingBalance(data.outstandingBalance);
      console.log("sdfsdfsdfsdf", data);
    } catch (error) {
      console.log(error);
      toast("Error getting outStandingBalance");
    }
  };
  useEffect(() => {
    getOutStandingBalance();
  }, [outstandingBalancePopUp, counsellor_id]);

  return (
    <CounsellorContext.Provider
      value={{
        counsellors,
        setCounsellors,
        outstandingBalancePopUp,
        setOutstandingBalancePopUp,
        outStandingBalance,
        setOutStandingBalance,
        counsellor_id,
      }}
    >
      {children}
    </CounsellorContext.Provider>
  );
};
