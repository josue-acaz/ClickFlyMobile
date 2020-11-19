import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Alert, View, Text} from 'react-native';
import {MaterialIndicator} from 'react-native-indicators';
import {
  Button,
  ArrowBack,
  VerticalSpaceBetween,
  Title,
  Input,
} from '../../components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../../services/api';

export default function ForgotPassword({route, navigation}) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const EmailIcon = () => (
    <MaterialCommunityIcons name="email-outline" size={22} color="#09354B" />
  );

  async function handleSubmit() {
    setSubmitted(true);

    if (email) {
      setLoading(true);
      try {
        await api.put(`/forgot_password/${email}`);
        setLoading(false);

        Alert.alert(
          'Email enviado',
          `Clique no link enviado para ${email} para redefinir sua senha!`,
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                navigation.goBack();
              },
            },
          ],
          {cancelable: false},
        );
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <VerticalSpaceBetween
          components={[
            {
              id: 1,
              component: (
                <View style={styles.form}>
                  <ArrowBack onPress={() => navigation.goBack()} />
                  <View style={styles.main}>
                    <Title text="Recuperar senha" />

                    <Text style={styles.text}>
                      Digite o endereço de e-mail da sua conta e enviaremos
                      instruções para redefinir sua senha.
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
                  </View>
                </View>
              ),
            },
            {
              id: 2,
              component: (
                <Button onPress={handleSubmit}>
                  {loading ? (
                    <MaterialIndicator size={30} color={'#FFFFFF'} />
                  ) : (
                    <Text style={styles.btnTxt}>Enviar</Text>
                  )}
                </Button>
              ),
            },
          ]}
        />
      </View>
    </SafeAreaView>
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
});
