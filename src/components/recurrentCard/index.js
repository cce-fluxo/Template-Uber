import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { screenHeight, screenWidth } from "../../constants/dimensions";
import { colors } from "../../constants/theme";

export default function RecurrentCard({ collectionInformation, navigation }) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("User Recurrent Collect Details", {
          itemInformation: collectionInformation,
          previousCalendar: true,
          previousHistoric: false,
        });
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>
          {collectionInformation.address}
          {", "}
          {collectionInformation.number}
          {", "}
          {collectionInformation.complement}

          {"\n"}
          {collectionInformation.neighbourhood}
          {", "}
          {collectionInformation.cep}
        </Text>
        <Text style={styles.horario}>{collectionInformation.hour}</Text>

        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "center",
            position: "absolute",
            width: "25%",
            left: "72%",
          }}
        ></View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    minHeight: 80,
    width: screenWidth - 100,
    flexDirection: "row",
    backgroundColor: colors.primary + 40,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 7,
    paddingVertical: 7,
    paddingLeft: 5,
    justifyContent: "space-between",
  },

  title: {
    marginLeft: 10,
    fontSize: 14,
    maxWidth: "60%",
    color: colors.font,
  },
  horario: {
    marginRight: 20,
    fontSize: 18,
    maxWidth: "60%",
    color: colors.font,
  },

  pending: {
    fontWeight: "bold",
    fontSize: 14,
    color: colors.font + "80",
  },
  accepted: {
    fontWeight: "bold",
    fontSize: 14,
    color: colors.font,
  },
  completed: {
    fontWeight: "bold",
    fontSize: screenWidth * 0.035,
    color: colors.primary,
  },
});
