import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/theme';
import { Feather } from '@expo/vector-icons';
import { format } from 'date-fns';
import { screenHeight, screenWidth } from '../../constants/dimensions';

export default function MapCard({ collectInformation, goToDetails }) {
  delete collectInformation.mark;
  var date = format(new Date(collectInformation?.date), 'dd/MM/yy');

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>
          {collectInformation.address}, {collectInformation.number},{' '}
          {collectInformation.neighbourhood}
        </Text>
        <Text style={styles.dateTitle}>
          {date}, {collectInformation.horario}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '60%',
          left: '78%',
          position: 'absolute',
        }}
      >
        <TouchableOpacity
          onPress={() => {
            goToDetails(collectInformation);
          }}
        >
          <Feather name="arrow-right" size={35} color={colors.font} />
        </TouchableOpacity>
        <Text style={styles.price}>Ver mais</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 13,
    minHeight: 120,
    width: screenWidth - 40,
    flexDirection: 'row',
    backgroundColor: '#bcd6e0',
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
  },

  title: {
    width: screenWidth * 0.6,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    maxWidth: '92.5%',
    color: colors.font,
  },

  dateTitle: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.font,
    marginVertical: 5,
  },
  quantityTitle: {
    marginLeft: 10,
    fontSize: 14,
    color: colors.font,
  },
  price: {
    fontSize: 14,
    color: colors.font,
    fontWeight: '800',
    marginVertical: 5,
  },
});
