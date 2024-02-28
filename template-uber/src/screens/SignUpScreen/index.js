import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard,
  Platform,
} from "react-native";

import { Formik } from "formik";
import * as yup from "yup";
import { TextInputMask } from "react-native-masked-text";
import { showMessage } from "react-native-flash-message";

import { screenWidth, screenHeight } from "../../constants/dimensions";
import { colors } from "../../constants/theme";
//import api from "../../../services/api";
//import getAddress from "../../../services/getAddress";
import { Feather } from "@expo/vector-icons";

const SignUpScreen = (navigation, route) => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [neighbourhood, setNeighbourhood] = useState("");
  const [hidden, setHidden] = useState(true);
  const [confirmHidden, setConfirmHidden] = useState(true);

  //const { type } = route.params; descomentar quando type estiver pronto

  var addressSearch = {
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
  };

  const signUpValidationSchema = yup.object().shape({
    name: yup
      .string()
      .matches(/(\w.+\s).+/, "Entre com seu nome completo")
      .required("Nome completo é obrigatório"),
    celular: yup
      .string()
      .matches(
        /\([1-9]{2}\) (?:[2-9]|9[1-9])[0-9]{4}\-[0-9]{4}$/,
        "Entre com um celular válido"
      )

      .required("celular é obrigatório")
      .trim(),
    email: yup
      .string()
      .email("Entre com um endereço de e-mail válido")
      .required("Endereço de e-mail é obrigatório"),

    cep: yup
      .string()
      .matches(/[0-9]{5}-[0-9]{3}$/, "Entre com um CEP válido")
      .required("CEP é obrigatório"),
    number: yup
      .string()
      .matches(/\d/, "Entre com um número válido")
      .required("Número é obrigatório"),
    //.required('Número é obrigatório')
    address: yup.string().matches(/(\w.+\s).+/, "Entre com a rua completa"),
    //.required('Inserir rua é obrigatório')
    state: yup.string().matches(/\w/, "Entre com seu Estado"),
    city: yup.string().matches(/\w/, "Entre com sua Cidade"),

    password: yup
      .string()
      // .matches(/\w*[a-z]\w*/, 'Senha deve ter pelo menos uma letra minúscula')
      // .matches(/\w*[A-Z]\w*/, 'Senha deve ter pelo menos uma letra maiúscula')
      // .matches(/\d/, 'Senha deve ter pelo menos um número')
      // .matches(
      //    /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      //  'Senha deve ter pelo menos um caractere especial'
      // )
      .min(8, ({ min }) => `Senha deve ter no mínimo ${min} caracteres`)
      .required("Senha é obrigatório"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas não são compatíveis")
      .required("Confirmar a senha é obrigatório"),
  });

  async function signUp(user) {
    setLoading(true);

    const { confirmPassword, ...data } = user;
    data.neighbourhood = neighbourhood;
    data.state = state;
    data.address = address;
    data.city = city;

    console.log(data);
    try {
      const response = await api.post("/cadastro", data);
      showMessage({
        message: "Cadastro efetuado com sucesso!",
        type: "success",
        icon: "success",
      });
      navigation.navigate("Login");
    } catch (err) {
      {
        console.log(err.response.data.msg);
        console.log(err.response.data);
        console.log(err);
        showMessage({
          message: "Erro ao efetuar cadastro",
          type: "danger",
          icon: "danger",
        });
      }
    }
    setLoading(false);
  }

  async function searchAddress(cep, handleRua) {
    await getAddress(cep, addressSearch);
    setAddress(addressSearch.rua);
    setCity(addressSearch.cidade);
    setState(addressSearch.estado);
    setNeighbourhood(addressSearch.bairro);
  }

  const verifyForSearchAddress = (value) => {
    if (value.length >= 9) {
      searchAddress(value);
    }
  };

  const handleHidePassword = () => {
    setHidden(!hidden);
  };

  const handleConfirmHidePassword = () => {
    setConfirmHidden(!confirmHidden);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <Formik
        validationSchema={signUpValidationSchema}
        initialValues={{
          name: "",
          email: "",
          celular: "",
          cep: "",
          address: address,
          number: "",
          complement: "",
          neighbourhood: neighbourhood,
          city: city,
          state: state,
          password: "",
          confirmPassword: "",
          //tipo: type, decomentar quando type estiver pronto
          cpf: "",
          img_url: "sfgdfs",
        }}
        onSubmit={(values) => {
          signUp(values);
        }}
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
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 20 }}
            >
              <View style={styles.background}>
                <>
                  <Image style={styles.image} source="" />
                  <TextInput
                    autoCapitalize="words"
                    style={
                      errors.name && touched.name
                        ? styles.errorInput
                        : styles.input
                    }
                    onChangeText={handleChange("name")}
                    value={values.name}
                    placeholder="Nome completo*"
                    onBlur={handleBlur("name")}
                  />
                  {errors.name && touched.name && (
                    <Text style={styles.errorText}>{errors.name}</Text>
                  )}

                  <TextInput
                    style={
                      errors.email && touched.email
                        ? styles.errorInput
                        : styles.input
                    }
                    autoCapitalize="none"
                    placeholder="E-mail*"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="email-address"
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}

                  <TextInputMask
                    type={"cel-phone"}
                    options={{
                      maskType: "BRL",
                      withDDD: true,
                      dddMask: "(99) ",
                    }}
                    style={
                      errors.celular && touched.celular
                        ? styles.errorInput
                        : styles.input
                    }
                    name="celular"
                    placeholder="Celular"
                    keyboardType="number-pad"
                    maxLength={15}
                    value={values.celular}
                    onChangeText={handleChange("celular")}
                    onBlur={handleBlur("celular")}
                  />
                  {errors.celular && touched.celular && (
                    <Text style={styles.errorText}>{errors.celular}</Text>
                  )}

                  <TextInputMask
                    type={"zip-code"}
                    style={
                      errors.cep && touched.cep
                        ? styles.errorInput
                        : styles.input
                    }
                    name="cep"
                    placeholder="CEP"
                    keyboardType="number-pad"
                    maxLength={9}
                    value={values.cep}
                    onChangeText={handleChange("cep")}
                    onBlur={handleBlur("cep")}
                    onEndEditing={verifyForSearchAddress(values.cep)}
                  />

                  {errors.cep && touched.cep && (
                    <Text style={styles.errorText}>{errors.cep}</Text>
                  )}

                  <TextInput
                    editable={false}
                    style={
                      errors.address && touched.address
                        ? styles.errorInput
                        : styles.input
                    }
                    name="address"
                    placeholder="Rua"
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                    autoCapitalize="words"
                    onBlur={handleBlur("address")}
                  />
                  {errors.address && touched.address && (
                    <Text style={styles.errorText}>{errors.address}</Text>
                  )}

                  <View style={{ flexDirection: "row" }}>
                    <TextInput
                      editable={false}
                      style={
                        errors.city && touched.city
                          ? styles.errorInputLong
                          : styles.inputDoubleLong
                      }
                      name="city"
                      placeholder="Cidade"
                      value={city}
                      onChangeText={(city) => setCity(city)}
                      onBlur={handleBlur("city")}
                    />

                    <TextInput
                      editable={false}
                      style={
                        errors.state && touched.state
                          ? styles.errorInputShort
                          : styles.inputDoubleShort
                      }
                      name="state"
                      placeholder="Estado"
                      maxLength={2}
                      autoCapitalize="characters"
                      value={state}
                      onChangeText={(state) => setState(state)}
                      onBlur={handleBlur("state")}
                    />
                  </View>

                  {errors.city && touched.city && (
                    <Text style={styles.errorText}>{errors.city}</Text>
                  )}
                  {errors.state && touched.state && (
                    <Text style={styles.errorText}>{errors.state}</Text>
                  )}

                  <TextInput
                    editable={false}
                    style={
                      errors.neighbourhood && touched.neighbourhood
                        ? styles.errorInput
                        : styles.input
                    }
                    name="neighbourhood"
                    placeholder="Bairro"
                    value={neighbourhood}
                    //onChangeText={handleChange('neighbourhood')}
                    onChangeText={(text) => setNeighbourhood(text)}
                    onBlur={handleBlur("neighbourhood")}
                  />

                  {errors.neighbourhood && touched.neighbourhood && (
                    <Text style={styles.errorText}>{errors.neighbourhood}</Text>
                  )}

                  <View style={{ flexDirection: "row" }}>
                    <TextInput
                      style={
                        errors.number && touched.number
                          ? styles.errorInputShort
                          : styles.inputDoubleNumber
                      }
                      name="number"
                      placeholder="Número"
                      keyboardType="phone-pad"
                      maxLength={8}
                      value={values.number}
                      onChangeText={handleChange("number")}
                      onBlur={handleBlur("number")}
                    />

                    <TextInput
                      style={
                        errors.complement && touched.complement
                          ? styles.errorInputLong
                          : styles.inputDoubleLong
                      }
                      name="complement"
                      placeholder="Complemento"
                      value={values.complement}
                      onChangeText={handleChange("complement")}
                      onBlur={handleBlur("complement")}
                    />
                  </View>

                  {errors.number && touched.number && (
                    <Text style={styles.errorText}>{errors.number}</Text>
                  )}

                  {errors.complement && touched.complement && (
                    <Text style={styles.errorText}>{errors.complement}</Text>
                  )}
                  <View
                    style={
                      errors.password && touched.password
                        ? styles.ErrorInputView
                        : styles.inputView
                    }
                  >
                    <TextInput
                      style={styles.passwordInput}
                      name="password"
                      placeholder="Senha*"
                      secureTextEntry={hidden}
                      value={values.password}
                      autoCapitalize="none"
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      color={
                        errors.password && touched.password
                          ? colors.inputErrorText
                          : colors.font
                      }
                    />
                    <TouchableOpacity onPress={handleHidePassword}>
                      <Feather
                        name={hidden ? "eye" : "eye-off"}
                        size={30}
                        color={
                          errors.password && touched.password
                            ? colors.inputErrorText
                            : colors.inputText
                        }
                      />
                    </TouchableOpacity>
                  </View>

                  {errors.password && touched.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}

                  <View
                    style={
                      errors.confirmPassword && touched.confirmPassword
                        ? styles.ErrorInputView
                        : styles.inputView
                    }
                  >
                    <TextInput
                      style={styles.passwordInput}
                      name="confirmPassword"
                      placeholder="Confirme sua senha*"
                      secureTextEntry={confirmHidden}
                      value={values.confirmPassword}
                      autoCapitalize="none"
                      onChangeText={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      color={
                        errors.confirmPassword && touched.confirmPassword
                          ? colors.inputErrorText
                          : colors.font
                      }
                    />
                    <TouchableOpacity onPress={handleConfirmHidePassword}>
                      <Feather
                        name={confirmHidden ? "eye" : "eye-off"}
                        size={30}
                        color={
                          errors.confirmPassword && touched.confirmPassword
                            ? colors.inputErrorText
                            : colors.inputText
                        }
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Text style={styles.errorText}>
                      {errors.confirmPassword}
                    </Text>
                  )}

                  <TouchableOpacity
                    style={styles.containerCreat}
                    onPress={handleSubmit}
                    disabled={!isValid}
                  >
                    {loading ? (
                      <ActivityIndicator
                        size="small"
                        color={colors.background}
                      />
                    ) : (
                      <Text style={styles.textCreat}>CRIAR</Text>
                    )}
                  </TouchableOpacity>
                </>
              </View>
            </ScrollView>
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  background: {
    marginTop: screenHeight * 0.029,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    resizeMode: "contain",
    height: screenHeight * 0.22,
  },
  containerCreat: {
    borderRadius: 5,
    width: screenWidth * 0.8876,
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: screenHeight * 0.022,
    marginBottom: screenHeight * 0.044,
  },
  textCreat: {
    fontSize: screenHeight * 0.0205,
    fontWeight: "bold",
    color: "white",
  },
  inputView: {
    width: screenWidth * 0.8876,
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    marginVertical: screenHeight * 0.0073,
    marginTop: screenHeight * 0.022,
    flexDirection: "row",
    alignItems: "center",
  },
  ErrorInputView: {
    width: screenWidth * 0.8876,
    height: 50,
    borderRadius: 5,
    marginVertical: screenHeight * 0.0073,
    marginTop: screenHeight * 0.022,
    flexDirection: "row",
    alignItems: "center",
    fontSize: 16,
    color: colors.inputErrorText,
    borderColor: colors.inputErrorBorder,
    borderWidth: 2,
    borderStyle: "solid",
    backgroundColor: colors.inputErrorBackground,
  },
  input: {
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
  passwordInput: {
    width: screenWidth * 0.7776,
    height: 50,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.01,
    fontSize: 16,
    color: colors.font,
  },
  inputCep: {
    width: screenWidth * 0.72,
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
  inputDoubleLong: {
    width: screenWidth * 0.502,
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
  inputDoubleShort: {
    width: screenWidth * 0.359,
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.01,
    marginVertical: screenHeight * 0.0073,
    fontSize: 16,
    color: colors.font,
    marginTop: screenHeight * 0.022,
    marginLeft: 10,
  },
  inputDoubleNumber: {
    width: screenWidth * 0.359,
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.01,
    marginVertical: screenHeight * 0.0073,
    fontSize: 16,
    color: colors.font,
    marginTop: screenHeight * 0.022,
    marginRight: 10,
  },
  errorText: {
    color: colors.fontError,
    fontSize: screenHeight * 0.016,
    alignSelf: "center",
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
  errorInputCep: {
    width: screenWidth * 0.75,
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
  errorInputLong: {
    width: screenWidth * 0.502,
    height: 50,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.01,
    marginVertical: screenHeight * 0.0,
    fontSize: 16,
    color: colors.inputErrorText,
    borderColor: colors.inputErrorBorder,
    borderWidth: 2,
    borderStyle: "solid",
    backgroundColor: colors.inputErrorBackground,
    marginTop: screenHeight * 0.022,
  },
  errorInputShort: {
    width: screenWidth * 0.359,
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
    marginRight: 10,
  },

  searchCep: {
    width: screenWidth * 0.14,
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary + 50,
    marginVertical: screenHeight * 0.0073,
    marginTop: screenHeight * 0.022,
    marginLeft: 10,
  },
});

export default SignUpScreen;
