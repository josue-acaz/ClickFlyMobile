import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

import {useAuth} from '../contexts/auth';

import AuthRoutes from '../routes/auth.routes';
import AppRoutes from '../routes/app.routes';

export default function Routes() {
  const {signed, loading, screen} = useAuth();

  if (loading && !screen) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#666666" />
      </View>
    );
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
