import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useNavigate } from 'react-router-dom';

import { handleInput } from "../../utilities";
import TagsInput from "react-tagsinput";
import { FaIndianRupeeSign } from "react-icons/fa6";


const CounsellorProfile = ({
  // profile, 
  editProfileEnable,
  updateCounsellorStatus,
  // setProfile 
}) => {

  const navigate = useNavigate();

  const handleAcceptClick = () => {
    // Perform the acceptance logic here

    // Update the status in the parent component (Counsellor)
    updateCounsellorStatus(profile._id, 'Verified');

    // Navigate back to the counsellors page
    navigate('/counsellors');
  };




  const handleBackClick = () => {
    // Navigate back to the payment page or the previous route
    navigate('/counsellors'); // Replace '/payment' with the actual path you want to go back to
  };
  const [profile, setProfile] = useState({
    name: 'abc',
    email: 'demo@gmail.com',
    gender: 'male',
    date_of_birth: '12-5-2000',
    experience_in_years: '5',
    languages_spoken: [],
    nationality: 'Indian',
    approach_of_counselling: 'Online',
    degree_focused: [],
    locations_focused: [],
    courses_focused: []
  })

  const [showReasonDialog, setShowReasonDialog] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");


  const handleDateChange = (date) => {
    setProfile((prev) => ({
      ...prev,
      date_of_birth: formatDate(date),
    }));
  };

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
    return dayjs(date).format('YYYY-MM-DD');
  };



  const handleRejectClick = () => {
    setShowReasonDialog(true);
  };

  const handleReasonDialogClose = () => {
    setShowReasonDialog(false);
  };

  const handleCancellationReasonChange = (e) => {
    setCancellationReason(e.target.value);
  };

  const handleRejectConfirm = () => {
    // Perform the rejection logic here
    console.log("Reason for rejection:", cancellationReason);

    // Close the dialog
    setShowReasonDialog(false);
  };



  return (
    <div className="CounsellorProfile-container">
      <div className="basic-info">
        <div className="heading">
          <button onClick={handleBackClick}>Back</button>
          <button>Edit Profile</button>
        </div>

        <div className="info-img">
          <div className="name">
            <img src="http://www.clker.com/cliparts/a/e/c/c/1364125264782739178passport.jpg" alt="" />
          </div>
        </div>


        <div className="info">
          <div className="row">
            <div className="col">
              <div className="info-field">
              </div>
              <div className="info-value">

              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="info-field">
                <p>Name</p>
              </div>
              <div className="info-value">
                {editProfileEnable ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleInput("name", e.target.value, setProfile)}
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
                {editProfileEnable ? (
                  <input
                    type="text"
                    value={profile.email}
                    onChange={(e) => handleInput("email", e.target.value, setProfile)}
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
                <p>Gender</p>
              </div>
              <div className="info-value">
                {editProfileEnable ? (
                  <div className="gender-radio">
                    <label className="gender-text">
                      <input
                        type="radio"
                        value="Male"
                        checked={profile.gender === "Male"}
                        onChange={(e) => handleInput("gender", e.target.value, setProfile)}
                      />
                      Male
                    </label>
                    <label>
                      <div className="gender-text">
                        <input
                          type="radio"
                          value="Female"
                          checked={profile.gender === "Female"}
                          onChange={(e) => handleInput("gender", e.target.value, setProfile)}
                        />
                        Female
                      </div>
                    </label>
                    <label>
                      <div className="gender-text">
                        <span><input
                          type="radio"
                          value="Other"
                          checked={profile.gender === "Other"}
                          onChange={(e) => handleInput("gender", e.target.value, setProfile)}
                        />
                        </span>
                        Other
                      </div>
                    </label>
                  </div>
                ) : (
                  <p>{profile.gender}</p>
                )}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="info-field">
                <p>Date of birth</p>
              </div>
              <div className="info-value">
                {editProfileEnable ? (

                  <DatePicker label="Date of birth"
                    defaultValue={dayjs(profile.date_of_birth)}
                    onChange={(date) => handleDateChange(date)}
                  />
                ) : (
                  <p>{formatDate(profile.date_of_birth)}</p>
                )}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="info-field">
                <p>Industrial Experience</p>
              </div>

              <div className="info-value">
                {editProfileEnable ? (
                  <>
                    <input
                      type="text"
                      value={profile.experience_in_years}
                      onChange={e => handleInput('experience_in_years', e.target.value, setProfile)}
                    />
                  </>
                ) : (
                  <p>{`${profile.experience_in_years}+ years`}</p>
                )}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="info-field">
                <p>Languages I know</p>
              </div>
              <div className="info-value">
                {editProfileEnable ? (
                  <TagsInput
                    value={profile.languages_spoken}
                    onChange={(newTags) => setProfile({ ...profile, languages_spoken: newTags })}
                  />
                ) : (
                  profile.languages_spoken?.map((language, i) => (
                    <p key={i}>{`${language}${i < profile.languages_spoken.length - 1 ? "," : ""
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
                {editProfileEnable ? (
                  <>
                    <div className="ug">
                      <label className="ug-text">
                        <input
                          type="radio"
                          value="Indian"
                          checked={profile.nationality === 'Indian'}
                          onChange={handleRadioChange}
                        />
                        Indian
                      </label>
                      <label className="ug-text">
                        <input
                          type="radio"
                          value="Foreign"
                          checked={profile.nationality === 'Foreign'}
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

          <div className="row">
            <div className="col">
              <div className="info-field">
                <p>Approach of counselling</p>
              </div>
              <div className="info-value">
                {editProfileEnable ? (
                  <input
                    type="text"
                    value={profile.approach_of_counselling}
                    onChange={(e) => handleInput("approach_of_counselling", e.target.value, setProfile)}
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
                {editProfileEnable ? (
                  <>
                    <div className="ug">
                      <label className="ug-text">
                        <input
                          type="checkbox"
                          value="UG"
                          checked={profile.degree_focused.includes("UG")}
                          onChange={(e) => handleCheckboxChange('degree_focused', e.target.value)}
                        />
                        UG
                      </label>
                      <label className="ug-text">
                        <input
                          type="checkbox"
                          value="PG"
                          checked={profile.degree_focused.includes("PG")}
                          onChange={(e) => handleCheckboxChange('degree_focused', e.target.value)}
                        />
                        PG
                      </label>
                    </div>
                  </>
                ) : (
                  <p>{Array.isArray(profile.degree_focused) ? profile.degree_focused.join(", ") : ''}</p>
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
                {editProfileEnable ? (
                  <div className="ug">
                    <label className="ug-text">
                      <input
                        type="checkbox"
                        value="India"
                        checked={profile.locations_focused.includes("India")}
                        onChange={(e) => handleLocationCheckboxChange('locations_focused', e.target.value)}
                      />
                      India
                    </label>
                    <label className="ug-text">
                      <input
                        type="checkbox"
                        value="Abroad"
                        checked={profile.locations_focused.includes("Abroad")}
                        onChange={(e) => handleLocationCheckboxChange('locations_focused', e.target.value)}
                      />
                      Abroad
                    </label>
                  </div>
                ) : (
                  profile.locations_focused?.map((location, i) => (
                    <p key={i}>{`${location}${i < profile.locations_focused.length - 1 ? "," : ""}`}</p>
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
                {editProfileEnable ? (
                  <TagsInput
                    value={profile.courses_focused}
                    onChange={(newTags) => setProfile({ ...profile, courses_focused: newTags })}
                  />
                ) : (
                  profile.courses_focused?.map((courses_focused, i) => (
                    <p key={i}>{`${courses_focused}${i < profile.courses_focused.length - 1 ? "," : ""}`}</p>
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

          <div className="bottom">
            <div className="accept" onClick={handleAcceptClick}>Accept</div>
            <div className="reject" onClick={handleRejectClick}>
              Reject
            </div>
          </div>
        </div>
      </div>

      {showReasonDialog && (
        <div className="reason-dialog">
          <div className="dialog-content">
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
              <button>Confirm</button>
              <button onClick={handleRejectConfirm}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default CounsellorProfile
