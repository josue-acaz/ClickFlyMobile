import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Subtitle = ({text = '', style}) => (
  <Text style={{...styles.subtitle, ...style}}>{text}</Text>
);

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
});

export default Subtitle;
