import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { screenHeight, screenWidth } from '../../constants/dimensions';
import { colors } from '../../constants/theme';

export default function CardResumeList({ itemInformation }) {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardId}>{itemInformation.quantity}</Text>
      <Text style={styles.sizeText}>{itemInformation.size}</Text>
      <Text style={styles.materialText}>{itemInformation.mat}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 22,
    width: screenWidth * 0.893,
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'space-between',
    paddingLeft: screenWidth * 0.528,
    marginTop: screenHeight * 0.0,
  },
  cardId: {
    position: 'absolute',
    left: 20,
    fontSize: 14,
    color: colors.font,
  },
  materialText: {
    position: 'absolute',
    fontSize: 14,
    color: colors.font,
    left: screenWidth * 0.462,
  },
  sizeText: {
    position: 'absolute',
    left: screenWidth * 0.066,
    fontSize: 14,
    paddingHorizontal: screenWidth * 0.106,
    color: colors.font,
    paddingRight: screenWidth * 0.184,
  },
});
