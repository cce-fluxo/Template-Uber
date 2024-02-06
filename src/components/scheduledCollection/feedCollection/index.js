import React from "react";
import { View, StyleSheet, FlatList, RefreshControl } from "react-native";
import { screenHeight } from "../../../constants/dimensions";

import CatadorCollectionCard from "../cardCollection";

export default function CatadorCollectionFeed({
  collectionList,
  goToDetails,
  refreshFeed,
  refreshLoad,
}) {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      vertical={true}
      showsVerticalScrollIndicator={false}
      data={collectionList}
      //bounces={false}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        <RefreshControl refreshing={refreshLoad} onRefresh={refreshFeed} />
      }
      renderItem={({ item }) => (
        <CatadorCollectionCard
          collectionInformation={item}
          goToDetails={goToDetails}
          refreshLoad={refreshLoad}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    height: screenHeight * 0.8,
  },
});
