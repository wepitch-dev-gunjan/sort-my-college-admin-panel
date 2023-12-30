import { NotificationContext } from "../../../context/NotificationContext";
import { UserContext } from "../../../context/UserContext";
import Notification from "./notification";
import RecentSession from "./recentSession";
import RecentUser from "./recentUser";
import "./style.scss";

import React, { useContext, useState } from "react";

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
  const [sessions, setSessions] = useState([
    {
      session_type: "Group",
      session_date: "new Date()",
      session_time: "new Date()",
    },
    {
      session_type: "Personal",
      session_date: "new Date()",
      session_time: "new Date()",
    },
    {
      session_type: "Group",
      session_date: "new Date()",
      session_time: "new Date()",
    },
    {
      session_type: "Group",
      session_date: "new Date()",
      session_time: "new Date()",
    },
    {
      session_type: "Group",
      session_date: "new Date()",
      session_time: "new Date()",
    },
    {
      session_type: "Group",
      session_date: "new Date()",
      session_time: "new Date()",
    },
    {
      session_type: "Group",
      session_date: "new Date()",
      session_time: "new Date()",
    },
  ]);

  return (
    <div className="summary-dashboard">
      <h1>Summary</h1>

      {/* <div className="counsellor">
        <img
          src="https://tse2.mm.bing.net/th?id=OIP.avb9nDfw3kq7NOoP0grM4wHaEK&pid=Api&P=0&h=180"
          alt="Counsellor"
        />
        <div className="counsellor-main-content">
          <h4>Sandeep Abc</h4>
          <p>Counsellor</p>
        </div>
      </div> */}

      <h3>Recent Sessions</h3>
      <div className="sessions">
        {sessions.map((session, i) => (
          <RecentSession
            key={i}
            type={session.session_type}
            date={session.session_date}
            time={session.session_time}
          />
        ))}
      </div>

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
