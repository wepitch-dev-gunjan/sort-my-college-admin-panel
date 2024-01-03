import "./profile.scss";
import { useContext, useState } from "react";
import ProfilePic from "../../components/profilePic";
import BasicInfo from "../../components/basicInfo";
import { ProfileContext } from "../../context/ProfileContext";
import { backend_url } from "../../config";
import axios from "axios";
import { handleInput } from "../../utilities";

import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";

const Profile = () => {
  const { admin } = useContext(AdminContext);
  const { profile, setProfile } = useContext(ProfileContext);
  const [initialUserProfileBackup, setInitialUserProfileBackup] =
    useState(profile);
  const { editProfileEnable, setEditProfileEnable } =
    useContext(ProfileContext);


  // Function to handle saving changes
  const handleSave = async () => {
    try {
      const endpointUrl = `${backend_url}/admin/${admin._id}`; // Replace with your actual endpoint URL

      const response = await axios.put(endpointUrl, profile, {
        headers: {
          Authorization: admin.token
        }
      });
      setProfile(response.data);
      setInitialUserProfileBackup(response.data);
      setEditProfileEnable(false);
      toast('Profile successfully saved');
    } catch (error) {
      toast(error.message)
      console.error("Error while saving:", error);
    }
  };

  // Function to handle cancelling changes
  const handleCancel = () => {
    setProfile(initialUserProfileBackup);
    setEditProfileEnable(false);
  };

  return (
    <div className="Profile-container">
      <div className="profile-body">
        <div className="profile-pic">
          <ProfilePic src={profile.profile_pic} />
        </div>

        <div className="edit-profile">
          <div
            className="edit-profile-button"
            onClick={() => setEditProfileEnable(true)}
          >
            Edit profile
          </div>
        </div>
        <br />

        <div className="profile-info">
          <div className="top">
          {editProfileEnable ? (
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => handleInput("name", e.target.value, setProfile)}
                />
              ) : (
            <h1>{profile.name}</h1>
              )}
          </div>
          <div className="middle">
            <BasicInfo
              profile={profile}
              editProfileEnable={editProfileEnable}
              setProfile={setProfile}
            />
          </div>
          <div className="bottom">
            {editProfileEnable && (
              <div className="buttons">
                <div className="edit-profile-button" onClick={handleSave}>
                  Save
                </div>
                <div className="edit-profile-button" onClick={handleCancel}>
                  Cancel
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
