import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";

//
import { Feather } from "@expo/vector-icons";
import { Modalize } from "react-native-modalize";

//
import { colors } from "../../constants/theme";
import { useAuth } from "../../context/auth";
import { screenHeight, screenWidth } from "../../constants/dimensions";

export default function AddressOptionsModal({
  modalRef,
  setCollectAddress,
  addressModalRef,
  openInsertModal,
}) {
  const { user } = useAuth();

  const userAddress = {
    cep: user.cep,
    address: user.address,
    number: user.number,
    complement: user.complement,
    neighbourhood: user.neighbourhood,
    city: user.city,
    state: user.state,
  };

  return (
    <>
      <Modalize ref={modalRef} adjustToContentHeight={true}>
        <ScrollView>
          <View style={styles.container}>
            {user?.address &&
            user?.number &&
            user?.cep &&
            user?.neighbourhood &&
            user?.city &&
            user?.state ? (
              <>
                <TouchableOpacity
                  onPress={() => {
                    console.log(userAddress);
                    setCollectAddress(userAddress);
                    modalRef.current?.close();
                  }}
                >
                  <View style={styles.input}>
                    {/* <Text style={styles.inputTitle}>Meu endereço cadastrado:</Text> */}
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Feather
                        name="home"
                        color={colors.primary}
                        size={20}
                        style={{ left: "20%" }}
                      />
                      <View>
                        <Text style={styles.textInput}>
                          {user.address}, {user.number}, {user.complement}
                        </Text>
                        <Text style={styles.textInput}>
                          {user.cep}, {user.neighbourhood}
                        </Text>
                        <Text style={styles.textInput}>
                          {user.city}-{user.state}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "80%",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={styles.anotherWaySeparator} />
                  <Text style={styles.anotherWayText}>OU</Text>
                  <View style={styles.anotherWaySeparator} />
                </View>
              </>
            ) : null}
            <TouchableOpacity
              onPress={() => {
                modalRef.current?.close();
                openInsertModal(addressModalRef);
              }}
            >
              <View style={styles.containerContinue}>
                <Text style={styles.textToModalAddress}>
                  CADASTRAR ENDEREÇO
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modalize>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    width: screenWidth * 0.8876,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.01,
    marginVertical: screenHeight * 0.0073,
    fontSize: screenHeight * 0.02,
    color: colors.font,
    marginBottom: screenHeight * 0.022,
    justifyContent: "center",
    paddingBottom: 10,
    paddingTop: 10,
  },
  textInput: {
    paddingLeft: 30,
    fontSize: 14,
    color: colors.font,
  },
  inputTitle: {
    color: colors.primary,
    fontSize: 16,
    alignSelf: "flex-start",
    paddingBottom: 5,
    paddingLeft: 5,
  },
  textToModalAddress: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  anotherWayText: {
    fontSize: screenHeight * 0.02,
    color: colors.primary,
    fontWeight: "bold",
  },
  anotherWaySeparator: {
    width: 120,
    backgroundColor: colors.primary,
    height: 1,
  },
  containerContinue: {
    borderRadius: 5,
    width: screenWidth * 0.887,
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: screenHeight * 0.022,
    marginBottom: screenHeight * 0.022,
  },
});
