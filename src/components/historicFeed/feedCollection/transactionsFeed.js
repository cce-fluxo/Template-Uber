import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import EmptyHistoricCard from "../cardCollection/emptyHistoricCard";
import TransactionCard from "../cardCollection/transactionCard";
import { collapsable } from "deprecated-react-native-prop-types/DeprecatedViewPropTypes";

export default function TransactionFeed({ collectionList, goToDetails }) {
  list = collectionList.filter((item) =>
    ["Gorjeta", "Saque realizado", "Fundos adicionados"].includes(item?.type)
  );
  console.log("collectionlist", collectionList);
  return (
    <>
      <FlatList
        contentContainerStyle={styles.container}
        vertical={true}
        data={list}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <EmptyHistoricCard
            title="Histórico de transações vazio"
            subTitle="Faça agora sua primeira transação"
          />
        }
        renderItem={({ item }) => (
          <TransactionCard
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
