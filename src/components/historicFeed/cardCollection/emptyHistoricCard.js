import React from "react";
import { View, StyleSheet, Text } from "react-native";

import { screenHeight, screenWidth } from "../../../constants/dimensions";
import { colors } from "../../../constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function EmptyHistoricCard({ title, subTitle }) {
  return (
    <View style={styles.cardContainer}>
      <View>
        {title ? (
          <>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subTitle}>{subTitle}</Text>
          </>
        ) : (
          <>
            <Text style={styles.title}>Histórico de coletas vazio</Text>
            <Text style={styles.subTitle}>Faça agora sua primeira coleta</Text>
          </>
        )}
      </View>
      <MaterialCommunityIcons
        name="folder-open"
        size={32}
        color={colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    minHeight: 80,
    width: screenWidth * 0.893,
    flexDirection: "row",
    backgroundColor: colors.primary + 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: screenHeight * 0.02,
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: colors.primary,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.primary,
  },
});
