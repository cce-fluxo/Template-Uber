import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';

import { screenHeight, screenWidth } from '../../constants/dimensions';
import { colors } from '../../constants/theme';
import { Feather } from '@expo/vector-icons';

export default function ItemCollectionCard({ itemInformation, removeItem }) {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardId}>{itemInformation.quantity}</Text>

      <Text style={styles.materialText}>{itemInformation.mat}</Text>
      <Text style={styles.sizeText}>{itemInformation.size}</Text>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => removeItem(itemInformation)}
      >
        <Feather name="x" size={22} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginTop: 13,
    minHeight: 50,
    width: screenWidth * 0.893,
    flexDirection: 'row',
    backgroundColor: colors.primary + 40,
    borderRadius: 10,
    alignItems: 'center',
    paddingLeft: screenWidth * 0.528,
    marginTop: screenHeight * 0.01,
  },
  cardId: {
    position: 'absolute',
    left: 20,
    fontSize: 14,
    color: colors.font,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    left: screenWidth * 0.792,
  },
  sizeText: {
    position: 'absolute',
    fontSize: 16,
    color: colors.font,
    fontWeight: 'bold',
    left: screenWidth * 0.462,
  },
  materialText: {
    maxWidth: 200,
    position: 'absolute',
    left: screenWidth * 0.066,
    fontSize: 16,
    paddingHorizontal: screenWidth * 0.106,
    color: colors.font,
    fontWeight: 'bold',
    paddingRight: screenWidth * 0.184,
  },
});
