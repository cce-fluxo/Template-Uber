import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeCatadorScreen from '../../screens/Private/Catador/homeCatadorScreen';
import CatadorCollectDetailsScreen from '../../screens/Private/Catador/catadorCollectDetails';
import PackageDetailsScreen from '../../screens/Private/Catador/Package Details/packageDetailsScreen';
import PackageCollectDetailsScreen from '../../screens/Private/Catador/Package Details/packageCollectDetails';
import MapPackageDetailsScreen from '../../screens/Private/Catador/Package Details/packageMap';

const Stack = createStackNavigator();

export default function CollectDetailRoutes() {
  return (
    <Stack.Navigator initialRouteName="Home Catador">
      <Stack.Screen
        name="Home Catador"
        component={HomeCatadorScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Collect Details"
        component={CatadorCollectDetailsScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Package Details"
        component={PackageDetailsScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Package Collect Details"
        component={PackageCollectDetailsScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Package Map Details"
        component={MapPackageDetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
