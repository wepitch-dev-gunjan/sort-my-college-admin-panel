import React, { useState } from 'react';
import './style.scss';
import { DatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import 'dayjs/locale/en'; // Import the locale if not already done

const DateRangePicker = ({ sessionFilters, setSessionFilters }) => {
  const handleStartDateChange = (date) => {
    setSessionFilters({
      ...sessionFilters,
      session_dates:
        [date.format('YYYY-MM-DD'), sessionFilters.session_dates[1]]
    });
  };

  const handleEndDateChange = (date) => {
    setSessionFilters({
      ...sessionFilters,
      session_dates:
        [sessionFilters.session_dates[0], date.format('YYYY-MM-DD')]
    });
  };

  return (
    <div className="DateRangePicker-container">
      <div className="start-date">
        <MobileDatePicker
          label="Start Date"
          value={dayjs(sessionFilters.session_dates[0])}
          onChange={(value) => handleStartDateChange(value)}
        />
      </div>
      -
      <div className="end-date">
        <MobileDatePicker
          label="End Date"
          value={dayjs(sessionFilters.session_dates[1])}
          onChange={(value) => handleEndDateChange(value)}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;