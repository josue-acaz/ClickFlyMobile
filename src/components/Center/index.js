import React from 'react';
import {View, StyleSheet} from 'react-native';

const Center = ({children}) => <View style={styles.center}>{children}</View>;

const styles = StyleSheet.create({
  center: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Center;
