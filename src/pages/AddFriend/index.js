import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {
  Screen,
  ArrowBack,
  SubsectionTitle,
  Form,
  Input,
  BottomAction,
  Button,
  Label,
  Alert,
  PickerInput,
} from '../../components';
import api from '../../services/api';
import {maskPhone, maskData, inDOB} from '../../utils';

export default function AddFriend({navigation, route}) {
  const [submitted, setSubmitted] = useState(false);
  const [document, setDocument] = useState('rg');
  const {customer, returnRoute} = route.params;
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    rg: '',
    phone: '',
    dob: '',
    cnh: '',
    ctps: '',
  });

  const pickerItems = [
    {
      id: 1,
      label: 'RG',
      value: 'rg',
    },
    {
      id: 2,
      label: 'CNH',
      value: 'cnh',
    },
    {
      id: 3,
      label: 'CTPS',
      value: 'ctps',
    },
  ];

  const [alert, setAlert] = useState({
    open: false,
    processing: false,
    error: false,
    success: false,
  });

  function handleAlert(e) {
    const {name, value} = e;
    setAlert((al) => ({...al, [name]: value}));
  }

  function handleChange(e) {
    const {name, value} = e;
    setInputs((inp) => ({...inp, [name]: value}));
  }

  function handleSubmit() {
    setSubmitted(true);
    if (inputs.name && inputs.email && inputs.phone && inputs.dob) {
      handleAlert({name: 'open', value: true});
    }
  }

  function handleAddFriend() {
    let data = {
      name: inputs.name,
      email: inputs.email,
      phone: inputs.phone,
      dob: inDOB(inputs.dob),
      isFriend: true,
      active: false,
    };

    // Obtém o documento correspondente selecionado
    data[document] = inputs[document];
    switch (returnRoute) {
      case 'Passengers':
        handleAlert({name: 'open', value: false});
        navigation.navigate(returnRoute, {new_passenger: data});
        break;
      default:
        handleAlert({name: 'processing', value: true});
        AddToDatabse(data);
        break;
    }
  }

  async function AddToDatabse(data) {
    try {
      await api.post(`/customers/${customer.id}/friends`, data);
      handleAlert({name: 'success', value: true});
      handleAlert({name: 'processing', value: false});
    } catch (err) {
      handleAlert({name: 'error', value: true});
      handleAlert({name: 'processing', value: false});
    }
  }

  function handleFinish() {
    handleAlert({name: 'open', value: false});
    navigation.navigate(returnRoute, {loading: true});
  }

  return (
    <>
      <Screen>
        <Alert
          open={alert.open}
          title="Adicionar novo passageiro"
          message="Adicionar novo passageiro?"
          onConfirm={handleAddFriend}
          onCancel={() => {
            handleAlert({name: 'open', value: false});
          }}
          processing={alert.processing}
          processingTitle="Adicionando novo passageiro..."
          processingMessage="Por favor, aguarde!"
          error={alert.error}
          errorTitle="Erro"
          errorMessage="Desculpe, não foi possível finalizar a operação!"
          success={alert.success}
          successTitle="Sucesso"
          successMessage="Novo passageiro adicionado!"
          onOk={handleFinish}
        />
        <ScrollView>
          <ArrowBack
            onPress={() => {
              navigation.goBack();
            }}
          />
          <SubsectionTitle text="Novo passageiro" />
          <Form>
            <Label text="Nome completo*" />
            <Input
              value={inputs.name}
              placeholder="Nome completo"
              onChangeText={(text) => {
                handleChange({name: 'name', value: text});
              }}
              error={submitted && !inputs.name}
            />
            <Label text="Documento de identificação*" />
            <PickerInput
              value={inputs[document]}
              items={pickerItems}
              placeholder="Documento de identificação"
              onChangeText={(text) => {
                handleChange({name: document, value: text.replace(/\D/g, '')});
              }}
              onChangePicker={(doc) => {
                setDocument(doc);
              }}
              picked={document}
              error={submitted && !inputs[document]}
            />
            <Label text="Enderço de email*" />
            <Input
              value={inputs.email}
              placeholder="Endereço de email"
              onChangeText={(text) => {
                handleChange({name: 'email', value: text});
              }}
            />
            <Label text="Número de telefone*" />
            <Input
              value={inputs.phone}
              placeholder="Número de Telefone"
              onChangeText={(text) => {
                if (text.length <= 14 || text === '') {
                  handleChange({name: 'phone', value: maskPhone(text)});
                }
              }}
            />
            <Label text="Data de nascimento*" />
            <Input
              value={inputs.dob}
              placeholder="dd/mm/aaaa"
              onChangeText={(text) => {
                if (text.length <= 10 || text === '') {
                  handleChange({name: 'dob', value: maskData(text)});
                }
              }}
            />
          </Form>
        </ScrollView>
      </Screen>
      <BottomAction>
        <Button text="Adicionar" onPress={handleSubmit} />
      </BottomAction>
    </>
  );
}
