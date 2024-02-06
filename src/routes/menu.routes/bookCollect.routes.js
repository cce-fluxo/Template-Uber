import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import BookCollectScreen from "../../screens/Private/SideMenuPages/BookCollect/index";
import ConfirmCollectScreen from "../../screens/Private/SideMenuPages/BookCollect/confirmCollectScreen";

const Stack = createStackNavigator();

export default function BookCollectRoutes() {
  return (
    <Stack.Navigator initialRouteName="Confirm Collect">
      <Stack.Screen
        name="Confirm Collect"
        component={ConfirmCollectScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cart Screen"
        component={BookCollectScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
