import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';

const Input = ({
  placeholder,
  adorment = null,
  error = false,
  errorTxt = 'Este campo é obrigatório',
  value,
  onChangeText,
  keyboardType = 'default',
  autoCapitalize = 'none',
  secureTextEntry = false,
  autoCorrect = false,
  adormentPosition = 'start',
  styleAdorment,
}) => (
  <View style={styles.inputContainer}>
    <View style={styles.input}>
      {adorment && (
        <View
          style={{
            ...(adormentPosition === 'start'
              ? styles.adormentStart
              : styles.adormentEnd),
            ...styleAdorment,
          }}>
          {adorment}
        </View>
      )}
      <TextInput
        style={
          adorment
            ? adormentPosition === 'start'
              ? {...styles.textInput, ...styles.inputAdormentStart}
              : {...styles.textInput, ...styles.inputAdormentEnd}
            : styles.textInput
        }
        value={value}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        onChangeText={(text) => {
          onChangeText(text);
        }}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
      />
    </View>
    <View style={styles.error}>
      {error && <Text style={styles.errorTxt}>{errorTxt}</Text>}
    </View>
  </View>
);

const styles = StyleSheet.create({
  input: {
    position: 'relative',
  },
  inputContainer: {},
  textInput: {
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 18,
    backgroundColor: '#ffffff',
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 10,
    color: '#666666',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#f1f1f1',
  },
  inputAdormentEnd: {
    paddingRight: 42,
  },
  inputAdormentStart: {
    paddingLeft: 42,
  },
  adormentStart: {
    position: 'absolute',
    bottom: 20,
    left: 14,
    zIndex: 9,
  },
  adormentEnd: {
    position: 'absolute',
    bottom: 20,
    right: 14,
    zIndex: 9,
  },
  error: {
    marginLeft: 10,
  },
  errorTxt: {
    fontSize: 12,
    color: '#ffa6a6',
  },
});

export default Input;
