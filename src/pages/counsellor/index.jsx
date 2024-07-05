import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import axios from "axios";
import { CounsellorContext } from "../../context/CounsellorContext";
import { AdminContext } from "../../context/AdminContext";
import config from "@/config";
import Spinner from "../../components/spinner/Index";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { BsArrowDownShort, BsArrowUp, BsArrowDown } from "react-icons/bs";

const { backend_url } = config;

const Counsellor = () => {
  const { admin } = useContext(AdminContext);
  const { counsellors, setCounsellors } = useContext(CounsellorContext);

  const [sortOrder, setSortOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("createdAt");
  const [filterParams, setFilterParams] = useState({
    locations_focused: [],
    degree_focused: [],
    courses_focused: [],
    search: "",
    status: "",
  });

  useEffect(() => {
    if (admin.token) getCounsellors();
  }, [admin, sortOrder, sortBy]);

  const getCounsellors = async () => {
    try {
      const { data } = await axios.get(
        `${backend_url}/counsellor/counsellor-for-admin`,
        {
          headers: { Authorization: admin.token },
          params: { ...filterParams, sortBy, sortOrder },
        }
      );
      setCounsellors(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  const resetFilters = async () => {
    setFilterParams({
      locations_focused: [],
      degree_focused: [],
      courses_focused: [],
      search: "",
      status: "",
    });
    await getCounsellors();
  };

  const handleFilterChange = async (e) => {
    const { name, value, checked } = e.target;
    setFilterParams((prevState) => ({
      ...prevState,
      [name]: name === "search" ? value : checked ? value : "",
    }));
    await getCounsellors();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      getCounsellors();
    }
  };

  const handleSort = (field) => {
    if (field === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const generateAvatar = (counsellor) => {
    if (!counsellor.name) return "";
    const firstName = counsellor.name.charAt(0).toUpperCase();
    return firstName;
  };

  return (
    <div className="Counsellors-container">
      <div className="filters">
        <TextField
          label="Search"
          sx={{ height: "50px" }}
          variant="outlined"
          type="text"
          name="search"
          value={filterParams.search}
          placeholder="Search by all fields"
          onChange={handleFilterChange}
          onKeyDown={handleKeyPress}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="locations_focused"
              checked={filterParams.locations_focused === "India"}
              value="India"
              onChange={handleFilterChange}
            />
          }
          label="India"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="locations_focused"
              checked={filterParams.locations_focused === "Abroad"}
              value="Abroad"
              onChange={handleFilterChange}
            />
          }
          label="Abroad"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="degree_focused"
              checked={filterParams.degree_focused === "UG"}
              value="UG"
              onChange={handleFilterChange}
            />
          }
          label="UG"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="degree_focused"
              checked={filterParams.degree_focused === "PG"}
              value="PG"
              onChange={handleFilterChange}
            />
          }
          label="PG"
        />
        <FormControl style={{ width: "100px" }}>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={filterParams.status}
            label="status"
            onChange={handleFilterChange}
          >
            <MenuItem value="APPROVED">APPROVED</MenuItem>
            <MenuItem value="PENDING">PENDING</MenuItem>
            <MenuItem value="REJECTED">REJECTED</MenuItem>
          </Select>
        </FormControl>
        <div className="btn_main">
          <Button
            onClick={getCounsellors}
            sx={{ height: "55 px" }}
            variant="contained"
          >
            Apply Filters
          </Button>
          <Button
            onClick={resetFilters}
            sx={{ height: "55 px" }}
            variant="contained"
          >
            Reset Filters
          </Button>
        </div>
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
          <div
            onClick={() => handleSort("outstanding_balance")}
            className="col"
          >
            <h4>
              OUTSTANDING BALANCE{" "}
              {sortOrder === "asc" ? <BsArrowDown /> : <BsArrowUp />}
            </h4>
          </div>
          <div className="col">
            <h4>PROFILE LINK</h4>
          </div>
        </div>
      </div>
      <div className="counsellor-container">
        {counsellors.length <= 0 ? (
          <div className="spinner">
            <Spinner />
          </div>
        ) : (
          <div className="counsellor-container-table">
            <div className="table">
              {counsellors.map((counsellor, i) => (
                <div className="row" key={i}>
                  <div className="col">
                    {counsellor.profile_pic ? (
                      <img
                        src={counsellor.profile_pic}
                        alt="Counsellor avatar"
                      />
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
                    <Link
                      to={`/counsellors/counsellor-profile/${counsellor._id}`}
                    >
                      <p>View Profile</p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Counsellor;
