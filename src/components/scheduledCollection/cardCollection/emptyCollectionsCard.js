import React from "react";
import { View, StyleSheet, Text } from "react-native";

import { screenHeight, screenWidth } from "../../../constants/dimensions";
import { colors } from "../../../constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { sub } from "date-fns";

export default function EmptyCollectionsCard({
  title,
  subtitle,
  navigate,
  recurrent = false,
}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={
        navigate
        // navigation.navigate("BookCollect", { isRecurrent: recurrent })
      }
    >
      <View>
        <Text style={styles.title}>
          {title ? title : "Coletas Vazias"}
          {/* {recurrent ? "Sem coleta recorrente" : "Coletas Vazias"} */}
        </Text>
        <Text style={styles.subTitle}>
          {subtitle ? subtitle : "Agende agora uma nova coleta"}
          {/* {recurrent
            ? "Crie uma nova coleta recorrente"
            : "Agende agora uma nova coleta"} */}
        </Text>
      </View>
      <MaterialCommunityIcons
        name="package-variant"
        size={36}
        color={colors.primary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    minHeight: 80,
    width: screenWidth * 0.893,
    flexDirection: "row",
    backgroundColor: colors.primary + 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: screenHeight * 0.02,
    justifyContent: "space-evenly",
    alignSelf: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: colors.primary,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.primary,
  },
});
