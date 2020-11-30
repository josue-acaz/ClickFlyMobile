import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {
  Screen,
  ArrowBack,
  SubsectionTitle,
  Input,
  Form,
  Label,
  BottomAction,
  Button,
  Alert,
  BottomSpace,
} from '../../components';
import {consultZipcode} from '../../services/extra';
import {maskCep, rmEspecialCaracteres} from '../../utils';
import api from '../../services/api';

export default function Address({navigation, route}) {
  const {customer, returnRoute} = route.params;
  const [submitted, setSubmitted] = useState(false);
  const [inputs, setInputs] = useState({
    street: '',
    number: '',
    complement: '',
    zipcode: '',
    neighborhood: '',
    city: '',
    uf: '',
  });
  function handleChange(e) {
    const {name, value} = e;
    setInputs((inputs) => ({...inputs, [name]: value}));
  }
  const [alert, setAlert] = useState({
    open: false,
    processing: false,
    error: false,
    success: false,
  });
  function handleAlert(e) {
    const {name, value} = e;
    setAlert((alert) => ({...alert, [name]: value}));
  }

  useEffect(() => {
    if (customer.address) {
      const address = customer.address;
      console.log(address);
      Object.keys(address).forEach((el) => {
        handleChange({name: el, value: address[el]});
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleConsultZip(zipcode) {
    try {
      const {bairro, localidade, logradouro, uf} = await consultZipcode(
        zipcode,
      );
      const autocompleteAddress = [
        {
          id: 1,
          name: 'neighborhood',
          value: bairro,
        },
        {
          id: 2,
          name: 'city',
          value: localidade,
        },
        {
          id: 3,
          name: 'street',
          value: logradouro,
        },
        {
          id: 4,
          name: 'uf',
          value: uf,
        },
      ];

      autocompleteAddress.forEach((addr) => {
        const {name, value} = addr;
        handleChange({name, value});
      });
    } catch (error) {
      // handle error
    }
  }

  function handleSubmit() {
    setSubmitted(true);
    if (
      inputs.street &&
      inputs.number &&
      inputs.neighborhood &&
      inputs.uf &&
      inputs.zipcode &&
      inputs.city
    ) {
      handleAlert({name: 'open', value: true});
    }
  }

  async function handleUpdate() {
    handleAlert({name: 'processing', value: true});
    const data = {
      street: inputs.street,
      number: inputs.number,
      zipcode: rmEspecialCaracteres(inputs.zipcode),
      neighborhood: inputs.neighborhood,
      city: inputs.city,
      uf: inputs.uf,
      complement: inputs.complement,
    };

    try {
      await api.put(`/customer/${customer.id}/address`, data);
      handleAlert({name: 'processing', value: false});
      handleAlert({name: 'success', value: true});
    } catch (error) {
      handleAlert({name: 'processing', value: false});
      handleAlert({name: 'error', value: true});
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
          title="Atualizar endereço"
          message="Deseja alterar seu endereço?"
          onConfirm={handleUpdate}
          onCancel={() => {
            handleAlert({name: 'open', value: false});
          }}
          processing={alert.processing}
          processingTitle="Atualizando..."
          processingMessage="Por favor, aguarde!"
          error={alert.error}
          errorTitle="Erro"
          errorMessage="Desculpe, não foi possível atualizar o endereço!"
          success={alert.success}
          successTitle="Endereço atualizado"
          successMessage="O endereço foi atualizado com sucesso!"
          onOk={handleFinish}
        />
        <ScrollView>
          <ArrowBack
            onPress={() => {
              navigation.goBack();
            }}
          />
          <SubsectionTitle text="Meu endereço" />
          <Form>
            <Label text="CEP*" />
            <Input
              value={inputs.zipcode}
              placeholder="Informe seu CEP"
              error={submitted && !inputs.zipcode}
              onBlur={() => {
                handleConsultZip(inputs.zipcode);
              }}
              onChangeText={(text) => {
                if (text.length <= 9 || text === '') {
                  handleChange({name: 'zipcode', value: maskCep(text)});
                }
              }}
            />
            <Label text="Nome da rua*" />
            <Input
              value={inputs.street}
              placeholder="Nome da rua"
              error={submitted && !inputs.street}
              onChangeText={(text) => {
                handleChange({name: 'street', value: text});
              }}
            />
            <Label text="Número da residência*" />
            <Input
              value={inputs.number}
              placeholder="Número da residência"
              error={submitted && !inputs.number}
              keyboardType="numeric"
              onChangeText={(text) => {
                handleChange({name: 'number', value: text});
              }}
            />
            <Label text="Bairro*" />
            <Input
              value={inputs.neighborhood}
              placeholder="Bairro"
              error={submitted && !inputs.neighborhood}
              onChangeText={(text) => {
                handleChange({name: 'neighborhood', value: text});
              }}
            />
            <Label text="Cidade*" />
            <Input
              value={inputs.city}
              placeholder="Cidade"
              error={submitted && !inputs.city}
              onChangeText={(text) => {
                handleChange({name: 'city', value: text});
              }}
            />
            <Label text="Estado*" />
            <Input
              value={inputs.uf}
              placeholder="Estado"
              error={submitted && !inputs.uf}
              onChangeText={(text) => {
                handleChange({name: 'uf', value: text});
              }}
            />
            <Label text="Complemento" />
            <Input
              value={inputs.complement}
              placeholder="Complemento"
              onChangeText={(text) => {
                handleChange({name: 'complement', value: text});
              }}
            />
          </Form>
          <BottomSpace />
        </ScrollView>
      </Screen>
      <BottomAction>
        <Button text="Alterar" onPress={handleSubmit} />
      </BottomAction>
    </>
  );
}
