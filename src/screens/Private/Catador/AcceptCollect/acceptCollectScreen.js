import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Text,
} from "react-native";

import * as Location from "expo-location";
import { showMessage } from "react-native-flash-message";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import { useAuth } from "../../../../context/auth";
import { colors } from "../../../../constants/theme";
import api from "../../../../services/api";
import { screenHeight, screenWidth } from "../../../../constants/dimensions";
import ScreensHeader from "../../../../components/common/screensHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import PackageCard from "../../../../components/collectionPackage/packageCard";
import EmptyAcceptCard from "../../../../components/acceptCollect/cardCollection/emptyAcceptCard";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export default function AcceptCollect({ navigation }) {
  const { user } = useAuth();
  const refreshButton = useRef(null);

  const [packages, setPackages] = useState([]);
  let valueOfPackage = 0;

  const [myLocation, setMyLocation] = useState({
    latitude: 0.0,
    longitude: 0.0,
  });
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [loadingCollects, setLoadingCollects] = useState(false);

  let locCoordinates = {};

  function locationObjectCoordinates(loc) {
    const requestLocationObj = { longitude: "", latitude: "" };
    requestLocationObj.latitude = loc.latitude;
    requestLocationObj.longitude = loc.longitude;

    return requestLocationObj;
  }

  // format date

  function formatDate(date) {
    const newDate = new Date(date);
    return format(newDate, "dd MMM", { locale: ptBR });
  }

  // Request user location
  async function getMyLocation() {
    setLoadingLocation(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      try {
        let location = await Location.getCurrentPositionAsync({
          accuracy:
            Platform.OS == "ios"
              ? Location.Accuracy.Lowest
              : Location.Accuracy.Low,
        });

        locCoordinates = locationObjectCoordinates(location.coords);
        setMyLocation(locCoordinates);
      } catch (err) {
        showMessage({
          message: "Não foi possível encontrar sua localização",
          type: "danger",
          icon: "danger",
        });
      }
      setLoadingLocation(false);
    } else {
      throw new Error("Permissão de localização negada");
    }
  }

  async function getPackages() {
    setLoadingCollects(true);
    setPackages([]);
    // await getMyLocation();
    console.log(user);
    try {
      const response = await api.get(`/users/${user.id}/grupos-list`);

      setPackages(response.data);
      showMessage({
        message: "Coletas atualizadas!",
        type: "success",
        icon: "success",
      });
    } catch (err) {
      showMessage({
        message: "Erro ao recarregar coletas!",
        type: "danger",
        icon: "danger",
      });
      console.log(err);

      setLoadingCollects(false);
    }
    setLoadingCollects(false);
  }

  useFocusEffect(
    React.useCallback(() => {
      let load = true;
      getPackages();
      return () => {
        load = false;
      };
    }, [])
  );

  const selectedPackage = (packageItem) => {
    navigation.navigate("PackageScreen", {
      itemInformation: packageItem,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <ScreensHeader navigation={navigation} title={"Aceitar Pacote"} />
        {loadingCollects ? (
          <TouchableOpacity style={styles.refreshMapButton} disabled={true}>
            <ActivityIndicator color={colors.primary} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            ref={refreshButton}
            style={styles.refreshMapButton}
            onPress={() => getPackages()}
          >
            <Feather name="refresh-cw" size={24} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView style={{ height: screenHeight * 0.9 }}>
        {packages.length > 0 ? (
          <View>
            {packages?.map((grupo, index) => (
              <View key={index} style={styles.datesContainer}>
                <View style={styles.dateBox}>
                  <Text style={styles.datesNumber}>
                    {formatDate(grupo.date).split(" ")[0]}
                  </Text>
                  <Text style={styles.datesSubtitle}>
                    {formatDate(grupo.date).split(" ")[1]}
                  </Text>
                </View>
                <View style={styles.packageContainer}>
                  {grupo.pacotes.map((pacote, index) => (
                    <PackageCard
                      key={index}
                      packageInformation={pacote}
                      selectedPackage={selectedPackage}
                    />
                  ))}
                </View>
              </View>
            ))}
          </View>
        ) : (
          <EmptyAcceptCard />
        )}
        {loadingLocation || loadingCollects ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              height: screenHeight * 0.8,
            }}
          >
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <View style={styles.container}></View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  mapView: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  refreshMapButton: {
    position: "absolute",
    left: "85%",
    marginTop: 7,
    borderRadius: 100,
    height: 40,
    width: 40,
    //backgroundColor: colors.primary + 80,
    alignItems: "center",
    justifyContent: "center",
  },
  placesContainer: {
    width: "100%",
    maxHeight: 200,
  },
  datesSubtitle: {
    fontSize: 22,
    textAlign: "right",
    color: colors.font,
    width: 40,
    marginTop: -5,
  },
  datesNumber: {
    fontSize: 28,
    textAlign: "right",
    color: colors.font,
    width: 40,
  },
  dateBox: {
    marginLeft: 20,
    marginTop: 20,
  },
  datesContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
});
