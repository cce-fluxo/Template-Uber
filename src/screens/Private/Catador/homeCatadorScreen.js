import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  // ScrollView,
  // ActivityIndicator,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";
import { colors } from "../../../constants/theme";
//import ArticlesFeed from '../../../components/articles/articlesFeed';
import CatadorCollectionFeed from "../../../components/scheduledCollection/feedCollection";
import { useAuth } from "../../../context/auth";
import api from "../../../services/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { screenWidth, screenHeight } from "../../../constants/dimensions";

import * as Linking from "expo-linking";

export default function HomeCatadorScreen({ navigation }) {
  const { user, setUser, signOut } = useAuth();
  const [showSaldo, setShowSaldo] = useState(false);
  const [myCollection, setMyCollection] = useState([]);
  const [loadingCollection, setLoadingCollection] = useState(false);
  console.log("user.id", user.id);
  function goToDetails(collect_info) {
    navigation.navigate("Package Details", {
      itemInformation: collect_info,
      navigationOrigin: null,
    });
  }

  // requisiçao coletas agendadas (renderizar os cards da flatlist)

  async function myNextCollections() {
    setLoadingCollection(true);
    try {
      const response = await api.get(
        `/users/${user.id}/coletas?filter=cancelada;eq;false&filter=entregue;eq;False`
      );
      setMyCollection(response.data);
    } catch (err) {
      console.log("aqui catador home: ", err.response.data);
      if (err.response.status == 401 || err.response.status == 404) {
        showMessage({
          message: "Token expirado",
          type: "danger",
          icon: "danger",
        });
        signOut();
      }
    }
    setLoadingCollection(false);
  }

  async function myCurrentSaldo() {
    try {
      const response = await api.get(`/users/current?fields=saldo`);
      let myUser = user;
      myUser.saldo = response.data.saldo;
      setUser(myUser);
      console.log(user.saldo);
    } catch (err) {
      console.log(err);
    }
  }

  useFocusEffect(
    useCallback(() => {
      let mounted = true;

      myNextCollections();
      myCurrentSaldo();
      return () => {
        mounted = false;
      };
    }, [])
  );

  useEffect(() => {
    // console.log("\n\n\n");
    // console.log(JSON.stringify(myCollection[0]));
    // console.log("\n\n\n");
  }, [myCollection]);

  const firstName = user?.name?.split(" ")[0];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <View style={styles.headerSaldo}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Feather name="menu" size={25} color={colors.primary} />
          </TouchableOpacity>

          {showSaldo ? (
            <>
              <View style={styles.saldoView}>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.primary,
                    marginTop: 2,
                    fontWeight: "800",
                  }}
                >
                  Carteira
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.primary,
                    fontWeight: "bold",
                    height: 18,
                    fontWeight: "800",
                  }}
                >
                  R${user?.saldo.toFixed(2)}
                </Text>
              </View>

              <TouchableOpacity onPress={() => setShowSaldo(false)}>
                <Feather name={"eye"} size={25} color={colors.primary} />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.saldoView}>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.primary,
                    marginTop: 2,
                    fontWeight: "800",
                  }}
                >
                  Carteira
                </Text>
                <View style={styles.saldoTape}></View>
              </View>

              <TouchableOpacity onPress={() => setShowSaldo(true)}>
                <Feather name={"eye-off"} size={25} color={colors.primary} />
              </TouchableOpacity>
            </>
          )}
        </View>

        <View
          style={{
            alignItems: "stretch",
            alignSelf: "flex-start",
            marginLeft: 20,
            marginBottom: 20,
          }}
        >
          <Text style={styles.welcome}>Bem vindo,</Text>
          <Text style={styles.myName}>{firstName}</Text>
        </View>

        <View
          style={{ flexDirection: "row", alignSelf: "center", marginTop: -15 }}
        >
          <View style={styles.quickOtions}>
            <TouchableOpacity
              // onPress={() => navigation.navigate('HowWorks')}
              onPress={() => {
                Linking.openURL("https://linktr.ee/appsiri");
              }}
            >
              <View style={styles.optionsCircle}>
                <Feather
                  name={"help-circle"}
                  size={40}
                  color={colors.background}
                />
              </View>
            </TouchableOpacity>
            <Text style={styles.subtitleOption}>Como funciona?</Text>
          </View>

          <View style={styles.quickOtions}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Accept Collect")}
            >
              <View style={styles.optionsCircle}>
                <MaterialCommunityIcons
                  name="calendar-check"
                  size={36}
                  color={colors.background}
                />
              </View>
            </TouchableOpacity>
            <Text style={styles.subtitleOption}>Aceitar coleta</Text>
          </View>

          <View style={styles.quickOtions}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Collections")}
            >
              <View style={styles.optionsCircle}>
                <Feather
                  name={"calendar"}
                  size={36}
                  color={colors.background}
                />
              </View>
            </TouchableOpacity>
            <Text style={styles.subtitleOption}>Minhas coletas</Text>
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            marginTop: screenHeight * 0.05,
            marginRight: 30,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: colors.primary,
              marginLeft: 20,
              alignSelf: "flex-start",
            }}
          >
            Próximas coletas:
          </Text>
          <TouchableOpacity onPress={myNextCollections}>
            <Feather name="refresh-cw" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <CatadorCollectionFeed
          collectionList={myCollection.slice(0, 5)}
          goToDetails={goToDetails}
          refreshFeed={myNextCollections}
          refreshLoad={loadingCollection}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    marginTop: 20,
  },

  headerSaldo: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  quickOtions: {
    flexDirection: "column",
    width: 80,
    height: 80,
    alignItems: "center",
    margin: 20,
  },

  optionsCircle: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  subtitleOption: {
    fontSize: 14,
    color: colors.primary,
    alignSelf: "center",
    marginTop: 5,
    textAlign: "center",
    fontWeight: "700",
  },
  welcome: {
    fontSize: 30,
    fontWeight: "300",
    color: colors.primary,
  },
  myName: {
    fontSize: 30,
    fontWeight: "700",
    color: colors.primary,
  },
  saldoTape: {
    backgroundColor: colors.primary + 60,
    height: 18,
    width: screenWidth * 0.2,
    borderRadius: 5,
  },
  saldoView: {
    flexDirection: "column",
    alignItems: "center",
    marginLeft: "25%",
    marginRight: "25%",
    width: 100,
  },
});
