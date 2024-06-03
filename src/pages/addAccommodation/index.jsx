import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { AccommodationContext } from "./../../context/AccommodationContext";
import BasicDatePicker from "../../components/formInputs/datePicker";
import BasicTextField from "../../components/formInputs/inputField";
import BasicSelect from "../../components/formInputs/genderSelectField";
import DragAndDropUploader from "../../components/formInputs/dragAndDropUploader";
import RecommendedForRadioButtons from "../../components/formInputs/recommendedForRadioButtons";
import { MdDeleteOutline } from "react-icons/md";
import BasicTimePicker from "../../components/formInputs/timePicker";
import RoomTypeSelect from "../../components/formInputs/roomTypeSelectField";
import RoomAvailableSelect from "../../components/formInputs/roomAvailableSelectField";
import axios from "axios";
import config from "@/config";
import { AdminContext } from "../../context/AdminContext";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
const { backend_url } = config;
const AddAccommodation = () => {
  const { addAccommodationEnable, setAddAccommodationEnable } =
    useContext(AccommodationContext);
    const {admin } = useContext(AdminContext);
  const [nearbyColleges, setNearbyColleges] = useState(["", ""]);
  const [nearbyMetroStations, setNearbyMetroStations] = useState(["", ""]);
  const [nearbyHospitals, setNearbyHospitals] = useState(["", ""]);
  const [commonAmenities, setCommonAmenities] = useState(["", "", ""]);
  const [houseRules, setHouseRules] = useState(["", ""]);
  const [roomDetails, setRoomDetails] = useState(["", "", "", "", ""]);
  const [rooms, setRooms] = useState([
    {
      sharing_type: "",
      available: true,
      deposit_amount: 0,
      montly_charge: 0,
      notice_period: "",
      details: [""],
    },
  ]);
  const [formData, setFormData] = useState({
    type: "Hostel",
    name: "",
    address: {
      area: "",
      city: "",
      state: "",
      pin_code: "",
    },
    direction: "",
    total_beds: 0,
    recommended_for: "Boys",
    owner: {
      full_name: "",
      dob: "",
      gender: "",
      contact_numbers: ["", ""],
      email: "",
      aadhar_card: null,
      pan_card: null,
    },
    rooms: [
      {
        sharing_type: "Single",
        available: true,
        deposit_amount: "",
        monthly_charge: "",
        notice_period: "",
        details: [],
      },
    ],
    nearby_locations: {
      colleges: [],
      hospitals: [],
      metro_stations: [],
    },
    rating: 0,
    common_area_amenities: [],
    house_rules: [],
    gate_opening_time: "",
    gate_closing_time: "",
    images: [], // For storing file data
  });



  const handleChange = (value, name) => {
   console.log("Name: ", name)
   console.log("Value: ", value)
   const nameParts = name.split('.');
   if (nameParts.length === 1) {
       setFormData(prevState => ({
           ...prevState,
           [name]: value,
       }));
   } else if (nameParts.length === 2) {
       setFormData(prevState => ({
           ...prevState,
           [nameParts[0]]: {
               ...prevState[nameParts[0]],
               [nameParts[1]]: value,
           },
       }));
   }
   console.log("Form Data: ",formData)
 };
  // Nearby Colleges
  const handleNearbyCollegesChange = (index, value) => {
   const newNearbyColleges = [...nearbyColleges];
   newNearbyColleges[index] = value;
   setNearbyColleges(newNearbyColleges);
   // Update formData here
   setFormData(prevState => ({
     ...prevState,
     nearby_locations: {
       ...prevState.nearby_locations,
       colleges: newNearbyColleges,
     },
   }));
 };
   const addNearbyColleges = () => {
    setNearbyColleges([...nearbyColleges, ""]);
  };
  const removeNearbyColleges = (index) => {
   const newNearbyColleges = [...nearbyColleges];
   newNearbyColleges.splice(index, 1);
   setNearbyColleges(newNearbyColleges);
   // Update formData here
   setFormData(prevState => ({
     ...prevState,
     nearby_locations: {
       ...prevState.nearby_locations,
       colleges: newNearbyColleges,
     },
   }));
 };
  // Nearby Colleges

  // Nearby Hospitals
  const handleNearbyHospitalsChange = (index, value) => {
    const newNearbyHospitals = [...nearbyHospitals];
    newNearbyHospitals[index] = value;
    setNearbyHospitals(newNearbyHospitals);
    // set nearby colleges into property details here
  };
  const addNearbyHospitals = () => {
    setNearbyHospitals([...nearbyHospitals, ""]);
  };
  const removeNearbyHospitals = (index) => {
    const newNearbyHospitals = [...nearbyHospitals];
    newNearbyHospitals.splice(index, 1);
    setNearbyHospitals(newNearbyHospitals);
  };
  // Nearby Hospitals

  //  Nearby Metro Stations
  const handleNearbyMetroStationsChange = (index, value) => {
    const newNearbyMetroStations = [...nearbyMetroStations];
    newNearbyMetroStations[index] = value;
    setNearbyMetroStations(newNearbyMetroStations);
    // set nearby colleges into property details here
  };
  const addNearbyMetroStations = () => {
    setNearbyMetroStations([...nearbyMetroStations, ""]);
  };
  const removeNearbyMetroStations = (index) => {
    const newNearbyMetroStations = [...nearbyMetroStations];
    newNearbyMetroStations.splice(index, 1);
    setNearbyMetroStations(newNearbyMetroStations);
  };
  //  Nearby Metro Stations

  // Common Area Amenities
  const handleCommonAmenitiesChange = (index, value) => {
    const newCommonAmenities = [...commonAmenities];
    newCommonAmenities[index] = value;
    setCommonAmenities(newCommonAmenities);
  };

  const addCommonAmenities = () => {
    setCommonAmenities([...commonAmenities, ""]);
  };
  const removeCommonAmenities = (index) => {
    const newCommonAmenities = [...commonAmenities];
    newCommonAmenities.splice(index, 1);
    setCommonAmenities(newCommonAmenities);
  };
    // Common Area Amenities

  // House Rules
  const handleHouseRulesChange = (index, value) => {
    const newHouseRules = [...houseRules];
    newHouseRules[index] = value;
    setHouseRules(newHouseRules);
  };
  const addHouseRules = () => {
    setHouseRules([...houseRules, ""]);
  };
  const removeHouseRules = (index) => {
    const newHouseRules = [...houseRules];
    newHouseRules.splice(index, 1);
    setHouseRules(newHouseRules);
  };
  // House Rules

  // Rooms
  const addRoom = () => {
    setRooms([
      ...rooms,
      {
        sharing_type: "",
        available: true,
        deposit_amount: 0,
        montly_charge: 0,
        notice_period: "",
        details: [""],
      },
    ]);
  };
  const removeRoom = (index) => {
    console.log(index);
    const newRooms = [...rooms];
    newRooms.splice(index, 1);
    console.log("New Rooms:", newRooms)
    setRooms(newRooms);
    console.log("Rooms: ", rooms)
  };
  const handleChangeRoom = (index, field, value) => {
    const newRooms = [...rooms];
    newRooms[index][field] = value;
    setRooms(newRooms);
  };
  // // Rooms

  // Function to handle changes in room details
    const handleChangeRoomDetail = (roomIndex, detailIndex, value) => {
      const newRooms = [...rooms];
      newRooms[roomIndex].details[detailIndex] = value;
      setRooms(newRooms);
    };

    // Function to remove a room detail
    const removeRoomDetail = (roomIndex, detailIndex) => {
      const newRooms = [...rooms];
      newRooms[roomIndex].details.splice(detailIndex, 1);
      setRooms(newRooms);
    };

    // Function to add a new room detail
    const addRoomDetail = (roomIndex) => {
      const newRooms = [...rooms];
      newRooms[roomIndex].details.push("");
      setRooms(newRooms);
    };


  // // Room Details
  // const handleRoomDetailsChange = (index, value) => {
  //     const newRoomDetails = [...roomDetails];
  //     newRoomDetails.splice(index, 1);
  //     setRoomDetails(newRoomDetails);
  // }
  // Room Details
  const handleRoomDetailsChange = (index, value) => {
    const newRoomDetails = [...roomDetails];
    newRoomDetails[index] = value;
    setRoomDetails(newRoomDetails);
  };

  const addRoomDetails = () => {
    setRoomDetails([...roomDetails, ""]);
  };

  const removeRoomDetails = (index) => {
    const newRoomDetails = [...roomDetails];
    newRoomDetails.splice(index, 1);
    setRoomDetails(newRoomDetails);
  };
// for cancel form
const handleCancel = async () =>{
 
}

// contact numbers 
     const handleContactNumberChange = (index, value) => {
      const newContactNumbers = [...formData.owner.contact_numbers];
      newContactNumbers[index] = value;
      setFormData(prevState => ({
        ...prevState,
        owner: {
          ...prevState.owner,
          contact_numbers: newContactNumbers,
        },
      }));
     };

     const addContactNumber = () => {
      setFormData(prevState => ({
        ...prevState,
        owner: {
          ...prevState.owner,
          contact_numbers: [...prevState.owner.contact_numbers, ""],
        },
      }));
     };

     const removeContactNumber = (index) => {
      const newContactNumbers = [...formData.owner.contact_numbers];
      newContactNumbers.splice(index, 1);
      setFormData(prevState => ({
        ...prevState,
        owner: {
          ...prevState.owner,
          contact_numbers: newContactNumbers,
        },
      }));
     };

// contact number 


  // for adding a course
  const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     const formDataToSend = new FormData();
     Object.keys(formData).forEach((key) => {
       if (key === "images") {
         formData.images.forEach((image) => {
           formDataToSend.append("images", image);
         });
       } else if (typeof formData[key] === "object" && formData[key] !== null) {
         formDataToSend.append(key, JSON.stringify(formData[key]));
       } else {
         formDataToSend.append(key, formData[key]);
       }
     });
     // Verify that images are added
     console.log("Form Data before submission:", formDataToSend);
     const response = await axios.post(
       `${backend_url}/admin/accommodation`,
       formDataToSend,
       {
         headers: {
           Authorization: admin.token,
           "Content-Type": "multipart/form-data",
         },
       }
     );
     console.log("Accommodation added successfully:", response.data);
   } catch (error) {
     console.log("Error in adding accommodation", error);
   }
 };
  const handleImageChange = (e) => {
   const files = Array.from(e.target.files);
   setFormData((prevState) => ({
     ...prevState,
     images: files,
   }));
   console.log("FileSS: ", files)
 };
 useEffect(() => {
   console.log("Updated FormData: ", formData);
 }, [formData]);
  return (
    <div className="add-accomm-main">
      <div className="add-accomm-sub">
        <div className="add-accomm-heading">
          <h1>Add Accommodation</h1>
        </div>
        <form className="add-accomm-form">
          <div className="owners-info-main">
            <h2>Owner's Information: </h2>
            <div className="owners-info-sub">
              <div className="row-form">

              <BasicTextField
    onChange={(e) => handleChange(e.target.value, "owner.full_name")}
    name = "owner.full_name"
    value={formData.owner.full_name}               
    placeholder="Full Name" />


                <BasicDatePicker 
    onChange={(e) => handleChange(e.target.value, "owner.dob")}
    value={formData.owner.dob}
                placeholder="Date of Birth" />

                {/* <BasicSelect /> */}
                <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formData.owner.gender}
          label="Gender"
          onChange={(e) => handleChange(e.target.value, "owner.gender")}
          >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>
    </Box>

              </div>
              <div className="row-form">
              {formData.owner.contact_numbers.map((number, index) => (
                <div key={index} className="contact-number-field">
                  <BasicTextField
                    onChange={(e) => handleContactNumberChange(index, e.target.value)}
                    name={`contact_number_${index}`}
                    value={number}
                    placeholder={`Contact Number ${index + 1}`}
                  />

                </div>
              ))}

                {/* <BasicTextField 
    onChange={(e) => handleChange(e.target.value, "owner.contact_numbers[]")}
    value={formData.owner.contact_numbers}
                placeholder="Phone Number" />

                <BasicTextField 
    onChange={(e) => handleChange(e.target.value, "owner.contact_numbers")}
    value={formData.owner.contact_numbers}
                placeholder="Alternate Phone Number" /> */}

                <BasicTextField 
    onChange={(e) => handleChange(e.target.value, "owner.email")}
    // value = {formData.owner.email}
                placeholder="Email" />

              </div>
              <div className="row-form">

                <DragAndDropUploader
                  action=""
                  onChange={(e) => handleChange(e.target.value, "owner.aadhar_card")}
                  value={formData.owner.aadhar_card}
                  placeholder="Upload your Photo Id Proof (Aadhar Card) here..."
                />

              </div>
              <div className="row-form">

                <DragAndDropUploader
                  action=""
                  onChange={(e) => handleChange(e)}
                  value={formData.owner.pan_card}
                  placeholder="Upload your PAN Card here..."
                />
              </div>
            </div>
          </div>
          <div className="property-info-main">
            <h2>Property Information: </h2>
            <div className="property-info-sub">
              <div className="row-form">
                <DragAndDropUploader
                multiple = {true}
                  action=""
                 onChange = {handleImageChange}
                  placeholder="Upload Photos of the Property here..."
                />
              </div>
<div className="row-form width-100-cus">
                <input type="file" id="files" name="files" multiple onChange={handleImageChange} />
  </div>
              <div className="row-form">

              <BasicTextField 
                  onChange={(e) => handleChange(e.target.value, "name")}
                  value={formData.name}
                  name="name" // Set the name attribute here
                  placeholder="Name of the Property" 
              />


                <BasicTextField
                  onChange={(e) => handleChange(e.target.value, "direction")}
                  value={formData.direction}
                placeholder="Direction URL" />

              </div>
              <div className="row-form">
                <BasicTextField 
                  onChange={(e) => handleChange(e.target.value, "address.area")}
                  value={formData.address.area}
                placeholder="Area" />
                <BasicTextField 
            onChange={(e) => handleChange(e.target.value, "address.city")}
                value={formData.address.city}
                placeholder="City" />
                <BasicTextField 
              onChange={(e) => handleChange(e.target.value, "address.state")}
                value={formData.address.state}
                placeholder="State" />
              </div>
              <div className="row-form">
                <BasicTextField 
                onChange={(e) => handleChange(e.target.value , "address.pin_code")}
                value={formData.address.pin_code}
                placeholder="Pincode" />

               <RecommendedForRadioButtons
                 value={formData.recommended_for} 
                 onChange={(e) => handleChange(e.target.value, "recommended_for")}
               />


               
              </div>
            </div>
          </div>
          <div className="nearby-main">
            <div className="nearby-locations-main nearby-colleges-main">
              <h4>Nearby Colleges:</h4>
              <div className="nearby-locations-sub">
                <div className="nearby-colleges">
                  {nearbyColleges.map((college, index) => (
                    <div className="nearby-colleges-child">
                      <input
                        type="text"
                        value={college}
                        onChange={(e) =>
                          handleNearbyCollegesChange(index, e.target.value)
                        }
                      />
                      {index >= 0 && (
                        <button
                          className="remove-nearby-college-button"
                          type="button"
                          onClick={() => removeNearbyColleges(index)}
                        >
                          <MdDeleteOutline />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="add-nearby-college-button"
                  onClick={addNearbyColleges}
                >
                  Add a Nearby College
                </button>
              </div>
            </div>
            <div className="nearby-locations-main nearby-hosp-main">
              <h4>Nearby Hospitals:</h4>
              <div className="nearby-locations-sub">
                <div className="nearby-hosp">
                  {nearbyHospitals.map((hospital, index) => (
                    <div className="nearby-hosp-child">
                      <input
                        type="text"
                        value={hospital}
                        onChange={(e) =>
                          handleNearbyHospitalsChange(index, e.target.value)
                        }
                      />
                      {index >= 0 && (
                        <button
                          className="remove-nearby-hosp-button"
                          type="button"
                          onClick={() => removeNearbyHospitals(index)}
                        >
                          <MdDeleteOutline />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="add-nearby-hosp-button"
                  onClick={addNearbyHospitals}
                >
                  Add a Nearby Hospital
                </button>
              </div>
            </div>
            <div className="nearby-locations-main nearby-ms-main">
              <h4>Nearby Metro Stations:</h4>
              <div className="nearby-locations-sub">
                <div className="nearby-ms">
                  {nearbyMetroStations.map((ms, index) => (
                    <div className="nearby-ms-child">
                      <input
                        type="text"
                        value={ms}
                        onChange={(e) =>
                          handleNearbyMetroStationsChange(index, e.target.value)
                        }
                      />
                      {index >= 0 && (
                        <button
                          className="remove-nearby-ms-button"
                          type="button"
                          onClick={() => removeNearbyMetroStations(index)}
                        >
                          <MdDeleteOutline />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="add-nearby-ms-button"
                  onClick={addNearbyMetroStations}
                >
                  Add a Nearby Metro Station
                </button>
              </div>
            </div>
          </div>
          <div className="rooms-offered-main">
            <h2>Rooms Offered:</h2>
            <div className="rooms-offered-sub">
              {rooms.map((room, index) => (
                  <div className="rooms-children" key={index}>
                      <h4>Room {index}</h4>
                      <div className="rooms-fields">
                          <div className="room-field type-select">
                              {/* Sharing Type */}
                              <RoomTypeSelect 
                                  onChange={(e) => handleChangeRoom(index, 'sharing_type', e.target.value)}
                                  value={room.sharing_type}
                              />
                          </div>
                          <div className="room-field available-select">
                              {/* Availability */}
                              <RoomAvailableSelect 
                                  onChange={(e) => handleChangeRoom(index, 'available', e.target.value)}
                                  value={room.available}
                              />
                          </div>
                          <div className="room-field deposit-amount">
                              {/* Deposit Amount */}
                              <BasicTextField 
                                  onChange={(e) => handleChangeRoom(index, 'deposit_amount', e.target.value)}
                                  value={room.deposit_amount}
                                  placeholder="Deposit Amount (INR)" 
                              />
                          </div>
                          <div className="room-field monthly-charge">
                              {/* Monthly Charges */}
                              <BasicTextField 
                                  onChange={(e) => handleChangeRoom(index, 'montly_charge', e.target.value)}
                                  value={room.montly_charge}
                                  placeholder="Monthly Charges (INR)" 
                              />
                          </div>
                          <div className="room-field notice-period">
                              {/* Notice Period */}
                              <BasicTextField 
                                  onChange={(e) => handleChangeRoom(index, 'notice_period', e.target.value)}
                                  value={room.notice_period}
                                  placeholder="Notice Period (in days)" 
                              />
                          </div>
                          <div className="room-details-main">
                              <p className="room-details-para">Room Amenities: </p>
                              <div className="room-details-sub">
                                  {/* Room Details */}
                                  {room.details.map((detail, detailIndex) => (
                                      <div className="room-details-child" key={detailIndex}>
                                          <input
                                              type="text"
                                              value={detail}
                                              onChange={(e) => handleChangeRoomDetail(index, detailIndex, e.target.value)}
                                          />
                                          {detailIndex > 0 && (
                                              <button
                                                  className="delete-room-btn-detail"
                                                  type="button"
                                                  onClick={() => removeRoomDetail(index, detailIndex)}
                                              >
                                                  <MdDeleteOutline />
                                              </button>
                                          )}
                                      </div>
                                  ))}
                                  <button
                                      className="add-room-detail-btn"
                                      type="button"
                                      onClick={() => addRoomDetail(index)}
                                  >
                                      Add Room Amenity
                                  </button>
                              </div>
                          </div>
                          {/* Add other input fields for room details similarly */}
                      </div>
                      <button
                          className="delete-room-btn"
                          type="button"
                          onClick={() => removeRoom(index)}
                      >
                          <MdDeleteOutline /> <p>Delete Room</p>
                      </button>
                  </div>
              ))}

              <button className="add-room-btn" type="button" onClick={addRoom}>
                Add Room
              </button>
            </div>
          </div>
          <div className="additional-info-main">
            <h2>Additional Information: </h2>
            <div className="additional-info-sub">
              <div className="common-area-amen-main">
                <h4>Common Area Amenities: </h4>
                <div className="common-area-amen-sub">
                  {commonAmenities.map((ca, index) => (
                    <div className="ca-children" key={index}>
                      <input
                        type="text"
                        value={ca}
                        onChange={(e) =>
                          handleCommonAmenitiesChange(index, e.target.value)
                        }
                      />
                      {index >= 0 && (
                        <button
                          type="button"
                          className="ca-delete-button"
                          onClick={() => removeCommonAmenities(index)}
                        >
                          <MdDeleteOutline />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  className="add-common-area-amen-button"
                  type="button"
                  onClick={addCommonAmenities}
                >
                  Add a New Amenity
                </button>
              </div>

              <div className="common-area-amen-main">
                <h4>House Rules: </h4>
                <div className="common-area-amen-sub">
                  {houseRules.map((hr, index) => (
                    <div className="hr-children">
                      <input
                        type="text"
                        value={hr}
                        onChange={(e) => handleHouseRulesChange(index ,e.target.value)}
                      />
                      {index >= 0 && (
                        <button
                          type="button"
                          className="ca-delete-button"
                          onClick={() => removeHouseRules(index)}
                        >
                          <MdDeleteOutline />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  className="add-common-area-amen-button"
                  type="button"
                  onClick={addHouseRules}
                >
                  Add a New House Rule
                </button>
              </div>

              <div className="gate-timings">
                <BasicTimePicker 
                onChange={(e) => handleChange(e)} 
                placeholder="Gate OpeningTime" />
                <BasicTimePicker 
                onChange={(e) => handleChange(e)}
                placeholder="Gate Closing Time" />
              </div>
            </div>
          </div>
        </form>
        <div className="btn">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={handleChange}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddAccommodation;
