import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { colors } from "../../../constants/theme";
import { screenHeight, screenWidth } from "../../../constants/dimensions/index";

const SelectType = ({ navigation }) => {
  return (
    <View style={styles.background}>
      <Image
        style={styles.image}
        source={require("../../../assets/LogoSiri.png")}
      />
      <Text style={styles.title}>SELECIONE UM TIPO DE GERADOR:</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Nova Conta", { type: "comum" })}
      >
        <View style={styles.containerSend}>
          <Text style={styles.textSend}>PESSOA FÍSICA</Text>
        </View>
      </TouchableOpacity>
      {/* <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Reciclo lixo residencial</Text>
      </View> */}
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

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Novo Grande Gerador", { type: "grande_gerador" })
        }
      >
        <View style={styles.containerSend}>
          <Text style={styles.textSend}>PESSOA JURÍDICA</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.subtitleContainer}>
        {/* <Text style={styles.subtitle}>
          Escolas, Condomínios, Restaurantes, Empresas, Fábricas, etc
        </Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    marginBottom: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  scroll: {
    marginTop: 20,
  },
  containerSend: {
    borderRadius: 5,
    width: 336,
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  textSend: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",

    marginBottom: 20,
  },
  subtitleContainer: {
    width: 336,
    alignItems: "center",
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
  image: {
    resizeMode: "contain",
    height: screenHeight * 0.2203,
    alignSelf: "center",
    marginBottom: 20,
  },
});

export default SelectType;
