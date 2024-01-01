import { IoIosNotificationsOutline } from "react-icons/io";
import "./style.scss";
import { Tooltip, Typography } from "@mui/material";
import { useContext } from "react";
import { NotificationContext } from "../../context/NotificationContext";
const NotificationButton = ({ onClick }) => {
  const { notifications } = useContext(NotificationContext);
  const unreadNotifications = notifications.filter(
    (notification) => !notification.read
  ).length;
  console.log(unreadNotifications);
  return (
    <Tooltip
      title={
        <Typography style={{ fontSize: "16px" }}>Notifications</Typography>
      }
      placement="bottom"
      arrow
      PopperProps={{
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 10],
            },
          },
        ],
      }}
    >
      <div
        onClick={() =>
          onClick((prev) => {
            if (!prev) return true;
          })
        }
        className="NotificationsButton-container"
      >
        <div className={`${unreadNotifications ? "unread-notifications" : ""}`}>
          {unreadNotifications ? unreadNotifications : ""}
        </div>
        <IoIosNotificationsOutline size="24" />
      </div>
    </Tooltip>
  );
};

export default NotificationButton;
