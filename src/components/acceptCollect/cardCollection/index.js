import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../../constants/theme";
import { format, parseISO } from "date-fns";
import { screenWidth } from "../../../constants/dimensions";

export default function AcceptCollectionCard({
  collectionInformation,
  goToDetails,
}) {
  function formatDate() {
    const parsedISO = parseISO(collectionInformation.date);
    const formated = format(parsedISO, "dd/MM/yyyy");
    return formated;
  }

  console.log(collectionInformation.entregue);

  return (
    <>
      <TouchableOpacity onPress={() => goToDetails(collectionInformation)}>
        <View style={styles.container}>
          <View style={{ width: "80%" }}>
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
            <Text style={styles.status}>
              {collectionInformation.entregue ? "Finalizada" : "Pendente"}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-end",
              width: screenWidth * 0.15,
            }}
          >
            {collectionInformation.gorjeta > 0 ? (
              <Text style={styles.price}>
                R${collectionInformation.gorjeta}
              </Text>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 13,
    minHeight: 80,
    width: screenWidth - 40,
    flexDirection: "row",
    backgroundColor: colors.inputText + 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    marginLeft: 10,
    fontSize: 14,
    maxWidth: 220,
    color: "rgba(56, 65, 55, 0.8)",
  },
  status: {
    marginLeft: 10,
    fontSize: 14,
    maxWidth: 220,
    color: "black",
    fontStyle: "bold",
  },
  completed: {
    fontSize: 14,
    color: colors.primary + 80,
    fontWeight: "800",
  },
  price: {
    fontWeight: "600",
    fontSize: 16,
    color: colors.font,
  },
});
