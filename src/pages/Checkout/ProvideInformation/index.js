import React, {useState} from 'react';
import {ScrollView, Alert} from 'react-native';
import {
  Form,
  Label,
  Screen,
  ArrowBack,
  SubsectionTitle,
  BottomAction,
  Button,
} from '../../../components';
import {Input} from 'react-native-elements';
import api from '../../../services/api';
import {
  mergeCustomer,
  rmEspecialCaracteres,
  dynamicValidation,
  maskPhone,
  maskCnpj,
  maskCpf,
  maskData,
  inDOB,
  inCPF,
  removeFromArray,
} from '../../../utils';

export default function ProvideInformation({navigation, route}) {
  const {returnRoute, steps} = route.params;
  const customer = mergeCustomer(route.params.customer);
  const [submitted, setSubmitted] = useState(false);
  const [processing, setProcessing] = useState(false);
  function handleProcessing() {
    setProcessing(!processing);
  }
  const [inputs, setInputs] = useState({
    cpf: '',
    rg: '',
    dob: '',
    phone: '',
    cnpj: '',
  });
  function handleChange(e) {
    const {name, value} = e;
    setInputs((inputs) => ({...inputs, [name]: value}));
  }

  function handleSubmit() {
    setSubmitted(true);
    const isValid = dynamicValidation(
      customer,
      inputs,
      customer.type === 'physical-entity' ? ['cnpj'] : ['cpf', 'rg', 'dob'],
    );
    if (isValid) {
      let data = {
        customer: {},
        entity: {},
        user: {},
      };

      if (inputs.cpf) {
        data.entity.cpf = inCPF(inputs.cpf);
      }

      if (inputs.dob) {
        data.entity.dob = inDOB(inputs.dob);
      }

      if (inputs.rg) {
        data.entity.rg = inputs.rg;
      }

      if (inputs.phone) {
        data.user.phone = inputs.phone;
      }

      if (inputs.cnpj) {
        data.entity.cnpj = rmEspecialCaracteres(inputs.cnpj);
      }

      console.log(data);

      handleUpdate(customer.id, data);
    }
  }

  async function handleUpdate(customer_id, data) {
    handleProcessing();
    try {
      await api.put(`/customers/${customer_id}/update`, data);
      handleProcessing();
      handleNext();
    } catch (err) {
      // handle error
      handleProcessing();
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar os seus dados', [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    }
  }

  async function handleNext() {
    steps.shift();
    route.params.steps = steps; // Atualiza as etapas restantes
    navigation.navigate(
      steps.length > 0 ? steps[0].route : returnRoute,
      route.params,
    ); // Vai para a próxima etapa
  }

  return (
    <>
      <Screen>
        <ScrollView>
          <ArrowBack
            onPress={() => {
              navigation.goBack();
            }}
          />
          <SubsectionTitle text="Forneça seus dados" />
          <Form>
            {customer.type === 'physical-entity' ? (
              <>
                {!customer.cpf && (
                  <>
                    <Label text="Informe seu CPF" />
                    <Input
                      value={inputs.cpf}
                      placeholder="CPF"
                      errorMessage={
                        submitted && !inputs.cpf ? 'Campo obrigatório' : ''
                      }
                      onChangeText={(text) => {
                        if (text.length <= 14 || text === '') {
                          handleChange({name: 'cpf', value: maskCpf(text)});
                        }
                      }}
                      keyboardType="numeric"
                    />
                  </>
                )}
                {!customer.rg && (
                  <>
                    <Label text="Informe seu RG" />
                    <Input
                      value={inputs.rg}
                      placeholder="RG"
                      errorMessage={
                        submitted && !inputs.rg ? 'Campo obrigatório' : ''
                      }
                      onChangeText={(text) => {
                        handleChange({
                          name: 'rg',
                          value: text.replace(/\D/g, ''),
                        });
                      }}
                      keyboardType="numeric"
                    />
                  </>
                )}
                {!customer.dob && (
                  <>
                    <Label text="Data de nascimento" />
                    <Input
                      value={inputs.dob}
                      errorMessage={
                        submitted && !inputs.dob ? 'Campo obrigatório' : ''
                      }
                      placeholder="Data de nascimento"
                      onChangeText={(text) => {
                        if (text.length <= 10 || text === '') {
                          handleChange({name: 'dob', value: maskData(text)});
                        }
                      }}
                      keyboardType="number-pad"
                    />
                  </>
                )}
              </>
            ) : (
              <>
                {!customer.cnpj && (
                  <>
                    <Label text="Informe o CNPJ" />
                    <Input
                      value={inputs.cnpj}
                      placeholder="CNPJ"
                      errorMessage={
                        submitted && !inputs.cnpj ? 'Campo obrigatório' : ''
                      }
                      onChangeText={(text) => {
                        if (text.length <= 18 || text === '') {
                          handleChange({name: 'cnpj', value: maskCnpj(text)});
                        }
                      }}
                      keyboardType="number-pad"
                    />
                  </>
                )}
              </>
            )}
            {!customer.phone && (
              <>
                <Label text="Número de Telefone" />
                <Input
                  value={inputs.phone}
                  placeholder="Número de telefone"
                  errorMessage={
                    submitted && !inputs.phone ? 'Campo obrigatório' : ''
                  }
                  onChangeText={(text) => {
                    if (text.length <= 14 || text === '') {
                      handleChange({
                        name: 'phone',
                        value: maskPhone(text.replace('-', '')),
                      });
                    }
                  }}
                  keyboardType="phone-pad"
                />
              </>
            )}
          </Form>
        </ScrollView>
      </Screen>
      <BottomAction>
        <Button
          text="Próximo"
          disabled={processing}
          processing={processing}
          onPress={handleSubmit}
        />
      </BottomAction>
    </>
  );
}
