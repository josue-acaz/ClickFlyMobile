import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import SlimButton from '../../../components/SlimButton';

export default function AboutDebit({onDimiss}) {
  return (
    <View style={styles.aboutDebit}>
      <Text style={styles.title}>Cartão de Débito</Text>
      <Text style={styles.message}>
        Função débito disponível apenas para as bandeiras{' '}
        <Text style={styles.bold}>Visa</Text> e{' '}
        <Text style={styles.bold}>Mastercard</Text>.
      </Text>
      <SlimButton justify="center" onPress={onDimiss} text="OK, entendi" />
    </View>
  );
}

const styles = StyleSheet.create({
  aboutDebit: {},
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  bold: {
    fontWeight: 'bold',
    color: '#555',
  },
});
