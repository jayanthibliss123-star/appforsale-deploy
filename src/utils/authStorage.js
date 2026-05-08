// import AsyncStorage from '@react-native-async-storage/async-storage';

// const USER_KEY = 'sat_apps_user';
// const SESSION_KEY = 'sat_apps_session';

// export async function saveUser(user) {
//   await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
// }

// export async function getUser() {
//   const value = await AsyncStorage.getItem(USER_KEY);
//   return value ? JSON.parse(value) : null;
// }

// export async function setLoggedInUser(user) {
//   await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
// }

// export async function getLoggedInUser() {
//   const value = await AsyncStorage.getItem(SESSION_KEY);
//   return value ? JSON.parse(value) : null;
// }

// export async function clearSession() {
//   await AsyncStorage.removeItem(SESSION_KEY);
// }
// export async function getUserFingerprintEnabled() {
//   try {
//     const val = await AsyncStorage.getItem(USER_FP_KEY);
//     return val === 'true';
//   } catch (e) {
//     return false;
//   }
// }

// export async function setUserFingerprintEnabled(value) {
//   try {
//     await AsyncStorage.setItem(USER_FP_KEY, value ? 'true' : 'false');
//   } catch (e) {
//     console.log('setUserFingerprintEnabled error:', e);
//   }
// }


import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY    = 'sat_apps_user';
const SESSION_KEY = 'sat_apps_session';
const USER_FP_KEY = 'sat_apps_user_fp';   // ← ఇది missing గా ఉంది — fix చేశాను

export async function saveUser(user) {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function getUser() {
  const value = await AsyncStorage.getItem(USER_KEY);
  return value ? JSON.parse(value) : null;
}

export async function setLoggedInUser(user) {
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export async function getLoggedInUser() {
  const value = await AsyncStorage.getItem(SESSION_KEY);
  return value ? JSON.parse(value) : null;
}

export async function clearSession() {
  await AsyncStorage.removeItem(SESSION_KEY);
}

export async function getUserFingerprintEnabled() {
  try {
    const val = await AsyncStorage.getItem(USER_FP_KEY);
    return val === 'true';
  } catch (e) {
    return false;
  }
}

export async function setUserFingerprintEnabled(value) {
  try {
    await AsyncStorage.setItem(USER_FP_KEY, value ? 'true' : 'false');
  } catch (e) {
    console.log('setUserFingerprintEnabled error:', e);
  }
}