import "./style.scss";
import axios from "axios";
import config from "@/config";
import { useState, useEffect, useContext } from "react";
import { ProfileContext } from "../../context/ProfileContext";
import { CounsellorContext } from "../../context/CounsellorContext";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const { backend_url } = config;

const AddAnnouncementPopup = () => {
  const [newAnnouncementText, setNewAnnouncementText] = useState("");
  const { addAnnouncementPopup, setAddAnnouncementPopup } =
    useContext(ProfileContext);
  // const { announcements, setAnnouncements } = useContext(ProfileContext);
  const { outstandingBalancePopUp, setOutstandingBalancePopUp } =
    useContext(CounsellorContext);
  const { admin } = useContext(AdminContext);

  const extractCounsellorIdFromUrl = () => {
    const urlSegments = window.location.pathname.split("/");
    console.log(urlSegments);
    const counsellorIndex = urlSegments.length - 1;
    console.log(counsellorIndex);

    return counsellorIndex !== -1 ? urlSegments[counsellorIndex] : null;
  };

  const counsellor_id = extractCounsellorIdFromUrl();
  console.log(counsellor_id); // Ensure this logs the correct ID
  const { setOutStandingBalance } = useContext(CounsellorContext);

  const handleClearOutstandingBalance = async () => {
    try {
      console.log(counsellor_id, "dfsdsdf");
      setOutstandingBalancePopUp((prev) => !prev);
      const { data } = await axios.put(
        `${backend_url}/counsellor/${counsellor_id}/clear-outstanding-balance`,
        null,
        {
          headers: {
            Authorization: admin.token,
          },
        }
      );
      console.log(data);
      setOutStandingBalance(0);
    } catch (error) {
      console.log(error);
      toast.success(error.message);
    }
  };

  return (
    <div className="pop-parent">
      <div className="popup">
        <h2>Are You want to clear the outStanding Balance amount </h2>

        <div className="actions">
          <button
            className="cancel"
            onClick={() => setOutstandingBalancePopUp(false)}
          >
            No
          </button>
          <button className="add" onClick={handleClearOutstandingBalance}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAnnouncementPopup;
