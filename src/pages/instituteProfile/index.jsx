import React, { useContext, useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { handleInput } from "../../utilities";
import ProfilePic from "../../components/profilePic";
import useClickOutside from "../../customHooks/useClickOutside";
import { ProfileContext } from "../../context/ProfileContext";
import { toast } from "react-toastify";
import axios from "axios";
import config from "@/config";
import { AdminContext } from "../../context/AdminContext";
import { Link, useParams } from "react-router-dom";
import InstituteProfileDropdown from "../../components/InstituteProfileDropdown";
const { backend_url } = config;

const InstituteProfile = () => {
  const { admin } = useContext(AdminContext);

  const { editInstituteProfileEnable, setEditInstituteProfileEnable } =
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
    setEditInstituteProfileEnable(false);
  };

  const handleCancellationReasonChange = (e) => {
    setCancellationReason(e.target.value);
  };

  const handleRejectCounsellor = async () => {
    try {
      const { data } = await axios.put(
        `${backend_url}/ep/${institute_id}/reject`,
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
      toast("Error rejecting Institute");
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
      setEditInstituteProfileEnable(false);
      toast("Institute successfully updated.");
    } catch (error) {
      console.log("Error updating Institute : " + error);
      toast(error.message);
    }
  };

  const handleAccept = async () => {
    try {
      const response = await axios.put(
        `${backend_url}/ep/${institute_id}/verify`,
        null,
        {
          headers: {
            Authorization: admin.token,
          },
        }
      );
      setProfile({ ...profile, verified: true });

      toast("Institute verified successfully");
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
    <div className="EpProfile-container">
      <div className="left-profile">
        <div className="info-img">
          <div className="profile-pic">
            <ProfilePic src={profile.profile_pic} />
          </div>
        </div>
        <br />

        <div className="left-profile-middle">
          <div className="info">
            {/* registrant Details */}
            <h2>Registrant Details</h2>
            {/* registrant full Name */}
            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p> Full Name</p>
                </div>
                <div className="info-value">
                  {editInstituteProfileEnable ? (
                    <input
                      type="text"
                      value={profile.registrant_full_name}
                      onChange={(e) =>
                        handleInput(
                          "registrant_full_name",
                          e.target.value,
                          setProfile
                        )
                      }
                    />
                  ) : (
                    <p>{profile.registrant_full_name}</p>
                  )}
                </div>
              </div>
            </div>
            {/* registrant email */}
            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>Email</p>
                </div>
                <div className="info-value">
                  {/* {editInstituteProfileEnable ? (
                    <input
                      type="text"
                      value={profile. registrant_email}
                      onChange={(e) =>
                        handleInput(" registrant_email", e.target.value, setProfile)
                      }
                    />
                  ) : ( */}
                  <p>{profile.registrant_email}</p>
                  {/* )} */}
                </div>
              </div>
            </div>
            {/*  registrant_contact_number */}
            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>Contact Number</p>
                </div>
                <div className="info-value">
                  {editInstituteProfileEnable ? (
                    <div className="gender-radio">
                      <input
                        type="text"
                        value={profile.registrant_contact_number}
                        onChange={(e) =>
                          handleInput(
                            "registrant_contact_number",
                            e.target.value,
                            setProfile
                          )
                        }
                      />
                    </div>
                  ) : (
                    <p>{profile.registrant_contact_number}</p>
                  )}
                </div>
              </div>
            </div>
            {/* registrant_designation */}
            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>Designation</p>
                </div>
                <div className="info-value">
                  {editInstituteProfileEnable ? (
                    <input
                      type="text"
                      value={profile.registrant_designation}
                      onChange={(e) =>
                        handleInput(
                          "registrant_designation",
                          e.target.value,
                          setProfile
                        )
                      }
                    />
                  ) : (
                    <p>{profile.registrant_designation}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="view_leads_btn">
          <Link to={`/view_leads_for_admin/${profile._id}`}>
            <p> View Leads</p>
          </Link>
        </div>
      </div>

      <div className="right-profile">
        {editInstituteProfileEnable ? (
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
                <InstituteProfileDropdown />
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
                <InstituteProfileDropdown />
              </div>
            </div>
          </>
        )}

        <div className="right-profile-info">
          <h2>Institute Details</h2>
          <hr />
          {/* Name of Institute */}
          <div className="info">
            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>Name of Institute</p>
                </div>
                <div className="info-value">
                  {editInstituteProfileEnable ? (
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
            {/* About */}
            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>About</p>
                </div>
                <div className="info-value">
                  {editInstituteProfileEnable ? (
                    <>
                      <input
                        type="text"
                        value={profile.about}
                        onChange={(e) => handleInput("about", e.target.value)}
                      />
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
            {/* direction_url */}
            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>Directional URL</p>
                </div>
                <div className="info-value">
                  {editInstituteProfileEnable ? (
                    <input
                      type="text"
                      value={profile.direction_url}
                      onChange={(e) =>
                        handleInput("direction_url", e.target.value, setProfile)
                      }
                    />
                  ) : (
                    <p>{profile.direction_url}</p>
                  )}
                </div>
              </div>
            </div>
            {/* year_established_in */}
            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>Year Established</p>
                </div>
                <div className="info-value">
                  {editInstituteProfileEnable ? (
                    <input
                      type="text"
                      value={
                        profile.year_established_in
                          ? new Date(profile.year_established_in).getFullYear()
                          : ""
                      }
                      onChange={(e) =>
                        handleInput(
                          "year_established_in",
                          e.target.value,
                          setProfile
                        )
                      }
                    />
                  ) : (
                    <p>
                      {profile.year_established_in
                        ? new Date(profile.year_established_in).getFullYear()
                        : ""}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* affilations */}
            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>Affilation</p>
                </div>
                <div className="info-value">
                  {editInstituteProfileEnable ? (
                    <input
                      type="text"
                      value={profile.affilations}
                      onChange={(e) =>
                        handleInput(" affilations", e.target.value, setProfile)
                      }
                    />
                  ) : (
                    <p>{profile.affilations}</p>
                  )}
                </div>
              </div>
            </div>
            {/*Email */}
            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p> Email</p>
                </div>
                <div className="info-value">
                  {/* {editInstituteProfileEnable ? (
                    <input
                      type="text"
                      value={profile.email}
                      onChange={(e) =>
                        handleInput(" email", e.target.value, setProfile)
                      }
                    />
                  ) : ( */}
                  <p>{profile.email}</p>
                  {/* )} */}
                </div>
              </div>
            </div>
            {/* contact_number */}
            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>Contact Number</p>
                </div>
                <div className="info-value">
                  {editInstituteProfileEnable ? (
                    <input
                      type="number"
                      value={profile.contact_number}
                      onChange={(e) =>
                        handleInput(
                          "contact_number",
                          e.target.value,
                          setProfile
                        )
                      }
                    />
                  ) : (
                    <p>{profile.contact_number}</p>
                  )}
                </div>
              </div>
            </div>
            {/*  gstin */}
            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>GST IN</p>
                </div>
                <div className="info-value">
                  {editInstituteProfileEnable ? (
                    <input
                      type="number"
                      value={profile.gstin}
                      onChange={(e) =>
                        handleInput(" gstin", e.target.value, setProfile)
                      }
                    />
                  ) : (
                    <p>{profile.gstin}</p>
                  )}
                </div>
              </div>
            </div>

            {/* mode_of_study */}
            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>Mode of Study</p>
                </div>
                <div className="info-value">
                  {editInstituteProfileEnable ? (
                    <select
                      value={profile.mode_of_study}
                      onChange={(e) =>
                        handleInput("mode_of_study", e.target.value, setProfile)
                      }
                    >
                      <option value="ONLINE">Online</option>
                      <option value="OFFLINE">Offline</option>
                    </select>
                  ) : (
                    <p>{profile.mode_of_study}</p>
                  )}
                </div>
              </div>
            </div>

            {/* medium_of_study */}
            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>Medium of Study</p>
                </div>
                <div className="info-value">
                  {editInstituteProfileEnable ? (
                    <>
                      <select
                        value={profile.medium_of_study}
                        onChange={(e) =>
                          handleInput(
                            "medium_of_study",
                            e.target.value,
                            setProfile
                          )
                        }
                      >
                        <option value="ENGLISH">English</option>
                        <option value="HINDI">Hindi</option>
                        <option value="OTHER">Other</option>
                      </select>
                      <span className="input-info-small">Example: English</span>
                    </>
                  ) : (
                    <p>{profile.medium_of_study}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
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
