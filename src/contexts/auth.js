import React, {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as auth from '../services/auth';
import api from '../services/api';

const AuthContext = createContext({});
const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState(null); // <-- Controla de onde será feito o loading
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
      const storagedToken = await AsyncStorage.getItem('@RNAuth:token');

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        api.defaults.headers.Authorization = `Baerer ${storagedToken}`;
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  async function signIn(email, password, route) {
    setScreen(route);
    setLoading(true);

    try {
      const response = (await auth.signIn(email, password)).data;
      setError(false);
      setLoading(false);
      setScreen(null);
      setUser(response.user);

      api.defaults.headers.Authorization = `Baerer ${response.token}`;
      api.defaults.headers.customer_id = response.user.id;

      await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
      await AsyncStorage.setItem('@RNAuth:token', response.token);
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  }

  async function signOut() {
    await AsyncStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{signed: !!user, screen, user, loading, signIn, signOut, error}}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

export {AuthProvider, useAuth};
