// Dropdown.jsx

import React, { useRef, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import './style.scss'
// import useClickOutside from '../../../customHooks/useClickOutside';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useClickOutside from '../../customHooks/useClickOutside';
import { ProfileContext } from '../../context/ProfileContext';
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

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
            <div className='edit' value="edit"
            onClick={() => setEditCounsellorProfileEnable(true)}> 
                <FaEdit />
                Edit Profile
             </div>
            <div className='delete' value="delete"><MdDeleteOutline />Delete</div>
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
