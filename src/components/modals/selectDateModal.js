import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";

import { Feather, AntDesign } from "@expo/vector-icons";
import { Modalize } from "react-native-modalize";

import { colors } from "../../constants/theme";
import { screenHeight, screenWidth } from "../../constants/dimensions";

import { format, parseISO } from "date-fns";
import { Select } from "rn-option-select";
import { FlashMode } from "expo-camera";
import UserRecurrentCollectDetailsScreen from "../../screens/Private/MainScreen/userRecurrentCollectDetailsScreen";
import api from "../../services/api";

export default function SelectDateModal({
  modalRef,
  dates,
  selectDateHour,
  recurrent = false,
  callApi = false,
  loading = false,
  collectId,
}) {
  //const [selectedDate, setSelectedDate] = useState(null);

  // useEffect(() => {
  //   cleanData();
  // }, []);

  function filterSelected(option) {
    if (option.selected == true) {
      return option;
    }
  }

  // const cleanData = () => {
  //   setSelectedDate(null);
  // };

  const handleChange = async (selectedOption) => {
    let selectedDay = selectedOption.split(";")[0];
    let selectedHour = selectedOption.split(";")[1];

    selectDateHour(selectedDay, selectedHour);
    // cleanData();
    if (callApi) {
      try {
        console.log("collectId", collectId);
        console.log(selectedDay, selectedHour);
        response = await api.patch(`/coleta_recorrente/${collectId}`, {
          weekday: selectedDay,
          hour: selectedHour,
        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
        console.log(error.response.data);
      }
    }
    modalRef.current.close();
  };

  function formatOptions(date) {
    const parsed = parseISO(date);
    return format(parsed, "dd/MM/yy");
  }

  function ConvertToWeekDays(array) {
    const seen = {}; // objeto auxiliar para rastrear combinações de propriedades
    const orderedDays = ["Seg", "Ter", "Qua", "Qui", "Sex"]; // ordem desejada para os dias
    const orderedHours = ["Manhã", "Tarde", "Noite"]; // ordem desejada para as horas

    // função de comparação para ordenar os objetos com base nas propriedades 'dia' e 'hour'
    function compareObjects(a, b) {
      const dayA = orderedDays.indexOf(a.dia);
      const dayB = orderedDays.indexOf(b.dia);
      if (dayA !== dayB) {
        return dayA - dayB;
      } else {
        const hourA = orderedHours.indexOf(a.hour);
        const hourB = orderedHours.indexOf(b.hour);
        return hourA - hourB;
      }
    }

    // filtra os objetos com a mesma lógica da função anterior
    const filteredArray = array.filter((obj) => {
      const key = obj.dia + obj.hour;
      if (seen[key]) {
        return false; // se a combinação já foi vista, filtra o objeto
      } else {
        seen[key] = true; // marca a combinação como vista
        return true; // mantém o objeto no array
      }
    });

    // ordena o array resultante com base nas propriedades 'dia' e 'hour'
    const sortedArray = filteredArray.sort(compareObjects);

    return sortedArray;
  }

  let options = [];
  if (recurrent) {
    ConvertToWeekDays(dates)?.map((e) =>
      options.push({
        title: `${e.dia} - ${e.hour}`,
        value: `${e.dia};${e.hour}`,
      })
    );
  } else {
    dates?.map((e) =>
      options.push({
        title: `${formatOptions(e.date)} - ${e.hour}`,
        value: `${e.date};${e.hour}`,
      })
    );
  }

  return (
    <Modalize
      ref={modalRef}
      adjustToContentHeight={true}
      modalTopOffset={screenHeight * 0.04}
    >
      {dates.length == 0 ? (
        <Text style={styles.noDatesTitle}>
          Sem datas disponíveis nessa região
        </Text>
      ) : loading ? (
        <Text style={styles.noDatesTitle}>Carregando...</Text>
      ) : (
        // <>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <Text style={styles.title}>
            Escolha uma data disponível para seu bairro
          </Text>

          <View>
            <Select
              onOptionPress={(values) => {
                handleChange(values.filter(filterSelected)[0].value);
                //setSelectedDate(values.filter(filterSelected)[0].value);
              }}
              optionStyle={optionsStyle}
              options={options}
              selectedOption={
                <AntDesign
                  name="checkcircle"
                  size={22}
                  color={colors.primary}
                />
              }
            />
          </View>
        </ScrollView>
      )}
      {/* <TouchableOpacity
            disabled={selectedDate == null ? true : false}
            style={
              selectedDate == null
                ? styles.containerContinueDisable
                : styles.containerContinueEnable
            }
            onPress={() => {
              handleChange();
            }}
          >
            <Text style={styles.textContinue}>SELECIONAR</Text>
          </TouchableOpacity>
        </> */}
    </Modalize>
  );
}

const optionsStyle = {
  text: {
    color: colors.font,
  },
  container: {
    width: screenWidth * 0.8,
    borderBottomWidth: 1,
    borderColor: "rgba(191, 191, 191,0.7)",
    // height: screenHeight * 0.05,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: screenHeight * 0.05,
    paddingTop: screenHeight * 0.02,
  },
  titleBox: { marginTop: 30, paddingRight: 30 },
  subTitle: {
    color: colors.font,
    fontSize: 16,
    textAlign: "justify",
  },
  title: {
    marginBottom: screenHeight * 0.01,
    paddingHorizontal: screenWidth * 0.079,
    color: colors.font,
    fontSize: screenHeight * 0.024,
    alignSelf: "flex-start",
    fontWeight: "600",
  },
  noDatesTitle: {
    marginBottom: screenHeight * 0.01,
    paddingHorizontal: screenWidth * 0.079,
    color: colors.font,
    fontSize: screenHeight * 0.021,
    alignSelf: "center",
    paddingVertical: screenHeight * 0.03,
    fontWeight: "600",
    textAlign: "center",
  },
  containerContinueEnable: {
    borderRadius: 5,
    width: screenWidth * 0.887,
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: screenHeight * 0.05,
  },
  containerContinueDisable: {
    alignSelf: "center",
    marginBottom: screenHeight * 0.05,
    borderRadius: 5,
    width: screenWidth * 0.887,
    height: 50,
    backgroundColor: colors.inputText + "aa",
    justifyContent: "center",
    alignItems: "center",
  },
  textContinue: {
    fontSize: screenHeight * 0.02,
    fontWeight: "bold",
    color: "white",
  },
});
