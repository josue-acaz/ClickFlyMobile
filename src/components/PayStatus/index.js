import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function PayStatus({Icon, title, message}) {
  return (
    <View style={styles.error}>
      <View style={styles.iconContainer}>
        <View style={styles.borderIcon}>
          <Icon style={styles.icon} />
        </View>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  error: {},
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    color: '#666',
    textAlign: 'justify',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  icon: {},
  borderIcon: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 200000,
    borderWidth: 5,
    borderColor: '#3333',
  },
});
