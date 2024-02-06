import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from "react-native";

import { screenWidth, screenHeight } from "../../../constants/dimensions";
import { colors } from "../../../constants/theme";
import Camera from "../../../components/camera";

export default function ProfilePictureScreen({ navigation, routes }) {
  const [photo, setPhoto] = useState(null);

  return (
    <SafeAreaView style={styles.background}>
      {photo ? (
        <>
          <Image
            resizeMode="contain"
            style={styles.picturePreview}
            source={photo}
          />
          <TouchableOpacity onPress={() => setPhoto(null)}>
            <View style={styles.containerSend}>
              <Text style={styles.textSend}>TIRAR OUTRA</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              //console.log({ photo }),
              navigation.navigate("Novo Catador", { photo });
            }}
          >
            <View style={styles.containerSend}>
              <Text style={styles.textSend}>CONTINUAR</Text>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <Camera setPhoto={setPhoto} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  picturePreview: {
    width: 300,
    height: 300,
    borderRadius: 336,
    resizeMode: "cover",
    marginBottom: 0,
    marginTop: "-6%",
  },
  camera: {
    flex: 1,
  },
  containerSend: {
    borderRadius: 5,
    width: 336,
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  textSend: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
});
