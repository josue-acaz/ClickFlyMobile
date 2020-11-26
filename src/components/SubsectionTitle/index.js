import React from 'react';
import {Text, StyleSheet} from 'react-native';

const SubsectionTitle = ({text = ''}) => (
  <Text style={styles.subsection}>{text}</Text>
);

const styles = StyleSheet.create({
  subsection: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 15,
  },
});

export default SubsectionTitle;
