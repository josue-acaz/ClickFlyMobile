import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const Button = ({
  text = '',
  onPress,
  children,
  style = {},
  disabled = false,
}) => {
  const disableStyle = disabled ? styles.disabled : {};
  const disableText = disabled ? styles.disabledText : {};

  return (
    <TouchableOpacity
      style={{...styles.button, ...style, ...disableStyle}}
      onPress={disabled ? () => {} : onPress}>
      {children ? (
        children
      ) : (
        <Text style={{...styles.text, ...disableText}}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#09354B',
    width: '100%',
    height: 50,
  },
  text: {
    fontWeight: 'bold',
    color: '#ffffff',
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
