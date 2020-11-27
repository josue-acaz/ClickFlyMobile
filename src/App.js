import * as React from 'react';
import {StatusBar, Platform, View, StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {AuthProvider} from './contexts/auth';
import Routes from './routes';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export default function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      <View style={styles.statusBar}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="#00B2A9"
        />
      </View>

      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    width: '100%',
    height: STATUS_BAR_HEIGHT + getStatusBarHeight(),
    backgroundColor: '#00B2A9',
  },
});
