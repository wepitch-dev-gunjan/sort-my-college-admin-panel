import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import "./style.scss"
import axios from "axios";
import config from "@/config";
import { useParams } from "react-router-dom";
const { backend_url } = config;
const InstituteLeads = () => {
//  const queries = [{
//   ID :23,
//   name : "Nameera",
//   phone_number : 82673475632,
//   date : "2312/2023",
//   status : "Approved"
// }];
const { institute_id } = useParams();
const { queries, setQueries, admin } = useContext(AdminContext);
const [filterParams, setFilterParams] = useState({
 status: "",
 date: null,
});

const handleFilterChange = (e) => {
 const { name, value } = e.target;
 if (name === "date") {
  // handleDateChange();
   setFilterParams((prevState) => ({
     ...prevState,
     [name]: value,
   }));
 } else if (name === "status") {
   const newValue = value === "All" ? "" : value;
   setFilterParams((prevState) => ({
     ...prevState,
     [name]: newValue,
   }));
 }
};
const handleKeyPress = (e) => {
 if (e.key === "Enter") {
 
 }
};
// create api for this and than change it here 
const getAllQueriesForAdmin = async () => {
 try {
   const { data } = await axios.get(
     `${backend_url}/ep/allEnquiriesForAdmin`,
     {
       headers: {
         Authorization: admin.token,
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

    return(
     <div className="RecentLeads-container">
 
     {/* Filters */}
     {/* <div className="main_Container">
    
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
           <MenuItem value="Unseen">UNSEEN</MenuItem>
           <MenuItem value="Replied">REPLIED</MenuItem>
           <MenuItem value="Seen">SEEN</MenuItem>
         </Select>
       </FormControl> */}
       {/* <div className="btn_main">
         <Button sx={{ height: "55px" }} onClick={resetFilters}>
           Reset Filters
         </Button>
         <Button sx={{ height: "55px" }} onClick={handleFilterChange}>
           Apply Filters
         </Button>
       </div> */}
     {/* </div> */}

     {/* Leads table */}
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
                       : ""
                   }`}
                 >
                   <p>{query.status}</p>
                 </div>
               </div>
             ))}
           </div>
         )}
       </div>
     </div>
   </div>
    )
}

export default InstituteLeads;