import React from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ArrowBackIcon = () => (
  <Ionicons name="md-arrow-back" size={24} color="#09354B" />
);

export default function ArrowBack({onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <ArrowBackIcon />
    </TouchableOpacity>
  );
}
