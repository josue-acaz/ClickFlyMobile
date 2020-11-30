import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ArrowBackIcon = ({color}) => (
  <Ionicons name="md-arrow-back" size={24} color={color} />
);

export default function ArrowBack({onPress, color = '#09354B', style}) {
  return (
    <TouchableOpacity style={{...styles.arrow, ...style}} onPress={onPress}>
      <ArrowBackIcon color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  arrow: {
    marginTop: 10,
  },
});
