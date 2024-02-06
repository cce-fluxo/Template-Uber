import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../../constants/theme';

const FacebookButton = props => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}> {props.name} </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    width: 336,
    height: 36,
    borderColor: colors.primary,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    fontSize: 14,
    color: colors.primary,
  },
});

export default FacebookButton;
