import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Inline} from '../../components';

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
  },
});
