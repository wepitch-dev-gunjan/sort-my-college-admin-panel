import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import "./style.scss";
import { AdminContext } from "../../context/AdminContext";
import config from '@/config';
import useClickOutside from "../../customHooks/useClickOutside";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WebinarContext } from "../../context/WebinarContext";
import { ImSpinner8 } from "react-icons/im";
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

  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = Math.ceil(now.getMinutes() / 30) * 30; // Round to nearest 30 minutes
    const currentTime = `${hours}:${minutes.toString().padStart(2, "0")}`;
    return currentTime;
  }

  const [webinarDetails, setWebinarDetails] = useState({
    webinar_date: formatDate(getTomorrowDate()),
    webinar_time: getCurrentTime(),
    webinar_available_slots: "500",
    webinar_image: "https://assets.new.siemens.com/siemens/assets/api/uuid:f160ce8d-58f9-4b0f-b83b-200643b80c1a/width:2000/quality:high/us-si-pss-bp-sra-buildingoperatorpage-getty-1200931713.jpg",
    webinar_title: "Awesome Webinar"
  });

  useClickOutside(Ref, () => setAddMode(false));

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/webinars', webinarDetails); // Assuming the API endpoint is '/api/webinars' and you are sending the data as JSON
      console.log('Webinar saved:', response.data);
      // Optionally, you can reset the form here
      setWebinarDetails({
        webinar_title: '',
        webinar_details: '',
        what_will_you_learn: '',
        webinar_date: '',
        speaker_profile: '',
        webinar_by: '',
        webinar_image: '',
        webinar_start_url: '',
        webinar_join_url: '',
        webinar_password: '',
      });
    } catch (error) {
      console.error('Error saving webinar:', error);
    }
  };

  const handleCancel = () => {
    setWebinarDetails({
      webinar_title: "webinar title",
      webinar_date: formatDate(getTomorrowDate()),
      webinar_fee: "0",
      webinar_status: "Available",
      webinar_slots: "10",
      webinar_available_slots: "5",
    });
    setAddMode(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    // Assuming you want to do something with the uploaded file
    // For example, log the file name and size
    console.log(`File Name: ${file.name}, File Size: ${file.size} bytes`);

    // You can save the file in the state if needed
    setWebinarDetails({
      ...webinarDetails,
      uploadedFile: file, // Add this line to save the file in state
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWebinarDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div className="AddWebinar-container">
      <div className="main-container">
        <div className="webinar-image">
          <label htmlFor="webinar_image">Webinar Image:</label>
          <input
            type="text"
            id="webinar_image"
            name="webinar_image"
            value={webinarDetails.webinar_image}
            onChange={handleChange}
          />
        </div>
        <div className="webinar-title">
          <label htmlFor="webinar_title">Webinar Title:</label>
          <input
            type="text"
            id="webinar_title"
            name="webinar_title"
            value={webinarDetails.webinar_title}
            onChange={handleChange}
          />
        </div>
        <div className="webinar-details">
          <label htmlFor="webinar_details">Webinar Details:</label>
          <textarea
            id="webinar_details"
            name="webinar_details"
            value={webinarDetails.webinar_details}
            onChange={handleChange}
          />
        </div>
        <div className="what-will-you-learn">
          <label htmlFor="what_will_you_learn">What will you learn:</label>
          <textarea
            id="what_will_you_learn"
            name="what_will_you_learn"
            value={webinarDetails.what_will_you_learn}
            onChange={handleChange}
          />
        </div>
        <div className="webinar-date">
          <label htmlFor="webinar_date">Webinar Date:</label>
          <input
            type="date"
            id="webinar_date"
            name="webinar_date"
            value={webinarDetails.webinar_date}
            onChange={handleChange}
          />
        </div>
        <div className="speaker-profile">
          <label htmlFor="speaker_profile">Speaker Profile:</label>
          <input
            type="text"
            id="speaker_profile"
            name="speaker_profile"
            value={webinarDetails.speaker_profile}
            onChange={handleChange}
          />
        </div>
        <div className="webinar-by">
          <label htmlFor="webinar_by">Webinar By:</label>
          <input
            type="text"
            id="webinar_by"
            name="webinar_by"
            value={webinarDetails.webinar_by}
            onChange={handleChange}
          />
        </div>
        <div className="webinar-start-url">
          <label htmlFor="webinar_start_url">Webinar Start URL:</label>
          <input
            type="text"
            id="webinar_start_url"
            name="webinar_start_url"
            value={webinarDetails.webinar_start_url}
            onChange={handleChange}
          />
        </div>
        <div className="webinar-join-url">
          <label htmlFor="webinar_join_url">Webinar Join URL:</label>
          <input
            type="text"
            id="webinar_join_url"
            name="webinar_join_url"
            value={webinarDetails.webinar_join_url}
            onChange={handleChange}
          />
        </div>
        <div className="webinar-password">
          <label htmlFor="webinar_password">Webinar Password:</label>
          <input
            type="text"
            id="webinar_password"
            name="webinar_password"
            value={webinarDetails.webinar_password}
            onChange={handleChange}
          />
        </div>
        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
};

export default AddWebinar;
