import React from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';

import CatadorHistoricCard from '../cardCollection';
import EmptyHistoricCard from '../cardCollection/emptyHistoricCard';

export default function CatadorCheckinHistoricFeed({
  collectionList,
  goToDetails,
  refreshFeed,
  refreshLoad,
}) {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      vertical={true}
      data={collectionList}
      ListEmptyComponent={<EmptyHistoricCard />}
      keyExtractor={item => item.id.toString()}
      //   refreshControl={
      //     <RefreshControl refreshing={refreshLoad} onRefresh={refreshFeed} />
      //   }
      renderItem={({ item }) => (
        <CatadorHistoricCard
          collectionInformation={item}
          goToDetails={goToDetails}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    //height: 360,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
