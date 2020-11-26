import React from 'react';
import {View, StyleSheet} from 'react-native';

const Center = ({children, style}) => (
  <View style={{...styles.center, ...style}}>{children}</View>
);

const styles = StyleSheet.create({
  center: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Center;
