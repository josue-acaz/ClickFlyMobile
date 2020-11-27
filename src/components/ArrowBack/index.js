import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ArrowBackIcon = () => (
  <Ionicons name="md-arrow-back" size={24} color="#09354B" />
);

export default function ArrowBack({onPress}) {
  return (
    <TouchableOpacity style={styles.arrow} onPress={onPress}>
      <ArrowBackIcon />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  arrow: {
    marginTop: 10,
  },
});
