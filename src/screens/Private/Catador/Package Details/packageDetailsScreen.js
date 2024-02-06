import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  ScrollView,
  Alert,
  Share,
} from "react-native";

import { showMessage } from "react-native-flash-message";
import { Feather } from "@expo/vector-icons";

import { colors } from "../../../../constants/theme";
import { screenHeight, screenWidth } from "../../../../constants/dimensions";
import { SafeAreaView } from "react-native-safe-area-context";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import AcceptCollectionFeed from "../../../../components/acceptCollect/feedCollection";
import { useAuth } from "../../../../context/auth";
import api from "../../../../services/api";

export default function PackageDetailsScreen({ navigation, route }) {
  const { itemInformation, navigationOrigin } = route.params;
  const { user } = useAuth();

  let totalGorjeta = 0;
  itemInformation.coletas.map((coleta) => (totalGorjeta += coleta.gorjeta));

  const [loading, setLoading] = useState(false);

  function formatDate(date) {
    const newDate = new Date(date);
    const formated = format(newDate, "dd MMMM", { locale: ptBR });
    const day = formated.split(" ")[0];
    let month = formated
      .split(" ")[1]
      .replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());

    return day + " " + month;
  }

  const formatNeighborhoods = (bairrosList) => {
    return bairrosList.join(", ");
  };

  function goToDetails(collect_info) {
    console.log(itemInformation);
    navigation.navigate("Package Collect Details", {
      itemInformation: collect_info,
    });
  }

  function getSacolas(item) {
    let text = "Sacolas:\n";
    item.map((sacola) => {
      text += `${sacola.quantity}\t${sacola.size}\t${sacola.mat}\n`;
    });
    return text;
  }

  function getColetas(coletas) {
    let text = "\nColetas:\n";
    coletas.map((coleta, index) => {
      text += `\nColeta ${index + 1}:\n`;
      text += `Cliente: ${coleta.user_comum.user.name}\n`;
      text += `Endereço: ${coleta.address}, ${coleta.number}, ${coleta.complement}, ${coleta.neighbourhood}, ${coleta.cep}\n`;
      text += getSacolas(coleta.sacolas);
    });
    return text;
  }

  function getPacote(pacote) {
    let text = "Resumo do Pacote:\n";
    const dateArr = pacote.date.split("T")[0].split("-");
    text += `Data: ${dateArr[2]}/${dateArr[1]}/${dateArr[0]}\t Hora: ${pacote.horario}\n`;
    // text += `Token de finalização: ${pacote.token}`;
    text += getColetas(pacote.coletas);
    return text;
  }

  async function shareButton() {
    try {
      const msg = getPacote(itemInformation);
      shareText(msg);
    } catch (err) {
      console.log(err);
    }
  }

  async function shareText(msg) {
    try {
      const result = await Share.share({
        message: msg,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  const alertCancel = () => {
    Alert.alert("Tem certeza que deseja cancelar esse pacote?", "", [
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

  console.log("coletas", itemInformation.coletas);
  const goToMap = () => {
    itemInformation?.coletas.length > 0
      ? navigation.navigate("Package Map Details", {
          collectionList: itemInformation?.coletas,
        })
      : showMessage({
          message: "Nenhuma coleta no mapa",
          type: "danger",
          icon: "danger",
        });
  };

  async function cancelCollect() {
    try {
      const response = await api.get(
        `/users/${user.id}/grupo/${itemInformation.id}/cancelar`
      );
      showMessage({
        message: "Pacote cancelado!",
        type: "success",
        icon: "success",
      });
      navigation.goBack();
    } catch (err) {
      showMessage({
        message: err.response.data.msg,
        type: "danger",
        icon: "danger",
      });

      console.log(err.response);
    }
  }

  async function confirmCollect() {
    try {
      console.log("itemInformation", JSON.stringify(itemInformation));
      console.log("itemInformation", JSON.stringify(itemInformation));

      const response = await api.post(
        `/users/${user.id}/coleta/${itemInformation.coletas[0].id}/confirmar`,
        { token: itemInformation.coletas[0].token }
      );
      showMessage({
        message: "Coleta finalizada!",
        type: "success",
        icon: "success",
      });
      navigation.goBack();
    } catch (err) {
      showMessage({
        message: "Erro ao finalizar coleta!",
        type: "danger",
        icon: "danger",
      });
      console.log(err.response.data);
      console.log(err.response);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerMenu}>
        <TouchableOpacity
          onPress={() => {
            navigationOrigin == null
              ? navigation.goBack()
              : navigation.navigate(navigationOrigin);
          }}
        >
          <Feather
            name="arrow-left"
            size={25}
            color={colors.primary}
            style={{ marginLeft: 20 }}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes do pacote</Text>
        <TouchableOpacity
          style={styles.shareBtn}
          onPress={() => {
            shareButton();
          }}
        >
          <Feather name="share-2" size={24} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.refreshMapButton}
          onPress={() => goToMap()}
        >
          <Feather name="map" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.informationContainer}>
        <View style={{ width: "70%" }}>
          <Text style={styles.date}>{formatDate(itemInformation?.date)}</Text>
          <Text style={styles.hour}>{itemInformation?.horario}</Text>
          <Text style={styles.bairros}>
            {formatNeighborhoods(itemInformation?.bairros)}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
          }}
        >
          {/* <Text style={styles.token}>Token: {itemInformation.token}</Text> */}
          {totalGorjeta > 0 ? (
            <>
              <Text style={styles.price}>Gorjetas</Text>
              <Text style={styles.price}>R$ {totalGorjeta.toFixed(2)}</Text>
            </>
          ) : null}
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 30,
          justifyContent: "space-between",
        }}
      >
        {itemInformation.coletas.length > 1 ? (
          <Text style={styles.coletaTitle}>Coletas do pacote:</Text>
        ) : (
          <Text style={styles.coletaTitle}>Coleta do pacote:</Text>
        )}
        <Text style={(styles.coletaTitle, { paddingRight: 30 })}>
          {itemInformation.coletas.length}
        </Text>
      </View>

      <ScrollView
        style={{
          height: screenHeight * 0.6,
          marginTop: 5,
        }}
      >
        <AcceptCollectionFeed
          collectionList={itemInformation?.coletas}
          goToDetails={goToDetails}
        />
      </ScrollView>

      <View>
        {/* {itemInformation.coletas.length > 1 ? (
          <></>
        ) : (
          <TouchableOpacity
            style={styles.containerEndCollect}
            onPress={() => {
              alertConfirm();
            }}
          >
            {loading ? (
              <ActivityIndicator size="small" color={colors.background} />
            ) : (
              <Text style={styles.textConfirm}>FINALIZAR COLETA</Text>
            )}
          </TouchableOpacity>
        )} */}

        <TouchableOpacity
          style={styles.containerConfirm}
          onPress={() => {
            alertCancel();
          }}
        >
          {loading ? (
            <ActivityIndicator size="small" color={colors.background} />
          ) : (
            <Text style={styles.textCancel}>CANCELAR PACOTE</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  refreshMapButton: {
    borderRadius: 100,
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  headerMenu: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: "400",
    textAlign: "center",
  },
  finishCodeTitle: {
    color: colors.font,
    fontSize: 16,
    fontWeight: "400",
    textAlign: "left",
    paddingLeft: screenWidth * 0.05,
  },
  bairros: {
    color: colors.font,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "left",
    paddingLeft: screenWidth * 0.05,
  },
  token: {
    color: colors.font,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "left",
    paddingLeft: 0,
  },
  date: {
    color: colors.font,
    fontSize: 20,
    fontWeight: "500",
    textAlign: "left",
    paddingLeft: screenWidth * 0.05,
  },
  hour: {
    color: colors.font,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "left",
    paddingLeft: screenWidth * 0.05,
  },
  price: {
    color: colors.font,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "right",
  },
  informationContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 20,
  },
  coletaTitle: {
    color: colors.font,
    fontSize: 16,
    paddingLeft: 20,
  },
  containerConfirm: {
    borderRadius: 5,
    position: "absolute",
    width: screenWidth * 0.8876,
    height: 50,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: screenHeight * 0.022,
    marginBottom: screenHeight * 0.026,
    bottom: 0,
  },
  containerEndCollect: {
    borderRadius: 5,
    position: "absolute",
    width: screenWidth * 0.8876,
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: screenHeight * 0.022,
    marginBottom: screenHeight * 0.026,
    bottom: 60,
  },
  textConfirm: {
    fontSize: screenHeight * 0.018,
    fontWeight: "bold",
    color: "white",
  },
  textCancel: {
    fontSize: screenHeight * 0.018,
    fontWeight: "bold",
    color: colors.inputErrorText,
  },
  shareBtn: {
    alignItems: "center",
    justifyContent: "center",

    height: 40,
    width: 30,
  },
  sharePackageText: {
    fontSize: 15,
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    color: colors.primary,
  },
});
