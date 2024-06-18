import "./style.scss";

import { FaIndianRupeeSign } from "react-icons/fa6";
import { handleInput } from "../../utilities";
// import TagsInput from "react-tagsinput";
import React from "react";
import "react-tagsinput/react-tagsinput.css";
import TagsInput from "react-tagsinput";

const OtherInfo = ({ profile, setProfile, editProfileEnable }) => {
  // const handleYearsChange = (e) => {
  //   const value = parseInt(e.target.value);
  //   if (!isNaN(value)) {
  //     handleInput('years_of_experience', value);
  //   }
  // };

  const handleRadioChange = (e) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      nationality: e.target.value,
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

  return (
    <div className="OtherInfo-container">
      <div className="heading">
        <h2>Other info</h2>
      </div>

      <div className="info">
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
                <p>{`${profile.experience_in_years}+ years`}</p>
              )}
            </div>
          </div>
        </div>

        {/* <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Languages I know</p>
            </div>
            <div className="info-value">
              {editProfileEnable ? (
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
        </div> */}

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

        {/* <div className="row">
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
        </div> */}

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
                        onChange={(e) =>
                          handleCheckboxChange("degree_focused", e.target.value)
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
                          handleCheckboxChange("degree_focused", e.target.value)
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
              {editProfileEnable ? (
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
              {editProfileEnable ? (
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
  );
};

export default OtherInfo;
