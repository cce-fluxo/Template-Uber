import React from "react";
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

export default function UserCollectDetailsScreen({ navigation, route }) {
  const { itemInformation, previousCalendar, previousHistoric } = route.params;
  const { user } = useAuth();
  console.log("cancelada?", itemInformation.cancelada);

  var date = format(new Date(itemInformation?.date), "dd/MM/yyyy");

  console.log(itemInformation.date);

  async function cancelCollect() {
    try {
      const response = await api.get(
        `/users/${user.id}/coleta/${itemInformation.id}/cancelar`
      );
      showMessage({
        message: "Coleta cancelada!",
        type: "success",
        icon: "success",
      });
      navigation.goBack();
    } catch (err) {
      showMessage({
        message: "Não foi possível cancelar a coleta",
        type: "danger",
        icon: "danger",
      });

      console.log(err);
    }
  }

  const alertCancel = () => {
    Alert.alert("Tem certeza que deseja cancelar essa coleta?", "", [
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

  const alertConfirm = () => {
    Alert.alert("Tem certeza que deseja finalizar essa coleta?", "", [
      {
        text: "Não",
        onPress: () => {
          console.log("");
        },
        style: "default",
      },
      {
        text: "Sim, finalizar",
        onPress: () => confirmCollect(),
        style: "destructive",
      },
    ]);
  };

  async function confirmCollect() {
    try {
      const response = await api.post(
        `/users/${user.id}/coleta/${itemInformation.id}/confirmar`,
        { token: itemInformation.token }
      );
      showMessage({
        message: "Coleta finalizada!",
        type: "success",
        icon: "success",
      });
      navigation.navigate("User Donate", {
        itemInformation: itemInformation,
      });
    } catch (err) {
      showMessage({
        message: "Erro ao finalizar coleta!",
        type: "danger",
        icon: "danger",
      });
      console.log(err);
    }
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
        <Text style={styles.headerTitle}>Detalhes da coleta</Text>
      </View>

      <ScrollView contentContainerStyle={styles.background}>
        {itemInformation.catador === null ? (
          <>
            <Text style={styles.boxTitle}>Status</Text>
            <View style={styles.box}>
              <Text style={styles.statusText}>Em aberto</Text>
            </View>
          </>
        ) : (
          <>
            <View>
              {itemInformation?.catador?.img_url ? (
                <Image
                  source={{
                    uri: itemInformation?.catador?.img_url,
                  }}
                  style={{
                    height: 60,
                    width: 60,
                    marginBottom: 5,
                    marginTop: 10,
                    borderRadius: 200,
                    //backgroundColor: colors.primary,
                  }}
                />
              ) : (
                <UserAvatar
                  size={60}
                  style={{
                    height: 60,
                    width: 60,
                    marginBottom: 5,
                    marginTop: 10,
                  }}
                  name={itemInformation?.catador?.user?.name.split("")[0]}
                  bgColor={colors.primary}
                  textColor={colors.background}
                />
              )}
            </View>
            <Text style={styles.boxTitle}>Nome do Catador</Text>
            <View style={styles.catadorBox}>
              <Text style={styles.boxText}>
                {itemInformation?.catador?.user.name}
              </Text>
              <ScoreLabel rate={itemInformation?.catador?.score_media} />
            </View>
            {itemInformation.gorjeta > 0 ? (
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Text style={styles.tokenTitle}>Total gorjeta</Text>
                  <View style={styles.boxToken}>
                    <Text style={styles.tokenText}>
                      R${itemInformation.gorjeta}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <></>
            )}
          </>
        )}

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
          <Text style={styles.dateText}>{date}</Text>
          <Text style={styles.dateText}>{itemInformation?.horario}</Text>
        </View>

        <ListResumeList cartList={itemInformation.sacolas} />
      </ScrollView>
      {itemInformation.cancelada == true ? (
        <View style={styles.containerFinished}>
          <Text style={styles.textFinish}>COLETA CANCELADA</Text>
        </View>
      ) : itemInformation.catador === null ? null : itemInformation.entregue ==
        true ? (
        <>
          <View style={styles.containerFinished}>
            <Text style={styles.textFinish}>COLETA ENCERRADA</Text>
          </View>

          {itemInformation.score ? null : (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("User Donate", {
                  itemInformation: itemInformation,
                });
                // navigation.goBack();
              }}
            >
              <Text style={styles.textRateCollect}>Avaliar coleta</Text>
            </TouchableOpacity>
          )}
        </>
      ) : (
        <TouchableOpacity style={styles.containerFinish} onPress={alertConfirm}>
          <Text style={styles.textFinish}>FINALIZAR</Text>
        </TouchableOpacity>
      )}

      {!itemInformation.entregue && !itemInformation.cancelada ? (
        !itemInformation.catador ? (
          <TouchableOpacity
            style={styles.containerCancel}
            onPress={alertCancel}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: colors.primary,
              }}
            >
              CANCELAR
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={alertCancel}>
            <Text style={styles.textCancell}>Cancelar coleta</Text>
          </TouchableOpacity>
        )
      ) : null}
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
    width: "80%",
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
    marginTop: screenHeight * 0.022,
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
