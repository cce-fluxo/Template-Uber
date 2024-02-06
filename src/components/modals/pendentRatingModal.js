import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";

//
import { Modalize } from "react-native-modalize";
import { AirbnbRating } from "react-native-ratings";
import { showMessage } from "react-native-flash-message";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import UserAvatar from "react-native-user-avatar";
import { useNavigation } from "@react-navigation/native";

//
import { colors } from "../../constants/theme";
import { screenHeight, screenWidth } from "../../constants/dimensions";
import { useAuth } from "../../context/auth";
import api from "../../services/api";
import DonationValueModal from "./donationValueModal";

export default function PendentRateModal({ modalRef, collectList }) {
  const { user } = useAuth();
  const [loadingConfirm, setLoadingConfirm] = useState(false);

  // local states
  const [rate, setRate] = useState(0);
  const [value, setValue] = useState("R$0,00");

  const collectInfo = collectList[0];

  function ratingCompleted(rating) {
    setRate(rating);
  }

  const tipValues = {
    small: 1,
    mid: 3,
    big: 5,
  };

  const navigation = useNavigation();

  // format date
  function formatDate(date) {
    const newDate = new Date(date);
    return format(newDate, "dd MMM", { locale: ptBR });
  }

  const reaisToFloat = (reais) => {
    const valueString = reais.split("R$")[1];
    const floatString = valueString.replace(/,/i, ".");
    return parseFloat(floatString);
  };

  async function rateCollect() {
    setLoadingConfirm(true);
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
        console.log("collectInfo.id", collectInfo.id);
        console.log("user.id", user.id);
        const response = await api.patch(
          `/users/${user.id}/coleta/${collectInfo.id}/score`,
          objToBack
        );
        showMessage({
          message: "Coleta avaliada com sucesso!",
          type: "success",
          icon: "success",
        });
        setValue("R$0,00");
        navigation.navigate("Home");
        modalRef.current.close();
      } catch (err) {
        if (err.response.data.error == "Saldo insuficiente") {
          showMessage({
            message: "Saldo insuficiente",
            description: "Adicione créditos à conta agora",
            type: "danger",
            icon: "danger",
          });
          setLoadingConfirm(false);
          navigation.navigate("Add Credits Finish Screen");
          pendentRate();
        } else {
          showMessage({
            message: "Não foi possível avaliar a coleta",
            type: "danger",
            icon: "danger",
          });
          console.log(err.response.data);
          setValue("R$0,00");
          navigation.navigate("Home");
          modalRef.current.close();
          setLoadingConfirm(false);
        }
      }
    }
    setLoadingConfirm(false);
  }

  const modalValue = useRef(null);
  const openValuesModal = () => modalValue.current?.open();

  return (
    <>
      <Modalize ref={modalRef} adjustToContentHeight={true}>
        <ScrollView contentContainerStyle={styles.backgroud}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text style={styles.discriptionText}>
                Avalie a coleta realizada por{" "}
                {collectInfo?.catador?.user?.name.split(" ")[0]}
              </Text>
              <View>
                <Text style={styles.textAboutCollect}>
                  {formatDate(collectInfo?.date)} - {collectInfo?.horario}
                </Text>
                <Text style={styles.textAboutCollect}>
                  {collectInfo?.address}, {collectInfo?.number}
                </Text>
              </View>
              <View style={{ marginTop: 30 }}>
                {collectInfo?.catador?.img_url ? (
                  <Image
                    source={{
                      uri: collectInfo?.catador?.img_url,
                    }}
                    style={{
                      height: 75,
                      width: 75,
                      borderRadius: 200,
                    }}
                  />
                ) : (
                  <UserAvatar
                    size={75}
                    style={{
                      height: 75,
                      width: 75,
                    }}
                    name={collectInfo?.catador?.user?.name.split("")[0]}
                    bgColor={colors.primary}
                    textColor={colors.background}
                  />
                )}
              </View>

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

            <View style={styles.divisor} />

            <View
              style={{
                alignItems: "center",
                height: screenHeight * 0.38,
              }}
            >
              <Text style={styles.discriptionText}>
                Agradeça a coleta com uma gorjeta
              </Text>

              <View
                style={{
                  marginTop: 10,
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
                false
                  ? styles.containerFinishNotAvailable
                  : styles.containerFinish
              }
              disabled={false}
              onPress={() => rateCollect()}
            >
              {loadingConfirm ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.textFinish}>AVALIAR</Text>
              )}
            </TouchableOpacity>
          </KeyboardAvoidingView>
          <DonationValueModal
            value={value}
            setValue={setValue}
            modalRef={modalValue}
          />
        </ScrollView>
      </Modalize>
    </>
  );
}

const styles = StyleSheet.create({
  backgroud: {
    marginBottom: 0,
    alignItems: "center",
    justifyContent: "center",
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
    width: screenWidth * 0.6,
    fontSize: 22,
    textAlign: "center",
    color: colors.font,
    marginTop: 15,
    marginVertical: 10,
  },
  textAboutCollect: {
    fontSize: 18,
    textAlign: "center",
    color: colors.font + "aa",
  },
  divisor: {
    height: 1,
    width: screenWidth * 0.9,
    alignSelf: "center",
    marginVertical: 6,
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
  containerFinishNotAvailable: {
    borderRadius: 5,
    width: screenWidth * 0.8876,
    height: 50,
    backgroundColor: colors.inputText + "aa",
    justifyContent: "center",
    alignItems: "center",

    marginBottom: screenHeight * 0.022,
    alignSelf: "center",
  },
  textFinish: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  containerFinish: {
    borderRadius: 5,
    width: screenWidth * 0.8876,
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",

    marginBottom: screenHeight * 0.022,
    alignSelf: "center",
  },
});
