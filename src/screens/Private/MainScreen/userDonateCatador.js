import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../constants/theme";
import { screenHeight, screenWidth } from "../../../constants/dimensions";
import { AirbnbRating } from "react-native-ratings";
import { showMessage } from "react-native-flash-message";
import { Feather } from "@expo/vector-icons";

import DonationValueModal from "../../../components/modals/donationValueModal";

import { useAuth } from "../../../context/auth";
import api from "../../../services/api";

export default function UserDonateCatador({ navigation, route }) {
  const { user } = useAuth();
  const { itemInformation } = route.params;
  const [loadingConfirm, setLoadingConfirm] = useState(false);

  // console.log(itemInformation.catador.user.name);

  const catadorFirstName = itemInformation?.catador?.user?.name?.split(" ")[0];

  // Rating

  const [rate, setRate] = useState(0);

  function ratingCompleted(rating) {
    setRate(rating);
  }

  // Tip

  const [value, setValue] = useState("R$0,00");
  const modalRef = useRef(null);

  const tipValues = {
    small: 1,
    mid: 3,
    big: 5,
  };

  const openValuesModal = () => modalRef.current?.open();

  const reaisToFloat = (reais) => {
    const valueString = reais.split("R$")[1];
    const floatString = valueString.replace(/,/i, ".");
    return parseFloat(floatString);
  };

  // Request Completed Finish

  async function rateCollect() {
    console.log("oi");
    const objToBack = {
      score: rate,
      gorjeta: reaisToFloat(value),
    };
    if (rate < 1) {
      showMessage({
        message: "Insira uma nota para a coleta",
        type: "danger",
        icon: "danger",
      });
    } else {
      try {
        console.log(objToBack);

        console.log("user.id", user.id);
        const response = await api.patch(
          `/users/${user.id}/coleta/${itemInformation.id}/score`,
          objToBack
        );
        showMessage({
          message: "Coleta avaliada com sucesso!",
          type: "success",
          icon: "success",
        });
        navigation.navigate("Home");
      } catch (err) {
        if (err.response.data.error == "Saldo insuficiente") {
          showMessage({
            message: "Saldo insuficiente",
            description: "Adicione créditos à conta agora",
            type: "danger",
            icon: "danger",
          });
          navigation.navigate("Add Credits Finish Screen");
        } else {
          showMessage({
            message: "Não foi possível avaliar a coleta",
            type: "danger",
            icon: "danger",
          });
          console.log("\n\n\n\n\n\nerr", err);
          console.log(err.response.data);
          navigation.navigate("Home");
        }
      }
    }
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerMenu}>
        {itemInformation.entregue ? (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Feather name="arrow-left" size={30} color={colors.primary} />
          </TouchableOpacity>
        ) : null}

        <Text style={styles.headerTitle}>Avaliar coleta</Text>
      </View>

      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={styles.finishModal}>
          <Text style={styles.discriptionText}>
            Avalie a coleta realizada por {catadorFirstName}
          </Text>
          <AirbnbRating
            defaultRating={0}
            selectedColor={colors.primary + "bf"}
            unSelectedColor={colors.primary + 40}
            size={30}
            showRating={false}
            onFinishRating={ratingCompleted}
            ratingContainerStyle={{ paddingVertical: 20 }}
          />
        </View>
      </View>

      <View style={styles.divisor} />

      <View
        style={{
          alignItems: "center",
          height: screenHeight * 0.4,
        }}
      >
        <Text style={styles.discriptionText}>
          Agradeça a coleta com uma gorjeta
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: screenWidth * 0.22 * 3 + 20,
          }}
        >
          <TouchableOpacity
            style={styles.optionCircle}
            onPress={() => setValue(`R$${tipValues.small},00`)}
          >
            <Text style={styles.optionFont}>R$ {tipValues.small}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionCircle}
            onPress={() => setValue(`R$${tipValues.mid},00`)}
          >
            <Text style={styles.optionFont}>R$ {tipValues.mid}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionCircle}
            onPress={() => setValue(`R$${tipValues.big},00`)}
          >
            <Text style={styles.optionFont}>R$ {tipValues.big}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => openValuesModal()}>
          {reaisToFloat(value) === 0 ? (
            <Text style={styles.otherValueText}>Outro valor</Text>
          ) : (
            <Text style={styles.otherValueText}>Valor: {value}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setValue(`R$0,00`)}>
          <Text style={styles.optionFont}>Limpar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={
          false ? styles.containerFinishNotAvailable : styles.containerFinish
        }
        disabled={false}
        onPress={() => {
          rateCollect();
        }}
      >
        {loadingConfirm ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.textFinish}>CONFIRMAR</Text>
        )}
      </TouchableOpacity>
      <DonationValueModal
        value={value}
        setValue={setValue}
        modalRef={modalRef}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    alignSelf: "center",
    paddingLeft: screenWidth * 0.23,
  },
  finishModal: {
    width: "90%",
    height: screenHeight * 0.25,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.primary + 10,
    top: 20,
    position: "absolute",
  },
  discriptionText: {
    width: screenWidth * 0.8,
    fontSize: 20,
    textAlign: "center",
    color: colors.font,
    marginVertical: 30,
  },
  containerFinish: {
    borderRadius: 5,
    width: screenWidth * 0.8876,
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: screenHeight * 0.022,
    marginBottom: screenHeight * 0.022,
    alignSelf: "center",
  },
  containerFinishNotAvailable: {
    borderRadius: 5,
    width: screenWidth * 0.8876,
    height: 50,
    backgroundColor: colors.inputText + "aa",
    justifyContent: "center",
    alignItems: "center",
    marginTop: screenHeight * 0.022,
    marginBottom: screenHeight * 0.022,
    alignSelf: "center",
  },
  textFinish: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  divisor: {
    height: 1,
    width: screenWidth * 0.9,
    alignSelf: "center",
    marginVertical: 30,
    backgroundColor: colors.font + 40,
  },
  optionCircle: {
    height: screenWidth * 0.18,
    width: screenWidth * 0.18,
    borderRadius: screenWidth * 0.18,
    borderColor: colors.primary,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  optionFont: {
    fontSize: 20,
    color: colors.font,
  },

  otherValueText: {
    fontSize: 16,
    color: colors.primary,
    marginVertical: 15,
  },
});
