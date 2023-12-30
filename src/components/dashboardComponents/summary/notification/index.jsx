import { useContext, useState } from "react";
import axios from "axios";
import "./style.scss";
import { backend_url } from "../../../../config";
import { NotificationContext } from "../../../../context/NotificationContext";
import { AdminContext } from "../../../../context/AdminContext";

const Notification = ({ title, message, read, index, notificationId }) => {
  const { notifications, setNotifications } = useContext(NotificationContext);
  const { admin } = useContext(AdminContext);
  const [isRead, setIsRead] = useState(read);

  const handleNotificationClick = async () => {
    if (!isRead) {
      try {
        // Update the database via an API call using Axios
        await axios.put(
          `${backend_url}/counsellor/notification/${notificationId}`,
          { read: true },
          {
            headers: {
              Athorization: admin.token,
            },
          }
        );

        // Update local state and UI
        const updatedNotifications = [...notifications];
        updatedNotifications[index] = {
          ...updatedNotifications[index],
          read: true,
        };
        setNotifications(updatedNotifications);
        setIsRead(true);
      } catch (error) {
        console.error("Error updating notification status:", error);
        // Handle error scenarios here
      }
    }
  };

  return (
    <div
      className={`Notification-container ${isRead && "read"}`}
      onClick={handleNotificationClick}
    >
      <h4>{title}</h4>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
