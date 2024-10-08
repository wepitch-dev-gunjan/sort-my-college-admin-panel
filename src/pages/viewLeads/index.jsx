
// import axios from "axios";
// import config from "@/config";
// import React, { useContext, useEffect, useState } from "react";
// import "./style.scss";
// import { AdminContext } from "../../context/AdminContext";
// import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// const { backend_url } = config;
// const ViewLeads = () => {
//  const id = useParams();
//   const enquiry_id = id.enquiry_id;
//  const {admin} = useContext(AdminContext);
//  const [ enquiry ,setEnquiry] = useState("");
//  const [enquiryStatus, setEnquiryStatus] = useState("");

// const getEnquiry = async () =>{
//  try {
//   const {data} = await axios.get(`${backend_url}/ep/singleEnquiryForAdmin/${enquiry_id}`,{
//    headers: {
//     Authorization : admin.token,
//    },
//   }
//   );
//   setEnquiry(data);
//   setEnquiryStatus(data.status)
//  } catch (error) {
//   console.log(error);
//   toast(error.message);
//  }
// };
// // change status
// const handleStatusChange = async () => {
//  try {
//   const response = await axios.put(
//    `${backend_url}/ep/changeStatus/${enquiry_id}`,
//    { status: "Replied" },
//    {
//     headers: {
//      Authorization: admin.token,
//     },
//    }
//    );
// getEnquiry();
//   } catch (error) {
//    console.error("Error:", error);
//    toast.error(error.message);
//   }
//  };

//  useEffect(()=>{
//   getEnquiry();
//  },[]);

//   return (
//     <div className="main_container">
//       <div className="main_query">
//        {enquiry ? (
//           <div className="query-container">
//             <div className="data">
//               <div className="fields">Name : </div>
//               <div>{enquiry.enquirer.name}</div>
//             </div>
//             <div className="data">
//               <div className="fields">Phone Number : </div>
//               <div>{enquiry.enquirer.phone_number}</div>
//             </div>
//             <div className="data">
//               <div className="fields">Course Type : </div>
//               <div>{enquiry.course.type}</div>
//             </div>
//             <div className="data">
//               <div className="fields">Course Name : </div>
//               <div>{enquiry.course.name}</div>
//             </div>
//             <div className="data">
//               <div className="fields">Date : </div>
//               <div>{enquiry.date}</div>
//             </div>
//             <div className="data">
//               <div className="fields">Status : </div>
//               <div>{enquiry.status}</div>
//             </div>
//             {/* <div className="data">
//               <div className="fields">Message : </div>
//               <div>{enquiry.message}</div>
//             </div> */}
//             <>
//               <div className="btn1">
//                 <button
//                   disabled={enquiry.status === "Replied"}
//                   onClick={handleStatusChange}
//                 >
//                   Replied
//                 </button>
//               </div>
//             </>
//           </div>
//        ):(
// <p>Loading....</p>
//        )}
//       </div>
//     </div>
//   );
// };

// export default ViewLeads;


// import axios from "axios";
// import config from "@/config";
// import React, { useContext, useEffect, useState } from "react";
// import "./style.scss";
// import { AdminContext } from "../../context/AdminContext";
// import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";

// const { backend_url } = config;

// const ViewLeads = () => {
//   const { enquiry_id } = useParams();
//   const { admin } = useContext(AdminContext);
//   const [enquiry, setEnquiry] = useState("");
//   const [enquiryStatus, setEnquiryStatus] = useState("");

//   const getEnquiry = async () => {
//     try {
//       const { data } = await axios.get(
//         `${backend_url}/ep/singleEnquiryForAdmin/${enquiry_id}`,
//         {
//           headers: {
//             Authorization: admin.token,
//           },
//         }
//       );
//       setEnquiry(data);
//       console.log("Data: ", data)
//       setEnquiryStatus(data.status);
//     } catch (error) {
//       console.log(error);
//       toast(error.message);
//     }
//   };

//   const handleStatusChange = async () => {
//     try {
//       await axios.put(
//         `${backend_url}/ep/changeStatus/${enquiry_id}`,
//         { status: "Replied" },
//         {
//           headers: {
//             Authorization: admin.token,
//           },
//         }
//       );
//       getEnquiry();
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     getEnquiry();
//     console.log("Enquiry: ", enquiry);
//   }, []);

//   return (
//     <div className="main_container">
//       <div className="main_query">
//         {enquiry ? (
//           <div className="query-container">
//             <div className="data">
//               <div className="fields">Name:</div>
//               <div>{enquiry.enquirer.name}</div>
//             </div>
//             <div className="data">
//               <div className="fields">Phone Number:</div>
//               <div>{enquiry.enquirer.phone_number}</div>
//             </div>
//             <div className="data">
//               <div className="fields">Institute Name:</div>
//               <div>{enquiry.institute.name}</div>
//             </div>
//             <div className="data">
//               <div className="fields">Course Type:</div>
//               <div>{enquiry.course.type}</div>
//             </div>
//             <div className="data">
//               <div className="fields">Course Name:</div>
//               <div>{enquiry.course.name}</div>
//             </div>
//             <div className="data">
//               <div className="fields">Date:</div>
//               <div>{enquiry.date}</div>
//             </div>
//             <div className="data">
//               <div className="fields">Status:</div>
//               <div>{enquiry.status}</div>
//             </div>
//             <div className="btn1">
//               <button
//                 disabled={enquiry.status === "Replied"}
//                 onClick={handleStatusChange}
//               >
//                 Replied
//               </button>
//             </div>
//           </div>
//         ) : (
//           <p>Loading....</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ViewLeads;

import axios from "axios";
import config from "@/config";
import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { AdminContext } from "../../context/AdminContext";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const { backend_url } = config;

const ViewLeads = () => {
  const { enquiry_id } = useParams();
  const { admin } = useContext(AdminContext);
  const [enquiry, setEnquiry] = useState(null);
  const [enquiryStatus, setEnquiryStatus] = useState("");

  const getEnquiry = async () => {
    try {
      const { data } = await axios.get(
        `${backend_url}/ep/singleEnquiryForAdmin/${enquiry_id}`,
        {
          headers: {
            Authorization: admin.token,
          },
        }
      );
      setEnquiry(data);
      setEnquiryStatus(data.status);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // const changeStatus = async (newStatus) => {
  //   setEnquiryStatus(newStatus); // Update local state immediately
  //   try {
  //     await axios.put(
  //       `${backend_url}/ep/changeStatus/${enquiry_id}`,
  //       { status: newStatus },
  //       {
  //         headers: {
  //           Authorization: admin.token,
  //         },
  //       }
  //     );
  //     getEnquiry();
  //   } catch (error) {
  //     console.error("Error:", error);
  //     toast.error(error.message);
  //     // Optionally revert the status if the request fails
  //     // setEnquiryStatus(enquiry.status);
  //   }
  // };

  useEffect(() => {
    getEnquiry();
  }, [enquiry_id]);

  return (
    <div className="main_container">
      <div className="main_query">
        {enquiry ? (
          <div className="query-container">
            <div className="data">
              <div className="fields">Name:</div>
              <div>{enquiry.enquirer.name}</div>
            </div>
            <div className="data">
              <div className="fields">Phone Number:</div>
              <div>{enquiry.enquirer.phone_number}</div>
            </div>
            <div className="data">
              <div className="fields">Institute Name:</div>
              <div>{enquiry.institute.name}</div>
            </div>
            <div className="data">
              <div className="fields">Course Type:</div>
              <div>{enquiry.course.type}</div>
            </div>
            <div className="data">
              <div className="fields">Course Name:</div>
              <div>{enquiry.course.name}</div>
            </div>
            <div className="data">
              <div className="fields">Date:</div>
              <div>{enquiry.date}</div>
            </div>
            <div className="data">
              <div className="fields">Status:</div>
              <div>{enquiryStatus}</div>
            </div>
            {/* <div className="btn1">
              <label>
                <input
                  type="radio"
                  value="Replied"
                  checked={enquiryStatus === "Replied"}
                  onChange={() => changeStatus("Replied")}
                />
                Replied
              </label>
              <label>
                <input
                  type="radio"
                  value="Not Replied"
                  checked={enquiryStatus === "Not Replied"}
                  onChange={() => changeStatus("Not Replied")}
                />
                Not Replied
              </label>
            </div> */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ViewLeads;
