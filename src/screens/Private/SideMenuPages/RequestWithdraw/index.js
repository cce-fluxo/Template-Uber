import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../../constants/theme";
import { TextMask, TextInputMask } from "react-native-masked-text";
import { screenHeight, screenWidth } from "../../../../constants/dimensions";
import { useAuth } from "../../../../context/auth";
import { Feather } from "@expo/vector-icons";
import api from "../../../../services/api";
import { showMessage } from "react-native-flash-message";

const RequestWithdraw = ({ navigation }) => {
  const [value, setValue] = useState("0");
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  const parseRealToFloat = (price) => {
    if (price) {
      var number_str = price.slice(2).replace(".", "").replace(",", ".");
      return parseFloat(number_str);
    }
  };

  const handleSubmit = async () => {
    if (!validateValue(value) || !validatePixKey(key)) {
      return;
    }
    setLoading(true);
    try {
      obj = {
        valor: parseRealToFloat(value),
        chave_pix: key,
        status: "Em análise",
      };
      response = await api.post("/saque", obj);
      console.log(obj);
      showMessage({
        message: "Solicitação de saque criada!",
        type: "success",
        icon: "success",
      });
    } catch (err) {
      console.log(err);
      console.log(err.response.data);
      showMessage({
        message: "Erro ao criar solicitação de saque!",
        type: "success",
        icon: "success",
      });
    }
    setLoading(false);

    setValue(0);
    setKey("");
  };

  const validateValue = (x) => {
    const converted = parseRealToFloat(x);
    // console.log('converted = ' + converted);
    if (converted == NaN || converted == undefined || converted == null) {
      return false;
    } else if (converted > user?.saldo || converted == 0) {
      return false;
    } else {
      return true;
    }
  };

  const validatePixKey = (pixKey) => {
    // Remove caracteres alfanuméricos
    const alphanumericRegex = /[^a-zA-Z0-9]/g;
    const cleanedPixKey = pixKey.replace(alphanumericRegex, "");

    // Verifica se é um CPF válido
    if (cleanedPixKey.length === 11 && !isNaN(cleanedPixKey)) {
      return true;
    }

    // Verifica se é um telefone válido
    const phoneRegex = /^\d{10,11}$/;
    if (phoneRegex.test(cleanedPixKey)) {
      return true;
    }

    // Verifica se é um e-mail válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(pixKey)) {
      return true;
    }

    return false;
  };

  const getErrorMessageValue = (value) => {
    if (value !== "R$0,00") {
      if (!validateValue(value)) {
        return "Saldo insuficiente";
      }
    }

    return "";
  };

  const getErrorMessagePix = (pixKey) => {
    if (pixKey?.length > 0) {
      if (!validatePixKey(pixKey)) {
        return "Insira uma chave pix válida";
      }
    }
    return "";
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerMenu}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Feather name="arrow-left" size={25} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Solicitar Saque</Text>
      </View>
      <View style={styles.balanceView}>
        <Text style={styles.myBalance}>Meu saldo</Text>
        <TextMask
          style={styles.myBalanceValue}
          value={user?.saldo}
          type={"money"}
          options={{
            precision: 2,
            separator: ",",
            delimiter: ".",
            unit: "R$",
            suffixUnit: "",
          }}
        />
      </View>

      <ScrollView
        keyboardDismissMode="on-drag"
        // contentContainerStyle={styles.scroll}
        style={{ flex: 1 }}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            Faça uma solicitação de saque para resgatar seu saldo
          </Text>
          <Text style={styles.subTitle}>
            Escolha a chave pix para receber seu dinheiro
          </Text>
          <View style={styles.valueBox}>
            <TextInputMask
              autoFocus={true}
              style={styles.value}
              type={"money"}
              options={{
                precision: 2,
                separator: ",",
                delimiter: ".",
                unit: "R$",
              }}
              value={value}
              placeholder="0,00"
              onChangeText={(text) => setValue(text)}
              blurOnSubmit={true}
              onSubmitEditing={(e) => handleSubmit()}
            />
          </View>
          <Text style={styles.error}>{getErrorMessageValue(value)}</Text>

          <View style={styles.pixContainer}>
            <Text style={styles.pixKeySubtitle}>Chave Pix:</Text>
            <View style={styles.pixKeyContainer}>
              <TextInput
                autoFocus={true}
                style={styles.pixKey}
                placeholder="Entre com CPF, Telefone ou E-mail"
                value={key}
                onChangeText={(text) => setKey(text)}
                blurOnSubmit={true}
                onSubmitEditing={(e) => handleSubmit()}
              />
            </View>
          </View>
        </View>
        <Text style={styles.error}>{getErrorMessagePix(key)}</Text>
      </ScrollView>
      <TouchableOpacity
        disabled={
          validateValue(value) && validatePixKey(key) && !loading ? false : true
        }
        style={
          validateValue(value) && validatePixKey(key)
            ? styles.containerContinueEnable
            : styles.containerContinueDisable
        }
        onPress={handleSubmit}
      >
        <Text style={styles.textContinue}>
          {loading ? (
            <ActivityIndicator size="large" color={colors.background} />
          ) : (
            "SOLICITAR"
          )}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  background: {
    // marginBottom: 50,
    flex: 1,
    // backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    height: screenHeight * 0.8,
  },
  contentContainer: {
    alignItems: "center",
  },

  title: {
    color: colors.font,
    fontSize: 22,
    textAlign: "center",
    marginTop: 25,
    width: screenWidth * 0.7,
  },
  subTitle: {
    color: colors.font,
    fontSize: 16,
    textAlign: "center",
    marginTop: 5,
    marginBottom: 30,
    width: screenWidth * 0.6,
  },
  error: {
    color: colors.inputErrorText,
    fontSize: 16,
    textAlign: "center",
    alignSelf: "center",
    marginTop: 5,
    width: screenWidth * 0.6,
  },
  value: {
    color: colors.font,
    fontSize: 34,
    textAlign: "center",
    marginVertical: 15,
  },
  pixKey: {
    color: colors.font,
    fontSize: 16,
    textAlign: "center",
  },
  valueBox: {
    backgroundColor: colors.primary + 24,
    height: screenHeight * 0.1,
    width: screenWidth * 0.62,
    borderRadius: 20,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  pixContainer: {
    alignItems: "flex-start",
    marginTop: screenHeight * 0.02,
  },
  pixKeySubtitle: {
    color: colors.font,
    fontSize: 16,
    marginTop: 5,
    width: screenWidth * 0.6,
  },
  pixKeyContainer: {
    backgroundColor: colors.primary + 24,
    height: 40,
    width: screenWidth * 0.85,
    borderRadius: 10,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  myBalanceValue: {
    color: colors.primary,
    fontSize: 14,
    textAlign: "center",
  },
  myBalance: {
    fontSize: 14,
    color: colors.primary,
  },
  balanceView: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    width: screenWidth * 0.85,
    alignSelf: "center",
    backgroundColor: colors.primary + 10,
    justifyContent: "space-between",
    paddingHorizontal: screenWidth * 0.06,
    borderWidth: 0.3,
    borderColor: colors.primary + 40,
    borderRadius: 10,
    marginVertical: 20,
  },
  keyboard: {
    alignItems: "center",
    top: screenHeight * 0.03,
    justifyContent: "flex-end",
  },
  containerContinueEnable: {
    borderRadius: 5,
    width: screenWidth * 0.887,
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: screenHeight * 0.02,
  },
  containerContinueDisable: {
    borderRadius: 5,
    width: screenWidth * 0.887,
    height: 50,
    backgroundColor: colors.inputText + "aa",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: screenHeight * 0.02,
  },
  textContinue: {
    fontSize: screenHeight * 0.02,
    fontWeight: "bold",
    color: "white",
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
    paddingLeft: "27%",
  },
});

export default RequestWithdraw;
