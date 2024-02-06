import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PaymentScreen from "../../screens/Private/SideMenuPages/AddCredits/paymentScreen";
import AddCreditsScreen from "../../screens/Private/SideMenuPages/AddCredits/index";
import RequestWithdraw from "../../screens/Private/SideMenuPages/RequestWithdraw";
import WithdrawalHistory from "../../screens/Private/SideMenuPages/WithdrawalHistory";

const Stack = createStackNavigator();

export default function RequestWithdrawRoutes() {
  return (
    <Stack.Navigator initialRouteName="Withdrawal History">
      <Stack.Screen
        name="Withdrawal History"
        component={WithdrawalHistory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Request Withdraw"
        component={RequestWithdraw}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
