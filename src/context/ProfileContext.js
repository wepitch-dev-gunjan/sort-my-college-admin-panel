import { createContext, useContext, useEffect, useState } from "react";
import { AdminContext } from "./AdminContext";
import axios from "axios";
import config from "@/config";
const { backend_url } = config;

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { admin } = useContext(AdminContext);
  const [profile, setProfile] = useState({});

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `${backend_url}/admin`,
        //  null,
        {
          headers: {
            Authorization: admin.token,
          },
        }
      );
      setProfile(response.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  useEffect(() => {
    if (admin && admin.isLoggedIn) fetchProfile();
  }, [admin]);

  const [editProfileEnable, setEditProfileEnable] = useState(false);
  const [editCounsellorProfileEnable, setEditCounsellorProfileEnable] =
    useState(false);
    const [editInstituteProfileEnable, setEditInstituteProfileEnable] =
    useState(false);
  const [profilePicEditMode, setProfilePicEditMode] = useState(false);
  const [coverImageEditMode, setCoverImageEditMode] = useState(false);
  const [epProfilePicEditMode, setEpProfilePicEditMode] = useState(false);
  const [epCoverPhotoEditMode, setEpCoverPhotoEditMode] = useState(false);
   const [counsellorProfilePicEditMode,setCounsellorProfilePicEditMode] = useState(false);
  return (
    <ProfileContext.Provider
      value={{
        profilePicEditMode,
        profile,
        setProfile,
        coverImageEditMode,
        setCoverImageEditMode,
        setProfilePicEditMode,
        setEditProfileEnable,
        editProfileEnable,
        fetchProfile,
        editCounsellorProfileEnable,
        setEditCounsellorProfileEnable,
        editInstituteProfileEnable,
        setEditInstituteProfileEnable,
        epProfilePicEditMode, 
        setEpProfilePicEditMode,
        counsellorProfilePicEditMode,
        setCounsellorProfilePicEditMode,
        epCoverPhotoEditMode,
        setEpCoverPhotoEditMode
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
