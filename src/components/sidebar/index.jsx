import "./style.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaymentIcon from "@mui/icons-material/Payment";
import React, { useContext, useState ,useEffect } from "react";
import SidebarMenuButton from "../buttons/sidebarMenuButton";
import RightLeftArrow from "../buttons/rightLeftArrow";
import PersonIcon from "@mui/icons-material/Person";
import { ProfileContext } from "../../context/ProfileContext";
import GroupIcon from '@mui/icons-material/Group';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { PiFlagBannerFill } from "react-icons/pi";
import { FaBuildingColumns } from "react-icons/fa6";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { FaChalkboardTeacher } from "react-icons/fa";



const Sidebar = () => {
  const [expand, setExpand] = useState(true);
  const { profile } = useContext(ProfileContext)
 // edited
 const [isSmallScreen, setIsSmallScreen] = useState(false);
 useEffect(() => {
   const handleResize = () => {
     setIsSmallScreen(window.innerWidth <= 768); // Adjust the breakpoint as needed
   };

   handleResize(); // Call once to set initial state

   window.addEventListener("resize", handleResize);

   return () => {
     window.removeEventListener("resize", handleResize);
   };
 }, []);
 useEffect(() => {
   // Automatically minimize the sidebar on small screens
   if (isSmallScreen) {
     setExpand(false);
   } else {
     setExpand(true);
   }
 }, [isSmallScreen]);
 // edited
  return (
   // edited
    <div className={`sidebar ${expand ? "expanded" : "collapsed"}`}>
      <div className="right-left-arrow" onClick={() => setExpand(!expand)}>
        <RightLeftArrow expand={expand} />
      </div>
      <div className="sidebar-container">
        <SidebarMenuButton
          href="/"
          icon={DashboardIcon}
          text="Dashboard"
          expand={expand}
        />
        <SidebarMenuButton
          href="/user"
          icon={GroupIcon}
          text="Users"
          expand={expand}
        />
        <SidebarMenuButton
          href="/payment"
          icon={PaymentIcon}
          text="Payments"
          expand={expand}
        />

        <SidebarMenuButton
          href="/counsellors"
          icon={FaChalkboardTeacher}
          text="Counsellors"
          expand={expand}
        />

        <SidebarMenuButton
          href="/webinar"
          icon={AccessTimeIcon}
          text="Webinars"
          expand={expand}
        />

        <SidebarMenuButton
          href="/entrance-preparation"
          icon={FaBuildingColumns}
          text="Entrance Preparation"
          expand={expand}
        />

        <SidebarMenuButton
          href="/profile"
          icon={PersonIcon}
          text="Profile"
          expand={expand}
        />
        <hr />
        <SidebarMenuButton
          href="/help"
          icon={HelpOutlineIcon}
          text="Help"
          expand={expand}
        />
        <SidebarMenuButton
          href="/banners"
          icon={PiFlagBannerFill}
          text="Banners"
          expand={expand}
        />
      </div>
    </div>
  );
};

export default Sidebar;
