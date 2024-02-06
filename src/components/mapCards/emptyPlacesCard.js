import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/theme';
import { FontAwesome5 } from '@expo/vector-icons';
import { screenHeight, screenWidth } from '../../constants/dimensions';

export default function EmptyPlacesCard() {
  return (
    <View style={styles.container}>
      <FontAwesome5
        name="box-open"
        size={30}
        color={colors.font + 90}
        style={{ padding: 20 }}
      />
      <View style={{}}>
        <Text style={styles.title}>Não há coletas agendadas na sua região</Text>
        <Text style={styles.subTitle}>
          Recarregue o mapa ou tente mais tarde
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 13,
    height: 120,
    width: screenWidth - 40,
    backgroundColor: '#cbd1d0',
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 35,
  },

  subTitle: {
    width: '70%',
    fontSize: 14,
    color: 'rgba(56, 65, 55, 0.8)',
    marginVertical: 5,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '70%',
    color: 'rgba(56, 65, 55, 0.8)',
  },
});
