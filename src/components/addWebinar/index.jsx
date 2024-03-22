import React, { useContext, useMemo, useRef, useState } from "react";
import axios from "axios";
import "./style.scss";
import { AdminContext } from "../../context/AdminContext";
import config from "@/config";
import useClickOutside from "../../customHooks/useClickOutside";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WebinarContext } from "../../context/WebinarContext";
import { ImSpinner8 } from "react-icons/im";
import { MdCloudUpload } from "react-icons/md";
import Spinner from "../spinner/Index";
import { FiPlus } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const { backend_url } = config;

const AddWebinar = ({ setAddMode }) => {
  const Ref = useRef(null);
  const { admin } = useContext(AdminContext);
  const { webinarLoading, setWebinarLoading } = useContext(WebinarContext);

  const formatDate = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };

  function getTomorrowDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Get tomorrow's date
    return tomorrow;
  }

  const currentTime = useMemo(function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = Math.ceil(now.getMinutes() / 30) * 30; // Round to nearest 30 minutes
    const currentTime = `${hours}:${minutes.toString().padStart(2, "0")}`;
    return currentTime;
  }, []);

  const initialState = {
    webinar_image: "",
    webinar_title: `Webinar-${formatDate(getTomorrowDate())} at ${currentTime}`,
    webinar_details: "",
    what_will_you_learn: [""],
    webinar_date: formatDate(getTomorrowDate()),
    webinar_time: currentTime,
    speaker_profile: "",
    webinar_by: "Sort My College",
    webinar_total_slots: 500,
  };

  const [webinarDetails, setWebinarDetails] = useState(initialState);
  const [imageFile, setImageFile] = useState(null);

  useClickOutside(Ref, () => handleCancel());

  const handleChange = (index, e) => {
    const { value } = e.target;
    const newLearnings = [...webinarDetails.what_will_you_learn];
    newLearnings[index] = value;
    setWebinarDetails((prevDetails) => ({
      ...prevDetails,
      what_will_you_learn: newLearnings,
    }));
  };

  const handleAddLearning = () => {
    setWebinarDetails((prevDetails) => ({
      ...prevDetails,
      what_will_you_learn: [...prevDetails.what_will_you_learn, ""],
    }));
  };

  const handleRemoveLearning = (index) => {
    const newLearnings = [...webinarDetails.what_will_you_learn];
    newLearnings.splice(index, 1);
    setWebinarDetails((prevDetails) => ({
      ...prevDetails,
      what_will_you_learn: newLearnings,
    }));
  };

  // const handleSubmit = async () => {
  //   try {
  //     setWebinarLoading(true);

  //     const webinarSubmitDetails = {
  //       ...webinarDetails,
  //       webinar_image: imageFile,
  //     };
  //     // Create FormData object to send all data including the file
  //     const formData = new FormData();
  //     Object.entries(webinarSubmitDetails).forEach(([key, value]) => {
  //       formData.append(key, value);
  //     });

  //     const response = await axios.post(
  //       `${backend_url}/admin/webinar`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
  //           Authorization: admin.token,
  //         },
  //       }
  //     );
  //     console.log("Webinar saved:", response.data);
  //     setWebinarLoading(false);
  //     handleCancel();
  //     toast.success("Webinar added successfully");
  //   } catch (error) {
  //     setWebinarLoading(false);
  //     console.error("Error saving webinar:", error);
  //   }
  // };
  const handleSubmit = async () => {
    try {
      setWebinarLoading(true);

      const webinarSubmitDetails = {
        ...webinarDetails,
        webinar_image: imageFile,
      };
      const formData = new FormData();
      Object.entries(webinarSubmitDetails).forEach(([key, value]) => {
        if (key === "what_will_you_learn") {
          value.forEach((item, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        } else {
          formData.append(key, value);
        }
      });

      const response = await axios.post(
        `${backend_url}/admin/webinar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: admin.token,
          },
        }
      );

      console.log("Webinar saved:", response.data);
      setWebinarLoading(false);
      handleCancel();
      toast.success("Webinar added successfully");
    } catch (error) {
      setWebinarLoading(false);
      console.error("Error saving webinar:", error);
    }
  };

  const handleCancel = () => {
    setWebinarDetails(initialState);
    setAddMode(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setWebinarDetails({
        ...webinarDetails,
        webinar_image: reader.result, // Use reader.result to set the image in state
      });
    };
    reader.readAsDataURL(file);
    setImageFile(file);
  };

  return (
    <div className="AddWebinar-container">
      <div ref={Ref} className="main-container">
        <div className="overflow-container">
          <div className="top-container">
            <div
              className="webinar-image"
              onClick={() => document.getElementById("fileInput").click()}
            >
              {webinarDetails.webinar_image ? (
                <img src={webinarDetails.webinar_image} alt="Webinar Image" />
              ) : (
                <div className="upload-icon">
                  <MdCloudUpload size="50" />
                  <p>Click to Upload Image</p>
                </div>
              )}
            </div>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <div className="webinar-section">
              <div className="left-section">
                <label htmlFor="webinar_title">Webinar Title:</label>
              </div>
              <div className="right-section">
                <input
                  type="text"
                  id="webinar_title"
                  name="webinar_title"
                  value={webinarDetails.webinar_title}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="webinar-section">
              <div className="left-section">
                <label htmlFor="webinar_details">Webinar Details:</label>
              </div>
              <div className="right-section">
                <textarea
                  id="webinar_details"
                  name="webinar_details"
                  value={webinarDetails.webinar_details}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="webinar-section">
              <div className="left-section">
                <label htmlFor="what_will_you_learn">
                  What will you learn:
                </label>
              </div>
              <div className="right-section wwyl-inputs">
                {webinarDetails.what_will_you_learn.map((learning, index) => (
                  <div key={index} className="learning-item">
                    <textarea
                      value={learning}
                      onChange={(e) => handleChange(index, e)}
                    />
                    <button
                      className="wwyl-delete-btn"
                      onClick={() => handleRemoveLearning(index)}
                    >
                      <span role="img" aria-label="Delete">
                        <RiDeleteBin6Line />
                      </span>
                    </button>
                  </div>
                ))}
                <button className="wwyl-add-btn" onClick={handleAddLearning}>
                  <FiPlus />
                </button>
              </div>
            </div>
            <div className="webinar-section">
              <div className="left-section">
                <label htmlFor="webinar_date">Webinar Date:</label>
              </div>
              <div className="right-section">
                <input
                  type="date"
                  id="webinar_date"
                  name="webinar_date"
                  value={webinarDetails.webinar_date}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="webinar-section">
              <div className="left-section">
                <label htmlFor="webinar_time">Webinar Time:</label>
              </div>
              <div className="right-section">
                <input
                  type="time"
                  id="webinar_time"
                  name="webinar_time"
                  value={webinarDetails.webinar_time}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="webinar-section">
              <div className="left-section">
                <label htmlFor="speaker_profile">Speaker Profile:</label>
              </div>
              <div className="right-section">
                <input
                  type="text"
                  id="speaker_profile"
                  name="speaker_profile"
                  value={webinarDetails.speaker_profile}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="webinar-section">
              <div className="left-section">
                <label htmlFor="webinar_by">Webinar By:</label>
              </div>
              <div className="right-section">
                <input
                  type="text"
                  id="webinar_by"
                  name="webinar_by"
                  value={webinarDetails.webinar_by}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="webinar-section">
              <div className="left-section">
                <label htmlFor="webinar_by">Total slots:</label>
              </div>
              <div className="right-section">
                <input
                  type="number" // Change the type to "number"
                  id="webinar_total_slots"
                  name="webinar_total_slots"
                  value={webinarDetails.webinar_total_slots}
                  onChange={handleChange}
                  step="50" // Set the step value to 50
                />
              </div>
            </div>
          </div>
        </div>
        <div className="buttons">
          <button onClick={handleSubmit}>
            {webinarLoading ? <Spinner /> : "Save"}
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddWebinar;
