import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { screenHeight, screenWidth } from '../../../constants/dimensions';
import { colors } from '../../../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function EmptyAcceptCard() {
  return (
    <View style={styles.cardContainer}>
      <View>
        <Text style={styles.title}>
          Nenhuma coleta disponível na sua região
        </Text>
        <Text style={styles.subTitle}>Tente novamente mais tarde</Text>
      </View>
      <MaterialCommunityIcons
        name="folder-open"
        size={32}
        color={colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    minHeight: 80,
    width: screenWidth * 0.893,
    flexDirection: 'row',
    backgroundColor: colors.primary + 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: screenHeight * 0.02,
    justifyContent: 'space-evenly',
    alignSelf: 'center',
  },
  title: {
    width: screenWidth * 0.6,
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
});
