import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import { colors } from "../../../../constants/theme";
import { screenHeight, screenWidth } from "../../../../constants/dimensions";
import ListResumeList from "../../../../components/resumeList/listResumeList";
import { Feather } from "@expo/vector-icons";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AcceptCollectDetailsScreen({ navigation, route }) {
  const { itemInformation } = route.params;
  console.log("itemInformation", itemInformation);

  function formatDate(date) {
    const newDate = new Date(date);
    const formated = format(newDate, "dd MMMM", { locale: ptBR });
    const day = formated.split(" ")[0];
    let month = formated
      .split(" ")[1]
      .replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());

    return day + " " + month;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={styles.headerMenu}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Feather name="arrow-left" size={25} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detalhes da coleta</Text>
        </View>

        <View style={styles.background}>
          <View style={styles.informationContainer}>
            <View style={{ width: "80%" }}>
              <Text style={styles.date}>
                {formatDate(itemInformation?.date)}
              </Text>
              <Text style={styles.hour}>{itemInformation?.horario}</Text>
            </View>
            {/* <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.price}>R$ {itemInformation.valor}</Text>
            </View> */}
          </View>
          {itemInformation?.catador == null ? null : (
            <>
              <Text style={styles.boxTitle}>Nome do usuário</Text>
              <View style={styles.box}>
                <Text style={styles.boxText}>
                  {itemInformation?.user_comum.user.name}
                </Text>
              </View>
            </>
          )}

          <Text style={styles.subTitle}>Local da coleta</Text>
          <View style={styles.box}>
            <Text style={styles.boxText}>
              {itemInformation?.address}, {itemInformation?.number},{" "}
              {itemInformation?.complement}
            </Text>
            <Text style={styles.boxText}>
              {itemInformation?.neighbourhood}, {itemInformation?.cep}
            </Text>
            <Text style={styles.boxText}>
              {itemInformation?.city} - {itemInformation?.state}
            </Text>
          </View>

          <ListResumeList cartList={itemInformation?.sacolas} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    marginBottom: 50,
    flex: 1,
    justifyContent: "flex-end",
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
    paddingLeft: "17%",
  },
  box: {
    flexDirection: "column",
    width: screenWidth * 0.8876,
    paddingVertical: 10,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.026,
    marginVertical: screenHeight * 0.0063,
    fontSize: screenHeight * 0.02,
    color: colors.font + "cf",
    marginBottom: screenHeight * 0.018,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
  },
  boxTitle: {
    paddingLeft: screenWidth * 0.079,
    color: colors.primary,
    fontSize: screenHeight * 0.022,
    alignSelf: "flex-start",
  },
  boxText: {
    color: colors.font + "cf",
    width: screenWidth * 0.739,
  },

  date: {
    color: colors.font,
    fontSize: 20,
    fontWeight: "500",
    textAlign: "left",
    paddingLeft: screenWidth * 0.05,
  },
  hour: {
    color: colors.font,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "left",
    paddingLeft: screenWidth * 0.05,
  },
  price: {
    color: colors.font,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "right",
  },
  informationContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 20,
    marginBottom: 20,
  },
  subTitle: {
    color: colors.font,
    fontSize: 16,
    paddingLeft: 20,
  },
});
