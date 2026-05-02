


import React, {
  createContext, useContext, useEffect,
  useMemo, useState, useCallback
} from 'react';

import {
  fetchAppsApi,
  fetchUserNotificationsApi // ✅ NEW
} from '../utils/apiService';

const MarketplaceContext = createContext(null);

export function MarketplaceProvider({ children }) {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(0);

  // ✅ NEW: notification badge state
  const [unreadCount, setUnreadCount] = useState(0);

  // ─────────────────────────────
  // LOAD APPS
  // ─────────────────────────────
  const loadApps = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchAppsApi();

      const formatted = data.map((item) => ({
        ...item,
        id: String(item.id),
        imageUrls: Array.isArray(item.imageUrls) && item.imageUrls.length > 0
          ? item.imageUrls
          : item.imageUrl ? [item.imageUrl] : [],
        imageUrl: item.imageUrl ||
          (Array.isArray(item.imageUrls) && item.imageUrls.length > 0
            ? item.imageUrls[0]
            : null),
        image: item.imageUrl ? { uri: item.imageUrl } : null,
        price: item.price ? Number(item.price) : 0,
        isUserUploaded: true,
      }));

      setApps(formatted);
      setLastRefresh(Date.now());
    } catch (error) {
      console.log('MarketplaceContext loadApps error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadApps();
  }, [loadApps]);

  // ─────────────────────────────
  // ✅ NEW: LOAD UNREAD COUNT
  // ─────────────────────────────
  const loadUnreadCount = useCallback(async (email) => {
    if (!email) return;

    try {
      const data = await fetchUserNotificationsApi(email);

      const unread = Array.isArray(data)
        ? data.filter(n => !n.isRead).length
        : 0;

      setUnreadCount(unread);
    } catch (e) {
      console.log('unread count error', e);
    }
  }, []);

  // ─────────────────────────────
  // ADD APP
  // ─────────────────────────────
  const addApp = async (formData) => {
    const newApp = {
      id: `app-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      price: formData.price ? Number(formData.price) : 0,
      imageUrls: formData.images ? formData.images.map(img => img.uri) : [],
      imageUrl: formData.images && formData.images.length > 0 ? formData.images[0].uri : null,
      image: formData.images && formData.images.length > 0 ? formData.images[0] : null,
      ownerName: formData.ownerName,
      ownerEmail: formData.ownerEmail,
      ownerPhone: formData.ownerPhone,
      company: formData.company,
      features: formData.features,
      isUserUploaded: true,
      status: 'pending',
    };

    setApps((prev) => [newApp, ...prev]);
    return newApp;
  };

  const refreshApps = useCallback(async () => {
    await loadApps();
  }, [loadApps]);

  // ─────────────────────────────
  // CONTEXT VALUE
  // ─────────────────────────────
  const value = useMemo(
    () => ({
      apps,
      loading,
      lastRefresh,
      addApp,
      refreshApps,

      // ✅ NEW
      unreadCount,
      loadUnreadCount,
      setUnreadCount,
    }),
    [apps, loading, lastRefresh, refreshApps, unreadCount]
  );

  return (
    <MarketplaceContext.Provider value={value}>
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) throw new Error('useMarketplace must be used inside MarketplaceProvider');
  return context;
}