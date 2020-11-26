import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {Inline} from '../../components';
import {findBrand} from '../../utils';

export default function CardItem({card, onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Inline
        justify="space-between"
        components={[
          {
            id: 1,
            component: (
              <View>
                <Text style={styles.cardTxt}>Cartão de Crédito</Text>
                <Text style={styles.cardNumber}>{card.card_number}</Text>
              </View>
            ),
          },
          {
            id: 2,
            component: (
              <Image style={styles.brand} source={findBrand(card.brand).img} />
            ),
          },
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  brand: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  cardTxt: {
    fontSize: 18,
    color: '#444',
    fontWeight: 'bold',
  },
  cardNumber: {
    fontSize: 16,
    color: '#333',
  },
});
