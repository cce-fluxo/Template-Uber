import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function RoutesCard({ onPress, data, style }) {
  function formatarDataParaDDMMYYYY(data) {
    // Verifica se a entrada é uma string ou um objeto Date
    if (!(data instanceof Date)) {
      data = new Date(data);
    }

    // Obtém o dia, mês e ano
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0"); // Note que os meses são indexados a partir de zero (janeiro é 0)
    const ano = data.getFullYear();

    // Concatena os componentes formatados
    const dataFormatada = `${dia}/${mes}/${ano}`;
    return dataFormatada;
  }

  nome_rota = data?.bairros?.join(" - ");
  data_formatada = formatarDataParaDDMMYYYY(data?.date);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <View style={styles.leftBlock}>
        <Text style={styles.title}>{nome_rota}</Text>
        <Text style={styles.subtitle}>
          {data?.coletas?.length}{" "}
          {data?.coletas?.length > 1 ? "coletas" : "coleta"}
        </Text>
      </View>
      <View style={styles.rightBlock}>
        <Text style={styles.title}>{data_formatada}</Text>
        <Text style={styles.subtitle}>Id: {data?.id}</Text>
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
    maxWidth: "70%",
  },
  rightBlock: {
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
  },
});
