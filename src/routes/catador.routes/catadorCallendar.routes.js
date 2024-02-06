import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CollectionsScreen from "../../screens/Private/SideMenuPages/AgendaScreen";
import HistoricScreen from "../../screens/Private/SideMenuPages/AgendaScreen/historicScreen";
import CatadorCollectDetailsScreen from "../../screens/Private/Catador/catadorCollectDetails";
import PackageDetailsScreen from "../../screens/Private/Catador/Package Details/packageDetailsScreen";
import PackageCollectDetailsScreen from "../../screens/Private/Catador/Package Details/packageCollectDetails";
import MapPackageDetailsScreen from "../../screens/Private/Catador/Package Details/packageMap";

const Stack = createStackNavigator();

export default function CatadorCalendarDetailsRoutes() {
  return (
    <Stack.Navigator initialRouteName="Collections">
      <Stack.Screen
        name="Collections"
        component={CollectionsScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="HistoricScreen"
        component={HistoricScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animationEnabled: false,
        }}
      />

      <Stack.Screen
        name="PackageRoutes"
        component={CatadorCollectDetailsScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Package Details Collection"
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
