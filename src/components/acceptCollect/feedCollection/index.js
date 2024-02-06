import React from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { screenWidth } from "../../../constants/dimensions";

import AcceptCollectionCard from "../cardCollection";

export default function AcceptCollectionFeed({ collectionList, goToDetails }) {
  return (
    <View style={styles.container}>
      {collectionList.map((coleta, index) => {
        return (
          <AcceptCollectionCard
            key={index}
            collectionInformation={coleta}
            goToDetails={goToDetails}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
