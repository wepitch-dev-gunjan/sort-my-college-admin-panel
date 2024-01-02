import React, { useState } from 'react';
import './style.scss';
import "react-datepicker/dist/react-datepicker.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const EditProfile = ({ isOpen, onClose }) => {

  const [emailError, setEmailError] = useState("");

  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    languages_spoken: ["English", "Hindi"],
    gender: 'Male',
    date_of_birth: "",
  });
  if (!isOpen) {
    return null;
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("location.")) {
      const field = name.split(".")[1]; // Extract the field name after the dot
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [field]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    if (name === "email") {
      if (!isValidEmail(formData.email)) {
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailError("");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(formData.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    if (!validateLocation()) {
      return;
    }
    setEmailError(""); // Clear any previous email error messages
    console.log('Form data submitted:', formData);
  };

  const handleCancel = () => {
    // For this example, I'm just resetting the form to its initial state
    setFormData({
      name: 'John Doe',
      email: 'johndoe@example.com',
      gender: 'Male',
      age: null,
    });
  };

  return (
    <div className="profile-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={emailError ? "error" : ""}
          />
          {emailError && <div className="error-message">{emailError}</div>}
        </div>

        <div>
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Date of Birth:</label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="Basic date picker" />
            </DemoContainer>
          </LocalizationProvider>

        </div>

        <div className="button-group">
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>

  );
};

export default EditProfile;
