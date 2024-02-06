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
import { Calendar } from "react-native-calendars";

import { colors } from "../../constants/theme";
import { screenHeight, screenWidth } from "../../constants/dimensions";

import { format, parseISO } from "date-fns";
import { Select } from "rn-option-select";

export default function CalendarModal({
  modalRef,
  data,
  handleChange,
  title,
  setData,
  values,
}) {
  function filterSelected(option) {
    if (option.selected == true) {
      return option;
    }
  }

  const [selected, setSelected] = useState("");

  //   const handleChangeData = (selectedOption) => {
  //     handleChange("data")(selectedOption.title);
  //     setData(selectedOption.value);

  //     modalRef.current.close();
  //   };

  let options = [];
  data?.map((e) =>
    options.push({
      title: `${e.name}`,
      value: `${e.id}`,
    })
  );

  return (
    <Modalize
      ref={modalRef}
      adjustToContentHeight={true}
      modalTopOffset={screenHeight * 0.04}
    >
      <Text style={styles.title}>{title}</Text>

      <View style={styles.container}>
        <Calendar
          onDayPress={(day) => {
            console.log("selected day", day);
            handleChange("data")(day.dateString);
            setSelected(day.dateString);
          }}
          style={{
            zIndex: 1000,
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: "orange",
            },
          }}
        />
      </View>
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
    paddingHorizontal: screenWidth * 0.049,
  },

  title: {
    paddingHorizontal: screenWidth * 0.079,
    color: colors.font,
    fontSize: screenHeight * 0.024,
    alignSelf: "flex-start",
    fontWeight: "600",
  },
});
