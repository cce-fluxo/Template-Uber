import React from 'react';
import { StyleSheet, FlatList, RefreshControl } from 'react-native';

import UserCollectionCard from '../cardCollection/userCollectionCard';
import EmptyCollectionsCard from '../cardCollection/emptyCollectionsCard';

export default function UserCollectionFeed({
  collectionList,
  goToDetails,
  refreshFeed,
  refreshLoad,
}) {
  return (
    <>
      <FlatList
        contentContainerStyle={styles.container}
        vertical={true}
        showsVerticalScrollIndicator={false}
        data={collectionList}
        ListEmptyComponent={<EmptyCollectionsCard />}
        refreshControl={
          <RefreshControl refreshing={refreshLoad} onRefresh={refreshFeed} />
        }
        keyExtractor={item => item.id.toString()}
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
