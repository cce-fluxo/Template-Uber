import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../constants/theme';
import { screenHeight, screenWidth } from '../../../constants/dimensions';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { showMessage } from 'react-native-flash-message';

import { Feather } from '@expo/vector-icons';

import { useAuth } from '../../../context/auth';
import api from '../../../services/api';

export default function UserFinishCollect({ navigation, route }) {
  const { itemInformation } = route.params;
  const [pin, setPin] = useState('');
  const [loadingConfirm, setLoadingConfirm] = useState(false);

  console.log(itemInformation);

  const pinInput = useRef(null);

  const filledCode = () => {
    pinInput.current.blur();
  };

  async function confirmCollect() {
    if (pin.length < 6) {
      showMessage({
        message: 'Insira o código completo',
        type: 'danger',
        icon: 'danger',
      });
    } else {
      setLoadingConfirm(true);
      const objectForBack = { token: pin };
      console.log(objectForBack);
      try {
        const response = await api.post(
          `/users/${user.id}/coleta/${itemInformation.id}/confirmar`,
          objectForBack
        );
        showMessage({
          message: 'Coleta encerrada!',
          type: 'success',
          icon: 'success',
        });
        navigation.navigate('User Donate', {
          itemInformation: itemInformation,
        });
      } catch (err) {
        showMessage({
          message: 'Código incorreto!',
          type: 'danger',
          icon: 'danger',
        });
        console.log(err);
      }
      setLoadingConfirm(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerMenu}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Feather name="arrow-left" size={25} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Finalizar coleta</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={styles.finishModal}>
          <Feather name="check-circle" size={45} color={colors.primary} />
          <Text style={styles.discriptionText}>
            Para encerrar a coleta, insira o código informado pelo catador
          </Text>
          <SmoothPinCodeInput
            placeholder={
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 25,
                  opacity: 0.3,
                  backgroundColor: colors.primary,
                }}
              ></View>
            }
            mask={
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 25,
                  backgroundColor: colors.primary,
                }}
              ></View>
            }
            ref={pinInput}
            codeLength={6}
            maskDelay={1000}
            password={true}
            cellStyle={null}
            cellStyleFocused={null}
            value={pin}
            onTextChange={code => setPin(code)}
            onFulfill={() => filledCode()}
            keyboardType={'phone-pad'}
          />
        </View>
      </View>

      <TouchableOpacity
        style={
          pin == ''
            ? styles.containerFinishNotAvailable
            : styles.containerFinish
        }
        disabled={pin == ''}
        onPress={() => {
          confirmCollect();
        }}
      >
        {loadingConfirm ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.textFinish}>CONFIRMAR</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerMenu: {
    height: 50,
    paddingLeft: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: '400',
    textAlign: 'center',
    paddingLeft: '23%',
  },
  finishModal: {
    width: '90%',
    height: screenHeight * 0.4,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.primary + 15,
  },
  discriptionText: {
    width: '80%',
    fontSize: 18,
    textAlign: 'center',
    color: colors.font,
    marginVertical: 30,
  },
  containerFinish: {
    borderRadius: 5,
    width: screenWidth * 0.8876,
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: screenHeight * 0.022,
    marginBottom: screenHeight * 0.022,
    alignSelf: 'center',
  },
  containerFinishNotAvailable: {
    borderRadius: 5,
    width: screenWidth * 0.8876,
    height: 50,
    backgroundColor: colors.inputText + 'aa',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: screenHeight * 0.022,
    marginBottom: screenHeight * 0.022,
    alignSelf: 'center',
  },
  textFinish: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
