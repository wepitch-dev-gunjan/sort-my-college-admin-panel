import React, { useContext } from "react";
import "./style.scss";
import Notification from "./notification";
import { NotificationContext } from "../../context/NotificationContext";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { backend_url } from "../../config";
import { ImSpinner3 } from "react-icons/im";

const Notifications = () => {
  const { notifications, setNotifications, notificationsRef, getNotifications, page, setPage, notificationsLoading, allNotificationsFetched } = useContext(NotificationContext);
  const { user } = useContext(UserContext);

  const handleScroll = (e) => {
    const element = e.target;
    if (element) {
      const { scrollTop, clientHeight, scrollHeight } = element;

      if (scrollTop + clientHeight === scrollHeight && !allNotificationsFetched) {
        setPage(prev => prev + 1)
        getNotifications(page);
      }
    }
  };

  const handleNotificationClick = async (notificationId, i, read) => {
    if (!read) {
      try {
        await axios.put(
          `${backend_url}/notification/${notificationId}`,
          null,
          {
            params: {
              user_id: user._id
            }
          }
        );

        // Update local state and UI
        const updatedNotifications = [...notifications];
        updatedNotifications[i] = {
          ...updatedNotifications[i],
          read: true,
        };
        setNotifications(updatedNotifications);
      } catch (error) {
        console.error("Error updating notification status:", error);
      }
    }
  };

  return (
    <div ref={notificationsRef} className="Notifications-container" onScroll={handleScroll}>
      {notifications.map((notification, i) => (
        <div key={i}>
          <Notification
            notificationId={notification._id}
            title={notification.title}
            message={notification.message}
            handleNotificationClick={handleNotificationClick}
            index={i}
            read={notification.read}
          />
        </div>
      ))}
      {notificationsLoading && <div className="notifications-loading">
        <div className="notifications-spinner">
          <ImSpinner3 size={40} />
        </div>
      </div>}
    </div>
  );
};

export default Notifications;
