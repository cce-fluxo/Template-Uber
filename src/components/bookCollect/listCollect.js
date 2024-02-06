import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';

import { screenHeight, screenWidth } from '../../constants/dimensions';
import { colors } from '../../constants/theme';
import ItemCollectionCard from './itemCollectionCard';
import EmptyCartCard from './emptyCartCard';

export default function CollectList({ cartList, removeItem, openCartModal }) {
  return (
    <View style={styles.container}>
      <View style={styles.listTitleView}>
        <Text style={styles.listTitle}>Itens da coleta:</Text>
        <Text style={styles.listCounterText}>{cartList.length}</Text>
        {/* <Text style={styles.listTitle}>R${cartPrice}</Text> */}
      </View>
      {cartList.length > 0 ? (
        <FlatList
          data={cartList}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <ItemCollectionCard
              itemInformation={item}
              removeItem={removeItem}
            />
          )}
        />
      ) : (
        <EmptyCartCard openCartModal={openCartModal} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
  },
  listTitle: {
    marginBottom: screenHeight * 0.01,
    paddingLeft: screenWidth * 0.0264,
    color: colors.font,
    fontSize: 15,
    marginTop: screenHeight * 0.026,
  },
  listCounterText: {
    marginBottom: screenHeight * 0.01,
    color: colors.font,
    fontSize: 15,
    marginTop: screenHeight * 0.026,
    paddingRight: screenWidth * 0.0264,
  },
  cardContainer: {
    marginTop: 13,
    height: 50,
    width: screenWidth * 0.892,
    flexDirection: 'row',
    backgroundColor: 'rgba(23, 72, 45, 0.06)',
    borderRadius: 10,
    alignItems: 'center',
    paddingLeft: screenWidth * 0.0528,
    marginTop: screenHeight * 0.01,
    marginBottom: screenHeight * 0.01,
    justifyContent: 'flex-end',
  },
  cardIdCompleted: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  cardIdNotCompleted: {
    fontSize: 14,
    color: colors.inputText,
    fontWeight: '600',
  },
  iconPicker: {
    paddingRight: -(screenWidth * 0.0264),
  },
  enterButton: {
    marginRight: screenWidth * 0.0264,
  },
  errorText: {
    color: colors.fontError,
    fontSize: screenHeight * 0.0161,
    alignSelf: 'center',
  },
  quotaView: {
    height: 65,
    width: screenWidth * 0.66,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quotaNumber: {
    color: colors.primary,
    fontSize: 35,
    alignSelf: 'center',
  },
  listTitleView: {
    flexDirection: 'row',
    width: screenWidth * 0.893,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: screenWidth * 0.0264,
  },
});
