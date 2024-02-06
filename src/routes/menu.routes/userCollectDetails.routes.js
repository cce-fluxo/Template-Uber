import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from '../../screens/Private/MainScreen';
import UserCollectDetailsScreen from '../../screens/Private/MainScreen/userCollectDetails';
import UserFinishCollect from '../../screens/Private/MainScreen/userFinishCollect';
import UserDonateCatador from '../../screens/Private/MainScreen/userDonateCatador';
import AddCreditsInFinishScreen from '../../screens/Private/SideMenuPages/AddCredits/addCreditsInFinish';
import PaymentScreen from '../../screens/Private/SideMenuPages/AddCredits/paymentScreen';

const Stack = createStackNavigator();

export default function UserCollectDetailsRoutes() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={MainScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="User Collect Details"
        component={UserCollectDetailsScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="User Finish Collect"
        component={UserFinishCollect}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="User Donate"
        component={UserDonateCatador}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Add Credits Finish Screen"
        component={AddCreditsInFinishScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Payment Finish Screen"
        component={PaymentScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
