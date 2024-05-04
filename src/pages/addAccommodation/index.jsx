import React, { useContext, useState } from "react";
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
      gender: "Female",
      contact_numbers: [],
      email: "",
      aadhar_card: null,
      pan_card: null,
    },
    rooms: [
      {
        sharing_type: "Single",
        available: true,
        deposit_amount: 0,
        monthly_charge: 0,
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


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Nearby Colleges
  const handleNearbyCollegesChange = (index, value) => {
    const newNearbyColleges = [...nearbyColleges];
    newNearbyColleges[index] = value;
    setNearbyColleges(newNearbyColleges);
    // set nearby colleges into property details here
  };
  const addNearbyColleges = () => {
    setNearbyColleges([...nearbyColleges, ""]);
  };
  const removeNearbyColleges = (index) => {
    const newNearbyColleges = [...nearbyColleges];
    newNearbyColleges.splice(index, 1);
    setNearbyColleges(newNearbyColleges);
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
    setRooms(newRooms);
  };
  const handleChangeRoom = (index, field, value) => {
    const newRooms = [...rooms];
    newRooms[index][field] = value;
    setRooms(newRooms);
  };
  // // Rooms

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
  // for adding a course
  const handleSubmit = async (e) => {
   // e.preventDefault();
try {
 const response = await axios.post(`${backend_url}/admin/accommodation`,formData,{
  headers : {
   Authorization  : admin.token, 
  }
 });
 console.log("Accommodation added successfully:", response.data);
} catch (error) {
 console.log("error in adding accommodation" ,error);
}
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
                onChange={(e) => handleChange(e)}
                value={formData.owner.full_name}               
                 placeholder="Full Name" />
                <BasicDatePicker 
                onChange={(e) => handleChange(e)}
                value={formData.owner.dob}
                placeholder="Date of Birth" />
                <BasicSelect />
              </div>
              <div className="row-form">
                <BasicTextField 
                onChange={(e) => handleChange(e)}
                value={formData.owner.contact_numbers[0]}
                placeholder="Phone Number" />
                <BasicTextField 
                onChange={(e) => handleChange(e)}
                 value={formData.owner.contact_numbers[1]}
                placeholder="Alternate Phone Number" />
                <BasicTextField 
                onChange={(e) => handleChange(e)}
                value = {formData.owner.email}
                placeholder="Email" />
              </div>
              <div className="row-form">
                <DragAndDropUploader
                  action=""
                  onChange={(e) => handleChange(e)}
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
                  action=""
                  onChange={(e) => handleChange(e)}
                  placeholder="Upload Photos of the Property here..."
                />
              </div>
              <div className="row-form">
                <BasicTextField 
                onChange={(e) => handleChange(e)}
                value={formData.name}
                placeholder="Name of the Property" />
                <BasicTextField
                onChange={(e) => handleChange(e)}
                value={formData.direction}
                placeholder="Direction URL" />
              </div>
              <div className="row-form">
                <BasicTextField 
                onChange={(e) => handleChange(e)}
                value={formData.address.area}
                placeholder="Area" />
                <BasicTextField 
                onChange={(e) => handleChange(e)}
                value={formData.address.city}
                placeholder="City" />
                <BasicTextField 
                onChange={(e) => handleChange(e)}
                value={formData.address.state}
                placeholder="State" />
              </div>
              <div className="row-form">
                <BasicTextField 
                onChange={(e) => handleChange(e)}
                value={formData.address.pincode}
                placeholder="Pincode" />
                <RecommendedForRadioButtons />
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
                <div className="rooms-children">
                  <h4>Room {index + 1}</h4>
                  <div className="rooms-fields">
                    <div className="room-field type-select">
                      <RoomTypeSelect />
                    </div>
                    <div className="room-field available-select">
                      <RoomAvailableSelect />
                    </div>
                    <div className="room-field deposit-amount">
                      <BasicTextField placeholder="Deposit Amount (INR)" />
                    </div>
                    <div className="room-field monthly-charge">
                      <BasicTextField placeholder="Monthly Charges (INR)" />
                    </div>
                    <div className="room-field notice-period">
                      <BasicTextField placeholder="Notice Period (in days)" />
                    </div>
                    <div className="room-details-main">
                      <p className="room-details-para">Room Amenities: </p>
                      <div className="room-details-sub">
                        {roomDetails.map((roomDetail, index) => (
                          <div className="room-details-child">
                            <input
                              type="text"
                              value={roomDetail}
                              onChange={(e) =>
                                handleRoomDetailsChange(index, e.target.value)
                              }
                            />
                            {index >= 0 && (
                              <button
                                className="delete-room-btn-detail"
                                type="button"
                                onClick={() => removeRoomDetails(index)}
                              >
                                <MdDeleteOutline />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      <button
                        className="add-room-detail-btn"
                        type="button"
                        onClick={addRoomDetails}
                      >
                        Add Room Amenity
                      </button>
                    </div>
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
