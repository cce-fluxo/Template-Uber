import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../../constants/theme";
import { format } from "date-fns";
import { screenWidth } from "../../../constants/dimensions";
import { de } from "date-fns/locale";
import { useAuth } from "../../../context/auth";
import { AntDesign, Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TransactionCard({
  collectionInformation,
  goToDetails,
}) {
  var mes = new Date(collectionInformation?.create_time).toLocaleDateString(
    "pt-BR",
    { month: "long" }
  );
  var date = format(new Date(collectionInformation?.create_time), "dd");
  const { user } = useAuth();

  return (
    <>
      {/* <View style={styles.saldoContainer}>
        <Text style={styles.saldo}> Saldo: R$ {user?.saldo?.toFixed(2)}</Text>
      </View> */}
      <TouchableOpacity
        onPress={() => {
          return;
        }}
      >
        <View style={styles.container}>
          <View style={styles.icon}>
            {["Fundos adicionados"].includes(collectionInformation?.type) ? (
              <MaterialCommunityIcons
                name="cash-plus"
                color={colors.primary}
                size={40}
              />
            ) : ["Gorjeta"].includes(collectionInformation?.type) ? (
              user.tipo == "catador" ? (
                <MaterialCommunityIcons
                  name="cash-plus"
                  color={colors.primary}
                  size={40}
                />
              ) : (
                <MaterialCommunityIcons
                  name="cash-minus"
                  color={colors.primary}
                  size={40}
                />
              )
            ) : (
              <MaterialCommunityIcons
                name="cash-refund"
                color={colors.primary}
                size={40}
              />
            )}
          </View>
          <View style={styles.leftContainer}>
            <View style={styles.typeAndDate}>
              <Text style={styles.title}>{collectionInformation?.type}</Text>
            </View>

            {
              <Text style={styles.value}>
                {/* {["Saque realizado", "Fundos adicionados"].includes(
                  collectionInformation?.type
                )
                  ? "+ "
                  : ["Gorjeta"].includes(collectionInformation?.type)
                  ? user.type == "catador"
                    ? "+ "
                    : "- "
                  : ""} */}
                R${collectionInformation?.valor?.toFixed(2)}
              </Text>
            }
          </View>

          <View style={styles.rightContainer}>
            <Text style={styles.scheduleDate}>
              {date + " " + mes.toLocaleUpperCase()}
            </Text>
            <Text style={styles.saldo}>Saldo:</Text>
            <Text style={styles.saldo}>
              {collectionInformation?.type == "Gorjeta"
                ? user.tipo == "catador"
                  ? "R$ " +
                    collectionInformation?.saldo_destinatario?.toFixed(2)
                  : "R$ " + collectionInformation?.saldo_remetente?.toFixed(2)
                : "R$ " + collectionInformation?.saldo_remetente?.toFixed(2)}
            </Text>

            {/* <View style={styles.icons}>
              <Feather name="dollar-sign" size={30} color={colors.primary} />
              {["Inclusão de Créditos", "Saque"].includes(
                collectionInformation?.type
              ) ? (
                <Feather name="chevron-up" size={20} color={colors.primary} />
              ) : ["Gorjeta"].includes(collectionInformation?.type) ? (
                <Feather name="chevron-down" size={20} color={colors.primary} />
              ) : (
                ""
              )}
            </View> */}
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  saldoContainer: {
    width: screenWidth - 40,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingVertical: 10,
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  saldo: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: "bold",
  },
  container: {
    marginTop: 13,
    minHeight: 80,
    width: screenWidth - 40,
    flexDirection: "row",
    backgroundColor: colors.primary + 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  typeAndDate: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  rightContainer: {
    width: "35%",
    alignItems: "flex-end",
  },
  leftContainer: {
    width: "45%",
    flexWrap: "wrap",
    gap: 3,
    paddingLeft: 10,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 15,
    maxWidth: 220,
    fontWeight: "bold",
    color: colors.primary,
  },
  value: {
    fontSize: 20,
    maxWidth: 220,
    color: colors.darkPrimary,
  },
  scheduleDate: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "800",
  },
  saldo: {
    fontSize: 14,
    color: colors.font,
    fontWeight: "500",
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
  icons: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: -6,
  },
});
