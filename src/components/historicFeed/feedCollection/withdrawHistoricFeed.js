import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import EmptyHistoricCard from "../cardCollection/emptyHistoricCard";
import WithdrawCard from "../cardCollection/withdrawCard";

export default function WithdrawalHistoricFeed({
  collectionList,
  goToDetails,
}) {
  return (
    <>
      <FlatList
        contentContainerStyle={styles.container}
        vertical={true}
        data={collectionList}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<EmptyHistoricCard />}
        renderItem={({ item }) => (
          <WithdrawCard
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
    alignItems: "center",
    justifyContent: "center",
  },
});
