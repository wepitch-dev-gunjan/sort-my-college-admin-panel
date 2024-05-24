import { Link } from "react-router-dom";
import "./style.scss";
import { useContext, useEffect } from "react";
import { CounsellorContext } from "../../context/CounsellorContext";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import config from "@/config";
import { useState } from "react";
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
import { BsArrowDownShort, BsArrowUp } from "react-icons/bs";
import { BsArrowDown } from "react-icons/bs";
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
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("outstanding_balance");
  const [filterParams, setFilterParams] = useState({
    locations_focused: [],
    degree_focused: [],
    courses_focused: [],
    search: "",
    status: "",
  });
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  const handleSort = (field) => {
    if (field === sortBy) {
      toggleSortOrder();
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // Function to reset all filter parameters
  // Function to reset all filter parameters and fetch all counsellors data
  const resetFilters = async () => {
    try {
      // Reset filter parameters
      setFilterParams({
        locations_focused: [],
        degree_focused: [],
        courses_focused: [],
        search: "",
        status: "",
      });

      // Fetch all counsellors data without any filters applied
      const { data } = await axios.get(
        `${backend_url}/counsellor/counsellor-for-admin`,
        {
          headers: {
            Authorization: admin.token,
          },
        }
      );

      // Sort and set the counsellors data
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setCounsellors(data);
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };
  // Inside your Counsellor component

  // handle the universal search and status
  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "search") {
      // , update the 'search'
      setFilterParams((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (name === "status") {
      // Ensure value is not undefined
      const newValue = value || ""; // If value is undefined, set it to an empty string
      setFilterParams((prevState) => ({
        ...prevState,
        [name]: newValue,
      }));
    } else {
      // For other filters, handle them as before
      setFilterParams((prevState) => ({
        ...prevState,
        [name]: checked ? value : "",
      }));
    }
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
        {
          headers: {
            Authorization: admin.token,
          },
          params: { ...filterParams, sortBy, sortOrder },
        }
      );
      data.sort((a, b) =>
        sortOrder === "asc"
          ? a.outstanding_balance - b.outstanding_balance
          : b.outstanding_balance - a.outstanding_balance
      );
      setCounsellors(data);
    } catch (error) {
      console.log(error);
      // toast(error.message)
    }
  };
  const handleSortByOutstandingBalance = () => {
    // Toggle sorting order
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
  };
  useEffect(() => {
    if (admin.token) getCounsellors();
  }, [admin, sortOrder, sortBy]);
  const { counsellors, setCounsellors } = useContext(CounsellorContext);

  const generateAvatar = (counsellor) => {
    if (!counsellor.name) return "";
    const nameParts = counsellor.name.split("");
    const firstName = nameParts[0].charAt(0).toUpperCase();
    return `${firstName}`;
  };

  // useEffect(() =>{
  //  console.log(filterParams)
  // }, [filterParams])

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
          value={filterParams.search}
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
              checked={filterParams.degree_focused === "UG"}
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
              checked={filterParams.degree_focused === "PG"}
              onChange={handleFilterChange}
              onKeyDown={handleKeyPress}
            />
          }
          label="PG"
        />
        {/* dropdown */}
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
        {/* <button onClick={getCounsellors}>Apply Filters</button> */}
        <div className="btn_main">
          {" "}
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
          <div onClick={handleSortByOutstandingBalance} className="col">
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
