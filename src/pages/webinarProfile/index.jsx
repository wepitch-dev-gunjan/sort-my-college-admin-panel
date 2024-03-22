import React, { useContext, useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { handleInput } from "../../utilities";
import TagsInput from "react-tagsinput";
import { FaIndianRupeeSign } from "react-icons/fa6";
import ProfilePic from "../../components/profilePic";
import CounsellorProfileDropdown from "../../components/counsellorProfileDropdown";
import useClickOutside from "../../customHooks/useClickOutside";
import { ProfileContext } from "../../context/ProfileContext";
import { toast } from "react-toastify";
import axios from "axios";
import config from "@/config";
import { AdminContext } from "../../context/AdminContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { CiClock2 } from "react-icons/ci";

// import webinar_img from "../../assets/webinar-img.jpg";
const { backend_url } = config;

const WebinarProfile = () => {
  const menuRef = useRef(null);
  const { admin } = useContext(AdminContext);
  const [webinar, setWebinar] = useState({});
  const { editCounsellorProfileEnable, setEditCounsellorProfileEnable } =
    useContext(ProfileContext);
  const { webinar_id } = useParams();
  const [showMenu, setShowMenu] = useState(false);
  const [editWebinarEnable, setEditWebinarEnable] = useState(false);
  const navigate = useNavigate()

  useClickOutside(menuRef, () => {
    setShowMenu(false);
  });

  const getWebinar = async () => {
    try {
      const { data } = await axios.get(
        `${backend_url}/admin/webinar/${webinar_id}`,
        // null,
        {
          headers: {
            Authorization: admin.token,
          },
        }
      );
      setWebinar(data);
      console.log("Dataaaa", data);
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  };

  const [showReasonDialog, setShowReasonDialog] = useState(false);
  const reasonDialogRef = useRef(null);

  const handleDateChange = (date) => {
    setWebinar((prev) => ({
      ...prev,
      date_of_birth: formatDate(date),
    }));
  };

  useClickOutside(reasonDialogRef, () => {
    setShowReasonDialog(false);
  });

  useEffect(() => {
    getWebinar();
  }, [admin]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return { date: formattedDate, time: formattedTime };
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
    console.log(time24);
    return convert24To12(time24);
  }

  const formatTime = (time) => {
    return convertTimestampTo12HourFormat(time);
  };

  const handleDeleteWebinar = async () => {
    try {
      console.log(webinar_id, admin.token)
      await axios.delete(
        `${backend_url}/admin/webinar/${webinar_id}`,
        {
          headers: {
            Authorization: admin.token,
          },
          data: {
            cloudinary_image_id: webinar.webinar_image
          }
        }
      );
      toast.success("Webinar deleted successfully");
        // Redirect or update UI as needed
        navigate('/webinar')
    } catch (error) {
      console.error("Error deleting webinar:", error);
      toast.error("Failed to delete webinar");
    }
};

  return (
    <div className="webinar-profile-parent">
      <div className="webinar-profile-child">
        <div className="webinar-profile-image">
          <img src={webinar.webinar_image} alt="" />
        </div>
        <div className="webinar-profile-dets">
          <div className="wp-dets-first">
            <h3>{webinar.webinar_title}</h3>
            <p>60 min</p>
          </div>
          <p className="textarea-b">
            Webinar by <span>{webinar.webinar_by}</span>{" "}
          </p>
          <div className="wp-dets-time">
            <div className="wp-dets-time-1">
              <CiClock2 />
            </div>
            <div className="wp-dets-time-2">
              <p>{formatTime(webinar.webinar_date)}</p>
              <p>{formatDate(webinar.webinar_date).date}</p>
            </div>
          </div>
          <div className="wp-dets-details">
            <h3>Details</h3>
            <p>{webinar.webinar_details}</p>
          </div>
          <div className="wp-dets-learn">
            <h3>What will you Learn?</h3>
            <div className="wp-dets-learn-blocks">
              <div className="wpdl-blocks-child">
                <p>
                  <span>1.</span>
                </p>
                <p>Uncover the mysteries</p>
              </div>
              <div className="wpdl-blocks-child">
                <p>
                  <span>2.</span>
                </p>
                <p>Hands-on experience</p>
              </div>
              <div className="wpdl-blocks-child">
                <p>
                  <span>3.</span>
                </p>
                <p>AI is being applied</p>
              </div>
            </div>
          </div>

          <div className="wp-dets-speaker">
            <h3>Speaker Profile</h3>
            <p>{webinar.speaker_webinar}</p>
          </div>

          <div className="wp-dets-btn">
            <a href={webinar.webinar_start_url}>Start</a>
          </div>
        </div>
      </div>

      <div className="wp-dets-edit-now">
        <button onClick={handleDeleteWebinar}>Delete Webinar</button>
      </div>
    </div>
  );
};

export default WebinarProfile;
