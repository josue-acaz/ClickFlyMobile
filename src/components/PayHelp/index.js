import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {brands} from '../../constants';

const HelpIcon = () => (
  <Ionicons name="ios-help-circle-outline" size={24} color="#666666" />
);

export default function PayHelp({onHelp}) {
  return (
    <View style={styles.payHelp}>
      <View style={styles.consult}>
        <Text style={styles.consultTxt}>
          Para utilizar débito, consulte as condições de uso.{' '}
          <TouchableOpacity onPress={onHelp} style={styles.helpBtn}>
            <HelpIcon />
          </TouchableOpacity>
        </Text>
      </View>
      <View style={styles.brands}>
        {brands.map((brand, index) => {
          if (index < brands.length - 3) {
            return (
              <Image key={brand.id} style={styles.img} source={brand.img} />
            );
          }
        })}
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
    lineHeight: 22,
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
  helpBtn: {
    marginTop: -4,
  },
});
