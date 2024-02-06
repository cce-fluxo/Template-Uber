import React, { useState, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import { format, addDays } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../../constants/theme";
import { screenHeight, screenWidth } from "../../../../constants/dimensions";
import api from "../../../../services/api";
import { useAuth } from "../../../../context/auth";
import UserCalendarCard from "../../../../components/calendarCard/userCalendarCard";
import CatadorCalendarCard from "../../../../components/calendarCard/catadorCalendarCard";
import EmptyCollectionsCard from "../../../../components/scheduledCollection/cardCollection/emptyCollectionsCard";
import PackageCard from "../../../../components/collectionPackage/packageCard";
import RecurrentCard from "../../../../components/recurrentCard";
export default function CollectionsScreen({ navigation }) {
  const { user } = useAuth();

  const [myCollection, setMyCollection] = useState([]);
  const [myCollectionRecurrent, setMyCollectionRecurrent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingRecurrent, setLoadingRecurrent] = useState(false);

  // request to fetch my next collections from backend
  async function myNextCollections() {
    try {
      setLoading(true);
      const response = await api.get(
        `/users/${user.id}/coletas?filter=cancelada;eq;False&filter=entregue;eq;False`
        // `/users/${user.id}/coletas?calendar=true`
      );
      setMyCollection(response.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  async function GetRecurrentCollections() {
    try {
      setLoadingRecurrent(true);
      const response = await api.get(
        `/coletas_recorrentes/user`
        // `/users/${user.id}/coletas?calendar=true`
      );
      console.log(response.data);
      setMyCollectionRecurrent(response.data);
    } catch (err) {
      console.log(err);
    }
    setLoadingRecurrent(false);
  }

  // const mappedData = myCollection.map(coleta => {
  //   const date = new Date(coleta.date);
  //   return {
  //     ...coleta,
  //     formatedDate: format(date, 'yyyy-MM-dd'),
  //   };
  // });

  // let reduced = {};
  // let arraySameDate = [];

  // for (item in mappedData) {
  //   try {
  //     reduced[mappedData[item]['formatedDate']].push(mappedData[item]);
  //   } catch {
  //     arraySameDate.push(mappedData[item]);
  //     reduced[mappedData[item]['formatedDate']] = arraySameDate;
  //   }
  //   arraySameDate = [];
  // }

  // format date

  function packageComumList(mappedData) {
    let group = mappedData.reduce((r, a) => {
      r[a.date] = [...(r[a.date] || []), a];
      return r;
    }, {});

    let arrayOfObj = Object.entries(group).map((e) => ({
      date: e[0],
      pacotes: e[1],
    }));

    return arrayOfObj;
  }

  function formatDate(date) {
    const newDate = new Date(date);
    return format(newDate, "dd MMM", { locale: ptBR });
  }

  //console.log(reduced);

  const [refreshing, setRefreshing] = useState(false);

  var pacoteComum = packageComumList(myCollection);

  function organizarColetasPorDia(coletas) {
    const diasSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];

    // Inicializa o objeto de retorno com os dias da semana como chaves vazias
    const coletasPorDia = diasSemana.reduce((acc, dia) => {
      acc[dia] = [];
      return acc;
    }, {});

    // Organiza as coletas por dia da semana e horário
    coletas.forEach((coleta) => {
      const dia = coleta.weekday;
      coletasPorDia[dia].push(coleta);
    });

    // Ordena as coletas dentro de cada dia da semana
    for (const dia in coletasPorDia) {
      coletasPorDia[dia].sort((a, b) => {
        const horarios = ["Manhã", "Tarde", "Noite"];
        const aIndex = horarios.indexOf(a.horario);
        const bIndex = horarios.indexOf(b.horario);
        return aIndex - bIndex;
      });
    }

    // Filtra os dias sem coletas
    const diasComColetas = Object.keys(coletasPorDia).filter(
      (dia) => coletasPorDia[dia].length > 0
    );

    // Cria um novo objeto apenas com os dias com coletas
    const coletasPorDiaComColetas = diasComColetas.reduce((acc, dia) => {
      acc[dia] = coletasPorDia[dia];
      return acc;
    }, {});
    return coletasPorDiaComColetas;
  }

  var pacoteRecorrente = organizarColetasPorDia(myCollectionRecurrent);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    myNextCollections();
    GetRecurrentCollections();
    setRefreshing(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      myNextCollections();
      GetRecurrentCollections();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerMenu}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Feather name="menu" size={25} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Minhas Coletas</Text>
      </View>

      <View style={styles.optionsDiv}>
        <View style={styles.optionButtonSelected}>
          <Text style={styles.textSelected}>Agenda</Text>
        </View>

        <TouchableOpacity
          style={styles.optionButtonNotSelected}
          onPress={() => navigation.navigate("Historic")}
        >
          <Text style={styles.textNotSelected}>Histórico</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ height: screenHeight * 0.9 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={{ marginTop: 20 }}>
            <View>
              <Text style={styles.categoryText}>Coletas Recorrentes:</Text>
            </View>
            {loadingRecurrent ? (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  height: screenHeight * 0.2,
                }}
              >
                <ActivityIndicator size="large" color={colors.primary} />
              </View>
            ) : Object.keys(pacoteRecorrente).length !== 0 ? (
              <View>
                {Object.keys(pacoteRecorrente)?.map((dia, index) => (
                  <View key={index} style={styles.datesContainer}>
                    <View style={styles.dateBox}>
                      <Text style={styles.datesSubtitle}>{dia}</Text>
                    </View>
                    <View style={styles.packageContainer}>
                      {pacoteRecorrente[dia]?.map((pacote, index) => (
                        <RecurrentCard
                          key={index}
                          navigation={navigation}
                          collectionInformation={pacote}
                        />
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <EmptyCollectionsCard
                title="Sem coleta recorrente"
                subtitle="Crie uma nova coleta recorrente"
                navigate={() =>
                  navigation.navigate("BookCollect", { isRecurrent: recurrent })
                }
              />
            )}
          </View>

          <View style={{ marginTop: 20 }}>
            <View>
              <Text style={styles.categoryText}>Coletas Agendadas:</Text>
            </View>
            {loading ? (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  height: screenHeight * 0.2,
                }}
              >
                <ActivityIndicator size="large" color={colors.primary} />
              </View>
            ) : myCollection.length > 0 ? (
              <View>
                {pacoteComum.map((grupo, index) => (
                  <View key={index} style={styles.datesContainer}>
                    <View style={styles.dateBox}>
                      <Text style={styles.datesNumber}>
                        {formatDate(grupo.date).split(" ")[0]}
                      </Text>
                      <Text style={styles.datesSubtitle}>
                        {formatDate(grupo.date).split(" ")[1]}
                      </Text>
                    </View>
                    <View style={styles.packageContainer}>
                      {grupo?.pacotes.map((pacote, index) =>
                        user.tipo == "comum" ||
                        user.tipo == "grande_gerador" ? (
                          <UserCalendarCard
                            key={index}
                            navigation={navigation}
                            collectionInformation={pacote}
                          />
                        ) : (
                          <CatadorCalendarCard
                            key={index}
                            navigation={navigation}
                            collectionInformation={pacote}
                          />
                        )
                      )}
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <EmptyCollectionsCard />
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    position: "absolute",
    left: "33.5%",
  },
  textSelected: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  optionButtonSelected: {
    width: "50%",
    borderBottomColor: colors.primary,
    borderBottomWidth: 2,
  },
  textNotSelected: {
    color: colors.inputText,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  optionButtonNotSelected: {
    width: "50%",
    borderBottomColor: colors.background,
    borderBottomWidth: 2,
  },
  optionsDiv: {
    flexDirection: "row",
    borderTopColor: colors.inputBackground,
    borderTopWidth: 1,
    alignItems: "center",
  },
  datesSubtitle: {
    fontSize: screenWidth * 0.056,
    textAlign: "right",
    color: colors.font,
    width: 40,
    marginTop: -5,
  },
  datesNumber: {
    fontSize: 28,
    textAlign: "right",
    color: colors.font,
    width: 40,
  },
  dateBox: {
    marginLeft: 20,
    marginTop: 20,
  },
  datesContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  categoryText: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 10,
    color: colors.primary,
  },
});
