import React, { useState } from 'react';
import './style.scss';
import { DatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import 'dayjs/locale/en'; // Import the locale if not already done

const DateRangePicker = ({ webinarFilters, setWebinarFilters }) => {
  const handleStartDateChange = (date) => {
    setWebinarFilters({
      ...webinarFilters,
      webinar_dates:
        [date.format('YYYY-MM-DD'), webinarFilters.webinar_dates[1]]
    });
  };

  const handleEndDateChange = (date) => {
    setWebinarFilters({
      ...webinarFilters,
      webinar_dates:
        [webinarFilters.webinar_dates[0], date.format('YYYY-MM-DD')]
    });
  };

  return (
    <div className="DateRangePicker-container">
      <div className="start-date">
        <MobileDatePicker
          label="Start Date"
          value={dayjs(webinarFilters.webinar_dates[0])}
          onChange={(value) => handleStartDateChange(value)}
        />
      </div>
      -
      <div className="end-date">
        <MobileDatePicker
          label="End Date"
          value={dayjs(webinarFilters.webinar_dates[1])}
          onChange={(value) => handleEndDateChange(value)}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;