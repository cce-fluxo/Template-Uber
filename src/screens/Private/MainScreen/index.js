import React, { useState, useCallback, useRef, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";

import { colors } from "../../../constants/theme";
// import ArticlesFeed from '../../../components/articles/articlesFeed';
import { showMessage } from "react-native-flash-message";
import UserCollectionFeed from "../../../components/scheduledCollection/feedCollection/userCollectionFeed";
import { useAuth } from "../../../context/auth";
import api from "../../../services/api";

import { SafeAreaView } from "react-native-safe-area-context";
import { screenHeight, screenWidth } from "../../../constants/dimensions";

import PendentRateModal from "../../../components/modals/pendentRatingModal";

export default function MainScreen({ navigation }) {
  const { user, setUser, signOut } = useAuth();
  const [showSaldo, setShowSaldo] = useState(false);
  const [myCollection, setMyCollection] = useState([]);
  const [loadingCollection, setLoadingCollection] = useState(false);
  const [notRatedCollection, setNotRatedCollection] = useState([]);

  function refreshScreen() {
    myNextCollections();
    myCurrentSaldo();
    pendentRate();
  }

  // requisiçao nome do usuário + saldo + coletas agendadas
  async function myNextCollections() {
    setLoadingCollection(true);
    try {
      const response = await api.get(
        `/users/${user.id}/coletas?calendar=true&filter=entregue;eq;false`
      );
      setMyCollection(response.data);
      console.log(response.data);
    } catch (err) {
      console.log("erro mainscreen usuário comum: ", err.response.data);
      if (err.response.status == 401) {
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

  useEffect(() => {
    // console.log("notRatedCollection", notRatedCollection);
  }, [myCollection, notRatedCollection]);

  const rateModalRef = useRef(null);
  const openValuesModal = () => rateModalRef.current?.open();

  async function pendentRate() {
    try {
      const response = await api.get(`/users/${user.id}/coletas/noscore`);
      setNotRatedCollection(response.data);

      console.log(notRatedCollection);
    } catch (err) {
      console.log(err);
    }
  }

  async function myCurrentSaldo() {
    try {
      const response = await api.get(`/users/current?fields=saldo`);
      let myUser = user;
      myUser.saldo = response.data.saldo;
      setUser(myUser);
    } catch (err) {
      console.log(err);
    }
  }

  if (notRatedCollection.length > 0) {
    openValuesModal();
  }

  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      myNextCollections();
      myCurrentSaldo();
      pendentRate();

      return function cleanup() {
        mounted = false;
      };
    }, [])
  );

  const firstName = user?.name?.split(" ")[0];

  // corrigit a flatlist e scrollview com o mesmo sentido

  function goToDetails(collect_info) {
    navigation.navigate("User Collect Details", {
      itemInformation: collect_info,
    });
  }

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.headerSaldo}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Feather name="menu" size={25} color={colors.primary} />
        </TouchableOpacity>

        {showSaldo ? (
          <>
            <View style={styles.saldoView}>
              <Text
                style={{ fontSize: 12, color: colors.primary, marginTop: 2 }}
              >
                Meu saldo
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: colors.primary,
                  fontWeight: "bold",
                  height: 18,
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
                style={{ fontSize: 12, color: colors.primary, marginTop: 2 }}
              >
                Meu saldo
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
        {/* <Text style={styles.myName}>Nome do Usuário</Text> */}
      </View>

      <View
        style={{ flexDirection: "row", alignSelf: "center", marginTop: -15 }}
      >
        <View style={styles.quickOtions}>
          <TouchableOpacity
            //</View>onPress={() => navigation.navigate('HowWorks')}>
            onPress={() => {
              navigation.navigate("AddCredits");
            }}
          >
            <View style={styles.optionsCircle}>
              <MaterialCommunityIcons
                name="wallet-plus-outline"
                color={colors.background}
                size={36}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.subtitleOption}>Adicionar Créditos</Text>
        </View>

        <View style={styles.quickOtions}>
          <TouchableOpacity onPress={() => navigation.navigate("BookCollect")}>
            <View style={styles.optionsCircle}>
              <MaterialCommunityIcons
                name="calendar-plus"
                size={36}
                color={colors.background}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.subtitleOption}>Agendar Coleta</Text>
        </View>

        <View style={styles.quickOtions}>
          <TouchableOpacity onPress={() => navigation.navigate("Collections")}>
            <View style={styles.optionsCircle}>
              <Feather name={"calendar"} size={36} color={colors.background} />
            </View>
          </TouchableOpacity>
          <Text style={styles.subtitleOption}>Minhas Coletas</Text>
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
        <TouchableOpacity onPress={refreshScreen}>
          <Feather name="refresh-cw" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <UserCollectionFeed
        collectionList={myCollection.slice(0, 5)}
        goToDetails={goToDetails}
        refreshFeed={refreshScreen}
        refreshLoad={loadingCollection}
      />

      {notRatedCollection.length > 0 ? (
        <PendentRateModal
          modalRef={rateModalRef}
          collectList={notRatedCollection}
          setNotRatedCollection={setNotRatedCollection}
        />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  scroll: {
    //marginTop: 20,
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
    fontSize: 12,
    color: colors.primary,
    alignSelf: "center",
    marginTop: 5,
    textAlign: "center",
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
