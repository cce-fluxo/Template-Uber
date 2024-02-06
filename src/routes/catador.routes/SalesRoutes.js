import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CatadorCollectDetailsScreen from "../../screens/Private/Catador/catadorCollectDetails";
import SalesResume from "../../screens/Private/SideMenuPages/Sales/salesResume";
import RegisterSales from "../../screens/Private/SideMenuPages/Sales/registerSales";
import salesMaterials from "../../screens/Private/SideMenuPages/Sales/salesMaterials";
import AddMaterial from "../../screens/Private/SideMenuPages/Sales/addMaterial";
import SalesReceipt from "../../screens/Private/SideMenuPages/Sales/receipt";

const Stack = createStackNavigator();

export default function SalesRoutes() {
  return (
    <Stack.Navigator initialRouteName="Sales">
      <Stack.Screen
        name="Sales"
        component={SalesResume}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Register Sales"
        component={RegisterSales}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Sales Materials"
        component={salesMaterials}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Add Materials"
        component={AddMaterial}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Sales Receipt"
        component={SalesReceipt}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
