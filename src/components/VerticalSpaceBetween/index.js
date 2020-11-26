import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function VerticalSpaceBetween({
  components = [],
  align = 'flex-start',
}) {
  return (
    <View style={styles.vertical}>
      {components.map((cmp) => (
        <View key={cmp.id} style={{...styles.cmp, alignItems: align}}>
          {cmp.component}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  vertical: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cmp: {},
});
