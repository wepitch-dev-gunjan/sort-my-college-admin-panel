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
import RoomAvailableSelect from "../../components/formInputs/roomAvailableSelectField";
import axios from "axios";
import config from "@/config";
import { IoCloudUploadOutline } from "react-icons/io5";

import { AdminContext } from "../../context/AdminContext";
import { CiCircleRemove } from "react-icons/ci";


// spinner
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { toast } from "react-toastify";
import Spinner from "../../components/spinner/Index";
import { Link } from "react-router-dom";
const { backend_url } = config;
const AddAccommodation = () => {
  const { addAccommodationEnable, setAddAccommodationEnable } =
    useContext(AccommodationContext);
  const { admin } = useContext(AdminContext);
  const [nearbyColleges, setNearbyColleges] = useState(["", ""]);
  const [nearbyMetroStations, setNearbyMetroStations] = useState(["", ""]);
  const [nearbyHospitals, setNearbyHospitals] = useState(["", ""]);
  const [commonAmenities, setCommonAmenities] = useState(["", "", ""]);
  const [houseRules, setHouseRules] = useState(["", ""]);
  const [roomDetails, setRoomDetails] = useState(["", "", "", "", ""]);
  const [panCardImage, setPanCardImage] = useState(null);
  const [aadhaarImage, setAadhaarImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([
    {
      sharing_type: "",
      available: true,
      deposit_amount: 0,
      monthly_charge: 0,
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
        sharing_type: "",
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
   console.log('Name: ', name);
   console.log('Value: ', value);

   if (value instanceof File) {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (name === 'owner.aadhar_card') {
        setAadhaarImage(reader.result);
      } else if (name === 'owner.pan_card') {
        setPanCardImage(reader.result);
      }
    };
    reader.readAsDataURL(value);
  }


   const nameParts = name.split('.');
   if (nameParts.length === 1) {
     setFormData((prevState) => ({
       ...prevState,
       [name]: value,
     }));
   } else if (nameParts.length === 2) {
     setFormData((prevState) => ({
       ...prevState,
       [nameParts[0]]: {
         ...prevState[nameParts[0]],
         [nameParts[1]]: value,
       },
     }));
   }
 };

  // Nearby Colleges
  const handleNearbyCollegesChange = (index, value) => {
    const newNearbyColleges = [...nearbyColleges];
    newNearbyColleges[index] = value;
    setNearbyColleges(newNearbyColleges);
    // Update formData here
    setFormData((prevState) => ({
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
    setFormData((prevState) => ({
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
    setFormData((prevState) => ({
      ...prevState,
      nearby_locations: {
        ...prevState.nearby_locations,
        hospitals: newNearbyHospitals,
      },
    }));
  };
  const addNearbyHospitals = () => {
    setNearbyHospitals([...nearbyHospitals, ""]);
  };
  const removeNearbyHospitals = (index) => {
    const newNearbyHospitals = [...nearbyHospitals];
    newNearbyHospitals.splice(index, 1);
    setNearbyHospitals(newNearbyHospitals);
    setFormData((prevState) => ({
      ...prevState,
      nearby_locations: {
        ...prevState.nearby_locations,
        hospitals: newNearbyHospitals,
      },
    }));
  };
  // Nearby Hospitals

  //  Nearby Metro Stations
  const handleNearbyMetroStationsChange = (index, value) => {
    const newNearbyMetroStations = [...nearbyMetroStations];
    newNearbyMetroStations[index] = value;
    setNearbyMetroStations(newNearbyMetroStations);
    setFormData((prevState) => ({
      ...prevState,
      nearby_locations: {
        ...prevState.nearby_locations,
        metro_stations: newNearbyMetroStations,
      },
    }));
  };
  const addNearbyMetroStations = () => {
    setNearbyMetroStations([...nearbyMetroStations, ""]);
  };
  const removeNearbyMetroStations = (index) => {
    const newNearbyMetroStations = [...nearbyMetroStations];
    newNearbyMetroStations.splice(index, 1);
    setNearbyMetroStations(newNearbyMetroStations);
    setFormData((prevState) => ({
      ...prevState,
      nearby_locations: {
        ...prevState.nearby_locations,
        metro_stations: newNearbyMetroStations,
      },
    }));
  };
  //  Nearby Metro Stations

  // Common Area Amenities
  const handleCommonAmenitiesChange = (index, value) => {
    const newCommonAmenities = [...commonAmenities];
    newCommonAmenities[index] = value;
    setCommonAmenities(newCommonAmenities);
    setFormData((prevState) => ({
      ...prevState,
      common_area_amenities: newCommonAmenities,
    }));
  };
  const addCommonAmenities = () => {
    setCommonAmenities([...commonAmenities, ""]);
    // console.log(commonAmenities)
  };
  const removeCommonAmenities = (index) => {
    const newCommonAmenities = [...commonAmenities];
    newCommonAmenities.splice(index, 1);
    setCommonAmenities(newCommonAmenities);
    setFormData((prevState) => ({
      ...prevState,
      common_area_amenities: newCommonAmenities,
    }));
  };
  // Common Area Amenities

  // House Rules
  const handleHouseRulesChange = (index, value) => {
    const newHouseRules = [...houseRules];
    newHouseRules[index] = value;
    setHouseRules(newHouseRules);
    setFormData((prevState) => ({
      ...prevState,
      house_rules: newHouseRules,
    }));
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
  // Rooms
  const addRoom = () => {
    setRooms([
      ...rooms,
      {
        sharing_type: "Single",
        available: true,
        deposit_amount: 0,
        monthly_charge: 0,
        notice_period: "",
        details: [""],
      },
    ]);
    // Update formData here
    setFormData((prevState) => ({
      ...prevState,
      rooms: [
        ...prevState.rooms,
        {
          sharing_type: "Single",
          available: true,
          deposit_amount: "",
          monthly_charge: "",
          notice_period: "",
          details: [],
        },
      ],
    }));
  };

  const removeRoom = (index) => {
    const newRooms = [...rooms];
    newRooms.splice(index, 1);
    setRooms(newRooms);
    // Update formData here
    setFormData((prevState) => ({
      ...prevState,
      rooms: newRooms,
    }));
  };

  const handleChangeRoom = (index, field, value) => {
    const newRooms = [...rooms];
    newRooms[index][field] = value;
    setRooms(newRooms);
    // Update formData here
    setFormData((prevState) => ({
      ...prevState,
      rooms: newRooms,
    }));
  };

  // Function to handle changes in room details
  const handleChangeRoomDetail = (roomIndex, detailIndex, value) => {
    const newRooms = [...rooms];
    newRooms[roomIndex].details[detailIndex] = value;
    setRooms(newRooms);
    // Update formData here
    setFormData((prevState) => {
      const updatedRooms = [...prevState.rooms];
      updatedRooms[roomIndex].details = newRooms[roomIndex].details;
      return {
        ...prevState,
        rooms: updatedRooms,
      };
    });
  };

  // Function to remove a room detail
  const removeRoomDetail = (roomIndex, detailIndex) => {
    const newRooms = [...rooms];
    newRooms[roomIndex].details.splice(detailIndex, 1);
    setRooms(newRooms);
    // Update formData here
    setFormData((prevState) => {
      const updatedRooms = [...prevState.rooms];
      updatedRooms[roomIndex].details = newRooms[roomIndex].details;
      return {
        ...prevState,
        rooms: updatedRooms,
      };
    });
  };

  // Function to add a new room detail
  const addRoomDetail = (roomIndex) => {
    const newRooms = [...rooms];
    newRooms[roomIndex].details.push("");
    setRooms(newRooms);
    // Update formData here
    setFormData((prevState) => {
      const updatedRooms = [...prevState.rooms];
      updatedRooms[roomIndex].details = newRooms[roomIndex].details;
      return {
        ...prevState,
        rooms: updatedRooms,
      };
    });
  };



  // contact numbers
  const handleContactNumberChange = (index, value) => {
    const newContactNumbers = [...formData.owner.contact_numbers];
    newContactNumbers[index] = value;
    setFormData((prevState) => ({
      ...prevState,
      owner: {
        ...prevState.owner,
        contact_numbers: newContactNumbers,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "images") {
          formData.images.forEach((image) => {
            formDataToSend.append("images", image);
          });
        } else if (key === "owner" && formData.owner) {
          Object.keys(formData.owner).forEach((subKey) => {
            if (subKey === "aadhar_card" || subKey === "pan_card") {
              if (formData.owner[subKey]) {
                formDataToSend.append(subKey, formData.owner[subKey]);
              }
            } else {
              formDataToSend.append(`owner[${subKey}]`, formData.owner[subKey]);
            }
          });
        } else if (
          typeof formData[key] === "object" &&
          formData[key] !== null
        ) {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

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
      toast.success("Accommodation added successfully");
      setLoading(false);

      console.log("Accommodation added successfully:", response.data);
    } catch (error) {
      setLoading(false);
      console.log("Error in adding accommodation", error);
      toast.error("Error in adding accommodation");
    }
  };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevState) => ({
      ...prevState,
      images: files,
    }));
  };
  useEffect(() => {
    console.log("Updated FormData: ", formData);
  }, [formData]);

  

 const handleRemoveAdharImage = () => {
   setAadhaarImage(null);
   setFormData((prevState) => ({
     ...prevState,
     owner: {
       ...prevState.owner,
       aadhar_card: null,
     },
   }));
 };
 const handleRemovePanImage = () => {
   setPanCardImage(null);
   setFormData((prevState) => ({
     ...prevState,
     owner: {
       ...prevState.owner,
       pan_card: null,
     },
   }));
 };

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
                  onChange={(e) =>
                    handleChange(e.target.value, "owner.full_name")
                  }
                  name="owner.full_name"
                  value={formData.owner.full_name}
                  placeholder="Full Name"
                />

                <BasicDatePicker
                  onChange={(e) => handleChange(e.target.value, "owner.dob")}
                  value={formData.owner.dob}
                  placeholder="Date of Birth"
                />

                {/* <BasicSelect /> */}
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Gender
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formData.owner.gender}
                      label="Gender"
                      onChange={(e) =>
                        handleChange(e.target.value, "owner.gender")
                      }
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
                      onChange={(e) =>
                        handleContactNumberChange(index, e.target.value)
                      }
                      name={`contact_number_${index}`}
                      value={number}
                      placeholder={`Contact Number ${index + 1}`}
                    />
                  </div>
                ))}

                <BasicTextField
                  onChange={(e) => handleChange(e.target.value, "owner.email")}
                  placeholder="Email"
                />
              </div>
              {/* aadhar card */}
             <div className="row-form "
      style={{
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px dotted #BABABA',
        position: 'relative',
      }}
    >
      <input
        type="file"
        id="aadhar_card"
        name="aadhar_card"
        onChange={(e) => handleChange(e.target.files[0], 'owner.aadhar_card')}
        style={{ display: 'none' }}
      />
      <label
        htmlFor="aadhar_card"
        style={{
          width: 1000,
          color: 'grey',
          padding: '10px',
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        Upload Your Aadhaar Card here...
      </label>

    </div>

              {/* pan card */}
              <div
                className="row-form"
                style={{
                  height: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px dotted #BABABA",
                  position: "relative",
                }}
              >
                <input
                  type="file"
                  id="pan_card"
                  name="pan_card"
                  onChange={(e) =>
                    handleChange(e.target.files[0], "owner.pan_card")
                  }
                  style={{
                    display: "none",
                  }}
                />
                <label
                  htmlFor="pan_card"
                  style={{
                    width: 1000,
                    color: "grey",
                    padding: "10px",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  Upload Your Pan Card here...
                </label>
              </div>
      <div className="row-form">
      {aadhaarImage && (
        <div
          style={{
            // position: 'absolute',
            // top: 'calc(100% + 10px)',
            // maxHeight: '200px',
            // border: '1px solid #BABABA',
            padding: '10px',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src={aadhaarImage}
            alt="Aadhaar Card Preview"
            style={{
              maxHeight: '200px',
              maxWidth: '100%',
            }}
          />
          <CiCircleRemove 
            onClick={handleRemoveAdharImage}
            style={{
              // position: 'absolute',
              // top: '5px',
              right: '5px',
              border: 'none',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
         />
        </div>
      )}
      {/* pan card */}
       {panCardImage && (
        <div
          style={{
            // position: 'absolute',
            // top: 'calc(100% + 10px)',
            // maxHeight: '200px',
            // border: '1px solid #BABABA',
            padding: '10px',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src={panCardImage}
            alt="Aadhaar Card Preview"
            style={{
              maxHeight: '200px',
              maxWidth: '100%',
            }}
          />
          <CiCircleRemove 
            onClick={handleRemovePanImage}
            style={{
              // position: 'absolute',
              // top: '5px',
              right: '5px',
              border: 'none',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
         />
        </div>
      )}
            </div>
      </div>
          </div>
          <div className="property-info-main">
            <h2>Property Information: </h2>
            <div className="property-info-sub">

              {/* property images */}
              <div className="row-form" 
                style={{
                  height: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px dotted #BABABA",
                  position: "relative",
                }}
              >
                <input
                  type="file"
                  id="files"
                  name="files"
                  multiple={true}
                  onChange={handleImageChange}
                style = {{
                 display : "none",
                 // backgroundColor : "red"
                }}
                />
                <label
                  htmlFor="files"
                  style={{
                    width: 1000,
                    color: "grey",
                    padding: "10px",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  Upload Your Property Images here...
                </label>
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
                  placeholder="Direction URL"
                />
                 <div className="room-field total_beds">
                      {/* Total Beds */}
                      <BasicTextField
                        onChange={(e) =>
                         handleChange(
                          e.target.value,
                            "total_beds"
                          )
                        }
                        value={formData.total_beds}
                        placeholder="Total Beds"
                      />
                    </div>
              </div>
              <div className="row-form">
                <BasicTextField
                  onChange={(e) => handleChange(e.target.value, "address.area")}
                  value={formData.address.area}
                  placeholder="Area"
                />
                <BasicTextField
                  onChange={(e) => handleChange(e.target.value, "address.city")}
                  value={formData.address.city}
                  placeholder="City"
                />
                <BasicTextField
                  onChange={(e) =>
                    handleChange(e.target.value, "address.state")
                  }
                  value={formData.address.state}
                  placeholder="State"
                />
              </div>
              <div className="row-form">
                <BasicTextField
                  onChange={(e) =>
                    handleChange(e.target.value, "address.pin_code")
                  }
                  value={formData.address.pin_code}
                  placeholder="Pincode"
                />

                <RecommendedForRadioButtons
                  value={formData.recommended_for}
                  onChange={(e) =>
                    handleChange(e.target.value, "recommended_for")
                  }
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
                  <h4>Room {index + 1}</h4>
                  <div className="rooms-fields">
                    <div className="room-field type-select">
                      <FormControl fullWidth>
                        <InputLabel id={`sharing-type-label-${index}`}>
                          Sharing type
                        </InputLabel>
                        <Select
                          labelId={`sharing-type-label-${index}`}
                          id={`sharing-type-select-${index}`}
                          value={room.sharing_type}
                          label="Select sharing type"
                          onChange={(e) =>
                            handleChangeRoom(
                              index,
                              "sharing_type",
                              e.target.value
                            )
                          }
                        >
                          <MenuItem value="Single">Single</MenuItem>
                          <MenuItem value="Double">Double</MenuItem>
                          <MenuItem value="Triple">Triple</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="room-field available-select">
                      {/* Availability */}
                      <RoomAvailableSelect
                        onChange={(e) =>
                          handleChangeRoom(index, "available", e.target.value)
                        }
                        value={room.available}
                      />
                    </div>
                    <div className="room-field deposit-amount">
                      {/* Deposit Amount */}
                      <BasicTextField
                        onChange={(e) =>
                          handleChangeRoom(
                            index,
                            "deposit_amount",
                            e.target.value
                          )
                        }
                        value={room.deposit_amount}
                        placeholder="Deposit Amount (INR)"
                      />
                    </div>
                    <div className="room-field monthly-charge">
                      {/* Monthly Charges */}
                      <BasicTextField
                        onChange={(e) =>
                          handleChangeRoom(
                            index,
                            "monthly_charge",
                            e.target.value
                          )
                        }
                        value={room.monthly_charge}
                        placeholder="Monthly Charges (INR)"
                      />
                    </div>
                    <div className="room-field notice-period">
                      {/* Notice Period */}
                      <BasicTextField
                        onChange={(e) =>
                          handleChangeRoom(
                            index,
                            "notice_period",
                            e.target.value
                          )
                        }
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
                              onChange={(e) =>
                                handleChangeRoomDetail(
                                  index,
                                  detailIndex,
                                  e.target.value
                                )
                              }
                            />
                            {detailIndex > 0 && (
                              <button
                                className="delete-room-btn-detail"
                                type="button"
                                onClick={() =>
                                  removeRoomDetail(index, detailIndex)
                                }
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
                        onChange={(e) =>
                          handleHouseRulesChange(index, e.target.value)
                        }
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
                  value={formData.gate_opening_time}
                  onChange={(e) =>
                    handleChange(e.target.value, "gate_opening_time")
                  }
                  placeholder="Gate OpeningTime"
                />
                <BasicTimePicker
                  value={formData.gate_closing_time}
                  onChange={(e) =>
                    handleChange(e.target.value, "gate_closing_time")
                  }
                  placeholder="Gate Closing Time"
                />
              </div>
            </div>
          </div>
        </form>
        <div className="btn">
          <button onClick={handleSubmit}>
            {loading ? <Spinner /> : "Submit"}
          </button>
          <Link to="/accommodation">
            <button>Cancel</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddAccommodation;
