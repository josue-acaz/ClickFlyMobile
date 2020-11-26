import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

const SlimButton = ({onPress, text, justify}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{...styles.btnAddPay, justifyContent: justify}}>
    <Text style={styles.btnAddPayTxt}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btnAddPayTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#00B2A9',
  },
  btnAddPay: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default SlimButton;
