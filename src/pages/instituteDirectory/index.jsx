// import { Link } from "react-router-dom";
// import "./style.scss";
// import { CheckBox, TextFields } from "@mui/icons-material";
// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import config from "@/config";
// import { AdminContext } from "../../context/AdminContext";
// import {
//   Button,
//   Checkbox,
//   FormControl,
//   FormControlLabel,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
// } from "@mui/material";
// const { backend_url } = config;

// const InstitutesDetails = () => {
//   const [institute, setInstitute] = useState([]);
//   const { admin } = useContext(AdminContext);
//   const [filterParams, setFilterParams] = useState({
//     search: ""
//   })

//   const getInstitute = async () => {
//     try {
//       const { data } = await axios.get(`${backend_url}/ep/institute/admin`, {
//         headers: {
//           Authorization: admin.token,
//         },
//         params: {...filterParams}
//       });
//       console.log(data);
//       setInstitute(data);
//     } catch (error) {
//       console.log("error");
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getInstitute();
//   }, []);

//   const handleFilterChange = async(e) =>{
//     const {name, value} = e.target;
//     setFilterParams((prevState) => ({
//       ...prevState,
//       [name]: value
//     }));
//     await getInstitute();
//   };
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter"){
//       getInstitute();
//     }
//   }

//   const generateAvatar = (institute) => {
//     if (!institute.name) return "";
//     const nameParts = institute.name.split("");
//     const firstName = nameParts[0].charAt(0).toUpperCase();
//     return `${firstName}`;
//   };
//   return (
//     <div className="Institutes-container">
//       <div className="filters">
//         <TextField
//           label="Search"
//           sx={{
//             height: "50px",
//             width: "70%",
//           }}
//           variant="outlined"
//           type="text"
//           name="search"
//           value={filterParams.search}
//           placeholder="Search by all fields"
//           onChange={handleFilterChange}
//           onKeyDown={handleKeyPress}
//         />
//         <Link to="/entrance-preparation/institute-directory/institute-leads">
//           View All Leads
//         </Link>
        
//       </div>
//       <div className="heading sticky">
//         <div className="row">
//           <div className="col">
//             <h4>IMAGE</h4>
//           </div>
//           <div className="col">
//             <h4>NAME</h4>
//           </div>
//           <div className="col">
//             <h4>EMAIL</h4>
//           </div>
//           <div className="col">
//             <h4>STATUS</h4>
//           </div>

//           <div className="col">
//             <h4>PROFILE LINK</h4>
//           </div>

//           <div className="col">
//             <h4>LEADS</h4>
//           </div>
//         </div>
//       </div>
//       <div className="institute-container">
//         <div className="institute-container-table">
//           {" "}
//           <div className="table">
//             {institute.map((Institute, i) => (
//               <div className="row" key={i}>
//                 <div className="col">
//                   {Institute.profile_pic ? (
//                     <img src={Institute.profile_pic} alt="Counsellor avatar" />
//                   ) : (
//                     <div className="avatar">{generateAvatar(institute)}</div>
//                   )}
//                 </div>
//                 <div className="col">{Institute.name}</div>
//                 <div className="col">{Institute.email}</div>
//                 <div
//                   className={`col ${
//                     Institute.status === "REJECTED"
//                       ? "red"
//                       : Institute.status === "APPROVED"
//                       ? "green"
//                       : Institute.status === "PENDING"
//                       ? "blue"
//                       : ""
//                   }`}
//                 >
//                   {Institute.status}
//                 </div>
//                 {/* <div className="col">{Institute.outstanding_balance}</div> */}
//                 <div className="col">
//                   <Link
//                     to={`/entrance-preparation/institute-directory/${Institute._id}`}
//                   >
//                     <p>View Profile</p>
//                   </Link>
//                 </div>
//                 <div className="col">
//                   <Link to={`/view_leads_for_admin/${Institute._id}`}>
//                     <p>View Leads</p>
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InstitutesDetails;
import { Link } from "react-router-dom";
import "./style.scss";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import config from "@/config";
import { AdminContext } from "../../context/AdminContext";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";

const { backend_url } = config;

const InstitutesDetails = () => {
  const [institutes, setInstitutes] = useState([]);
  const { admin } = useContext(AdminContext);
  const [filterParams, setFilterParams] = useState({
    search: "",
    status: "",
  });

  const getInstitute = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/ep/institute/admin`, {
        headers: {
          Authorization: admin.token,
        },
        params: { ...filterParams },
      });
      setInstitutes(data);
    } catch (error) {
      console.error("Error fetching institutes:", error);
    }
  };

  useEffect(() => {
    getInstitute();
  }, [filterParams]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      getInstitute();
    }
  };

  const generateAvatar = (institute) => {
    if (!institute.name) return "";
    const firstName = institute.name.charAt(0).toUpperCase();
    return firstName;
  };

  const resetFilters = () => {
    setFilterParams({
      search: "",
      status: "",
    });
    getInstitute();
  };

  return (
    <div className="Institutes-container">
      <div className="filters">
        <TextField
          label="Search"
          sx={{ height: "50px", width: "60%" }}
          variant="outlined"
          type="text"
          name="search"
          value={filterParams.search}
          placeholder="Search by all fields"
          onChange={handleFilterChange}
          onKeyDown={handleKeyPress}
        />
        <FormControl sx={{ width: "150px" }}>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={filterParams.status}
            label="Status"
            onChange={handleFilterChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="APPROVED">Approved</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="REJECTED">Rejected</MenuItem>
          </Select>
        </FormControl>
        <Button
          className="reset-filters-button"
          variant="outlined"
          onClick={resetFilters}
        >
          Reset Filters
        </Button>
        <Link to="/entrance-preparation/institute-directory/institute-leads">
          View All Leads
        </Link>
      </div>
      <div className="heading sticky">
        <div className="row">
          <div className="col">
            <h4>IMAGE</h4>
          </div>
          <div className="col">
            <h4>NAME</h4>
          </div>
          <div className="col">
            <h4>EMAIL</h4>
          </div>
          <div className="col">
            <h4>STATUS</h4>
          </div>
          <div className="col">
            <h4>PROFILE LINK</h4>
          </div>
          <div className="col">
            <h4>LEADS</h4>
          </div>
        </div>
      </div>
      <div className="institute-container">
        <div className="institute-container-table">
          <div className="table">
            {institutes.length === 0 ? (
              <p className="no-institutes-found">No Institutes Found</p>
            ) : (
              institutes.map((institute, i) => (
                <div className="row" key={i}>
                  <div className="col">
                    {institute.profile_pic ? (
                      <img src={institute.profile_pic} alt="Institute avatar" />
                    ) : (
                      <div className="avatar">{generateAvatar(institute)}</div>
                    )}
                  </div>
                  <div className="col">{institute.name}</div>
                  <div className="col">{institute.email}</div>
                  <div
                    className={`col ${
                      institute.status === "REJECTED"
                        ? "red"
                        : institute.status === "APPROVED"
                        ? "green"
                        : institute.status === "PENDING"
                        ? "blue"
                        : ""
                    }`}
                  >
                    {institute.status}
                  </div>
                  <div className="col">
                    <Link
                      to={`/entrance-preparation/institute-directory/${institute._id}`}
                    >
                      <p>View Profile</p>
                    </Link>
                  </div>
                  <div className="col">
                    <Link to={`/view_leads_for_admin/${institute._id}`}>
                      <p>View Leads</p>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutesDetails;
