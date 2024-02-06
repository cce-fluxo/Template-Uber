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
import { Formik } from 'formik';
import * as yup from 'yup';
import { TextInputMask } from 'react-native-masked-text';
import { Modalize } from 'react-native-modalize';
import { Feather } from '@expo/vector-icons';

//
import getAddress from '../../services/getAddress';
import { colors } from '../../constants/theme';
import { useAuth } from '../../context/auth';
import { screenHeight, screenWidth } from '../../constants/dimensions';
import { values } from '../../constants/prices';

export default function InsertAddressModal({ modalRef, setCollectAddress }) {
  const { user } = useAuth();

  const initialCleanedValues = {
    cep: '',
    address: '',
    neighbourhood: '',
    city: '',
    state: '',
    number: '',
    complement: '',
  };

  const addressValidationSchema = yup.object().shape({
    cep: yup
      .string()
      .matches(/\d/, 'Entre com um CEP válido')
      .min(9, ({ min }) => 'Entre com um CEP válido')
      .required('CEP é obrigatório'),
    number: yup
      .string()
      .matches(/\d/, 'Entre com um número válido')
      .required('Número é obrigatório'),
    //.required('Número é obrigatório'),
    address: yup.string().matches(/(\w.+\s).+/, 'Entre com a rua completa'),
    //.required('Rua é obrigatória'),
    state: yup.string().matches(/\w/, 'Entre com seu Estado'),
    //.required('Estado é obrigatório'),
    city: yup.string().matches(/\w/, 'Entre com sua Cidade'),
    //.required('Cidade é obrigatória'),
    neighbourhood: yup.string().matches(/\w/, 'Entre com seu Bairro'),
    // .required('Bairro é obrigatório'),
  });

  // para a busca de endereço pelo cep
  async function searchAddress(cep) {
    await getAddress(cep, addressSearch);
    setAddress(addressSearch.rua);
    setCity(addressSearch.cidade);
    setState(addressSearch.estado);
    setNeighbourhood(addressSearch.bairro);
  }

  const verifyForSearchAddress = value => {
    if (value.length >= 9) {
      searchAddress(value);
    }
  };

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [neighbourhood, setNeighbourhood] = useState('');

  var addressSearch = {
    rua: '',
    bairro: '',
    cidade: '',
    estado: '',
  };

  const fillAddressValues = (values, neighbourhood, state, address, city) => {
    const data = values;
    data.neighbourhood = neighbourhood;
    data.state = state;
    data.address = address;
    data.city = city;

    //console.log(data);

    return data;
  };

  return (
    <>
      <Modalize ref={modalRef} adjustToContentHeight={true}>
        <ScrollView keyboardShouldPersistTaps="always">
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          >
            <Formik
              validationSchema={addressValidationSchema}
              onSubmit={values => {
                setCollectAddress(
                  fillAddressValues(values, neighbourhood, state, address, city)
                );
                modalRef.current?.close();
              }}
              initialValues={initialCleanedValues}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
                touched,
              }) => (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '5%',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 20,
                      width: '86%',
                    }}
                  >
                    <Text style={styles.modalTitle}>
                      Meu endereço de coleta:
                    </Text>
                  </View>

                  <Text style={styles.inputTitle}>CEP</Text>
                  <TextInputMask
                    type={'zip-code'}
                    style={
                      errors.cep && touched.cep
                        ? styles.errorInput
                        : styles.input
                    }
                    name="cep"
                    placeholder="CEP"
                    keyboardType="number-pad"
                    maxLength={9}
                    value={values.cep}
                    onChangeText={handleChange('cep')}
                    onBlur={handleBlur('cep')}
                    onEndEditing={verifyForSearchAddress(values.cep)}
                  />

                  {errors.cep && touched.cep && (
                    <Text style={styles.errorText}>{errors.cep}</Text>
                  )}

                  <Text style={styles.inputTitle}>Endereço</Text>
                  <TextInput
                    style={
                      errors.address && touched.address
                        ? styles.errorInput
                        : styles.input
                    }
                    editable={false}
                    name="address"
                    placeholder="Rua"
                    value={address}
                    onChangeText={rua => setAddress(rua)}
                    autoCapitalize="words"
                    onBlur={handleBlur('address')}
                  />
                  {errors.address && touched.address && (
                    <Text style={styles.errorText}>{errors.address}</Text>
                  )}

                  <Text style={styles.inputTitle}>Número</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <TextInput
                      style={
                        errors.number && touched.number
                          ? styles.errorInputShort
                          : styles.inputDoubleNumber
                      }
                      name="number"
                      placeholder="Número"
                      keyboardType="phone-pad"
                      maxLength={8}
                      value={values.number}
                      onChangeText={handleChange('number')}
                      onBlur={handleBlur('number')}
                    />

                    <View
                      style={{ justifyContent: 'space-around', marginTop: -18 }}
                    >
                      <Text style={styles.inputTitleLongRight}>
                        Complemento
                      </Text>

                      <TextInput
                        style={
                          errors.complement && touched.complement
                            ? styles.errorInputLong
                            : styles.inputDoubleLong
                        }
                        name="complement"
                        placeholder="Complemento"
                        value={values.complement}
                        onChangeText={handleChange('complement')}
                        onBlur={handleBlur('complement')}
                      />
                    </View>
                  </View>

                  {errors.number && touched.number && (
                    <Text style={styles.errorText}>{errors.number}</Text>
                  )}

                  {errors.complement && touched.complement && (
                    <Text style={styles.errorText}>{errors.complement}</Text>
                  )}

                  <Text style={styles.inputTitle}>Bairro</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <TextInput
                      style={
                        errors.neighbourhood && touched.neighbourhood
                          ? styles.errorInput
                          : styles.input
                      }
                      name="neighbourhood"
                      placeholder="Bairro"
                      editable={false}
                      value={neighbourhood}
                      onChangeText={text => setNeighbourhood(text)}
                      onBlur={handleBlur('neighbourhood')}
                    />
                  </View>

                  {errors.neighbourhood && touched.neighbourhood && (
                    <Text style={styles.errorText}>{errors.neighbourhood}</Text>
                  )}

                  <Text style={styles.inputTitle}>Cidade</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <TextInput
                      style={
                        errors.city && touched.city
                          ? styles.errorInputLong
                          : styles.inputDoubleLong
                      }
                      name="city"
                      placeholder="Cidade"
                      editable={false}
                      value={city}
                      onChangeText={city => setCity(city)}
                      onBlur={handleBlur('city')}
                    />

                    <View
                      style={{ justifyContent: 'space-around', marginTop: -18 }}
                    >
                      <Text style={styles.inputTitleShortRight}>Estado</Text>
                      <TextInput
                        style={
                          errors.state && touched.state
                            ? styles.errorInputShort
                            : styles.inputDoubleShort
                        }
                        name="state"
                        maxLength={2}
                        autoCapitalize="characters"
                        placeholder="Estado"
                        editable={false}
                        value={state}
                        onChangeText={state => setState(state)}
                        onBlur={handleBlur('state')}
                      />
                    </View>
                  </View>

                  {errors.city && touched.city && (
                    <Text style={styles.errorText}>{errors.city}</Text>
                  )}
                  {errors.state && touched.state && (
                    <Text style={styles.errorText}>{errors.state}</Text>
                  )}

                  <TouchableOpacity
                    style={styles.containerSave}
                    onPress={handleSubmit}
                    //disabled={!isValid}
                  >
                    <Text style={styles.textSave}>SALVAR</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </KeyboardAvoidingView>
        </ScrollView>
      </Modalize>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    marginBottom: 70,
    flex: 1,
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
  inputDoubleLong: {
    width: screenWidth * 0.502,
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.01,
    marginVertical: screenHeight * 0.0073,
    fontSize: screenHeight * 0.02,
    color: colors.font,
    marginBottom: screenHeight * 0.022,
  },
  inputDoubleShort: {
    width: screenWidth * 0.359,
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.01,
    marginVertical: screenHeight * 0.0073,
    fontSize: screenHeight * 0.02,
    color: colors.font,
    marginLeft: 10,
    marginBottom: screenHeight * 0.022,
  },
  inputDoubleNumber: {
    width: screenWidth * 0.359,
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.01,
    marginVertical: screenHeight * 0.0073,
    fontSize: screenHeight * 0.02,
    color: colors.font,
    marginRight: 10,
    marginBottom: screenHeight * 0.022,
  },
  errorText: {
    color: colors.fontError,
    fontSize: screenHeight * 0.016,
    alignSelf: 'center',
  },
  errorInput: {
    width: screenWidth * 0.8876,
    height: 50,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.01,
    marginVertical: screenHeight * 0.0073,
    fontSize: screenHeight * 0.02,
    color: colors.inputErrorText,
    borderColor: colors.inputErrorBorder,
    borderWidth: 2,
    borderStyle: 'solid',
    backgroundColor: colors.inputErrorBackground,
  },
  errorInputLong: {
    width: screenWidth * 0.502,
    height: 50,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.01,
    marginVertical: screenHeight * 0.0073,
    fontSize: screenHeight * 0.02,
    color: colors.inputErrorText,
    borderColor: colors.inputErrorBorder,
    borderWidth: 2,
    borderStyle: 'solid',
    backgroundColor: colors.inputErrorBackground,
  },
  errorInputShort: {
    width: screenWidth * 0.359,
    height: 50,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.01,
    marginVertical: screenHeight * 0.0073,
    fontSize: screenHeight * 0.02,
    color: colors.inputErrorText,
    borderColor: colors.inputErrorBorder,
    borderWidth: 2,
    borderStyle: 'solid',
    backgroundColor: colors.inputErrorBackground,
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
  inputTitleShortRight: {
    paddingLeft: 20,
    color: colors.primary,
    fontSize: 15,
  },
  inputTitleLongRight: {
    paddingLeft: 10,
    color: colors.primary,
    fontSize: 15,
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
  searchCEP: {
    backgroundColor: colors.primary + 80,
    borderRadius: 5,
    height: 50,
    width: screenHeight * 0.053,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    marginBottom: screenHeight * 0.015,
  },
  inputCEP: {
    width: screenWidth * 0.78,
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    marginVertical: screenHeight * 0.0073,
    fontSize: 15,
    color: colors.font,
    marginLeft: 10,
    marginBottom: screenHeight * 0.022,
  },
  errorInputCEP: {
    width: screenWidth * 0.78,
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    marginVertical: screenHeight * 0.0073,
    fontSize: 15,
    color: colors.font,
    marginLeft: 10,
    marginBottom: screenHeight * 0.022,
    color: colors.inputErrorText,
    borderColor: colors.inputErrorBorder,
    borderWidth: 2,
    borderStyle: 'solid',
    backgroundColor: colors.inputErrorBackground,
  },
});
