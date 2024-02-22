import React, { Platform, View } from "react-native";
import PreSignUpScreen from "./src/screens/PreSignUpScreen";
import SignInScreen from "./src/screens/SignInScreen";
import FlashMessage from "react-native-flash-message";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <View>
      <StatusBar style="default" />
      <SignInScreen></SignInScreen>
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
