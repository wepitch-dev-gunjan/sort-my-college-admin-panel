// import "./style.scss";
// import axios from "axios";
// import config from "@/config";
// import { useState, useEffect, useContext } from "react";
// import { ProfileContext } from "../../context/ProfileContext";
// import { CounsellorContext } from "../../context/CounsellorContext";
// import { AdminContext } from "../../context/AdminContext";
// import { toast } from "react-toastify";
// import { useParams } from "react-router-dom";

// const { backend_url } = config;

// const AddAnnouncementPopup = () => {
//   const [newAnnouncementText, setNewAnnouncementText] = useState("");
//   const { addAnnouncementPopup, setAddAnnouncementPopup } =
//     useContext(ProfileContext);
//   // const { announcements, setAnnouncements } = useContext(ProfileContext);
//   const { outstandingBalancePopUp, setOutstandingBalancePopUp } =
//     useContext(CounsellorContext);
//   const { admin } = useContext(AdminContext);

//   const extractCounsellorIdFromUrl = () => {
//     const urlSegments = window.location.pathname.split("/");
//     console.log(urlSegments);
//     const counsellorIndex = urlSegments.length - 1;
//     console.log(counsellorIndex);

//     return counsellorIndex !== -1 ? urlSegments[counsellorIndex] : null;
//   };

//   const counsellor_id = extractCounsellorIdFromUrl();
//   console.log(counsellor_id); // Ensure this logs the correct ID
//   const { setOutStandingBalance } = useContext(CounsellorContext);

//   const handleClearOutstandingBalance = async () => {
//     try {
//       console.log(counsellor_id, "dfsdsdf");
//       const { data } = await axios.put(
//         `${backend_url}/admin/payments/${counsellor_id}/outstanding-balance`,
//         null,
//         {
//           headers: {
//             Authorization: admin.token,
//           },
//         }
//       );
//       setOutStandingBalance(0);

//       setOutstandingBalancePopUp((prev) => !prev);
//       console.log(data);
//     } catch (error) {
//       console.log(error);
//       toast.success(error.message);
//     }
//   };

//   return (
//     <div className="pop-parent">
//       <div className="popup">
//         <h2>Are You want to clear the outStanding Balance amount </h2>

//         <div className="actions">
//           <button
//             className="cancel"
//             onClick={() => setOutstandingBalancePopUp(false)}
//           >
//             No
//           </button>
//           <button className="add" onClick={handleClearOutstandingBalance}>
//             Yes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddAnnouncementPopup;


import "./style.scss";
import axios from "axios";
import config from "@/config";
import { useState, useContext } from "react";
import { ProfileContext } from "../../context/ProfileContext";
import { CounsellorContext } from "../../context/CounsellorContext";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";

const { backend_url } = config;

const AddAnnouncementPopup = () => {
  const { outstandingBalancePopUp, setOutstandingBalancePopUp } =
    useContext(CounsellorContext);
  const { admin } = useContext(AdminContext);

  const extractCounsellorIdFromUrl = () => {
    const urlSegments = window.location.pathname.split("/");
    return urlSegments.length > 0 ? urlSegments[urlSegments.length - 1] : null;
  };

  const counsellor_id = extractCounsellorIdFromUrl();
  const { setOutStandingBalance } = useContext(CounsellorContext);

  const handleClearOutstandingBalance = async () => {
    try {
      // Clear outstanding balance via Admin backend
      const adminResponse = await axios.put(
        `${backend_url}/admin/payments/${counsellor_id}/outstanding-balance`,
        null,
        {
          headers: {
            Authorization: admin.token,
          },
        }
      );
      console.log("Admin backend response:", adminResponse.data);

      // Clear outstanding balance via Counsellor backend
      const counsellorResponse = await axios.put(
        `${backend_url}/counsellor/${counsellor_id}/clear-outstanding-balance`,
        null,
        {
          headers: {
            Authorization: admin.token, // Use same token if necessary, or change if needed
          },
        }
      );
      console.log("Counsellor backend response:", counsellorResponse.data);

      // Update state after successful API calls
      setOutStandingBalance(0);
      setOutstandingBalancePopUp((prev) => !prev);

      toast.success("Outstanding balance cleared successfully!");
    } catch (error) {
      console.error("Error clearing outstanding balance:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="pop-parent">
      <div className="popup">
        <h2>Do you want to clear the outstanding balance?</h2>

        <div className="actions">
          <button
            className="cancel"
            onClick={() => setOutstandingBalancePopUp(false)}
          >
            No
          </button>
          <button className="add" onClick={handleClearOutstandingBalance}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAnnouncementPopup;
