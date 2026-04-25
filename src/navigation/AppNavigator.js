import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NotificationProvider } from '../context/NotificationContext';
import { MarketplaceProvider } from '../context/MarketplaceContext';

import HomeScreen from '../screens/HomeScreen';
import AppsScreen from '../screens/AppsScreen';
import AppDetailsScreen from '../screens/AppDetailsScreen';
import AboutScreen from '../screens/AboutScreen';
import ContactScreen from '../screens/ContactScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignInScreen from '../screens/SignInScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import SignUpScreen from '../screens/SignUpScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import UploadAppScreen from '../screens/UploadAppScreen';

// newly added screens
import BusinessAppsScreen from '../screens/BusinessAppsScreen';
import CommerceSolutionsScreen from '../screens/CommerceSolutionsScreen';
import ManagementPlatformsScreen from '../screens/ManagementPlatformsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NotificationProvider>
      <MarketplaceProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="SignIn"
            screenOptions={{
              headerShown: false,
              gestureEnabled: true,
              fullScreenGestureEnabled: true,
              animation: 'ios_from_right',
              animationDuration: 360,
              contentStyle: {
                backgroundColor: '#09090C',
              },
            }}
          >
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                animation: 'fade',
                animationDuration: 280,
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{
                animation: 'ios_from_right',
                animationDuration: 360,
              }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
              options={{
                animation: 'ios_from_right',
                animationDuration: 300,
              }}
            />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                animation: 'fade_from_bottom',
                animationDuration: 340,
              }}
            />
            <Stack.Screen name="Apps" component={AppsScreen} />
            <Stack.Screen name="UploadApp" component={UploadAppScreen} />
            <Stack.Screen name="AppDetails" component={AppDetailsScreen} />
            <Stack.Screen name="About" component={AboutScreen} />
            <Stack.Screen
              name="Contact"
              component={ContactScreen}
              options={{
                animation: 'fade_from_bottom',
                animationDuration: 340,
              }}
            />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
              options={{
                animation: 'ios_from_right',
                animationDuration: 340,
              }}
            />

            {/* new product category screens */}
            <Stack.Screen name="BusinessApps" component={BusinessAppsScreen} />
            <Stack.Screen name="CommerceSolutions" component={CommerceSolutionsScreen} />
            <Stack.Screen name="ManagementPlatforms" component={ManagementPlatformsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </MarketplaceProvider>
    </NotificationProvider>
  );
}
