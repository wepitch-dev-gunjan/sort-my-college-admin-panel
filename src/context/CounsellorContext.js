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
  const [outStandingBalance, setOutStandingBalance] = useState("");
  const { counsellor_id } = useParams();

  const getOutStandingBalance = async () => {
    try {
      console.log(counsellor_id, "asdasdasdasd");
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
