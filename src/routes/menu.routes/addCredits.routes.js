import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import PaymentScreen from '../../screens/Private/SideMenuPages/AddCredits/paymentScreen';
import AddCreditsScreen from '../../screens/Private/SideMenuPages/AddCredits/index';

const Stack = createStackNavigator();

export default function AddCreditsRoutes() {
  return (
    <Stack.Navigator initialRouteName="Add Credits Screen">
      <Stack.Screen
        name="Add Credits Screen"
        component={AddCreditsScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Payment Screen"
        component={PaymentScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
