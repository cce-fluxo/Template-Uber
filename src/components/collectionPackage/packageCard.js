import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/theme';
import { Feather } from '@expo/vector-icons';
import { screenWidth } from '../../constants/dimensions';

export default function PackageCard({ packageInformation, selectedPackage }) {
  const formatNeighborhoods = bairrosList => {
    return bairrosList.join(', ');
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        selectedPackage(packageInformation);
      }}
    >
      <View style={styles.detailsBox}>
        <Text style={styles.bairro}>
          {formatNeighborhoods(packageInformation?.bairros)}
        </Text>
        <Text style={styles.hourTitle}>{packageInformation?.horario}</Text>
        {packageInformation?.coletas.length > 1 ? (
          <Text style={styles.quatity}>
            {packageInformation?.coletas.length} coletas
          </Text>
        ) : (
          <Text style={styles.quatity}>1 coleta</Text>
        )}
      </View>

      <View
        style={{
          flexDirection: 'column',
          alignItems: 'right',
          justifyContent: 'space-between',
          left: '85%',
          position: 'absolute',
          alignItems: 'flex-end',
        }}
      >
        {/* <Text style={styles.price}>R${packageInformation.valor}</Text> */}
        <View>
          <Feather name="arrow-right" size={30} color={colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 80,
    width: screenWidth - 100,
    flexDirection: 'row',
    backgroundColor: colors.primary + 40,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 7,
    paddingVertical: 7,
  },

  title: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    maxWidth: '92.5%',
    color: 'rgba(56, 65, 55, 0.8)',
  },
  price: {
    fontSize: 14,
    color: colors.font,
    fontWeight: '800',
    marginVertical: 5,
  },
  quatity: {
    fontSize: 14,
    color: colors.font,
  },
  bairro: {
    fontSize: 18,
    color: colors.font,
    minWidth: '80%',
    maxWidth: '90%',
  },
  hourTitle: {
    fontSize: 14,
    color: colors.font,
  },
  detailsBox: {
    marginLeft: 20,
  },
});
