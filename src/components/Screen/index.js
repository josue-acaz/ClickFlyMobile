import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';

export default function Screen({children}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    paddingHorizontal: 10,
    height: '100%',
  },
});
