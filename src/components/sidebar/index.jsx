import "./style.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaymentIcon from "@mui/icons-material/Payment";
import React, { useContext, useState } from "react";
import SidebarMenuButton from "../buttons/sidebarMenuButton";
import RightLeftArrow from "../buttons/rightLeftArrow";
import GroupIcon from "@mui/icons-material/Group";
import ReviewsIcon from "@mui/icons-material/Reviews";
import FeedIcon from "@mui/icons-material/Feed";
import PersonIcon from "@mui/icons-material/Person";
import { ProfileContext } from "../../context/ProfileContext";



const Sidebar = () => {
  const [expand, setExpand] = useState(true);
  const { profile } = useContext(ProfileContext)

  return (
    <div className="sidebar">
      <div className="right-left-arrow" onClick={() => setExpand(!expand)}>
        <RightLeftArrow expand={expand} />
      </div>
      <div className="sidebar-container">
        {
          profile.verified &&
          // !profile.verified && 
          (<>
            <SidebarMenuButton
              href="/"
              icon={DashboardIcon}
              text="Dashboard"
              expand={expand}
            />
            <SidebarMenuButton
              href="/session"
              icon={AccessTimeIcon}
              text="My Sessions"
              expand={expand}
            />
            <SidebarMenuButton
              href="/payment"
              icon={PaymentIcon}
              text="My Payments"
              expand={expand}
            />
            <SidebarMenuButton
              href="/users"
              icon={GroupIcon}
              text="My Followers"
              expand={expand}
            />
            <SidebarMenuButton
              href="/feedbacks"
              icon={ReviewsIcon}
              text="User Feedbacks"
              expand={expand}
            />
            <SidebarMenuButton
              href="/feeds"
              icon={FeedIcon}
              text="My Feeds"
              expand={expand}
            />
          </>)

        }

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
