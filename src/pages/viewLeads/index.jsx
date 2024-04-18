
import axios from "axios";
import config from "@/config";
import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { AdminContext } from "../../context/AdminContext";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const { backend_url } = config;
const ViewLeads = () => {
 const id = useParams();
  const enquiry_id = id.enquiry_id;
 const {admin} = useContext(AdminContext);
 const [ enquiry ,setEnquiry] = useState("");
 const [enquiryStatus, setEnquiryStatus] = useState("");

const getEnquiry = async () =>{
 try {
  const {data} = await axios.get(`${backend_url}/ep/singleEnquiryForAdmin/${enquiry_id}`,{
   headers: {
    Authorization : admin.token,
   },
  }
  );
  setEnquiry(data);
  setEnquiryStatus(data.status)
 } catch (error) {
  console.log(error);
  toast(error.message);
 }
};
useEffect(()=>{
 getEnquiry();
},[]);
// change status
const handleStatusChange = async () => {
 try {
   const newStatus = enquiryStatus === "Unseen" ? "Seen" : "Replied";
   const response = await axios.put(
     `${backend_url}/ep/changeStatus/${enquiry_id}`,
     { status: newStatus },
     {
       headers: {
         Authorization: admin.token,
       },
     }
   );
   const updatedEnquiry = response.data;
   setEnquiryStatus(updatedEnquiry.status);
 } catch (error) {
   console.error("Error:", error);
   toast.error(error.message);
 }
};

  return (
    <div className="main_container">
      <div className="main_query">
       {enquiry ? (
          <div className="query-container">
            <div className="data">
              <div className="fields">Name : </div>
              <div>{enquiry.enquirer.name}</div>
            </div>
            <div className="data">
              <div className="fields">Phone Number : </div>
              <div>{enquiry.enquirer.phone_number}</div>
            </div>
            <div className="data">
              <div className="fields">Course Type : </div>
              <div>{enquiry.course.type}</div>
            </div>
            <div className="data">
              <div className="fields">Course Name : </div>
              <div>{enquiry.course.name}</div>
            </div>
            <div className="data">
              <div className="fields">Date : </div>
              <div>{enquiry.date}</div>
            </div>
            <div className="data">
              <div className="fields">Status : </div>
              <div>{enquiry.status}</div>
            </div>
            <div className="data">
              <div className="fields">Message : </div>
              <div>{enquiry.message}</div>
            </div>
            <>
              {enquiryStatus === "Unseen" && (
                <div className="btn1">
                  <button onClick={() => handleStatusChange("Seen")}>
                    Seen
                  </button>
                  <button onClick={() => handleStatusChange("Replied")}>
                    Replied
                  </button>
                </div>
              )}
              {enquiryStatus === "Seen" && (
                <div className="btn1">
                  <button onClick={() => handleStatusChange("Unseen")}>
                    Unseen
                  </button>
                  <button onClick={() => handleStatusChange("Replied")}>
                    Replied
                  </button>
                </div>
              )}
              {enquiryStatus === "Replied" && (
                <div className="btn1">
                  <button onClick={() => handleStatusChange("Unseen")}>
                    Unseen
                  </button>
                  <button onClick={() => handleStatusChange("Seen")}>
                    Seen
                  </button>
                </div>
              )}
            </>
          </div>
       ):(
<p>Loading....</p>
       )}
      </div>
    </div>
  );
};

export default ViewLeads;

