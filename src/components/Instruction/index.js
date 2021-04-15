import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Inline from '../../components/Inline';

const {width} = Dimensions.get('screen');

export default function Instruction({instruction, Icon}) {
  return (
    <View style={styles.instruction}>
      <Inline
        components={[
          {
            id: 1,
            component: (
              <View style={styles.indicator}>
                <Icon />
              </View>
            ),
          },
          {
            id: 2,
            component: <Text style={styles.instructionTxt}>{instruction}</Text>,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  instruction: {
    marginBottom: 5,
    width: width * 0.78,
  },
  indicator: {
    backgroundColor: '#fafafa',
    borderRadius: 20000,
    height: 60,
    width: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#cccccc',
  },
  instructionTxt: {
    fontSize: 16,
    color: '#444',
    textAlign: 'left',
  },
});
