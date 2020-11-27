import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Screen, Center, Button, BottomAction} from '../../components';

export default function NotLogged({navigation, title}) {
  function handleLogin() {
    navigation.navigate('Main');
  }
  return (
    <>
      <Screen>
        <Center>
          <Text style={styles.title}>{title}</Text>
          <Button
            style={styles.btn}
            onPress={handleLogin}
            text="OK"
            color="#00B2A9"
          />
        </Center>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 20,
  },
  btn: {
    width: '25%',
  },
});
