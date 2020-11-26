import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Label = ({text}) => <Text style={styles.label}>{text}</Text>;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#888',
  },
});

export default Label;
