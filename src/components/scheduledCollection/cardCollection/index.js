import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../../constants/theme";
import { format } from "date-fns";
import { screenWidth } from "../../../constants/dimensions";

export default function CatadorCollectionCard({
  collectionInformation,
  goToDetails,
  refreshLoad,
}) {
  var date = format(new Date(collectionInformation.date), "dd/MM/yyyy");

  const formatNeighborhoods = (bairrosList) => {
    if (bairrosList !== undefined) return bairrosList.join(", ");
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => !refreshLoad && goToDetails(collectionInformation)}
      >
        <View style={styles.container}>
          <View style={{ paddingLeft: 20, marginVertical: 10 }}>
            <Text style={styles.bairro}>
              {formatNeighborhoods(collectionInformation.bairros)}
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
            {/* <Text style={styles.price}>
              R${collectionInformation.valor.toFixed(2)}
            </Text> */}

            {collectionInformation.entregue == true ? (
              <Text style={styles.completed}>Finalizada</Text>
            ) : (
              <>
                <Text style={styles.scheduleDate}>{date}</Text>
                <Text style={styles.scheduleDate}>
                  {collectionInformation.horario}
                </Text>
              </>
            )}
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
    backgroundColor: colors.primary + 20,
    borderRadius: 10,
    alignItems: "center",
  },
  bairro: {
    fontSize: 16,
    color: colors.font,
    minWidth: "80%",
    maxWidth: "90%",
  },
  quatity: {
    fontSize: 14,
    color: colors.font,
  },
  title: {
    marginLeft: 10,
    fontSize: 14,
    maxWidth: 220,
    color: "rgba(56, 65, 55, 0.8)",
  },
  scheduleDate: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "800",
  },
  completed: {
    fontSize: 14,
    color: colors.primary + 80,
    fontWeight: "800",
  },
  price: {
    fontWeight: "600",
    fontSize: 14,
    color: colors.primary,
  },
});
