import React, { useRef, useState, useContext } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useClickOutside from "../../customHooks/useClickOutside";
import { ProfileContext } from "../../context/ProfileContext";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import config from "@/config";
import { useNavigate, useParams } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
const { backend_url } = config;

const InstituteProfileDropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { admin } = useContext(AdminContext);
  const navigate = useNavigate();

  const { institute_id } = useParams();

  const { editInsituteProfileEnable, setEditInstituteProfileEnable } =
    useContext(ProfileContext);

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });
  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  const handleDeleteInstitute = async () => {
    try {
      const { data } = await axios.delete(
        `${backend_url}/ep/institute/admin/${institute_id}`,
        {
          headers: {
            Authorization: admin.token,
          },
        }
      );
      navigate("/entrance-preparation/institute-directory");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="dropdown-toggle" onClick={toggleDropdown}>
        <MoreVertIcon />
      </div>
      {isOpen && (
        <div className="dropdown-options">
          <div
            className="edit"
            value="edit"
            onClick={() => setEditInstituteProfileEnable(true)}
          >
            <FaEdit />
            Edit Profile
          </div>
          <div
            className="delete"
            value="delete"
            onClick={handleDeleteInstitute}
          >
            <MdDeleteOutline />
            Delete
          </div>
        </div>
      )}
    </div>
  );
};

InstituteProfileDropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default InstituteProfileDropdown;
