import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CatadorProfileScreen from '../../screens/Private/Catador/Profile/catadorProfileInfos';
import CatadorEditProfileScreen from '../../screens/Private/Catador/Profile/editProfileCatador';

const Stack = createStackNavigator();

export default function CatadorProfileRoutes() {
  return (
    <Stack.Navigator initialRouteName="Profile Catador">
      <Stack.Screen
        name="Profile Catador"
        component={CatadorProfileScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Edit Profile Catador"
        component={CatadorEditProfileScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
}
