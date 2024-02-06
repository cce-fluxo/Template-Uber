import React, { useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

import { colors } from "../../../../constants/theme";
import { Feather } from "@expo/vector-icons";
import UserAvatar from "react-native-user-avatar";
import { useAuth } from "../../../../context/auth";
import { screenHeight, screenWidth } from "../../../../constants/dimensions";

export default function ProfileScreen({ navigation }) {
  const { user } = useAuth();
  const nameOfUser = user?.name?.split("")[0];

  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      console.log("user eh: ", user);

      return () => {
        mounted = false;
      };
    }, [])
  );

  const numberOfPeopleOptions = [
    {
      name: "até 10 pessoas",
      id: 1,
    },
    {
      name: "10 a 50 pessoas",
      id: 2,
    },
    {
      name: "51 a 100 pessoas",
      id: 3,
    },
    {
      name: "101 a 500 pessoas",
      id: 4,
    },
    {
      name: "500+ pessoas",
      id: 5,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerMenu}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Feather name="menu" size={25} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meu perfil</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (user.tipo === "grande_gerador") {
              navigation.navigate("Edit Profile Grande Gerador");
            } else {
              navigation.navigate("Edit Profile User");
            }
          }}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.background}>
          <UserAvatar
            size={80}
            style={{ height: 75, width: 75, marginBottom: 20, marginTop: 10 }}
            name={nameOfUser}
            bgColor={colors.primary}
            textColor={colors.background}
          />

          <View>
            <Text style={styles.inputTitle}>Nome</Text>
            <View style={styles.input}>
              {/* <Text style={styles.textInput}>{user.name}</Text> */}
              <Text style={styles.textInput}>{user.name}</Text>
            </View>
          </View>

          <View>
            <Text style={styles.inputTitle}>E-mail</Text>
            <View style={styles.input}>
              {/* <Text style={styles.textInput}>{user.name}</Text> */}
              <Text style={styles.textInput}>{user.email}</Text>
            </View>
          </View>

          {user?.tipo == "grande_gerador" && (
            <>
              <View>
                <Text style={styles.inputTitle}>CPF</Text>
                <View style={styles.input}>
                  <Text style={styles.textInput}>
                    {user?.grande_gerador?.cpf}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.inputTitle}>CNPJ</Text>
                <View style={styles.input}>
                  <Text style={styles.textInput}>
                    {user?.grande_gerador?.cnpj}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.inputTitle}>Razão Social</Text>
                <View style={styles.input}>
                  <Text style={styles.textInput}>
                    {user?.grande_gerador?.razao_social}
                  </Text>
                </View>
              </View>

              <View>
                <Text style={styles.inputTitle}>Número de Pessoas</Text>
                <View style={styles.input}>
                  <Text style={styles.textInput}>
                    {
                      numberOfPeopleOptions.filter(
                        (option) =>
                          option.id === user?.grande_gerador?.numero_pessoas
                      )[0]?.name
                    }
                  </Text>
                </View>
              </View>
            </>
          )}

          <View>
            <Text style={styles.inputTitle}>Telefone</Text>
            <View style={styles.input}>
              {/* <Text style={styles.textInput}>{user.name}</Text> */}
              <Text style={styles.textInput}>{user.celular}</Text>
            </View>
          </View>

          <View>
            <Text style={styles.inputTitle}>Endereço</Text>
            <View style={styles.input}>
              {/* <Text style={styles.textInput}>{user.name}</Text> */}
              <Text style={styles.textInput}>{user.address}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View>
              <Text style={styles.inputTitle}>Número</Text>
              <View style={styles.inputShortLeft}>
                {/* <Text style={styles.textInput}>{user.name}</Text> */}
                <Text style={styles.textInput}>{user.number}</Text>
              </View>
            </View>

            <View>
              <Text style={styles.inputTitle}>Complemento</Text>
              <View style={styles.inputLongRight}>
                {/* <Text style={styles.textInput}>{user.name}</Text> */}
                <Text style={styles.textInput}>{user.complement}</Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View>
              <Text style={styles.inputTitle}>Bairro</Text>
              <View style={styles.inputLongLeft}>
                {/* <Text style={styles.textInput}>{user.name}</Text> */}
                <Text style={styles.textInput}>{user.neighbourhood}</Text>
              </View>
            </View>

            <View>
              <Text style={styles.inputTitleShortRight}>CEP</Text>
              <View style={styles.inputShortRight}>
                {/* <Text style={styles.textInput}>{user.name}</Text> */}
                <Text style={styles.textInput}>{user.cep}</Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View>
              <Text style={styles.inputTitle}>Cidade</Text>
              <View style={styles.inputLongLeft}>
                {/* <Text style={styles.textInput}>{user.name}</Text> */}
                <Text style={styles.textInput}>{user.city}</Text>
              </View>
            </View>

            <View>
              <Text style={styles.inputTitleShortRight}>Estado</Text>
              <View style={styles.inputShortRight}>
                {/* <Text style={styles.textInput}>{user.name}</Text> */}
                <Text style={styles.textInput}>{user.state}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerMenu: {
    height: 50,
    paddingLeft: 20,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: "400",
    textAlign: "center",
    paddingLeft: "27%",
  },
  input: {
    width: screenWidth * 0.8876,
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.01,
    marginVertical: screenHeight * 0.0073,
    fontSize: screenHeight * 0.02,
    color: colors.font,
    marginBottom: screenHeight * 0.022,
    justifyContent: "center",
  },
  inputLongRight: {
    width: screenWidth * 0.502,
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.01,
    marginVertical: screenHeight * 0.0073,
    fontSize: screenHeight * 0.02,
    color: colors.font,
    marginBottom: screenHeight * 0.022,
    justifyContent: "center",
  },
  inputShortRight: {
    width: screenWidth * 0.359,
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.01,
    marginVertical: screenHeight * 0.0073,
    fontSize: screenHeight * 0.02,
    color: colors.font,
    marginBottom: screenHeight * 0.022,
    marginLeft: 10,
    justifyContent: "center",
  },
  inputShortLeft: {
    width: screenWidth * 0.359,
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.01,
    marginVertical: screenHeight * 0.0073,
    fontSize: screenHeight * 0.02,
    color: colors.font,
    marginBottom: screenHeight * 0.022,
    marginRight: 10,
    justifyContent: "center",
  },
  inputLongLeft: {
    width: screenWidth * 0.502,
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.01,
    marginVertical: screenHeight * 0.0073,
    fontSize: screenHeight * 0.02,
    color: colors.font,
    marginBottom: screenHeight * 0.022,
    justifyContent: "center",
  },
  inputTitle: {
    paddingLeft: 5,
    color: colors.primary,
    fontSize: 15,
  },
  textInput: {
    color: colors.font,
    fontSize: 14,
  },
  inputTitleShortRight: {
    paddingLeft: 15,
    color: colors.primary,
    fontSize: 15,
  },
  button: {
    borderRadius: 5,
    width: 55,
    height: 22,
    borderColor: colors.primary,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "18%",
    marginTop: screenHeight * 0.0293,
    marginBottom: screenHeight * 0.0293,
  },
  buttonText: {
    fontSize: screenHeight * 0.02,
    color: colors.primary,
  },
});
