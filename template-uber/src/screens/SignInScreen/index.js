import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
  Platform,
} from "react-native";
import * as yup from "yup";
import { Formik } from "formik";

import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants/theme";
import { screenHeight, screenWidth } from "../../constants/dimensions";
//import { useAuth } from "../../../context/auth";

export default function SignInScreen(navigation) {
  const [loading, setLoading] = useState(false);

  //const { signIn } = useAuth(); Descomentar quando autenticação estiver pronta

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Entre com um endereço de e-mail válido")
      .required("Endereço de e-mail obrigatório"),
    password: yup
      .string()
      .min(8, ({ min }) => `A senha deve ter no mínimo ${min} caracteres`)
      .required("Senha obrigatória"),
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.background}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Pre Sign Up")}
        >
          <Text style={styles.buttonText}>NOVA CONTA</Text>
        </TouchableOpacity>

        <View
          /*caso n tenha social login*/
          style={{
            justifyContent: "center",
            flex: 1,
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Image style={styles.image} source="" />
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ email: "", password: "" }}
            //onSubmit={(values) => {
            //signIn(values.email, values.password, setLoading);
            //}} Descomentar quando autenticação estiver prontas
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
              touched,
            }) => (
              <>
                <TextInput
                  style={
                    errors.email && touched.email
                      ? styles.errorInput
                      : styles.inputLogIn
                  }
                  placeholder="E-mail"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TextInput
                  style={
                    errors.password && touched.password
                      ? styles.errorInput
                      : styles.inputLogIn
                  }
                  placeholder="Senha"
                  autoCorrect={false}
                  autoCapitalize="none"
                  secureTextEntry={true}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
                {errors.password && touched.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
                <TouchableOpacity
                  style={styles.containerForgotPassword}
                  onPress={() => navigation.navigate("Esqueci minha senha")}
                >
                  <Text style={styles.textForgotPassword}>
                    Esqueci minha senha
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    !isValid
                      ? styles.containerSignNotAvailable
                      : styles.containerSign
                  }
                  onPress={handleSubmit}
                  disabled={!isValid}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color={colors.background} />
                  ) : (
                    <Text style={styles.textSign}>ENTRAR</Text>
                  )}
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    marginBottom: screenHeight * 0.073,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    marginTop: screenHeight * 0.029,
  },

  image: {
    resizeMode: "contain",
    height: screenHeight * 0.2203,
    alignSelf: "center",
  },
  containerForgotPassword: {
    marginTop: screenHeight * 0.01468,
    alignItems: "center",
  },
  textForgotPassword: {
    fontSize: 16,
    color: colors.primary,
    textDecorationLine: "underline",
  },
  anotherWay: {
    marginTop: screenHeight * 0.044,
    marginBottom: screenHeight * 0.0367,
    fontSize: 16,
    color: colors.primary,
  },
  inputLogIn: {
    width: screenWidth * 0.8876,
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.01,
    marginVertical: screenHeight * 0.0073,
    fontSize: 16,
    color: colors.font,
    marginTop: screenHeight * 0.022,
  },
  errorText: {
    color: colors.fontError,
    fontSize: screenHeight * 0.0161,
    alignSelf: "center",
  },
  button: {
    borderRadius: 5,
    width: screenWidth * 0.354,
    height: screenHeight * 0.05287,
    borderColor: colors.primary,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: screenHeight * 0.0293,
    marginLeft: "50%",
    marginBottom: screenHeight * 0.0293,
  },
  buttonText: {
    fontSize: 16,
    color: colors.primary,
  },
  errorInput: {
    width: screenWidth * 0.8876,
    height: 50,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.01,
    marginVertical: screenHeight * 0.0073,
    fontSize: 16,
    color: colors.inputErrorText,
    borderColor: colors.inputErrorBorder,
    borderWidth: 2,
    borderStyle: "solid",
    backgroundColor: colors.inputErrorBackground,
    marginTop: screenHeight * 0.022,
  },
  containerSign: {
    borderRadius: 5,
    width: screenWidth * 0.8876,
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: screenHeight * 0.022,
    marginBottom: screenHeight * 0.044,
  },
  containerSignNotAvailable: {
    borderRadius: 5,
    width: screenWidth * 0.8876,
    height: 50,
    backgroundColor: colors.inputText + "aa",
    justifyContent: "center",
    alignItems: "center",
    marginTop: screenHeight * 0.022,
    marginBottom: screenHeight * 0.044,
  },
  textSign: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
