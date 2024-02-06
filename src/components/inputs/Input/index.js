import React from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';

import { colors } from '../../../constants/theme';

const Input = props => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <>
      <TextInput
        style={[styles.textInput, hasError && styles.errorInput]}
        value={value}
        onChangeText={text => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...inputProps}
      />
      {errors[name] && touched[name] && (
        <Text style={styles.errorText}>{errors[name]}</Text>
      )}
      {/*{hasError && <Text style={styles.errorText}>{errors[name]}</Text>}*/}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 336,
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 4,
    marginVertical: 5,
    fontSize: 14,
    color: colors.inputText,
    marginTop: 15,
  },
  errorText: {
    fontSize: 10,
    color: colors.errorText,
  },
  errorInput: {
    borderColor: colors.inputErrorText,
  },
});

export default Input;
