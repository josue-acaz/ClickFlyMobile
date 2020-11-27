import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';

const FloatingButton = ({icon, color = '#ffffff', onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{...styles.floatingBtn, backgroundColor: color}}>
    {icon}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  floatingBtn: {
    position: 'absolute',
    bottom: getBottomSpace() > 0 ? getBottomSpace() : 10,
    right: 10,
    borderRadius: 2000,
    width: 55,
    height: 55,
    elevation: 1,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 1,
    shadowColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FloatingButton;
