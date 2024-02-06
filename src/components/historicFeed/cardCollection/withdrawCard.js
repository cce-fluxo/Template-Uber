import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../../constants/theme";
import { format } from "date-fns";
import { screenWidth } from "../../../constants/dimensions";

export default function WithdrawCard({ collectionInformation, goToDetails }) {
  //var date = new Date(collectionInformation?.date).toLocaleDateString('en-GB');
  var date = format(new Date(collectionInformation?.create_time), "dd/MM/yyyy");
  console.log("collectionInformation", collectionInformation);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.infos}>
          <Text style={styles.title}>
            <Text style={styles.boldTitle}>Valor: </Text>
            R${collectionInformation.valor.toFixed(2)}
          </Text>
          <Text numberOfLines={1} style={styles.title}>
            <Text style={styles.boldTitle}>Chave Pix: </Text>
            {collectionInformation.chave_pix}
          </Text>
        </View>

        <View style={styles.status}>
          <Text style={styles.statusText}>{collectionInformation.status}</Text>

          <Text style={styles.scheduleDate}>{date}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 13,
    minHeight: 80,
    width: screenWidth - 40,
    flexDirection: "row",
    backgroundColor: colors.primary + 40,
    borderRadius: 10,
    alignItems: "center",
  },
  infos: {
    paddingLeft: screenWidth * 0.03,
    width: "60%",
    gap: 3,
  },
  status: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: screenWidth * 0.03,
  },
  statusText: {
    fontSize: 14,
    maxWidth: 220,
    overflow: "hidden",
    flexWrap: "nowrap",
    textAlign: "center",
  },
  title: {
    fontSize: 14,
    maxWidth: 220,
    color: colors.primary,
    overflow: "hidden",
    flexWrap: "nowrap",
  },

  boldTitle: {
    fontSize: 14,
    maxWidth: 220,
    color: colors.primary,
    overflow: "hidden",
    flexWrap: "nowrap",
    fontWeight: "bold",
  },
  scheduleDate: {
    fontSize: 14,
    color: colors.font,
    fontWeight: "800",
  },
  pending: {
    fontWeight: "bold",
    fontSize: 14,
    color: colors.primary + "a9",
  },
  expired: {
    fontWeight: "bold",
    fontSize: 14,
    color: colors.fontError,
  },
  completed: {
    fontWeight: "bold",
    fontSize: 14,
    color: colors.primary,
  },
  canceled: {
    fontWeight: "bold",
    fontSize: 14,
    color: colors.fontError,
  },
});
