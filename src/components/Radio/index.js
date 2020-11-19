import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

export default function Radio({
  style,
  selected = '',
  value = '',
  onChange = (v) => {},
}) {
  return (
    <TouchableOpacity
      style={[styles.inputRadio, style]}
      onPress={() => {
        onChange(value);
      }}>
      {selected === value ? <View style={styles.radio} /> : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  inputRadio: {
    height: 16,
    width: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#09354B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radio: {
    height: 8,
    width: 8,
    borderRadius: 6,
    backgroundColor: '#09354B',
  },
});
