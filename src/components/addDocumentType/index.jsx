import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import "./style.scss";
import { UserContext } from "../../context/UserContext";
import config from "@/config";
import useClickOutside from "../../customHooks/useClickOutside";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionContext } from "../../context/SessionContext";
import { ImSpinner8 } from "react-icons/im";
import { useNavigate } from "react-router";
const { backend_url } = config;

const AddSession = ({ setSessions, setAddMode }) => {
  const Ref = useRef(null);
  const { user } = useContext(UserContext);
  const { sessionLoading, setSessionLoading } = useContext(SessionContext);

  const { rerender, setRerender } = useContext(SessionContext);

  // const { rerender, setRerender } = useContext(SessionContext);

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
    let hours = now.getHours().toString().padStart(2, "0");
    let minutes = now.getMinutes();
    if (minutes < 30) {
      minutes = 30; // Set to 30 if earlier than 30
    } else {
      minutes = 0; // Reset to 0 and add an hour if 30 or later
      hours = (parseInt(hours) + 1).toString().padStart(2, "0");
    }
    const currentTime = `${hours}:${minutes.toString().padStart(2, "0")}`;
    return currentTime;
  }

  const [sessionDetails, setSessionDetails] = useState({
    session_date: formatDate(getTomorrowDate()),
    session_time: getCurrentTime(),
    session_duration: "60",
    session_type: "Group",
    session_fee: "0",
    session_status: "Available",
    session_available_slots: "5",
  });

  useEffect(() => {
    const updatedSessionDetails = {
      ...sessionDetails,
      session_fee: sessionDetails.session_type === "Personal" ? "500" : "1000",
    };
    setSessionDetails(updatedSessionDetails);
  }, [sessionDetails.session_type]);

  useClickOutside(Ref, () => setAddMode(false));

  const handleCreateSession = async (event) => {
    console.log(sessionDetails);

    event.preventDefault();
    try {
      setSessionLoading(true);
      console.log("session");
      const response = await axios.post(
        `${backend_url}/counsellor/sessions`,
        {
          ...sessionDetails,
          counsellor_id: user.id,
        },
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
      console.log("Session created successfully", response.data);
      setSessions((prev) => [...prev, response.data.session]);
      setSessionLoading(false);
      setAddMode(false);
      toast("Session created successfully");
      setRerender(!rerender);
    } catch (error) {
      setSessionLoading(false);
      setAddMode(false);
      toast(error.response.data.error);
      console.error("An error occurred:", error.response.data);
    }
  };
  // for push writing this
  const handleCancel = () => {
    setSessionDetails({
      session_date: formatDate(getTomorrowDate()),
      session_time: getCurrentTime(),
      session_duration: "60",
      session_type: "Group",
      session_fee: "0",
      session_status: "Available",
      session_available_slots: "5",
    });
    setAddMode(false);
  };

  return (
    <div ref={Ref} className="session-item">
      {sessionLoading && (
        <div className="spinner-container">
          <div className="spinner">
            <ImSpinner8 size="40" />
          </div>
          <span>Adding Session..</span>
        </div>
      )}
      {!sessionLoading && (
        <form onSubmit={handleCreateSession} className="edit-mode-form">
          <div className="edit-mode-fields">
            <div></div>
            <div>
              <label>Date:</label>
              <input
                type="date"
                value={sessionDetails.session_date}
                onChange={(e) =>
                  setSessionDetails({
                    ...sessionDetails,
                    session_date: formatDate(e.target.value),
                  })
                }
                required
              />
            </div>
            <div>
              <label>Time:</label>
              <input
                type="time"
                value={sessionDetails.session_time}
                onChange={(e) => {
                  // console.log(e.target.value);
                  setSessionDetails({
                    ...sessionDetails,
                    session_time: e.target.value,
                  });
                }}
                required
              />
            </div>
            <div>
              <label>Duration (in minutes):</label>
              <input
                type="number"
                step="15"
                min="45"
                max="120"
                value={sessionDetails.session_duration}
                onChange={(e) =>
                  setSessionDetails({
                    ...sessionDetails,
                    session_duration: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <div>
                <label>Type:</label>
                <select
                  value={sessionDetails.session_type}
                  onChange={(e) =>
                    setSessionDetails({
                      ...sessionDetails,
                      session_type: e.target.value,
                    })
                  }
                  required
                >
                  <option value="Group">Group</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>
            </div>

            <div>
              <label>Fee:</label>
              <input
                type="number"
                step="100"
                min="0"
                max="5000"
                value={sessionDetails.session_fee}
                onChange={(e) =>
                  setSessionDetails({
                    ...sessionDetails,
                    session_fee: e.target.value,
                  })
                }
                required
              />
            </div>

            <div>
              <label>Status:</label>
              <input
                type="text"
                value={sessionDetails.session_status}
                onChange={(e) =>
                  setSessionDetails({
                    ...sessionDetails,
                    session_status: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              {sessionDetails.session_type === "Group" && (
                <>
                  <label>Available Slots:</label>
                  <input
                    type="number"
                    min={2}
                    value={sessionDetails.session_available_slots}
                    onChange={(e) =>
                      setSessionDetails({
                        ...sessionDetails,
                        session_available_slots: e.target.value,
                      })
                    }
                    required
                  />
                </>
              )}
            </div>
          </div>
          <div className="edit-mode-bottom">
            <button type="submit">Create Session</button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddSession;
