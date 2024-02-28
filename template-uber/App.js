import React, { Platform, View } from "react-native";
import SignUpScreen from "./src/screens/SignUpScreen";
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
          floating={true}
          style={{ alignItems: "center" }}
          titleStyle={{ fontWeight: "bold" }}
        />
      ) : (
        <FlashMessage
          floating={true}
          style={{ alignItems: "center", marginTop: getStatusBarHeight() }}
          titleStyle={{ fontWeight: "bold" }}
        />
      )}
    </View>
  );
}
