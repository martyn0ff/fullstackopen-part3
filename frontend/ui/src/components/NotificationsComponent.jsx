import { useEffect } from "react";

function NotificationsComponent({ notifications, setNotifications }) {
  const POLLING_FREQUENCY = 1000;
  let monitorStaleNotificationsTaskId;


  useEffect(() => {
    monitorStaleNotifications();

    return () => {
      clearTimeout(monitorStaleNotificationsTaskId);
    };
  }, [notifications]);

  function cleanStaleNotificationsIfNecessary() {
    const currentTime = Date.now();
    for (const [removeTime, _] of notifications) {
      if (currentTime >= removeTime) {
        const newNotifications = new Map([...notifications].filter(entry => entry[0] !== removeTime));
        setNotifications(newNotifications);
      }
    }
  }

  function monitorStaleNotifications() {
    monitorStaleNotificationsTaskId = setTimeout(() => {
      cleanStaleNotificationsIfNecessary();
      monitorStaleNotificationsTaskId = setTimeout(monitorStaleNotifications, POLLING_FREQUENCY);
    }, POLLING_FREQUENCY);
  }

  return (
    <div id="notifications-container">
      {[...notifications.values()].map(notification => (
        <div className={`notification notification-${notification.type}`} key={notification.id}>{notification.icon} {notification.message}</div>
      ))}
    </div>
  );
}

export default NotificationsComponent;