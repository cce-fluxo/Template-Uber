import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';

//import { Feather } from '@expo/vector-icons';

import { AirbnbRating } from 'react-native-ratings';

//
import api from '../../services/api';
import { colors } from '../../constants/theme';
import { useAuth } from '../../context/auth';
import { screenHeight, screenWidth } from '../../constants/dimensions';
import { showMessage } from 'react-native-flash-message';

export default function RatingModal({
  modalState,
  setModalState,
  collectInfo,
  navigation,
}) {
  const { user } = useAuth();
  //const [catadorRate, setCatadorRate] = useState({});
  let catadorRate = { score: '0' };

  function ratingCompleted(rating) {
    catadorRate.score = rating.toFixed(1);
  }

  async function rateCollect() {
    if (catadorRate.score < 1) {
      showMessage({
        message: 'Insira uma nota para a coleta',
        type: 'danger',
        icon: 'danger',
      });
    } else {
      try {
        const response = await api.patch(
          `/users/${user.id}/coleta/${collectInfo.id}/score`,
          catadorRate
        );
        showMessage({
          message: 'Coleta avaliada!',
          type: 'success',
          icon: 'success',
        });
      } catch (err) {
        showMessage({
          message: 'Não conseguimos avaliar a coleta',
          type: 'danger',
          icon: 'danger',
        });
        console.log(err);
      }

      console.log(catadorRate);
      setModalState(false);
      navigation.navigate('Home');
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalState}
      hideModalContentWhileAnimating={true}
      useNativeDriver={true}
      accessibilityRole={'switch'}
    >
      <View style={styles.modalView}>
        <Text style={styles.discriptionText}>Avalie a coleta realizada</Text>

        <AirbnbRating
          defaultRating={0}
          selectedColor={colors.primary + 'bf'}
          unSelectedColor={colors.primary + 40}
          size={30}
          showRating={false}
          onFinishRating={ratingCompleted}
          ratingContainerStyle={{ paddingVertical: 20 }}
        />

        <TouchableOpacity onPress={() => rateCollect()}>
          <View style={styles.containerContinue}>
            <Text style={styles.textButton}>AVALIAR</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  textButton: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  modalView: {
    marginTop: '50%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    justifyContent: 'space-evenly',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  containerContinue: {
    borderRadius: 5,
    width: screenWidth * 0.597,
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: screenHeight * 0.022,
    marginBottom: screenHeight * 0.022,
  },
  discriptionText: {
    width: '90%',
    fontSize: 20,
    textAlign: 'center',
    color: colors.primary + 'af',
    marginVertical: 10,
  },
});
