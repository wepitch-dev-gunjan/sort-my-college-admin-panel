import "./style.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaymentIcon from "@mui/icons-material/Payment";
import React, { useContext, useState } from "react";
import SidebarMenuButton from "../buttons/sidebarMenuButton";
import RightLeftArrow from "../buttons/rightLeftArrow";
import PersonIcon from "@mui/icons-material/Person";
import { ProfileContext } from "../../context/ProfileContext";
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeIcon from "@mui/icons-material/AccessTime";


const Sidebar = () => {
  const [expand, setExpand] = useState(true);
  const { profile } = useContext(ProfileContext)

  return (
    <div className="sidebar">
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
          icon={GroupIcon}
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
          href="/profile"
          icon={PersonIcon}
          text="Profile"
          expand={expand}
        />
      </div>
    </div>
  );
};

export default Sidebar;
