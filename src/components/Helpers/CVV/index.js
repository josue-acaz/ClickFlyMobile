import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {Button} from '../../../components';
import cvv from '../../../assets/cvv.png';

export default function CVV({onDimiss}) {
  return (
    <View style={styles.cvv}>
      <Text style={styles.title}>Código de segurança</Text>
      <Text style={styles.message}>
        Digite o código de segurança (CVV) de 3 a 4 digitos que está escrito no
        verso do cartão.
      </Text>
      <View style={styles.imgContainer}>
        <Image source={cvv} style={styles.image} />
      </View>
      <Button
        style={styles.btn}
        color="#00B2A9"
        onPress={onDimiss}
        text="Ok, entendi"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cvv: {},
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
    width: 80,
    height: 50,
    resizeMode: 'contain',
  },
});
