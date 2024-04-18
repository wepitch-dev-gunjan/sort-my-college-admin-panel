import React, { useContext, useState } from 'react';
import './style.scss';
import { AccommodationContext } from "./../../context/AccommodationContext";

const AddAccommodation = () => {
    const { addAccommodationEnable, setAddAccommodationEnable } = useContext(AccommodationContext);
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


    return (
        <div className="add-accomm-popup-main">
            <div className="add-accomm-popup-sub">
                <div className="add-accomm-heading">
                    <h1>Add Accommodation</h1>
                </div>
                <div className="add-accomm-form">
                    <div className="add-accomm-image">
                        
                    </div>
                    <div className="add-accomm-name">
                        <p>Hi</p>
                    </div>
                    <div className="add-accomm-area">

                    </div>
                    <div className="add-accomm-city-n-state">
                        <div className="add-accomm-city">

                        </div>
                        <div className="add-accomm-state">

                        </div>
                    </div>
                    div.add-
                    
                </div>
                <button onClick={() => setAddAccommodationEnable(false)}>CLOSE</button>
            </div>
        </div>
    );
};

export default AddAccommodation;
