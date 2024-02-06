import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AcceptCollect from '../../screens/Private/Catador/AcceptCollect/acceptCollectScreen';
import PackageScreen from '../../screens/Private/Catador/AcceptCollect/packageScreen';
import MapPackageScreen from '../../screens/Private/Catador/AcceptCollect/mapScreen';
import AcceptCollectDetailsScreen from '../../screens/Private/Catador/AcceptCollect/acceptCollectDetails';

const Stack = createStackNavigator();

export default function AcceptCollectRoutes() {
  return (
    <Stack.Navigator initialRouteName="Accept Collect">
      <Stack.Screen
        name="Accept Collect"
        component={AcceptCollect}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PackageScreen"
        component={PackageScreen}
        options={{ headerShown: false, gestureEnabled: true }}
      />

      <Stack.Screen
        name="MapPackageScreen"
        component={MapPackageScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />

      <Stack.Screen
        name="AcceptCollectDetailsScreen"
        component={AcceptCollectDetailsScreen}
        options={{ headerShown: false, gestureEnabled: true }}
      />
    </Stack.Navigator>
  );
}
