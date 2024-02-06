import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';

import { Feather, AntDesign } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';
import { Select } from 'rn-option-select';

import { colors } from '../../constants/theme';
import { screenHeight, screenWidth } from '../../constants/dimensions';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function AddItemModal({ modalRef, prices, addItem }) {
  const [count, setCount] = useState(1);
  const [material, setMaterial] = useState(null);
  const [size, setSize] = useState(null);

  const [item, setItem] = useState({ value: null });

  useEffect(() => {
    cleanData();
    // mapOptionsArrays();
  }, []);

  const minusCounter = count => {
    if (count > 1) {
      setCount(count - 1);
      return count - 1;
    }
  };

  const plusCounter = count => {
    setCount(count + 1);
    return count + 1;
  };

  const materialsList = [
    { title: 'Plástico', value: 'Plástico' },
    { title: 'Papel', value: 'Papel' },
    { title: 'Metal', value: 'Metal' },
    { title: 'Vidro', value: 'Vidro' },
    { title: 'Óleo', value: 'Óleo' },
    { title: 'Misturado', value: 'Misturado' },
  ];

  const sizesList = [
    { title: 'Sacolinha de mercado', value: 'Pequeno' },
    { title: 'Saco de lixo', value: 'Médio' },
    { title: 'Latão de lixo', value: 'Grande' },
  ];

  // let materialsList = [];
  // let sizesList = [];

  function filterSelected(option) {
    if (option.selected == true) {
      return option;
    }
  }

  // const mapOptionsArrays = () => {
  //   console.log(prices);
  //   const materialsKeys = Object.keys(prices);
  //   materialsKeys.map(e => {
  //     materialsList.push({ title: e, value: e });
  //   });

  //   const firstObjName = materialsList[0].title;
  //   const sizesKeys = Object.keys(prices[firstObjName]);

  //   sizesKeys.map(e => {
  //     sizesList.push({ title: e, value: e });
  //   });
  // };

  const cleanData = () => {
    setMaterial(null);
    setSize(null);
    setCount(1);
  };

  const handleChange = () => {
    addItem(material, size, count);
    cleanData();
    modalRef.current.close();
  };

  return (
    <Modalize ref={modalRef} modalTopOffset={screenHeight * 0.04}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        <Text style={styles.title}>Escolha o material</Text>
        <View style={styles.optionsBox}>
          <Select
            onOptionPress={values => {
              setMaterial(values.filter(filterSelected)[0].value);
            }}
            optionStyle={optionsStyle}
            options={materialsList}
            selectedOption={
              <AntDesign name="checkcircle" size={22} color={colors.primary} />
            }
          />
        </View>
        <Text style={styles.title}>Escolha o tamanho</Text>
        <View style={styles.optionsBox}>
          <Select
            onOptionPress={values => {
              setSize(values.filter(filterSelected)[0].value);
            }}
            optionStyle={optionsStyle}
            options={sizesList}
            selectedOption={
              <AntDesign name="checkcircle" size={22} color={colors.primary} />
            }
          />
        </View>
        <Text style={styles.title}>Quantidade de sacolas</Text>
        <View style={styles.quotaView}>
          <TouchableOpacity
            onPress={() => {
              let i = minusCounter(count);
            }}
            disabled={count < 2 ? true : false}
          >
            <AntDesign
              name="minuscircle"
              size={35}
              color={count < 2 ? colors.inputText : colors.primary}
            />
          </TouchableOpacity>
          <Text style={styles.quotaNumber}>{count}</Text>
          <TouchableOpacity
            onPress={() => {
              let j = plusCounter(count);
            }}
          >
            <AntDesign name="pluscircle" size={35} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          disabled={material == null || size == null ? true : false}
          style={
            material == null || size == null
              ? styles.containerContinueDisable
              : styles.containerContinueEnable
          }
          onPress={() => {
            handleChange();
          }}
        >
          <Text style={styles.textContinue}>ADICIONAR</Text>
        </TouchableOpacity>
      </ScrollView>
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
    borderColor: 'rgba(191, 191, 191,0.7)',
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
    textAlign: 'justify',
  },
  quotaView: {
    height: 65,
    width: screenWidth * 0.66,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quotaNumber: {
    color: colors.primary,
    fontSize: 35,
    alignSelf: 'center',
  },
  title: {
    marginBottom: screenHeight * 0.01,
    paddingLeft: screenWidth * 0.079,
    color: colors.font,
    fontSize: screenHeight * 0.024,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  containerContinueEnable: {
    borderRadius: 5,
    width: screenWidth * 0.887,
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: screenHeight * 0.022,
    marginBottom: screenHeight * 0.022,
  },
  containerContinueDisable: {
    borderRadius: 5,
    width: screenWidth * 0.887,
    height: 50,
    backgroundColor: colors.inputText + 'aa',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: screenHeight * 0.022,
    marginBottom: screenHeight * 0.022,
  },
  textContinue: {
    fontSize: screenHeight * 0.02,
    fontWeight: 'bold',
    color: 'white',
  },
  optionsBox: {
    marginBottom: 30,
  },
});
