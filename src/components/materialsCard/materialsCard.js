import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function MaterialsCard({ data }) {
  if (data)
    return (
      <View style={styles.container}>
        <View style={styles.leftBlock}>
          <Text style={styles.title}>
            {data?.material?.name ? data?.material?.name : data?.nome_material}
          </Text>
          <Text style={styles.subtitle}>{data?.kg} Kg</Text>
        </View>
        <View style={styles.rightBlock}>
          <Text style={styles.subtitle}>Valor por Kg: {data?.valor_kg}</Text>
          <Text style={styles.title}>
            R$ {(parseFloat(data?.valor_kg) * parseFloat(data?.kg))?.toFixed(2)}
          </Text>
        </View>
      </View>
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
