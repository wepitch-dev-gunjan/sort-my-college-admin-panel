import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import { CiMenuKebab } from "react-icons/ci";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import "./style.scss";
import { MdDateRange } from "react-icons/md";
import { AdminContext } from "../../context/AdminContext";
import config from "@/config";
import useClickOutside from "../../customHooks/useClickOutside";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { Divider } from "@mui/material";
import { goodDateFormat } from "../../utilities";
import { useNavigate } from "react-router-dom";
const { backend_url } = config;

const WebinarItem = ({
  webinar_id,
  webinar_start_url,
  webinar_title,
  webinar_password,
  webinar_by,
  webinar_details,
  webinar_date,
  registered_participants,
  atteded_participants,
  webinar_available_slots,
  webinar_image,
}) => {
  const menuRef = useRef(null);
  const { admin } = useContext(AdminContext);
  const [showMenu, setShowMenu] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [webinarDetails, setWebinarDetails] = useState();

  const navigate = useNavigate();

  useClickOutside(menuRef, () => {
    setShowMenu(false);
  });

  const formatDate = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };

  const handleJoinNow = () => {
    if (webinar_start_url) {
      window.open(webinar_start_url, "_blank");
    }
  };

  const handleDelete = async () => {
    try {
      // Send an axios request to the server to delete the webinar
      const { data } = await axios.delete(
        `${backend_url}/admin/webinar/${webinar_id}`,
        {
          headers: {
            Authorization: admin.token,
          },
        }
      );
      toast(data.message);
    } catch (error) {
      toast(error.message);
      console.error("An error occurred:", error);
    }
  };

  function convertTo12HourFormat(timestamp) {
    // Convert timestamp string to Date object
    const dateObj = new Date(timestamp);

    // Get time portion in 12-hour format
    const timeWithoutDate = dateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return timeWithoutDate;
  }

  const formatTime = (time) => {
    return convertTo12HourFormat(time);
  };

  return (
    <div className="WebinarCard-container">
      <div className="webinar-container">
        <div className="webinar-top">
          <img src={webinar_image} alt="this is an image of webinar" />
        </div>
        <div className="webinar-mid">
          <h2>{webinar_title}</h2>
          <div className="row">
            <div className="col date">
              <MdDateRange />
            </div>
            <div className="col date">
              {goodDateFormat(formatDate(webinar_date))}
            </div>
          </div>
          <div className="row">
            <div className="col">{formatTime(webinar_date)}</div>
          </div>

          <div className="row">
            <div className="col">{webinar_available_slots}</div>
          </div>
        </div>

        <Divider />
        <div className="webinar-bottom">
          <div className="button" onClick={handleJoinNow}>
            Join Now
          </div>
          <div
            className="button"
            onClick={() => navigate(`/webinar/${webinar_id}`)}
          >
            View detials
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebinarItem;
