import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import "./style.scss";
import axios from "axios";
import config from "@/config";
import { Link, useParams } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const { backend_url } = config;

const LeadsForAccommodation = () => {
  const { accommodation_id } = useParams(); // Get accommodation_id from URL parameters
  const { queries, setQueries, admin } = useContext(AdminContext);
  const [filterParams, setFilterParams] = useState({
    status: "",
    startDate: null,
    endDate: null,
    accommodationName: "",
  });

  const convertToIST = (date) => {
    if (!date) return null;
    const utcDate = new Date(date);
    const istOffset = 5 * 60 + 30; // IST is UTC+5:30
    utcDate.setMinutes(utcDate.getMinutes() + istOffset);
    return utcDate.toISOString();
  };

  const handleDateChange = (name) => (date) => {
    setFilterParams((prevState) => ({
      ...prevState,
      [name]: date,
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setFilterParams((prevState) => ({
      ...prevState,
      accommodationName: value,
    }));
  };

  const getAllQueriesForAdmin = async () => {
    try {
      const { data } = await axios.get(
        `${backend_url}/admin/accommodation/${accommodation_id}/enquiries`,
        {
          headers: {
            Authorization: admin.token,
          },
          params: {
            enquired_to: accommodation_id,
            status: filterParams.status,
            fromDate: filterParams.startDate
              ? convertToIST(filterParams.startDate)
              : null,
            toDate: filterParams.endDate
              ? convertToIST(filterParams.endDate)
              : null,
            accommodationName: filterParams.accommodationName,
          },
        }
      );

      console.log(data); // Log the response data

      if (Array.isArray(data.data)) {
        setQueries(data.data); // Set the queries from the API response
      } else {
        console.error("Expected an array but got:", data);
        setQueries([]); // Handle unexpected data type
      }
    } catch (error) {
      console.error("Error getting queries", error);
      setQueries([]); // Reset queries on error
    }
  };

  useEffect(() => {
    getAllQueriesForAdmin(); // Fetch data when filterParams change
  }, [filterParams]);

  const resetFilters = () => {
    setFilterParams({
      status: "",
      startDate: null,
      endDate: null,
      accommodationName: "",
    });
    getAllQueriesForAdmin(); // Fetch data after resetting filters
  };

  // Render the component
  return (
    <div className="RecentLeads-container">
      <h1>All Accommodation Leads</h1>

      {/* Filters */}
      <div className="main_Container">
        {/* Search by Accommodation Name */}
        <TextField
          className="search_by_name"
          label="Search by Accommodation Name"
          value={filterParams.accommodationName}
          onChange={handleSearchChange}
          name="accommodationName"
        />

        {/* Date Filters */}
        <DatePicker
          className="date_filter"
          label="Start Date"
          value={filterParams.startDate}
          onChange={handleDateChange("startDate")}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          className="date_filter"
          label="End Date"
          value={filterParams.endDate}
          onChange={handleDateChange("endDate")}
          renderInput={(params) => <TextField {...params} />}
        />

        {/* Status Filter */}
        <FormControl className="status_filter">
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            label="Status"
            value={filterParams.status}
            onChange={handleFilterChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Unseen">Unseen</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Sent">Sent</MenuItem>
          </Select>
        </FormControl>

        {/* Buttons */}
        <div className="btn_main">
          <Button sx={{ height: "55px" }} onClick={resetFilters}>
            Reset Filters
          </Button>
          <Button sx={{ height: "55px" }} onClick={getAllQueriesForAdmin}>
            Apply Filters
          </Button>
        </div>

        {/* Number of Leads */}
        <div className="noofenquiries">
          <p>No. of Leads: {Array.isArray(queries) ? queries.length : 0}</p>
        </div>
      </div>

      {/* Leads Table */}
      <div className="Leads-table-parent">
        <div className="table Leads-table">
          <div className="row">
            <div className="col">
              <h4>Sno</h4>
            </div>
            <div className="col">
              <h4>Accommodation Name</h4>
            </div>
            <div className="col">
              <h4>Date</h4>
            </div>
            <div className="col">
              <h4>Preferred Date</h4>
            </div>
            <div className="col">
              <h4>Status</h4>
            </div>
          </div>

          {Array.isArray(queries) && queries.length === 0 ? (
            <p>No Leads</p>
          ) : (
            <div className="queries">
              {Array.isArray(queries) &&
                queries.map((query, i) => {
                  const preferredDate = query.preferredDate
                    ? new Date(query.preferredDate).toLocaleString()
                    : "N/A"; // Format preferred date

                  return (
                    <div className="row" key={query.id}>
                      <div className="col">
                        <p>{i + 1}</p>
                      </div>
                      <div className="col instute-name-for-leads">
                        <p>{query.accommodationName}</p>
                      </div>
                      <div className="col">
                        <p>{new Date(query.createdAt).toLocaleString()}</p>{" "}
                        {/* Display date and time */}
                      </div>
                      <div className="col">
                        <p>{preferredDate}</p>{" "}
                        {/* Display formatted preferred date */}
                      </div>
                      <div
                        className={`col ${
                          query.status === "Unseen"
                            ? "red"
                            : query.status === "Pending"
                            ? "blue"
                            : query.status === "Sent"
                            ? "green"
                            : ""
                        }`}
                      >
                        <p>{query.status}</p>
                      </div>
                      <div className="link">
                        <Link to={``}>
                          <p>View</p>
                        </Link>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadsForAccommodation;
