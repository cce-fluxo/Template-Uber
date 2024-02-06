import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import * as yup from "yup";
import { Keyboard } from "react-native";
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
import SelectInputModal from "../../../../components/modals/selectInputModal";
import CalendarModal from "../../../../components/modals/calendarModal";
import { color } from "react-native-reanimated";
import RoutesCard from "../../../../components/routesCard/routesCard";
import { set } from "date-fns";
import { useAuth } from "../../../../context/auth";

export default function RegisterSales({ navigation }) {
  const [loadingRotas, setLoadingRotas] = useState(false);
  const [loadingEcopontos, setLoadingEcopontos] = useState(false);
  const [ecopontos, setEcopontos] = useState([]);
  const [ecopontoId, setEcopontoId] = useState("");
  const [Routes, setRoutes] = useState([]);
  const [selected, setSelected] = useState([]);
  const [errorRotas, setErrorRotas] = useState(false);
  const optionsModalRef = useRef(null);
  const calendarModalRef = useRef(null);
  const openOptionsModal = (optionsModalRef) => optionsModalRef.current?.open();
  const { user } = useAuth();

  validationSchema = yup.object().shape({
    ecoponto: yup
      .string()
      .matches(/\w/, "Escolha um Ecoponto")
      .required("A escolha de um Ecoponto é obrigatória"),
    data: yup
      .string()
      .matches(/\w/, "Selecione uma data")
      .required("A escolha de uma data é obrigatória"),
  });

  const listaObjetos = [
    {
      data: "2023-06-29",
      id: 1,
      nome: "Rota 1",
      numeroDeColetas: 3,
    },
    {
      data: "2023-06-28",
      id: 2,
      nome: "Rota 2",
      numeroDeColetas: 5,
    },
    {
      data: "2023-06-27",
      id: 3,
      nome: "Rota 3",
      numeroDeColetas: 2,
    },
    {
      data: "2023-06-26",
      id: 4,
      nome: "Rota 4",
      numeroDeColetas: 7,
    },
    {
      data: "2023-06-25",
      id: 5,
      nome: "Rota 5",
      numeroDeColetas: 4,
    },
  ];

  getRotas = async () => {
    try {
      setLoadingRotas(true);
      const response = await api.get(
        `grupos?filter=catador_id;eq;${user.id}&filter=entregue;eq;true&filter=venda_id;eq;null`
      );
      setRoutes(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      showMessage({
        message: "Erro ao carregar rotas",
        type: "danger",
      });
    } finally {
      setLoadingRotas(false);
    }
  };

  const getEcopontos = async () => {
    setLoadingEcopontos(true);
    try {
      const response = await api.get("/empresa/list");
      setEcopontos(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingEcopontos(false);
    }
  };

  useEffect(() => {
    getEcopontos();
    getRotas();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          ecoponto: "",
          data: "",
        }}
        onSubmit={(values) => {
          if (!selected.length) {
            setErrorRotas(true);
            return;
          }
          navigation.navigate("Sales Materials", {
            ecoponto: values.ecoponto,
            ecopontoId: ecopontoId,
            data: values.data,
            rotas: selected,
          });
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
          touched,
        }) => (
          <>
            <View style={styles.headerMenu}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Feather name="arrow-left" size={25} color={colors.primary} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Registrar Venda</Text>
            </View>
            <View style={styles.mainContainer}>
              <View style={styles.topPart}>
                <View>
                  <Text style={styles.title}>Ecoponto</Text>
                  <TextInput
                    style={
                      errors.ecoponto && touched.ecoponto
                        ? styles.errorInput
                        : styles.input
                    }
                    name="ecoponto"
                    autoCapitalize="none"
                    placeholder="Selecione um Ecoponto"
                    showSoftInputOnFocus={false}
                    onBlur={handleBlur("ecoponto")}
                    value={values?.ecoponto}
                    onFocus={() => {
                      Keyboard.dismiss();
                      openOptionsModal(optionsModalRef);
                    }}
                  />
                  {errors.ecoponto && touched.ecoponto && (
                    <Text style={styles.errorText}>{errors.ecoponto}</Text>
                  )}
                  <Text style={styles.title}>Data</Text>
                  <TextInput
                    style={
                      errors.data && touched.data
                        ? styles.errorInput
                        : styles.input
                    }
                    name="data"
                    autoCapitalize="none"
                    placeholder="Selecione um data"
                    showSoftInputOnFocus={false}
                    onBlur={handleBlur("data")}
                    value={values.data ? values.data : ""}
                    onFocus={() => {
                      Keyboard.dismiss();
                      openOptionsModal(calendarModalRef);
                    }}
                  />
                  {errors.data && touched.data && (
                    <Text style={styles.errorText}>{errors.data}</Text>
                  )}
                </View>
              </View>
              <View style={styles.scrollFeed}>
                <Text style={styles.title}>Rotas a serem registradas:</Text>
                <ScrollView style={styles.scroll}>
                  {loadingRotas ? (
                    <View style={{ marginTop: screenHeight * 0.13 }}>
                      <ActivityIndicator size="large" color={colors.primary} />
                    </View>
                  ) : (
                    Routes.map((item) => (
                      <RoutesCard
                        key={item.id}
                        data={item}
                        style={[
                          styles.card,
                          selected.some((rota) => rota.id === item.id) &&
                            styles.selectedCard,
                        ]}
                        onPress={() => {
                          setErrorRotas(false);
                          if (selected.some((rota) => rota.id === item.id)) {
                            setSelected(
                              selected.filter((rota) => rota.id !== item.id)
                            );
                          } else {
                            setSelected([...selected, item]);
                          }
                        }}
                      />
                    ))
                  )}
                </ScrollView>
                {errorRotas && (
                  <Text style={styles.errorText}>
                    Selecione uma rota para continuar
                  </Text>
                )}
                <Text style={styles.selectedRoutes}>
                  {selected.length > 0 ? (
                    selected.length + " Rotas selecionadas"
                  ) : (
                    <Feather
                      name="chevron-down"
                      size={25}
                      style={styles.icon}
                    />
                  )}
                </Text>
              </View>
              <View style={styles.buttonWrapper}>
                <MainButton
                  name="Prosseguir"
                  // disabled={!isValid && !selected.length && !data.length && !ecoponto}
                  type="submit"
                  onPress={handleSubmit}
                />
              </View>
              <SelectInputModal
                modalRef={optionsModalRef}
                handleChange={handleChange}
                data={ecopontos}
                title="Selecione um Ecoponto"
                name="ecoponto"
                loading={loadingEcopontos}
                setData={setEcopontoId}
                emptyText="Nenhum Ecoponto disponível"
              />
              <CalendarModal
                modalRef={calendarModalRef}
                handleChange={handleChange}
                value={values?.data}
                title=""
              />
            </View>
          </>
        )}
      </Formik>
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
    maxHeight: screenHeight * 0.3,
  },
  selectedRoutes: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
