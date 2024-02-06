import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";

import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import UserAvatar from "react-native-user-avatar";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";

import { colors } from "../../../constants/theme";
import ScoreLabel from "../../../components/common/scoreLabel";
import { useAuth } from "../../../context/auth";
import { SafeAreaView } from "react-native-safe-area-context";

export function DrawerCatador(props) {
  const { user, signOut } = useAuth();
  const nameOfUser = user?.name?.split("")[0];

  const handleSignOut = () => {
    Alert.alert(
      "Sair",
      "Você deseja sair?",
      [
        {
          text: "Cancelar",
          onPress: () => {
            return null;
          },
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: () => {
            signOut();
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  // requsição do nome do usuário... utilizar no side menu: no campo do nome e no avatar de iniciais

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Profile Catador");
            }}
          >
            <View style={styles.userInfoSection}>
              <View
                style={{
                  height: 80,
                  marginBottom: 2,
                }}
              >
                {user?.catador?.img_url ? (
                  <Image
                    source={{
                      uri: user?.catador?.img_url,
                    }}
                    style={{
                      height: 75,
                      width: 75,
                      marginBottom: 5,
                      marginTop: 10,
                      borderRadius: 200,
                      //backgroundColor: colors.primary,
                    }}
                  />
                ) : (
                  <UserAvatar
                    size={80}
                    style={{
                      height: 75,
                      width: 75,
                      marginBottom: 5,
                      marginTop: 10,
                    }}
                    name={nameOfUser}
                    bgColor={colors.primary}
                    textColor={colors.background}
                  />
                )}
              </View>
              <View>
                <Text style={styles.title}>
                  {user.name}
                  {/*Nome do Usuário*/}
                </Text>
                {/*<Text style={styles.title}>{user?.name}</Text>*/}
                <ScoreLabel rate={user?.catador?.score_media} />
              </View>
            </View>
          </TouchableOpacity>

          <DrawerItem
            icon={({ size }) => (
              <Feather name="home" color={colors.primary} size={size} />
            )}
            label="Home"
            onPress={() => {
              props.navigation.reset({
                index: 0,
                routes: [{ name: "Home Catador Routes" }],
              });
            }}
          />

          <DrawerItem
            icon={({ size }) => (
              <MaterialCommunityIcons
                name="calendar-check"
                color={colors.primary}
                size={size}
              />
            )}
            label="Aceitar Coleta"
            onPress={() => {
              props.navigation.navigate("Accept Collect");
            }}
          />
          <DrawerItem
            icon={({ size }) => (
              <Feather name="calendar" color={colors.primary} size={size} />
            )}
            label="Minhas Coletas"
            onPress={() => {
              props.navigation.navigate("Collections");
            }}
          />

          <DrawerItem
            icon={({ size }) => (
              <Feather name="map-pin" color={colors.primary} size={size} />
            )}
            label="Meus Check-ins"
            onPress={() => {
              props.navigation.navigate("Checkin");
            }}
          />

          <DrawerItem
            icon={({ size }) => (
              <MaterialCommunityIcons
                name="cash-multiple"
                color={colors.primary}
                size={size}
              />
            )}
            label="Transações"
            onPress={() => {
              props.navigation.navigate("Transactions");
            }}
          />

          <DrawerItem
            icon={({ size }) => (
              <MaterialCommunityIcons
                name="wallet-outline"
                color={colors.primary}
                size={size}
              />
            )}
            label="Saques"
            onPress={() => {
              props.navigation.navigate("RequestWithdraw");
            }}
          />

          <DrawerItem
            icon={({ size }) => (
              <MaterialCommunityIcons
                name="percent-outline"
                color={colors.primary}
                size={size}
              />
            )}
            label="Vendas"
            onPress={() => {
              props.navigation.navigate("Sales");
            }}
          />

          <DrawerItem
            icon={({ size }) => (
              <Feather name="help-circle" color={colors.primary} size={size} />
            )}
            label="Como funciona?"
            // onPress={() => {
            //   props.navigation.navigate('HowWorks');
            // }}
            onPress={() => {
              Linking.openURL("https://www.reciclesiri.com.br/ajuda");
            }}
          />

          {/* <DrawerItem
            icon={({ size }) => (
              <Feather name="gift" color={colors.primary} size={size} />
            )}
            label="Benefícios"
            onPress={() => {
              props.navigation.navigate('Benefits');
            }}
          /> */}

          <DrawerItem
            icon={({ size }) => (
              <Feather name="user" color={colors.primary} size={size} />
            )}
            label="Perfil"
            onPress={() => {
              props.navigation.navigate("Profile Catador");
            }}
          />
        </View>
      </DrawerContentScrollView>
      <DrawerItem
        icon={({ size }) => (
          <Feather name="log-out" color={colors.primary} size={size} />
        )}
        label="Sair"
        onPress={handleSignOut}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: "bold",
    color: colors.font,
    marginBottom: 5,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});
