import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { backend_url } from "../config";
import { AdminContext } from "./AdminContext";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  // const { admin } = useContext(AdminContext);
  const [followersCount, setFollowersCount] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const getFollowersCount = async () => {
  //     try {
  //       if (admin && admin.token) {
  //         const response = await axios.get(
  //           `${backend_url}/counsellor/follower/followers-count`,
  //           {
  //             headers: {
  //               Authorization: admin.token
  //             }
  //           }
  //         );
  //         setFollowersCount(response.data.totalFollowers);
  //       } else {
  //         setFollowersCount(0); // Set followers count to 0 if admin or token is not available
  //       }
  //       setLoading(false); // Update loading state
  //       setError(null); // Reset error state on successful response
  //     } catch (error) {
  //       setError(error.message); // Set error state with the error message
  //       setLoading(false); // Update loading state
  //       setFollowersCount(0); // Reset followers count on error
  //     }
  //   };

  //   getFollowersCount();
  // }, [admin]); // Run the effect whenever the admin changes

  return (
    <DashboardContext.Provider
      value={{
        // followersCount,
        // setFollowersCount,
        error,
        loading
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
