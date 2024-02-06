import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { DrawerCatador } from "../../screens/Private/Catador/DrawerCatador";

import HowWorksScreen from "../../screens/Private/SideMenuPages/HowWorks";
import CatadorProfileRoutes from "../catador.routes/catadorProfile.routes";
import CheckinRoutes from "./checkin.routes";
import AcceptCollectRoutes from "../catador.routes/acceptCollect.routes";
import CollectDetailRoutes from "./collectDetail.routes";
import CalendarDetailsRoutes from "../menu.routes/userCalendar.routes";

import Transactions from "../../screens/Private/SideMenuPages/Transactions";

import RequestWithdrawRoutes from "./requestWithdraw";
import SalesResume from "../../screens/Private/SideMenuPages/Sales/salesResume";
import SalesRoutes from "./SalesRoutes";

const Drawer = createDrawerNavigator();

export default function CatadorMenuRoutes() {
  return (
    <Drawer.Navigator
      initialRouteName="Home Catador Routes"
      drawerContent={(props) => <DrawerCatador {...props} />}
    >
      <Drawer.Screen
        name="Home Catador Routes"
        component={CollectDetailRoutes}
      />

      <Drawer.Screen name="Accept Collect" component={AcceptCollectRoutes} />

      <Drawer.Screen name="Collections" component={CalendarDetailsRoutes} />

      <Drawer.Screen name="RequestWithdraw" component={RequestWithdrawRoutes} />

      <Drawer.Screen name="HowWorks" component={HowWorksScreen} />

      <Drawer.Screen name="Checkin" component={CheckinRoutes} />

      <Drawer.Screen name="Transactions" component={Transactions} />

      <Drawer.Screen name="Sales" component={SalesRoutes} />

      <Drawer.Screen name="Profile Catador" component={CatadorProfileRoutes} />

      {/* <Drawer.Screen
        name="Collect Details"
        component={CatadorCollectDetailsScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      /> */}
    </Drawer.Navigator>
  );
}
