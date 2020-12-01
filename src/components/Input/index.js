import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HelpIcon = () => (
  <Ionicons name="ios-help-circle-outline" size={24} color="#666666" />
);

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
  onBlur,
  style,
  onHelp,
  helper = false,
}) => (
  <View style={styles.inputContainer}>
    <View style={styles.input}>
      {adorment && (
        <>
          {helper && (
            <View style={styles.helper}>
              <TouchableOpacity onPress={onHelp}>
                <HelpIcon />
              </TouchableOpacity>
            </View>
          )}
          <View
            style={{
              ...styles.adorment,
              ...(adormentPosition === 'start'
                ? styles.adormentStart
                : styles.adormentEnd),
              ...styleAdorment,
            }}>
            {adorment}
          </View>
        </>
      )}
      <TextInput
        style={{
          ...(adorment
            ? adormentPosition === 'start'
              ? {...styles.textInput, ...styles.inputAdormentStart}
              : {...styles.textInput, ...styles.inputAdormentEnd}
            : styles.textInput),
          ...style,
        }}
        value={value}
        keyboardType={keyboardType}
        onBlur={onBlur}
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
  inputContainer: {
    marginBottom: 12,
  },
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
  adorment: {
    position: 'absolute',
    zIndex: 9999,
  },
  helper: {
    position: 'absolute',
    zIndex: 9999,
    top: 4,
  },
  inputAdormentEnd: {
    paddingRight: 42,
  },
  inputAdormentStart: {
    paddingLeft: 42,
  },
  adormentStart: {
    bottom: 22,
    left: 14,
    zIndex: 9,
  },
  adormentEnd: {
    bottom: 22,
    right: 14,
    zIndex: 9,
  },
  error: {
    marginLeft: 10,
  },
  errorTxt: {
    fontSize: 12,
    color: '#ffa6a6',
    zIndex: 1,
  },
});

export default Input;
