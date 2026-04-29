// const BASE_URL = 'http://192.168.0.9:8082/api';

// const headers = {
//   'Content-Type': 'application/json',
//   Accept: 'application/json',
// };

// export async function signUpApi({ fullName, email, mobile, password }) {
//   try {
//     const response = await fetch(`${BASE_URL}/auth/signup`, {
//       method: 'POST',
//       headers,
//       body: JSON.stringify({ fullName, email, mobile, password }),
//     });
//     const data = await response.json();
//     if (!response.ok) {
//       const err = new Error(data.message || 'Sign up failed');
//       err.fieldErrors = data.errors || {};
//       throw err;
//     }
//     return data;
//   } catch (error) {
//     if (error.message === 'Network request failed') {
//       throw new Error('Cannot connect to server. Check your BASE_URL and backend.');
//     }
//     throw error;
//   }
// }

// export async function signInApi({ email, password }) {
//   try {
//     const response = await fetch(`${BASE_URL}/auth/signin`, {
//       method: 'POST',
//       headers,
//       body: JSON.stringify({ email, password }),
//     });
//     const data = await response.json();
//     if (!response.ok) {
//       const err = new Error(data.message || 'Sign in failed');
//       err.fieldErrors = data.errors || {};
//       throw err;
//     }
//     return data;
//   } catch (error) {
//     if (error.message === 'Network request failed') {
//       throw new Error('Cannot connect to server. Check your BASE_URL and backend.');
//     }
//     throw error;
//   }
// }

// export async function fetchNotificationsApi() {
//   try {
//     const response = await fetch(`${BASE_URL}/notifications`);
//     return await response.json();
//   } catch (error) {
//     console.log('fetchNotificationsApi error', error);
//     return [];
//   }
// }



// export async function uploadAppApi(appData) {
//   try {
//     const payload = {
//       title: appData.title,
//       description: appData.description,
//       category: appData.category,
//       price: parseFloat(appData.price), // ✅ number ga convert
//       ownerName: appData.ownerName,
//       ownerEmail: appData.ownerEmail,
//       ownerPhone: appData.ownerPhone,
//       company: appData.company,
//       features: appData.features,
//       imageUrl: appData.image ? appData.image.uri : null,
//     };

//     const response = await fetch(`${BASE_URL}/apps/upload`, {
//       method: 'POST',
//       headers,
//       body: JSON.stringify(payload),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       const err = new Error(data.message || 'Upload failed');
//       err.fieldErrors = data.errors || {};
//       throw err;
//     }

//     return data;
//   } catch (error) {
//     if (error.message === 'Network request failed') {
//       throw new Error('Cannot connect to server. Check BASE_URL');
//     }
//     throw error;
//   }
// }

// // ✅ Get all apps from backend
// export async function fetchAppsApi() {
//   try {
//     const response = await fetch(`${BASE_URL}/apps`);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.log('fetchAppsApi error', error);
//     return [];
//   }
// }

// // ✅ Correct — forgotPasswordApi
// export async function forgotPasswordApi(email) {
//   try {
//     const response = await fetch(`${BASE_URL}/auth/forgot-password`, {
//       method: 'POST',
//       headers,
//       body: JSON.stringify({ email }),
//     });

//     const data = await response.json();

//     if (!response.ok || !data.success) {
//       throw new Error(data.message || 'Failed to send reset link');
//     }

//     return data;
//   } catch (error) {
//     if (error.message === 'Network request failed') {
//       throw new Error('Cannot connect to server. Check BASE_URL');
//     }
//     throw error;
//   }
// } // ✅ ikkada properly close avutundi

// // ✅ Correct — resetPasswordApi (outside forgotPasswordApi)
// export async function resetPasswordApi(email, newPassword) {
//   try {
//     const response = await fetch(`${BASE_URL}/auth/reset-password`, {
//       method: 'POST',
//       headers,
//       body: JSON.stringify({ email, newPassword }),
//     });

//     const data = await response.json();

//     if (!response.ok || !data.success) {
//       throw new Error(data.message || 'Failed to reset password');
//     }

//     return data;
//   } catch (error) {
//     if (error.message === 'Network request failed') {
//       throw new Error('Cannot connect to server. Check BASE_URL');
//     }
//     throw error;
//   }
// } // ✅ ikkada properly close avutundi

// export async function submitContactApi({ name, email, mobile, subject, message }) {
//   try {
//     const response = await fetch(`${BASE_URL}/contact/submit`, {
//       method: 'POST',
//       headers,
//       body: JSON.stringify({ name, email, mobile, subject, message }),
//     });
//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error(data.message || 'Failed to submit inquiry');
//     }
//     return data;
//   } catch (error) {
//     if (error.message === 'Network request failed') {
//       throw new Error('Cannot connect to server. Check your network and backend.');
//     }
//     throw error;
//   }
//   // ✅ Get profile
// export async function getProfileApi(userId) {
//   try {
//     const response = await fetch(`${BASE_URL}/profile/${userId}`, {
//       headers,
//     });
//     const data = await response.json();
//     if (!response.ok) throw new Error(data.message || 'Failed to get profile');
//     return data;
//   } catch (error) {
//     if (error.message === 'Network request failed') {
//       throw new Error('Cannot connect to server.');
//     }
//     throw error;
//   }
// }

// // ✅ Update profile
// export async function updateProfileApi(userId, profileData) {
//   try {
//     const response = await fetch(`${BASE_URL}/profile/${userId}`, {
//       method: 'PUT',
//       headers,
//       body: JSON.stringify(profileData),
//     });
//     const data = await response.json();
//     if (!response.ok) throw new Error(data.message || 'Profile update failed');
//     return data;
//   } catch (error) {
//     if (error.message === 'Network request failed') {
//       throw new Error('Cannot connect to server.');
//     }
//     throw error;
//   }
// }
// }

// const BASE_URL = 'http://192.168.0.17:8082/api';

// const headers = {
//   'Content-Type': 'application/json',
//   Accept: 'application/json',
// };

// export async function signUpApi({ fullName, email, mobile, password }) {
//   try {
//     const response = await fetch(`${BASE_URL}/auth/signup`, {
//       method: 'POST',
//       headers,
//       body: JSON.stringify({ fullName, email, mobile, password }),
//     });
//     const data = await response.json();
//     if (!response.ok) {
//       const err = new Error(data.message || 'Sign up failed');
//       err.fieldErrors = data.errors || {};
//       throw err;
//     }
//     return data;
//   } catch (error) {
//     if (error.message === 'Network request failed') {
//       throw new Error('Cannot connect to server. Check your BASE_URL and backend.');
//     }
//     throw error;
//   }
// }

// export async function signInApi({ email, password }) {
//   try {
//     const response = await fetch(`${BASE_URL}/auth/signin`, {
//       method: 'POST',
//       headers,
//       body: JSON.stringify({ email, password }),
//     });
//     const data = await response.json();
//     if (!response.ok) {
//       const err = new Error(data.message || 'Sign in failed');
//       err.fieldErrors = data.errors || {};
//       throw err;
//     }
//     return data;
//   } catch (error) {
//     if (error.message === 'Network request failed') {
//       throw new Error('Cannot connect to server. Check your BASE_URL and backend.');
//     }
//     throw error;
//   }
// }

// export async function fetchNotificationsApi() {
//   try {
//     const response = await fetch(`${BASE_URL}/notifications`);
//     return await response.json();
//   } catch (error) {
//     console.log('fetchNotificationsApi error', error);
//     return [];
//   }
// }

// // ✅ Get profile
// export async function getProfileApi(userId) {
//   try {
//     const response = await fetch(`${BASE_URL}/profile/${userId}`, {
//       headers,
//     });
//     const data = await response.json();
//     if (!response.ok) throw new Error(data.message || 'Failed to get profile');
//     return data;
//   } catch (error) {
//     if (error.message === 'Network request failed') {
//       throw new Error('Cannot connect to server.');
//     }
//     throw error;
//   }
// }

// // ✅ Update profile
// export async function updateProfileApi(userId, profileData) {
//   try {
//     const response = await fetch(`${BASE_URL}/profile/${userId}`, {
//       method: 'PUT',
//       headers,
//       body: JSON.stringify(profileData),
//     });
//     const data = await response.json();
//     if (!response.ok) throw new Error(data.message || 'Profile update failed');
//     return data;
//   } catch (error) {
//     if (error.message === 'Network request failed') {
//       throw new Error('Cannot connect to server.');
//     }
//     throw error;
//   }
// }

// // export async function uploadAppApi(appData) {
// //   try {
// //     const payload = {
// //       title: appData.title,
// //       description: appData.description,
// //       category: appData.category,
// //       price: parseFloat(appData.price),
// //       ownerName: appData.ownerName,
// //       ownerEmail: appData.ownerEmail,
// //       ownerPhone: appData.ownerPhone,
// //       company: appData.company,
// //       features: appData.features,
// //       imageUrl: appData.image ? appData.image.uri : null,
// //     };
// //     const response = await fetch(`${BASE_URL}/apps/upload`, {
// //       method: 'POST',
// //       headers,
// //       body: JSON.stringify(payload),
// //     });
// //     const data = await response.json();
// //     if (!response.ok) {
// //       const err = new Error(data.message || 'Upload failed');
// //       err.fieldErrors = data.errors || {};
// //       throw err;
// //     }
// //     return data;
// //   } catch (error) {
// //     if (error.message === 'Network request failed') {
// //       throw new Error('Cannot connect to server. Check BASE_URL');
// //     }
// //     throw error;
// //   }
// // }
// export async function uploadAppApi(appData) {
//   try {
//     const payload = {
//       title: appData.title,
//       description: appData.description,
//       category: appData.category,
//       price: parseFloat(appData.price),
//       ownerName: appData.ownerName,
//       ownerEmail: appData.ownerEmail,
//       ownerPhone: appData.ownerPhone,
//       company: appData.company,
//       features: appData.features,
//       imageUrl: appData.image ? appData.image.uri : null,
//     };

//     const response = await fetch(`${BASE_URL}/apps/upload`, {
//       method: 'POST',
//       headers,
//       body: JSON.stringify(payload),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       const err = new Error(data.message || 'Upload failed');
//       err.fieldErrors = data.errors || {};
//       throw err;
//     }

//     // ✅ ADD THIS (important for notification)
//     return {
//       ...data,
//       message: "App sent to admin for approval"
//     };

//   } catch (error) {
//     if (error.message === 'Network request failed') {
//       throw new Error('Cannot connect to server. Check BASE_URL');
//     }
//     throw error;
//   }
// }

// // export async function fetchAppsApi() {

// //   try {
// //     const response = await fetch(`${BASE_URL}/apps`);
// //     const data = await response.json();
// //     return data;
// //   } catch (error) {
// //     console.log('fetchAppsApi error', error);
// //     return [];
// //   }
// // }
// export async function fetchAppsApi() {
//   try {
//     const response = await fetch(`${BASE_URL}/apps`);
//     const data = await response.json();
//     return Array.isArray(data) ? data : [];
//   } catch (error) {
//     console.log('fetchAppsApi error', error);
//     return [];
//   }
// }

// export async function forgotPasswordApi(email) {
//   try {
//     const response = await fetch(`${BASE_URL}/auth/forgot-password`, {
//       method: 'POST',
//       headers,
//       body: JSON.stringify({ email }),
//     });
//     const data = await response.json();
//     if (!response.ok || !data.success) {
//       throw new Error(data.message || 'Failed to send reset link');
//     }
//     return data;
//   } catch (error) {
//     if (error.message === 'Network request failed') {
//       throw new Error('Cannot connect to server. Check BASE_URL');
//     }
//     throw error;
//   }
// }

// export async function resetPasswordApi(email, newPassword) {
//   try {
//     const response = await fetch(`${BASE_URL}/auth/reset-password`, {
//       method: 'POST',
//       headers,
//       body: JSON.stringify({ email, newPassword }),
//     });
//     const data = await response.json();
//     if (!response.ok || !data.success) {
//       throw new Error(data.message || 'Failed to reset password');
//     }
//     return data;
//   } catch (error) {
//     if (error.message === 'Network request failed') {
//       throw new Error('Cannot connect to server. Check BASE_URL');
//     }
//     throw error;
//   }
// }
// // ✅ Admin: get pending apps
// export async function fetchPendingAppsApi() {
//   try {
//     const response = await fetch(`${BASE_URL}/apps/pending`);
//     const data = await response.json();

//     // 🔥 VERY IMPORTANT FIX
//     if (!response.ok) {
//       console.log('Backend error:', data);
//       return [];
//     }

//     // ✅ Ensure always array
//     return Array.isArray(data) ? data : [];
    
//   } catch (error) {
//     console.log('fetchPendingAppsApi error', error);
//     return [];
//   }
// }

// // ✅ Admin: approve app
// export async function approveAppApi(appId) {
//   const response = await fetch(`${BASE_URL}/apps/${appId}/approve`, {
//     method: 'PUT',
//     headers,
//   });
//   const data = await response.json();
//   if (!response.ok) throw new Error(data.message || 'Approve failed');
//   return data;
// }

// // ✅ Admin: reject app
// export async function rejectAppApi(appId) {
//   const response = await fetch(`${BASE_URL}/apps/${appId}/reject`, {
//     method: 'PUT',
//     headers,
//   });
//   const data = await response.json();
//   if (!response.ok) throw new Error(data.message || 'Reject failed');
//   return data;
// }
// // ✅ Fetch notifications by role (USER or ADMIN)
// export async function fetchNotificationsByRoleApi(role) {
//   try {
//     const response = await fetch(`${BASE_URL}/notifications/${role}`);
//     const data = await response.json();
//     return Array.isArray(data) ? data : [];
//   } catch (error) {
//     console.log('fetchNotificationsByRoleApi error', error);
//     return [];
//   }
// }

// // ✅ Fetch unread count
// export async function fetchUnreadCountApi(role) {
//   try {
//     const response = await fetch(`${BASE_URL}/notifications/${role}/unread-count`);
//     const data = await response.json();
//     return data.count || 0;
//   } catch (error) {
//     return 0;
//   }
// }

// // ✅ Mark all read
// export async function markAllNotificationsReadApi(role) {
//   try {
//     await fetch(`${BASE_URL}/notifications/${role}/mark-read`, {
//       method: 'PUT',
//       headers,
//     });
//   } catch (error) {
//     console.log('markAllNotificationsReadApi error', error);
//   }
// }

// // ✅ Fetch app stats (for admin — persistent counts)
// export async function fetchAppStatsApi() {
//   try {
//     const response = await fetch(`${BASE_URL}/apps/stats`);
//     const data = await response.json();
//     return { pending: data.pending || 0, approved: data.approved || 0, rejected: data.rejected || 0 };
//   } catch (error) {
//     return { pending: 0, approved: 0, rejected: 0 };
//   }
// }
// export async function submitContactApi({ name, email, mobile, subject, message }) {
//   try {
//     const response = await fetch(`${BASE_URL}/contact/submit`, {
//       method: 'POST',
//       headers,
//       body: JSON.stringify({ name, email, mobile, subject, message }),
//     });
//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error(data.message || 'Failed to submit inquiry');
//     }
//     return data;
//   } catch (error) {
//     if (error.message === 'Network request failed') {
//       throw new Error('Cannot connect to server. Check your network and backend.');
//     }
//     throw error;
//   }
// }
// const BASE_URL = 'http://192.168.0.17:8082/api';

// const headers = {
//   'Content-Type': 'application/json',
//   Accept: 'application/json',
// };

// export async function signUpApi({ fullName, email, mobile, password }) {
//   try {
//     const response = await fetch(`${BASE_URL}/auth/signup`, {
//       method: 'POST', headers,
//       body: JSON.stringify({ fullName, email, mobile, password }),
//     });
//     const data = await response.json();
//     if (!response.ok) {
//       const err = new Error(data.message || 'Sign up failed');
//       err.fieldErrors = data.errors || {};
//       throw err;
//     }
//     return data;
//   } catch (error) {
//     if (error.message === 'Network request failed')
//       throw new Error('Cannot connect to server. Check your BASE_URL and backend.');
//     throw error;
//   }
// }

// export async function signInApi({ email, password }) {
//   try {
//     const response = await fetch(`${BASE_URL}/auth/signin`, {
//       method: 'POST', headers,
//       body: JSON.stringify({ email, password }),
//     });
//     const data = await response.json();
//     if (!response.ok) {
//       const err = new Error(data.message || 'Sign in failed');
//       err.fieldErrors = data.errors || {};
//       throw err;
//     }
//     return data;
//   } catch (error) {
//     if (error.message === 'Network request failed')
//       throw new Error('Cannot connect to server. Check your BASE_URL and backend.');
//     throw error;
//   }
// }

// export async function getProfileApi(userId) {
//   try {
//     const response = await fetch(`${BASE_URL}/profile/${userId}`, { headers });
//     const data = await response.json();
//     if (!response.ok) throw new Error(data.message || 'Failed to get profile');
//     return data;
//   } catch (error) {
//     if (error.message === 'Network request failed')
//       throw new Error('Cannot connect to server.');
//     throw error;
//   }
// }

// export async function updateProfileApi(userId, profileData) {
//   try {
//     const response = await fetch(`${BASE_URL}/profile/${userId}`, {
//       method: 'PUT', headers,
//       body: JSON.stringify(profileData),
//     });
//     const data = await response.json();
//     if (!response.ok) throw new Error(data.message || 'Profile update failed');
//     return data;
//   } catch (error) {
//     if (error.message === 'Network request failed')
//       throw new Error('Cannot connect to server.');
//     throw error;
//   }
// }

// export async function uploadAppApi(appData) {
//   try {
//     const payload = {
//       title: appData.title,
//       description: appData.description,
//       category: appData.category,
//       price: parseFloat(appData.price),
//       ownerName: appData.ownerName,
//       ownerEmail: appData.ownerEmail,
//       ownerPhone: appData.ownerPhone,
//       company: appData.company,
//       features: appData.features,
//       imageUrl: appData.image ? appData.image.uri : null,
//     };
//     const response = await fetch(`${BASE_URL}/apps/upload`, {
//       method: 'POST', headers,
//       body: JSON.stringify(payload),
//     });
//     const data = await response.json();
//     if (!response.ok) {
//       const err = new Error(data.message || 'Upload failed');
//       err.fieldErrors = data.errors || {};
//       throw err;
//     }
//     return data;
//   } catch (error) {
//     if (error.message === 'Network request failed')
//       throw new Error('Cannot connect to server. Check BASE_URL');
//     throw error;
//   }
// }

// export async function fetchAppsApi() {
//   try {
//     const response = await fetch(`${BASE_URL}/apps`);
//     const data = await response.json();
//     return Array.isArray(data) ? data : [];
//   } catch (error) {
//     console.log('fetchAppsApi error', error);
//     return [];
//   }
// }

// export async function fetchPendingAppsApi() {
//   try {
//     const response = await fetch(`${BASE_URL}/apps/pending`);
//     if (!response.ok) return [];
//     const data = await response.json();
//     return Array.isArray(data) ? data : [];
//   } catch (error) {
//     console.log('fetchPendingAppsApi error', error);
//     return [];
//   }
// }

// // ✅ FIXED — /api/apps/stats endpoint
// export async function fetchAppStatsApi() {
//   try {
//     const response = await fetch(`${BASE_URL}/apps/stats`);
//     if (!response.ok) return { pending: 0, approved: 0, rejected: 0 };
//     const data = await response.json();
//     return {
//       pending:  Number(data.pending)  || 0,
//       approved: Number(data.approved) || 0,
//       rejected: Number(data.rejected) || 0,
//     };
//   } catch (error) {
//     console.log('fetchAppStatsApi error', error);
//     return { pending: 0, approved: 0, rejected: 0 };
//   }
// }

// export async function approveAppApi(appId) {
//   const response = await fetch(`${BASE_URL}/apps/${appId}/approve`, {
//     method: 'PUT', headers,
//   });
//   const data = await response.json();
//   if (!response.ok) throw new Error(data.message || 'Approve failed');
//   return data;
// }

// export async function rejectAppApi(appId) {
//   const response = await fetch(`${BASE_URL}/apps/${appId}/reject`, {
//     method: 'PUT', headers,
//   });
//   const data = await response.json();
//   if (!response.ok) throw new Error(data.message || 'Reject failed');
//   return data;
// }

// // ✅ FIXED — fetch notifications by role (ADMIN or USER)
// export async function fetchNotificationsByRoleApi(role) {
//   try {
//     const response = await fetch(`${BASE_URL}/notifications/${role}`);
//     if (!response.ok) return [];
//     const data = await response.json();
//     return Array.isArray(data) ? data : [];
//   } catch (error) {
//     console.log('fetchNotificationsByRoleApi error', error);
//     return [];
//   }
// }

// // ✅ FIXED — unread count for bell badge
// export async function fetchUnreadCountApi(role) {
//   try {
//     const response = await fetch(`${BASE_URL}/notifications/${role}/unread-count`);
//     if (!response.ok) return 0;
//     const data = await response.json();
//     return Number(data.count) || 0;
//   } catch (error) {
//     console.log('fetchUnreadCountApi error', error);
//     return 0;
//   }
// }

// // ✅ Mark all notifications as read
// export async function markAllNotificationsReadApi(role) {
//   try {
//     await fetch(`${BASE_URL}/notifications/${role}/mark-read`, {
//       method: 'PUT', headers,
//     });
//   } catch (error) {
//     console.log('markAllNotificationsReadApi error', error);
//   }
// }

// export async function forgotPasswordApi(email) {
//   try {
//     const response = await fetch(`${BASE_URL}/auth/forgot-password`, {
//       method: 'POST', headers,
//       body: JSON.stringify({ email }),
//     });
//     const data = await response.json();
//     if (!response.ok || !data.success)
//       throw new Error(data.message || 'Failed to send reset link');
//     return data;
//   } catch (error) {
//     if (error.message === 'Network request failed')
//       throw new Error('Cannot connect to server. Check BASE_URL');
//     throw error;
//   }
// }

// export async function resetPasswordApi(email, newPassword) {
//   try {
//     const response = await fetch(`${BASE_URL}/auth/reset-password`, {
//       method: 'POST', headers,
//       body: JSON.stringify({ email, newPassword }),
//     });
//     const data = await response.json();
//     if (!response.ok || !data.success)
//       throw new Error(data.message || 'Failed to reset password');
//     return data;
//   } catch (error) {
//     if (error.message === 'Network request failed')
//       throw new Error('Cannot connect to server. Check BASE_URL');
//     throw error;
//   }
// }

// export async function submitContactApi({ name, email, mobile, subject, message }) {
//   try {
//     const response = await fetch(`${BASE_URL}/contact/submit`, {
//       method: 'POST', headers,
//       body: JSON.stringify({ name, email, mobile, subject, message }),
//     });
//     const data = await response.json();
//     if (!response.ok) throw new Error(data.message || 'Failed to submit inquiry');
//     return data;
//   } catch (error) {
//     if (error.message === 'Network request failed')
//       throw new Error('Cannot connect to server. Check your network and backend.');
//     throw error;
//   }
// }

const BASE_URL = 'http://192.168.0.10:8082/api';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

// ── Auth ──────────────────────────────────────────────────────────────
export async function signUpApi({ fullName, email, mobile, password }) {
  try {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST', headers,
      body: JSON.stringify({ fullName, email, mobile, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      const err = new Error(data.message || 'Sign up failed');
      err.fieldErrors = data.errors || {};
      throw err;
    }
    return data;
  } catch (error) {
    if (error.message === 'Network request failed')
      throw new Error('Cannot connect to server. Check your BASE_URL and backend.');
    throw error;
  }
}

export async function signInApi({ email, password }) {
  try {
    const response = await fetch(`${BASE_URL}/auth/signin`, {
      method: 'POST', headers,
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      const err = new Error(data.message || 'Sign in failed');
      err.fieldErrors = data.errors || {};
      throw err;
    }
    return data;
  } catch (error) {
    if (error.message === 'Network request failed')
      throw new Error('Cannot connect to server. Check your BASE_URL and backend.');
    throw error;
  }
}

export async function forgotPasswordApi(email) {
  try {
    const response = await fetch(`${BASE_URL}/auth/forgot-password`, {
      method: 'POST', headers,
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (!response.ok || !data.success)
      throw new Error(data.message || 'Failed to send reset link');
    return data;
  } catch (error) {
    if (error.message === 'Network request failed')
      throw new Error('Cannot connect to server. Check BASE_URL');
    throw error;
  }
}

export async function resetPasswordApi(email, newPassword) {
  try {
    const response = await fetch(`${BASE_URL}/auth/reset-password`, {
      method: 'POST', headers,
      body: JSON.stringify({ email, newPassword }),
    });
    const data = await response.json();
    if (!response.ok || !data.success)
      throw new Error(data.message || 'Failed to reset password');
    return data;
  } catch (error) {
    if (error.message === 'Network request failed')
      throw new Error('Cannot connect to server. Check BASE_URL');
    throw error;
  }
}

// ── Profile ───────────────────────────────────────────────────────────
export async function getProfileApi(userId) {
  try {
    const response = await fetch(`${BASE_URL}/profile/${userId}`, { headers });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to get profile');
    return data;
  } catch (error) {
    if (error.message === 'Network request failed')
      throw new Error('Cannot connect to server.');
    throw error;
  }
}

export async function updateProfileApi(userId, profileData) {
  try {
    const response = await fetch(`${BASE_URL}/profile/${userId}`, {
      method: 'PUT', headers,
      body: JSON.stringify(profileData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Profile update failed');
    return data;
  } catch (error) {
    if (error.message === 'Network request failed')
      throw new Error('Cannot connect to server.');
    throw error;
  }
}

// ── Apps ──────────────────────────────────────────────────────────────

// Upload new app (saves as PENDING)
// export async function uploadAppApi(appData) {
//   try {
//     const payload = {
//       title:      appData.title,
//       description:appData.description,
//       category:   appData.category,
//       price:      parseFloat(appData.price),
//       ownerName:  appData.ownerName,
//       ownerEmail: appData.ownerEmail,
//       ownerPhone: appData.ownerPhone,
//       company:    appData.company,
//       features:   appData.features,
//       imageUrl:   appData.image ? appData.image.uri : null,
//     };
//     const response = await fetch(`${BASE_URL}/apps/upload`, {
//       method: 'POST', headers,
//       body: JSON.stringify(payload),
//     });
//     const data = await response.json();
//     if (!response.ok) {
//       const err = new Error(data.message || 'Upload failed');
//       err.fieldErrors = data.errors || {};
//       throw err;
//     }
//     return data;
//   } catch (error) {
//     if (error.message === 'Network request failed')
//       throw new Error('Cannot connect to server. Check BASE_URL');
//     throw error;
//   }
// }
export async function uploadAppApi(appData) {
  try {
    const payload = {
      title:      appData.title,
      description:appData.description,
      category:   appData.category,
      price:      parseFloat(appData.price),
      ownerName:  appData.ownerName,
      ownerEmail: appData.ownerEmail,
      ownerPhone: appData.ownerPhone,
      company:    appData.company,
      features:   appData.features,
      // ✅ send all image URIs as array
      imageUrls:  appData.images ? appData.images.map(img => img.uri) : [],
      // ✅ first image as primary imageUrl for backward compat
      imageUrl:   appData.images && appData.images.length > 0 ? appData.images[0].uri : null,
    };
    const response = await fetch(`${BASE_URL}/apps/upload`, {
      method: 'POST', headers,
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) {
      const err = new Error(data.message || 'Upload failed');
      err.fieldErrors = data.errors || {};
      throw err;
    }
    return data;
  } catch (error) {
    if (error.message === 'Network request failed')
      throw new Error('Cannot connect to server. Check BASE_URL');
    throw error;
  }
}

// Get only APPROVED apps (marketplace)
export async function fetchAppsApi() {
  try {
    const response = await fetch(`${BASE_URL}/apps`);
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.log('fetchAppsApi error', error);
    return [];
  }
}

// Get PENDING apps (admin queue)
export async function fetchPendingAppsApi() {
  try {
    const response = await fetch(`${BASE_URL}/apps/pending`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.log('fetchPendingAppsApi error', error);
    return [];
  }
}

// Admin stats — persistent DB counts
export async function fetchAppStatsApi() {
  try {
    const response = await fetch(`${BASE_URL}/apps/stats`);
    if (!response.ok) return { pending: 0, approved: 0, rejected: 0 };
    const data = await response.json();
    return {
      pending:  Number(data.pending)  || 0,
      approved: Number(data.approved) || 0,
      rejected: Number(data.rejected) || 0,
    };
  } catch (error) {
    console.log('fetchAppStatsApi error', error);
    return { pending: 0, approved: 0, rejected: 0 };
  }
}

// Approve app
export async function approveAppApi(appId) {
  const response = await fetch(`${BASE_URL}/apps/${appId}/approve`, {
    method: 'PUT', headers,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Approve failed');
  return data;
}

// Reject app
export async function rejectAppApi(appId) {
  const response = await fetch(`${BASE_URL}/apps/${appId}/reject`, {
    method: 'PUT', headers,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Reject failed');
  return data;
}

// ── Notifications ─────────────────────────────────────────────────────

// ADMIN notifications
export async function fetchAdminNotificationsApi() {
  try {
    const response = await fetch(`${BASE_URL}/notifications/ADMIN`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.log('fetchAdminNotificationsApi error', error);
    return [];
  }
}

// ADMIN unread count (bell badge)
export async function fetchAdminUnreadCountApi() {
  try {
    const response = await fetch(`${BASE_URL}/notifications/ADMIN/unread-count`);
    if (!response.ok) return 0;
    const data = await response.json();
    return Number(data.count) || 0;
  } catch (error) {
    return 0;
  }
}

// Mark ADMIN notifications as read
export async function markAdminNotificationsReadApi() {
  try {
    await fetch(`${BASE_URL}/notifications/ADMIN/mark-read`, {
      method: 'PUT', headers,
    });
  } catch (error) {
    console.log('markAdminNotificationsReadApi error', error);
  }
}

// USER notifications — pass email to get only their notifications
export async function fetchUserNotificationsApi(email) {
  try {
    const url = email
      ? `${BASE_URL}/notifications/USER?email=${encodeURIComponent(email)}`
      : `${BASE_URL}/notifications/USER`;
    const response = await fetch(url);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.log('fetchUserNotificationsApi error', error);
    return [];
  }
}

// USER unread count
export async function fetchUserUnreadCountApi(email) {
  try {
    const url = email
      ? `${BASE_URL}/notifications/USER/unread-count?email=${encodeURIComponent(email)}`
      : `${BASE_URL}/notifications/USER/unread-count`;
    const response = await fetch(url);
    if (!response.ok) return 0;
    const data = await response.json();
    return Number(data.count) || 0;
  } catch (error) {
    return 0;
  }
}

// Mark USER notifications as read
export async function markUserNotificationsReadApi(email) {
  try {
    const url = email
      ? `${BASE_URL}/notifications/USER/mark-read?email=${encodeURIComponent(email)}`
      : `${BASE_URL}/notifications/USER/mark-read`;
    await fetch(url, { method: 'PUT', headers });
  } catch (error) {
    console.log('markUserNotificationsReadApi error', error);
  }
}

// ── Contact ───────────────────────────────────────────────────────────
export async function submitContactApi({ name, email, mobile, subject, message }) {
  try {
    const response = await fetch(`${BASE_URL}/contact/submit`, {
      method: 'POST', headers,
      body: JSON.stringify({ name, email, mobile, subject, message }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to submit inquiry');
    return data;
  } catch (error) {
    if (error.message === 'Network request failed')
      throw new Error('Cannot connect to server. Check your network and backend.');
    throw error;
  }
}