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
import { screenWidth } from "../../../../constants/dimensions";
import WithdrawalHistoricFeed from "../../../../components/historicFeed/feedCollection/withdrawHistoricFeed";

export default function WithdrawalHistory({ navigation }) {
  const { user, token } = useAuth();
  const [myCollection, setMyCollection] = useState([]);
  const [loading, setLoading] = useState(false);

  function goToDetails(collect_info, checkin) {
    navigation.navigate("Withdraw Details", {
      itemInformation: collect_info,
    });
  }

  // request to fetch my past collections from backend
  async function myPastCollections() {
    setLoading(true);
    try {
      const response = await api.get(`/saques/user`);
      setMyCollection(response.data);
      console.log("saques", response.data);
    } catch (err) {
      console.log("erro");
      console.log(err.response.data);
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
        <Text style={styles.headerTitle}>Saques</Text>
      </View>
      {!loading ? (
        // myCollection.length > 0 ? (
        <View style={styles.historicBackground}>
          <WithdrawalHistoricFeed
            collectionList={myCollection}
            goToDetails={goToDetails}
          />
        </View>
      ) : (
        // ) : (
        //   <View style={{ alignItems: "center" }}>
        //     <EmptyHistoricCard />
        //   </View>
        // )
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
      <TouchableOpacity
        style={styles.newRequestButton}
        onPress={() => {
          navigation.navigate("Request Withdraw");
        }}
      >
        <Text style={styles.textContinue}>Nova Solicitação</Text>
      </TouchableOpacity>
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
  newRequestButton: {
    borderRadius: 5,
    width: screenWidth * 0.887,
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: screenHeight * 0.02,
  },
  textContinue: {
    fontSize: screenHeight * 0.02,
    fontWeight: "bold",
    color: "white",
  },
});
