import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import { format, parseISO } from "date-fns";
import { showMessage } from "react-native-flash-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import { colors } from "../../../../constants/theme";
import { useAuth } from "../../../../context/auth";
import { screenHeight, screenWidth } from "../../../../constants/dimensions";
import ListResumeList from "../../../../components/resumeList/listResumeList";

import InsertCupomModal from "../../../../components/modals/insertCupomModal";
import AddressOptionsModal from "../../../../components/modals/addressOptionsModal";
import InsertAddressModal from "../../../../components/modals/insertAddressModal";
import SelectDateModal from "../../../../components/modals/selectDateModal";
import api from "../../../../services/api";

export default function ConfirmCollectScreen({
  navigation,
  isRecurrent = false,
}) {
  const [bairros, setBairros] = useState([]);
  console.log(isRecurrent);

  // function bairrosDate(address, list) {
  //   let dates = [];
  //   if (JSON.stringify(address) != '{}') {
  //     list.map(e => {
  //       if (e.bairro.toLowerCase() == address.neighbourhood.toLowerCase()) {
  //         dates = e.dates;
  //       }
  //     });
  //   }
  //   return dates;
  // }

  // Auth
  const { user } = useAuth();

  // Navigation
  //const { cartList } = route.params;

  // Local Storage
  const [collectHour, setCollectHour] = useState(null);
  const [collectDate, setCollectDate] = useState(null);
  const [timePicker, setTimePicker] = useState();
  const [loading, setLoading] = useState(false);
  const [recurrent, setRecurrent] = useState(false);

  const [collectAddress, setCollectAddress] = useState({});

  function selectDayHour(day, hour) {
    setrecurrentDay(day);
    setRecurrentHour(hour);
  }

  const [recurrentDay, setrecurrentDay] = useState(null);
  const [recurrentHour, setRecurrentHour] = useState(null);

  let collectionCartInfo = {
    img_url: "fluxo.webp",
    date: collectDate,
    horario: collectHour,
  };

  // Modal Refs
  const optionsModalRef = useRef(null);
  const addressModalRef = useRef(null);
  const dateModalRef = useRef(null);

  const [cupom, setCupom] = useState("");

  const cupomModalRef = useRef(null);
  const openCupomModal = () => cupomModalRef.current?.open();

  const openOptionsModal = (optionsModalRef) => optionsModalRef.current?.open();
  const openInsertModal = (addressModalRef) => addressModalRef.current?.open();

  function selectDateHour(date, hour) {
    setCollectDate(date);
    setCollectHour(hour);
  }

  function formatDate(date) {
    const parsedISO = parseISO(date);
    const formated = format(parsedISO, "dd/MM/yyyy");
    return formated;
  }

  // const merginObject = (formatedCartList) => {
  //   Object.assign(collectionCartInfo, collectAddress);
  //   collectionCartInfo.date = collectDate;
  //   collectionCartInfo.cupom = cupom;
  //   let completedCartList = formatedCartList.concat(collectionCartInfo);
  //   return completedCartList;
  // };

  // const removeItemPriceFromCartList = () => {
  //   let newCartList = [];
  //   cartList.map((e) => {
  //     const id = e.id;
  //     const mat = e.mat;
  //     const quantity = e.quantity;
  //     const size = e.size;
  //     const newItem = { id, mat, quantity, size };
  //     newCartList.push(newItem);
  //   });
  //   return newCartList;
  // };

  // async function requestCart(completedCart) {
  //   try {
  //     let response = await api.post(`/users/${user.id}/coleta`, completedCart);
  //     showMessage({
  //       message: "Coleta agendada com sucesso!",
  //       type: "success",
  //       icon: "success",
  //     });
  //     navigation.popToTop();
  //     navigation.navigate("Home");
  //   } catch (err) {
  //     showMessage({
  //       message: "Erro ao criar coleta",
  //       description: err.response?.data?.msg,
  //       type: "danger",
  //       icon: "danger",
  //     });
  //     console.log("erro:", err);
  //     setLoading(false);
  //   }
  // }

  // function sendCart() {
  //   if (JSON.stringify(collectAddress) === JSON.stringify({})) {
  //     showMessage({
  //       message: "Endereço de coleta não escolhido",
  //       type: "danger",
  //       icon: "danger",
  //     });
  //   } else if (collectionCartInfo.date == undefined) {
  //     showMessage({
  //       message: "Data de coleta não escolhida",
  //       type: "danger",
  //       icon: "danger",
  //     });
  //   } else if (collectionCartInfo.horario == undefined) {
  //     showMessage({
  //       message: "Horário de coleta não escolhida",
  //       type: "danger",
  //       icon: "danger",
  //     });
  //   } else {
  //     setLoading(true);
  //     const formatedCartList = removeItemPriceFromCartList();
  //     const completedCart = merginObject(formatedCartList);
  //     console.log("List for back:", completedCart);
  //     requestCart(completedCart);
  //     setLoading(false);
  //   }
  // }

  async function requestDates() {
    setLoading(true);
    try {
      let response = await api.post(`/horarios/semanais/get`, {
        city: collectAddress.city,
        neighbourhood: collectAddress.neighbourhood,
        state: collectAddress.state,
      });

      setBairros(response.data[0].dates);
    } catch (err) {
      console.log("erro:", err);
    }
    setLoading(false);
  }

  const handleContinue = () => {
    if (JSON.stringify(collectAddress) === JSON.stringify({})) {
      showMessage({
        message: "Endereço de coleta não escolhido",
        type: "danger",
        icon: "danger",
      });
    } else if (recurrent) {
      if (recurrentDay == undefined) {
        showMessage({
          message: "Dia da coleta não escolhida",
          type: "danger",
          icon: "danger",
        });
      } else if (recurrentHour == undefined) {
        showMessage({
          message: "Horário da coleta não escolhida",
          type: "danger",
          icon: "danger",
        });
      } else {
        navigation.navigate("Cart Screen", {
          collectAddress,
          collectionCartInfo,
          collectDate,
          cupom,
          recurrent,
          recurrentDay,
          recurrentHour,
        });
      }
    } else {
      if (collectionCartInfo.date == undefined) {
        showMessage({
          message: "Data de coleta não escolhida",
          type: "danger",
          icon: "danger",
        });
      } else if (collectionCartInfo.horario == undefined) {
        showMessage({
          message: "Horário de coleta não escolhida",
          type: "danger",
          icon: "danger",
        });
      } else {
        navigation.navigate("Cart Screen", {
          collectAddress,
          collectHour,
          collectionCartInfo,
          collectDate,
          cupom,
          recurrent,
          recurrentDay,
          recurrentHour,
        });
      }
    }
  };

  useEffect(() => {
    if (JSON.stringify(collectAddress) != JSON.stringify({})) {
      console.log("vou pegar datas");
      requestDates();
    }
  }, [collectAddress]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerMenu}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Feather name="menu" size={25} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Agendar Coleta</Text>
        <TouchableOpacity onPress={openCupomModal} style={styles.hash}>
          <Feather name="hash" size={25} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.background}>
        <Text style={styles.inputTitle}>Tipo de Coleta</Text>
        <View style={styles.buttonsWrapper}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: !recurrent
                  ? colors.primary + 30
                  : colors.inputBackground,
              },
            ]}
            onPress={() => setRecurrent(false)}
          >
            <Text style={styles.buttonText}>Coleta Pontual</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: recurrent
                  ? colors.primary + 30
                  : colors.inputBackground,
              },
            ]}
            onPress={() => setRecurrent(true)}
          >
            <Text style={styles.buttonText}>Coleta Recorrente</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.inputTitle}>Local da coleta</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => openOptionsModal(optionsModalRef)}
        >
          {JSON.stringify(collectAddress) === JSON.stringify({}) ? (
            <Text style={styles.textInputPlaceHolder}>
              Escolha um endereço de coleta
            </Text>
          ) : (
            <Text style={styles.textInput}>
              {collectAddress?.address}, {collectAddress?.number}
              {collectAddress?.complement
                ? ", " + collectAddress?.complement
                : ""}
            </Text>
          )}
          <Feather name="arrow-right" size={20} color={colors.primary} />
        </TouchableOpacity>

        <Text style={styles.inputTitle}>Data para coleta</Text>

        <TouchableOpacity
          style={styles.input}
          onPress={() => openOptionsModal(dateModalRef)}
          disabled={
            JSON.stringify(collectAddress) === JSON.stringify({}) ? true : false
          }
        >
          {recurrent ? (
            recurrentDay == null && recurrentHour == null ? (
              <Text style={styles.textInputPlaceHolder}>
                Escolha uma data para sua coleta
              </Text>
            ) : (
              <Text style={styles.textInput}>
                {recurrentDay} - {recurrentHour}
              </Text>
            )
          ) : collectDate == null && collectHour == null ? (
            <Text style={styles.textInputPlaceHolder}>
              Escolha uma data para sua coleta
            </Text>
          ) : (
            <Text style={styles.textInput}>
              {formatDate(collectDate)} - {collectHour}
            </Text>
          )}

          {JSON.stringify(collectAddress) === JSON.stringify({}) ? (
            <Feather name="arrow-right" size={20} color={colors.inputText} />
          ) : (
            <Feather name="arrow-right" size={20} color={colors.primary} />
          )}
        </TouchableOpacity>

        {/* <ListResumeList cartList={cartList} /> */}

        <TouchableOpacity
          style={styles.containerContinue}
          onPress={handleContinue}
        >
          <Text style={styles.textContinue}>CONTINUAR</Text>
        </TouchableOpacity>
      </View>

      <AddressOptionsModal
        modalRef={optionsModalRef}
        setCollectAddress={setCollectAddress}
        addressModalRef={addressModalRef}
        openInsertModal={openInsertModal}
      />

      <InsertAddressModal
        modalRef={addressModalRef}
        setCollectAddress={setCollectAddress}
      />

      <SelectDateModal
        modalRef={dateModalRef}
        dates={bairros}
        selectDateHour={recurrent ? selectDayHour : selectDateHour}
        loading={loading}
        recurrent={recurrent}
      />

      <InsertCupomModal setCupom={setCupom} modalRef={cupomModalRef} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    marginBottom: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsWrapper: {
    marginBottom: 0,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: screenWidth * 0.8876,
  },
  headerMenu: {
    height: 50,
    paddingLeft: screenWidth * 0.053,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: screenHeight * 0.02,
  },
  headerTitle: {
    color: colors.primary,
    fontSize: screenHeight * 0.0323,
    fontWeight: "400",
    textAlign: "center",
    position: "absolute",
    left: screenWidth * 0.3,
  },
  hash: {
    position: "absolute",
    right: 20,
  },
  input: {
    flexDirection: "row",
    width: screenWidth * 0.8876,
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.026,
    marginVertical: screenHeight * 0.0073,
    fontSize: screenHeight * 0.02,
    color: colors.font,
    marginBottom: screenHeight * 0.022,
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    width: screenWidth * 0.4176,
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.026,
    marginVertical: screenHeight * 0.0073,
    fontSize: screenHeight * 0.02,
    color: colors.font,
    marginBottom: screenHeight * 0.022,
    justifyContent: "center",
    alignItems: "center",
  },
  inputDate: {
    flexDirection: "row",
    width: screenWidth * 0.425,
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.026,
    marginVertical: screenHeight * 0.0073,
    marginHorizontal: screenWidth * 0.02,
    fontSize: screenHeight * 0.02,
    color: colors.font,
    marginBottom: screenHeight * 0.022,
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputHour: {
    flexDirection: "row",
    width: screenWidth * 0.425,
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingTop: "9%",
    marginVertical: screenHeight * 0.0073,
    marginHorizontal: screenWidth * 0.02,
    fontSize: screenHeight * 0.02,
    color: colors.font,
    justifyContent: "center",
  },

  inputTitle: {
    marginBottom: screenHeight * 0.01,
    paddingLeft: screenWidth * 0.079,
    color: colors.primary,
    fontSize: screenHeight * 0.022,
    alignSelf: "flex-start",
  },
  textInputPlaceHolder: {
    color: colors.inputText,
    width: screenWidth * 0.739,
  },
  textInputPlaceHolderDate: {
    color: "silver",
  },
  textInput: {
    color: colors.font,
    width: screenWidth * 0.739,
  },
  buttonText: {
    color: colors.font,
  },
  dateTextInput: {
    color: colors.font,
  },
  containerContinue: {
    borderRadius: 5,
    width: screenWidth * 0.887,
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: screenHeight * 0.022,
    marginBottom: screenHeight * 0.022,
  },
  textContinue: {
    fontSize: screenHeight * 0.02,
    fontWeight: "bold",
    color: "white",
  },
});
