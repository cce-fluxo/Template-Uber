import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CheckInCollectScreen from '../../screens/Private/SideMenuPages/CheckIn/index';
import ConfirmCheckInScreen from '../../screens/Private/SideMenuPages/CheckIn/confirmCheckInScreen';
import ScoreCheckin from '../../screens/Private/SideMenuPages/CheckIn/scoreCheckin';

const Stack = createStackNavigator();

export default function CheckInRoutes() {
  return (
    <Stack.Navigator initialRouteName="CheckIn Screen">
      <Stack.Screen
        name="CheckIn Screen"
        component={CheckInCollectScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Confirm CheckIn"
        component={ConfirmCheckInScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Score CheckIn"
        component={ScoreCheckin}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
