import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { colors } from "../../../../constants/theme";
import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { screenHeight, screenWidth } from "../../../../constants/dimensions";
import HowCollectModal from "../../../../components/modals/howCollectModal";
import CollectList from "../../../../components/bookCollect/listCollect";
import AddItemModal from "../../../../components/modals/addItemModal";
import api from "../../../../services/api";
import { useAuth } from "../../../../context/auth";

export default function CheckInCollectScreen({ navigation }) {
  // Auth
  const { user } = useAuth();

  const [cartList, setCartList] = useState([]);
  const [cartPrice, setCartPrice] = useState(0.0);
  const [prices, setPrices] = useState({
    Plástico: {
      Pequeno: 1,
      Grande: 2,
    },
    Metal: {
      Pequeno: 1,
      Grande: 1,
    },
    Vidro: {
      Pequeno: 1,
      Grande: 5,
    },
    Papel: {
      Pequeno: 1,
      Grande: 3,
    },
    Misturado: {
      Pequeno: 8,
      Grande: 8,
    },
    Óleo: {
      Pequeno: 1,
      Grande: 2,
    },
  });
  const infoModalRef = useRef(null);
  const addItemModalRef = useRef(null);

  const [, forceRender] = useState({});

  async function currentPrices() {
    try {
      const response = await api.get("/coleta/price");
      //console.log(response.data);
      setPrices(response.data);
      return response.data;
    } catch (err) {
      showMessage({
        message: "Erro ao carregar valores da coletas!",
        type: "danger",
        icon: "danger",
      });
      const response = err.response.data;
      console.log(response.data);
    }
  }

  const whichPrice = (dataMaterial, dataSize, dataQuantity) => {
    let pricesForMyMaterial = prices[dataMaterial];
    let priceForMySizeAndMaterial = pricesForMyMaterial[dataSize];
    return priceForMySizeAndMaterial * dataQuantity;
  };

  function addItem(dataMaterial, dataSize, dataQuantity) {
    let itemPrice = whichPrice(dataMaterial, dataSize, dataQuantity);
    setCartPrice(cartPrice + itemPrice);

    if (cartList.length < 1) {
      const newItem = {
        id: 1,
        mat: dataMaterial,
        quantity: dataQuantity,
        size: dataSize,
        itemPrice,
      };
      let newList = cartList;
      newList.push(newItem);
      setCartList(newList);
    } else {
      const lastIndex = cartList.length - 1;
      const lastId = cartList[lastIndex].id;
      const newItem = {
        id: lastId + 1,
        mat: dataMaterial,
        quantity: dataQuantity,
        size: dataSize,
        itemPrice,
      };
      let newList = cartList;
      newList.push(newItem);
      setCartList(newList);
    }
    // console.log(cartList);
    forceRender({});
  }

  function removeItem(item) {
    setCartPrice(cartPrice - item.itemPrice);
    let newList = cartList.filter((cartList) => cartList.id !== item.id);
    setCartList(newList);
  }

  useEffect(() => {
    currentPrices();
  }, []);

  const onOpenModal = (ref) => {
    ref.current?.open();
  };

  const handleContinue = () => {
    navigation.navigate("Confirm CheckIn", { cartList, cartPrice });
    const timer = setTimeout(() => {
      setCartList([]);
    }, 30000);
    return () => clearTimeout(timer);
  };

  const openCartModal = () => {
    onOpenModal(addItemModalRef);
  };

  //console.log('cartPrice: ', cartPrice);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerMenu}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Feather name="menu" size={25} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Coletar Agora</Text>
      </View>

      <View style={styles.background}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            paddingRight: screenWidth * 0.08,
          }}
        >
          <Text style={styles.inputTitle}>Adicionar item à coletas:</Text>
          <TouchableOpacity onPress={() => onOpenModal(infoModalRef)}>
            <Feather name="info" size={25} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <CollectList
          cartList={cartList}
          removeItem={removeItem}
          openCartModal={openCartModal}
        />

        <View
          style={{
            flexDirection: "row",
            width: screenWidth * 0.8876,
            marginLeft: 15,
            marginTop: 10,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => onOpenModal(addItemModalRef)}
            style={styles.addItemButtonContainer}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AntDesign name="pluscircle" size={30} color={colors.primary} />
              <Text style={styles.addItemButtonText}>Adicionar item</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setCartList([])}
            style={styles.addItemButtonContainer}
          >
            <View
              style={{
                flexDirection: "row",
                marginRight: screenWidth * 0.02,
              }}
            >
              <Ionicons
                name="ios-trash-outline"
                size={30}
                color={colors.cancelCollect}
              />
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          disabled={cartList.length === 0 ? true : false}
          style={
            cartList.length === 0
              ? styles.containerContinueDisable
              : styles.containerContinueEnable
          }
          onPress={() => {
            console.log(cartList), handleContinue();
          }}
        >
          <Text style={styles.textContinue}>CONTINUAR</Text>
        </TouchableOpacity>
      </View>
      <HowCollectModal modalRef={infoModalRef} navigation={navigation} />
      <AddItemModal
        modalRef={addItemModalRef}
        prices={prices}
        addItem={addItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    marginTop: screenHeight * 0.014,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerMenu: {
    height: screenHeight * 0.073,
    paddingLeft: screenWidth * 0.053,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerTitle: {
    color: colors.primary,
    fontSize: screenHeight * 0.0323,
    fontWeight: "400",
    textAlign: "center",
    position: "absolute",
    left: screenWidth * 0.298,
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
  inputTitle: {
    marginBottom: screenHeight * 0.01,
    paddingLeft: screenWidth * 0.079,
    color: colors.font,
    fontSize: 16,
    alignSelf: "flex-start",
  },
  textInput: {
    color: colors.inputText,
    width: screenWidth * 0.739,
  },
  containerContinueEnable: {
    borderRadius: 5,
    width: screenWidth * 0.887,
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: screenHeight * 0.022,
    marginBottom: screenHeight * 0.022,
  },
  containerContinueDisable: {
    borderRadius: 5,
    width: screenWidth * 0.887,
    height: 50,
    backgroundColor: colors.inputText + "aa",
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
  addItemButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  addItemButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: screenWidth * 0.02,
    color: colors.primary,
  },
  walletText: {
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: screenWidth * 0.02,
    color: colors.primary,
  },
});
