import React, {useState, useEffect} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';

import Screen from '../../../components/Screen';
import SubsectionTitle from '../../../components/SubsectionTitle';
import ArrowBack from '../../../components/ArrowBack';
import BottomAction from '../../../components/BottomAction';
import Alert from '../../../components/Alert';
import Label from '../../../components/Label';
import BottomSpace from '../../../components/BottomSpace';
import Button from '../../../components/Button';

import {EnumCustomerTypes, EnumDateFormatTypes} from '../../../constants';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  getFormattedDatetime,
  escapeCaracteres,
  readableCpf,
  maskPhone,
  maskCnpj,
  maskCpf,
  maskData,
} from '../../../utils';
import api from '../../../services/api';

const UserIcon = () => <FontAwesome name="user" size={22} color="gray" />;
const EmailIcon = () => <MaterialIcons name="email" size={22} color="gray" />;
const FingerPrintIcon = () => (
  <MaterialIcons name="fingerprint" size={22} color="gray" />
);
const DateIcon = () => (
  <MaterialIcons name="date-range" size={22} color="gray" />
);
const IDCardIcon = () => (
  <FontAwesome name="id-card-o" size={22} color="gray" />
);
const PhoneIcon = () => <MaterialIcons name="phone" size={22} color="gray" />;

export default function PersonalInformation({navigation, route}) {
  const {customer} = route.params;
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone_number: "",
    rg: "",
    cpf: "",
    dob: "",
    ctps: "",
    cnh: "",
    cnpj: "",
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

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    var form = [
      {
        name: "name",
        value: customer.name,
      },
      {
        name: "email",
        value: customer.email,
      },
      {
        name: "phone_number",
        value: maskPhone(customer.phone_number),
      }
    ];

    if(customer.type === EnumCustomerTypes.PF) {
      form[3] = {
        name: "rg",
        value: customer.pf.rg,
      };
      
      form[4] = {
        name: "dob",
        value: getFormattedDatetime(new Date(customer.pf.dob), EnumDateFormatTypes.READABLE_V2),
      };

      form[5] = {
        name: "cpf",
        value: readableCpf(customer.pf.cpf),
      };
    } else if(customer.type === EnumCustomerTypes.PJ) {
      form[3] = {
        name: "cnpj",
        value: maskCnpj(customer.pj.cnpj),
      };
    }
    
    form.forEach(element => {
      handleChange({name: element.name, value: element.value});
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit() {
    handleAlert({name: "open", value: true});
  }

  async function handleEdit(id) {
    handleAlert({name: "processing", value: true});

    const data = {
      name: inputs.name,
      email: inputs.email,
      rg: inputs.rg,
      cpf: escapeCaracteres(inputs.cpf),
      dob: inputs.dob.split("/").reverse().join("-"),
      phone_number: escapeCaracteres(inputs.phone_number)
    };

    try {
      await api.put(`/customers/${id}/update`, data);
      handleAlert({name: "processing", value: false});
      handleAlert({name: "success", value: true});
    } catch (err) {
      handleAlert({name: "processing", value: false});
      handleAlert({name: "error", value: true});
    }
  }
  function handleFinish() {
    handleAlert({name: "open", value: false});
    handleGoBack();
  }

  return (
    <>
      <Alert
        open={alert.open}
        title="Atualizar informações"
        message="Confirmar alteração dos dados?"
        onConfirm={() => handleEdit(customer.id)}
        onCancel={() => {
          handleAlert({name: "open", value: false});
        }}
        processing={alert.processing}
        processingTitle="Estamos atualizando seus dados..."
        processingMessage="Por favor, aguarde!"
        error={alert.error}
        errorTitle="Erro"
        errorMessage="Ocorreu um erro ao processar sua solicitação!"
        success={alert.success}
        successTitle="Informações atualizadas"
        successMessage="Suas informações foram atualizadas com sucesso!"
        onOk={handleFinish}
      />
      <Screen>
        <ScrollView>
          <ArrowBack onPress={handleGoBack} />
          <SubsectionTitle text="Informações Pessoais" />
          <View style={styles.form}>
            <Label text="Nome completo" />
            <Input
              autoCapitalize="words"
              autoCorrect={false}
              keyboardType="default"
              value={inputs.name}
              placeholder="Nome completo"
              leftIcon={<UserIcon />}
              onChangeText={(text) => {
                handleChange({name: 'name', value: text});
              }}
            />
            <Label text="Endereço de email" />
            <Input
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Endereço de email"
              value={inputs.email}
              leftIcon={<EmailIcon />}
              onChangeText={(text) => {
                handleChange({name: 'email', value: text});
              }}
            />
            {customer.type === EnumCustomerTypes.PF ? (
              <>
                <Label text="Número do RG" />
                <Input
                  keyboardType="numeric"
                  placeholder="RG"
                  value={inputs.rg}
                  leftIcon={<IDCardIcon />}
                  onChangeText={(text) => {
                    handleChange({name: 'rg', value: text});
                  }}
                />
                <Label text="Número do CPF" />
                <Input
                  keyboardType="numeric"
                  placeholder="CPF"
                  value={inputs.cpf}
                  leftIcon={<FingerPrintIcon />}
                  onChangeText={(text) => {
                    if (text.length <= 14 || text === "") {
                      handleChange({name: 'cpf', value: maskCpf(text)});
                    }
                  }}
                />
                <Label text="Data de nascimento" />
                <Input
                  keyboardType="numeric"
                  placeholder="Data de nascimento"
                  value={inputs.dob}
                  leftIcon={<DateIcon />}
                  onChangeText={(text) => {
                    if (text.length <= 10 || text === "") {
                      handleChange({name: 'dob', value: maskData(text)});
                    }
                  }}
                />
              </>
            ) : (
              <>
                <Label text="Número do CNPJ" />
                <Input
                  keyboardType="numeric"
                  placeholder="CNPJ"
                  value={inputs.cnpj}
                  leftIcon={<IDCardIcon />}
                  onChangeText={(text) => {
                    if (text.length <= 18 || text === "") {
                      handleChange({name: 'cnpj', value: maskCnpj(text)});
                    }
                  }}
                />
              </>
            )}
            <Label text="Número de Telefone" />
            <Input
              keyboardType="phone-pad"
              placeholder="Telefone"
              value={inputs.phone_number}
              leftIcon={<PhoneIcon />}
              onChangeText={(value) => {
                if (value.length <= 14 || value === "") {
                  handleChange({
                    name: 'phone',
                    value: maskPhone(value.replace('-', "")),
                  });
                }
              }}
            />
          </View>
          <BottomSpace />
        </ScrollView>
      </Screen>
      <BottomAction>
        <Button text="Salvar" onPress={handleSubmit} />
      </BottomAction>
    </>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 50,
  },
});
