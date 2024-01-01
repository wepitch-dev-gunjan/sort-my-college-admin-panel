import React, { useContext } from "react";
import "./style.scss";
import { FaCamera } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { Typography } from "@mui/material";
import { ProfileContext } from "../../context/ProfileContext";

const ProfilePic = ({ src }) => {
  const { setProfilePicEditMode } =
    useContext(ProfileContext);

  const openUploader = () => {
    setProfilePicEditMode((prev) => !prev);
  };

  return (
    <>
      <div className="ProfilePic-container">
        <img src={src} alt="Profile" />
        <Tooltip
          title={
            <Typography style={{ fontSize: "16px" }}>
              Change profile picture
            </Typography>
          }
          placement="right"
          arrow
          PopperProps={{
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, 10],
                },
              },
            ],
          }}
        >
          <div className="pic-upload-container">
            <FaCamera
              size="25"
              className="camera-icon"
              onClick={openUploader}
            />
          </div>
        </Tooltip>
      </div>
    </>
  );
};

export default ProfilePic;
