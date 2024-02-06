import React, { useEffect, useRef } from "react";
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";

import { showMessage } from "react-native-flash-message";
import { Camera } from "expo-camera";
import * as Linking from "expo-linking";

import { colors } from "../../constants/theme";

export default function ProfileCamera({ setPhoto }) {
  const camRef = useRef(null);

  async function pickCameraImage() {
    const { granted } = await Camera.getCameraPermissionsAsync();
    if (granted) {
      const result = await camRef.current.takePictureAsync({
        aspect: [4, 3],
        quality: 0.5,
        base64: true,
      });
      if (!result.cancelled) {
        setPhoto(result);
      }
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
  }

  return (
    <View style={styles.background}>
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.front}
          ref={camRef}
        />
      </View>

      <TouchableOpacity onPress={() => pickCameraImage()}>
        <View style={styles.containerSend}>
          <Text style={styles.textSend}>TIRAR FOTO</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  cameraContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: "88%",
  },
  camera: {
    width: "100%",
    height: "100%",
    aspectRatio: 1,
    marginTop: "-6%",
  },
  containerSend: {
    borderRadius: 5,
    width: 336,
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  textSend: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  background: {
    alignItems: "center",
    justifyContent: "space-between",
  },
});
