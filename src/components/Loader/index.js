import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Center} from '../../components';
import {MaterialIndicator} from 'react-native-indicators';

const Loader = ({
  title,
  subtitle,
  showText = true,
  indicatorColor = '#09354B',
}) => (
  <Center>
    <View style={styles.content}>
      {showText && (
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      )}
      <MaterialIndicator color={indicatorColor} />
    </View>
  </Center>
);

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    height: 110,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00B2A9',
  },
  subtitle: {
    fontSize: 16,
    color: '#a6a6a6',
  },
  header: {},
});

export default Loader;
