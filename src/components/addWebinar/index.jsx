import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import "./style.scss";
import { AdminContext } from "../../context/AdminContext";
import { backend_url } from "../../config";
import useClickOutside from "../../customHooks/useClickOutside";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WebinarContext } from "../../context/WebinarContext";
import { ImSpinner8 } from "react-icons/im";

const AddWebinar = ({ setWebinars, setAddMode }) => {
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
    webinar_fee: "0",
    webinar_available_slots: "500",
  });

  useClickOutside(Ref, () => setAddMode(false));

  const handleCreateWebinar = async (event) => {
    event.preventDefault();
    try {
      setWebinarLoading(true);
      console.log("webinar");
      const response = await axios.post(
        `${backend_url}/counsellor/webinars`,
        {
          ...webinarDetails,
          webinar_host: admin._id,
        },
        {
          headers: {
            Authorization: admin.token,
          },
        }
      );
      console.log("Webinar created successfully", response.data);
      setWebinars((prev) => [...prev, response.data.webinar]);
      setWebinarLoading(false);
      setAddMode(false);
      toast("Webinar created successfully");
    } catch (error) {
      setWebinarLoading(false);
      setAddMode(false);
      toast(error.response.data.error);
      console.error("An error occurred:", error.response.data);
    }
  };

  const handleCancel = () => {
    setWebinarDetails({
      webinar_date: formatDate(getTomorrowDate()),
      webinar_time: getCurrentTime(),
      webinar_fee: "0",
      webinar_title: "webinar title",
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

  return (
    <div ref={Ref} className="Add-webinar">
      {webinarLoading && (
        <div className="spinner-container">
          <div className="spinner">
            <ImSpinner8 size="40" />
          </div>
          <span>Adding Webinar..</span>
        </div>
      )}
      {!webinarLoading && (
        <form onSubmit={handleCreateWebinar} className="edit-mode-form">
          <div className="edit-mode-fields">
            <div className="add-fields">
              <div className="title">
                <label>Title:</label>
              </div>
              <input
                type="text"
                value={webinarDetails.webinar_title}
                onChange={(e) =>
                  setWebinarDetails({
                    ...webinarDetails,
                    webinar_title: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="add-fields">
              <label>Date:</label>
              <input
                type="date"
                value={webinarDetails.webinar_date}
                onChange={(e) =>
                  setWebinarDetails({
                    ...webinarDetails,
                    webinar_date: formatDate(e.target.value),
                  })
                }
                required
              />
            </div>
            <div className="add-fields">
              <label>Time:</label>
              <input
                type="time"
                value={webinarDetails.webinar_time}
                onChange={(e) =>
                  setWebinarDetails({
                    ...webinarDetails,
                    webinar_time: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="add-fields">
              <label>Duration (in minutes):</label>
              <input
                type="number"
                step="15"
                min="45"
                max="90"
                value={webinarDetails.webinar_duration}
                onChange={(e) =>
                  setWebinarDetails({
                    ...webinarDetails,
                    webinar_duration: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="add-fields">
              <label>Fee:</label>
              <input
                type="number"
                step="100"
                min="0"
                value={webinarDetails.webinar_fee}
                onChange={(e) =>
                  setWebinarDetails({
                    ...webinarDetails,
                    webinar_fee: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="add-fields">
              <label>Total Slots:</label>
              <input
                type="number"
                value={webinarDetails.webinar_slots}
                onChange={(e) =>
                  setWebinarDetails({
                    ...webinarDetails,
                    webinar_slots: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="add-fields">
              <label>Available Slots:</label>
              <input
                type="number"
                value={webinarDetails.webinar_available_slots}
                onChange={(e) =>
                  setWebinarDetails({
                    ...webinarDetails,
                    webinar_available_slots: e.target.value,
                  })
                }
                required
              />
            </div>

            <label>Upload thumbnail:</label>
            <div>
              <label className="custom-upload-button">
                <input
                  className="input-upload"
                  type="file"
                  onChange={(e) => handleFileUpload(e)}
                  accept="image/*"
                />
                Choose File
              </label>
            </div>
          </div>
          <div className="add-web-buttons">
            <div className="create">Create Webinar</div>
            <div onClick={handleCancel} className="cancel">
              Cancel
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddWebinar;
