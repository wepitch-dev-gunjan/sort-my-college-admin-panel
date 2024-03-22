import React, { useContext, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import "./style.scss";
import useClickOutside from "../../../customHooks/useClickOutside";
import PersonIcon from "@mui/icons-material/Person";
import { AiOutlineLogout } from "react-icons/ai";
import DropDownMenuButton from "../dropDownMenuButton";
import { useNavigate } from "react-router-dom";
import { MdOutlineSummarize } from "react-icons/md";
import { MediaQueryContext } from "../../../context/MediaQueryContext";
import { GrAdd } from "react-icons/gr";
import { IoMdNotificationsOutline } from "react-icons/io";
import { NotificationContext } from "../../../context/NotificationContext";
import { WebinarContext } from "../../../context/WebinarContext";
const ProfileDropDownMenu = ({ name, image, onClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { setNotificationsEnable } = useContext(NotificationContext);
  const { smallScreen, xSmallScreen} = useContext(MediaQueryContext);
  const { setAddMode } = useContext(WebinarContext);
  useClickOutside(dropdownRef, () => {
    setIsDropdownOpen(false);
  });

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };
  // generate Avatar Using Name
  const generateAvatar = (name)=> {
   if(!name)return ""
   const partsName = name.split(" ")
   const firstName = partsName[0].charAt(0).toUpperCase()
   // const lastName = partsName[partsName.length -1].charAt(0).toUpperCase();
   return `${firstName}`
  }

  const handleClick = () => {
   setAddMode(prev => !prev);
   navigate('/webinar')
 }
  return (
    <div className="ProfileDropDownMenu-container" onClick={toggleDropdown}>
      <div className="left">
       {image ? (
        <img src={image} alt="Admin Profile" />
       ):(
        <div className="Avatar">{generateAvatar(name)}</div>
       )}
      </div>
      {/* edited */}
      { !xSmallScreen && <div className="mid">
        <p className="top">Hello</p>
        <h4>{name}</h4>
      </div>}
      <div className="right">
        <BiChevronDown />
      </div>
      {isDropdownOpen && (
        <div ref={dropdownRef} className="dropdown-menu">
          <DropDownMenuButton
            onClick={() => navigate("/profile")}
            icon={PersonIcon}
            text="Profile"
          />
          {/* {smallScreen && (
            <DropDownMenuButton
              onClick={() => ""}
              // icon={MdOutlineSummarize}
              text="Summary"
            />
          )} */}
          <DropDownMenuButton
            onClick={onClick}
            icon={AiOutlineLogout}
            text="Log out"
          />
          {xSmallScreen && (
           <>
           <DropDownMenuButton
           onClick={handleClick}
           icon = {GrAdd}
           text = "Add Webinar"
           />
           <DropDownMenuButton 
             onClick={() => setNotificationsEnable((prev) => !prev)}
             icon={IoMdNotificationsOutline}
             text="Notifications"
           />
           </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileDropDownMenu;
