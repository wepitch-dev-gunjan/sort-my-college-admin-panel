import "./profile.scss";
import { useContext, useState } from "react";
import ProfilePic from "../../components/profilePic";
import BasicInfo from "../../components/basicInfo";
import { ProfileContext } from "../../context/ProfileContext";
import { backend_url } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";

const Profile = () => {
  const { user } = useContext(AdminContext);
  const { profile, setProfile } = useContext(ProfileContext);
  const [initialUserProfileBackup, setInitialUserProfileBackup] =
    useState(profile);
  const { editProfileEnable, setEditProfileEnable } =
    useContext(ProfileContext);


  // Function to handle saving changes
  const handleSave = async () => {
    try {
      const endpointUrl = `${backend_url}/counsellor/${user._id}`; // Replace with your actual endpoint URL

      const response = await axios.put(endpointUrl, profile, {
        headers: {
          Authorization: user.token
        }
      });
      setProfile(response.data);
      setInitialUserProfileBackup(response.data);
      setEditProfileEnable(false);
      toast('Profile successfully saved');
    } catch (error) {
      // Handle errors if the request fails
      toast(error.message)
      console.error("Error while saving:", error);
      // You might want to handle the error state here
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
            <h1>{profile.name}</h1>
            <h3>{profile.designation}</h3>
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
