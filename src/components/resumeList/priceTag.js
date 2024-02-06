import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { screenHeight, screenWidth } from '../../constants/dimensions';
import { colors } from '../../constants/theme';
import { useAuth } from '../../context/auth';

export default function PriceTagCard({ cartPrice }) {
  const { user } = useAuth();

  return (
    <>
      {/* <View
        style={{
          width: screenWidth * 0.893
          height: 20,
          marginTop: 5,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Text style={styles.walletSaldo}>
          Saldo na carteira: R${user.saldo},00
        </Text>
      </View> */}
      <View style={styles.cardContainer}>
        <Text style={styles.subTotalTitle}>Subtotal:</Text>
        <Text style={styles.priceText}>R${cartPrice.toFixed(2)}</Text>
      </View>
      <View style={styles.cardContainer}>
        {user.saldo > cartPrice ? (
          <>
            <Text style={styles.totalTitle}>TOTAL:</Text>
            <Text style={styles.totalText}>R${cartPrice.toFixed(2)}</Text>
          </>
        ) : (
          <>
            <Text style={styles.insuficientTitle}>TOTAL:</Text>
            <Text style={styles.insuficientText}>R${cartPrice.toFixed(2)}</Text>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 22,
    width: screenWidth * 0.893,
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'flex-end',
    marginTop: screenHeight * 0.002,
    alignItems: 'center',
  },
  subTotalTitle: {
    fontSize: 16,
    color: colors.font,
  },
  priceText: {
    fontSize: 16,
    paddingHorizontal: 5,
    color: colors.font,
  },
  totalTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.primary,
  },
  totalText: {
    fontSize: 17,
    paddingHorizontal: 5,
    color: colors.primary,
    fontWeight: 'bold',
  },
  insuficientTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.fontError,
  },
  insuficientText: {
    fontSize: 17,
    paddingHorizontal: 5,
    color: colors.fontError,
    fontWeight: 'bold',
  },
  walletSaldo: {
    fontSize: 13,
    paddingHorizontal: 5,
    color: colors.primary,
    fontWeight: 'bold',
  },
});
