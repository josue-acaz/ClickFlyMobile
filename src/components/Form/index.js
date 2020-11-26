import React from 'react';
import {View, StyleSheet} from 'react-native';

const Form = ({children}) => <View style={styles.form}>{children}</View>;

const styles = StyleSheet.create({
  form: {
    marginTop: 20,
  },
});

export default Form;
