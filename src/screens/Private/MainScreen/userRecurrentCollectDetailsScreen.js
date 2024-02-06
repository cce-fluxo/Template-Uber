import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { format } from "date-fns";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../constants/theme";
import { screenHeight, screenWidth } from "../../../constants/dimensions";
import ListResumeList from "../../../components/resumeList/listResumeList";
import { Feather } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";
import UserAvatar from "react-native-user-avatar";
import ScoreLabel from "../../../components/common/scoreLabel";
import api from "../../../services/api";
import { useAuth } from "../../../context/auth";
import SelectDateModal from "../../../components/modals/selectDateModal";

export default function UserRecurrentCollectDetailsScreen({
  navigation,
  route,
}) {
  const { itemInformation, previousCalendar, previousHistoric } = route.params;
  const { user } = useAuth();
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  const [bairros, setBairros] = useState([]);
  const [loading, setLoading] = useState(false);
  const dateModalRef = useRef(null);

  function selectDateHour(date, hour) {
    setDay(date);
    setHour(hour);
  }

  const openOptionsModal = (optionsModalRef) => optionsModalRef.current?.open();

  async function cancelCollect() {
    try {
      const response = await api.delete(
        `/coleta_recorrente/${itemInformation.id}`
      );
      showMessage({
        message: "Coleta recorrente cancelada!",
        type: "success",
        icon: "success",
      });
      navigation.goBack();
    } catch (err) {
      showMessage({
        message: "Não foi possível cancelar a coleta recorrente",
        type: "danger",
        icon: "danger",
      });

      console.log(err);
    }
  }

  const alertCancel = () => {
    Alert.alert("Tem certeza que deseja cancelar a coleta recorrente?", "", [
      {
        text: "Não",
        onPress: () => {
          console.log("");
        },
        style: "default",
      },
      {
        text: "Sim, cancelar",
        onPress: () => cancelCollect(),
        style: "destructive",
      },
    ]);
  };

  async function requestDates() {
    setLoading(true);
    console.log("requesrt");
    try {
      let response = await api.post(`/horarios/semanais/get`, {
        city: itemInformation?.city,
        neighbourhood: itemInformation?.neighbourhood,
        state: itemInformation?.state,
      });
      console.log("datas2: ", response.data);
      setBairros(response.data[0].dates);
    } catch (err) {
      console.log("erro:", err);
    }
    setLoading(false);
  }

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <View style={styles.headerMenu}>
        <TouchableOpacity
          onPress={() => {
            previousCalendar == true
              ? navigation.navigate("Collections")
              : previousHistoric == true
              ? navigation.navigate("Historic")
              : navigation.navigate("Home");
          }}
        >
          <Feather name="arrow-left" size={25} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Coleta Recorrente</Text>
      </View>

      <ScrollView contentContainerStyle={styles.background}>
        <Text style={styles.boxTitle}>Local da coleta</Text>
        <View style={styles.box}>
          <Text style={styles.boxText}>
            {itemInformation?.address}, {itemInformation?.number},{" "}
            {itemInformation?.complement}
          </Text>
          <Text style={styles.boxText}>
            {itemInformation?.neighbourhood}, {itemInformation?.cep}
          </Text>
          <Text style={styles.boxText}>
            {itemInformation?.city} - {itemInformation?.state}
          </Text>
        </View>
        <Text style={styles.boxTitle}>Data da coleta</Text>
        <View style={styles.dateBox}>
          <Text style={styles.dateText}>
            Toda {day ? day : itemInformation?.weekday}
          </Text>
          <Text style={styles.dateText}>
            {hour ? hour : itemInformation?.horario}
          </Text>
          {/* <Text style={styles.dateText}>b</Text> */}
          <TouchableOpacity
            onPress={() => {
              requestDates();
              openOptionsModal(dateModalRef);
            }}
          >
            <Feather name="edit" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <ListResumeList cartList={itemInformation?.sacolas} />
      </ScrollView>

      <TouchableOpacity style={styles.containerFinish} onPress={alertCancel}>
        <Text style={styles.textFinish}>CANCELAR</Text>
      </TouchableOpacity>
      <SelectDateModal
        modalRef={dateModalRef}
        dates={bairros}
        recurrent
        callApi
        selectDateHour={selectDateHour}
        loading={loading}
        collectId={itemInformation?.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    // flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  image: {
    resizeMode: "contain",
    height: 150,
  },
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
    paddingLeft: "19%",
  },
  box: {
    flexDirection: "column",
    width: screenWidth * 0.8876,
    paddingVertical: 10,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.026,
    marginVertical: screenHeight * 0.0033,
    fontSize: screenHeight * 0.02,
    color: colors.font + "cf",
    marginBottom: screenHeight * 0.018,
    justifyContent: "space-between",
    alignItems: "center",
  },
  catadorBox: {
    flexDirection: "row",
    width: screenWidth * 0.8876,
    paddingVertical: 10,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.13,
    paddingRight: screenWidth * 0.096,
    marginVertical: screenHeight * 0.0033,
    fontSize: screenHeight * 0.02,
    color: colors.font + "cf",
    marginBottom: screenHeight * 0.018,
    justifyContent: "space-around",
    alignItems: "center",
  },
  boxToken: {
    flexDirection: "column",
    width: screenWidth * 0.42,
    paddingVertical: 10,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.073,
    paddingRight: screenWidth * 0.026,
    marginVertical: screenHeight * 0.0033,
    fontSize: screenHeight * 0.02,
    color: colors.font + "cf",
    marginBottom: screenHeight * 0.018,
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
  },
  dateBox: {
    flexDirection: "row",
    width: screenWidth * 0.8876,
    paddingVertical: 10,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.073,
    paddingRight: screenWidth * 0.026,
    marginVertical: screenHeight * 0.0033,
    fontSize: screenHeight * 0.02,
    color: colors.font + "cf",
    marginBottom: screenHeight * 0.022,
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    color: colors.font + "cf",
    width: "45%",
    fontWeight: "bold",
  },
  boxTitle: {
    paddingLeft: screenWidth * 0.079,
    color: colors.primary,
    fontSize: 16,
    alignSelf: "flex-start",
  },
  tokenTitle: {
    paddingLeft: screenWidth * 0.052,
    color: colors.primary,
    fontSize: 16,
    alignSelf: "flex-start",
  },
  boxText: {
    color: colors.font + "cf",
    width: screenWidth * 0.739,
  },
  tokenText: {
    color: colors.font + "cf",
    textAlign: "left",
    width: "100%",
  },
  containerConfirm: {
    borderRadius: 5,
    width: screenWidth * 0.8876,
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: screenHeight * 0.022,
    marginBottom: screenHeight * 0.022,
  },
  textConfirm: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  totalText: {
    fontSize: 15,
    paddingHorizontal: 5,
    color: colors.accent,
    fontWeight: "bold",
  },
  priceTag: {
    width: screenWidth * 0.893,
    justifyContent: "flex-start",
  },
  statusText: {
    color: colors.font + "cf",
    width: screenWidth * 0.739,
    fontWeight: "bold",
  },
  containerFinish: {
    borderRadius: 5,
    width: screenWidth * 0.8876,
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: screenHeight * 0.022,
    marginBottom: screenHeight * 0.014,
  },

  containerFinished: {
    borderRadius: 5,
    width: screenWidth * 0.8876,
    height: 50,
    backgroundColor: colors.primary + 70,
    justifyContent: "center",
    alignItems: "center",
    marginTop: screenHeight * 0.012,
    marginBottom: screenHeight * 0.014,
  },
  containerCancel: {
    borderRadius: 5,
    width: screenWidth * 0.8876,
    height: 50,
    backgroundColor: colors.primary + 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: screenHeight * 0.022,
    marginBottom: screenHeight * 0.014,
  },
  textFinish: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  textRateCollect: {
    fontSize: 16,
    marginBottom: screenHeight * 0.022,
    color: colors.primary,
  },
  textCancell: {
    fontSize: 15,
    marginBottom: screenHeight * 0.022,
    color: colors.fontError,
  },
});
