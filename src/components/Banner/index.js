import React from 'react';
import {View, StyleSheet} from 'react-native';

const Banner = ({children}) => <View style={styles.banner}>{children}</View>;

const styles = StyleSheet.create({
  banner: {
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#f2f2f2',
    marginTop: 20,
  },
});

export default Banner;
