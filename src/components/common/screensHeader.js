import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { screenHeight, screenWidth } from '../../constants/dimensions';
import { colors } from '../../constants/theme';
import { Feather } from '@expo/vector-icons';

export default function ScreensHeader({ navigation, title }) {
  return (
    <View style={styles.headerMenu}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.openDrawer()}
      >
        <Feather name="menu" size={25} color={colors.primary} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerMenu: {
    //marginTop: screenHeight * 0.0293,
    height: 50,
    //width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    position: 'absolute',
    color: colors.primary,
    fontSize: 22,
    fontWeight: '400',
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    left: screenWidth * 0.053,
  },
});
