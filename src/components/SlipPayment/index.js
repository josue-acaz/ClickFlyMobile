import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VerticalSpaceBetween from '../../components/VerticalSpaceBetween';

const HelpIcon = () => (
  <Ionicons name="ios-help-circle-outline" size={24} color="#666666" />
);

export default function SlipPayment({onHelp}) {
  return (
    <View style={styles.slip}>
      <VerticalSpaceBetween
        components={[
          {
            id: 1,
            component: <Text style={styles.title}>Boleto Bancário</Text>,
          },
          {
            id: 2,
            component: (
              <Text style={styles.message}>
                Condições{' '}
                <TouchableOpacity onPress={onHelp} style={styles.btn}>
                  <HelpIcon />
                </TouchableOpacity>
              </Text>
            ),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  slip: {
    height: '100%',
  },
  title: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    color: '#666',
  },
  btn: {
    marginTop: -5,
  },
});
