import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../../../constants/theme";
import { screenHeight } from "../../../../constants/dimensions";
import { screenWidth } from "../../../../constants/dimensions";
import api from "../../../../services/api";
import { useAuth } from "../../../../context/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import MainButton from "../../../../components/buttons/MainButton";
import { ScrollView } from "react-native-gesture-handler";
import SalesCard from "../../../../components/salesCard";
import SelectInputModal from "../../../../components/modals/selectInputModal";
import MaterialsCard from "../../../../components/materialsCard/materialsCard";

export default function SalesReceipt({ navigation, route }) {
  const { venda } = route.params;
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerMenu}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={25} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recibo de Vendas</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.titlesContainer}>
          <Text style={styles.vendaText}>
            Venda {String(venda?.id).padStart(3, "0")}
          </Text>
          <Text style={styles.ecopontoText}>{venda?.empresa?.name}</Text>
          <View style={styles.topPart}>
            <View style={styles.displayContainer}>
              <Text style={styles.text}>Valor da Venda</Text>
              <View style={styles.outline}>
                <Text style={styles.outlineText}>
                  R$ {venda.valor_total.toFixed(2)}
                </Text>
              </View>
            </View>
            <View style={styles.displayContainer}>
              <Text style={styles.text}>Peso Total</Text>
              <View style={styles.outline}>
                <Text style={styles.outlineText}>{venda.peso_total} Kg</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.scrollFeed}>
          <Text style={styles.text}>Vendas realizadas:</Text>
          <ScrollView style={styles.scroll}>
            {venda.materiaisVendidos.map((item) => (
              <MaterialsCard data={item} style={styles.card} />
            ))}
          </ScrollView>
          <Feather name="chevron-down" size={25} style={styles.icon} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerMenu: {
    height: 50,
    paddingLeft: 20,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: "400",
    textAlign: "center",
    position: "absolute",
    left: "20.5%",
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: screenWidth * 0.05,
  },
  topPart: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 40,
    justifyContent: "center",
    marginTop: 20,
  },
  scrollFeed: {
    flex: 2.5,
    gap: 10,
    marginBottom: screenHeight * 0.1,
  },
  buttonWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  displayContainer: {
    gap: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
  },
  outlineText: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.primary,
  },
  outline: {
    borderColor: colors.primary,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  scroll: {},
  icon: {
    alignSelf: "center",
  },
  vendaText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
    marginTop: 20,
  },
  ecopontoText: {
    fontSize: 24,
    fontWeight: "700",
  },
  titlesContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 20,
    flex: 2,
  },
});
