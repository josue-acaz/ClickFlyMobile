import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';

const {height} = Dimensions.get('screen');
const BottomSpace = () => <View style={styles.space} />;

const styles = StyleSheet.create({
  space: {
    height: getBottomSpace() > 0 ? getBottomSpace() : height * 0.15, // 15% da altura
  },
});

export default BottomSpace;
