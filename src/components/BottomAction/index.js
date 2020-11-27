import React from 'react';
import {View, StyleSheet} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';

const BottomAction = ({children}) => (
  <View style={styles.bottom}>{children}</View>
);

const styles = StyleSheet.create({
  bottom: {
    paddingTop: 10,
    paddingBottom: getBottomSpace() > 0 ? getBottomSpace() : 10,
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#ffffff',
    shadowColor: '#444444',
    shadowOpacity: 0.1,
    elevation: 10,
  },
});

export default BottomAction;
