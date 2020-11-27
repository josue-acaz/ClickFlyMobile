import React from 'react';
import {View, StyleSheet} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import Modal from 'react-native-modal';

export default function BottomOverlay({
  visible = false,
  handleVisible,
  children,
}) {
  return (
    <Modal
      isVisible={visible}
      style={styles.overlay}
      onBackdropPress={handleVisible}
      useNativeDriver={true}>
      <View style={styles.content}>{children}</View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  content: {
    backgroundColor: '#ffffff',
    padding: 10,
    paddingTop: 20,
    paddingBottom: getBottomSpace() > 0 ? getBottomSpace() : 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});
