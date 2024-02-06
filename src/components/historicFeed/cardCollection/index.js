import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../../constants/theme";
import { format } from "date-fns";

import { screenWidth } from "../../../constants/dimensions";

export default function CatadorHistoricCard({
  collectionInformation,
  goToDetails,
}) {
  var date = format(new Date(collectionInformation.date), "dd/MM/yyyy");

  const goTo = () => {
    goToDetails(collectionInformation);
  };

  const formatNeighborhoods = (bairrosList) => {
    if (bairrosList !== undefined) return bairrosList.join(", ");
  };

  return (
    <>
      <TouchableOpacity onPress={() => goTo()}>
        {collectionInformation.checkin == true ? (
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

            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                left: "70%",
                position: "absolute",
              }}
            >
              {collectionInformation.cancelada === true ? (
                <Text style={styles.canceled}>Cancelada</Text>
              ) : collectionInformation.catador === null ? (
                <Text style={styles.expired}>Expirada</Text>
              ) : collectionInformation.entregue == true ? (
                <Text style={styles.completed}>Finalizada</Text>
              ) : (
                <Text style={styles.pending}>Pendente</Text>
              )}

              {/* <Text style={styles.price}>
            R${collectionInformation.valor.toFixed(2)}
          </Text> */}

              {collectionInformation.entregue == true ? (
                <>
                  <Text style={styles.scheduleDate}>{date}</Text>
                </>
              ) : (
                <>
                  <Text style={styles.scheduleDate}>{date}</Text>
                </>
              )}
            </View>
          </View>
        ) : (
          <View style={styles.container}>
            <View style={styles.detailsBox}>
              <Text style={styles.bairro}>
                {formatNeighborhoods(collectionInformation?.bairros)}
              </Text>

              {collectionInformation?.coletas.length > 1 ? (
                <Text style={styles.quatity}>
                  {collectionInformation?.coletas.length} coletas
                </Text>
              ) : (
                <Text style={styles.quatity}>1 coleta</Text>
              )}
            </View>

            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                left: "70%",
                position: "absolute",
              }}
            >
              {/* {collectionInformation.cancelada === true ? (
                <Text style={styles.canceled}>Cancelada</Text>
              ) : collectionInformation.catador === null ? (
                <Text style={styles.expired}>Expirada</Text>
              ) : collectionInformation.entregue == true ? (
                <Text style={styles.completed}>Finalizada</Text>
              ) : (
                <Text style={styles.pending}>Pendente</Text>
              )} */}
              {/* <Text style={styles.price}>
            R${collectionInformation.valor.toFixed(2)}
          </Text> */}
              <Text style={styles.scheduleDate}>{date}</Text>
              <Text style={styles.scheduleDate}>
                {collectionInformation?.horario}
              </Text>
            </View>
          </View>
        )}
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
    backgroundColor: colors.primary + 40,
    borderRadius: 10,
    alignItems: "center",
  },

  title: {
    marginLeft: 10,
    fontSize: 14,
    maxWidth: 220,
    color: colors.primary,
  },
  scheduleDate: {
    fontSize: 14,
    color: colors.font,
    fontWeight: "800",
  },
  pending: {
    fontWeight: "bold",
    fontSize: 14,
    color: colors.inputText,
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
  quatity: {
    fontSize: 14,
    color: colors.font,
  },
  bairro: {
    fontSize: 18,
    color: colors.font,
    minWidth: "80%",
    maxWidth: "90%",
  },
  detailsBox: {
    marginLeft: 20,
  },
});
