import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {
  Screen,
  ArrowBack,
  SubsectionTitle,
  PayHelp,
  Input,
  Bootstrap,
  LockInput,
  BottomAction,
  Button,
  CardInput,
  Alert,
  BottomOverlay,
  Helpers,
  Label,
} from '../../components';
import {maskCardExpiry} from '../../utils';
import api from '../../services/api';
import mundipagg from '../../services/mundipagg';

const {Row, Col} = Bootstrap;

export default function AddPay({navigation, route}) {
  const {customer, returnRoute} = route.params;
  const walltet_customer_id = customer.customer_id; // Carteira do cliente na Mundipagg

  const [inputs, setInputs] = useState({
    card_number: '',
    expires: '',
    cvv: '',
    holder_name: '',
    brand: '',
  });
  function handleChange(e) {
    const {name, value} = e;
    setInputs((inp) => ({...inp, [name]: value}));
  }
  const toSubmit =
    inputs.holder_name && inputs.expires && inputs.cvv && inputs.card_number;

  const [submitted, setSubmitted] = useState(false);
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

  const [visible, setVisible] = useState(false);
  function handleVisible() {
    setVisible(!visible);
  }

  const [helperName, setHelperName] = useState('');
  function handleHelperName(helper_name) {
    setHelperName(helper_name);
  }

  function handleSubmit() {
    setSubmitted(true);
    if (toSubmit) {
      handleAlert({name: 'open', value: true});
    }
  }

  async function handleAddInWallet() {
    handleAlert({name: 'processing', value: true});

    const newCard = {
      number: inputs.card_number.split(/\s/).join(''),
      holder_name: inputs.holder_name,
      exp_month: Number(inputs.expires.split('/')[0]),
      exp_year: Number(inputs.expires.split('/')[1]),
      cvv: inputs.cvv,
      brand: inputs.brand,
    };

    try {
      const response = await mundipagg.post(
        `/customers/${walltet_customer_id}/cards`,
        newCard,
      );

      const card = response.data;
      const data = {
        card_id: card.id,
        credit: true, // verificar se é necessário
        debit: true, // verificar se é necessário
      };

      await api.post(`/customers/${customer.id}/cards`, data);
      handleAlert({name: 'processing', value: false});
      handleAlert({name: 'success', value: true});
    } catch (err) {
      handleAlert({name: 'processing', value: false});
      handleAlert({name: 'error', value: true});
    }
  }

  function handleFinish() {
    handleAlert({name: 'open', value: false});

    // Se existem etapas
    const steps = route.params.steps || null;
    if (steps) {
      steps.shift();
      route.params.steps = steps;
      navigation.navigate(
        steps.length > 0 ? steps[0].route : returnRoute,
        route.params,
      );
      return;
    }

    // Se não existem etapas
    if (alert.error) {
      navigation.goBack();
    } else {
      console.log('Foi aqui...');
      navigation.navigate(returnRoute, {loading: true});
    }
  }

  return (
    <>
      <Screen>
        <Alert
          open={alert.open}
          title="Novo meio de pagamento"
          message="Adicionar novo cartão?"
          onConfirm={handleAddInWallet}
          onCancel={() => {
            handleAlert({name: 'open', value: false});
          }}
          processing={alert.processing}
          processingTitle="Adicionando novo cartão..."
          processingMessage="Por favor, aguarde!"
          error={alert.error}
          errorTitle="Erro"
          errorMessage="Desculpe, não foi possível adicionar o cartão!"
          success={alert.success}
          successTitle="Cartão adicionado"
          successMessage="O novo meio de pagamento foi adicionado com sucesso!"
          onOk={handleFinish}
        />
        <ScrollView>
          <ArrowBack
            onPress={() => {
              navigation.goBack();
            }}
          />
          <SubsectionTitle text="Cartão de Crédito/Débito" />
          <View style={styles.payHelp}>
            <PayHelp
              onHelp={() => {
                handleHelperName('AboutDebit');
                handleVisible();
              }}
            />
          </View>
          <View style={styles.form}>
            <Label text="Número do cartão" />
            <CardInput
              value={inputs.card_number}
              placeholder="Número do cartão"
              onChangeText={(e, brand) => {
                handleChange(e);
                handleChange({name: 'brand', value: brand});
              }}
              error={submitted && !inputs.card_number}
            />
            <Row>
              <Col style={styles.colLeft} size="5">
                <Label text="Validade" />
                <Input
                  value={inputs.expires}
                  placeholder="MM/AA"
                  onChangeText={(text) => {
                    if (text.length <= 5 || text === '') {
                      handleChange({
                        name: 'expires',
                        value: maskCardExpiry(text),
                      });
                    }
                  }}
                  error={submitted && !inputs.expires}
                />
              </Col>
              <Col style={styles.colRight} size="5">
                <Label text="CVV" />
                <LockInput
                  placeholder="CVV"
                  value={inputs.cvv}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    if (text.length <= 4 || text === '') {
                      handleChange({
                        name: 'cvv',
                        value: text.replace(/\D/g, ''),
                      });
                    }
                  }}
                  helper={true}
                  onHelp={() => {
                    handleHelperName('CVV');
                    handleVisible();
                  }}
                  error={submitted && !inputs.cvv}
                  errorTxt="Preencha este campo"
                  iconColor="#666666"
                />
              </Col>
            </Row>
            <Label text="Nome do titular" />
            <Input
              value={inputs.holder_name}
              placeholder="Nome do titular"
              onChangeText={(text) => {
                handleChange({name: 'holder_name', value: text});
              }}
              error={submitted && !inputs.holder_name}
            />
          </View>
        </ScrollView>
        <BottomOverlay visible={visible} handleVisible={handleVisible}>
          {helperName === 'AboutDebit' ? (
            <Helpers.AboutDebit onDimiss={handleVisible} />
          ) : (
            <Helpers.CVV onDimiss={handleVisible} />
          )}
        </BottomOverlay>
      </Screen>
      <BottomAction>
        <Button text="Salvar" onPress={handleSubmit} disabled={!toSubmit} />
      </BottomAction>
    </>
  );
}

const styles = StyleSheet.create({
  payHelp: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 35,
  },
  form: {
    marginTop: 20,
  },
  colRight: {
    paddingLeft: 5,
  },
  colLeft: {
    paddingRight: 5,
  },
});
