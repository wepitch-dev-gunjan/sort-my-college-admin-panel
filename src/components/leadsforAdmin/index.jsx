import React, { useContext, useState } from "react";
import "./style.scss";
import axios from "axios";
import config from "@/config";
import { useEffect } from "react";
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
import { AdminContext } from "../../context/AdminContext";
const { backend_url } = config;
const LeadsForAdmin = () => {
  const { queries, setQueries } = useContext(AdminContext)
  const { institute_id } = useParams();
  const { admin } = useContext(AdminContext);

  const [filterParams, setFilterParams] = useState({
    status: "",
    search: "",

  });
  const [selectDate, setSelectDate] = useState(null);
  const handleDateChange = (date) => {
    setSelectDate(date);
  };
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "search") {
      setFilterParams((prevState) => ({
        ...prevState,
        [name]: value,
      }));
     } else if (name === "status") {
      const newValue = value || "";
      setFilterParams((prevState) => ({
       ...prevState,
       [name]: newValue,
      }));
    }
  };
  const getQueriesForAdmin = async () => {
   try {
     const { data } = await axios.get(
      `${backend_url}/ep/enquiriesForAdmin/${institute_id}`,{
        params: { ...filterParams } ,
        headers : {
         Authorization: admin.token,
        },
       }

     );
     setQueries(data);
     console.log(queries);
     console.log("params",filterParams)
   } catch (error) {
     console.log("error");
     console.log(error);
   }
 };
 
 useEffect(() => {
  getQueriesForAdmin();
}, [filterParams]);

  const resetFilters = async () => {
    try {
      setFilterParams({
        search: "",
        status: "",
       });
       setSelectDate(null);
       getQueriesForAdmin();
    } catch (error) {
      console.log(error);
    }
  };
  const handleKeyPress = (e) => {
   if (e.key === "Enter") {
     getQueriesForAdmin();
   }
 };
  return (
    <div className="RecentLeads-container">
      <h1>All Leads</h1>
      {/* ?filters */}
      <div className="main_Container">
        <TextField
          label="Search"
          sx={{ height: "50px", width: "300px" }}
          placeholder="Search by all fields"
          type="text"
          name="search"
          value={filterParams.search}
          onChange={handleFilterChange}
          onKeyDown={handleKeyPress}

        />
        <DatePicker
          label="Select Date"
          value={selectDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
          sx={{ marginLeft: "16px" }}
        />
        <FormControl style={{ width: "150px" }}>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            label="Status"
            value={filterParams.status} // Bind value to filterParams.status
           onChange = {handleFilterChange}
           onKeyDown={handleKeyPress}
            defaultValue="All"
          >
            <MenuItem value="All">ALL</MenuItem>
            <MenuItem value="Unseen">UNSEEN</MenuItem>
            <MenuItem value="Replied">REPLIED</MenuItem>
            <MenuItem value="Pending">PENDING</MenuItem>
          </Select>
        </FormControl>
        <div className="btn_main">
          <Button sx={{ height: "55px" }} onClick={getQueriesForAdmin}>
            Apply Filters
          </Button>
          <Button sx={{ height: "55px" }} onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
      </div>
      <div className="Leads-table-parent">
        <div className="table Leads-table">
          <div className="row">
            <div className="col">
              <h4>ID</h4>
            </div>
            <div className="col">
              <h4>Date</h4>
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
            {/* <div><h4>Query</h4></div> */}
          </div>
          {queries.map((query, i) => (
            <div className="row" key={i}>
              <div className="col">
                {" "}
                <p>{i + 1}</p>
              </div>
              <div className="col">
                <p>{query.date}</p>
              </div>
              <div className="col">
                <p>{query.name}</p>
              </div>
              <div className="col">
                <p>{query.phone_number}</p>
              </div>
              {/* <div className= "col"><p>{query.query}</p></div> */}
              <div
                className={`col ${
                  query.status === "Unseen"
                    ? "red"
                    : query.status === "Replied"
                    ? "green"
                    : query.status === "Pending"
                    ? "blue"
                    : ""
                }`}
              >
                <p>{query.status}</p>
              </div>
              {/* <div className="link">
             <Link to={`/allQueries/${query._id}`}>
               <p>View </p>
             </Link>
           </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeadsForAdmin;
