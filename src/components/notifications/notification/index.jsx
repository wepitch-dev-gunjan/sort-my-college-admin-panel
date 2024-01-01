import './style.scss'

const Notification = ({ handleNotificationClick, notificationId, title, message, read, index }) => {
  return (
    <div className={`Notification-container ${read && "read"}`}
      onClick={() => handleNotificationClick(notificationId, index, read)}>
      <h4>{title}</h4>
      <p>{message}</p>
    </div>
  );
};

export default Notification;