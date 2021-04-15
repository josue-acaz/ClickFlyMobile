import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';

import Screen from '../../components/Screen';
import ArrowBack from '../../components/ArrowBack';
import SubsectionTitle from '../../components/SubsectionTitle';
import Input from '../../components/Input';
import Form from '../../components/Form';
import Label from '../../components/Label';
import BottomAction from '../../components/BottomAction';
import Button from '../../components/Button';
import Alert from '../../components/Alert';
import BottomSpace from '../../components/BottomSpace';
import Loader from '../../components/Loader';

import {consultZipcode} from '../../services/extra';
import {maskCep, escapeCaracteres} from '../../utils';
import api from '../../services/api';

export default function Address({navigation, route}) {
  const {id, returnRoute} = route.params;
  const edit = id !== "0";
  const [loading, setLoading] = useState(edit);
  const [submitted, setSubmitted] = useState(false);

  const [inputs, setInputs] = useState({
    name: "",
    street: "",
    number: "",
    zipcode: "",
    complement: "",
    neighborhood: "",
    city: "",
    uf: "",
  });

  function handleChange({name, value}) {
    setInputs((inputs) => ({...inputs, [name]: value}));
  }

  const [open, setOpen] = useState({
    open: false,
    error: false,
    success: false,
    processing: false,
  });

  function handleOpen(name) {
    setOpen((open) => ({...open, [name]: true}));
  }

  function handleClose(name) {
    setOpen((open) => ({...open, [name]: false}));
  }

  useEffect(() => {
    async function show(id) {
      try {
        const response = await api.get(`/customer-addresses/${id}/show`);
        const address = response.data;

        Object.keys(address).forEach(key => {
          const value = address[key];
          handleChange({name: key, value});
        });

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    }

    if(edit) {
      show(id);
    }
  }, []);

  async function consultZip(zipcode) {
    try {
      const {bairro, localidade, logradouro, uf} = await consultZipcode(zipcode);

      const autocomplete_address = [
        {
          name: "neighborhood",
          value: bairro,
        },
        {
          name: "city",
          value: localidade,
        },
        {
          name: "street",
          value: logradouro,
        },
        {
          name: "uf",
          value: uf,
        },
      ];

      autocomplete_address.forEach((addr) => {
        handleChange({name: addr.name, value: addr.value});
      });
    } catch (error) {
      // handle error
    }
  }

  function handleSubmit() {
    setSubmitted(true);
    if (
      inputs.name &&
      inputs.street &&
      inputs.number &&
      inputs.neighborhood &&
      inputs.uf &&
      inputs.zipcode &&
      inputs.city
    ) {
      handleOpen("open");
    }
  }

  async function handleEdit(id) {
    handleOpen("processing");

    const data = {
      name: inputs.name,
      uf: inputs.uf,
      city: inputs.city,
      street: inputs.street,
      number: inputs.number,
      zipcode: escapeCaracteres(inputs.zipcode),
      neighborhood: inputs.neighborhood,
      complement: inputs.complement,
    };

    try {
      const response = edit 
      ? await api.put(`/customer-addresses/${id}/update`, data) 
      : await api.post(`/customer-addresses`, data);

      handleClose("processing");
      handleOpen("success");

      if(!edit) {
        handleClose("open");
        navigation.navigate(returnRoute, {loading: true});
      }
    } catch (error) {
      handleClose("processing");
      handleOpen("error");
    }
  }

  function handleFinish() {
    handleClose("open");
    navigation.navigate(returnRoute, {loading: true});
  }

  return (
    <>
      <Screen>
        <Alert
          open={open.open}
          title="Salvar endereço"
          message={edit ? "Atualizar dados?" : "Adicionar endereço?"}
          onConfirm={() => handleEdit(id)}
          onCancel={() => {handleClose("open")}}
          processing={open.processing}
          processingTitle="Efetuando alterações..."
          processingMessage="Por favor, aguarde!"
          error={open.error}
          errorTitle="Ocorreu um erro."
          errorMessage="Desculpe, não foi possível atualizar o endereço!"
          success={open.success}
          successTitle="Endereço atualizado"
          successMessage="O endereço foi atualizado com sucesso!"
          onOk={handleFinish}
        />
        {loading ? <Loader /> : (
          <ScrollView>
            <ArrowBack
              onPress={() => {
                navigation.goBack();
              }}
            />
            <SubsectionTitle text="Meu endereço" />
            <Form>
              <Label text="Nome do endereço" />
              <Input
                value={inputs.name}
                placeholder="Ex.: Minha casa"
                error={submitted && !inputs.name}
                onChangeText={(text) => {
                  handleChange({name: "name", value: text});
                }}
              />
              <Label text="CEP*" />
              <Input
                value={inputs.zipcode}
                placeholder="Informe seu CEP"
                error={submitted && !inputs.zipcode}
                keyboardType="numeric"
                onBlur={() => {
                  consultZip(inputs.zipcode);
                }}
                onChangeText={(text) => {
                  if (text.length <= 9 || text === "") {
                    handleChange({name: "zipcode", value: maskCep(text)});
                  }
                }}
              />
              <Label text="Nome da rua*" />
              <Input
                value={inputs.street}
                placeholder="Nome da rua"
                error={submitted && !inputs.street}
                onChangeText={(text) => {
                  handleChange({name: "street", value: text});
                }}
              />
              <Label text="Número da residência*" />
              <Input
                value={inputs.number}
                placeholder="Número da residência"
                error={submitted && !inputs.number}
                keyboardType="numeric"
                onChangeText={(text) => {
                  handleChange({name: "number", value: text});
                }}
              />
              <Label text="Bairro*" />
              <Input
                value={inputs.neighborhood}
                placeholder="Bairro"
                onChangeText={(text) => {
                  handleChange({name: "neighborhood", value: text});
                }}
                error={submitted && !inputs.neighborhood}
              />
              <Label text="Cidade*" />
              <Input
                value={inputs.city}
                placeholder="Cidade"
                onChangeText={(text) => {
                  handleChange({name: "city", value: text});
                }}
                error={submitted && !inputs.city}
              />
              <Label text="Estado*" />
              <Input
                value={inputs.uf}
                placeholder="UF"
                error={submitted && !inputs.uf}
                onChangeText={(text) => {
                  if (text.length <= 2 || text === "") {
                    handleChange({name: "uf", value: text.toUpperCase()});
                  }
                }}
              />
              <Label text="Complemento" />
              <Input
                value={inputs.complement}
                placeholder="Complemento"
                onChangeText={(text) => {
                  handleChange({name: "complement", value: text});
                }}
              />
            </Form>
            <BottomSpace />
          </ScrollView>
        )}
      </Screen>
      {!loading && (
        <BottomAction>
          <Button text="Alterar" onPress={handleSubmit} />
        </BottomAction>
      )}
    </>
  );
}
