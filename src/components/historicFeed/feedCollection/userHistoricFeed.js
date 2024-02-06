import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import UserCollectionCard from '../cardCollection/userHistoricCard';
import EmptyHistoricCard from '../cardCollection/emptyHistoricCard';

export default function UserHistoricFeed({ collectionList, goToDetails }) {
  return (
    <>
      <FlatList
        contentContainerStyle={styles.container}
        vertical={true}
        data={collectionList}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<EmptyHistoricCard />}
        renderItem={({ item }) => (
          <UserCollectionCard
            collectionInformation={item}
            goToDetails={goToDetails}
          />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    //height: 360,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
