import React from 'react';
import {Text, StyleSheet} from 'react-native';

const SubsectionTitle = ({text = ''}) => (
  <Text style={styles.subsection}>{text}</Text>
);

const styles = StyleSheet.create({
  subsection: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#444444',
    marginTop: 15,
  },
});

export default SubsectionTitle;
