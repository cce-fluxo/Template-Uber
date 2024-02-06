import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CheckinHistoricScreen from '../../screens/Private/Catador/historicCheckin';
import CatadorCollectDetailsScreen from '../../screens/Private/Catador/catadorCollectDetails';

const Stack = createStackNavigator();

export default function CheckinRoutes() {
  return (
    <Stack.Navigator initialRouteName="Historic Checkin">
      <Stack.Screen
        name="Historic Checkin"
        component={CheckinHistoricScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Collect Details"
        component={CatadorCollectDetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
