import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { screenHeight, screenWidth } from '../../constants/dimensions';
import { colors } from '../../constants/theme';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function EmptyCartCard({ openCartModal }) {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => openCartModal()}
    >
      <View>
        <Text style={styles.title}>Carrinho vazio</Text>
        <Text style={styles.subTitle}>
          Clique aqui e adicione agora um novo item à sua coleta
        </Text>
      </View>

      <Feather name="shopping-bag" size={26} color={colors.primary} />
    </TouchableOpacity>
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
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: colors.primary,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '500',
    width: screenWidth * 0.7,
    color: colors.primary,
  },
});
