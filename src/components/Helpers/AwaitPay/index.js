import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {SlimButton} from '../../../components';

export default function AboutDebit({onDimiss}) {
  return (
    <View style={styles.awaitpay}>
      <Text style={styles.title}>Aguardando pagamento</Text>
      <Text style={styles.message}>
        Os seus bilhetes seram liberados em breve, após a confirmação do pagamento.
      </Text>
      <SlimButton justify="center" onPress={onDimiss} text="OK, entendi" />
    </View>
  );
}

const styles = StyleSheet.create({
  awaitpay: {},
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
