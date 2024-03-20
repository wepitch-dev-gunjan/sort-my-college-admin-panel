import { Link } from "react-router-dom";
import "./style.scss";
import { useContext, useEffect } from "react";
import { CounsellorContext } from "../../context/CounsellorContext";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import config from "@/config";
import { useState } from "react";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { BorderAll } from "@mui/icons-material";
const { backend_url } = config;

const Counsellor = () => {
  const updateCounsellorStatus = (counsellorId, newStatus) => {
    // Find the counsellor in the state and update its status
    setCounsellors((prevCounsellors) => {
      return prevCounsellors.map((counsellor) =>
        counsellor._id === counsellorId
          ? { ...counsellor, status: newStatus }
          : counsellor
      );
    });
  };
  const { admin } = useContext(AdminContext);
  const [filterParams, setFilterParams] = useState({
    locations_focused: [],
    degree_focused: [],
    courses_focused: [],
    Search: "",
  });
  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    setFilterParams((prevState) => ({
      ...prevState,
      [name]: checked ? value : "",
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      getCounsellors();
    }
  };
  const getCounsellors = async () => {
    try {
      const { data } = await axios.get(
        `${backend_url}/counsellor/counsellor-for-admin`,
        // null,
        {
          headers: {
            Authorization: admin.token,
          },
          params: filterParams,
        }
      );
      setCounsellors(data);
    } catch (error) {
      console.log(error);
      // toast(error.message)
    }
  };
  useEffect(() => {
    if (admin.token) getCounsellors();
  }, [admin]);
  const { counsellors, setCounsellors } = useContext(CounsellorContext);

  const generateAvatar = (counsellor) => {
    if (!counsellor.name) return "";
    const nameParts = counsellor.name.split("");
    const firstName = nameParts[0].charAt(0).toUpperCase();
    return `${firstName}`;
  };
  console.log(counsellors);
  return (
    <div className="Counsellors-container">
      <div className="filters">
        {/* for universal search */}
        <TextField
          label="Search"
          sx={{ height: "50px" }}
          variant="outlined"
          type="text"
          name="search"
          placeholder="Search by all fields"
          onChange={handleFilterChange}
          onKeyDown={handleKeyPress}
        />
        {/* search by checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              name="locations_focused"
              checked={filterParams.locations_focused === "India"}
              value="India"
              onChange={handleFilterChange}
              onKeyDown={handleKeyPress}
            />
          }
          label="India"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="locations_focused"
              value="Abroad"
              onChange={handleFilterChange}
              checked={filterParams.locations_focused === "Abroad"}
              onKeyDown={handleKeyPress}
            />
          }
          label="Abroad"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="degree_focused"
              value="UG"
              onChange={handleFilterChange}
              onKeyDown={handleKeyPress}
            />
          }
          label="UG"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="degree_focused"
              value="PG"
              onChange={handleFilterChange}
              onKeyDown={handleKeyPress}
            />
          }
          label="PG"
        />
        {/* <button onClick={getCounsellors}>Apply Filters</button> */}
        <Button
          onClick={getCounsellors}
          sx={{ height: "55 px" }}
          variant="contained"
        >
          Apply Filters
        </Button>
      </div>

      <div className="heading sticky">
        <div className="row">
          <div className="col">
            <h4>IMAGE</h4>
          </div>
          <div className="col">
            <h4>NAME</h4>
          </div>
          <div className="col">
            <h4>EMAIL</h4>
          </div>
          <div className="col">
            <h4>STATUS</h4>
          </div>
          <div className="col">
            <h4>OUTSTANDING BALANCE</h4>
          </div>
          <div className="col">
            <h4>PROFILE LINK</h4>
          </div>
        </div>
      </div>
      <div className="counsellor-container">
        <div className="table">
          {counsellors.map((counsellor, i) => (
            <div className="row" key={i}>
              <div className="col">
                {counsellor.profile_pic ? (
                  <img src={counsellor.profile_pic} alt="Counsellor avatar" />
                ) : (
                  <div className="avatar">{generateAvatar(counsellor)}</div>
                )}
              </div>
              <div className="col">{counsellor.name}</div>
              <div className="col">{counsellor.email}</div>
              <div
                className={`col ${
                  counsellor.status === "REJECTED"
                    ? "red"
                    : counsellor.status === "APPROVED"
                    ? "green"
                    : counsellor.status === "PENDING"
                    ? "blue"
                    : ""
                }`}
              >
                {counsellor.status}
              </div>
              <div className="col">{counsellor.outstanding_balance}</div>
              <div className="col">
                <Link to={`/counsellors/counsellor-profile/${counsellor._id}`}>
                  <p>View Profile</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Counsellor;
