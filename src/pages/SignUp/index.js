import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Button from '../../components/Button';
import Input from '../../components/Input';
import Radio from '../../components/Radio';
import Inline from '../../components/Inline';
import ArrowBack from '../../components/ArrowBack';
import Alert from '../../components/Alert';
import SubsectionTitle from '../../components/SubsectionTitle';
import Screen from '../../components/Screen';
import BottomAction from '../../components/BottomAction';
import BottomSpace from '../../components/BottomSpace';
import api from '../../services/api';

const UserIcon = () => <FontAwesome name="user-o" size={22} color="#09354B" />;
const EmailIcon = () => (
  <MaterialCommunityIcons name="email-outline" size={22} color="#09354B" />
);
const PassIcon = () => (
  <MaterialIcons name="lock-outline" size={24} color="#09354B" />
);

export default function SignUp({navigation}) {
  const [entityType, setEntityType] = useState('pf');
  const handleEntityType = (v) => {
    setEntityType(v);
  };

  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  });
  function handleChange(e) {
    const {name, value} = e;
    setInputs((inputs) => ({...inputs, [name]: value}));
  }

  const [submitted, setSubmitted] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Não foi possível criar a conta.");
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false); // alert
  function handleSubmit() {
    setSubmitted(true);

    if (inputs.name && inputs.email && inputs.password) {
      setOpen(true);
    }
  }

  async function handleSignUp() {
    setProcessing(true); // iniciar processo
    try {
      await api.post("/customers", {
        ...inputs,
        type: entityType,
      });

      // success
      setSuccess(true);
      setProcessing(false);
    } catch (err) {
      // error
      if (err.response.data.msg) {
        setErrorMsg(err.response.data.msg);
      }
      setError(true);
      setProcessing(false);
    }
  }

  function handleFinish() {
    setOpen(false);
    navigation.navigate('Main');
  }

  return (
    <>
      <Screen>
        <Alert
          open={open}
          title="Confirmar cadastro"
          message="Deseja cadastrar-se?"
          onConfirm={handleSignUp}
          onCancel={() => {
            setOpen(false);
          }}
          processing={processing}
          processingTitle="Aguarde um momento..."
          processingMessage="Estamos criando sua conta!"
          error={error}
          errorTitle="Conta não criada!"
          errorMessage={errorMsg}
          success={success}
          successTitle="Cadastro efetuado!"
          successMessage={
            <Text>
              Seu cadastro foi efetuado com sucesso. Para finalizar e ativar sua
              conta, clique no link que foi enviado para o email{' '}
              <Text style={styles.bold}>{inputs.email}</Text>!
            </Text>
          }
          onOk={handleFinish}
        />
        <ScrollView>
          <ArrowBack
            onPress={() => {
              navigation.goBack();
            }}
          />
          <SubsectionTitle text="Criar conta" />
          <View style={styles.inputs}>
            <Inline
              components={[
                {
                  id: 1,
                  component: (
                    <Inline
                      components={[
                        {
                          id: 1,
                          component: (
                            <Radio
                              value="pf"
                              selected={entityType}
                              onChange={handleEntityType}
                            />
                          ),
                        },
                        {
                          id: 2,
                          component: (
                            <Text style={styles.personType}>Pessoa Física</Text>
                          ),
                        },
                      ]}
                    />
                  ),
                },
                {
                  id: 2,
                  component: (
                    <Inline
                      components={[
                        {
                          id: 1,
                          component: (
                            <Radio
                              value="pj"
                              selected={entityType}
                              onChange={handleEntityType}
                            />
                          ),
                        },
                        {
                          id: 2,
                          component: (
                            <Text style={styles.personType}>
                              Pessoa Jurídica
                            </Text>
                          ),
                        },
                      ]}
                    />
                  ),
                },
              ]}
            />
            <View style={styles.in}>
              <Input
                placeholder={
                  entityType === 'pf'
                    ? 'Seu nome completo'
                    : 'Nome da empresa'
                }
                adorment={<UserIcon />}
                autoCapitalize="words"
                error={submitted && !inputs.name}
                errorTxt="Campo obrigatório"
                value={inputs.name}
                onChangeText={(text) => {
                  handleChange({name: 'name', value: text});
                }}
              />
              <Input
                placeholder={entityType === 'pj' 
                  ? 'Email da empresa' 
                  : 'Seu melhor email'
                }
                adorment={<EmailIcon />}
                error={submitted && !inputs.email}
                errorTxt="Campo obrigatório"
                keyboardType="email-address"
                value={inputs.email}
                onChangeText={(text) => {
                  handleChange({name: 'email', value: text});
                }}
              />
              <Input
                placeholder="Crie uma senha"
                adorment={<PassIcon />}
                error={submitted && !inputs.password}
                errorTxt="Campo obrigatório"
                value={inputs.password}
                secureTextEntry={true}
                onChangeText={(text) => {
                  handleChange({name: 'password', value: text});
                }}
              />
            </View>
          </View>
          <BottomSpace />
        </ScrollView>
      </Screen>
      <BottomAction>
        <Button text="Cadastrar-se" onPress={handleSubmit} />
      </BottomAction>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: '#09354B',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  form: {},
  action: {
    alignItems: 'center',
    alignContent: 'center',
  },
  inputs: {
    marginTop: 30,
  },
  personType: {
    fontSize: 16,
    color: '#444444',
  },
  in: {
    marginTop: 20,
  },
  bold: {
    fontWeight: 'bold',
    color: '#444',
  },
});
