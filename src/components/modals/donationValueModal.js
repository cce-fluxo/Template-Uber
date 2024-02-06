import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';

import { Modalize } from 'react-native-modalize';
import { TextInputMask } from 'react-native-masked-text';

import { colors } from '../../constants/theme';
import { screenHeight, screenWidth } from '../../constants/dimensions';

export default function DonationValueModal({ modalRef, setValue, value }) {
  return (
    <Modalize ref={modalRef} adjustToContentHeight={true}>
      <View style={styles.container}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>
            Entre com o valor que deseja dar de gorjeta
          </Text>
        </View>
        <TextInputMask
          autoFocus={true}
          style={styles.inputText}
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
          onSubmitEditing={e => modalRef.current.close()}
        />
      </View>
    </Modalize>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: screenHeight * 0.05,
    paddingTop: screenHeight * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleBox: {
    marginVertical: 30,
    paddingHorizontal: 30,
    width: screenWidth * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  subTitle: {
    color: colors.font,
    fontSize: 16,
    textAlign: 'justify',
  },
  title: {
    color: colors.font,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
  },

  containerContinueEnable: {
    borderRadius: 5,
    width: screenWidth * 0.887,
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: screenHeight * 0.05,
  },
  containerContinueDisable: {
    alignSelf: 'center',
    marginBottom: screenHeight * 0.05,
    borderRadius: 5,
    width: screenWidth * 0.887,
    height: 50,
    backgroundColor: colors.inputText + 'aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 30,
    // marginBottom: screenHeight * 0.2,
  },
  textContinue: {
    fontSize: screenHeight * 0.02,
    fontWeight: 'bold',
    color: 'white',
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
  keyboard: {
    alignItems: 'center',
    top: screenHeight * 0.1,
    // justifyContent: 'flex-end',
    marginBottom: screenHeight * 0.2,
  },
});
