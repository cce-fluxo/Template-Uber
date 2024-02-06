import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Share,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import UserAvatar from "react-native-user-avatar";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import { colors } from "../../../../constants/theme";
import { useAuth } from "../../../../context/auth";
// import * as Sharing from 'expo-sharing';
import * as Linking from "expo-linking";

export function DrawerContent(props) {
  const inviteLink = "https://linktr.ee/appsiri";

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
            // navigation.dispatch(DrawerActions.openDrawer());
            signOut();
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  async function inviteFriends() {
    console.log(nameOfUser);
    try {
      const result = await Share.share({
        message: `Colete recicláveis de casa! Instale, também o aplicativo Siri ${inviteLink}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Profile User");
            }}
          >
            <View style={styles.userInfoSection}>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 15,
                  height: 80,
                  marginBottom: 2,
                }}
              >
                <UserAvatar
                  size={80}
                  style={{ height: 75, width: 75 }}
                  name={nameOfUser}
                  bgColor={colors.primary}
                  textColor={colors.background}
                />

                {/*
                <MaterialCommunityIcons
                  name="account-circle"
                  size={80}
                  color={colors.primary}
                />
              */}
              </View>
              <View>
                <Text style={styles.title}>
                  {user.name}
                  {/*Nome do Usuário*/}
                </Text>
                {/*<Text style={styles.title}>{user?.name}</Text>*/}
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
                routes: [{ name: "Home" }],
              });
            }}
          />

          <DrawerItem
            icon={({ size }) => (
              <MaterialCommunityIcons
                name="calendar-plus"
                color={colors.primary}
                size={size}
              />
            )}
            label="Agendar Coleta"
            onPress={() => {
              props.navigation.navigate("BookCollect");
            }}
          />

          <DrawerItem
            icon={({ size }) => (
              <Feather name="map-pin" color={colors.primary} size={size} />
            )}
            label="Coletar Agora"
            onPress={() => {
              props.navigation.navigate("CheckIn");
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
              <MaterialCommunityIcons
                name="wallet-plus-outline"
                color={colors.primary}
                size={size}
              />
            )}
            label="Adicionar créditos"
            onPress={() => {
              props.navigation.navigate("AddCredits");
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
          {/* 
          <DrawerItem
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
              props.navigation.navigate("Profile User");
            }}
          />

          <DrawerItem
            icon={({ size }) => (
              <Feather name="user-plus" color={colors.primary} size={size} />
            )}
            label="Convidar Amigos"
            onPress={() => {
              inviteFriends();
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
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
    color: colors.font,
    marginBottom: 20,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});
