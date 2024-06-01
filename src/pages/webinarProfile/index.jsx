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
import CheckboxLabels from "../../components/checkBox";

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
  const [checkboxValues, setCheckboxValues] = useState([]);
  const navigate = useNavigate();
  const handleCheckboxChange = (newValue) => {
    setCheckboxValues(newValue);
  };

  useClickOutside(menuRef, () => {
    setShowMenu(false);
  });

  const getWebinar = async () => {
    try {
      const { data } = await axios.get(
        `${backend_url}/admin/webinar/webinar-for-admin/${webinar_id}`,
        {
          headers: {
            Authorization: admin.token,
          },
        }
      );
      setWebinar(data);
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
    return convert24To12(time24);
  }

  const formatTime = (time) => {
    return convertTimestampTo12HourFormat(time);
  };

  const handleDeleteWebinar = async () => {
    try {
      await axios.delete(`${backend_url}/admin/webinar/${webinar_id}`, {
        headers: {
          Authorization: admin.token,
        },
        data: {
          cloudinary_image_id: webinar.webinar_image,
        },
      });
      toast.success("Webinar deleted successfully");
      navigate("/webinar");
    } catch (error) {
      console.error("Error deleting webinar:", error);
      toast.error("Failed to delete webinar");
    }
  };
  const checkBoxData = [
    { id: 1, name: "Registered" },
    { id: 2, name: "Joined" },
    { id: 3, name: "Not Joined" },
  ];

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
              {webinar &&
                webinar.what_will_you_learn &&
                Object.keys(webinar.what_will_you_learn).map((data, i) => (
                  <div className="wpdl-blocks-child" key={i}>
                    <p>
                      <span>{i + 1}</span>
                    </p>
                    <p>{webinar.what_will_you_learn[data]}</p>
                  </div>
                ))}
            </div>
          </div>

          <div className="wp-dets-speaker">
            <h3>Speaker Profile</h3>
            <p>{webinar.speaker_profile}</p>
          </div>

          <div className="wp-dets-btn">
            <a href={webinar.webinar_start_url}>Start</a>
          </div>
        </div>
      </div>
      <div className="registrant">
        <div className="registrant-filters">
          <div className="search-bar">
            <input type="text" id="searchInput" placeholder="Search..." />
          </div>
          <div className="registrant-filters">
            <CheckboxLabels
              options={checkBoxData}
              onChange={handleCheckboxChange}
            />
          </div>
        </div>
        <div className="registrant-details">
          {webinar.registered_participants &&
          webinar.registered_participants.length > 0 ? (
            webinar.registered_participants.map((user, i) => (
              <div className="user-card" key={i}>
                <div className="user-image">
                  <img src={user.profile_pic} alt="" />
                </div>
                <div className="user-data">
                  <p>{user.name}</p>
                  <Link to={`/user/user-details/${user._id}`}>
                    Visit Profile
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No participants registered yet.</p>
          )}
        </div>
      </div>

      <div className="wp-dets-edit-now">
        <button onClick={handleDeleteWebinar}>Delete Webinar</button>
      </div>
    </div>
  );
};

export default WebinarProfile;
