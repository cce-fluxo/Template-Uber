import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

import { colors } from '../../../../constants/theme';
import { Feather } from '@expo/vector-icons';

export default function BenefitsScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerMenu}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Feather name="menu" size={25} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Benefícios</Text>
      </View>
      <View style={styles.background}>
        <Image
          style={styles.image}
          source={require('../../../../assets/dummyLogo.png')}
        />

        <View style={styles.textBuildingContainer}>
          <Text style={styles.textBuilding}>
            Página de benefícios em construção.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    marginBottom: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerMenu: {
    marginTop: 20,
    height: 50,
    paddingLeft: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: '400',
    textAlign: 'center',
    position: 'absolute',
    left: '40%',
  },
});
