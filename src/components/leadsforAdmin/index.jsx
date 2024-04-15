import React, { useState } from 'react'
import "./style.scss"
import axios from "axios";
import config from "@/config";
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
const { backend_url } = config;
const LeadsForAdmin = () => {
 const [queries, setQueries] = useState([]);
 const{institute_id}=useParams();

const getQueriesForAdmin = async() => {
 try {
  const response = await axios.get(`${backend_url}/ep/enquiriesForAdmin/${institute_id}`)
  console.log(response)
let { data } = response;
console.log(data);
setQueries(data)
 } catch (error) {
  console.log("error");
  console.log(error)
 }
};
useEffect(() =>{
 getQueriesForAdmin();
}, []);

  return (
   <div className="RecentLeads-container">
   <h1>All Leads</h1>

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
               query.status === "Cancelled"
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
  )
}

export default LeadsForAdmin
