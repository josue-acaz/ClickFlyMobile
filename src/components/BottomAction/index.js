import React from 'react';
import {View, StyleSheet} from 'react-native';

const BottomAction = ({children}) => (
  <View style={styles.bottom}>{children}</View>
);

const styles = StyleSheet.create({
  bottom: {
    paddingTop: 10,
    paddingBottom: 20,
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
