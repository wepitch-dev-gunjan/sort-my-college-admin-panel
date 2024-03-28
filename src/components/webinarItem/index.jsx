import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
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
  const [remainingTime, setRemainingTime] = useState("");
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

  const getRemainingTime = () => {
    // Parse the webinar date string to a Date object
    const webinarDateTime = new Date(webinar_date);

    webinarDateTime.setHours(webinarDateTime.getHours() - 5); // Adjust for UTC+5 hours
    webinarDateTime.setMinutes(webinarDateTime.getMinutes() - 30); // Adjust for UTC+30 minutes

    // Create a new Date object for the current time in the Indian timezone
    const currentDate = new Date();
    // Calculate the time difference in milliseconds
    const timeDifference = webinarDateTime.getTime() - currentDate.getTime();

    if (timeDifference > 0) {
      // Convert the time difference to hours, minutes, and seconds
      let remainingHours = Math.floor(timeDifference / (1000 * 60 * 60));
      let remainingMinutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      let remainingSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      // Format the remaining time as a string
      const formattedTime = `${remainingHours
        .toString()
        .padStart(2, "0")}:${remainingMinutes
        .toString()
        .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;

      // Set the remaining time
      setRemainingTime(formattedTime);
    } else {
      setRemainingTime("Time Exceeded");
    }
  };

  useEffect(() => {
    const timerId = setInterval(getRemainingTime, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

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

  function convertTimestampTo12HourFormat(timestamp) {
    function convert24To12(time24) {
      let [hours, minutes] = time24.split(":");
      hours = parseInt(hours, 10);
      let meridiem = "AM";
      if (hours >= 12) {
        meridiem = "PM";
        if (hours > 12) {
          hours -= 12;
        }
      }
      if (hours === 0) {
        hours = 12;
      }
      return `${hours}:${minutes} ${meridiem}`;
    }

    const date = new Date(timestamp);
    const hours24 = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const time24 = `${hours24}:${minutes}`;
    return convert24To12(time24);
  }

  const formatTime = (time) => {
    return convertTimestampTo12HourFormat(time);
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

          <div className="remaining-time">{remainingTime}</div>
        </div>

        <Divider />
        <div className="webinar-bottom">
          <div className="button" onClick={handleJoinNow}>
            Join Now
          </div>
          <div
            className="button"
            onClick={() => navigate(`/webinar/${webinar_id}/`)}
          >
            View Details
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebinarItem;
