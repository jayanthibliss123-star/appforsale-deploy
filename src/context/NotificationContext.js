

import React, {
  createContext, useContext, useEffect,
  useMemo, useState, useCallback, useRef,
} from 'react';
import {
  fetchUserUnreadCountApi,
  markUserNotificationsReadApi,
} from '../utils/apiService';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [userEmail, setUserEmail]     = useState(null);
  const emailRef                      = useRef(null);

  // Keep ref in sync so callbacks always see latest email
  useEffect(() => { emailRef.current = userEmail; }, [userEmail]);

  // ✅ Fetch only the count from backend — lightweight
  const refreshUnreadCount = useCallback(async (email) => {
    const e = email || emailRef.current;
    if (!e) return;
    try {
      const count = await fetchUserUnreadCountApi(e);
      setUnreadCount(Number(count) || 0);
    } catch (err) {
      console.log('[NotifCtx] refreshUnreadCount error', err);
    }
  }, []);

  // ✅ Called when NotificationsScreen opens — immediately zeros bell, then hits backend
  const markAllAsRead = useCallback(async (email) => {
    const e = email || emailRef.current;
    // Optimistic: zero the bell immediately without waiting for backend
    setUnreadCount(0);
    if (!e) return;
    try {
      await markUserNotificationsReadApi(e);
    } catch (err) {
      console.log('[NotifCtx] markAllAsRead error', err);
    }
  }, []);

  return (
    <NotificationContext.Provider value={{
      unreadCount,
      refreshUnreadCount,
      markAllAsRead,
      setUserEmail,        // ← SignInScreen calls this after login
      userEmail,
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be inside NotificationProvider');
  return ctx;
}