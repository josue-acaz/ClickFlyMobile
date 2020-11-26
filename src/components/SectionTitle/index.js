import React from 'react';
import {Text, StyleSheet} from 'react-native';

export default function SectionTitle({text = '', align = 'center'}) {
  return <Text style={{...styles.title, textAlign: align}}>{text}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#09354B',
  },
});
