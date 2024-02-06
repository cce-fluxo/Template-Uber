import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";

import { colors } from "../../../constants/theme";
import { screenWidth, screenHeight } from "../../../constants/dimensions";
const MainButton = ({ name, negative, loading = false, ...rest }) => {
  return (
    <TouchableOpacity
      style={[styles.button, negative && styles.negativeButton]}
      {...rest}
    >
      <Text style={[styles.buttonText, negative && styles.negativeText]}>
        {loading ? (
          <ActivityIndicator size="small" color={colors.background} />
        ) : (
          name
        )}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    paddingVertical: screenHeight * 0.018,
    paddingHorizontal: screenWidth * 0.07,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    borderRadius: screenWidth * 0.02,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  negativeButton: {
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  negativeText: {
    color: colors.primary,
  },
});

export default MainButton;
