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
const { backend_url } = config;

const InstituteProfile = () => {
  const { admin } = useContext(AdminContext);

  const { editCounsellorProfileEnable, setEditCounsellorProfileEnable } =
    useContext(ProfileContext);
  const { institute_id } = useParams();

  const getInstitute = async () => {
    try {
      const { data } = await axios.get(
        `${backend_url}/ep/institute/admin/${institute_id}`,
        {
          headers: {
            Authorization: admin.token,
          },
        }
      );
      setProfile(data);
    } catch (error) {
      console.log("error");
      console.log(error);
      toast(error.message);
    }
  };

  const [profile, setProfile] = useState({});

  const [showReasonDialog, setShowReasonDialog] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");
  const reasonDialogRef = useRef(null);

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

  const handleRejectClick = () => {
    setShowReasonDialog(true);
  };

  const handleReasonDialogClose = () => {
    setShowReasonDialog(false);
  };

  const handleCancelClick = () => {
    setEditCounsellorProfileEnable(false);
  };

  const handleCancellationReasonChange = (e) => {
    setCancellationReason(e.target.value);
  };

  const handleRejectCounsellor = async () => {
    try {
      const { data } = await axios.put(
        `${backend_url}/ep/institute/admin/${institute_id}`,
        {
          reason: cancellationReason,
        },
        {
          headers: {
            Authorization: admin.token,
          },
        }
      );
      setShowReasonDialog(false);
      setProfile({ ...profile, verified: false });
      console.log(profile);

      toast(data.message);
    } catch (error) {
      console.log(error);
      toast("Error rejecting counsellor");
    }
  };

  const handleCancelRejection = () => {
    console.log("Reason for rejection:", cancellationReason);
    setShowReasonDialog(false);
  };

  const handleSaveClick = async () => {
    try {
      const { data } = await axios.put(
        `${backend_url}/ep/institute/admin/${institute_id}`,
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
      toast("Counsellor successfully updated.");
    } catch (error) {
      console.log("Error updating counsellor : " + error);
      toast(error.message);
    }
  };

  const handleAccept = async () => {
    try {
      const response = await axios.put(
        `${backend_url}/counsellor/${institute_id}/verify`,
        null,
        {
          headers: {
            Authorization: admin.token,
          },
        }
      );
      setProfile({ ...profile, verified: true });
      toast("Counsellor verified successfully");
    } catch (error) {
      console.log(error);
      toast(error.response.data.error);
    }
  };

  useEffect(() => {
    getInstitute();
  }, [institute_id]);
  console.log(profile);

  return (
    <div className="CounsellorProfile-container">
      <div className="left-profile">
        <div className="info-img">
          <div className="profile-pic">
            <ProfilePic src={profile.profile_pic} />
          </div>
        </div>
        <br />

        <div className="left-profile-middle">
          <div className="info">
            <h2>Registrant Details</h2>
            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p> Full Name</p>
                </div>
                <div className="info-value">
                  {editCounsellorProfileEnable ? (
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) =>
                        handleInput("name", e.target.value, setProfile)
                      }
                    />
                  ) : (
                    <p>{profile.name}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>Email</p>
                </div>
                <div className="info-value">
                  {editCounsellorProfileEnable ? (
                    <input
                      type="text"
                      value={profile.email}
                      onChange={(e) =>
                        handleInput("email", e.target.value, setProfile)
                      }
                    />
                  ) : (
                    <p>{profile.email}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>Contact Number</p>
                </div>
                <div className="info-value">
                  {editCounsellorProfileEnable ? (
                    <div className="gender-radio">
                      <label className="gender-text">
                        <input
                          type="radio"
                          value="Male"
                          checked={profile.gender === "Male"}
                          onChange={(e) =>
                            handleInput("gender", e.target.value, setProfile)
                          }
                        />
                        Male
                      </label>
                      <label>
                        <div className="gender-text">
                          <input
                            type="radio"
                            value="Female"
                            checked={profile.gender === "Female"}
                            onChange={(e) =>
                              handleInput("gender", e.target.value, setProfile)
                            }
                          />
                          Female
                        </div>
                      </label>
                      <label>
                        <div className="gender-text">
                          <span>
                            <input
                              type="radio"
                              value="Other"
                              checked={profile.gender === "Other"}
                              onChange={(e) =>
                                handleInput(
                                  "gender",
                                  e.target.value,
                                  setProfile
                                )
                              }
                            />
                          </span>
                          Other
                        </div>
                      </label>
                    </div>
                  ) : (
                    <p>{profile.contact_number}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>Designation</p>
                </div>
                <div className="info-value">
                  {editCounsellorProfileEnable ? (
                    <DatePicker
                      label="Date of birth"
                      defaultValue={dayjs(profile.year_established_in)}
                      onChange={(date) => date}
                    />
                  ) : (
                    <p>{profile.registrant_designation}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="left-profile-bottom">
          <h2>Institute Details</h2>
          <hr />
          <div className="info">
            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>Name of Institute</p>
                </div>

                <div className="info-value">
                  {editCounsellorProfileEnable ? (
                    <>
                      <input
                        type="text"
                        value={profile.experience_in_years}
                        onChange={(e) =>
                          handleInput(
                            "experience_in_years",
                            e.target.value,
                            setProfile
                          )
                        }
                      />
                    </>
                  ) : (
                    <p>Siliguri Institute of Technology</p>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>Languages spoken</p>
                </div>
                <div className="info-value">
                  {editCounsellorProfileEnable ? (
                    <TagsInput
                      value={profile.languages_spoken}
                      onChange={(newTags) =>
                        setProfile({ ...profile, languages_spoken: newTags })
                      }
                    />
                  ) : (
                    profile.languages_spoken?.map((language, i) => (
                      <p key={i}>{`${language}${
                        i < profile.languages_spoken.length - 1 ? "," : ""
                      }`}</p>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>Nationality</p>
                </div>
                <div className="info-value">
                  {editCounsellorProfileEnable ? (
                    <>
                      <div className="ug">
                        <label className="ug-text">
                          <input
                            type="radio"
                            value="Indian"
                            checked={profile.nationality === "Indian"}
                            onChange={handleRadioChange}
                          />
                          Indian
                        </label>
                        <label className="ug-text">
                          <input
                            type="radio"
                            value="Foreign"
                            checked={profile.nationality === "Foreign"}
                            onChange={handleRadioChange}
                          />
                          Foreign
                        </label>
                      </div>
                    </>
                  ) : (
                    <p>{profile.nationality}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="right-profile">
        {editCounsellorProfileEnable ? (
          <>
            <div className="right-profile-buttons">
              <div className="left">
                <div className="save" onClick={handleSaveClick}>
                  Save
                </div>
                <div className="save" onClick={handleCancelClick}>
                  Cancel
                </div>
              </div>
              <div className="right">
                <CounsellorProfileDropdown />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="right-profile-buttons">
              <div className="left">
                {!profile.verified && (
                  <div className="accept" onClick={handleAccept}>
                    Accept
                  </div>
                )}
                <div className="reject" onClick={handleRejectClick}>
                  Reject
                </div>
              </div>
              <div className="right">
                <CounsellorProfileDropdown />
              </div>
            </div>
          </>
        )}

        <div className="right-profile-info">
          <div className="info">
            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>Approach of counselling</p>
                </div>
                <div className="info-value">
                  {editCounsellorProfileEnable ? (
                    <input
                      type="text"
                      value={profile.approach_of_counselling}
                      onChange={(e) =>
                        handleInput(
                          "approach_of_counselling",
                          e.target.value,
                          setProfile
                        )
                      }
                    />
                  ) : (
                    <p>{profile.approach_of_counselling}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>Degree focused</p>
                </div>
                <div className="info-value">
                  {editCounsellorProfileEnable ? (
                    <>
                      <div className="ug">
                        <label className="ug-text">
                          <input
                            type="checkbox"
                            value="UG"
                            checked={profile.degree_focused.includes("UG")}
                            onChange={(e) =>
                              handleCheckboxChange(
                                "degree_focused",
                                e.target.value
                              )
                            }
                          />
                          UG
                        </label>
                        <label className="ug-text">
                          <input
                            type="checkbox"
                            value="PG"
                            checked={profile.degree_focused.includes("PG")}
                            onChange={(e) =>
                              handleCheckboxChange(
                                "degree_focused",
                                e.target.value
                              )
                            }
                          />
                          PG
                        </label>
                      </div>
                    </>
                  ) : (
                    <p>
                      {Array.isArray(profile.degree_focused)
                        ? profile.degree_focused.join(", ")
                        : ""}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>Locations focused</p>
                </div>
                <div className="info-value">
                  {editCounsellorProfileEnable ? (
                    <div className="ug">
                      <label className="ug-text">
                        <input
                          type="checkbox"
                          value="India"
                          checked={profile.locations_focused.includes("India")}
                          onChange={(e) =>
                            handleLocationCheckboxChange(
                              "locations_focused",
                              e.target.value
                            )
                          }
                        />
                        India
                      </label>
                      <label className="ug-text">
                        <input
                          type="checkbox"
                          value="Abroad"
                          checked={profile.locations_focused.includes("Abroad")}
                          onChange={(e) =>
                            handleLocationCheckboxChange(
                              "locations_focused",
                              e.target.value
                            )
                          }
                        />
                        Abroad
                      </label>
                    </div>
                  ) : (
                    profile.locations_focused?.map((location, i) => (
                      <p key={i}>{`${location}${
                        i < profile.locations_focused.length - 1 ? "," : ""
                      }`}</p>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>Courses focused</p>
                </div>
                <div className="info-value">
                  {editCounsellorProfileEnable ? (
                    <TagsInput
                      value={profile.courses_focused}
                      onChange={(newTags) =>
                        setProfile({ ...profile, courses_focused: newTags })
                      }
                    />
                  ) : (
                    profile.courses_focused?.map((courses_focused, i) => (
                      <p key={i}>{`${courses_focused}${
                        i < profile.courses_focused.length - 1 ? "," : ""
                      }`}</p>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>Group session price</p>
                </div>
                <div className="info-value">
                  <p>
                    <FaIndianRupeeSign /> {profile.group_session_price}
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>Personal session price</p>
                </div>
                <div className="info-value">
                  <p>
                    <FaIndianRupeeSign /> {profile.personal_session_price}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="bankDetails">
          <div className="info">
            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>Recepient Name </p>
                </div>
                <div className="info-value">
                  <p>{profile.recepient_name}</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p> Bank Name </p>
                </div>
                <div className="info-value">
                  <p>{profile.bank_name}</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p> Branch</p>
                </div>
                <div className="info-value">
                  <p>{profile.branch}</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>Account Type</p>
                </div>
                <div className="info-value">
                  <p>{profile.account_type}</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>Account Number</p>
                </div>
                <div className="info-value">
                  <p>{profile.account_number}</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>IFSC Code</p>
                </div>
                <div className="info-value">
                  <p>{profile.ifsc_code}</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      {showReasonDialog && (
        <div className="reason-dialog">
          <div ref={reasonDialogRef} className="dialog-content">
            <span onClick={handleReasonDialogClose} className="close-button">
              &times;
            </span>
            <h3>Reason for Rejection</h3>
            <textarea
              value={cancellationReason}
              onChange={handleCancellationReasonChange}
              placeholder="Write your reason for rejection..."
            ></textarea>
            <div className="btns">
              <button onClick={handleRejectCounsellor}>Confirm</button>
              <button onClick={handleCancelRejection}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstituteProfile;
