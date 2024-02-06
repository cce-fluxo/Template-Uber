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
import { showMessage } from 'react-native-flash-message';
import { colors } from '../../../constants/theme';
import { screenWidth, screenHeight } from '../../../constants/dimensions';
import api from '../../../services/api';

const ForgotPasswordScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const emailValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Entre com um endereço de e-mail válido')
      .required('Endereço de e-mail obrigatório'),
  });

  async function askForReset(email) {
    setLoading(true);
    try {
      console.log({ email });
      const response = await api.post('/users/pw', { email });

      navigation.navigate('Confirmar nova senha', { email });
    } catch (err) {
      showMessage({
        message: 'Erro ao redefenir a senha',
        description: err.response?.data?.msg,
        type: 'danger',
        icon: 'danger',
      });
      console.log(err);
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
            Informe o email cadastrado e um email com as instruções de
            recuperação será enviado.
          </Text>
        </View>

        <Formik
          validationSchema={emailValidationSchema}
          initialValues={{ email: '' }}
          onSubmit={values => askForReset(values.email)}
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
                  errors.email && touched.email
                    ? styles.errorInput
                    : styles.inputLogIn
                }
                placeholder="E-mail"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {errors.email && touched.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
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
    height: 150,
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
    marginTop: 15,
    marginBottom: 30,
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

export default ForgotPasswordScreen;
