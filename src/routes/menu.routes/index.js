import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { DrawerContent } from "../../screens/Private/SideMenuPages/DrawerContent";

import BookCollectRoutes from "./bookCollect.routes";
import HowWorksScreen from "../../screens/Private/SideMenuPages/HowWorks";
import BenefitsScreen from "../../screens/Private/SideMenuPages/Benefits";
import ProfileRoutes from "../profile.routes";
import UserCollectDetailsRoutes from "./userCollectDetails.routes";
import CalendarDetailsRoutes from "./userCalendar.routes";
import CheckInRoutes from "./bookcheckIn.routes";
import AddCreditsRoutes from "./addCredits.routes";

import Transactions from "../../screens/Private/SideMenuPages/Transactions";


const Drawer = createDrawerNavigator();

export default function SideMenuRoutes() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={UserCollectDetailsRoutes} />

      <Drawer.Screen name="BookCollect" component={BookCollectRoutes} />

      <Drawer.Screen name="Collections" component={CalendarDetailsRoutes} />

      <Drawer.Screen name="CheckIn" component={CheckInRoutes} />

      <Drawer.Screen name="AddCredits" component={AddCreditsRoutes} />

      <Drawer.Screen name="HowWorks" component={HowWorksScreen} />

      <Drawer.Screen name="Benefits" component={BenefitsScreen} />

      <Drawer.Screen name="Transactions" component={Transactions} />

      <Drawer.Screen name="Profile User" component={ProfileRoutes} />
    </Drawer.Navigator>
  );
}
