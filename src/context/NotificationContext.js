// import React, { createContext, useContext, useMemo, useState } from 'react';

// const NotificationContext = createContext(null);

// function createNotificationItem(title, message, type = 'info') {
//   return {
//     id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
//     title,
//     message,
//     type,
//     read: false,
//     createdAt: new Date().toISOString(),
//   };
// }

// export function NotificationProvider({ children }) {
//   const [notifications, setNotifications] = useState([
//     createNotificationItem(
//       'Welcome to Apps Marketplace',
//       'Explore premium digital products and business applications built for modern businesses.',
//       'success'
//     ),
//     createNotificationItem(
//       'Featured App Updated',
//       'A new premium business app is now highlighted in the marketplace.',
//       'info'
//     ),
//     createNotificationItem(
//       'Special Offer',
//       'Selected apps now include updated pricing and limited-time offers.',
//       'info'
//     ),
//     createNotificationItem(
//       'Marketplace News',
//       'New business solutions are now available in the catalog.',
//       'info'
//     ),
//   ]);

//   const addNotification = (title, message, type = 'info') => {
//     const item = createNotificationItem(title, message, type);
//     setNotifications((prev) => [item, ...prev]);
//   };

//   const markAsRead = (id) => {
//     setNotifications((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, read: true } : item
//       )
//     );
//   };

//   const markAllAsRead = () => {
//     setNotifications((prev) =>
//       prev.map((item) => ({ ...item, read: true }))
//     );
//   };

//   const removeNotification = (id) => {
//     setNotifications((prev) => prev.filter((item) => item.id !== id));
//   };

//   const clearAllNotifications = () => {
//     setNotifications([]);
//   };

//   const unreadCount = useMemo(
//     () => notifications.filter((item) => !item.read).length,
//     [notifications]
//   );

//   return (
//     <NotificationContext.Provider
//       value={{
//         notifications,
//         unreadCount,
//         addNotification,
//         markAsRead,
//         markAllAsRead,
//         removeNotification,
//         clearAllNotifications,
//       }}
//     >
//       {children}
//     </NotificationContext.Provider>
//   );
// }

// export function useNotifications() {
//   const context = useContext(NotificationContext);

//   if (!context) {
//     throw new Error('useNotifications must be used inside NotificationProvider');
//   }

//   return context;
// }

  import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
  import { fetchNotificationsApi } from '../utils/apiService';

  const NotificationContext = createContext(null);

  function createLocalNotification(title, message, type = 'info') {
    return {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title,
      message,
      type,
      read: false,
      createdAt: new Date().toISOString(),
    };
  }

  export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);

    // ✅ Backend nundi fetch
    useEffect(() => {
      loadNotifications();
    }, []);

    const loadNotifications = async () => {
      try {
        const data = await fetchNotificationsApi();
        if (Array.isArray(data) && data.length > 0) {
          setNotifications(data);
        } else {
          // ✅ Backend empty unte default notifications
          setNotifications([
            // createLocalNotification(
            //   'Welcome to Apps Marketplace',
            //   'Explore premium digital products and business applications.',
            //   'success'
            // ),
            // createLocalNotification(
            //   'Marketplace is Live',
            //   'Browse, filter, and find the right app for your business.',
            //   'info'
            // ),
          ]);
        }
      } catch (error) {
        console.log('loadNotifications error:', error);
      }
    };

    // ✅ Upload ayyinappudu real notification add + backend ki send
    const addNotification = async (title, message, type = 'info') => {
      const item = createLocalNotification(title, message, type);

      // Local lo immediately add
      setNotifications((prev) => [item, ...prev]);

      // Backend ki also send (optional)
      try {
        await fetch('http://192.168.0.30:8082/api/notifications/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, message, type }),
        });
      } catch (e) {
        console.log('Notification send error:', e);
      }
    };

    const markAsRead = (id) => {
      setNotifications((prev) =>
        prev.map((item) => item.id === id ? { ...item, read: true } : item)
      );
    };

    const markAllAsRead = () => {
      setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
    };

    const removeNotification = (id) => {
      setNotifications((prev) => prev.filter((item) => item.id !== id));
    };

    const clearAllNotifications = () => setNotifications([]);

    const unreadCount = useMemo(
      () => notifications.filter((item) => !item.read).length,
      [notifications]
    );

    return (
      <NotificationContext.Provider value={{
        notifications, unreadCount, addNotification,
        markAsRead, markAllAsRead, removeNotification, clearAllNotifications,
      }}>
        {children}
      </NotificationContext.Provider>
    );
  }

  export function useNotifications() {
    const context = useContext(NotificationContext);
    if (!context) throw new Error('useNotifications must be used inside NotificationProvider');
    return context;
  }