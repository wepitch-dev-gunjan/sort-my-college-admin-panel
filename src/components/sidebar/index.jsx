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
import { RiHotelFill } from "react-icons/ri";
import { BiSolidDashboard } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";
import { MdOutlinePayments } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { BsBuildingsFill } from "react-icons/bs";
import { BiBuildings } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiHelpCircle } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";
import { FiUsers } from "react-icons/fi";






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
          icon={MdOutlineDashboard}
          text="Dashboard"
          expand={expand}
        />
        <SidebarMenuButton
          href="/user"
          icon={FiUsers}
          text="Users"
          expand={expand}
        />
        <SidebarMenuButton
          href="/payment"
          icon={MdOutlinePayments}
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
          icon={SiGoogleclassroom}
          text="Webinars"
          expand={expand}
        />

        <SidebarMenuButton
          href="/entrance-preparation"
          icon={BiBuildings }
          text="Entrance Preparation"
          expand={expand}
        />

        <SidebarMenuButton
          href="/accommodation"
          icon={BsBuildingsFill}
          text="Accommodation"
          expand={expand}
        />

        <SidebarMenuButton
          href="/profile"
          icon={CgProfile}
          text="Profile"
          expand={expand}
        />
        <hr />
        <SidebarMenuButton
          href="/help"
          icon={FiHelpCircle   }
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
