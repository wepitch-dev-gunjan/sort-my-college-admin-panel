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
  const { accommodation_id } = useParams();
  const { queries, setQueries, admin } = useContext(AdminContext);

  const [filterParams, setFilterParams] = useState({
    status: "",
    startDate: null,
    endDate: null,
    preferredFromDate: null,
    preferredToDate: null,
    accommodationName: "",
    search: "",
    phoneNumber: "",
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

  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    setFilterParams((prevState) => ({
      ...prevState,
      phoneNumber: value,
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
            accommodation_id,
            status: filterParams.status,
            fromDate: filterParams.startDate
              ? convertToIST(filterParams.startDate)
              : undefined,
            toDate: filterParams.endDate
              ? convertToIST(filterParams.endDate)
              : undefined,
            preferredFromDate: filterParams.preferredFromDate
              ? convertToIST(filterParams.preferredFromDate)
              : undefined,
            preferredToDate: filterParams.preferredToDate
              ? convertToIST(filterParams.preferredToDate)
              : undefined,
            accommodationName: filterParams.accommodationName,
            search: filterParams.search,
            phoneNumber: filterParams.phoneNumber,
          },
        }
      );
      console.log("Leads Data: ", data);

      if (Array.isArray(data.data)) {
        setQueries(data.data);
      } else {
        setQueries([]);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
      setQueries([]);
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

  const updateStatus = async (enquiryId, newStatus) => {
    try {
      await axios.patch(
        `${backend_url}/admin/accommodation/enquiry/${enquiryId}/status`,
        { status: newStatus },
        {
          headers: { Authorization: admin.token },
        }
      );
      // Refresh the table after updating
      getAllQueriesForAdmin();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Debounce function to prevent excessive API calls
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedGetAllQueriesForAdmin = debounce(getAllQueriesForAdmin, 500);

  // Trigger API call whenever filterParams change
  useEffect(() => {
    debouncedGetAllQueriesForAdmin();
  }, [filterParams]);

  const resetFilters = () => {
    setFilterParams({
      status: "",
      startDate: null,
      endDate: null,
      preferredFromDate: null,
      preferredToDate: null,
      accommodationName: "",
      search: "",
      phoneNumber: "",
    });
  };

  return (
    <div className="RecentLeads-container">
      <h1>Accommodation Leads</h1>

      {/* Filters */}
      <div className="main_Container">
        <TextField
          className="search_all_fields"
          label="Search All Fields"
          value={filterParams.search}
          onChange={(e) =>
            setFilterParams((prevState) => ({
              ...prevState,
              search: e.target.value,
            }))
          }
          name="search"
        />

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

        <TextField
          className="search_phone_number"
          label="Search by Phone Number"
          value={filterParams.phoneNumber}
          onChange={handlePhoneNumberChange}
          name="phoneNumber"
        />

        {/* Date Filters */}
        <DatePicker
          className="date_filter"
          label="Enquiry Start Date"
          value={filterParams.startDate}
          onChange={handleDateChange("startDate")}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          className="date_filter"
          label="Enquiry End Date"
          value={filterParams.endDate}
          onChange={handleDateChange("endDate")}
          renderInput={(params) => <TextField {...params} />}
        />

        {/* Preferred Time Date Filters */}
        <DatePicker
          className="date_filter"
          label="Preferred Start Time"
          value={filterParams.preferredFromDate}
          onChange={handleDateChange("preferredFromDate")}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          className="date_filter"
          label="Preferred End Time"
          value={filterParams.preferredToDate}
          onChange={handleDateChange("preferredToDate")}
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

        {/* Reset Button */}
        <div className="btn_main">
          <Button sx={{ height: "55px" }} onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>

        {/* Number of Leads */}
        <div className="noofenquiries">
          <p>No. of Leads: {Array.isArray(queries) ? queries.length : 0}</p>
        </div>
      </div>

      {/* Leads Table */}
      <div className="Leads-table-parent">
        {/* Table Structure */}
        <div className="table Leads-table">
          <div className="row">
            <div className="col"><h4>Sno</h4></div>
            <div className="col"><h4>Accommodation Name </h4></div>
            <div className="col"><h4>Enquirer Name</h4></div>
            <div className="col"><h4>Phone Number</h4></div>
            <div className="col"><h4>Date</h4></div>
            <div className="col"><h4>Preferred Date</h4></div>
            <div className="col"><h4>Status</h4></div>
            <div className="col"><h4>Message</h4></div>
            {/* <div className="col"><h4>Action</h4></div> */}
          </div>

          {Array.isArray(queries) && queries.length === 0 ? (
            <p>No Leads</p>
          ) : (
            <div className="queries">
              {queries.map((query, i) => {
                const preferredTime = query.preferred_time?.[0]
                  ? new Date(query.preferred_time[0]).toLocaleString()
                  : "N/A";
                const enquiryStatus = query.enquiryStatus || "N/A";
                const accommodationName = query.enquired_to?.name || "Unknown";
                const message = query.message?.[0] || "No message";
                const enquirerName = query.enquirerDetails?.name || "Unknown";
                const phoneNumber = query.enquirerDetails?.phone_number || "N/A";

                return (
                  <div className="row" key={query._id}>
                    <div className="col"><p>{i + 1}</p></div>
                    <div className="col"><p>{accommodationName}</p></div>
                    <div className="col"><p>{enquirerName}</p></div>
                    <div className="col"><p>{phoneNumber}</p></div>
                    <div className="col">
                      <p>{new Date(query.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="col"><p>{preferredTime}</p></div>
                    <div className="col">

                    <FormControl fullWidth size="small">
                        <Select
                          value={enquiryStatus}
                          onChange={(e) =>
                            updateStatus(query._id, e.target.value)
                          }
                        >
                          <MenuItem value="Unseen">Unseen</MenuItem>
                          <MenuItem value="Pending">Pending</MenuItem>
                          <MenuItem value="Sent">Sent</MenuItem>
                          <MenuItem value="Visited">Visited</MenuItem>
                          <MenuItem value="Not Visited">Not Visited</MenuItem>
                        </Select>
                      </FormControl>

                    </div>
                    <div className="col message-col">
                      <div className="scrollable-message">
                        <p>{message}</p>
                      </div>
                    </div>
                    {/* <div className="col link">
                      <Button
                        onClick={() =>
                          sendEnquiry(query._id, accommodation_id)
                        }
                        variant="contained"
                        color="primary"
                      >
                        Send Enquiries
                      </Button>
                    </div> */}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

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
