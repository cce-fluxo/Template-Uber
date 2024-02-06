import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { showMessage } from "react-native-flash-message";
import { colors } from "../../../constants/theme";
import { screenHeight, screenWidth } from "../../../constants/dimensions/index";
import * as Permissions from "expo-permissions";
import * as Linking from "expo-linking";
import { Camera } from "expo-camera";

const PreSignUpScreen = ({ navigation }) => {
  const handleNavigation = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      console.log(status);
      navigation.navigate("Profile Picture");
    } else {
      showMessage({
        message: "Permissão para usar a câmera é necessária para criar a conta",
        description:
          "Clique aqui para permitir que o aplicativo tenha acesso a sua câmera",
        type: "warning",
        icon: "warning",
        onPress: () => Linking.openSettings(),
      });
    }
  };

  return (
    <View style={styles.background}>
      <Image
        style={styles.image}
        source={require("../../../assets/LogoSiri.png")}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Select Type")}>
        <View style={styles.containerSend}>
          <Text style={styles.textSend}>QUERO RECICLAR</Text>
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

      <TouchableOpacity
        onPress={() => {
          Linking.openURL("https://forms.gle/pug8WsBvNQqQnBo2A");
        }}
      >
        <View style={styles.containerSend}>
          <Text style={styles.textSend}>QUERO COLETAR</Text>
        </View>
      </TouchableOpacity>
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

export default PreSignUpScreen;
