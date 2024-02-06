import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Text,
  ScrollView,
} from "react-native";

import { showMessage } from "react-native-flash-message";
import { Feather } from "@expo/vector-icons";

import { useAuth } from "../../../../context/auth";
import { colors } from "../../../../constants/theme";
import api from "../../../../services/api";
import { screenHeight, screenWidth } from "../../../../constants/dimensions";
import { SafeAreaView } from "react-native-safe-area-context";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import AcceptCollectionFeed from "../../../../components/acceptCollect/feedCollection";

export default function PackageScreen({ navigation, route }) {
  const { user } = useAuth();

  const { itemInformation, valorDoPacote } = route.params;

  const [loading, setLoading] = useState(false);

  const selectedCollect = (cardId) => {
    const selectedItem = places.find((element) => element.id === cardId);
    delete selectedItem.mark;
    navigation.navigate("Confirm Accept", {
      itemInformation: selectedItem,
    });
  };

  async function acceptCollect() {
    setLoading(true);
    try {
      let response = await api.get(
        `/users/${user.id}/grupo/${itemInformation.id}/aceitar`
      );
      // console.log(response.data);
      showMessage({
        message: "Pacote aceito com sucesso!",
        type: "success",
        icon: "success",
        duration: 3000,
      });
      navigation.goBack();
    } catch (err) {
      showMessage({
        message: "Erro ao aceitar pacote",
        description: err.response?.data?.msg,
        type: "danger",
        icon: "danger",
      });
      console.log(err);
      setLoading(false);
    }
    setLoading(false);
  }

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
    navigation.navigate("AcceptCollectDetailsScreen", {
      itemInformation: collect_info,
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerMenu}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
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
          style={styles.refreshMapButton}
          onPress={() =>
            navigation.navigate("MapPackageScreen", {
              collectionList: itemInformation?.coletas,
            })
          }
        >
          <Feather
            name="map"
            size={24}
            color={colors.primary}
            style={{ width: screenWidth * 0.15 }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.informationContainer}>
        <View style={{ width: "80%" }}>
          <Text style={styles.date}>{formatDate(itemInformation?.date)}</Text>
          <Text style={styles.hour}>{itemInformation?.horario}</Text>
          <Text style={styles.bairros}>
            {formatNeighborhoods(itemInformation?.bairros)}
          </Text>
        </View>
        {/* <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.price}>R$ {itemInformation?.valor}</Text>
        </View> */}
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

      <ScrollView style={{ height: screenHeight * 0.6, marginTop: 5 }}>
        <AcceptCollectionFeed
          collectionList={itemInformation?.coletas}
          goToDetails={goToDetails}
        />
      </ScrollView>

      <TouchableOpacity
        style={styles.containerConfirm}
        onPress={() => {
          acceptCollect();
        }}
      >
        {loading ? (
          <ActivityIndicator size="small" color={colors.background} />
        ) : (
          <Text style={styles.textConfirm}>CONFIRMAR</Text>
        )}
      </TouchableOpacity>
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
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: screenHeight * 0.022,
    marginBottom: screenHeight * 0.042,
    bottom: 0,
  },
  textConfirm: {
    fontSize: screenHeight * 0.0205,
    fontWeight: "bold",
    color: "white",
  },
});
