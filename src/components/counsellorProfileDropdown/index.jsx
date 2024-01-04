// Dropdown.jsx

import React, { useRef, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import './style.scss'
// import useClickOutside from '../../../customHooks/useClickOutside';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useClickOutside from '../../customHooks/useClickOutside';
import { ProfileContext } from '../../context/ProfileContext';

const CounsellorProfileDropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { editCounsellorProfileEnable, setEditCounsellorProfileEnable } =
    useContext(ProfileContext);

useClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });
  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="dropdown-toggle" onClick={toggleDropdown}>
        <MoreVertIcon />
      </div>
      {isOpen && (
        <div className="dropdown-options">
            <option className='edit' value="edit"
            onClick={() => setEditCounsellorProfileEnable(true)}
            >Edit Profile</option>
            <option className='delete' value="delete">Delete</option>
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
