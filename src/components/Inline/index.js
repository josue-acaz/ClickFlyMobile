import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function Inline({
  components = [],
  style,
  justify = 'flex-start',
  cmpStyle,
}) {
  return (
    <View style={{...styles.inline, justifyContent: justify, ...style}}>
      {components.map((cmp) => (
        <View key={cmp.id} style={{...styles.cmp, ...cmpStyle}}>
          {cmp.component || (<></>)}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cmp: {
    marginLeft: 2,
    marginRight: 5,
  },
});
