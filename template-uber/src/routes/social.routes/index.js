import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignInScreen from "../../screens/SignedOut/SignInScreen";
import SignUpScreen from "../../screens/SignedOut/SignUpScreen";
import SignUpCollectorScreen from "../../screens/SignedOut/SignUpCatador";
import ForgotPasswordScreen from "../../screens/SignedOut/ForgotPassword";
import SelectType from "../../screens/SignedOut/SelectType";
import PreSignUpScreen from "../../screens/SignedOut/PreSignUpScreen";
import ProfilePictureScreen from "../../screens/SignedOut/ProfilePhoto";
import ConfirmForgotPasswordScreen from "../../screens/SignedOut/ForgotPassword/confirmForget";
import { colors } from "../../constants/theme";
import SingUpGrandeGerador from "../../screens/SignedOut/SingUpGrandeGerador";

const Stack = createStackNavigator();

export default function SocialRoutes() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={SignInScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Pre Sign Up"
        component={PreSignUpScreen}
        options={{
          title: "Nova Conta",
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.primary,
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "400",
          },
          headerBackTitle: " ",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Select Type"
        component={SelectType}
        options={{
          title: "Gerador de Recicláveis",
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.primary,
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "400",
          },
          headerBackTitle: " ",
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="Nova Conta"
        component={SignUpScreen}
        options={{
          title: "Nova Conta",
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.primary,
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "400",
          },
          headerBackTitle: " ",
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="Novo Grande Gerador"
        component={SingUpGrandeGerador}
        options={{
          title: "Nova Conta",
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.primary,
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "400",
          },
          headerBackTitle: " ",
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="Profile Picture"
        component={ProfilePictureScreen}
        options={{
          title: "Foto de perfil",
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.primary,
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "400",
          },
          headerBackTitle: " ",
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="Novo Catador"
        component={SignUpCollectorScreen}
        options={{
          title: "Nova Conta",
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.primary,
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "400",
          },
          headerBackTitle: " ",
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="Esqueci minha senha"
        component={ForgotPasswordScreen}
        options={{
          title: "Esqueci minha senha",
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.primary,
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "400",
          },
          headerBackTitle: " ",
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="Confirmar nova senha"
        component={ConfirmForgotPasswordScreen}
        options={{
          title: "Redefinir senha",
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.primary,
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "400",
          },
          headerBackTitle: " ",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}
