import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CollectionsScreen from "../../screens/Private/SideMenuPages/AgendaScreen";
import HistoricScreen from "../../screens/Private/SideMenuPages/AgendaScreen/historicScreen";
import UserCollectDetailsScreen from "../../screens/Private/MainScreen/userCollectDetails";
import UserFinishCollect from "../../screens/Private/MainScreen/userFinishCollect";
import CatadorCollectDetailsScreen from "../../screens/Private/Catador/catadorCollectDetails";
import PackageDetailsScreen from "../../screens/Private/Catador/Package Details/packageDetailsScreen";
import PackageCollectDetailsScreen from "../../screens/Private/Catador/Package Details/packageCollectDetails";

import UserRecurrentCollectDetailsScreen from "../../screens/Private/MainScreen/userRecurrentCollectDetailsScreen";

import CollectionsScreenCatador from "../../screens/Private/SideMenuPages/AgendaScreen/collectionsCatador";
import { useAuth } from "../../context/auth";


const Stack = createStackNavigator();

export default function CalendarDetailsRoutes() {
  const { user } = useAuth();
  return (
    <Stack.Navigator initialRouteName="Collections">
      <Stack.Screen
        name="Collections"
        component={
          user.tipo === "catador" ? CollectionsScreenCatador : CollectionsScreen
        }
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Historic"
        component={HistoricScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="User Collect Details"
        component={UserCollectDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="User Recurrent Collect Details"
        component={UserRecurrentCollectDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="User Finish Collect"
        component={UserFinishCollect}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Catador Collect Details"
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
    </Stack.Navigator>
  );
}
