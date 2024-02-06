import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

//
import { Modalize } from 'react-native-modalize';

//
import { colors } from '../../constants/theme';
import { screenHeight, screenWidth } from '../../constants/dimensions';

export default function InsertCupomModal({ modalRef, setCupom }) {
  const [localCupom, setLocalCupom] = useState('');

  const handleCupom = () => {
    setCupom(localCupom);
    console.log(localCupom);
    modalRef.current?.close();
    setLocalCupom('');
  };

  return (
    <>
      <Modalize ref={modalRef} adjustToContentHeight={true}>
        <ScrollView contentContainerStyle={styles.backgroud}>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 20,
                width: '86%',
              }}
            >
              <Text style={styles.modalTitle}>Cupom de campanha</Text>
            </View>

            <TextInput
              style={styles.input}
              name="cupom"
              placeholder="Cupom campanha"
              value={localCupom}
              autoCapitalize="characters"
              onChangeText={value => setLocalCupom(value.toUpperCase())}
            />

            <TouchableOpacity
              style={styles.containerSave}
              onPress={handleCupom}
            >
              <Text style={styles.textSave}>SALVAR</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </Modalize>
    </>
  );
}

const styles = StyleSheet.create({
  backgroud: {
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: screenWidth * 0.8876,
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.01,
    marginVertical: screenHeight * 0.0073,
    fontSize: screenHeight * 0.02,
    color: colors.font,
    marginBottom: screenHeight * 0.022,
    justifyContent: 'center',
  },
  inputTitle: {
    paddingLeft: 30,
    color: colors.primary,
    fontSize: 15,
    alignSelf: 'flex-start',
  },
  modalTitle: {
    color: colors.primary,
    fontSize: 18,
  },
  textInput: {
    color: colors.inputText,
  },
  containerSave: {
    borderRadius: 5,
    width: screenWidth * 0.8876,
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: screenHeight * 0.022,
    marginBottom: screenHeight * 0.05,
  },
  textSave: {
    fontSize: screenHeight * 0.0205,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonText: {
    fontSize: screenHeight * 0.018,
    color: colors.primary,
  },
});
