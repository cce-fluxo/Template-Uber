import React, {
  useRef,
  useState,
  useImperativeHandle,
  useCallback,
  forwardRef,
} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

import { screenWidth } from '../../../constants/dimensions';
import { colors } from '../../../constants/theme';

function PasswordInput({ touched, error, style, ...rest }, ref) {
  const inputRef = useRef();
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    if (inputRef.current?.value) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  });

  return (
    <View style={{ height: 65 }}>
      <View
        style={[
          styles.inputContainer,
          touched && error ? styles.errorStyle : null,
          isFocused ? styles.focusedStyle : null,
          style,
        ]}
        {...rest}
      >
        <KeyboardAvoidingView behavior="position">
          <TextInput
            ref={inputRef}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            placeholderTextColor={colors.inputText}
            keyboardAppearance={'dark'}
            style={styles.inputText}
            {...rest}
          />
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: 336,
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 4,
    marginVertical: 5,
    fontSize: 18,
    color: colors.inputText,
    marginTop: 10,
    justifyContent: 'center',
  },
  focusedStyle: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  errorStyle: {
    borderWidth: 1,
    borderColor: colors.fontError,
  },
  inputText: {
    color: colors.inputText,
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
  },
});

export default forwardRef(PasswordInput);
