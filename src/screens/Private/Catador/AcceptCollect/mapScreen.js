import React, { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import MapView from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";

import { colors } from "../../../../constants/theme";
import { screenHeight, screenWidth } from "../../../../constants/dimensions";
import MapCard from "../../../../components/mapCards/cardMap";
import EmptyPlacesCard from "../../../../components/mapCards/emptyPlacesCard";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MapPackageScreen({ navigation, route }) {
  const { collectionList } = route.params;
  const mapView = useRef(null);
  const placesList = useRef(null);

  useEffect(() => {
    mapView.current.forceUpdate();
  }, []);

  function goToDetails(collect_info) {
    navigation.navigate("AcceptCollectDetailsScreen", {
      itemInformation: collect_info,
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerShadows}>
        <View style={styles.headerMenu}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Feather
              name="arrow-left"
              size={25}
              color={colors.primary}
              style={{ marginLeft: 20 }}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mapa das Coletas</Text>
          <View style={styles.refreshMapButton} />
        </View>
      </View>

      {/* )} */}
      {/* {loadingLocation || loadingCollects ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : ( */}
      <View style={styles.background}>
        <MapView
          ref={mapView}
          style={styles.mapView}
          initialRegion={{
            latitude: collectionList[0].latitude,
            longitude: collectionList[0].longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          showsMyLocationButton
          showsUserLocation={true}
          provider={PROVIDER_GOOGLE}
        >
          {collectionList.map((place) => (
            <MapView.Marker
              ref={(mark) => (place.mark = mark)}
              style={{ opacity: 0.85 }}
              key={place.id}
              coordinate={{
                latitude: place.latitude,
                longitude: place.longitude,
              }}
              onPress={() => {
                placesList.current.scrollToIndex({
                  animated: true,
                  index: collectionList.indexOf(place),
                });
              }}
            />
          ))}
        </MapView>

        {collectionList.length < 1 ? (
          <View style={styles.placesContainer}>
            <EmptyPlacesCard />
          </View>
        ) : (
          <FlatList
            ref={placesList}
            pagingEnabled
            contentContainerStyle={{
              alignItems: "center",
            }}
            contentInset={{ right: 20, top: 0, left: 0, bottom: 0 }}
            style={styles.placesContainer}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={collectionList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <MapCard collectInformation={item} goToDetails={goToDetails} />
            )}
            onMomentumScrollEnd={(e) => {
              const scrolled = e.nativeEvent.contentOffset.x;
              const place =
                scrolled > 0 ? Math.floor(scrolled / screenWidth) : 0;
              const { latitude, longitude } = collectionList[place];

              mapView.current.animateToRegion(
                { latitude: latitude, longitude: longitude },
                500
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },

  mapView: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "red",
  },
  refreshMapButton: {
    position: "absolute",
    left: "85%",
    top: screenHeight * 0.07,
    borderRadius: 100,
    height: 40,
    width: 40,
    //backgroundColor: colors.primary + 80,
    alignItems: "center",
    justifyContent: "center",
  },
  placesContainer: {
    width: "100%",
    maxHeight: 200,
  },
  headerMenu: {
    height: 50,
    paddingLeft: 0,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomColor: colors.inputText,
    borderBottomWidth: 0.2,
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: "400",
    textAlign: "center",
    paddingLeft: "19%",
  },
});
