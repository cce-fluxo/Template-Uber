import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { screenHeight, screenWidth } from "../../constants/dimensions";
import { colors } from "../../constants/theme";

export default function SalesCard({ onPress, data, style }) {
  const date = new Date(data.data);
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = date.toLocaleDateString("pt-BR", { month: "long" });
  const mesMaisculo = mes.charAt(0).toUpperCase() + mes.slice(1);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <View style={styles.leftBlock}>
        <Text style={styles.title}>{dia + " " + mesMaisculo}</Text>
        <Text style={styles.subtitle}>{data?.empresa?.name}</Text>
      </View>
      <View style={styles.rightBlock}>
        <Text style={styles.subtitle}>
          id: {String(data.id).padStart(3, "0")}
        </Text>
        <Text style={styles.title}>R$ {data?.valor_total?.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#F4F4F4",
    borderColor: "#BBBBBB",
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 8,
  },
  leftBlock: {
    justifyContent: "center",
    gap: 5,
  },
  rightBlock: {
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
  },
});
