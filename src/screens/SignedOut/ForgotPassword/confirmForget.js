import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';

import { colors } from '../../../constants/theme';
import { screenWidth, screenHeight } from '../../../constants/dimensions';
import api from '../../../services/api';
import { showMessage } from 'react-native-flash-message';

const resetValidationSchema = yup.object().shape({
  pin: yup.string().required('PIN é obrigatório'),
  password: yup
    .string()
    .min(8, ({ min }) => `Senha deve ter no mínimo ${min} caracteres`)
    .required('Senha é obrigatório'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Senhas não são compatíveis')
    .required('Confirmar a senha é obrigatório'),
});

const ConfirmForgotPasswordScreen = ({ navigation, route }) => {
  const { email } = route.params;
  const [loading, setLoading] = useState(false);

  async function askForReset(pin, password) {
    setLoading(true);
    try {
      console.log({ pin, password, email });
      const response = await api.patch('/users/pw/reset', {
        pin: pin,
        password,
        email,
      });
      showMessage({
        message: 'Senha redefinida com sucesso!',
        type: 'success',
        icon: 'success',
      });
      navigation.popToTop();
    } catch (err) {
      showMessage({
        message: 'Erro ao redefenir a senha',
        description: err.response?.data?.msg,
        type: 'danger',
        icon: 'danger',
      });
      console.log(err.response?.data);
    }
    setLoading(false);
  }

  return (
    <View style={styles.background}>
      <KeyboardAvoidingView behavior="position">
        <View style={styles.textForgotContainer}>
          <Image
            style={styles.image}
            source={require('../../../assets/LogoSiri.png')}
          />

          <Text style={styles.textForgot}>
            Entre com o PIN enviado por email e insira sua nova senha
          </Text>
        </View>

        <Formik
          validationSchema={resetValidationSchema}
          initialValues={{ pin: '', password: '', confirmPassword: '' }}
          onSubmit={values => askForReset(values.pin, values.password)}
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
            <>
              <TextInput
                style={
                  errors.pin && touched.pin
                    ? styles.errorInput
                    : styles.inputLogIn
                }
                placeholder="PIN"
                onChangeText={handleChange('pin')}
                onBlur={handleBlur('pin')}
                value={values.pin}
                keyboardType="number-pad"
                autoCapitalize="none"
              />

              {errors.pin && touched.pin && (
                <Text style={styles.errorText}>{errors.pin}</Text>
              )}

              <TextInput
                style={
                  errors.password && touched.password
                    ? styles.errorInput
                    : styles.inputLogIn
                }
                name="password"
                placeholder="Nova senha"
                secureTextEntry
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
              />
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <TextInput
                style={
                  errors.confirmPassword && touched.confirmPassword
                    ? styles.errorInput
                    : styles.inputLogIn
                }
                name="confirmPassword"
                placeholder="Confirme sua nova senha*"
                secureTextEntry
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}

              <TouchableOpacity
                style={
                  !isValid
                    ? styles.containerSendNotAvailable
                    : styles.containerSend
                }
                onPress={handleSubmit}
                disabled={!isValid}
              >
                {loading ? (
                  <ActivityIndicator size="small" color={colors.background} />
                ) : (
                  <Text style={styles.textSend}>ENVIAR</Text>
                )}
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    marginBottom: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    marginTop: 20,
  },

  image: {
    resizeMode: 'contain',
    height: 200,
    alignSelf: 'center',
  },
  inputLogIn: {
    width: screenWidth * 0.8876,
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 4,
    marginVertical: 20,
    fontSize: 14,
    color: colors.inputText,
    marginTop: 15,
  },
  errorText: {
    color: colors.fontError,
    fontSize: 13,
    alignSelf: 'center',
  },

  errorInput: {
    width: screenWidth * 0.8876,
    height: 50,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 4,
    marginVertical: 20,
    fontSize: 14,
    color: colors.inputErrorText,
    borderColor: colors.inputErrorBorder,
    borderWidth: 2,
    borderStyle: 'solid',
    backgroundColor: colors.inputErrorBackground,
    marginTop: 15,
  },
  containerSend: {
    borderRadius: 5,
    width: screenWidth * 0.8876,
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: screenHeight * 0.07,
    marginBottom: screenHeight * 0.044,
  },
  textSend: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  textForgotContainer: {
    width: screenWidth * 0.8876,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textForgot: {
    color: colors.font,
    textAlign: 'center',
    fontSize: 16,
  },
  containerSendNotAvailable: {
    borderRadius: 5,
    width: screenWidth * 0.8876,
    height: 50,
    backgroundColor: colors.inputText + 'aa',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: screenHeight * 0.022,
    marginBottom: screenHeight * 0.044,
  },
});

export default ConfirmForgotPasswordScreen;
