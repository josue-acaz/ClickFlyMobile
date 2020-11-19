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
} from '../../components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const LockIcon = () => (
  <MaterialIcons name="lock-outline" size={24} color="#666666" />
);

const {Row, Col} = Bootstrap;

export default function AddPay({navigation}) {
  const [inputs, setInputs] = useState({
    card_number: '',
    expires: '',
    cvv: '',
    holder_name: '',
    document: '', // CPF/CNPJ
  });
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
      <Screen>
        <ScrollView>
          <ArrowBack
            onPress={() => {
              navigation.goBack();
            }}
          />
          <SubsectionTitle text="Cartão de Crédito/Débito" />
          <View style={styles.payHelp}>
            <PayHelp />
          </View>
          <View style={styles.form}>
            <Input
              value={inputs.card_number}
              adorment={<LockIcon />}
              adormentPosition="end"
              placeholder="Número do cartão"
              error={submitted && !inputs.card_number}
            />
            <Row>
              <Col style={styles.colLeft} size="5">
                <Input
                  value={inputs.expires}
                  placeholder="Validade"
                  onChangeText={() => {}}
                  error={submitted && !inputs.expires}
                />
              </Col>
              <Col style={styles.colRight} size="5">
                <LockInput
                  placeholder="CVV"
                  value={inputs.cvv}
                  onChangeText={() => {}}
                  error={submitted && !inputs.cvv}
                  errorTxt="Preencha este campo"
                  iconColor="#666666"
                />
              </Col>
            </Row>
            <Input
              value={inputs.holder_name}
              placeholder="Nome do titular"
              onChangeText={() => {}}
              error={submitted && !inputs.holder_name}
            />
            <Input
              value={inputs.document}
              placeholder="CPF/CNPJ"
              onChangeText={() => {}}
              error={submitted && !inputs.document}
            />
          </View>
        </ScrollView>
      </Screen>
      <BottomAction>
        <Button
          text="Salvar"
          disabled={
            !(
              inputs.holder_name &&
              inputs.expires &&
              inputs.cvv &&
              inputs.card_number &&
              inputs.document
            )
          }
        />
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
