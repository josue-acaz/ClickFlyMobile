import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {MaterialIndicator} from 'react-native-indicators';

import Input from '../../components/Input';
import LockInput from '../../components/LockInput';
import Button from '../../components/Button';

import {useAuth} from '../../contexts/auth';
import logo from '../../assets/logo.png';

const EmailIcon = () => (
  <MaterialCommunityIcons name="email-outline" size={22} color="#09354B" />
);

export default function SignIn({route, navigation}) {
  const {signIn, error, loading} = useAuth();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [password, setPassword] = useState('');

  function handleSubmit() {
    setSubmitted(true);

    if (email && password) {
      signIn(email, password, 'SignIn');
    }
  }

  async function handleForgotPassword() {
    navigation.navigate('ForgotPassword');
  }

  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === 'android' || Platform.OS === 'ios'}
      behavior="padding"
      style={styles.container}>
      <Image style={styles.logo} source={logo} />

      <Text style={styles.loginTxt}>Login</Text>
      <View style={styles.form}>
        <Input
          value={email}
          placeholder="Seu e-mail"
          keyboardType="email-address"
          adorment={<EmailIcon />}
          onChangeText={setEmail}
          adormentPosition="end"
          error={submitted && !email}
          errorTxt="Preencha este campo"
        />
        <LockInput
          placeholder="Sua senha"
          value={password}
          onChangeText={setPassword}
          error={submitted && !password}
          errorTxt="Preencha este campo"
        />
        {error && <Text style={styles.error}>Email ou senha inválidos</Text>}
        <Button style={styles.btn} onPress={handleSubmit}>
          {loading ? (
            <MaterialIndicator size={30} color={'#FFFFFF'} />
          ) : (
            <Text style={styles.btnTxt}>Entrar</Text>
          )}
        </Button>
      </View>
      <TouchableOpacity style={styles.registerButton}>
        <Text
          style={styles.registerButtonText}
          onPress={() => navigation.navigate('SignUp')}>
          Registrar-se
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgotPasswordBtn}>
        <Text
          style={styles.forgotPasswordTxt}
          onPress={() => handleForgotPassword()}>
          Esqueci minha senha
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
  },
  loginTxt: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#09354B',
  },
  form: {
    alignSelf: 'stretch',
    marginTop: 0,
  },
  registerButton: {
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  forgotPasswordBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  registerButtonText: {
    color: '#444',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotPasswordTxt: {
    color: '#999',
    fontSize: 14,
  },
  logo: {
    width: 220,
    height: 150,
    resizeMode: 'contain',
  },
  btnTxt: {
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  btn: {
    marginTop: 15,
  },
  error: {
    color: '#ff6666',
  },
});
