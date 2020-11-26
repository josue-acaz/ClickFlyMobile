import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Error = ({text = 'Campo obrigatório', style}) => (
  <Text style={{...styles.error, ...style}}>{text}</Text>
);

const styles = StyleSheet.create({
  error: {
    fontSize: 12,
    color: '#ffa6a6',
    zIndex: 1,
  },
});

export default Error;
