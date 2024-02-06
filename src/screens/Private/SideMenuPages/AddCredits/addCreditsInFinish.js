import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../../constants/theme';
import { TextMask, TextInputMask } from 'react-native-masked-text';
import { screenHeight, screenWidth } from '../../../../constants/dimensions';
import { useAuth } from '../../../../context/auth';
import { Feather } from '@expo/vector-icons';

const AddCreditsInFinishScreen = ({ navigation }) => {
  const [value, setValue] = useState('0');

  const { user } = useAuth();

  const parseRealToFloat = price => {
    if (price) {
      var number_str = price.slice(2).replace('.', '').replace(',', '.');
      return parseFloat(number_str);
    }
  };

  const handleSubmit = () => {
    navigation.navigate('Payment Finish Screen', {
      value,
      previousPage: 'Add Credits Finish Screen',
    });
    setValue(0);
  };

  const validateValue = x => {
    const converted = parseRealToFloat(x);
    //console.log('converted = ' + converted);
    if (converted == NaN || converted == undefined || converted == null) {
      console.log('entrei');
      return true;
    } else if (converted <= 4.99) {
      return true;
    } else {
      return false;
    }
  };

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
        <Text style={styles.headerTitle}>Pagamento</Text>
      </View>
      <View style={styles.balanceView}>
        <Text style={styles.myBalance}>Meu saldo</Text>
        <TextMask
          style={styles.myBalanceValue}
          value={user?.saldo}
          type={'money'}
          options={{
            precision: 2,
            separator: ',',
            delimiter: '.',
            unit: 'R$',
            suffixUnit: '',
          }}
        />
      </View>
      <ScrollView keyboardDismissMode="on-drag" scrollEnabled={false}>
        <Text style={styles.title}>Adicione créditos à sua conta Sirí</Text>
        <Text style={styles.subTitle}>
          Escolha quanto deseja depositar via PIX
        </Text>
        <View style={styles.valueBox}>
          <TextInputMask
            autoFocus={true}
            style={styles.value}
            type={'money'}
            options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: 'R$',
            }}
            value={value}
            placeholder="0,00"
            onChangeText={text => setValue(text)}
            blurOnSubmit={true}
            autoFocus={false}
            onSubmitEditing={e => handleSubmit()}
          />
        </View>

        <TouchableOpacity
          disabled={validateValue(value) ? true : false}
          style={
            validateValue(value)
              ? styles.containerContinueDisable
              : styles.containerContinueEnable
          }
          onPress={handleSubmit}
        >
          <Text style={styles.textContinue}>CONTINUAR</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  background: {
    // marginBottom: 50,
    flex: 1,
    // backgroundColor: colors.background,
  },
  title: {
    color: colors.font,
    fontSize: 22,
    textAlign: 'center',
    marginTop: 25,
    width: screenWidth * 0.7,
    alignSelf: 'center',
  },
  subTitle: {
    color: colors.font,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 30,
    width: screenWidth * 0.6,
    alignSelf: 'center',
  },
  value: {
    color: colors.font,
    fontSize: 34,
    textAlign: 'center',
    marginVertical: 15,
  },
  valueBox: {
    backgroundColor: colors.primary + 24,
    height: screenHeight * 0.1,
    width: screenWidth * 0.62,
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    top: screenHeight * 0.06,
  },
  myBalanceValue: {
    color: colors.primary,
    fontSize: 14,
    textAlign: 'center',
  },
  myBalance: {
    fontSize: 14,
    color: colors.primary,
  },
  balanceView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    width: screenWidth * 0.85,
    alignSelf: 'center',
    backgroundColor: colors.primary + 10,
    justifyContent: 'space-between',
    paddingHorizontal: screenWidth * 0.06,
    borderWidth: 0.3,
    borderColor: colors.primary + 40,
    borderRadius: 10,
    marginVertical: 20,
  },
  keyboard: {
    alignItems: 'center',
    top: screenHeight * 0.03,
    justifyContent: 'flex-end',
  },
  containerContinueEnable: {
    borderRadius: 5,
    width: screenWidth * 0.887,
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: screenHeight * 0.1,
    top: screenHeight * 0.22,
  },
  containerContinueDisable: {
    borderRadius: 5,
    width: screenWidth * 0.887,
    height: 50,
    backgroundColor: colors.inputText + 'aa',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: screenHeight * 0.1,
    top: screenHeight * 0.22,
  },
  textContinue: {
    fontSize: screenHeight * 0.02,
    fontWeight: 'bold',
    color: 'white',
  },
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
    paddingLeft: '27%',
  },
});

export default AddCreditsInFinishScreen;
