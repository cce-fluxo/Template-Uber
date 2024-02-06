import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';

//
import { Feather } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';
//import { Feather } from '@expo/vector-icons';

import * as Linking from 'expo-linking';
//
import { colors } from '../../constants/theme';
import { screenHeight, screenWidth } from '../../constants/dimensions';

export default function HowCollectModal({ modalRef, navigation }) {
  function viewMore() {
    modalRef.current.close();
    // navigation.navigate('HowWorks');
    Linking.openURL('https://linktr.ee/appsiri');
  }

  const infoTexts = [
    {
      title: 'Como reciclar?',
      subtitle:
        '1. Separe todo o lixo da residência nas categorias de materiais recicláveis (papel, vidro, plástico, metal, entre outros)\n\n2. Higienize o que for possível e mantenha o lixo seco - o que não significa que você tenha que lavá-los, mas apenas remover o excesso de resíduos que eventualmente possam contaminá-los\n\n3. Classifique os resíduos para a coleta que será realizadas em sua casa, cada um deles deve ser separado em sacolas diferentes para serem descartados.\n\n4. Agende uma coleta pelo App Sirí e contribua para a preservação do meio ambiente',
    },
    {
      title: 'Qual tamanho escolher?',
      subtitle:
        'Para a escolha do tamanho do item na adição à coleta, tem-se as seguintes categorias:\n\n• Sacola Pequena: 15 litros (sacola de mercado)\n\n• Sacola Grande: 50 litros (saco de lixo comum)',
    },
  ];

  return (
    <Modalize ref={modalRef} modalTopOffset={screenHeight * 0.04}>
      <ScrollView style={styles.container}>
        {infoTexts.map((topic, index) => {
          return (
            <View key={index} style={styles.titleBox}>
              <Text style={styles.title}>{topic.title}</Text>
              <Text style={styles.subTitle}>{topic.subtitle}</Text>
            </View>
          );
        })}
        <TouchableOpacity
          onPress={() => viewMore()}
          style={{ marginTop: 20, alignItems: 'center', marginLeft: -30 }}
        >
          <Text style={styles.viewMore}>Saiba mais</Text>
        </TouchableOpacity>
      </ScrollView>
    </Modalize>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingBottom: screenHeight * 0.05,
  },
  titleBox: { marginTop: 30, paddingRight: 30 },
  subTitle: {
    color: colors.font,
    fontSize: 16,
    textAlign: 'justify',
  },
  title: {
    color: colors.font,
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  viewMore: {
    color: colors.font,
    fontSize: 14,
    textAlign: 'justify',
    textDecorationLine: 'underline',
  },
});
