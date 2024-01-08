import React from 'react';
import './style.scss';
import { Box, Slider } from '@mui/material';
import { FaIndianRupeeSign } from "react-icons/fa6";

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import DateRangePicker from './dateRangePicker';

const Filters = ({ webinarFilters, setWebinarFilters }) => {
  const handleFeeChange = (e, newValue) => {
    setWebinarFilters(prev => ({ ...prev, webinar_fee: newValue }));
    if (newValue[0] >= newValue[1]) {
      setWebinarFilters(prev => ({ ...prev, webinar_fee: [newValue[0] - 100, newValue[1]] }));
    }
  };
  

  const handleTypeChange = (event) => {
    setWebinarFilters((prev) => ({ ...prev, webinar_type: event.target.value }));
  };

  const handleStatusChange = (event) => {
    setWebinarFilters(prev => ({ ...prev, webinar_status: event.target.value }));
  };

  const handleDurationChange = (event) => {
    setWebinarFilters(prev => ({ ...prev, webinar_duration: event.target.value }))
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
        <p>Webinar Type</p>
        <select value={webinarFilters.webinar_type} onChange={handleTypeChange}>
          <option value="Personal">Personal</option>
          <option value="Group">Group</option>
          <option value="All">All</option>
        </select>
      </div>
      <div className="fees">
        <p>Webinar Fee</p>
        <Box sx={{ width: 200 }}>
          <Slider
            value={webinarFilters.webinar_fee}
            onChange={handleFeeChange}
            min={0}
            max={5000}
            step={100}
          />
          <div className="values">
            {webinarFilters.webinar_fee.map((element, i) => (
              <span key={i}><FaIndianRupeeSign />{element}</span>
            ))}
          </div>
        </Box>
      </div>
      <div className="date-range">
        <p>Select Date Range</p>
        <DateRangePicker webinarFilters={webinarFilters} setWebinarFilters={setWebinarFilters} />
      </div>
      <div className="duration">
        <p>Webinar duration</p>
        <Box sx={{ width: 250 }}>
          <Slider
            aria-label="Duration"
            defaultValue={webinarFilters.webinar_duration}
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
        <p>Webinar Status</p>
        <select value={webinarFilters.webinar_status} onChange={handleStatusChange}>
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
