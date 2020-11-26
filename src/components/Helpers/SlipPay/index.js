import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Button} from '../../../components';
import boleto from '../../../assets/boleto.png';

export default function SlipPay({onDimiss}) {
  return (
    <View style={styles.slipPay}>
      <Text style={styles.title}>Boleto bancário</Text>
      <Text style={styles.message}>
        O pagamento com boleto bancário pode levar até 3 dias para compensar,
        nesse intervalo sua reserva ficará em espera até que seja confirmado o
        pagamento.
      </Text>
      <View style={styles.imgContainer}>
        <Image source={boleto} style={styles.image} />
      </View>

      <Button color="#00B2A9" text="OK, entendi" onPress={onDimiss} />
    </View>
  );
}

const styles = StyleSheet.create({
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
  imgContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  image: {
    width: 50,
    height: 65,
    resizeMode: 'contain',
  },
});
