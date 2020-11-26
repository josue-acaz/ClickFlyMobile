import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AwaitIcon = () => (
  <MaterialCommunityIcons name="timer-sand" size={24} color="black" />
);

export default function PayAwait() {
  return (
    <View style={styles.await}>
      <AwaitIcon />
      <Text>Seu pagamento está em análise!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  await: {},
});
