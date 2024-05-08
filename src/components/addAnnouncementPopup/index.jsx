import "./style.scss";
import axios from "axios";
import config from "@/config";
import { useState, useEffect, useContext } from "react";
import { ProfileContext } from "../../context/ProfileContext";
import { CounsellorContext } from "../../context/CounsellorContext";

const { backend_url } = config;

const AddAnnouncementPopup = () => {
  const [newAnnouncementText, setNewAnnouncementText] = useState("");
  const { addAnnouncementPopup, setAddAnnouncementPopup } =
    useContext(ProfileContext);
  // const { announcements, setAnnouncements } = useContext(ProfileContext);
  const { outstandingBalancePopUp, setOutstandingBalancePopUp } =
    useContext(CounsellorContext);

  const handleAddAnnouncement = async () => {
    try {
      const response = await axios.post(
        `${backend_url}/ep/announcements`,
        {
          update: newAnnouncementText,
        },
        {
          headers: {
            // Authorization: user.token,
          },
        }
      );

      setAddAnnouncementPopup(false);
      setNewAnnouncementText(""); // Clear the input
    } catch (error) {
      console.error("Error adding announcement:", error);
    }
  };

  return (
    <div className="pop-parent">
      <div className="popup">
        <h2>Are You U want to clear the outStanding Balance amount</h2>

        <div className="actions">
          <button
            className="cancel"
            onClick={() => setOutstandingBalancePopUp(false)}
          >
            No
          </button>
          <button className="add" onClick={handleAddAnnouncement}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAnnouncementPopup;
