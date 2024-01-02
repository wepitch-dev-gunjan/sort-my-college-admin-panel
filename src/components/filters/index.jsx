import React, { useState } from 'react';
import './style.scss';
import { Box, Slider } from '@mui/material';
import { FaIndianRupeeSign } from "react-icons/fa6";

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import DateRangePicker from './dateRangePicker';

const Filters = ({ sessionFilters, setSessionFilters }) => {
  const handleFeeChange = (e, newValue) => {
    setSessionFilters(prev => ({ ...prev, session_fee: newValue }));
    if (newValue[0] >= newValue[1]) {
      setSessionFilters(prev => ({ ...prev, session_fee: [newValue[0] - 100, newValue[1]] }));
    }
  };

  

  const handleTypeChange = (event) => {
    setSessionFilters((prev) => ({ ...prev, session_type: event.target.value }));
  };

  const handleStatusChange = (event) => {
    setSessionFilters(prev => ({ ...prev, session_status: event.target.value }));
  };

  const handleDurationChange = (event) => {
    setSessionFilters(prev => ({ ...prev, session_duration: event.target.value }))
  }

  const marks = [
    {
      value: 45,
      label: '45m ',
    },
    {
      value: 60,
      label: '60m ',
    },
    {
      value: 75,
      label: '75m',
    },
    {
      value: 90,
      label: '90m',
    },
    {
      value: 105,
      label: '105m',
    },
    {
      value: 120,
      label: '120m',
    },
  ];

  function valuetext(value) {
    return `${value}m`;
  }

  return (
    <div className="filter-container">
      <div className="type">
        <p>Session Type</p>
        <select value={sessionFilters.session_type} onChange={handleTypeChange}>
          <option value="Personal">Personal</option>
          <option value="Group">Group</option>
          <option value="All">All</option>
        </select>
      </div>
      <div className="fees">
        <p>Session Fee</p>
        <Box sx={{ width: 200 }}>
          <Slider
            value={sessionFilters.session_fee}
            onChange={handleFeeChange}
            min={0}
            max={5000}
            step={100}
          />
          <div className="values">
            {sessionFilters.session_fee.map((element, i) => (
              <span key={i}><FaIndianRupeeSign />{element}</span>
            ))}
          </div>
        </Box>
      </div>
      <div className="date-range">
        <p>Select Date Range</p>
        <DateRangePicker sessionFilters={sessionFilters} setSessionFilters={setSessionFilters} />
      </div>
      <div className="duration">
        <p>Session duration</p>
        <Box sx={{ width: 250 }}>
          <Slider
            aria-label="Duration"
            defaultValue={sessionFilters.session_duration}
            getAriaValueText={valuetext}
            step={null}
            marks={marks}
            min={45}
            max={120}
            onChange={handleDurationChange}
          />
        </Box>
      </div>
      <div className="status">
        <p>Session Status</p>
        <select value={sessionFilters.session_status} onChange={handleStatusChange}>
          <option value="All">All</option>
          <option value="Available">Available</option>
          <option value="Booked">Booked</option>
          <option value="Attended">Attended</option>
          <option value="NotAttended">Not-Attended</option>
          <option value="Rescheduled">Rescheduled</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
