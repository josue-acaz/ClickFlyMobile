import React, {useState} from 'react';
import {StyleSheet, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Input from '../../components/Input';
import {getCardBrand, maskCardNumber} from '../../utils';
import {brands} from '../../constants';

const LockIcon = () => (
  <MaterialIcons name="lock-outline" size={24} color="#666666" />
);

export default function CardInput({
  placeholder,
  error = false,
  value,
  onChangeText,
}) {
  const [flag, setFlag] = useState(null);

  // encontra a bandeira adequada do cartão
  function findBrand(brand) {
    return brands.find((x) => x.label === brand);
  }

  function handleChange(e) {
    const brand = getCardBrand(e.value.split(/\s/).join(''));
    setFlag(brand);
    onChangeText({name: e.name, value: e.value}, brand);
  }

  return (
    <Input
      value={value}
      adorment={
        flag ? (
          <Image style={styles.brand} source={findBrand(flag).img} />
        ) : (
          <LockIcon />
        )
      }
      adormentPosition="end"
      keyboardType="numeric"
      styleAdorment={flag ? styles.icon : {}}
      placeholder={placeholder}
      onChangeText={(text) => {
        if (text.length <= 19 || text === '') {
          handleChange({
            name: 'card_number',
            value: maskCardNumber(text),
          });
        }
      }}
      error={error}
    />
  );
}

const styles = StyleSheet.create({
  brand: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
  },
  icon: {
    bottom: 15,
  },
});
