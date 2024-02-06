import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../../constants/theme';

const NewAccountButton = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Nova Conta')}
    >
      <Text style={styles.buttonText}>NOVA CONTA</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    width: 134,
    height: 36,
    borderColor: colors.primary,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: '50%',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 14,
    color: colors.primary,
  },
});

export default NewAccountButton;
