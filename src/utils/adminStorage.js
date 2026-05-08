// // utils/adminStorage.js
// // Stores admin credentials locally using AsyncStorage.
// // Called once during AdminSetupScreen — never again unless cleared.

// import AsyncStorage from '@react-native-async-storage/async-storage';

// const ADMIN_KEY = '@admin_credentials';

// /**
//  * Save admin credentials after first-time setup.
//  * @param {{ email: string, password: string, companyName: string }} creds
//  */
// export async function saveAdminCredentials(creds) {
//   await AsyncStorage.setItem(ADMIN_KEY, JSON.stringify(creds));
// }

// /**
//  * Get stored admin credentials.
//  * Returns null if admin has never been set up.
//  * @returns {Promise<{ email: string, password: string, companyName: string } | null>}
//  */
// export async function getAdminCredentials() {
//   try {
//     const raw = await AsyncStorage.getItem(ADMIN_KEY);
//     return raw ? JSON.parse(raw) : null;
//   } catch {
//     return null;
//   }
// }

// /**
//  * Clear admin credentials (use only if you want to reset setup).
//  */
// export async function clearAdminCredentials() {
//   await AsyncStorage.removeItem(ADMIN_KEY);
// }


// import AsyncStorage from '@react-native-async-storage/async-storage';

// const ADMIN_KEY = '@admin_credentials';

// export async function saveAdminCredentials(creds) {
//   await AsyncStorage.setItem(ADMIN_KEY, JSON.stringify(creds));
// }

// export async function getAdminCredentials() {
//   try {
//     const raw = await AsyncStorage.getItem(ADMIN_KEY);
//     return raw ? JSON.parse(raw) : null;
//   } catch {
//     return null;
//   }
// }

// export async function clearAdminCredentials() {
//   await AsyncStorage.removeItem(ADMIN_KEY);
// }


// import AsyncStorage from '@react-native-async-storage/async-storage';

// const ADMIN_KEY = '@admin_credentials_v1';

// export async function saveAdminCredentials(creds) {
//   try {
//     const json = JSON.stringify(creds);
//     await AsyncStorage.setItem(ADMIN_KEY, json);
//     console.log('✅ Admin creds saved:', creds.email);
//   } catch (e) {
//     console.log('❌ saveAdminCredentials error:', e);
//     throw e;
//   }
// }

// export async function getAdminCredentials() {
//   try {
//     const raw = await AsyncStorage.getItem(ADMIN_KEY);
//     if (!raw) {
//       console.log('ℹ️ No admin creds found');
//       return null;
//     }
//     const parsed = JSON.parse(raw);
//     console.log('✅ Admin creds loaded:', parsed.email);
//     return parsed;
//   } catch (e) {
//     console.log('❌ getAdminCredentials error:', e);
//     return null;
//   }
// }

// export async function clearAdminCredentials() {
//   try {
//     await AsyncStorage.removeItem(ADMIN_KEY);
//     console.log('✅ Admin creds cleared');
//   } catch (e) {
//     console.log('❌ clearAdminCredentials error:', e);
//   }
// }

import AsyncStorage from '@react-native-async-storage/async-storage';

const ADMIN_KEY       = '@admin_credentials_v1';
const SETUP_DONE_KEY  = '@admin_setup_done_v1';  // ← new

export async function saveAdminCredentials(creds) {
  try {
    const json = JSON.stringify(creds);
    await AsyncStorage.setItem(ADMIN_KEY, json);
    console.log('✅ Admin creds saved:', creds.email);
  } catch (e) {
    console.log('❌ saveAdminCredentials error:', e);
    throw e;
  }
}

export async function getAdminCredentials() {
  try {
    const raw = await AsyncStorage.getItem(ADMIN_KEY);
    if (!raw) {
      console.log('ℹ️ No admin creds found');
      return null;
    }
    const parsed = JSON.parse(raw);
    console.log('✅ Admin creds loaded:', parsed.email);
    return parsed;
  } catch (e) {
    console.log('❌ getAdminCredentials error:', e);
    return null;
  }
}

export async function clearAdminCredentials() {
  try {
    await AsyncStorage.removeItem(ADMIN_KEY);
    console.log('✅ Admin creds cleared');
  } catch (e) {
    console.log('❌ clearAdminCredentials error:', e);
  }
}

// ── Setup Done Flag ──────────────────────────────
export async function isAdminSetupDone() {
  try {
    const val = await AsyncStorage.getItem(SETUP_DONE_KEY);
    return val === 'true';
  } catch (e) {
    return false;
  }
}

export async function markAdminSetupDone() {
  try {
    await AsyncStorage.setItem(SETUP_DONE_KEY, 'true');
    console.log('✅ Admin setup marked done');
  } catch (e) {
    console.log('❌ markAdminSetupDone error:', e);
  }
}