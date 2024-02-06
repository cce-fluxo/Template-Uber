import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/Private/SideMenuPages/Profile/profileInfos";
import EditProfileScreen from "../screens/Private/SideMenuPages/Profile/editProfile";
import EditProfileGrandeGerador from "../screens/Private/SideMenuPages/Profile/editProfileGrandeGerador";

const Stack = createStackNavigator();

export default function ProfileRoutes() {
  return (
    <Stack.Navigator initialRouteName="Profile User">
      <Stack.Screen
        name="Profile User"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Edit Profile User"
        component={EditProfileScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="Edit Profile Grande Gerador"
        component={EditProfileGrandeGerador}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
}
