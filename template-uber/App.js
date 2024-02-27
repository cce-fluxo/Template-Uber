
import React, { Platform, View } from "react-native";
import SignUpScreen from "./src/screens/SignUpScreen/index";
import FlashMessage from "react-native-flash-message";
import { StatusBar } from "expo-status-bar";
import { getStatusBarHeight } from "react-native-status-bar-height";

export default function App() {
  return (
    <View className="flex-1">
      <StatusBar style="default" />
      <SignUpScreen></SignUpScreen>
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
    </View>
  );
}

