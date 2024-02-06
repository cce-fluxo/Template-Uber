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
import api from "../../services/api";

export default function SelectCompaniesModal({
  modalRef,
  handleChange,
  title,
  setData,
}) {
  const [companies, setCompanies] = useState([]);

  const getCompanies = async () => {
    try {
      const response = await api.get("/empresa/list");
      setCompanies(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  function filterSelected(option) {
    if (option.selected == true) {
      return option;
    }
  }

  const handleChangeData = (selectedOption) => {
    handleChange("numero_pessoas")(selectedOption.title);
    setData(selectedOption.value);

    modalRef.current.close();
  };

  let options = [];
  companies?.map((e) =>
    options.push({
      title: `${e.name}`,
      value: `${e.id}`,
    })
  );

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <Modalize
      ref={modalRef}
      adjustToContentHeight={true}
      modalTopOffset={screenHeight * 0.04}
    >
      {companies.length == 0 ? (
        <Text style={styles.noDatesTitle}>Sem empresas disponíveis</Text>
      ) : (
        // <>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <Text style={styles.title}>{title}</Text>

          <View>
            <Select
              onOptionPress={(values) => {
                handleChangeData(values.filter(filterSelected)[0]);
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
