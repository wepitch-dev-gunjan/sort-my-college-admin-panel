import React, { useContext, useState } from 'react';
import './style.scss';
import { AccommodationContext } from "./../../context/AccommodationContext";
import BasicDatePicker from '../../components/formInputs/datePicker';
import BasicTextField from '../../components/formInputs/inputField';
import BasicSelect from '../../components/formInputs/genderSelectField';
import DragAndDropUploader from '../../components/formInputs/dragAndDropUploader';
import RecommendedForRadioButtons from '../../components/formInputs/recommendedForRadioButtons';
import { MdDeleteOutline } from "react-icons/md";
import BasicTimePicker from '../../components/formInputs/timePicker';
import RoomTypeSelect from '../../components/formInputs/roomTypeSelectField';
import RoomAvailableSelect from '../../components/formInputs/roomAvailableSelectField';


const AddAccommodation = () => {
    const { addAccommodationEnable, setAddAccommodationEnable } = useContext(AccommodationContext);
    const [ nearbyColleges, setNearbyColleges ] = useState(["", ""]);
    const [ nearbyMetroStations, setNearbyMetroStations ] = useState(["", ""]);
    const [ nearbyHospitals, setNearbyHospitals ] = useState(["", ""]);
    const [ commonAmenities, setCommonAmenities ] = useState(["", "", ""]);
    const [ houseRules, setHouseRules ] = useState(["", ""]);
    const [roomDetails, setRoomDetails] = useState(["", "", "", "", ""])
    const [rooms, setRooms] = useState([{
        sharing_type: '',
        available: true,
        deposit_amount: 0,
        montly_charge: 0,
        notice_period: '',
        details: ['']
    }])
    const [formData, setFormData] = useState({
        type: '',
        name: '',
        address: {
            area: '',
            city: '',
            state: '',
            pin_code: ''
        },
        direction: '',
        total_beds: 0,
        recommended_for: '',
        owner: {
            full_name: '',
            dob: '',
            gender: '',
            contact_numbers: [],
            email: '',
            aadhar_card: null,
            pan_card: null
        },
        rooms: [
            {
                sharing_type: '',
                available: true,
                deposit_amount: 0,
                monthly_charge: 0,
                notice_period: '',
                details: []
            }
        ],
        nearby_locations: {
            colleges: [],
            hospitals: [],
            metro_stations: []
        },
        rating: 0,
        common_area_amenities: [],
        house_rules: [],
        gate_opening_time: '',
        gate_closing_time: '',
        images: [] // For storing file data
    });
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle form submission, e.g., sending data to the server
        console.log(formData);
    };

    // Nearby Colleges 
    const handleNearbyCollegesChange = (index, value) => {
        const newNearbyColleges = [...nearbyColleges];
        newNearbyColleges[index] = value;
        // set nearby colleges into property details here 
    }
    const addNearbyColleges = () => {
        setNearbyColleges([...nearbyColleges, ""]);
    }
    const removeNearbyColleges = (index) => {
        const newNearbyColleges = [...nearbyColleges];
        newNearbyColleges.splice(index, 1);
        setNearbyColleges(newNearbyColleges);
    }
    // Nearby Colleges 

    // Nearby Hospitals 
    const handleNearbyHospitalsChange = (index, value) => {
        const newNearbyHospitals = [...nearbyHospitals];
        newNearbyHospitals[index] = value;
        // set nearby colleges into property details here 
    }
    const addNearbyHospitals = () => {
        setNearbyHospitals([...nearbyHospitals, ""]);
    }
    const removeNearbyHospitals = (index) => {
        const newNearbyHospitals = [...nearbyHospitals];
        newNearbyHospitals.splice(index, 1);
        setNearbyHospitals(newNearbyHospitals);
    }
    // Nearby Hospitals

    //  Nearby Metro Stations 
    const handleNearbyMetroStationsChange = (index, value) => {
        const newNearbyMetroStations = [...nearbyMetroStations];
        newNearbyMetroStations[index] = value;
        // set nearby colleges into property details here 
    }
    const addNearbyMetroStations = () => {
        setNearbyMetroStations([...nearbyMetroStations, ""]);
    }
    const removeNearbyMetroStations = (index) => {
        const newNearbyMetroStations = [...nearbyMetroStations];
        newNearbyMetroStations.splice(index, 1);
        setNearbyMetroStations(newNearbyMetroStations);
    }
    //  Nearby Metro Stations 
    
    // Common Area Amenities 
    const handleCommonAmenitiesChange = (index, value) => {
        const newCommonAmenities = [...commonAmenities];
        newCommonAmenities[index] = value;
        // set nearby colleges into property details here 
    }
    const addCommonAmenities = () => {
        setCommonAmenities([...commonAmenities, ""]);
    }
    const removeCommonAmenities = (index) => {
        const newCommonAmenities = [...commonAmenities];
        newCommonAmenities.splice(index, 1);
        setCommonAmenities(newCommonAmenities);
    }
    // Common Area Amenities 

    // House Rules
    const handleHouseRulesChange = (index, value) => {
        const newHouseRules = [...houseRules];
        newHouseRules.splice(index, 1);
        setHouseRules(newHouseRules)
    }
    const addHouseRules = () => {
        setHouseRules([...houseRules, ""]);
    }
    const removeHouseRules = (index) => {
        const newHouseRules = [...houseRules];
        newHouseRules.splice(index, 1);
        setHouseRules(newHouseRules)
    }
    // House Rules

    // Rooms 
    const addRoom = () => {
        setRooms([...rooms, {
            sharing_type: '',
            available: true,
            deposit_amount: 0,
            montly_charge: 0,
            notice_period: '',
            details: ['']
        }]);
    };
    const removeRoom = (index) => {
        console.log(index)
        const newRooms = [...rooms];
        newRooms.splice(index, 1);
        setRooms(newRooms)
    }
    const handleChangeRoom = (index, field, value) => {
        const newRooms = [...rooms];
        newRooms[index][field] = value;
        setRooms(newRooms)
    }
    // Rooms 

    // Room Details
    const handleRoomDetailsChange = (index, value) => {
        const newRoomDetails = [...roomDetails];
        newRoomDetails.splice(index, 1);
        setRoomDetails(newRoomDetails);
    }
    const addRoomDetails = () => {
        setRoomDetails([...roomDetails, ""]);
    }
    const removeRoomDetails = (index) => {
        const newRoomDetails = [...roomDetails];
        newRoomDetails.splice(index, 1);
        setRoomDetails(newRoomDetails);
    }
    // Room Details

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
                                    placeholder="Full Name"
                                />
                                <BasicDatePicker 
                                    placeholder="Date of Birth"
                                />
                                <BasicSelect />
                            </div>
                            <div className="row-form">
                                <BasicTextField
                                    placeholder="Phone Number"
                                />
                                <BasicTextField
                                    placeholder="Alternate Phone Number"
                                />
                                <BasicTextField
                                    placeholder="Email"
                                />
                            </div>
                            <div className="row-form">
                                <DragAndDropUploader 
                                    action=""
                                    placeholder="Upload your Photo Id Proof (Aadhar Card) here..."
                                />
                            </div>
                            <div className="row-form">
                                <DragAndDropUploader 
                                    action=""
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
                                    placeholder="Upload Photos of the Property here..."
                                />

                            </div>
                            <div className="row-form">
                                <BasicTextField
                                    placeholder="Name of the Property"
                                />
                                <BasicTextField
                                    placeholder="Direction URL"
                                />
                            </div>
                            <div className="row-form">
                                <BasicTextField
                                    placeholder="Area"
                                />
                                <BasicTextField
                                    placeholder="City"
                                />
                                <BasicTextField
                                    placeholder="State"
                                />
                            </div>
                            <div className="row-form">
                                <BasicTextField
                                    placeholder="Pincode"
                                />
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
                                                onChange={(e) => handleNearbyCollegesChange(index, e.target.value)} 
                                            />
                                            {index >= 0 && (
                                                <button className='remove-nearby-college-button' type="button" onClick={() => removeNearbyColleges(index)}>
                                                    <MdDeleteOutline />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <button type="button" className='add-nearby-college-button' onClick={addNearbyColleges}>
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
                                                onChange={(e) => handleNearbyHospitalsChange(index, e.target.value)} 
                                            />
                                            {index >= 0 && (
                                                <button className='remove-nearby-hosp-button' type="button" onClick={() => removeNearbyHospitals(index)}>
                                                    <MdDeleteOutline />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <button type="button" className='add-nearby-hosp-button' onClick={addNearbyHospitals}>
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
                                                onChange={(e) => handleNearbyMetroStationsChange(index, e.target.value)} 
                                            />
                                            {index >= 0 && (
                                                <button className='remove-nearby-ms-button' type="button" onClick={() => removeNearbyMetroStations(index)}>
                                                    <MdDeleteOutline />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <button type="button" className='add-nearby-ms-button' onClick={addNearbyMetroStations}>
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
                                            <p className='room-details-para'>Room Amenities: </p>
                                            <div className="room-details-sub">
                                                {roomDetails.map((roomDetail, index) => (
                                                    <div className="room-details-child">
                                                        <input
                                                        type='text'
                                                        value={roomDetail}
                                                        onChange={(e) => handleRoomDetailsChange(index, e.target.value)} 
                                                        />
                                                        {index >= 0 && (
                                                            <button className='delete-room-btn-detail' type='button' onClick={() => removeRoomDetails(index)} >
                                                                <MdDeleteOutline />
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            <button className='add-room-detail-btn' type='button' onClick={addRoomDetails}>Add Room Amenity</button>
                                        </div>
                                    </div>
                                    <button className='delete-room-btn' type='button' onClick={() => removeRoom(index)}>
                                        <MdDeleteOutline /> <p>Delete Room</p>
                                    </button>
                                </div>
                            ))}
                            <button className='add-room-btn' type='button' onClick={addRoom} >Add Room</button>
                        </div>
                    </div>
                    <div className="additional-info-main">
                        <h2>Additional Information: </h2>
                        <div className="additional-info-sub">
                            <div className="common-area-amen-main">
                                <h4>Common Area Amenities: </h4>
                                <div className="common-area-amen-sub">
                                    {commonAmenities.map((ca, index) => (
                                        <div className="ca-children">
                                            <input 
                                                type="text"
                                                value={ca}
                                                onChange={(e) => handleCommonAmenitiesChange(index)}
                                            />
                                            {index >= 0 && (
                                                <button type="button" className='ca-delete-button' onClick={() => removeCommonAmenities(index)}>
                                                    <MdDeleteOutline />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <button className='add-common-area-amen-button' type="button" onClick={addCommonAmenities}>
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
                                                onChange={(e) => handleHouseRulesChange(index)}
                                            />
                                            {index >= 0 && (
                                                <button type="button" className='ca-delete-button' onClick={() => removeHouseRules(index)}>
                                                    <MdDeleteOutline />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <button className='add-common-area-amen-button' type="button" onClick={addHouseRules}>
                                    Add a New House Rule
                                </button>
                            </div>

                            <div className="gate-timings">
                                <BasicTimePicker placeholder="Gate Opening Time" />
                                <BasicTimePicker placeholder="Gate Closing Time"/>
                            </div>

                        </div>
                    </div>
                   
                    
                </form>

            </div>
        </div>
    );
};

export default AddAccommodation;
