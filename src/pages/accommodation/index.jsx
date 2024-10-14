// import "./style.scss";
// import React, { useState, useEffect, useContext, useCallback } from "react";
// import { FaStar } from "react-icons/fa";
// import { AccommodationContext } from "../../context/AccommodationContext";
// import { Link, useParams } from "react-router-dom";
// import pg_1 from "../../assets/pg-1.jpg";
// import pg_2 from "../../assets/pg-2.jpg";
// import pg_3 from "../../assets/pg-3.jpg";
// import pg_4 from "../../assets/pg-4.jpg";
// import pg_5 from "../../assets/pg-5.jpg";
// import config from "@/config";
// import { AdminContext } from "../../context/AdminContext";
// import axios from "axios";
// const { backend_url } = config;
// const Accommodation = () => {
//   const [accommodations, setAccommodations] = useState([]);
//   const { accommoadtion_id } = useParams();
//   const { admin } = useContext(AdminContext);
//   // const pgs = [
//   //   {
//   //     name: "Ram Niwas PG",
//   //     image: [pg_1, pg_2, pg_3, pg_4, pg_5],
//   //     location: "Ram Bagh Circle, Jaipur",
//   //     rating: "4.2",
//   //     no_of_reviews: "8",
//   //     lowest_price: "6000",
//   //   },
//   //   {
//   //     name: "Shaym Niwas PG",
//   //     image: [pg_4, pg_5, pg_2, pg_1, pg_3],
//   //     location: "Ram Bagh Circle, Jaipur",
//   //     rating: "4.4",
//   //     no_of_reviews: "4",
//   //     lowest_price: "8000",
//   //   },
//   //   {
//   //     name: "Ram Niwas PG",
//   //     image: [pg_3, pg_1, pg_5, pg_2],
//   //     location: "Ram Bagh Circle, Jaipur",
//   //     rating: "4.1",
//   //     no_of_reviews: "10",
//   //     lowest_price: "12000",
//   //   },
//   //   {
//   //     name: "Shaym Niwas PG",
//   //     image: [pg_5, pg_4, pg_1, pg_2],
//   //     location: "Ram Bagh Circle, Jaipur",
//   //     rating: "4.5",
//   //     no_of_reviews: "4",
//   //     lowest_price: "17999",
//   //   },
//   // ];
//   // const array_of_images = [pg_1, pg_2, pg_3, pg_4, pg_5];
//   // const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const { addAccommodationEnable, setAddAccommodationEnable } =
//     useContext(AccommodationContext);

//   const getAccommodations = async () => {
//     try {
//       const { data } = await axios.get(`${backend_url}/admin/accommodation`, {
//         headers: {
//           Authorization: admin.token,
//         },
//       });
//       console.log("Accommodations ", data);
//       setAccommodations(data);
//     } catch (error) {
//       console.log("error getting accommodation", error);
//     }
//   };
//   useEffect(() => {
//     getAccommodations();
//   }, []);

//   const getLowestPrice = useCallback((index) => {
//     const allPrices = [];
//     console.log("Reached", accommodations[index].rooms);

//     if (accommodations[index] && accommodations[index].rooms) {
//       const accRooms = accommodations[index].rooms;
//       accRooms.forEach((accRoom) => {
//         if (accRoom.monthly_charge) {
//           console.log("Monthly Charge: ", accRoom.monthly_charge);
//           allPrices.push(accRoom.monthly_charge);
//         }
//       });
//       console.log("All Prices", allPrices);
//     } else {
//       console.log('Rooms not found in the selected accommodation.');
//     }

//     const lowestPrice = allPrices.length > 0 ? Math.min(...allPrices) : null;
//     console.log("LOWEEEEST", lowestPrice);
//     return lowestPrice;
//   }, [accommodations]);

//   useEffect(() => {
//     if (accommodations.length > 0) {
//       getLowestPrice(0);
//     }
//   }, [accommodations, getLowestPrice]);
 
//   return (
//     <div className="accommodation-main">
//       <div className="accomm-heading">
//         <h1>Accommodation</h1>
//         <div className="accomm-buttons">
//           <Link to="/accommodation/add">
//             <button>Queries</button>
//           </Link>
//           <Link to="/accommodation/add">
//             <button>Add New</button>
//           </Link>
//         </div>
//       </div>
//       <div className="accomm-parent">
//         {accommodations.map((accommodation, i) => (
//           <div className="accomm-children">
//             <div className="accomm-gallery">
//               <div className="accomm-image-container">
//                 <img src={accommodation.images[0]} alt="Images" />
//               </div>
//             </div>
//             <div className="accomm-child-1">
//               <div className="accomm-child-1-l">
//                 <h4>{accommodation.name}</h4>
//                 <p>
//                   {accommodation.address.area}, 
//                   {accommodation.address.city} , {accommodation.address.state}
//                 </p>
//               </div>
//               <div className="accomm-child-1-r">
//                 <p>
//                   <FaStar /> {accommodation.rating} | (
//                   {accommodation.no_of_reviews}) Reviews
//                 </p>
//               </div>
//             </div>
//             <div className="accomm-child-2">
//               <div className="accomm-child-2-l">
//                 <p>Starting from</p>
//                 <p>
//                   {" "}
//                   <span>{getLowestPrice(i)} INR</span>/Month
//                 </p>
//               </div>
//               <div className="accomm-child-2-r">
//                 <Link to={`/accommodation/details/${accommodation._id}`}>
//                   <button>View Details</button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Accommodation;



import "./style.scss";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { FaStar } from "react-icons/fa";
import { AccommodationContext } from "../../context/AccommodationContext";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "@/config";
import {
  Box,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { AdminContext } from "../../context/AdminContext";

// backend configuration
const { backend_url } = config;

const Accommodation = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 20000]); // Price range filter
  const [location, setLocation] = useState(""); // Location filter
  const [rating, setRating] = useState(0); // Rating filter
  const [gender, setGender] = useState(""); // Gender filter
  const [nearbyCollege, setNearbyCollege] = useState(""); // Nearby college search
  const [name, setName] = useState(""); // Name search filter
  const [status, setStatus] = useState(""); // Status filter
  const { admin } = useContext(AdminContext);

  // Fetch accommodations from backend
  const getAccommodations = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/admin/accommodation`, {
        headers: {
          Authorization: admin.token,
        },
      });
      setAccommodations(data);
      setFilteredAccommodations(data); // Initial filtered data is the same as all data
    } catch (error) {
      console.log("Error getting accommodations:", error);
    }
  };

  useEffect(() => {
    getAccommodations();
  }, []);

  // Filter accommodations based on price, location, rating, gender, nearby college, and name
  const filterAccommodations = useCallback(() => {
    const filtered = accommodations.filter((accommodation) => {
      const lowestPrice = getLowestPrice(accommodation);
      const isGenderMatch =
        gender === "" || accommodation.recommended_for === gender; // Gender filter check
      const isNearbyCollegeMatch =
        nearbyCollege === "" ||
        (accommodation.nearby_locations.colleges &&
          accommodation.nearby_locations.colleges.some((college) =>
            college.toLowerCase().includes(nearbyCollege.toLowerCase())
          )); // Nearby college filter check
      const isNameMatch =
        name === "" ||
        accommodation.name.toLowerCase().includes(name.toLowerCase()); // Name filter check
        
      const isStatusMatch = status === "" || accommodation.status === status;

      return (
        lowestPrice >= priceRange[0] &&
        lowestPrice <= priceRange[1] &&
        (location === "" ||
          accommodation.address.city
            .toLowerCase()
            .includes(location.toLowerCase())) &&
        accommodation.rating >= rating &&
        isGenderMatch &&
        isNearbyCollegeMatch &&
        isNameMatch &&
        isStatusMatch
      );
    });
    setFilteredAccommodations(filtered);
  }, [
    accommodations,
    priceRange,
    location,
    rating,
    gender,
    nearbyCollege,
    name,
    status,
  ]);

  useEffect(() => {
    filterAccommodations();
  }, [
    priceRange,
    location,
    rating,
    gender,
    nearbyCollege,
    name,
    status,
    filterAccommodations,
  ]);

  // Helper function to get the lowest price of rooms
  const getLowestPrice = (accommodation) => {
    const prices = accommodation.rooms.map((room) => room.monthly_charge);
    return prices.length > 0 ? Math.min(...prices) : null;
  };

  // Handle price range change
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  // Handle location change
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  // Handle rating change
  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  // Handle gender change
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  // Handle nearby college search change
  const handleNearbyCollegeChange = (event) => {
    setNearbyCollege(event.target.value);
  };

  // Handle name search change
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // Handle status change
  const handleStatusChange = (event) => {
    setStatus(event.target.value); // Set the status filter value
  };
  // Reset Filters functionality
  const resetFilters = () => {
    setPriceRange([0, 20000]);
    setLocation("");
    setRating(0);
    setGender("");
    setNearbyCollege("");
    setName("");
    setStatus("");
  };

  return (
    <div className="accommodation-main">
      <div className="accomm-heading">
        <h1>Accommodation</h1>
        <div className="accomm-buttons">
          <Link to="/accommodation/viewAccommodationLeads">
            <button>View Leads</button>
          </Link>
          <Link to="/accommodation/add">
            <button>Add New</button>
          </Link>
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters">
        {/* Name Search */}
        <div className="name-filter">
          <p>Name</p>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Search by name"
          />
        </div>

        {/* Nearby College Search */}
        <div className="nearby-college-filter">
          <p>Nearby College</p>
          <input
            type="text"
            value={nearbyCollege}
            onChange={handleNearbyCollegeChange}
            placeholder="Search nearby college"
          />
        </div>

        <div className="price-filter">
          <p>Price Range</p>
          <Box sx={{ width: 200 }}>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              min={0}
              max={25000}
              step={250}
              valueLabelDisplay="auto"
            />
            <div className="price-values">
              <span>
                <FaIndianRupeeSign />
                {priceRange[0]}
              </span>
              <span>
                <FaIndianRupeeSign />
                {priceRange[1]}
              </span>
            </div>
          </Box>
        </div>
        {/* Status Filter */}
        <div className="status-filter">
          {/* <p>Status</p>
          <Select
            value={status}
            onChange={handleStatusChange}
            displayEmpty
            sx={{ width: 120 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select> */}
          <FormControl
            style={{
              width: "160px",
              marginBottom: "10px", // Increase bottom margin to lower the position
              padding: "8px",
              borderRadius: "8px",
            }}
          >
            <InputLabel style={{ color: "#333", fontSize: "14px" }}>
              Status
            </InputLabel>
            <Select
              value={status}
              onChange={handleStatusChange}
              style={{
                width: "100%",
                height: "50px", // Increase height of the dropdown
                backgroundColor: "#fff", // White background for the dropdown
                borderRadius: "4px",
                padding: "8px",
                fontSize: "14px",
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="location-filter">
          <p>Location</p>
          <input
            type="text"
            value={location}
            onChange={handleLocationChange}
            placeholder="Enter city"
          />
        </div>

        <div className="rating-filter">
          <p>Rating</p>
          <select value={rating} onChange={handleRatingChange}>
            <option value="0">All</option>
            <option value="4">4 stars & up</option>
            <option value="3">3 stars & up</option>
            <option value="1">1 star & up</option>
          </select>
        </div>

        {/* Gender Filter */}
        <div className="gender-filter">
          <p>Gender</p>
          <select value={gender} onChange={handleGenderChange}>
            <option value="">All</option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
            <option value="Both">Both</option>
          </select>
        </div>

        {/* Reset Filters Button */}
        <div className="reset-filters">
          <button onClick={resetFilters}>Reset Filters</button>
        </div>
      </div>

      {/* Accommodation Cards */}
      <div className="accomm-parent">
        {filteredAccommodations.map((accommodation, i) => (
          <div className="accomm-children" key={i}>
            <div className="accomm-gallery">
              <div className="accomm-image-container">
                <p
                  style={{
                    backgroundColor:
                      accommodation.status === "Pending"
                        ? "rgba(0, 0, 255, 0.7)" // lighter blue
                        : accommodation.status === "Approved"
                        ? "rgba(0, 128, 0, 0.7)" // lighter green
                        : accommodation.status === "Rejected"
                        ? "rgba(255, 0, 0, 0.7)" // lighter red
                        : "transparent",
                  }}
                >
                  {accommodation.status}
                </p>
                <img src={accommodation.images[0]} alt="Accommodation" />
              </div>
            </div>
            <div className="accomm-child-1">
              <div className="accomm-child-1-l">
                <h4>{accommodation.name}</h4>
                <p>
                  {accommodation.address.area},{accommodation.address.city},{" "}
                  {accommodation.address.state}
                </p>
              </div>
              <div className="accomm-child-1-r">
                <p>
                  <FaStar /> {accommodation.rating} | (
                  {accommodation.no_of_reviews}) Reviews
                </p>
              </div>
            </div>
            <div className="accomm-child-2">
              <div className="accomm-child-2-l">
                <p>Starting from</p>
                <p>
                  <span>{getLowestPrice(accommodation)} INR</span>/Month
                </p>
              </div>
              <div className="accomm-child-2-r">
                <Link to={`/accommodation/details/${accommodation._id}`}>
                  <button>View Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accommodation;
