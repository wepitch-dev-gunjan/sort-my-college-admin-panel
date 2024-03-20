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
import { CiClock2 } from "react-icons/ci";
import webinar_img from "../../assets/webinar-img.jpg";
const { backend_url } = config;

const WebinarProfile = () => {
  const menuRef = useRef(null)
  const { admin } = useContext(AdminContext);
  const { editCounsellorProfileEnable, setEditCounsellorProfileEnable } =
    useContext(ProfileContext);
  const { webinar_id } = useParams();
  const [showMenu, setShowMenu] = useState(false);
  const [editWebinarEnable, setEditWebinarEnable] = useState(false);

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
    webinar_title: "Unlocking the Secrets of AI: A Journey into Machine Learning",
    webinar_details: "Join us for an insightful exploration into the fascinating world of artificial intelligence and machine learning. In this webinar, we will delve into the fundamental concepts and advanced techniques that drive the development of AI technologies. From understanding machine learning algorithms to exploring deep learning frameworks, participants will gain invaluable knowledge about the inner workings of AI. Additionally, we will examine practical applications of AI across various industries, showcasing its transformative potential in solving complex problems and driving innovation.",
    what_will_you_learn: "By attending this webinar, participants will embark on a journey to uncover the mysteries of AI and emerge with a deeper understanding of its principles and practices. They will learn about the different types of machine learning algorithms and gain hands-on experience with popular frameworks such as TensorFlow and PyTorch. Moreover, through real-world case studies and examples, participants will discover how AI is being applied in diverse fields, empowering organizations to make data-driven decisions and achieve breakthrough results.",
    webinar_date: "2024-04-15",
    speaker_profile: "Dr. Jane Smith - Lead AI Researcher at TechGenius",
    webinar_by: "Sort My College",
    webinar_image: "https://example.com/webinar_image.jpg",
    webinar_start_url: "https://example.com/start",
    // webinar_join_url: "https://example.com/join",
    webinar_password: "AI1234",
    webinar_total_slots: "100",
    registered_participants: [
      "participant1@example.com",
      "participant2@example.com",
      "participant3@example.com"
    ],
    attended_participants: [
      "participant1@example.com"
    ],
    webinar_available_slots: 97
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
          <div className="webinar-profile-parent">
              <div className="webinar-profile-child">
                <div className="webinar-profile-image">
                  <img src={webinar_img} alt="" />
                </div>
                <div className="webinar-profile-dets">
                  <div className="wp-dets-first">
                        <h3>{profile.webinar_title}</h3>
                        <p>60 min</p>
                    {/* {!editWebinarEnable ? 
                      <>
                        <h3>{profile.webinar_title}</h3>
                        <p>60 min</p>
                      </>
                    :
                      <textarea name="" id="" >{profile.webinar_title}</textarea>
                    } */}
                  </div>
                  <p className="textarea-b">Webinar by <span>Allen Career Institute</span> </p>
                  <div className="wp-dets-time">
                    <div className="wp-dets-time-1">
                      <CiClock2 />
                    </div>
                    <div className="wp-dets-time-2">
                      <p>02:00 PM Onwards</p>
                      <p>15 September</p>
                    </div>
                  </div>
                  <div className="wp-dets-details">
                    <h3>Details</h3>
                    <p>{profile.webinar_details}</p>
                  </div>
                  <div className="wp-dets-learn">
                    <h3>What will you Learn?</h3>
                    <div className="wp-dets-learn-blocks">
                      <div className="wpdl-blocks-child">
                        <p><span>1.</span></p>
                        <p>Uncover the mysteries</p>
                      </div>
                      <div className="wpdl-blocks-child">
                        <p><span>2.</span></p>
                        <p>Hands-on experience</p>
                      </div>
                      <div className="wpdl-blocks-child">
                        <p><span>3.</span></p>
                        <p>AI is being applied</p>
                      </div>
                    </div>
                  </div>

                  <div className="wp-dets-speaker">
                    <h3>Speaker Profile</h3>
                    <p>{profile.speaker_profile}</p>
                  </div>

                  <div className="wp-dets-btn">
                    <button>
                      Start Now
                    </button>
                  </div>



                </div>
              </div>
              

              <div className="wp-dets-edit-now">
                    <button onClick={() => setEditWebinarEnable(true)}>
                      Delete Webinar
                    </button>
                </div>
                
                {/* <>
                <div className="wp-dets-edit-now wpde-save-cancel">
                  <button onClick={() => setEditWebinarEnable(false)}>
                    Save
                  </button>
                  <button onClick={() => setEditWebinarEnable(false)}>
                    Cancel
                  </button>
                </div>
                </> */}
              
          </div>


    // <div className="WebinarProfile-container">
    //   <div className="webinar-profile">
    //     <div className="hamburger" onClick={() => setShowMenu(true)}>
    //     <BsThreeDotsVertical color="white"/>
    //     </div>

    //     {<div ref={menuRef} className={`${showMenu && 'display-active'} drop-down-menu`}>
    //     <div 
    //     // onClick={() => setEditMode(true)} 
    //     className="menu-item">
    //       <AiOutlineEdit />
    //       <span>Edit</span>
    //     </div>
    //     <div 
    //     // onClick={handleDelete}
    //      className="menu-item">
    //       <AiOutlineDelete />
    //       <span>Delete</span>
    //     </div>
    //   </div>}
      
    //     <div className="info-img">
    //       <div className="profile-pic">
    //         <img src="https://assets-global.website-files.com/5fac161927bf86485ba43fd0/64705e02614808a894d7dd3a_Blog-Cover-2022_03_Webinar-Glossary-(1).jpeg" alt="" />
    //       </div>
    //     </div>
    //     <div className="webinar-details">
    //       <div className="detail">
    //       <label htmlFor="">
    //       Webinar Title
    //       </label>
    //       <input type="text" value={profile.title}/>
    //       </div>
    //       <div className="detail">
    //       <label htmlFor="">
    //       Webinar Details 
    //       </label>
    //       <input type="text"
    //       value={profile.details}
    //       />
    //       </div>
    //       <div className="detail">
    //       <label htmlFor="">
    //       What will you learn  
    //       </label>
    //       <input type="text" 
    //       value={profile.what_will_you_learn}
    //       />
    //       </div>
    //       <div className="detail">
    //       <label htmlFor="">
    //       Webinar Date  
    //       </label>
    //       <input type="text" 
    //       value={profile.date}
    //       />
    //       </div>
    //       <div className="detail">
    //       <label htmlFor="">
    //       Webinar Time  
    //       </label>
    //       <input type="text" 
    //       value={profile.time}
    //       />
    //       </div>
    //       <div className="detail">
    //       <label htmlFor="">
    //       Speaker Profile  
    //       </label>
    //       <input type="text" 
    //       value={profile.speaker_profile}
    //       />
    //       </div>
    //       <div className="detail">
    //       <label htmlFor="">
    //       Webinar By  
    //       </label>
    //       <input type="text" 
    //       value={profile.webinar_by}
    //       />
    //       </div>
    //       <div className="detail">
    //       <label htmlFor="">
    //       Total Slots  
    //       </label>
    //       <input type="text" value={profile.slots}/>
    //       </div>
          
    //     </div>
    // </div>
    // </div>
  );
};

export default WebinarProfile;
