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
import { useParams } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
const { backend_url } = config;


const WebinarProfile = () => {
  const menuRef = useRef(null)
  const { admin } = useContext(AdminContext);
  const { editCounsellorProfileEnable, setEditCounsellorProfileEnable } =
    useContext(ProfileContext);
  const { webinar_id } = useParams();
  const [showMenu, setShowMenu] = useState(false);

  useClickOutside(menuRef, () => {
    setShowMenu(false);
  });

  const getWebinar = async () => {
    try {
      const { data } = await axios.get(
        `${backend_url}/webinar/${webinar_id}`,
        // null,
        {
          headers: {
            Authorization: admin.token,
          },
        }
      );
      setProfile(data);
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  };

  const [profile, setProfile] = useState({
    title: "abc",
    details: "demo@gmail.com",
    what_will_you_learn: "male",
    date: "12 may",
    time: "5:00am",
    speaker_profile: "mnm",
    webinar_by: "nmn",
    slots: "50"
  });

  const [showReasonDialog, setShowReasonDialog] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");
  const reasonDialogRef = useRef(null);

  const handleDateChange = (date) => {
    setProfile((prev) => ({
      ...prev,
      date_of_birth: formatDate(date),
    }));
  };

  useClickOutside(reasonDialogRef, () => {
    setShowReasonDialog(false);
  });

  const handleLocationCheckboxChange = (fieldName, value) => {
    const updatedLocations = profile.locations_focused.includes(value)
      ? profile.locations_focused.filter((location) => location !== value)
      : [...profile.locations_focused, value];
    handleInput(fieldName, updatedLocations, setProfile);
  };

  const handleCheckboxChange = (fieldName, value) => {
    const updatedDegrees = profile.degree_focused.includes(value)
      ? profile.degree_focused.filter((degree) => degree !== value)
      : [...profile.degree_focused, value];
    handleInput(fieldName, updatedDegrees, setProfile);
  };

  const handleRadioChange = (e) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      nationality: e.target.value,
    }));
  };

  const formatDate = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };


  const handleCancelClick = () => {
    setEditCounsellorProfileEnable(false);
  };


  const handleSaveClick = async () => {
    try {
      const { data } = await axios.put(
        `${backend_url}/webinar/${webinar_id}`,
        {
          ...profile,
        },
        {
          headers: {
            Authorization: admin.token,
          },
        }
      );
      setEditCounsellorProfileEnable(false);
      toast("Webinar successfully updated.");
    } catch (error) {
      console.log("Error updating webinar : " + error);
      toast(error.message);
    }
  };

  useEffect(() => {
    getWebinar();
  }, [admin]);

  return (
    <div className="WebinarProfile-container">
      <div className="webinar-profile">
        <div className="hamburger" onClick={() => setShowMenu(true)}>
        <BsThreeDotsVertical color="white"/>
        </div>

        {<div ref={menuRef} className={`${showMenu && 'display-active'} drop-down-menu`}>
        <div 
        // onClick={() => setEditMode(true)} 
        className="menu-item">
          <AiOutlineEdit />
          <span>Edit</span>
        </div>
        <div 
        // onClick={handleDelete}
         className="menu-item">
          <AiOutlineDelete />
          <span>Delete</span>
        </div>
      </div>}
      
        <div className="info-img">
          <div className="profile-pic">
            <img src="https://assets-global.website-files.com/5fac161927bf86485ba43fd0/64705e02614808a894d7dd3a_Blog-Cover-2022_03_Webinar-Glossary-(1).jpeg" alt="" />
          </div>
        </div>
        <div className="webinar-details">
          <div className="detail">
          <label htmlFor="">
          Webinar Title  
          </label>
          <input type="text" value={profile.title}/>
          </div>
          <div className="detail">
          <label htmlFor="">
          Webinar Details 
          </label>
          <input type="text"
          value={profile.details}
          />
          </div>
          <div className="detail">
          <label htmlFor="">
          What will you learn  
          </label>
          <input type="text" 
          value={profile.what_will_you_learn}
          />
          </div>
          <div className="detail">
          <label htmlFor="">
          Webinar Date  
          </label>
          <input type="text" 
          value={profile.date}
          />
          </div>
          <div className="detail">
          <label htmlFor="">
          Webinar Time  
          </label>
          <input type="text" 
          value={profile.time}
          />
          </div>
          <div className="detail">
          <label htmlFor="">
          Speaker Profile  
          </label>
          <input type="text" 
          value={profile.speaker_profile}
          />
          </div>
          <div className="detail">
          <label htmlFor="">
          Webinar By  
          </label>
          <input type="text" 
          value={profile.webinar_by}
          />
          </div>
          <div className="detail">
          <label htmlFor="">
          Total Slots  
          </label>
          <input type="text" value={profile.slots}/>
          </div>
          
        </div>
    </div>
    </div>
  );
};

export default WebinarProfile;
