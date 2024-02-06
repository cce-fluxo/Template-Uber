import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../../../constants/theme";
import { screenHeight } from "../../../../constants/dimensions";
import { screenWidth } from "../../../../constants/dimensions";
import api from "../../../../services/api";
import { SafeAreaView } from "react-native-safe-area-context";
import MainButton from "../../../../components/buttons/MainButton";
import { ScrollView } from "react-native-gesture-handler";
import SalesCard from "../../../../components/salesCard";
import { Formik } from "formik";
import { color } from "react-native-reanimated";
import RoutesCard from "../../../../components/routesCard/routesCard";
import { set } from "date-fns";
import MaterialsCard from "../../../../components/materialsCard/materialsCard";
import { showMessage } from "react-native-flash-message";

export default function salesMaterials({ navigation, route }) {
  const { ecoponto, ecopontoId, data, rotas } = route.params;
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [materiaisVendidos, setMateriaisVendidos] = useState([]);

  objForBack = {
    data: data,
    empresa_id: parseInt(ecopontoId),
    grupos: rotas.map((item) => {
      return { id: item.id };
    }),
    materiaisVendidos: materiaisVendidos,
  };

  const handleSubmit = async () => {
    console.log("objForBack: ", objForBack);
    setLoading(true);
    try {
      const response = await api.post(`/venda/add`, objForBack);
      console.log("response: ", response.data);
      navigation.navigate("Sales");
      showMessage({
        message: "Venda registrada!",
        type: "success",
        icon: "success",
      });
    } catch (err) {
      showMessage({
        message: "Erro ao registrar venda",
        type: "danger",
        icon: "danger",
      });
      console.log(err);
      console.log(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerMenu}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={25} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Venda</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.scrollFeed}>
          <Text style={styles.title}>Rotas a serem registradas:</Text>
          <ScrollView style={styles.scroll}>
            {rotas.map((item) => (
              <RoutesCard data={item} style={styles.card} />
            ))}
          </ScrollView>
        </View>
        <View style={styles.scrollFeed}>
          <Text style={styles.title}>Materiais</Text>
          <ScrollView style={styles.scroll}>
            {materiaisVendidos.length > 0 ? (
              materiaisVendidos.map((item) => (
                <MaterialsCard data={item} style={styles.card} />
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  Nenhum material selecionado
                </Text>
              </View>
            )}
          </ScrollView>

          <Text style={styles.selectedRoutes}>
            {selected.length > 0 ? (
              selected.length + " Rotas selecionadas"
            ) : (
              <Feather name="chevron-down" size={25} style={styles.icon} />
            )}
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          <MainButton
            name="Incluir Material"
            onPress={() =>
              navigation.navigate("Add Materials", {
                setMateriaisVendidos: setMateriaisVendidos,
                materiaisVendidos: materiaisVendidos,
              })
            }
            type="submit"
            negative
          />
          {
            <MainButton
              name="Concluir"
              onPress={handleSubmit}
              loading={loading}
              disabled={materiaisVendidos.length == 0}
            />
          }
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

  scrollFeed: {
    flex: 3,
    gap: 10,
  },
  buttonWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },

  text: {
    fontSize: 14,
    fontWeight: "400",
  },

  icon: {
    alignSelf: "center",
  },
  input: {
    width: screenWidth * 0.8876,
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.01,
    marginVertical: screenHeight * 0.0073,
    fontSize: 16,
    color: colors.font,
  },
  errorInput: {
    width: screenWidth * 0.8876,
    height: 50,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.01,
    marginVertical: screenHeight * 0.0073,
    fontSize: 16,
    color: colors.inputErrorText,
    borderColor: colors.inputErrorBorder,
    borderWidth: 2,
    borderStyle: "solid",
    backgroundColor: colors.inputErrorBackground,
  },
  errorText: {
    color: colors.fontError,
    fontSize: screenHeight * 0.016,
    alignSelf: "center",
  },
  modal: {
    position: "absolute",
    flex: 1,
    backgroundColor: "red",
    zIndex: 1000,
  },
  title: {
    marginTop: screenHeight * 0.02,
  },
  card: {
    backgroundColor: colors.lightPrimary,
    borderColor: colors.lightPrimary,
  },
  selectedCard: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  scroll: {
    maxHeight: screenHeight * 0.22,
  },
  selectedRoutes: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
  button: {
    borderRadius: 5,
    paddingVertical: screenHeight * 0.015,
    paddingHorizontal: screenWidth * 0.07,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    borderRadius: 4,
  },
  textButton: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  buttonNegative: {
    borderRadius: 5,
    paddingVertical: screenHeight * 0.015,
    paddingHorizontal: screenWidth * 0.07,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    borderRadius: 4,
  },
  emptyContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    height: screenHeight * 0.22,
  },
  emptyText: {
    color: colors.inputErrorText,
    fontSize: 16,
    fontWeight: "bold",
  },
});
