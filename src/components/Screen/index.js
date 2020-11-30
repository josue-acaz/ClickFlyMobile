import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';

export default function Screen({children, backgroundColor = '#ffffff'}) {
  return (
    <SafeAreaView style={{...styles.container, backgroundColor}}>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 10,
    height: '100%',
    paddingBottom: getBottomSpace(),
  },
});
