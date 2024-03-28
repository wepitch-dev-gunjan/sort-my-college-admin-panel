import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { handleInput } from "../../utilities";
import { toast } from "react-toastify";

const BasicInfo = ({ profile, editProfileEnable, setProfile }) => {
  // const handleDateChange = (date) => {
  //   setProfile((prev) => ({
  //     ...prev,
  //     date_of_birth: formatDate(date),
  //   }));
  // };
  const formatDate = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };

  const [dobError, setDobError] = useState(null);
  const handleDateChange = (date) => {
    const formattedDate = formatDate(date);
    const age = calculateAge(date);
    if (age < 0) {
      setDobError("Please select a date in the past.");
      toast("Please select a date in the past.");
    } else if (age < 18) {
      setDobError("You must be at least 18 years old.");
      toast("You must be at least 18 years old.");
    } else {
      setDobError("");
      setProfile((prev) => ({
        ...prev,
        date_of_birth: formattedDate,
      }));
    }
  };
  const calculateAge = (date) => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };
  return (
    <div className="BasicInfo-container">
      <div className="heading">
        <h2>Basic info</h2>
      </div>
      <div className="info">
        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Email</p>
            </div>
            <div className="info-value">
              {/* {editProfileEnable ? (
                <input
                  type="text"
                  value={profile.email}
                  onChange={(e) =>
                    handleInput("email", e.target.value, setProfile)
                  }
                />
              ) : (
              )} */}
              <p>{profile.email}</p>
            </div>
          </div>
        </div>

        {/* <div className="row">
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
        </div> */}

        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Date of birth</p>
            </div>
            <div className="info-value">
              {editProfileEnable ? (
                <DatePicker
                  label="Date of birth"
                  defaultValue={dayjs(profile.date_of_birth)}
                  onChange={(date) => handleDateChange(date)}
                  error={dobError !== ""}
                  helperText={dobError}
                />
              ) : (
                <p>{formatDate(profile.date_of_birth)}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
