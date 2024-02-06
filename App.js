import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import FlashMessage from "react-native-flash-message";
import "react-native-gesture-handler";
import MainRoutes from "./src/routes/main.routes";

import { AuthProvider } from "./src/context/auth";

import { colors } from "./src/constants/theme";

import { getStatusBarHeight } from "react-native-status-bar-height";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="default" />
        <View></View>
        <MainRoutes />

        {Platform.OS === "ios" ? (
          <FlashMessage
            //talvez aumentar a margem do topo pro android
            floating={true}
            style={{ alignItems: "center" }}
            titleStyle={{ fontWeight: "bold" }}
          />
        ) : (
          <FlashMessage
            //talvez aumentar a margem do topo pro android
            floating={true}
            style={{ alignItems: "center", marginTop: getStatusBarHeight() }}
            titleStyle={{ fontWeight: "bold" }}
          />
        )}
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
