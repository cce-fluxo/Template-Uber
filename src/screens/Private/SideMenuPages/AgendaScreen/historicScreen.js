import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../../../constants/theme";
import { screenHeight } from "../../../../constants/dimensions";
import api from "../../../../services/api";
import { useAuth } from "../../../../context/auth";
import UserHistoricFeed from "../../../../components/historicFeed/feedCollection/userHistoricFeed";
import CatadorHistoricFeed from "../../../../components/historicFeed/feedCollection";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyHistoricCard from "../../../../components/historicFeed/cardCollection/emptyHistoricCard";

export default function HistoricScreen({ navigation }) {
  const { user } = useAuth();
  const [myCollection, setMyCollection] = useState([]);
  const [loading, setLoading] = useState(false);

  function goToDetails(collect_info, checkin) {
    user.tipo == "comum" || user.tipo == "grande_gerador"
      ? navigation.navigate("User Collect Details", {
          itemInformation: collect_info,
          previousCalendar: false,
          previousHistoric: true,
        })
      : checkin == true
      ? navigation.navigate("Catador Collect Details", {
          itemInformation: collect_info,
          previousCalendar: false,
          previousHistoric: true,
        })
      : navigation.navigate("Package Details", {
          itemInformation: collect_info,
          navigationOrigin: "Collections",
        });
  }

  // request to fetch my past collections from backend
  async function myPastCollections() {
    setLoading(true);
    try {
      const response = await api.get(`/users/${user.id}/historico`);
      setMyCollection(response.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      myPastCollections();
      return function cleanup() {
        mounted = false;
      };
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerMenu}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Feather name="menu" size={25} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Minhas Coletas</Text>
      </View>

      <View style={styles.optionsDiv}>
        <TouchableOpacity
          style={styles.optionButtonNotSelected}
          onPress={() => navigation.navigate("Collections")}
        >
          <Text style={styles.textNotSelected}>Agenda</Text>
        </TouchableOpacity>
        <View style={styles.optionButtonSelected}>
          <Text style={styles.textSelected}>Histórico</Text>
        </View>
      </View>
      {!loading ? (
        myCollection.length > 0 ? (
          <View style={styles.historicBackground}>
            {user.tipo == "comum" || user.tipo == "grande_gerador" ? (
              <UserHistoricFeed
                collectionList={myCollection}
                goToDetails={goToDetails}
              />
            ) : (
              <CatadorHistoricFeed
                collectionList={myCollection}
                goToDetails={goToDetails}
              />
            )}
          </View>
        ) : (
          <View style={{ alignItems: "center" }}>
            <EmptyHistoricCard />
          </View>
        )
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
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
    left: "33.5%",
  },
  textSelected: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  optionButtonSelected: {
    width: "50%",
    borderBottomColor: colors.primary,
    borderBottomWidth: 2,
  },
  textNotSelected: {
    color: colors.inputText,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  optionButtonNotSelected: {
    width: "50%",
    borderBottomColor: colors.background,
    borderBottomWidth: 2,
  },
  optionsDiv: {
    flexDirection: "row",
    borderTopColor: colors.inputBackground,
    borderTopWidth: 1,
    alignItems: "center",
  },
  refreshMapButton: {
    position: "absolute",
    left: "90%",
    borderRadius: 100,
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  historicBackground: {
    backgroundColor: colors.background,
    flex: 1,
  },
});
