import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Platform} from 'react-native';
import {MaterialIndicator} from 'react-native-indicators';

const Button = ({
  text = '',
  onPress,
  children,
  style = {},
  disabled = false,
  processing = false,
  color = '#09354B',
  textColor = '#FFFFFF',
}) => {
  const disableStyle = disabled ? styles.disabled : {};
  const disableText = disabled ? styles.disabledText : {};

  return (
    <TouchableOpacity
      onPress={disabled ? () => {} : onPress}
      style={{
        ...styles.button,
        backgroundColor: color,
        ...style,
        ...disableStyle,
      }}>
      {children ? (
        children
      ) : (
        <>
          {processing ? (
            <MaterialIndicator size={30} color={'#09354B'} />
          ) : (
            <Text style={{...styles.text, color: textColor, ...disableText}}>
              {text}
            </Text>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 6,
    width: '100%',
    height: 50,
    shadowColor: '#999999',
    shadowOpacity: 0.4,
    elevation: Platform.OS === 'android' ? 1 : 5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  disabledText: {
    color: '#999',
  },
  disabled: {
    backgroundColor: '#e6e6e6',
  },
});

export default Button;
