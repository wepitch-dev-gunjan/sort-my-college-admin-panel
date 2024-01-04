// Dropdown.jsx

import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.scss'
// import useClickOutside from '../../../customHooks/useClickOutside';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useClickOutside from '../../customHooks/useClickOutside';

const CounsellorProfileDropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   useClickOutside(dropdownRef, () => {
//     setIsOpen(false);
//   });
useClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });
  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleOptionClick = (option) => {
    switch (option) {
      case 'Edit Profile':
        break;
      case 'Delete':
        break;
      default:
        break;
    }

    setIsOpen(false);
  };


  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="dropdown-toggle" onClick={toggleDropdown}>
        <MoreVertIcon />
      </div>
      {isOpen && (
        <div className="dropdown-options">
            <option className='edit' value="edit">Edit Profile</option>
            <option className='delete' value="delete">Delete</option>
          {/* {options.map((option, index) => (
            <div key={index} onClick={() => handleOptionClick(option)}>
              {option}
            </div>
          ))} */}
        </div>
      )}
    </div>
  );
};

CounsellorProfileDropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CounsellorProfileDropdown;
