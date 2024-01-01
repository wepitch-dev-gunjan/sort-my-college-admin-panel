import { NotificationContext } from "../../../context/NotificationContext";
import { UserContext } from "../../../context/AdminContext";
import Notification from "./notification";
import RecentUser from "./recentUser";
import "./style.scss";

import React, { useState } from "react";

function Summary() {
  const [followers, setFollowers] = useState([
    {
      profile_pic:
        "https://cdn.pixabay.com/photo/2023/09/01/14/24/boy-avtar-8227084_1280.png",
      name: "Naman",
    },
    {
      profile_pic:
        "https://cdn.pixabay.com/photo/2023/09/01/14/24/boy-avtar-8227084_1280.png",
      name: "Naman",
    },
    {
      profile_pic:
        "https://cdn.pixabay.com/photo/2023/09/01/14/24/boy-avtar-8227084_1280.png",
      name: "Naman",
    },
    {
      profile_pic:
        "https://cdn.pixabay.com/photo/2023/09/01/14/24/boy-avtar-8227084_1280.png",
      name: "Naman",
    },
    {
      profile_pic:
        "https://cdn.pixabay.com/photo/2023/09/01/14/24/boy-avtar-8227084_1280.png",
      name: "Naman",
    },
    {
      profile_pic:
        "https://cdn.pixabay.com/photo/2023/09/01/14/24/boy-avtar-8227084_1280.png",
      name: "Naman",
    },
  ]);
  

  return (
    <div className="summary-dashboard">
      <h1>Summary</h1>
      {/* <h3>Recent Sessions</h3>
      <div className="sessions">
        {sessions.map((session, i) => (
          <RecentSession
            key={i}
            type={session.session_type}
            date={session.session_date}
            time={session.session_time}
          />
        ))}
      </div> */}

      <h3>Recent Followers</h3>
      <div className="users">
        {followers.map((followers, i) => (
          <RecentUser
            key={i}
            profile_pic={followers.profile_pic}
            name={followers.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Summary;
