import { createContext, useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import { backend_url } from "../config";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const notificationsRef = useRef(null);
  const [page, setPage] = useState(1);
  const [notificationsEnable, setNotificationsEnable] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [allNotificationsFetched, setAllNotificationsFetched] = useState(false);
  const { user } = useContext(UserContext);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [fetchedNotificationIds, setFetchedNotificationIds] = useState(new Set()); // Track IDs of fetched notifications

  const getNotifications = async (page) => {
    try {
      setNotificationsLoading(true);
      const { data } = await axios.get(`${backend_url}/notification`, {
        params: {
          user_id: user._id,
          page,
          limit: 10,
        },
      });

      if (data.notifications.length === 0) {
        setAllNotificationsFetched(true);
      } else {
        setAllNotificationsFetched(false);
        const uniqueNotifications = data.notifications.filter(
          notification => !fetchedNotificationIds.has(notification._id)
        );

        setNotifications(prevNotifications => [...prevNotifications, ...uniqueNotifications]);
        const newNotificationIds = new Set(data.notifications.map(notification => notification._id));
        setFetchedNotificationIds(new Set([...fetchedNotificationIds, ...newNotificationIds]));
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setNotificationsLoading(false)
    }
  };

  useEffect(() => {
    if (!allNotificationsFetched) {
      getNotifications(page);
    }
  }, [user, allNotificationsFetched]);
  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        notificationsEnable,
        setNotificationsEnable,
        notificationsRef,
        page,
        getNotifications,
        setPage,
        allNotificationsFetched,
        notificationsLoading,
        setNotificationsLoading
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

