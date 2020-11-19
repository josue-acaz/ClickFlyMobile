import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import amex from '../../assets/amex.png';
import visa from '../../assets/visa.png';
import diners from '../../assets/diners.png';
import jcb from '../../assets/jcb.png';
import master from '../../assets/mastercard.png';
import discover from '../../assets/discover.png';

const HelpIcon = () => (
  <Ionicons name="ios-help-circle-outline" size={24} color="#666666" />
);

export default function PayHelp() {
  const brands = [
    {
      id: 1,
      label: 'Amex',
      img: amex,
    },
    {
      id: 2,
      label: 'Visa',
      img: visa,
    },
    {
      id: 3,
      label: 'Diners',
      img: diners,
    },
    {
      id: 4,
      label: 'JCB',
      img: jcb,
    },
    {
      id: 5,
      label: 'Master',
      img: master,
    },
    {
      id: 6,
      label: 'Discover',
      img: discover,
    },
  ];

  return (
    <View style={styles.payHelp}>
      <View style={styles.consult}>
        <Text style={styles.consultTxt}>
          Para utilizar débito, consulte as condições de uso.
        </Text>
        <View style={styles.help}>
          <TouchableOpacity style={styles.helpBtn}>
            <HelpIcon />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.brands}>
        {brands.map((brand) => (
          <Image style={styles.img} source={brand.img} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  payHelp: {
    width: '65%',
  },
  consultTxt: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  consult: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  brands: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  img: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
  },
});
