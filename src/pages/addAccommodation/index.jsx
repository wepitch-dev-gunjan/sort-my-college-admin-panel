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


const AddAccommodation = () => {
    const { addAccommodationEnable, setAddAccommodationEnable } = useContext(AccommodationContext);
    const [ nearbyColleges, setNearbyColleges ] = useState([""]);
    const [ nearbyMetroStations, setNearbyMetroStations ] = useState([""]);
    const [ nearbyHospitals, setNearbyHospitals ] = useState([""]);
    const [ commonAmenities, setCommonAmenities ] = useState([""]);
    const [ houseRules, setHouseRules ] = useState([""]);
    const [formData, setFormData] = useState({
        name: '',
        address: {
            area: '',
            city: '',
            state: ''
        },
        images: [],
        rating: 0,
        reviews: 0,
        starting_from: {
            amount: 0,
            currency: 'INR',
            frequency: 'month'
        },
        direction: '',
        rooms_offered: {
            single_sharing: { amount: 0 },
            double_sharing: { amount: 0 },
            triple_sharing: { amount: 0 }
        },
        accommodating_for: ['Boys'],
        near_by_locations: {
            colleges: [],
            hospitals: [],
            metro_stations: []
        },
        feedback: ''
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


    return (
        <div className="add-accomm-main">
            <div className="add-accomm-sub">
                <div className="add-accomm-heading">
                    <h1>Add Accommodation</h1>
                </div>
                <form className="add-accomm-form">
                    <div className="owners-info-main">
                        <h2>Owner's Information</h2>
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
                        <h2>Property Information</h2>
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
                            <h4>Nearby Colleges</h4>
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
                                    <button type="button" className='add-nearby-college-button' onClick={addNearbyColleges}>
                                        Add a Nearby College
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="nearby-locations-main nearby-hosp-main">
                            <h4>Nearby Hospitals</h4>
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
                                    <button type="button" className='add-nearby-hosp-button' onClick={addNearbyHospitals}>
                                        Add a Nearby Hospital
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="nearby-locations-main nearby-ms-main">
                            <h4>Nearby Metro Stations</h4>
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
                                    <button type="button" className='add-nearby-ms-button' onClick={addNearbyMetroStations}>
                                        Add a Nearby Metro Station
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rooms-offered-main">
                        <h2>Rooms Offered</h2>
                        <div className="rooms-offered-sub">
                                    
                        </div>
                    </div>
                    <div className="additional-info-main">
                        <h2>Additional Information</h2>
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
