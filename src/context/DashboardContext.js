import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import config from "@/config";
import { AdminContext } from "./AdminContext";
const { backend_url } = config;

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const { admin } = useContext(AdminContext);
  const [dashboardData, setDashboardData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        if (admin && admin.token) {
          const { data } = await axios.get(
            `${backend_url}/admin/dashboard/dashboard-data`,
            {
              headers: {
                Authorization: admin.token,
              },
            }
          );
          console.log(data);
          setDashboardData(data);
        } else {
          setDashboardData({
            totalUser: 0,
            totalCounsellor: 0,
          }); // Set followers count to 0 if admin or token is not available
        }
        setLoading(false); // Update loading state
        setError(null); // Reset error state on successful response
      } catch (error) {
        setError(error.message); // Set error state with the error message
        setLoading(false); // Update loading state
        setDashboardData({
          totalUser: 0,
          totalCounsellor: 0,
        });
      }
    };

    getDashboardData();
  }, [admin]); // Run the effect whenever the admin changes

  return (
    <DashboardContext.Provider
      value={{
        dashboardData,
        setDashboardData,
        error,
        loading,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
