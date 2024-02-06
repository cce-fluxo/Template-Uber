import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';

import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as yup from 'yup';
import { Formik } from 'formik';
import { TextInputMask } from 'react-native-masked-text';

import { colors } from '../../../../constants/theme';
import { useAuth } from '../../../../context/auth';
import { screenHeight, screenWidth } from '../../../../constants/dimensions';
import InsertCupomModal from '../../../../components/modals/insertCupomModal';
import ListResumeList from '../../../../components/resumeList/listResumeList';
import api from '../../../../services/api';

export default function ConfirmCheckInScreen({ navigation, route }) {
  // Auth
  const { user, setUser } = useAuth();

  // Navigation
  const { cartList } = route.params;

  // Local Storage
  const [loading, setLoading] = useState(false);
  const [cupom, setCupom] = useState('');

  const cupomModalRef = useRef(null);
  const openCupomModal = () => cupomModalRef.current?.open();

  // Location
  async function getMyLocation() {
    let { status } = await Location.requestPermissionsAsync();
    if (status === 'granted') {
      try {
        let location = await Location.getCurrentPositionAsync({
          accuracy:
            Platform.OS == 'ios'
              ? Location.Accuracy.Lowest
              : Location.Accuracy.Low,
        });
        return {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
      } catch (err) {
        showMessage({
          message: 'Não foi possível encontrar sua localização',
          type: 'danger',
          icon: 'danger',
        });
      }
    } else {
      throw new Error('Permissão de localização negada');
    }
  }

  let collectionCartInfo = {
    img_url: 'fluxo.webp',
    cpf: '',
    latitude: '',
    longitude: '',
    cupom,
  };

  const merginObject = (formatedCartList, cpf, lat, lon) => {
    collectionCartInfo.cpf = cpf;
    collectionCartInfo.latitude = lat;
    collectionCartInfo.longitude = lon;
    let completedCartList = formatedCartList.concat(collectionCartInfo);
    return completedCartList;
  };

  const removeItemPriceFromCartList = () => {
    let newCartList = [];
    cartList.map(e => {
      const id = e.id;
      const mat = e.mat;
      const quantity = e.quantity;
      const size = e.size;
      const newItem = { id, mat, quantity, size };
      newCartList.push(newItem);
    });
    return newCartList;
  };

  async function sendCart(values) {
    if (values.cpfCatador == null) {
      showMessage({
        message: 'CPF do catador não inserido',
        type: 'danger',
        icon: 'danger',
      });
    } else {
      setLoading(true);
      let locationObj = await getMyLocation();
      const formatedCartList = removeItemPriceFromCartList();
      const completedCart = await merginObject(
        formatedCartList,
        values.cpfCatador,
        locationObj.latitude,
        locationObj.longitude
      );
      console.log('List for back:', completedCart);
      setLoading(false);
      navigation.navigate('Score CheckIn', { cartCheckin: completedCart });
    }
  }

  const cpfValidationSchema = yup.object().shape({
    cpfCatador: yup
      .string()
      .matches(
        /[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$/,
        'Entre com CPF válido'
      )
      .required('CPF é obrigatório'),
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerMenu}>
        <TouchableOpacity onPress={() => navigation.navigate('CheckIn Screen')}>
          <Feather name="arrow-left" size={25} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Coletar Agora</Text>
        <TouchableOpacity onPress={openCupomModal} style={styles.hash}>
          <Feather name="hash" size={25} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.background}>
        <Text style={styles.inputTitle}>CPF do Catador</Text>
        <Formik
          validationSchema={cpfValidationSchema}
          initialValues={{ cpfCatador: '' }}
          onSubmit={values => sendCart(values)}
        >
          {({
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            errors,
            touched,
          }) => (
            <>
              <TextInputMask
                type={'cpf'}
                style={
                  errors.cpfCatador && touched.cpfCatador
                    ? styles.errorInput
                    : styles.input
                }
                name="cpfCatador"
                placeholder="Entre com o cpf do catador"
                placeholderTextColor={colors.inputText}
                keyboardType="number-pad"
                maxLength={14}
                value={values.cpfCatador}
                onChangeText={handleChange('cpfCatador')}
                onBlur={handleBlur('cpfCatador')}
              />
              {errors.cpfCatador && touched.cpfCatador && (
                <Text style={styles.errorText}>{errors.cpfCatador}</Text>
              )}

              <View style={{ height: 10 }} />
              <ListResumeList cartList={cartList} />

              <TouchableOpacity
                style={styles.containerContinue}
                onPress={handleSubmit}
              >
                {loading ? (
                  <ActivityIndicator size="small" color={colors.background} />
                ) : (
                  <Text style={styles.textContinue}>CONFIRMAR</Text>
                )}
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
      <InsertCupomModal setCupom={setCupom} modalRef={cupomModalRef} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    marginBottom: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  headerMenu: {
    height: 50,
    paddingLeft: screenWidth * 0.053,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerTitle: {
    color: colors.primary,
    fontSize: screenHeight * 0.0323,
    fontWeight: '400',
    textAlign: 'center',
    position: 'absolute',
    left: screenWidth * 0.297,
  },
  hash: {
    position: 'absolute',
    right: 20,
  },
  input: {
    flexDirection: 'row',
    width: screenWidth * 0.8876,
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.026,
    marginVertical: screenHeight * 0.0073,
    fontSize: 16,
    color: colors.font,
    marginBottom: screenHeight * 0.022,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputTitle: {
    marginBottom: screenHeight * 0.01,
    paddingLeft: screenWidth * 0.079,
    color: colors.primary,
    fontSize: screenHeight * 0.022,
    alignSelf: 'flex-start',
  },
  textInputPlaceHolder: {
    color: colors.inputText,
    width: screenWidth * 0.739,
  },
  textInput: {
    color: colors.font,
    width: screenWidth * 0.739,
  },
  containerContinue: {
    borderRadius: 5,
    width: screenWidth * 0.887,
    height: 50,
    backgroundColor: colors.primary,
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
  errorText: {
    color: colors.fontError,
    fontSize: screenHeight * 0.0161,
    alignSelf: 'center',
  },
  errorInput: {
    width: screenWidth * 0.8876,
    height: 50,
    borderRadius: 5,
    paddingLeft: screenWidth * 0.026,
    paddingRight: screenWidth * 0.01,
    marginVertical: screenHeight * 0.0073,
    fontSize: 16,
    color: colors.inputErrorText,
    borderColor: colors.inputErrorBorder,
    borderWidth: 2,
    borderStyle: 'solid',
    backgroundColor: colors.inputErrorBackground,
    marginTop: screenHeight * 0.022,
  },
});
