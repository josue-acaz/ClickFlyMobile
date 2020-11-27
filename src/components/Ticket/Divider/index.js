import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Divider({arr}) {
  return (
    <View style={styles.container}>
      <FontAwesome
        style={styles.left_circle}
        name="circle"
        size={24}
        color="#ffffff"
      />
      {arr.map((i) => (
        <Text key={i} style={styles.pontilhado}>
          {' '}
          -{' '}
        </Text>
      ))}
      <FontAwesome
        style={styles.right_circle}
        name="circle"
        size={24}
        color="#ffffff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '105%',
    right: 28,
    elevation: -10,
  },
  pontilhado: {
    color: '#bfbfbf',
    fontWeight: 'bold',
  },
  right_circle: {
    position: 'absolute',
    right: -36,
    zIndex: 99,
  },
  left_circle: {
    position: 'absolute',
    left: 4,
    zIndex: 99,
  },
});
