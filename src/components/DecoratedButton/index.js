import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import Inline from '../../components/Inline';

export default function DecoratedButton({
  text,
  onPress = () => {},
  IconPrimmary,
  IconTransition,
  transit = false,
}) {
  const [transition, setTransition] = useState(false);
  function handleTransition() {
    setTransition(true);
  }

  return (
    <TouchableOpacity
      style={styles.decorated}
      disabled={transition}
      onPress={() => {
        if (!transition) {
          onPress();
        }
        if (transit) {
          handleTransition();
        }
      }}>
      <Inline
        justify="center"
        components={[
          {
            id: 1,
            component: transition ? <IconTransition /> : <IconPrimmary />,
          },
          {
            id: 2,
            component: <Text style={styles.text}>{text}</Text>,
          },
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  decorated: {
    paddingBottom: 15,
    paddingTop: 15,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#999',
  },
});
