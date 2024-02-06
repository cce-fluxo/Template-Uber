import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { showMessage } from "react-native-flash-message";
import { colors } from "../../../../constants/theme";

import { useAuth } from "../../../../context/auth";
import api from "../../../../services/api";
import { Feather } from "@expo/vector-icons";
import { screenHeight, screenWidth } from "../../../../constants/dimensions";
import * as Clipboard from "expo-clipboard";

const PaymentScreen = ({ navigation, route }) => {
  const { user } = useAuth();
  const { value } = route.params;

  const [copiedText, setCopiedText] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const parseRealToFloat = (price) => {
    if (price) {
      var number_str = price.slice(2).replace(".", "").replace(",", ".");
      return parseFloat(number_str);
    }
  };

  const copyToClipboard = () => {
    setCopiedText(true);
    Clipboard.setString(code);
  };

  useEffect(() => {
    createPayment();
  }, []);

  async function createPayment() {
    setLoading(true);
    let pixObj = {
      transaction_amount: parseRealToFloat(value),
      description: "Recarga de créditos - Sirí",
      payment_method_id: "pix",
      external_reference: "1",
      payer: { email: user.email },
    };
    try {
      //console.log(pixObj);
      const response = await api.post(`/pagamento`, pixObj);
      //console.log(response.data);
      setCode(response.data.transaction_data.qr_code);
    } catch (err) {
      showMessage({
        message: "Não foi possível criar um pagamento",
        type: "danger",
        icon: "danger",
      });
      navigation.goBack();
      console.log(err);
    }
    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.headerMenu}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Feather name="arrow-left" size={25} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pagamento</Text>
      </View>
      {loading ? (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      ) : (
        <>
          <ImageBackground
            source={require("../../../../assets/undraw_Order_confirmed_re_g0if.png")}
            resizeMode="contain"
            style={styles.image}
          />
          <Text style={styles.title}>Aguardando Pagamento</Text>
          <Text style={styles.subTitle}>
            Copie o código abaixo para pagar via Pix pelo aplicativo do seu
            banco:
          </Text>

          <View style={styles.codeBox}>
            <Text style={styles.codeText} numberOfLines={1}>
              {code}
            </Text>
            <TouchableOpacity onPress={() => copyToClipboard()}>
              {copiedText ? (
                <Feather name="check" size={25} color={colors.font} />
              ) : (
                <Feather name="copy" size={25} color={colors.font} />
              )}
            </TouchableOpacity>
          </View>

          <Text style={styles.subText}>
            Você tem até 5 minutos para fazer o pagamento. Após esse tempo, a
            recarga será cancelada
          </Text>

          <TouchableOpacity
            style={styles.containerContinueEnable}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={styles.textContinue}>Já realizei o pagamento</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    marginBottom: 50,
    flex: 1,
    backgroundColor: colors.background,
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
  image: {
    top: screenHeight * 0.06,
    height: screenHeight * 0.27,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: screenWidth * 0.85,
    backgroundColor: colors.primary + 20,
    borderRadius: 100,
  },
  title: {
    color: colors.font,
    fontSize: 24,
    textAlign: "center",
    marginTop: screenHeight * 0.1,
    width: screenWidth * 0.8,
    alignSelf: "center",
  },
  subTitle: {
    color: colors.font,
    fontSize: 15,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
    width: screenWidth * 0.65,
    alignSelf: "center",
  },
  subText: {
    color: colors.font,
    fontSize: 13,
    textAlign: "center",
    marginBottom: 30,
    width: screenWidth * 0.8,
    alignSelf: "center",
  },
  containerContinueEnable: {
    borderRadius: 5,
    position: "relative",
    width: screenWidth * 0.887,
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  textContinue: {
    fontSize: screenHeight * 0.02,
    fontWeight: "bold",
    color: "white",
  },
  codeBox: {
    height: 40,
    width: screenWidth * 0.7,
    backgroundColor: colors.inputBackground,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 10,
    flexDirection: "row",
  },
  codeText: {
    color: colors.font,
    width: "80%",
  },
});

export default PaymentScreen;
