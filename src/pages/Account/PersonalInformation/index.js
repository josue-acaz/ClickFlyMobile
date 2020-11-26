import React, {useState, useEffect} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';
import {
  Screen,
  SubsectionTitle,
  ArrowBack,
  Button,
  BottomAction,
  Alert,
  Label,
} from '../../../components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  rmCPF,
  rmDOB,
  rmEspecialCaracteres,
  maskPhone,
  maskCnpj,
  maskCpf,
  maskData,
  inCPF,
  inDOB,
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
  const customer_type = customer.type.replace('-', '_');
  const user = {
    ...customer.user,
    ...customer[customer_type],
  };
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    rg: '',
    cpf: '',
    dob: '',
    phone: '',
    cnpj: '',
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
    const elements = [
      {
        id: 1,
        label: 'name',
        value: user.name,
      },
      {
        id: 2,
        label: 'email',
        value: user.email,
      },
      {
        id: 3,
        label: 'rg',
        value: user.rg || '',
      },
      {
        id: 4,
        label: 'cpf',
        value: rmCPF(user.cpf) || '',
      },
      {
        id: 5,
        label: 'dob',
        value: rmDOB(user.dob) || '',
      },
      {
        id: 6,
        label: 'cnpj',
        value: user.cnpj || '',
      },
      {
        id: 7,
        label: 'phone',
        value: user.phone,
      },
    ];

    elements.forEach((el) => {
      handleChange({name: el.label, value: el.value});
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit() {
    handleAlert({name: 'open', value: true});
  }
  async function handleUpdate() {
    handleAlert({name: 'processing', value: true});
    const data = {
      user: {
        name: inputs.name,
        email: inputs.email,
        phone: inputs.phone,
      },
      customer: {},
      entity: {
        rg: inputs.rg,
        cpf: inputs.cpf ? inCPF(inputs.cpf) : null,
        dob: inputs.dob ? inDOB(inputs.dob) : null,
        cnpj: inputs.cnpj ? rmEspecialCaracteres(inputs.cnpj) : null,
      },
    };

    try {
      await api.put(`/customers/${customer.id}/update`, data);
      handleAlert({name: 'processing', value: false});
      handleAlert({name: 'success', value: true});
    } catch (err) {
      handleAlert({name: 'processing', value: false});
      handleAlert({name: 'error', value: true});
    }
  }
  function handleFinish() {
    handleAlert({name: 'open', value: false});
    handleGoBack();
  }

  return (
    <>
      <Alert
        open={alert.open}
        title="Atualizar informações"
        message="Confirmar alteração dos dados?"
        onConfirm={handleUpdate}
        onCancel={() => {
          handleAlert({name: 'open', value: false});
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
            {customer_type === 'physical_entity' ? (
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
                    if (text.length <= 14 || text === '') {
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
                    if (text.length <= 10 || text === '') {
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
                    if (text.length <= 18 || text === '') {
                      handleChange({name: 'cnpj', value: maskCnpj(text)});
                    }
                  }}
                />
              </>
            )}
            <Label text="Número de Telefone" />
            <Input
              keyboardType="number-pad"
              placeholder="Telefone"
              value={inputs.phone}
              leftIcon={<PhoneIcon />}
              onChangeText={(value) => {
                if (value.length <= 14 || value === '') {
                  handleChange({
                    name: 'phone',
                    value: maskPhone(value.replace('-', '')),
                  });
                }
              }}
            />
          </View>
        </ScrollView>
      </Screen>
      <BottomAction>
        <Button text="Alterar" onPress={handleSubmit} />
      </BottomAction>
    </>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 50,
  },
});
