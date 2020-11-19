import React from 'react';
import {Text, StyleSheet} from 'react-native';

export default function Title({text = ''}) {
  return <Text style={styles.title}>{text}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#09354B',
    textAlign: 'center',
  },
});
