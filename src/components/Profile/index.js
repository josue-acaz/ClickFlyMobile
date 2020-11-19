import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import user from '../../assets/user.png';

const CameraIcon = () => (
  <MaterialIcons name="photo-camera" size={25} color="white" />
);

export default function Profile({thumbnail, onPress}) {
  return (
    <View style={styles.profile}>
      <TouchableOpacity onPress={onPress}>
        <Image
          style={styles.image}
          source={thumbnail ? {uri: thumbnail} : user}
        />
      </TouchableOpacity>
      <View style={styles.span}>
        <TouchableOpacity onPress={onPress}>
          <CameraIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    height: 120,
    width: 120,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20000,
    overflow: 'hidden',
  },
  span: {
    backgroundColor: '#00B2A9',
    position: 'absolute',
    padding: 10,
    zIndex: 99,
    borderRadius: 2000,
    right: -10,
    bottom: 10,
    shadowColor: '#444444',
    shadowOpacity: 0.1,
    elevation: 10,
  },
});
