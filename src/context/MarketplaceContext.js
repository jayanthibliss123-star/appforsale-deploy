// import React, { createContext, useContext, useMemo, useState } from 'react';
// import { appsData } from '../data/appsData';

// const MarketplaceContext = createContext(null);

// const safeText = (value) => (typeof value === 'string' ? value.trim() : '');

// export function MarketplaceProvider({ children }) {
//   const [apps, setApps] = useState(
//     appsData.map((item, index) => ({
//       ...item,
//       id: String(item.id ?? `seed-${index + 1}`),
//       isUserUploaded: false,
//     }))
//   );

//   const addApp = (formData) => {
//     const newApp = {
//       id: `app-${Date.now()}`,
//       title: safeText(formData.title),
//       description: safeText(formData.description),
//       category: safeText(formData.category),
//       price: safeText(formData.price),
//       image: formData.image || require('../../assets/images/apps/app1.jpg'),
//       ownerName: safeText(formData.ownerName),
//       ownerEmail: safeText(formData.ownerEmail),
//       ownerPhone: safeText(formData.ownerPhone),
//       company: safeText(formData.company),
//       features: safeText(formData.features),
//       isUserUploaded: true,
//     };

//     setApps((prev) => [newApp, ...prev]);
//     return newApp;
//   };

//   const value = useMemo(
//     () => ({
//       apps,
//       addApp,
//     }),
//     [apps]
//   );

//   return (
//     <MarketplaceContext.Provider value={value}>
//       {children}
//     </MarketplaceContext.Provider>
//   );
// }

// export function useMarketplace() {
//   const context = useContext(MarketplaceContext);
//   if (!context) {
//     throw new Error('useMarketplace must be used inside MarketplaceProvider');
//   }
//   return context;
// }

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchAppsApi } from '../utils/apiService';

const MarketplaceContext = createContext(null);

export function MarketplaceProvider({ children }) {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ App start ayyinappudu DB nundi fetch
  useEffect(() => {
    loadApps();
  }, []);

  const loadApps = async () => {
    try {
      setLoading(true);
      const data = await fetchAppsApi();
      const formatted = data.map((item) => ({
        ...item,
        id: String(item.id),
        image: item.imageUrl ? { uri: item.imageUrl } : null,
        price: item.price ? `₹${Number(item.price).toLocaleString('en-IN')}` : 'Free',
        isUserUploaded: true,
      }));
      setApps(formatted);
    } catch (error) {
      console.log('MarketplaceContext loadApps error:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Upload ayyinappudu DB ki save + local state update
  const addApp = async (formData) => {
    const newApp = {
      id: `app-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      price: formData.price
        ? `₹${Number(formData.price).toLocaleString('en-IN')}`
        : 'Free',
      image: formData.image || null,
      ownerName: formData.ownerName,
      ownerEmail: formData.ownerEmail,
      ownerPhone: formData.ownerPhone,
      company: formData.company,
      features: formData.features,
      isUserUploaded: true,
    };
    // ✅ Local state lo immediately add cheyyi
    setApps((prev) => [newApp, ...prev]);
    return newApp;
  };

  const value = useMemo(
    () => ({ apps, loading, addApp, refreshApps: loadApps }),
    [apps, loading]
  );

  return (
    <MarketplaceContext.Provider value={value}>
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used inside MarketplaceProvider');
  }
  return context;
}