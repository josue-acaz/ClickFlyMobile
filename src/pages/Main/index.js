import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';

import logo from '../../assets/logo.png';
const {height} = Dimensions.get('window');

export default function Main({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Video
        source={require('./video/video.mp4')}
        style={styles.backgroundVideo}
        muted={true}
        repeat={true}
        resizeMode={'cover'}
        rate={1.0}
        ignoreSilentSwitch={'obey'}
      />

      <View style={styles.content}>
        <View style={styles.app}>
          <Image source={logo} style={styles.logo} />
        </View>

        <View style={styles.footer}>
          <View style={styles.action}>
            <TouchableOpacity
              style={styles.btnLogin}
              onPress={() => {
                navigation.navigate('SignIn');
              }}>
              <Text style={styles.btnLoginTxt}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnSignup}
              onPress={() => {
                navigation.navigate('SignUp');
              }}>
              <Text style={styles.btnSignupTxt}>CRIAR CONTA</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.invited}
            onPress={() => {
              navigation.navigate('HomeGuest');
            }}>
            <Text style={styles.invitedTxt}>Entrar como convidado</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  app: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 32,
    color: '#09354B',
    fontWeight: 'bold',
  },
  content: {
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    flex: 1,
    marginBottom: 100,
  },
  action: {
    alignItems: 'center',
  },
  btnLogin: {
    height: 42,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    width: '80%',
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  backgroundVideo: {
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
  },
  btnLoginTxt: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnSignup: {
    height: 42,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    width: '80%',
    borderWidth: 1,
    borderColor: '#ffffff',
    marginTop: 16,
  },
  btnSignupTxt: {
    color: '#09354B',
    fontSize: 16,
  },
  facebook: {
    height: 42,
    backgroundColor: '#3b5998',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#3b5998',
    marginTop: 10,
  },
  facebookTxt: {
    color: '#ffffff',
    fontSize: 16,
  },
  invited: {
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  invitedTxt: {
    textDecorationLine: 'underline',
    color: '#ffffff',
    fontWeight: 'bold',
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
});
