import React, {useState} from 'react';
import {ScrollView, Alert} from 'react-native';

import Form from '../../../components/Form';
import Label from '../../../components/Label';
import Screen from '../../../components/Screen';
import ArrowBack from '../../../components/ArrowBack';
import SubsectionTitle from '../../../components/SubsectionTitle';
import BottomAction from '../../../components/BottomAction';
import Button from '../../../components/Button';

import {Input} from 'react-native-elements';
import api from '../../../services/api';
import {
  escapeCaracteres,
  maskPhone,
  maskCnpj,
  maskCpf,
  maskData,
} from '../../../utils';
import {EnumCustomerTypes} from '../../../constants';

export default function ProvideInformation({navigation, route}) {
  const {returnRoute, steps, customer} = route.params;
  const [submitted, setSubmitted] = useState(false);
  const [processing, setProcessing] = useState(false);
  function handleProcessing() {
    setProcessing(!processing);
  }
  const [inputs, setInputs] = useState({
    cpf: "",
    rg: "",
    dob: "",
    phone_number: "",
    cnpj: "",
  });

  function handleChange(e) {
    const {name, value} = e;
    setInputs((inputs) => ({...inputs, [name]: value}));
  }

  function handleSubmit() {
    setSubmitted(true);
    let data = {};

    if(!inputs.phone_number) {
      return;
    }

    data.phone_number = escapeCaracteres(inputs.phone_number);

    if(customer.type === EnumCustomerTypes.PF) {
      if(!inputs.rg || !inputs.dob || !inputs.cpf) {
        return;
      }

      data.rg = inputs.rg;
      data.dob = inputs.dob.split("/").reverse().join("-");
      data.cpf = escapeCaracteres(inputs.cpf);

    } else if(customer.type === EnumCustomerTypes.PJ) {
      if(!inputs.cnpj) {
        return;
      }

      data.cnpj = escapeCaracteres(inputs.cnpj);
    }

    handleUpdate(customer.id, {type: customer.type, data});
  }

  async function handleUpdate(customer_id, {type, data}) {
    handleProcessing();
    try {
      await api.put(`/customers/${customer_id}/${type}/update`, data);
      handleProcessing();
      handleNext();
    } catch (err) {
      // handle error
      handleProcessing();
      Alert.alert("Erro", "Ocorreu um erro ao atualizar os seus dados", [
        {
          text: "OK",
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
            {customer.type === EnumCustomerTypes.PF ? (
              <>
                {!customer.pf.cpf && (
                  <>
                    <Label text="Informe seu CPF" />
                    <Input
                      value={inputs.cpf}
                      placeholder="CPF"
                      errorMessage={
                        submitted && !inputs.cpf ? "Campo obrigatório" : ""
                      }
                      onChangeText={(text) => {
                        if (text.length <= 14 || text === "") {
                          handleChange({name: "cpf", value: maskCpf(text)});
                        }
                      }}
                      keyboardType="numeric"
                    />
                  </>
                )}
                {!customer.pf.rg && (
                  <>
                    <Label text="Informe seu RG" />
                    <Input
                      value={inputs.rg}
                      placeholder="RG"
                      errorMessage={
                        submitted && !inputs.rg ? "Campo obrigatório" : ""
                      }
                      onChangeText={(text) => {
                        handleChange({
                          name: "rg",
                          value: text.replace(/\D/g, ''),
                        });
                      }}
                      keyboardType="numeric"
                    />
                  </>
                )}
                {!customer.pf.dob && (
                  <>
                    <Label text="Data de nascimento" />
                    <Input
                      value={inputs.dob}
                      errorMessage={
                        submitted && !inputs.dob ? "Campo obrigatório" : ""
                      }
                      placeholder="Data de nascimento"
                      onChangeText={(text) => {
                        if (text.length <= 10 || text === '') {
                          handleChange({name: "dob", value: maskData(text)});
                        }
                      }}
                      keyboardType="number-pad"
                    />
                  </>
                )}
              </>
            ) : (
              <>
                {!customer.pj.cnpj && (
                  <>
                    <Label text="Informe o CNPJ" />
                    <Input
                      value={inputs.cnpj}
                      placeholder="CNPJ"
                      errorMessage={
                        submitted && !inputs.cnpj ? "Campo obrigatório" : ''
                      }
                      onChangeText={(text) => {
                        if (text.length <= 18 || text === "") {
                          handleChange({name: "cnpj", value: maskCnpj(text)});
                        }
                      }}
                      keyboardType="number-pad"
                    />
                  </>
                )}
              </>
            )}
            {!customer.phone_number && (
              <>
                <Label text="Número de Telefone" />
                <Input
                  value={inputs.phone_number}
                  placeholder="Número de telefone"
                  errorMessage={
                    submitted && !inputs.phone_number ? "Campo obrigatório" : ""
                  }
                  onChangeText={(text) => {
                    if (text.length <= 14 || text === "") {
                      handleChange({
                        name: "phone_number",
                        value: maskPhone(text.replace("-", "")),
                      });
                    }
                  }}
                  keyboardType="number-pad"
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
