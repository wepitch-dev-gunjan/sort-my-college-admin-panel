import React, { useContext, useEffect, useRef, useState } from "react";
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
      webinar_duration: "60",
      webinar_type: "Group",
      webinar_fee: "0",
      webinar_status: "Available",
      webinar_available_slots: "5",
    });
    setAddMode(false);
  };

  return (
    <div ref={Ref} className="webinar-item">
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
            <div></div>
            <div>
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
            <div>
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
            <div>
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
            <div>
              <div>
                <label>Type:</label>
                <select
                  value={webinarDetails.webinar_type}
                  onChange={(e) =>
                    setWebinarDetails({
                      ...webinarDetails,
                      webinar_type: e.target.value,
                    })
                  }
                  required
                >
                  <option value="Personal">Personal</option>
                  <option value="Group">Group</option>
                </select>
              </div>
            </div>
            <div>
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
            <div>
              <label>Status:</label>
              <input
                type="text"
                value={webinarDetails.webinar_status}
                onChange={(e) =>
                  setWebinarDetails({
                    ...webinarDetails,
                    webinar_status: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              {webinarDetails.webinar_type === "Group" && (
                <>
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
                </>
              )}
            </div>
          </div>
          <div className="edit-mode-bottom">
            <button type="submit">Create Webinar</button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddWebinar;
