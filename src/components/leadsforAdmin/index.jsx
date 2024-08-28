// import React, { useContext, useState, useEffect } from "react";
// import "./style.scss";
// import axios from "axios";
// import config from "@/config";
// import { Link, useParams } from "react-router-dom";
// import { DatePicker } from "@mui/x-date-pickers";
// import {
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Button,
// } from "@mui/material";
// import { AdminContext } from "../../context/AdminContext";

// const { backend_url } = config;

// const LeadsForAdmin = () => {
//   const { queries, setQueries, admin } = useContext(AdminContext);
//   const { institute_id } = useParams();

//   const [filterParams, setFilterParams] = useState({
//     status: "",
//     date: null,
//   });
//   const [selectDate, setSelectDate] = useState(null);

//   const handleDateChange = (date) => {
//     setSelectDate(date);
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "date") {
//      // handleDateChange();
//       setFilterParams((prevState) => ({
//         ...prevState,
//         [name]: value,
//       }));
//     } else if (name === "status") {
//       const newValue = value === "All" ? "" : value;
//       setFilterParams((prevState) => ({
//         ...prevState,
//         [name]: newValue,
//       }));
//     }
//   };

//   const getQueriesForAdmin = async () => {
//     try {
//       const { data } = await axios.get(
//         `${backend_url}/ep/enquiriesForAdmin/${institute_id}`,
//         {
//           params: { ...filterParams },
//           headers: {
//             Authorization: admin.token,
//           },
//         }
//       );
//       setQueries(data);
//     } catch (error) {
//       console.log("error getting queries");
//       console.log("message", error);
//     }
//   };

//   useEffect(() => {
//     getQueriesForAdmin();
//   }, [filterParams]);

//   const resetFilters = async () => {
//     try {
//       setFilterParams({
//         search: "",
//         status: "",
//         date: null,
//       });
//       setSelectDate(null)
//       getQueriesForAdmin();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       getQueriesForAdmin();
//     }
//   };

//   return (
//     <div className="RecentLeads-container">
//       <h1>Institute Leads</h1>
//       {/* Filters */}
//       <div className="main_Container">
//         <DatePicker
//           label="Select Date"
//           name="date"
//           // value={filterParams.date}
//           // onChange={handleFilterChange}
//           onKeyDown={handleKeyPress}
//           renderInput={(params) => <TextField {...params} />}
//           sx={{ marginLeft: "16px" }}
//         />
//         <FormControl style={{ width: "150px" }}>
//           <InputLabel>Status</InputLabel>
//           <Select
//             name="status"
//             label="Status"
//             value={filterParams.status}
//             onChange={handleFilterChange}
//             onKeyDown={handleKeyPress}
//             defaultValue="All"
//           >
//             <MenuItem value="All">ALL</MenuItem>
//             <MenuItem value="Unseen">UNSEEN</MenuItem>
//             <MenuItem value="Replied">REPLIED</MenuItem>
//             <MenuItem value="Seen">SEEN</MenuItem>
//           </Select>
//         </FormControl>
//         <div className="btn_main">
//           <Button sx={{ height: "55px" }} onClick={resetFilters}>
//             Reset Filters
//           </Button>
//           <Button sx={{ height: "55px" }} onClick={handleFilterChange}>
//             Apply Filters
//           </Button>
//         </div>
//       </div>

//       {/* Leads table */}
//       <div className="Leads-table-parent">
//         <div className="table Leads-table">
//           <div className="row">
//             <div className="col">
//               <h4>ID111</h4>
//             </div>
//             <div className="col">
//               <h4>Date</h4>
//             </div>
//             <div className="col">
//               <h4>Time</h4>
//             </div>
//             <div className="col">
//               <h4>Name</h4>
//             </div>
//             <div className="col">
//               <h4>Phone Number</h4>
//             </div>
//             <div className="col">
//               <h4>Status</h4>
//             </div>
//           </div>

//           {queries.length === 0 ? (
//             <p>No Leads</p>
//           ) : (
//             <div className="queries">
//               {queries.map((query, i) => (
//                 <div className="row" key={i}>
//                   <div className="col">
//                     <p>{i + 1}</p>
//                   </div>
//                   <div className="col">
//                     <p>{query.date}</p>
//                   </div>
//                   <div className="col">
//                     <p>{query.createdAt}</p>
//                   </div>
//                   <div className="col">
//                     <p>{query.name}</p>
//                   </div>
//                   <div className="col">
//                     <p>{query.phone_number}asjhash</p>
//                   </div>
//                   <div
//                     className={`col ${
//                       query.status === "Unseen"
//                         ? "red"
//                         : query.status === "Replied"
//                         ? "green"
//                         : query.status === "Pending"
//                         ? "blue"
//                         : ""
//                     }`}
//                   >
//                     <p>{query.status}</p>
//                   </div>
//                   <div className="link">
//                     <Link to={`/getAllQueries/${query._id}`}>
//                       <p>View</p>
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeadsForAdmin;

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

const LeadsForAdmin = () => {
  const { institute_id } = useParams();
  const { queries, setQueries, admin } = useContext(AdminContext);
  const [filterParams, setFilterParams] = useState({
    status: "",
    startDate: null,
    endDate: null,
  });

  const convertToIST = (date) => {
    if (!date) return null;
    const utcDate = new Date(date);
    const istOffset = 5 * 60 + 30; // IST is UTC+5:30
    utcDate.setMinutes(utcDate.getMinutes() + istOffset);
    return utcDate.toISOString(); // or use a different format as needed
  };

  const handleDateChange = (name) => (date) => {
    setFilterParams((prevState) => ({
      ...prevState,
      [name]: date,
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "status" && value === "All" ? "" : value;
    setFilterParams((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Handle filter on enter key press if needed
    }
  };

  const getAllQueriesForAdmin = async () => {
    try {
      const { data } = await axios.get(
        `${backend_url}/ep/enquiriesForAdmin/${institute_id}`,
        {
          headers: {
            Authorization: admin.token,
          },
          params: {
            status: filterParams.status,
            startDate: convertToIST(filterParams.startDate),
            endDate: convertToIST(filterParams.endDate),
          },
        }
      );
      setQueries(data);
    } catch (error) {
      console.log("error getting queries");
      console.log("message", error);
    }
  };

  useEffect(() => {
    getAllQueriesForAdmin();
  }, [filterParams]);

  const resetFilters = async () => {
    try {
      setFilterParams({
        status: "",
        startDate: null,
        endDate: null,
      });
      getAllQueriesForAdmin();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="RecentLeads-container">
      <h1>Institute Leads</h1>
      {/* Filters */}
      <div className="main_Container">
        <DatePicker
          label="Start Date"
          value={filterParams.startDate}
          onChange={handleDateChange("startDate")}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="End Date"
          value={filterParams.endDate}
          onChange={handleDateChange("endDate")}
          renderInput={(params) => <TextField {...params} />}
        />

        <FormControl style={{ width: "150px" }}>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            label="Status"
            value={filterParams.status}
            onChange={handleFilterChange}
            onKeyDown={handleKeyPress}
            defaultValue="All"
          >
            <MenuItem value="All">ALL</MenuItem>
            <MenuItem value="Seen">Seen</MenuItem>
            <MenuItem value="Unseen">Unseen</MenuItem>
            <MenuItem value="Replied">Replied</MenuItem>
            <MenuItem value="Not Replied">Not Replied</MenuItem>
          </Select>
        </FormControl>
        <div className="btn_main">
          <Button sx={{ height: "55px" }} onClick={resetFilters}>
            Reset Filters
          </Button>
          <Button sx={{ height: "55px" }} onClick={getAllQueriesForAdmin}>
            Apply Filters
          </Button>
        </div>
        <div className="noofenquiries">
          <p>No. of Leads: {queries.length}</p>
        </div>
      </div>

      {/* Leads table */}
      <div className="Leads-table-parent">
        <div className="table Leads-table">
          <div className="row">
            <div className="col">
              <h4>ID111</h4>
            </div>
            <div className="col">
              <h4>Date</h4>
            </div>
            <div className="col">
              <h4>Time</h4>
            </div>
            <div className="col">
              <h4>Name</h4>
            </div>
            <div className="col">
              <h4>Phone Number</h4>
            </div>
            <div className="col">
              <h4>Status</h4>
            </div>
          </div>

          {queries.length === 0 ? (
            <p>No Leads</p>
          ) : (
            <div className="queries">
              {queries.map((query, i) => (
                <div className="row" key={i}>
                  <div className="col">
                    <p>{i + 1}</p>
                  </div>
                  <div className="col">
                    <p>{query.date}</p>
                  </div>
                  <div className="col">
                    <p>{query.createdAt}</p>
                  </div>
                  <div className="col">
                    <p>{query.name}</p>
                  </div>
                  <div className="col">
                    <p>{query.phone_number}</p>
                  </div>
                  <div
                    className={`col ${
                      query.status === "Unseen"
                        ? "red"
                        : query.status === "Replied"
                        ? "green"
                        : query.status === "Pending"
                        ? "blue"
                        : query.status === "Not Replied"
                        ? "red"
                        : ""
                    }`}
                  >
                    <p>{query.status}</p>
                  </div>
                  <div className="link">
                    <Link to={`/getAllQueries/${query._id}`}>
                      <p>View</p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadsForAdmin;

