import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { screenHeight, screenWidth } from '../../constants/dimensions';
import { colors } from '../../constants/theme';
import { Feather } from '@expo/vector-icons';

import { useAuth } from '../../context/auth';

export default function ScoreLabel({ rate }) {
  const { user } = useAuth();
  //const nota = 4.42;

  return (
    <View style={styles.container}>
      <Feather name="star" color="#fff" size={18} />
      <Text style={styles.grade}>{rate?.toFixed(1)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    width: screenWidth * 0.154,
    height: screenHeight * 0.034,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    borderRadius: screenHeight * 0.034,
    marginTop: 2,
  },
  grade: {
    color: '#fff',
    fontWeight: '700',
  },
});
