import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {
  Button,
  ArrowBack,
  SubsectionTitle,
  Input,
  Screen,
  BottomAction,
  Alert,
} from '../../components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../../services/api';

export default function ForgotPassword({route, navigation}) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({
    open: false,
    success: false,
    error: false,
  });
  function handleAlert(e) {
    const {name, value} = e;
    setAlert((al) => ({...al, [name]: value}));
  }

  const EmailIcon = () => (
    <MaterialCommunityIcons name="email-outline" size={22} color="#09354B" />
  );

  async function handleSubmit() {
    setSubmitted(true);
    handleAlert({name: 'error', value: false});
    handleAlert({name: 'success', value: false});

    if (email) {
      setLoading(true);
      try {
        await api.put(`/forgot_password/${email}`);
        setLoading(false);
        handleAlert({name: 'success', value: true});
        handleAlert({name: 'open', value: true});
      } catch (error) {
        console.log(error.response);
        setLoading(false);
        handleAlert({name: 'error', value: true});
        handleAlert({name: 'open', value: true});
      }
    }
  }

  function handleOk() {
    handleAlert({name: 'open', value: false});
    if (alert.success) {
      navigation.goBack();
    }
  }

  return (
    <>
      <Screen>
        <Alert
          open={alert.open}
          success={alert.success}
          successTitle="Email enviado"
          successMessage={
            <Text style={styles.email}>
              Para redefinir sua senha, clique no link que foi enviado para{' '}
              <Text style={styles.bold}>{email}</Text>.
            </Text>
          }
          error={alert.error}
          errorTitle="Erro"
          errorMessage="Não foi possível enviar o email de recuperção, desculpe o transtorno."
          onOk={handleOk}
        />
        <ArrowBack
          onPress={() => {
            navigation.goBack();
          }}
        />
        <SubsectionTitle text="Recuperar senha" />
        <Text style={styles.text}>
          Digite o endereço de e-mail da sua conta e enviaremos instruções para
          redefinir sua senha.
        </Text>
        <View style={styles.inputs}>
          <Input
            placeholder="Informe seu email cadastrado"
            adorment={<EmailIcon />}
            keyboardType="email-address"
            error={submitted && !email}
            value={email}
            onChangeText={setEmail}
            errorTxt="Campo obrigatório"
          />
        </View>
      </Screen>
      <BottomAction>
        <Button
          processing={loading}
          disabled={loading}
          text="Enviar"
          onPress={handleSubmit}
        />
      </BottomAction>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  form: {},
  main: {
    marginTop: 15,
  },
  text: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  inputs: {},
  btnTxt: {
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
});
