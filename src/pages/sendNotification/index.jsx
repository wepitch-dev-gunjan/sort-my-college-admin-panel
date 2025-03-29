// import "./style.scss";
// import React, { useState } from "react";
// import { CiCircleRemove } from "react-icons/ci";
// import TextField from '@mui/material/TextField';
// import { toast } from "react-toastify";

// const SendNotification = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: ""
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const apiUrl = "https://www.sortmycollegeapp.com/notification/send-notification-all-users";

//     try {
//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           title: formData.title,
//           message: formData.description, // Assuming "message" is expected by API
//         }),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         toast.success("Notification Sent Successfully!");
//         setFormData({ title: "", description: "" }); // Reset form after success
//       } else {
//         toast.error(`Error: ${result.message || "Failed to send notification"}`);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
//       <div className="sendNotification-main" style={{ width: "600px", margin: "auto", padding: "40px", background: "#fff", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
//         <div className="sendNotification-heading" style={{ textAlign: "center", marginBottom: "70px" }}>
//           <h1 className="sendNotification-h1" style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px !important" }}>Send Notification</h1>
//           <p style={{ color: "#666" }}>Fill in the details below to send a notification.</p>
//         </div>
//         <form onSubmit={handleSubmit} className="notification-form" style={{ display: "flex", width: "100%", flexDirection: "column", gap: "25px" }}>
//           <TextField fullWidth name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
//           <TextField multiline rows={4} fullWidth name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
//           <button type="submit" style={{ padding: "10px 20px", background: "#1F0A68", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px", fontWeight: "bold" }}>
//             Send Notification
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SendNotification;



import "./style.scss";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";

const SendNotification = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    recipientType: "users", // Default value
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = "https://www.sortmycollegeapp.com/notification/send-notification-all-users";
    // const apiUrl = "http://localhost:8005/send-notification-all-users";


    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          message: formData.description,
          recipientType: formData.recipientType, // Sending recipient type
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Notification Sent Successfully!");
        setFormData({ title: "", description: "", recipientType: "users" });
      } else {
        toast.error(`Error: ${result.message || "Failed to send notification"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className="sendNotification-main" style={{ width: "600px", margin: "auto", padding: "40px", background: "#fff", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
        <div className="sendNotification-heading" style={{ textAlign: "center", marginBottom: "70px" }}>
          <h1 className="sendNotification-h1" style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px !important" }}>Send Notification</h1>
          <p style={{ color: "#666" }}>Fill in the details below to send a notification.</p>
        </div>
        <form onSubmit={handleSubmit} className="notification-form" style={{ display: "flex", width: "100%", flexDirection: "column", gap: "20px" }}>
          {/* Dropdown for selecting recipient type */}
          <select name="recipientType" value={formData.recipientType} onChange={handleChange} style={{ padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" }}
            onFocus={(e) => (e.target.style.border = "2px solid #1976d2")} // Blue border on focus
            onBlur={(e) => (e.target.style.border = "1px solid #ccc")} // Reset border on blur
          >
            <option value="users">Users</option>
            <option value="counsellors">Counsellors</option>
          </select>

          <TextField fullWidth name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
          <TextField multiline rows={4} fullWidth name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />

          <button type="submit" style={{ padding: "10px 20px", background: "#1F0A68", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px", fontWeight: "bold" }}>
            Send Notification
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendNotification;
