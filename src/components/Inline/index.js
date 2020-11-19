import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function Inline({components = []}) {
  return (
    <View style={styles.inline}>
      {components.map((cmp) => (
        <View key={cmp.id} style={styles.cmp}>
          {cmp.component}
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
