import React, {useState} from 'react';
import {ScrollView} from 'react-native';

import Screen from '../../components/Screen';
import ArrowBack from '../../components/ArrowBack';
import SubsectionTitle from '../../components/SubsectionTitle';
import Form from '../../components/Form';
import Input from '../../components/Input';
import BottomAction from '../../components/BottomAction';
import Button from '../../components/Button';
import Label from '../../components/Label';
import PickerInput from '../../components/PickerInput';
import BottomSpace from '../../components/BottomSpace';
import Alert from '../../components/Alert';
import {maskPhone, maskData, inDOB} from '../../utils';
import api from '../../services/api';

export default function AddFriend({navigation, route}) {
  const [submitted, setSubmitted] = useState(false);
  const [document, setDocument] = useState("rg");
  const {customer, returnRoute} = route.params;
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    rg: "",
    dob: "",
    cnh: "",
    ctps: "",
    phone_number: "",
  });

  const pickerItems = [
    {
      label: "RG",
      value: "rg",
    },
    {
      label: "CNH",
      value: "cnh",
    },
    {
      label: "CTPS",
      value: "ctps",
    },
  ];

  const [alert, setAlert] = useState({
    open: false,
    error: false,
    success: false,
    processing: false,
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
    if (inputs.name 
      && inputs.email 
      && inputs.phone_number 
      && inputs.dob) {
      handleAlert({name: "open", value: true});
    }
  }

  function handleAddFriend() {
    const data = {
      name: inputs.name,
      email: inputs.email,
      phone_number: inputs.phone_number,
      dob: inputs.dob.split("/").reverse().join("-"),
    };

    // Obtém o documento correspondente selecionado
    data[document] = inputs[document];
    create(data);
  }

  async function create(data) {
    handleAlert({name: "processing", value: true});
    try {
      const response = await api.post(`/customer-friends`, data);
      handleAlert({name: "success", value: true});
      handleAlert({name: "processing", value: false});

      if(returnRoute === "Passengers") {
        handleAlert({name: "open", value: false});
        navigation.navigate(returnRoute, {new_passenger: {
          ...response.data,
          is_friend: true,
          active: false,
        }});
      }
    } catch (err) {
      handleAlert({name: "error", value: true});
      handleAlert({name: "processing", value: false});
    }
  }

  function handleFinish() {
    handleAlert({name: "open", value: false});
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
            handleAlert({name: "open", value: false});
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
                handleChange({name: "name", value: text});
              }}
              error={submitted && !inputs.name}
            />
            <Label text="Documento de identificação*" />
            <PickerInput
              value={inputs[document]}
              items={pickerItems}
              keyboardType="numeric"
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
              keyboardType="email-address"
              error={submitted && !inputs.email}
              onChangeText={(text) => {
                handleChange({name: "email", value: text});
              }}
            />
            <Label text="Número de telefone*" />
            <Input
              value={inputs.phone_number}
              placeholder="Número de Telefone"
              keyboardType="phone-pad"
              error={submitted && !inputs.phone_number}
              onChangeText={(text) => {
                if (text.length <= 14 || text === '') {
                  handleChange({name: "phone_number", value: maskPhone(text)});
                }
              }}
            />
            <Label text="Data de nascimento*" />
            <Input
              value={inputs.dob}
              placeholder="dd/mm/aaaa"
              keyboardType="numeric"
              error={submitted && !inputs.dob}
              onChangeText={(text) => {
                if (text.length <= 10 || text === '') {
                  handleChange({name: 'dob', value: maskData(text)});
                }
              }}
            />
          </Form>
          <BottomSpace />
        </ScrollView>
      </Screen>
      <BottomAction>
        <Button text="Adicionar" onPress={handleSubmit} />
      </BottomAction>
    </>
  );
}
