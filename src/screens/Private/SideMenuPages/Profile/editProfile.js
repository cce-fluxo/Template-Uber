import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as yup from "yup";
import { TextInputMask } from "react-native-masked-text";
import { showMessage } from "react-native-flash-message";
import UserAvatar from "react-native-user-avatar";

import { colors } from "../../../../constants/theme";
import { Feather } from "@expo/vector-icons";
import { screenHeight, screenWidth } from "../../../../constants/dimensions";
import { useAuth } from "../../../../context/auth";
import api from "../../../../services/api";
import getAddress from "../../../../services/getAddress";
import SelectInputModal from "../../../../components/modals/selectInputModal";

export default function EditProfileScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const { user, updateUser, signOut } = useAuth();
  const nameOfUser = user?.name?.split("")[0];

  const [address, setAddress] = useState(user.address);
  const [city, setCity] = useState(user.city);
  const [state, setState] = useState(user.state);
  const [neighbourhood, setNeighbourhood] = useState(user.neighbourhood);

  var addressSearch = {
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
  };

  async function searchAddress(cep, handleRua) {
    await getAddress(cep, addressSearch);
    //console.log(addressSearch);
    setAddress(addressSearch.rua);
    setCity(addressSearch.cidade);
    setState(addressSearch.estado);
    setNeighbourhood(addressSearch.bairro);
  }

  const verifyForSearchAddress = (value) => {
    if (value.length >= 9) {
      //console.log(value);
      searchAddress(value);
    }
  };

  async function editSubmit(userEdited) {
    let objForBack = userEdited;
    objForBack.address = address;
    objForBack.city = city;
    objForBack.state = state;
    objForBack.neighbourhood = neighbourhood;

    setLoading(true);
    try {
      console.log("objForBack", objForBack);
      const response = await api.patch(`/users/${user.id}`, objForBack);
      let newInfos = response.data;
      newInfos.tipo = "comum";
      updateUser(newInfos);
      navigation.navigate("Profile User");
      showMessage({
        message: "Perfil editado com sucesso!",
        type: "success",
        icon: "success",
      });
    } catch (err) {
      showMessage({
        message: "Erro ao editar perfil",
        type: "danger",
        icon: "danger",
      });
      console.log(err);
      console.log(err.response.data);
    }
    setLoading(false);
  }

  const editProfileValidationSchema = yup.object().shape({
    name: yup
      .string()
      .matches(/(\w.+\s).+/, "Entre com seu nome completo")
      .required("Nome completo é obrigatório"),
    celular: yup
      .string()
      .matches(
        /\([1-9]{2}\) (?:[2-9]|9[1-9])[0-9]{4}\-[0-9]{4}$/,
        "Entre com um telefone válido"
      )
      .trim()
      .nullable(),

    email: yup
      .string()
      .email("Entre com um endereço de e-mail válido")
      .required("Endereço de e-mail é obrigatório"),
    cep: yup
      .string()
      .matches(/\d/, "Entre com um CEP válido")
      .min(9, ({ min }) => "Entre com um CEP válido"),

    number: yup
      .string()
      .matches(/\d/, "Entre com um número válido")
      .required("Número é obrigatório"),
    address: yup.string().matches(/(\w.+\s).+/, "Entre com a rua completa"),
    state: yup.string().matches(/\w/, "Entre com seu Estado"),
    city: yup.string().matches(/\w/, "Entre com sua Cidade"),
  });

  const handleDelete = () => {
    Alert.alert(
      "Tem certeza que deseja deletar sua conta?",
      "Seus dados serão perdidos.",
      [
        {
          text: "Cancelar",
          onPress: () => {
            return;
          },
          style: "destructive",
        },
        {
          text: "DELETAR",
          onPress: async () => {
            try {
              showMessage({
                message: "Perfil deletado com sucesso!",
                type: "success",
                icon: "success",
              });
              const response = await api.delete(`/users/${user.id}`);
              signOut();
            } catch (err) {
              showMessage({
                message: "Erro ao deletar conta",
                type: "danger",
                icon: "danger",
              });

              console.log(response.data);
            }
          },
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerMenu}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              "Cancelar edição ?",
              "Caso cancele as mudanças serão perdidas",
              [
                {
                  text: "Cancelar edição",
                  onPress: () => {
                    navigation.navigate("Profile User");
                  },
                  style: "destructive",
                },
                {
                  text: "Continuar edição",
                  onPress: () => {
                    return null;
                  },
                  style: "cancel",
                },
              ],
              { cancelable: false }
            );
          }}
        >
          <Feather name="arrow-left" size={25} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar perfil</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <Formik
          validationSchema={editProfileValidationSchema}
          initialValues={{
            name: user.name,
            email: user.email,
            celular: user.celular,
            cep: user.cep,
            address: user.address,
            number: user.number,
            complement: user.complement,
            neighbourhood: user.neighbourhood,
            city: user.city,
            state: user.state,
            cpf: "",

            /*
                back criar valor tipo pra definir o tipo do user
                tipo: user.tipo,
                */
          }}
          onSubmit={(values) => {
            //console.log(values);
            editSubmit(values);
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
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.background}>
                  <View style={{ alignItems: "center", marginBottom: 30 }}>
                    <UserAvatar
                      size={80}
                      style={{
                        height: 75,
                        width: 75,
                        marginBottom: 5,
                        marginTop: 10,
                      }}
                      name={nameOfUser}
                      bgColor={colors.primary}
                      textColor={colors.background}
                    />
                  </View>
                  <Text style={styles.inputTitle}>Nome</Text>
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

                  <Text style={styles.inputTitle}>E-mail</Text>
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

                  <Text style={styles.inputTitle}>Telefone</Text>
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
                    placeholder="Telefone"
                    keyboardType="number-pad"
                    maxLength={15}
                    value={values.celular}
                    onChangeText={handleChange("celular")}
                    onBlur={handleBlur("celular")}
                  />
                  {errors.celular && touched.celular && (
                    <Text style={styles.errorText}>{errors.celular}</Text>
                  )}

                  <Text style={styles.inputTitle}>CEP</Text>

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

                  <Text style={styles.inputTitle}>Endereço</Text>
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
                    onChangeText={(rua) => setAddress(rua)}
                    autoCapitalize="words"
                    onBlur={handleBlur("address")}
                  />
                  {errors.address && touched.address && (
                    <Text style={styles.errorText}>{errors.address}</Text>
                  )}

                  <Text style={styles.inputTitle}>Número</Text>
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

                    <View
                      style={{ justifyContent: "space-around", marginTop: -18 }}
                    >
                      <Text style={styles.inputTitleLongRight}>
                        Complemento
                      </Text>

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
                  </View>

                  {errors.number && touched.number && (
                    <Text style={styles.errorText}>{errors.number}</Text>
                  )}

                  {errors.complement && touched.complement && (
                    <Text style={styles.errorText}>{errors.complement}</Text>
                  )}

                  <Text style={styles.inputTitle}>Bairro</Text>
                  <View style={{ flexDirection: "row" }}>
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
                      onChangeText={(text) => setNeighbourhood(text)}
                      onBlur={handleBlur("neighbourhood")}
                    />
                  </View>

                  {errors.neighbourhood && touched.neighbourhood && (
                    <Text style={styles.errorText}>{errors.neighbourhood}</Text>
                  )}

                  <Text style={styles.inputTitle}>Cidade</Text>
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

                    <View
                      style={{ justifyContent: "space-around", marginTop: -18 }}
                    >
                      <Text style={styles.inputTitleShortRight}>Estado</Text>
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
                        value={state}
                        onChangeText={(state) => setState(state)}
                        onBlur={handleBlur("state")}
                      />
                    </View>
                  </View>

                  {errors.city && touched.city && (
                    <Text style={styles.errorText}>{errors.city}</Text>
                  )}
                  {errors.state && touched.state && (
                    <Text style={styles.errorText}>{errors.state}</Text>
                  )}

                  <TouchableOpacity
                    style={styles.containerSave(isValid)}
                    onPress={handleSubmit}
                    disabled={!isValid}
                  >
                    {loading ? (
                      <ActivityIndicator
                        size="small"
                        color={colors.background}
                      />
                    ) : (
                      <Text style={styles.textSave}>SALVAR</Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.containerDelete}
                    // onPress={handleDelete}
                    onPress={() => {
                      console.log(errors);
                    }}
                  >
                    <Text style={styles.textDelete}>Deletar conta</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    marginBottom: 70,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerMenu: {
    height: 50,
    paddingLeft: 20,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: "400",
    textAlign: "center",
    paddingLeft: "25%",
  },
  input: {
    width: screenWidth * 0.8876,
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.01,
    marginVertical: screenHeight * 0.0073,
    fontSize: 14,
    color: colors.font,
    marginBottom: screenHeight * 0.022,
    justifyContent: "center",
  },
  inputCEP: {
    width: screenWidth * 0.723,
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.01,
    marginVertical: screenHeight * 0.0073,
    fontSize: 14,
    color: colors.font,
    marginBottom: screenHeight * 0.022,
    justifyContent: "center",
  },
  inputDoubleLong: {
    width: screenWidth * 0.502,
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.01,
    marginVertical: screenHeight * 0.0073,
    fontSize: 14,
    color: colors.font,
    marginBottom: screenHeight * 0.022,
  },
  inputDoubleShort: {
    width: screenWidth * 0.359,
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.01,
    marginVertical: screenHeight * 0.0073,
    fontSize: 14,
    color: colors.font,
    marginLeft: 10,
    marginBottom: screenHeight * 0.022,
  },
  inputDoubleNumber: {
    width: screenWidth * 0.359,
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.01,
    marginVertical: screenHeight * 0.0073,
    fontSize: 14,
    color: colors.font,
    marginRight: 10,
    marginBottom: screenHeight * 0.022,
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
    fontSize: 14,
    color: colors.inputErrorText,
    borderColor: colors.inputErrorBorder,
    borderWidth: 2,
    borderStyle: "solid",
    backgroundColor: colors.inputErrorBackground,
    marginTop: screenHeight * 0.022,
  },
  errorInputCEP: {
    width: screenWidth * 0.723,
    height: 50,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.01,
    marginVertical: screenHeight * 0.0073,
    fontSize: 14,
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
    fontSize: 14,
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
    fontSize: 14,
    color: colors.inputErrorText,
    borderColor: colors.inputErrorBorder,
    borderWidth: 2,
    borderStyle: "solid",
    backgroundColor: colors.inputErrorBackground,
    marginTop: screenHeight * 0.022,
    marginLeft: 10,
  },
  inputTitle: {
    paddingLeft: 30,
    color: colors.primary,
    fontSize: 15,
    alignSelf: "flex-start",
  },
  textInput: {
    color: colors.inputText,
  },
  inputTitleShortRight: {
    paddingLeft: 20,
    color: colors.primary,
    fontSize: 15,
  },
  inputTitleLongRight: {
    paddingLeft: 10,
    color: colors.primary,
    fontSize: 15,
  },
  containerSave: (isValid) => ({
    borderRadius: 5,
    width: screenWidth * 0.8876,
    height: 50,
    backgroundColor: isValid ? colors.primary : colors.primary + 60,
    justifyContent: "center",
    alignItems: "center",
    marginTop: screenHeight * 0.022,
  }),
  textSave: {
    fontSize: screenHeight * 0.0205,
    fontWeight: "bold",
    color: "white",
  },
  containerDelete: {
    borderRadius: 5,

    width: screenWidth * 0.8876,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: screenHeight * 0.02,
  },
  textDelete: {
    fontSize: screenHeight * 0.0205,
    fontWeight: "bold",
    color: colors.inputErrorText,
  },
  buttonText: {
    fontSize: screenHeight * 0.018,
    color: colors.primary,
  },
  searchCep: {
    width: screenWidth * 0.14,
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary + 50,
    marginVertical: screenHeight * 0.0073,
    marginLeft: 10,
  },
});
