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

const BASE_URL = 'http://192.168.0.9:8082/api';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export async function signUpApi({ fullName, email, mobile, password }) {
  try {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers,
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
    if (error.message === 'Network request failed') {
      throw new Error('Cannot connect to server. Check your BASE_URL and backend.');
    }
    throw error;
  }
}

export async function signInApi({ email, password }) {
  try {
    const response = await fetch(`${BASE_URL}/auth/signin`, {
      method: 'POST',
      headers,
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
    if (error.message === 'Network request failed') {
      throw new Error('Cannot connect to server. Check your BASE_URL and backend.');
    }
    throw error;
  }
}

export async function fetchNotificationsApi() {
  try {
    const response = await fetch(`${BASE_URL}/notifications`);
    return await response.json();
  } catch (error) {
    console.log('fetchNotificationsApi error', error);
    return [];
  }
}

// ✅ Get profile
export async function getProfileApi(userId) {
  try {
    const response = await fetch(`${BASE_URL}/profile/${userId}`, {
      headers,
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to get profile');
    return data;
  } catch (error) {
    if (error.message === 'Network request failed') {
      throw new Error('Cannot connect to server.');
    }
    throw error;
  }
}

// ✅ Update profile
export async function updateProfileApi(userId, profileData) {
  try {
    const response = await fetch(`${BASE_URL}/profile/${userId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(profileData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Profile update failed');
    return data;
  } catch (error) {
    if (error.message === 'Network request failed') {
      throw new Error('Cannot connect to server.');
    }
    throw error;
  }
}

export async function uploadAppApi(appData) {
  try {
    const payload = {
      title: appData.title,
      description: appData.description,
      category: appData.category,
      price: parseFloat(appData.price),
      ownerName: appData.ownerName,
      ownerEmail: appData.ownerEmail,
      ownerPhone: appData.ownerPhone,
      company: appData.company,
      features: appData.features,
      imageUrl: appData.image ? appData.image.uri : null,
    };
    const response = await fetch(`${BASE_URL}/apps/upload`, {
      method: 'POST',
      headers,
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
    if (error.message === 'Network request failed') {
      throw new Error('Cannot connect to server. Check BASE_URL');
    }
    throw error;
  }
}

export async function fetchAppsApi() {
  try {
    const response = await fetch(`${BASE_URL}/apps`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('fetchAppsApi error', error);
    return [];
  }
}

export async function forgotPasswordApi(email) {
  try {
    const response = await fetch(`${BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Failed to send reset link');
    }
    return data;
  } catch (error) {
    if (error.message === 'Network request failed') {
      throw new Error('Cannot connect to server. Check BASE_URL');
    }
    throw error;
  }
}

export async function resetPasswordApi(email, newPassword) {
  try {
    const response = await fetch(`${BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email, newPassword }),
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Failed to reset password');
    }
    return data;
  } catch (error) {
    if (error.message === 'Network request failed') {
      throw new Error('Cannot connect to server. Check BASE_URL');
    }
    throw error;
  }
}

export async function submitContactApi({ name, email, mobile, subject, message }) {
  try {
    const response = await fetch(`${BASE_URL}/contact/submit`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ name, email, mobile, subject, message }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit inquiry');
    }
    return data;
  } catch (error) {
    if (error.message === 'Network request failed') {
      throw new Error('Cannot connect to server. Check your network and backend.');
    }
    throw error;
  }
}