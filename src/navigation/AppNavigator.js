
// // import React from 'react';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createNativeStackNavigator } from '@react-navigation/native-stack';

// // import { NotificationProvider } from '../context/NotificationContext';
// // import { MarketplaceProvider } from '../context/MarketplaceContext';
// // import SharedImageCarousel from '../components/SharedImageCarousel';

// // import HomeScreen                from '../screens/HomeScreen';
// // import AppsScreen                from '../screens/AppsScreen';
// // import AppDetailsScreen          from '../screens/AppDetailsScreen';
// // import AboutScreen               from '../screens/AboutScreen';
// // import ContactScreen             from '../screens/ContactScreen';
// // import ProfileScreen             from '../screens/ProfileScreen';
// // import SignInScreen               from '../screens/SignInScreen';
// // import ForgotPasswordScreen      from '../screens/ForgotPasswordScreen';
// // import ResetPasswordScreen       from '../screens/ResetPasswordScreen';
// // import SignUpScreen               from '../screens/SignUpScreen';
// // import NotificationsScreen       from '../screens/NotificationsScreen';
// // import UploadAppScreen           from '../screens/UploadAppScreen';

// // // ✅ Admin screens
// // import AdminHomeScreen           from '../screens/AdminHomeScreen';
// // import AdminNotificationsScreen  from '../screens/AdminNotificationsScreen';

// // // Category screens
// // import BusinessAppsScreen        from '../screens/BusinessAppsScreen';
// // import CommerceSolutionsScreen   from '../screens/CommerceSolutionsScreen';
// // import ManagementPlatformsScreen from '../screens/ManagementPlatformsScreen';

// // const Stack = createNativeStackNavigator();

// // export default function AppNavigator() {
// //   return (
// //     <NotificationProvider>
// //       <MarketplaceProvider>
// //         <NavigationContainer>
// //           <Stack.Navigator
// //             initialRouteName="SignIn"
// //             screenOptions={{
// //               headerShown: false,
// //               gestureEnabled: true,
// //               fullScreenGestureEnabled: true,
// //               animation: 'ios_from_right',
// //               animationDuration: 360,
// //               contentStyle: { backgroundColor: '#09090C' },
// //             }}
// //           >
// //             {/* ── Auth ── */}
// //             <Stack.Screen name="SignIn"          component={SignInScreen}          options={{ animation: 'fade', animationDuration: 280 }} />
// //             <Stack.Screen name="SignUp"          component={SignUpScreen}          options={{ animation: 'ios_from_right', animationDuration: 360 }} />
// //             <Stack.Screen name="ForgotPassword"  component={ForgotPasswordScreen}  options={{ animation: 'ios_from_right', animationDuration: 300 }} />
// //             <Stack.Screen name="ResetPassword"   component={ResetPasswordScreen} />

// //             {/* ── User ── */}
// //             <Stack.Screen name="Home"            component={HomeScreen}            options={{ animation: 'fade_from_bottom', animationDuration: 340 }} />
// //             <Stack.Screen name="Apps"            component={AppsScreen} />
// //             <Stack.Screen name="UploadApp"       component={UploadAppScreen} />
// //             <Stack.Screen name="AppDetails"      component={AppDetailsScreen} />
// //             <Stack.Screen name="About"           component={AboutScreen} />
// //             <Stack.Screen name="Contact"         component={ContactScreen}         options={{ animation: 'fade_from_bottom', animationDuration: 340 }} />
// //             <Stack.Screen name="Profile"         component={ProfileScreen} />
// //             <Stack.Screen name="Notifications"   component={NotificationsScreen}   options={{ animation: 'ios_from_right', animationDuration: 340 }} />

// //             {/* ✅ Admin screens */}
// //             <Stack.Screen name="AdminHome"          component={AdminHomeScreen}          options={{ animation: 'fade_from_bottom', animationDuration: 340 }} />
// //             <Stack.Screen name="AdminNotifications" component={AdminNotificationsScreen} options={{ animation: 'ios_from_right', animationDuration: 340 }} />

// //             {/* ── Category screens ── */}
// //             <Stack.Screen name="BusinessApps"        component={BusinessAppsScreen} />
// //             <Stack.Screen name="CommerceSolutions"   component={CommerceSolutionsScreen} />
// //             <Stack.Screen name="ManagementPlatforms" component={ManagementPlatformsScreen} />
// //           </Stack.Navigator>
// //         </NavigationContainer>
// //       </MarketplaceProvider>
// //     </NotificationProvider>
// //   );
// // }
// // navigation/AppNavigator.jsx
// // ─────────────────────────────────────────────────────────────────────
// // STARTUP FLOW:
// //   App opens → checks AsyncStorage:
// //     ├── No admin setup?           → AdminSetupScreen  (one-time only)
// //     ├── Admin set up + logged in? → AdminHome / Home  (skip SignIn)
// //     └── Admin set up, no session  → SignInScreen
// // ─────────────────────────────────────────────────────────────────────

// // import React, { useEffect, useState } from 'react';
// // import { View, ActivityIndicator } from 'react-native';
// // import { NavigationContainer }      from '@react-navigation/native';
// // import { createNativeStackNavigator } from '@react-navigation/native-stack';

// // import { NotificationProvider }  from '../context/NotificationContext';
// // import { MarketplaceProvider }   from '../context/MarketplaceContext';

// // import { getAdminCredentials }   from '../utils/adminStorage';   // 👈 new
// // import { getLoggedInUser }       from '../utils/authStorage';    // 👈 your existing util

// // // ── Screens ──────────────────────────────────────────────────────────
// // import AdminSetupScreen          from '../screens/AdminSetupScreen';   // 👈 new

// // import HomeScreen                from '../screens/HomeScreen';
// // import AppsScreen                from '../screens/AppsScreen';
// // import AppDetailsScreen          from '../screens/AppDetailsScreen';
// // import AboutScreen               from '../screens/AboutScreen';
// // import ContactScreen             from '../screens/ContactScreen';
// // import ProfileScreen             from '../screens/ProfileScreen';
// // import SignInScreen               from '../screens/SignInScreen';
// // import ForgotPasswordScreen      from '../screens/ForgotPasswordScreen';
// // import ResetPasswordScreen       from '../screens/ResetPasswordScreen';
// // import SignUpScreen               from '../screens/SignUpScreen';
// // import NotificationsScreen       from '../screens/NotificationsScreen';
// // import UploadAppScreen           from '../screens/UploadAppScreen';

// // import AdminHomeScreen           from '../screens/AdminHomeScreen';
// // import AdminNotificationsScreen  from '../screens/AdminNotificationsScreen';

// // import BusinessAppsScreen        from '../screens/BusinessAppsScreen';
// // import CommerceSolutionsScreen   from '../screens/CommerceSolutionsScreen';
// // import ManagementPlatformsScreen from '../screens/ManagementPlatformsScreen';

// // const Stack = createNativeStackNavigator();

// // // ── Startup loader — determines which screen to open first ───────────
// // function useInitialRoute() {
// //   const [initialRoute, setInitialRoute] = useState(null); // null = still loading

// //   useEffect(() => {
// //     (async () => {
// //       try {
// //         // 1. Has admin been set up on this device?
// //         const adminCreds = await getAdminCredentials();
// //         if (!adminCreds) {
// //           setInitialRoute('AdminSetup');
// //           return;
// //         }

// //         // 2. Is someone already logged in?
// //         const loggedInUser = await getLoggedInUser();
// //         if (loggedInUser) {
// //           setInitialRoute(loggedInUser.role === 'ADMIN' ? 'AdminHome' : 'Home');
// //           return;
// //         }

// //         // 3. Default → SignIn
// //         setInitialRoute('SignIn');
// //       } catch {
// //         setInitialRoute('SignIn');
// //       }
// //     })();
// //   }, []);

// //   return initialRoute;
// // }

// // // ── Navigator ─────────────────────────────────────────────────────────
// // export default function AppNavigator() {
// //   const initialRoute = useInitialRoute();

// //   // Show a plain dark loader while we read AsyncStorage
// //   if (!initialRoute) {
// //     return (
// //       <View style={{ flex: 1, backgroundColor: '#141B27', alignItems: 'center', justifyContent: 'center' }}>
// //         <ActivityIndicator color="#4DEBFF" size="large" />
// //       </View>
// //     );
// //   }

// //   return (
// //     <NotificationProvider>
// //       <MarketplaceProvider>
// //         <NavigationContainer>
// //           <Stack.Navigator
// //             initialRouteName={initialRoute}
// //             screenOptions={{
// //               headerShown: false,
// //               gestureEnabled: true,
// //               fullScreenGestureEnabled: true,
// //               animation: 'ios_from_right',
// //               animationDuration: 360,
// //               contentStyle: { backgroundColor: '#09090C' },
// //             }}
// //           >
// //             {/* ── One-Time Admin Setup (first launch only) ── */}
// //             <Stack.Screen
// //               name="AdminSetup"
// //               component={AdminSetupScreen}
// //               options={{ animation: 'fade', animationDuration: 300 }}
// //             />

// //             {/* ── Auth ── */}
// //             <Stack.Screen name="SignIn"         component={SignInScreen}         options={{ animation: 'fade', animationDuration: 280 }} />
// //             <Stack.Screen name="SignUp"         component={SignUpScreen}         options={{ animation: 'ios_from_right', animationDuration: 360 }} />
// //             <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ animation: 'ios_from_right', animationDuration: 300 }} />
// //             <Stack.Screen name="ResetPassword"  component={ResetPasswordScreen} />

// //             {/* ── User ── */}
// //             <Stack.Screen name="Home"           component={HomeScreen}           options={{ animation: 'fade_from_bottom', animationDuration: 340 }} />
// //             <Stack.Screen name="Apps"           component={AppsScreen} />
// //             <Stack.Screen name="UploadApp"      component={UploadAppScreen} />
// //             <Stack.Screen name="AppDetails"     component={AppDetailsScreen} />
// //             <Stack.Screen name="About"          component={AboutScreen} />
// //             <Stack.Screen name="Contact"        component={ContactScreen}        options={{ animation: 'fade_from_bottom', animationDuration: 340 }} />
// //             <Stack.Screen name="Profile"        component={ProfileScreen} />
// //             <Stack.Screen name="Notifications"  component={NotificationsScreen}  options={{ animation: 'ios_from_right', animationDuration: 340 }} />

// //             {/* ── Admin ── */}
// //             <Stack.Screen name="AdminHome"          component={AdminHomeScreen}          options={{ animation: 'fade_from_bottom', animationDuration: 340 }} />
// //             <Stack.Screen name="AdminNotifications" component={AdminNotificationsScreen} options={{ animation: 'ios_from_right',   animationDuration: 340 }} />

// //             {/* ── Category ── */}
// //             <Stack.Screen name="BusinessApps"        component={BusinessAppsScreen} />
// //             <Stack.Screen name="CommerceSolutions"   component={CommerceSolutionsScreen} />
// //             <Stack.Screen name="ManagementPlatforms" component={ManagementPlatformsScreen} />
// //           </Stack.Navigator>
// //         </NavigationContainer>
// //       </MarketplaceProvider>
// //     </NotificationProvider>
// //   );
// // }


// // navigation/AppNavigator.js
// // ✅ FIX: adminCreds check తీసేశాం
// // Only loggedInUser check మాత్రమే — AdminSetup ని initialRoute లో పెట్టలేదు

// import React, { useEffect, useState } from 'react';
// import { View, ActivityIndicator }      from 'react-native';
// import { NavigationContainer }          from '@react-navigation/native';
// import { createNativeStackNavigator }   from '@react-navigation/native-stack';

// import { NotificationProvider }  from '../context/NotificationContext';
// import { MarketplaceProvider }   from '../context/MarketplaceContext';


// // ── Screens ──────────────────────────────────────────────────────────
// import AdminSetupScreen          from '../screens/AdminSetupScreen';
// import HomeScreen                from '../screens/HomeScreen';
// import AppsScreen                from '../screens/AppsScreen';
// import AppDetailsScreen          from '../screens/AppDetailsScreen';
// import AboutScreen               from '../screens/AboutScreen';
// import ContactScreen             from '../screens/ContactScreen';
// import ProfileScreen             from '../screens/ProfileScreen';
// import SignInScreen               from '../screens/SignInScreen';
// import ForgotPasswordScreen      from '../screens/ForgotPasswordScreen';
// import ResetPasswordScreen       from '../screens/ResetPasswordScreen';
// import SignUpScreen               from '../screens/SignUpScreen';
// import NotificationsScreen       from '../screens/NotificationsScreen';
// import UploadAppScreen           from '../screens/UploadAppScreen';
// import AdminHomeScreen           from '../screens/AdminHomeScreen';
// import AdminNotificationsScreen  from '../screens/AdminNotificationsScreen';
// import BusinessAppsScreen        from '../screens/BusinessAppsScreen';
// import CommerceSolutionsScreen   from '../screens/CommerceSolutionsScreen';
// import ManagementPlatformsScreen from '../screens/ManagementPlatformsScreen';
// import { getAdminCredentials } from '../utils/adminStorage'; // ← ADD THIS

// const Stack = createNativeStackNavigator();

// // function useInitialRoute() {
// //   const [initialRoute, setInitialRoute] = useState(null);

// //   useEffect(() => {
// //     (async () => {
// //       try {
// //         // ✅ Always SignIn — no auto-restore
// //         setInitialRoute('SignIn');
// //       } catch {
// //         setInitialRoute('SignIn');
// //       }
// //     })();
// //   }, []);

// //   return initialRoute;
// // }
// function useInitialRoute() {
//   const [initialRoute, setInitialRoute] = useState(null);

//   useEffect(() => {
//     (async () => {
//       try {
//         const creds = await getAdminCredentials();
//         // First ever launch → AdminSetup
//         // Every launch after → SignIn
//         setInitialRoute(creds ? 'SignIn' : 'AdminSetup');
//       } catch {
//         setInitialRoute('AdminSetup');
//       }
//     })();
//   }, []);

//   return initialRoute;
// }

// export default function AppNavigator() {
//   const initialRoute = useInitialRoute();

//   if (!initialRoute) {
//     return (
//       <View style={{ flex: 1, backgroundColor: '#141B27', alignItems: 'center', justifyContent: 'center' }}>
//         <ActivityIndicator color="#4DEBFF" size="large" />
//       </View>
//     );
//   }

//   return (
//     <NotificationProvider>
//       <MarketplaceProvider>
//         <NavigationContainer>
//           <Stack.Navigator
//             initialRouteName={initialRoute}
//             screenOptions={{
//               headerShown: false,
//               gestureEnabled: true,
//               fullScreenGestureEnabled: true,
//               animation: 'ios_from_right',
//               animationDuration: 360,
//               contentStyle: { backgroundColor: '#09090C' },
//             }}
//           >
//             {/* ✅ AdminSetup — Stack లో ఉంది, కానీ initialRoute కాదు */}
//             <Stack.Screen
//               name="AdminSetup"
//               component={AdminSetupScreen}
//               options={{ animation: 'fade', animationDuration: 300 }}
//             />

//             {/* Auth */}
//             <Stack.Screen name="SignIn"         component={SignInScreen}         options={{ animation: 'fade', animationDuration: 280 }} />
//             <Stack.Screen name="SignUp"         component={SignUpScreen}         options={{ animation: 'ios_from_right', animationDuration: 360 }} />
//             <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ animation: 'ios_from_right', animationDuration: 300 }} />
//             <Stack.Screen name="ResetPassword"  component={ResetPasswordScreen} />

//             {/* User */}
//             <Stack.Screen name="Home"           component={HomeScreen}           options={{ animation: 'fade_from_bottom', animationDuration: 340 }} />
//             <Stack.Screen name="Apps"           component={AppsScreen} />
//             <Stack.Screen name="UploadApp"      component={UploadAppScreen} />
//             <Stack.Screen name="AppDetails"     component={AppDetailsScreen} />
//             <Stack.Screen name="About"          component={AboutScreen} />
//             <Stack.Screen name="Contact"        component={ContactScreen}        options={{ animation: 'fade_from_bottom', animationDuration: 340 }} />
//             <Stack.Screen name="Profile"        component={ProfileScreen} />
//             <Stack.Screen name="Notifications"  component={NotificationsScreen}  options={{ animation: 'ios_from_right', animationDuration: 340 }} />

//             {/* Admin */}
//             <Stack.Screen name="AdminHome"          component={AdminHomeScreen}          options={{ animation: 'fade_from_bottom', animationDuration: 340 }} />
//             <Stack.Screen name="AdminNotifications" component={AdminNotificationsScreen} options={{ animation: 'ios_from_right', animationDuration: 340 }} />

//             {/* Category */}
//             <Stack.Screen name="BusinessApps"        component={BusinessAppsScreen} />
//             <Stack.Screen name="CommerceSolutions"   component={CommerceSolutionsScreen} />
//             <Stack.Screen name="ManagementPlatforms" component={ManagementPlatformsScreen} />
//           </Stack.Navigator>
//         </NavigationContainer>
//       </MarketplaceProvider>
//     </NotificationProvider>
//   );
// }

// import React, { useEffect, useState }     from 'react';
// import { View, ActivityIndicator }         from 'react-native';
// import { NavigationContainer }             from '@react-navigation/native';
// import { createNativeStackNavigator }      from '@react-navigation/native-stack';

// import { NotificationProvider }            from '../context/NotificationContext';
// import { MarketplaceProvider }             from '../context/MarketplaceContext';
// import { getAdminCredentials }             from '../utils/adminStorage';

// import AdminSetupScreen          from '../screens/AdminSetupScreen';
// import HomeScreen                from '../screens/HomeScreen';
// import AppsScreen                from '../screens/AppsScreen';
// import AppDetailsScreen          from '../screens/AppDetailsScreen';
// import AboutScreen               from '../screens/AboutScreen';
// import ContactScreen             from '../screens/ContactScreen';
// import ProfileScreen             from '../screens/ProfileScreen';
// import SignInScreen               from '../screens/SignInScreen';
// import ForgotPasswordScreen      from '../screens/ForgotPasswordScreen';
// import ResetPasswordScreen       from '../screens/ResetPasswordScreen';
// import SignUpScreen               from '../screens/SignUpScreen';
// import NotificationsScreen       from '../screens/NotificationsScreen';
// import UploadAppScreen           from '../screens/UploadAppScreen';
// import AdminHomeScreen           from '../screens/AdminHomeScreen';
// import AdminNotificationsScreen  from '../screens/AdminNotificationsScreen';
// import BusinessAppsScreen        from '../screens/BusinessAppsScreen';
// import CommerceSolutionsScreen   from '../screens/CommerceSolutionsScreen';
// import ManagementPlatformsScreen from '../screens/ManagementPlatformsScreen';

// const Stack = createNativeStackNavigator();

// // function useInitialRoute() {
// //   const [initialRoute, setInitialRoute] = useState(null);

// //   useEffect(() => {
// //     (async () => {
// //       try {
// //         const creds = await getAdminCredentials();
// //         setInitialRoute(creds ? 'SignIn' : 'AdminSetup');
// //       } catch {
// //         setInitialRoute('AdminSetup');
// //       }
// //     })();
// //   }, []);

// //   return initialRoute;
// // }
// function useInitialRoute() {
//   const [initialRoute, setInitialRoute] = useState(null);

//   useEffect(() => {
//     (async () => {
//       try {
//         const creds = await getAdminCredentials();
//         console.log('📱 Stored admin creds:', creds); // debug చేయి
        
//         if (creds) {
//           setInitialRoute('SignIn');
//         } else {
//           setInitialRoute('AdminSetup');
//         }
//       } catch (e) {
//         console.log('❌ getAdminCredentials error:', e);
//         setInitialRoute('AdminSetup');
//       }
//     })();
//   }, []);

//   return initialRoute;
// }
// export default function AppNavigator() {
//   const initialRoute = useInitialRoute();

//   if (!initialRoute) {
//     return (
//       <View style={{ flex: 1, backgroundColor: '#141B27', alignItems: 'center', justifyContent: 'center' }}>
//         <ActivityIndicator color="#4DEBFF" size="large" />
//       </View>
//     );
//   }

//   return (
//     <NotificationProvider>
//       <MarketplaceProvider>
//         <NavigationContainer>
//           <Stack.Navigator
//             initialRouteName={initialRoute}
//             screenOptions={{
//               headerShown: false,
//               gestureEnabled: true,
//               fullScreenGestureEnabled: true,
//               animation: 'ios_from_right',
//               animationDuration: 360,
//               contentStyle: { backgroundColor: '#09090C' },
//             }}
//           >
//             <Stack.Screen name="AdminSetup"  component={AdminSetupScreen}  options={{ animation: 'fade', animationDuration: 300 }} />
//             <Stack.Screen name="SignIn"      component={SignInScreen}       options={{ animation: 'fade', animationDuration: 280 }} />
//             <Stack.Screen name="SignUp"      component={SignUpScreen}       options={{ animation: 'ios_from_right', animationDuration: 360 }} />
//             <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ animation: 'ios_from_right', animationDuration: 300 }} />
//             <Stack.Screen name="ResetPassword"  component={ResetPasswordScreen} />
//             <Stack.Screen name="Home"        component={HomeScreen}         options={{ animation: 'fade_from_bottom', animationDuration: 340 }} />
//             <Stack.Screen name="Apps"        component={AppsScreen} />
//             <Stack.Screen name="UploadApp"   component={UploadAppScreen} />
//             <Stack.Screen name="AppDetails"  component={AppDetailsScreen} />
//             <Stack.Screen name="About"       component={AboutScreen} />
//             <Stack.Screen name="Contact"     component={ContactScreen}      options={{ animation: 'fade_from_bottom', animationDuration: 340 }} />
//             <Stack.Screen name="Profile"     component={ProfileScreen} />
//             <Stack.Screen name="Notifications"      component={NotificationsScreen}      options={{ animation: 'ios_from_right', animationDuration: 340 }} />
//             <Stack.Screen name="AdminHome"          component={AdminHomeScreen}          options={{ animation: 'fade_from_bottom', animationDuration: 340 }} />
//             <Stack.Screen name="AdminNotifications" component={AdminNotificationsScreen} options={{ animation: 'ios_from_right', animationDuration: 340 }} />
//             <Stack.Screen name="BusinessApps"        component={BusinessAppsScreen} />
//             <Stack.Screen name="CommerceSolutions"   component={CommerceSolutionsScreen} />
//             <Stack.Screen name="ManagementPlatforms" component={ManagementPlatformsScreen} />
//           </Stack.Navigator>
//         </NavigationContainer>
//       </MarketplaceProvider>
//     </NotificationProvider>
//   );
// }


// import React, { useEffect, useState }     from 'react';
// import { View, ActivityIndicator }         from 'react-native';
// import { NavigationContainer }             from '@react-navigation/native';
// import { createNativeStackNavigator }      from '@react-navigation/native-stack';

// import { NotificationProvider }            from '../context/NotificationContext';
// import { MarketplaceProvider }             from '../context/MarketplaceContext';
// import { getAdminCredentials, isAdminSetupDone } from '../utils/adminStorage';
// import { fetchAdminExistsApi } from '../utils/apiService';

// import AdminSetupScreen          from '../screens/AdminSetupScreen';
// import HomeScreen                from '../screens/HomeScreen';
// import AppsScreen                from '../screens/AppsScreen';
// import AppDetailsScreen          from '../screens/AppDetailsScreen';
// import AboutScreen               from '../screens/AboutScreen';
// import ContactScreen             from '../screens/ContactScreen';
// import ProfileScreen             from '../screens/ProfileScreen';
// import SignInScreen               from '../screens/SignInScreen';
// import ForgotPasswordScreen      from '../screens/ForgotPasswordScreen';
// import ResetPasswordScreen       from '../screens/ResetPasswordScreen';
// import SignUpScreen               from '../screens/SignUpScreen';
// import NotificationsScreen       from '../screens/NotificationsScreen';
// import UploadAppScreen           from '../screens/UploadAppScreen';
// import AdminHomeScreen           from '../screens/AdminHomeScreen';
// import AdminNotificationsScreen  from '../screens/AdminNotificationsScreen';
// import AdminProfileScreen from '../screens/AdminProfileScreen';
// import BusinessAppsScreen        from '../screens/BusinessAppsScreen';
// import CommerceSolutionsScreen   from '../screens/CommerceSolutionsScreen';
// import ManagementPlatformsScreen from '../screens/ManagementPlatformsScreen';

// const Stack = createNativeStackNavigator();

// // function useInitialRoute() {
// //   const [initialRoute, setInitialRoute] = useState(null);

// //   useEffect(() => {
// //     (async () => {
// //       try {
// //         const creds = await getAdminCredentials();
// //         console.log('📱 Stored admin creds:', creds);
// //         setInitialRoute(creds ? 'SignIn' : 'AdminSetup');
// //       } catch (e) {
// //         console.log('❌ getAdminCredentials error:', e);
// //         setInitialRoute('AdminSetup');
// //       }
// //     })();
// //   }, []);

// //   return initialRoute;
// // }

// // ఈ function మొత్తం replace చేయి:
// // function useInitialRoute() {
// //   const [initialRoute, setInitialRoute] = useState(null);

// //   useEffect(() => {
// //     (async () => {
// //       try {
// //         const setupDone = await isAdminSetupDone();
// //         console.log('📱 Admin setup done:', setupDone);

// //         if (!setupDone) {
// //           setInitialRoute('AdminSetup'); // First time only
// //           return;
// //         }

// //         // Setup అయింది — SignIn కి వెళ్ళు
// //         setInitialRoute('SignIn');
// //       } catch (e) {
// //         console.log('❌ useInitialRoute error:', e);
// //         setInitialRoute('AdminSetup');
// //       }
// //     })();
// //   }, []);

// //   return initialRoute;
// // }
// function useInitialRoute() {
//   const [initialRoute, setInitialRoute] = useState(null);

//   useEffect(() => {
//     (async () => {
//       try {
//         // 1️⃣ Backend లో admin exists అయిందా check చేయి
//         const count = await fetchAdminExistsApi();

//         if (count > 0) {
//           // Admin already exists in DB → setup skip
//           await markAdminSetupDone(); // local లో కూడా mark చేయి
//           setInitialRoute('SignIn');
//         } else {
//           // No admin in DB → setup చేయాలి
//           setInitialRoute('AdminSetup');
//         }
//       } catch (e) {
//         // Network error అయితే local check చేయి
//         console.log('Backend check failed, using local:', e);
//         const setupDone = await isAdminSetupDone();
//         setInitialRoute(setupDone ? 'SignIn' : 'AdminSetup');
//       }
//     })();
//   }, []);

//   return initialRoute;
// }
// export default function AppNavigator() {
//   const initialRoute = useInitialRoute();

//   if (!initialRoute) {
//     return (
//       <View style={{ flex: 1, backgroundColor: '#141B27', alignItems: 'center', justifyContent: 'center' }}>
//         <ActivityIndicator color="#4DEBFF" size="large" />
//       </View>
//     );
//   }

//   return (
//     <NotificationProvider>
//       <MarketplaceProvider>
//         <NavigationContainer>
//           <Stack.Navigator
//             initialRouteName={initialRoute}
//             screenOptions={{
//               headerShown: false,
//               gestureEnabled: true,
//               fullScreenGestureEnabled: true,
//               animation: 'ios_from_right',
//               animationDuration: 360,
//               contentStyle: { backgroundColor: '#09090C' },
//             }}
//           >
//             <Stack.Screen name="AdminSetup"  component={AdminSetupScreen}  options={{ animation: 'fade', animationDuration: 300 }} />
//             <Stack.Screen name="SignIn"      component={SignInScreen}       options={{ animation: 'fade', animationDuration: 280 }} />
//             <Stack.Screen name="SignUp"      component={SignUpScreen}       options={{ animation: 'ios_from_right', animationDuration: 360 }} />
//             <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ animation: 'ios_from_right', animationDuration: 300 }} />
//             <Stack.Screen name="ResetPassword"  component={ResetPasswordScreen} />
//             <Stack.Screen name="Home"        component={HomeScreen}         options={{ animation: 'fade_from_bottom', animationDuration: 340 }} />
//             <Stack.Screen name="Apps"        component={AppsScreen} />
//             <Stack.Screen name="UploadApp"   component={UploadAppScreen} />
//             <Stack.Screen name="AppDetails"  component={AppDetailsScreen} />
//             <Stack.Screen name="About"       component={AboutScreen} />
//             <Stack.Screen name="Contact"     component={ContactScreen}      options={{ animation: 'fade_from_bottom', animationDuration: 340 }} />
//             <Stack.Screen name="Profile"     component={ProfileScreen} />
//             <Stack.Screen name="Notifications"      component={NotificationsScreen}      options={{ animation: 'ios_from_right', animationDuration: 340 }} />
//             <Stack.Screen name="AdminHome"          component={AdminHomeScreen}          options={{ animation: 'fade_from_bottom', animationDuration: 340 }} />
//             <Stack.Screen name="AdminNotifications" component={AdminNotificationsScreen} options={{ animation: 'ios_from_right', animationDuration: 340 }} />
//             <Stack.Screen name="AdminProfile"       component={AdminProfileScreen}       options={{ animation: 'ios_from_right', animationDuration: 340 }} />
//             <Stack.Screen name="BusinessApps"        component={BusinessAppsScreen} />
//             <Stack.Screen name="CommerceSolutions"   component={CommerceSolutionsScreen} />
//             <Stack.Screen name="ManagementPlatforms" component={ManagementPlatformsScreen} />
//           </Stack.Navigator>
//         </NavigationContainer>
//       </MarketplaceProvider>
//     </NotificationProvider>
//   );
// }


import React, { useEffect, useState }     from 'react';
import { View, ActivityIndicator }         from 'react-native';
import { NavigationContainer }             from '@react-navigation/native';
import { createNativeStackNavigator }      from '@react-navigation/native-stack';

import { NotificationProvider }            from '../context/NotificationContext';
import { MarketplaceProvider }             from '../context/MarketplaceContext';
import { isAdminSetupDone, markAdminSetupDone } from '../utils/adminStorage'; // ← fixed
import { fetchAdminExistsApi }             from '../utils/apiService';

import AdminSetupScreen          from '../screens/AdminSetupScreen';
import HomeScreen                from '../screens/HomeScreen';
import AppsScreen                from '../screens/AppsScreen';
import AppDetailsScreen          from '../screens/AppDetailsScreen';
import AboutScreen               from '../screens/AboutScreen';
import ContactScreen             from '../screens/ContactScreen';
import ProfileScreen             from '../screens/ProfileScreen';
import SignInScreen               from '../screens/SignInScreen';
import ForgotPasswordScreen      from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen       from '../screens/ResetPasswordScreen';
import SignUpScreen               from '../screens/SignUpScreen';
import NotificationsScreen       from '../screens/NotificationsScreen';
import UploadAppScreen           from '../screens/UploadAppScreen';
import AdminHomeScreen           from '../screens/AdminHomeScreen';
import AdminNotificationsScreen  from '../screens/AdminNotificationsScreen';
import AdminProfileScreen        from '../screens/AdminProfileScreen';
import BusinessAppsScreen        from '../screens/BusinessAppsScreen';
import CommerceSolutionsScreen   from '../screens/CommerceSolutionsScreen';
import ManagementPlatformsScreen from '../screens/ManagementPlatformsScreen';

const Stack = createNativeStackNavigator();

function useInitialRoute() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        // Backend లో admin exists అయిందా check చేయి
        const count = await fetchAdminExistsApi();
        console.log('📱 Admin count in DB:', count);

        if (count > 0) {
          // Admin already exists in DB → setup skip
          await markAdminSetupDone();
          setInitialRoute('SignIn');
        } else {
          // No admin in DB → setup చేయాలి
          setInitialRoute('AdminSetup');
        }
      } catch (e) {
        // Network error అయితే local check చేయి
        console.log('Backend check failed, using local:', e);
        const setupDone = await isAdminSetupDone();
        setInitialRoute(setupDone ? 'SignIn' : 'AdminSetup');
      }
    })();
  }, []);

  return initialRoute;
}

export default function AppNavigator() {
  const initialRoute = useInitialRoute();

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, backgroundColor: '#141B27', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color="#4DEBFF" size="large" />
      </View>
    );
  }

  return (
    <NotificationProvider>
      <MarketplaceProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{
              headerShown: false,
              gestureEnabled: true,
              fullScreenGestureEnabled: true,
              animation: 'ios_from_right',
              animationDuration: 360,
              contentStyle: { backgroundColor: '#09090C' },
            }}
          >
            <Stack.Screen name="AdminSetup"  component={AdminSetupScreen}  options={{ animation: 'fade', animationDuration: 300 }} />
            <Stack.Screen name="SignIn"      component={SignInScreen}       options={{ animation: 'fade', animationDuration: 280 }} />
            <Stack.Screen name="SignUp"      component={SignUpScreen}       options={{ animation: 'ios_from_right', animationDuration: 360 }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ animation: 'ios_from_right', animationDuration: 300 }} />
            <Stack.Screen name="ResetPassword"  component={ResetPasswordScreen} />
            <Stack.Screen name="Home"        component={HomeScreen}         options={{ animation: 'fade_from_bottom', animationDuration: 340 }} />
            <Stack.Screen name="Apps"        component={AppsScreen} />
            <Stack.Screen name="UploadApp"   component={UploadAppScreen} />
            <Stack.Screen name="AppDetails"  component={AppDetailsScreen} />
            <Stack.Screen name="About"       component={AboutScreen} />
            <Stack.Screen name="Contact"     component={ContactScreen}      options={{ animation: 'fade_from_bottom', animationDuration: 340 }} />
            <Stack.Screen name="Profile"     component={ProfileScreen} />
            <Stack.Screen name="Notifications"      component={NotificationsScreen}      options={{ animation: 'ios_from_right', animationDuration: 340 }} />
            <Stack.Screen name="AdminHome"          component={AdminHomeScreen}          options={{ animation: 'fade_from_bottom', animationDuration: 340 }} />
            <Stack.Screen name="AdminNotifications" component={AdminNotificationsScreen} options={{ animation: 'ios_from_right', animationDuration: 340 }} />
            <Stack.Screen name="AdminProfile"       component={AdminProfileScreen}       options={{ animation: 'ios_from_right', animationDuration: 340 }} />
            <Stack.Screen name="BusinessApps"        component={BusinessAppsScreen} />
            <Stack.Screen name="CommerceSolutions"   component={CommerceSolutionsScreen} />
            <Stack.Screen name="ManagementPlatforms" component={ManagementPlatformsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </MarketplaceProvider>
    </NotificationProvider>
  );
}