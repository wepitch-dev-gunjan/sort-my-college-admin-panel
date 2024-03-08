import React, { useContext, useRef } from "react";
import "./style.scss";
import ProfileDropDownMenu from "../dropdownMenu/profileDropDownMenu";
import logo from "../../assets/logo.svg";
import NotificationButton from "../notificationButton";
import { NotificationContext } from "../../context/NotificationContext";
import useClickOutside from "../../customHooks/useClickOutside";
import { ProfileContext } from "../../context/ProfileContext";
import AddWebinarButton from "../buttons/addWebinarButton";
import { MediaQueryContext } from "../../context/MediaQueryContext";

const Header = ({ handleLogout }) => {
  const notificationRef = useRef(null);
  useClickOutside(notificationRef, () => {
    setNotificationsEnable(false);
  })
  const { profile } = useContext(ProfileContext)
  const { setNotificationsEnable } = useContext(NotificationContext);
const { xSmallScreen} =useContext(MediaQueryContext)
  return (
    <div className="header">
      <div className="leftSide">
        <img src={logo} alt="" />
      </div>
      <div className="rightSide">
        { !xSmallScreen &&
        <>
      <AddWebinarButton />

        <NotificationButton
          ref={notificationRef}
          onClick={() => setNotificationsEnable((prev) => !prev)}
        />
        </>
}
        <ProfileDropDownMenu
          name={profile.name}
          image={profile.profile_pic}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Header;