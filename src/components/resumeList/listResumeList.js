import React, { useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";

import { screenHeight, screenWidth } from "../../constants/dimensions";
import { colors } from "../../constants/theme";

import CardResumeList from "./cardResumeList";

export default function ListResumeList({ cartList }) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.listTitleView}>
          <Text style={styles.subTitle}>Itens da coleta:</Text>
          <Text style={styles.listCounterText}>{cartList?.length}</Text>
        </View>
        <View style={styles.cardContainer}>
          <Text style={styles.cardId}>Qtd</Text>
          <Text style={styles.sizeText}>Tamanho</Text>
          <Text style={styles.materialText}>Material</Text>
        </View>
        <FlatList
          data={cartList}
          scrollEnabled={cartList?.length >= 11 ? true : false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CardResumeList itemInformation={item} />}
        />
        {/* {cartList.map((index, item) => (
          <CardResumeList itemInformation={item} />
        ))} */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  listTitle: {
    marginBottom: screenHeight * 0.01,
    paddingLeft: screenWidth * 0.0264,
    color: colors.primary,
    fontSize: 15,
    marginTop: screenHeight * 0,
  },
  listCounterText: {
    color: colors.font,
    fontSize: 16,
    fontWeight: "600",
    paddingRight: screenWidth * 0.04,
  },
  listTitleView: {
    flexDirection: "row",
    width: screenWidth * 0.98,
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: screenWidth * 0.0264,
    marginBottom: 20,
  },
  cardContainer: {
    width: screenWidth * 0.893,
    flexDirection: "row",
    borderRadius: 10,
    justifyContent: "space-between",
    marginLeft: -screenWidth * 0.03,
    marginTop: screenHeight * 0.005,
    marginBottom: screenHeight * 0.04,
  },
  cardId: {
    position: "absolute",
    left: 15,
    fontSize: 16,
    color: colors.primary,
    fontWeight: "bold",
  },
  materialText: {
    position: "absolute",
    fontSize: 16,
    color: colors.primary,
    left: screenWidth * 0.462,
    fontWeight: "bold",
  },
  sizeText: {
    position: "absolute",
    left: screenWidth * 0.066,
    fontSize: 16,
    paddingHorizontal: screenWidth * 0.106,
    color: colors.primary,
    paddingRight: screenWidth * 0.184,
    fontWeight: "bold",
  },
  subTitle: {
    color: colors.font,
    fontSize: 16,
    paddingLeft: 20,
  },
});
