


// const BASE_URL = 'http://13.235.206.54:8080/api';

// const headers = {
//'Content-Type': 'application/json',
//   Accept: 'application/json',
// };

// // ── Auth ──────────────────────────────────────────────────────────────
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

// // ── Profile ───────────────────────────────────────────────────────────
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

// // ── Apps ──────────────────────────────────────────────────────────────

// // ✅ User upload — saves as PENDING, triggers ADMIN notification only
// export async function uploadAppApi(appData) {
//   try {
//     const payload = {
//       title:       appData.title,
//       description: appData.description,
//       category:    appData.category,
//       price:       parseFloat(appData.price),
//       ownerName:   appData.ownerName,
//       ownerEmail:  appData.ownerEmail,
//       ownerPhone:  appData.ownerPhone,
//       company:     appData.company,
//       features:    appData.features,
//       imageUrls:   appData.images ? appData.images.map(img => img.uri) : [],
//       imageUrl:    appData.images && appData.images.length > 0 ? appData.images[0].uri : null,
//       // status defaults to 'pending' on backend
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

// // ✅ Admin upload — upload then immediately approve (no USER notification on upload, only on approve)
// export async function uploadAppDirectApi(appData) {
//   try {
//     const payload = {
//       title:       appData.title,
//       description: appData.description,
//       category:    appData.category,
//       price:       parseFloat(appData.price),
//       ownerName:   appData.ownerName,
//       ownerEmail:  appData.ownerEmail,
//       ownerPhone:  appData.ownerPhone,
//       company:     appData.company,
//       features:    appData.features,
//       imageUrls:   appData.images ? appData.images.map(img => img.uri) : [],
//       imageUrl:    appData.images && appData.images.length > 0 ? appData.images[0].uri : null,
//     };

//     // Step 1 — upload (pending గా save అవుతుంది)
//     const uploadResponse = await fetch(`${BASE_URL}/apps/upload`, {
//       method: 'POST', headers,
//       body: JSON.stringify(payload),
//     });
//     const uploadData = await uploadResponse.json();
//     if (!uploadResponse.ok) throw new Error(uploadData.message || 'Upload failed');

//     // Step 2 — immediately approve
//     const appId = uploadData.id || uploadData.appId || uploadData._id;
//     if (appId) {
//       await fetch(`${BASE_URL}/apps/${appId}/approve`, {
//         method: 'PUT', headers,
//       });
//     }

//     return uploadData;
//   } catch (error) {
//     if (error.message === 'Network request failed')
//       throw new Error('Cannot connect to server. Check BASE_URL');
//     throw error;
//   }
// }

// // Get only APPROVED apps (marketplace)
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

// // Get PENDING apps (admin queue)
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

// // Admin stats
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

// // Approve app
// export async function approveAppApi(appId) {
//   const response = await fetch(`${BASE_URL}/apps/${appId}/approve`, {
//     method: 'PUT', headers,
//   });
//   const data = await response.json();
//   if (!response.ok) throw new Error(data.message || 'Approve failed');
//   return data;
// }

// // Reject app
// export async function rejectAppApi(appId) {
//   const response = await fetch(`${BASE_URL}/apps/${appId}/reject`, {
//     method: 'PUT', headers,
//   });
//   const data = await response.json();
//   if (!response.ok) throw new Error(data.message || 'Reject failed');
//   return data;
// }

// // ── Notifications ─────────────────────────────────────────────────────

// // ADMIN notifications — only SUBMISSION type
// export async function fetchAdminNotificationsApi() {
//   try {
//     const response = await fetch(`${BASE_URL}/notifications/ADMIN`);
//     if (!response.ok) return [];
//     const data = await response.json();
//     return Array.isArray(data) ? data : [];
//   } catch (error) {
//     console.log('fetchAdminNotificationsApi error', error);
//     return [];
//   }
// }

// // ADMIN unread count (bell badge) — resets to 0 after visiting notifications
// export async function fetchAdminUnreadCountApi() {
//   try {
//     const response = await fetch(`${BASE_URL}/notifications/ADMIN/unread-count`);
//     if (!response.ok) return 0;
//     const data = await response.json();
//     return Number(data.count) || 0;
//   } catch (error) {
//     return 0;
//   }
// }

// // Mark ADMIN notifications as read
// export async function markAdminNotificationsReadApi() {
//   try {
//     await fetch(`${BASE_URL}/notifications/ADMIN/mark-read`, {
//       method: 'PUT', headers,
//     });
//   } catch (error) {
//     console.log('markAdminNotificationsReadApi error', error);
//   }
// }

// // USER notifications — only APPROVED/REJECTED type for their email
// export async function fetchUserNotificationsApi(email) {
//   try {
//     const url = email
//       ? `${BASE_URL}/notifications/USER?email=${encodeURIComponent(email)}`
//       : `${BASE_URL}/notifications/USER`;
//     const response = await fetch(url);
//     if (!response.ok) return [];
//     const data = await response.json();
//     return Array.isArray(data) ? data : [];
//   } catch (error) {
//     console.log('fetchUserNotificationsApi error', error);
//     return [];
//   }
// }

// // USER unread count — filtered by email
// export async function fetchUserUnreadCountApi(email) {
//   try {
//     const url = email
//       ? `${BASE_URL}/notifications/USER/unread-count?email=${encodeURIComponent(email)}`
//       : `${BASE_URL}/notifications/USER/unread-count`;
//     const response = await fetch(url);
//     if (!response.ok) return 0;
//     const data = await response.json();
//     return Number(data.count) || 0;
//   } catch (error) {
//     return 0;
//   }
// }

// // Mark USER notifications as read
// export async function markUserNotificationsReadApi(email) {
//   try {
//     const url = email
//       ? `${BASE_URL}/notifications/USER/mark-read?email=${encodeURIComponent(email)}`
//       : `${BASE_URL}/notifications/USER/mark-read`;
//     await fetch(url, { method: 'PUT', headers });
//   } catch (error) {
//     console.log('markUserNotificationsReadApi error', error);
//   }
// }

// // ── Contact ───────────────────────────────────────────────────────────
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

// // ── Admin ───────────────────────────────────────────

// // First-time admin setup
// // export async function setupAdminApi({ email, password, companyName }) {
// //   try {
// //     const response = await fetch(`${BASE_URL}/admin/setup`, {
// //       method: 'POST',
// //       headers,
// //       body: JSON.stringify({ email, password, companyName }),
// //     });

// //     const data = await response.json();

// //     if (!response.ok) {
// //       const err = new Error(data.message || 'Admin setup failed');
// //       err.fieldErrors = data.errors || {};
// //       throw err;
// //     }

// //     return data;
// //   } catch (error) {
// //     if (error.message === 'Network request failed')
// //       throw new Error('Cannot connect to server. Check BASE_URL');
// //     throw error;
// //   }
// // }

// // export async function setupAdminApi({ email, password, companyName }) {
// //   console.log('📡 setupAdminApi called with:', email);
// //   console.log('🌐 URL:', `${BASE_URL}/admin/setup`);
  
// //   try {
// //     const body = JSON.stringify({ email, password, companyName });
// //     console.log('📦 Request body:', body);

// //     const response = await fetch(`${BASE_URL}/admin/setup`, {
// //       method: 'POST',
// //       headers,
// //       body,
// //     });

// //     console.log('📥 Response status:', response.status);
// //     console.log('📥 Response ok:', response.ok);

// //     const data = await response.json();
// //     console.log('📥 Response data:', JSON.stringify(data));

// //     if (!response.ok) {
// //       if (response.status === 400) {
// //         console.log('⚠️ 400 — treating as alreadyExists');
// //         return { alreadyExists: true, success: true };
// //       }
// //       throw new Error(data.message || 'Admin setup failed');
// //     }

// //     return data;

// //   } catch (error) {
// //     console.log('❌ setupAdminApi catch:', error);
// //     console.log('❌ setupAdminApi error message:', error?.message);
    
// //     if (error.message === 'Network request failed') {
// //       throw new Error('Cannot connect to server. Check BASE_URL');
// //     }
// //     throw error;
// //   }
// // }
// export async function setupAdminApi({ email, password, companyName }) {
//   try {
//     console.log('📡 setupAdminApi → URL:', `${BASE_URL}/admin/setup`);
//     console.log('📧 Email:', email);

//     const response = await fetch(`${BASE_URL}/admin/setup`, {
//       method: 'POST',
//       headers,
//       body: JSON.stringify({ email, password, companyName }),
//     });

//     console.log('📥 Status:', response.status);

//     const data = await response.json();
//     console.log('📥 Data:', JSON.stringify(data));

//     if (!response.ok) {
//       if (response.status === 400) {
//         return { alreadyExists: true, success: true };
//       }
//       throw new Error(data.message || 'Admin setup failed');
//     }

//     return data;

//   } catch (error) {
//     console.log('❌ setupAdminApi error:', error?.message);
//     if (error.message === 'Network request failed') {
//       throw new Error('Cannot connect to server. Check BASE_URL');
//     }
//     throw error;
//   }
// }
// export async function adminLoginApi({ email, password }) {
//   try {
//     const response = await fetch(`${BASE_URL}/admin/login`, {
//       method: 'POST',
//       headers,
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || 'Admin login failed');
//     }

//     return data;
//   } catch (error) {
//     if (error.message === 'Network request failed')
//       throw new Error('Cannot connect to server.');
//     throw error;
//   }
// }



// utils/apiService.js

// const BASE_URL = 'http://13.235.206.548080/api';

// const headers = {
//   'Content-Type': 'application/json',
//   Accept: 'application/json',
// };

// // ── Auth ──────────────────────────────────────────────────────────────
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

// // ── Profile ───────────────────────────────────────────────────────────
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

// // ── Apps ──────────────────────────────────────────────────────────────

// // ✅ Step 1: Images first server ki upload cheyyi → public URLs teesuko
// async function uploadImagesAndGetUrls(images) {
//   if (!images || images.length === 0) return [];

//   const formData = new FormData();

//   for (let index = 0; index < images.length; index++) {
//     const img = images[index];
//     const filename = `image_${index}_${Date.now()}.jpg`;
//     const uri = img.uri;

//     if (typeof uri === 'string' && uri.startsWith('blob:')) {
//       // Web — blob URI → Blob ga convert
//       const res = await fetch(uri);
//       const blob = await res.blob();
//       formData.append('files', blob, filename);
//     } else if (typeof uri === 'string' && uri.startsWith('data:')) {
//       // Web — base64 data URI → Blob ga convert
//       const res = await fetch(uri);
//       const blob = await res.blob();
//       formData.append('files', blob, filename);
//     } else {
//       // Mobile — file:// URI directly append
//       formData.append('files', {
//         uri,
//         type: 'image/jpeg',
//         name: filename,
//       });
//     }
//   }

//   // ✅ Content-Type set cheyyaku — multipart boundary auto set avutundi
//   const response = await fetch(`${BASE_URL}/apps/upload-images`, {
//     method: 'POST',
//     body: formData,
//   });

//   if (!response.ok) {
//     const err = await response.json().catch(() => ({}));
//     throw new Error(err.message || `Image upload failed (${response.status})`);
//   }

//   const data = await response.json();
//   // Backend returns: { urls: ["http://192.168.1.3:8085/uploads/xxx.jpg", ...] }
//   return data.urls || [];
// }

// // ✅ User upload — PENDING ga save, admin review chesali
// export async function uploadAppApi(appData) {
//   try {
//     // Step 1: Images upload → server public URLs
//     const imageUrls = await uploadImagesAndGetUrls(appData.images);

//     // Step 2: App data + server URLs submit
//     const payload = {
//       title:       appData.title,
//       description: appData.description,
//       category:    appData.category,
//       price:       parseFloat(appData.price),
//       ownerName:   appData.ownerName,
//       ownerEmail:  appData.ownerEmail,
//       ownerPhone:  appData.ownerPhone,
//       company:     appData.company,
//       features:    appData.features,
//       imageUrls:   imageUrls,
//       imageUrl:    imageUrls.length > 0 ? imageUrls[0] : null,
//     };

//     const response = await fetch(`${BASE_URL}/apps/upload`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
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

// // ✅ Admin direct publish — upload + immediately approve
// export async function uploadAppDirectApi(appData) {
//   try {
//     // Step 1: Images upload → server public URLs
//     const imageUrls = await uploadImagesAndGetUrls(appData.images);

//     // Step 2: App submit
//     const payload = {
//       title:       appData.title,
//       description: appData.description,
//       category:    appData.category,
//       price:       parseFloat(appData.price),
//       ownerName:   appData.ownerName,
//       ownerEmail:  appData.ownerEmail,
//       ownerPhone:  appData.ownerPhone,
//       company:     appData.company,
//       features:    appData.features,
//       imageUrls:   imageUrls,
//       imageUrl:    imageUrls.length > 0 ? imageUrls[0] : null,
//     };

//     const uploadResponse = await fetch(`${BASE_URL}/apps/upload`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
//       body: JSON.stringify(payload),
//     });

//     const uploadData = await uploadResponse.json();
//     if (!uploadResponse.ok) throw new Error(uploadData.message || 'Upload failed');

//     // Step 3: Immediately approve
//     const appId = uploadData.id || uploadData.appId || uploadData._id;
//     if (appId) {
//       await fetch(`${BASE_URL}/apps/${appId}/approve`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
//       });
//     }

//     return uploadData;
//   } catch (error) {
//     if (error.message === 'Network request failed')
//       throw new Error('Cannot connect to server. Check BASE_URL');
//     throw error;
//   }
// }

// // Approved apps only (marketplace)
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

// // Pending apps (admin queue)
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

// // Admin stats
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

// // ── Notifications ─────────────────────────────────────────────────────
// export async function fetchAdminNotificationsApi() {
//   try {
//     const response = await fetch(`${BASE_URL}/notifications/ADMIN`);
//     if (!response.ok) return [];
//     const data = await response.json();
//     return Array.isArray(data) ? data : [];
//   } catch (error) {
//     console.log('fetchAdminNotificationsApi error', error);
//     return [];
//   }
// }

// export async function fetchAdminUnreadCountApi() {
//   try {
//     const response = await fetch(`${BASE_URL}/notifications/ADMIN/unread-count`);
//     if (!response.ok) return 0;
//     const data = await response.json();
//     return Number(data.count) || 0;
//   } catch (error) {
//     return 0;
//   }
// }

// export async function markAdminNotificationsReadApi() {
//   try {
//     await fetch(`${BASE_URL}/notifications/ADMIN/mark-read`, {
//       method: 'PUT', headers,
//     });
//   } catch (error) {
//     console.log('markAdminNotificationsReadApi error', error);
//   }
// }

// export async function fetchUserNotificationsApi(email) {
//   try {
//     const url = email
//       ? `${BASE_URL}/notifications/USER?email=${encodeURIComponent(email)}`
//       : `${BASE_URL}/notifications/USER`;
//     const response = await fetch(url);
//     if (!response.ok) return [];
//     const data = await response.json();
//     return Array.isArray(data) ? data : [];
//   } catch (error) {
//     console.log('fetchUserNotificationsApi error', error);
//     return [];
//   }
// }

// export async function fetchUserUnreadCountApi(email) {
//   try {
//     const url = email
//       ? `${BASE_URL}/notifications/USER/unread-count?email=${encodeURIComponent(email)}`
//       : `${BASE_URL}/notifications/USER/unread-count`;
//     const response = await fetch(url);
//     if (!response.ok) return 0;
//     const data = await response.json();
//     return Number(data.count) || 0;
//   } catch (error) {
//     return 0;
//   }
// }

// export async function markUserNotificationsReadApi(email) {
//   try {
//     const url = email
//       ? `${BASE_URL}/notifications/USER/mark-read?email=${encodeURIComponent(email)}`
//       : `${BASE_URL}/notifications/USER/mark-read`;
//     await fetch(url, { method: 'PUT', headers });
//   } catch (error) {
//     console.log('markUserNotificationsReadApi error', error);
//   }
// }

// // ── Contact ───────────────────────────────────────────────────────────
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

// // ── Admin ─────────────────────────────────────────────────────────────
// export async function setupAdminApi({ email, password, companyName }) {
//   try {
//     const response = await fetch(`${BASE_URL}/admin/setup`, {
//       method: 'POST', headers,
//       body: JSON.stringify({ email, password, companyName }),
//     });
//     const data = await response.json();
//     if (response.status === 400 && data.alreadyExists) {
//       return { alreadyExists: true, success: true };
//     }
//     if (!response.ok) throw new Error(data.message || 'Admin setup failed');
//     return data;
//   } catch (error) {
//     if (error.message === 'Network request failed')
//       throw new Error('Cannot connect to server. Check BASE_URL');
//     throw error;
//   }
// }

// export async function adminLoginApi({ email, password }) {
//   try {
//     const response = await fetch(`${BASE_URL}/admin/login`, {
//       method: 'POST', headers,
//       body: JSON.stringify({ email, password }),
//     });
//     const data = await response.json();
//     if (!response.ok) {
//       const err = new Error(data.message || 'Admin login failed');
//       err.fieldErrors = data.errors || {};
//       throw err;
//     }
//     return data;
//   } catch (error) {
//     if (error.message === 'Network request failed')
//       throw new Error('Cannot connect to server.');
//     throw error;
//   }
// }


// const BASE_URL = 'http://13.235.206.54:8080/api';

// const headers = {
//   'Content-Type': 'application/json',
//   Accept: 'application/json',
// };

// // ── Auth ──────────────────────────────────────────────────────────────
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

// // ── Profile ───────────────────────────────────────────────────────────
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

// // ── Apps ──────────────────────────────────────────────────────────────
// async function uploadImagesAndGetUrls(images) {
//   if (!images || images.length === 0) return [];
//   const formData = new FormData();
//   for (let index = 0; index < images.length; index++) {
//     const img = images[index];
//     const filename = `image_${index}_${Date.now()}.jpg`;
//     const uri = img.uri;
//     if (typeof uri === 'string' && uri.startsWith('blob:')) {
//       const res = await fetch(uri);
//       const blob = await res.blob();
//       formData.append('files', blob, filename);
//     } else if (typeof uri === 'string' && uri.startsWith('data:')) {
//       const res = await fetch(uri);
//       const blob = await res.blob();
//       formData.append('files', blob, filename);
//     } else {
//       formData.append('files', { uri, type: 'image/jpeg', name: filename });
//     }
//   }
//   const response = await fetch(`${BASE_URL}/apps/upload-images`, {
//     method: 'POST',
//     body: formData,
//   });
//   if (!response.ok) {
//     const err = await response.json().catch(() => ({}));
//     throw new Error(err.message || `Image upload failed (${response.status})`);
//   }
//   const data = await response.json();
//   return data.urls || [];
// }

// export async function uploadAppApi(appData) {
//   try {
//     const imageUrls = await uploadImagesAndGetUrls(appData.images);
//     const payload = {
//       title: appData.title, description: appData.description,
//       category: appData.category, price: parseFloat(appData.price),
//       ownerName: appData.ownerName, ownerEmail: appData.ownerEmail,
//       ownerPhone: appData.ownerPhone, company: appData.company,
//       features: appData.features, imageUrls,
//       imageUrl: imageUrls.length > 0 ? imageUrls[0] : null,
//     };
//     const response = await fetch(`${BASE_URL}/apps/upload`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
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

// export async function uploadAppDirectApi(appData) {
//   try {
//     const imageUrls = await uploadImagesAndGetUrls(appData.images);
//     const payload = {
//       title: appData.title, description: appData.description,
//       category: appData.category, price: parseFloat(appData.price),
//       ownerName: appData.ownerName, ownerEmail: appData.ownerEmail,
//       ownerPhone: appData.ownerPhone, company: appData.company,
//       features: appData.features, imageUrls,
//       imageUrl: imageUrls.length > 0 ? imageUrls[0] : null,
//     };
//     const uploadResponse = await fetch(`${BASE_URL}/apps/upload`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
//       body: JSON.stringify(payload),
//     });
//     const uploadData = await uploadResponse.json();
//     if (!uploadResponse.ok) throw new Error(uploadData.message || 'Upload failed');
//     const appId = uploadData.id || uploadData.appId || uploadData._id;
//     if (appId) {
//       await fetch(`${BASE_URL}/apps/${appId}/approve`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
//       });
//     }
//     return uploadData;
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
//   const response = await fetch(`${BASE_URL}/apps/${appId}/approve`, { method: 'PUT', headers });
//   const data = await response.json();
//   if (!response.ok) throw new Error(data.message || 'Approve failed');
//   return data;
// }

// export async function rejectAppApi(appId) {
//   const response = await fetch(`${BASE_URL}/apps/${appId}/reject`, { method: 'PUT', headers });
//   const data = await response.json();
//   if (!response.ok) throw new Error(data.message || 'Reject failed');
//   return data;
// }

// // ── Notifications ─────────────────────────────────────────────────────
// export async function fetchAdminNotificationsApi() {
//   try {
//     const response = await fetch(`${BASE_URL}/notifications/ADMIN`);
//     if (!response.ok) return [];
//     const data = await response.json();
//     return Array.isArray(data) ? data : [];
//   } catch (error) {
//     console.log('fetchAdminNotificationsApi error', error);
//     return [];
//   }
// }

// export async function fetchAdminUnreadCountApi() {
//   try {
//     const response = await fetch(`${BASE_URL}/notifications/ADMIN/unread-count`);
//     if (!response.ok) return 0;
//     const data = await response.json();
//     return Number(data.count) || 0;
//   } catch (error) {
//     return 0;
//   }
// }

// export async function markAdminNotificationsReadApi() {
//   try {
//     await fetch(`${BASE_URL}/notifications/ADMIN/mark-read`, { method: 'PUT', headers });
//   } catch (error) {
//     console.log('markAdminNotificationsReadApi error', error);
//   }
// }

// export async function fetchUserNotificationsApi(email) {
//   try {
//     const url = email
//       ? `${BASE_URL}/notifications/USER?email=${encodeURIComponent(email)}`
//       : `${BASE_URL}/notifications/USER`;
//     const response = await fetch(url);
//     if (!response.ok) return [];
//     const data = await response.json();
//     return Array.isArray(data) ? data : [];
//   } catch (error) {
//     console.log('fetchUserNotificationsApi error', error);
//     return [];
//   }
// }

// export async function fetchUserUnreadCountApi(email) {
//   try {
//     const url = email
//       ? `${BASE_URL}/notifications/USER/unread-count?email=${encodeURIComponent(email)}`
//       : `${BASE_URL}/notifications/USER/unread-count`;
//     const response = await fetch(url);
//     if (!response.ok) return 0;
//     const data = await response.json();
//     return Number(data.count) || 0;
//   } catch (error) {
//     return 0;
//   }
// }

// export async function markUserNotificationsReadApi(email) {
//   try {
//     const url = email
//       ? `${BASE_URL}/notifications/USER/mark-read?email=${encodeURIComponent(email)}`
//       : `${BASE_URL}/notifications/USER/mark-read`;
//     await fetch(url, { method: 'PUT', headers });
//   } catch (error) {
//     console.log('markUserNotificationsReadApi error', error);
//   }
// }

// // ── Contact ───────────────────────────────────────────────────────────
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

// // ── Admin ─────────────────────────────────────────────────────────────

// // Setup (create) — first time only
// export async function setupAdminApi({ email, password, companyName }) {
//   try {
//     const response = await fetch(`${BASE_URL}/admin/setup`, {
//       method: 'POST', headers,
//       body: JSON.stringify({ email, password, companyName }),
//     });
//     const data = await response.json();
//     if (response.status === 400 && data.alreadyExists) {
//       return { alreadyExists: true, success: true };
//     }
//     if (!response.ok) throw new Error(data.message || 'Admin setup failed');
//     return data;
//   } catch (error) {
//     if (error.message === 'Network request failed')
//       throw new Error('Cannot connect to server. Check BASE_URL');
//     throw error;
//   }
// }

// // ── Update — PUT /api/admin/update ────────────────────────────────────
// // oldEmail = database lo record find cheyyataniki (current saved email)
// // email    = new email (or same if not changing)
// // password = new password (or same if not changing)
// // companyName = new company name (or same if not changing)
// export async function updateAdminApi({ oldEmail, email, password, companyName }) {
//   try {
//     const body = { oldEmail, email, password, companyName };
//     const response = await fetch(`${BASE_URL}/admin/update`, {
//       method: 'PUT',
//       headers,
//       body: JSON.stringify(body),
//     });
//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error(data.message || `Update failed (${response.status})`);
//     }
//     return data;
//   } catch (error) {
//     if (error.message === 'Network request failed')
//       throw new Error('Cannot connect to server. Check BASE_URL and backend is running.');
//     throw error;
//   }
// }

// export async function adminLoginApi({ email, password }) {
//   try {
//     const response = await fetch(`${BASE_URL}/admin/login`, {
//       method: 'POST', headers,
//       body: JSON.stringify({ email, password }),
//     });
//     const data = await response.json();
//     if (!response.ok) {
//       const err = new Error(data.message || 'Admin login failed');
//       err.fieldErrors = data.errors || {};
//       throw err;
//     }
//     return data;
//   } catch (error) {
//     if (error.message === 'Network request failed')
//       throw new Error('Cannot connect to server.');
//     throw error;
//   }
// }
// // Admin exists check — GET /api/admin/count
// export async function fetchAdminExistsApi() {
//   try {
//     const response = await fetch(`${BASE_URL}/admin/count`);
//     const count = await response.json();
//     return Number(count) || 0;
//   } catch (error) {
//     throw new Error('Cannot connect to server');
//   }
// }


const BASE_URL = 'http://65.1.250.114:8080/api';

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
    console.error(error);
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
async function uploadImagesAndGetUrls(images) {
  if (!images || images.length === 0) return [];
  const formData = new FormData();
  for (let index = 0; index < images.length; index++) {
    const img = images[index];
    const filename = `image_${index}_${Date.now()}.jpg`;
    const uri = img.uri;
    if (typeof uri === 'string' && uri.startsWith('blob:')) {
      const res = await fetch(uri);
      const blob = await res.blob();
      formData.append('files', blob, filename);
    } else if (typeof uri === 'string' && uri.startsWith('data:')) {
      const res = await fetch(uri);
      const blob = await res.blob();
      formData.append('files', blob, filename);
    } else {
      formData.append('files', { uri, type: 'image/jpeg', name: filename });
    }
  }
  const response = await fetch(`${BASE_URL}/apps/upload-images`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || `Image upload failed (${response.status})`);
  }
  const data = await response.json();
  return data.urls || [];
}

export async function uploadAppApi(appData) {
  try {
    const imageUrls = await uploadImagesAndGetUrls(appData.images);
    const payload = {
      title: appData.title, description: appData.description,
      category: appData.category, price: parseFloat(appData.price),
      ownerName: appData.ownerName, ownerEmail: appData.ownerEmail,
      ownerPhone: appData.ownerPhone, company: appData.company,
      features: appData.features, imageUrls,
      imageUrl: imageUrls.length > 0 ? imageUrls[0] : null,
    };
    const response = await fetch(`${BASE_URL}/apps/upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
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

export async function uploadAppDirectApi(appData) {
  try {
    const imageUrls = await uploadImagesAndGetUrls(appData.images);
    const payload = {
      title: appData.title, description: appData.description,
      category: appData.category, price: parseFloat(appData.price),
      ownerName: appData.ownerName, ownerEmail: appData.ownerEmail,
      ownerPhone: appData.ownerPhone, company: appData.company,
      features: appData.features, imageUrls,
      imageUrl: imageUrls.length > 0 ? imageUrls[0] : null,
    };
    const uploadResponse = await fetch(`${BASE_URL}/apps/upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    const uploadData = await uploadResponse.json();
    if (!uploadResponse.ok) throw new Error(uploadData.message || 'Upload failed');
    const appId = uploadData.id || uploadData.appId || uploadData._id;
    if (appId) {
      await fetch(`${BASE_URL}/apps/${appId}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      });
    }
    return uploadData;
  } catch (error) {
    if (error.message === 'Network request failed')
      throw new Error('Cannot connect to server. Check BASE_URL');
    throw error;
  }
}

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

export async function approveAppApi(appId) {
  const response = await fetch(`${BASE_URL}/apps/${appId}/approve`, { method: 'PUT', headers });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Approve failed');
  return data;
}

export async function rejectAppApi(appId) {
  const response = await fetch(`${BASE_URL}/apps/${appId}/reject`, { method: 'PUT', headers });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Reject failed');
  return data;
}

// ── Notifications ─────────────────────────────────────────────────────
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

export async function markAdminNotificationsReadApi() {
  try {
    await fetch(`${BASE_URL}/notifications/ADMIN/mark-read`, { method: 'PUT', headers });
  } catch (error) {
    console.log('markAdminNotificationsReadApi error', error);
  }
}

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

// ── Admin ─────────────────────────────────────────────────────────────
export async function setupAdminApi({ email, password, companyName }) {
  try {
    const response = await fetch(`${BASE_URL}/admin/setup`, {
      method: 'POST', headers,
      body: JSON.stringify({ email, password, companyName }),
    });
    const data = await response.json();
    if (response.status === 400 && data.alreadyExists) {
      return { alreadyExists: true, success: true };
    }
    if (!response.ok) throw new Error(data.message || 'Admin setup failed');
    return data;
  } catch (error) {
    if (error.message === 'Network request failed')
      throw new Error('Cannot connect to server. Check BASE_URL');
    throw error;
  }
}

export async function updateAdminApi({ oldEmail, email, password, companyName }) {
  try {
    const body = { oldEmail, email, password, companyName };
    const response = await fetch(`${BASE_URL}/admin/update`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Update failed (${response.status})`);
    }
    return data;
  } catch (error) {
    if (error.message === 'Network request failed')
      throw new Error('Cannot connect to server. Check BASE_URL and backend is running.');
    throw error;
  }
}

export async function adminLoginApi({ email, password }) {
  try {
    const response = await fetch(`${BASE_URL}/admin/login`, {
      method: 'POST', headers,
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      const err = new Error(data.message || 'Admin login failed');
      err.fieldErrors = data.errors || {};
      throw err;
    }
    return data;
  } catch (error) {
    if (error.message === 'Network request failed')
      throw new Error('Cannot connect to server.');
    throw error;
  }
}

// ── Admin Exists Check ────────────────────────────────────────────────
export async function fetchAdminExistsApi() {
  try {
    const response = await fetch(`${BASE_URL}/admin/count`);
    const data = await response.json();
    return Number(data?.count ?? 0);
  } catch (error) {
    console.log('fetchAdminExistsApi error:',error);
    return 0;
  }
}
