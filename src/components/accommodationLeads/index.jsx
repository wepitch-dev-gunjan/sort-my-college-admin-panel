import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import "./style.scss";
import axios from "axios";
import config from "@/config";
import { useParams } from "react-router-dom";
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
    search: "", // New search field
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
      search: value, // Set search field value
    }));
  };

  const getAllQueriesForAdmin = async () => {
    try {
      const { data } = await axios.get(
        `${backend_url}/admin/accommodation/enquiries`,
        {
          headers: {
            Authorization: admin.token,
          },
          params: {
            enquired_to: accommodation_id || undefined,
            status: filterParams.status,
            fromDate: filterParams.startDate
              ? convertToIST(filterParams.startDate)
              : undefined,
            toDate: filterParams.endDate
              ? convertToIST(filterParams.endDate)
              : undefined,
            accommodationName: filterParams.accommodationName,
            search: filterParams.search, // Pass search parameter
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

  const sendEnquiry = async (enquiry_id, accommodation_id) => {
    try {
      const response = await axios.post(
        `${backend_url}/admin/accommodation/send-enquiry`,
        { enquiry_id, accommodation_id },
        {
          headers: {
            Authorization: admin.token,
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error sending enquiry:", error);
      alert("Failed to send enquiry. Please try again.");
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
      search: "", // Reset search
    });
    getAllQueriesForAdmin(); // Fetch data after resetting filters
  };

  // Render the component
  return (
    <div className="RecentLeads-container">
      <h1>All Accommodation Leads</h1>

      {/* Filters */}
      <div className="main_Container">
        {/* Search by All Fields */}
        <TextField
          className="search_all_fields"
          label="Search All Fields"
          value={filterParams.search}
          onChange={handleSearchChange}
          name="search"
        />

        {/* Search by Accommodation Name */}
        <TextField
          className="search_by_name"
          label="Search by Accommodation Name"
          value={filterParams.accommodationName}
          onChange={(e) =>
            setFilterParams((prevState) => ({
              ...prevState,
              accommodationName: e.target.value,
            }))
          }
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
              <h4>Preferred Time</h4>
            </div>
            <div className="col">
              <h4>Status</h4>
            </div>
            <div className="col">
              <h4>Message</h4>
            </div>
            <div className="col">
              <h4>Action</h4>
            </div>
          </div>

          {Array.isArray(queries) && queries.length === 0 ? (
            <p>No Leads</p>
          ) : (
            <div className="queries">
              {Array.isArray(queries) &&
                queries.map((query, i) => {
                  const preferredTime = query.preferred_time?.[0]
                    ? new Date(query.preferred_time[0]).toLocaleString()
                    : "N/A";
                  const enquiryStatus = query.enquiryStatus || "N/A";
                  const accommodationName = query.enquired_to?.name || "Unknown";
                  const message = query.message?.[0] || "No message";

                  return (
                    <div className="row" key={query._id}>
                      <div className="col">
                        <p>{i + 1}</p>
                      </div>
                      <div className="col instute-name-for-leads">
                        <p>{accommodationName}</p>
                      </div>
                      <div className="col">
                        <p>{new Date(query.createdAt).toLocaleString()}</p>
                      </div>
                      <div className="col">
                        <p>{preferredTime}</p>
                      </div>
                      <div
                        className={`col ${
                          enquiryStatus === "Unseen"
                            ? "red"
                            : enquiryStatus === "Pending"
                            ? "blue"
                            : enquiryStatus === "Sent"
                            ? "green"
                            : ""
                        }`}
                      >
                        <p>{enquiryStatus}</p>
                      </div>
                      <div className="col message-col">
                        <div className="scrollable-message">
                          <p>{message}</p>
                        </div>
                      </div>
                      <div className="col link">
                        <Button
                          onClick={() => sendEnquiry(query._id, query.enquired_to._id)}
                          variant="contained"
                          color="primary"
                        >
                          Send Enquiries
                        </Button>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>

      {/* CSS for scrollable message */}
      <style jsx>{`
        .scrollable-message {
          max-height: 50px;
          overflow-y: auto;
        }
        .message-col {
          max-width: 200px;
        }
      `}</style>
    </div>
  );
};

export default LeadsForAccommodation;
