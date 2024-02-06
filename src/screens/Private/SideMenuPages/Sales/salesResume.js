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

export default function SalesResume({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [vendas, setVendas] = useState([{ vendas: [] }]);
  const { user } = useAuth();

  const getVendas = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/vendas/catador/${user?.id}`);
      setVendas(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // função que some todos os valores de um arrau de objetos
  const sum = (arr, prop) => {
    if (arr) return arr.reduce((a, b) => a + b[prop], 0);
    else return 0;
  };

  total_vendas = sum(vendas?.vendas, "valor_total").toFixed(2);
  peso_total = sum(vendas?.vendas, "peso_total").toFixed(2);

  useEffect(() => {
    getVendas();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerMenu}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Feather name="menu" size={25} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vendas</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.topPart}>
          <View style={styles.displayContainer}>
            <Text style={styles.text}>Total de Vendas</Text>
            <View style={styles.outline}>
              <Text style={styles.outlineText}>R$ {total_vendas}</Text>
            </View>
          </View>
          <View style={styles.displayContainer}>
            <Text style={styles.text}>Peso Total</Text>
            <View style={styles.outline}>
              <Text style={styles.outlineText}>{peso_total} Kg</Text>
            </View>
          </View>
        </View>
        <View style={styles.scrollFeed}>
          <View style={styles.TextAndRefresh}>
            <Text style={styles.text}>Vendas realizadas:</Text>
            <TouchableOpacity onPress={getVendas}>
              <Feather name="refresh-cw" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.scroll}>
            {loading ? (
              <ActivityIndicator
                size="large"
                color={colors.primary}
                style={{ marginTop: screenHeight * 0.15 }}
              />
            ) : (
              vendas?.vendas
                ?.sort((a, b) => new Date(a.data) - new Date(b.data))
                .map((venda) => (
                  <SalesCard
                    onPress={() =>
                      navigation.navigate("Sales Receipt", {
                        venda: venda,
                      })
                    }
                    data={venda}
                  />
                ))
            )}
          </ScrollView>
          <Feather name="chevron-down" size={25} style={styles.icon} />
        </View>
        <View style={styles.buttonWrapper}>
          <MainButton
            name="Registrar nova venda"
            onPress={() => navigation.navigate("Register Sales")}
          />
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
    flex: 2,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 40,
    justifyContent: "center",
  },
  scrollFeed: {
    flex: 3,
    gap: 10,
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
    flexShrink: 1,
  },
  scroll: {},
  icon: {
    alignSelf: "center",
  },
  TextAndRefresh: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
