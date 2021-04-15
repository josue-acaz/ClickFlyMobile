import React, {useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';

import Screen from '../../../components/Screen';
import ArrowBack from '../../../components/ArrowBack';
import SubsectionTitle from '../../../components/SubsectionTitle';
import BottomAction from '../../../components/BottomAction';
import Button from '../../../components/Button';
import Bootstrap from '../../../components/Bootstrap';
import Radio from '../../../components/Radio';
import Inline from '../../../components/Inline';
import LegSummary from '../../../components/LegSummary';

import {currency} from '../../../utils';

const {Row, Col} = Bootstrap;

export default function TripSummary({navigation, route}) {
  const {
    flight: {
      origin_aerodrome,
      destination_aerodrome,
      departure_datetime,
      aircraft,
    },
    selected_seats,
    subtotal,
  } = route.params;
  const [checked, setChecked] = useState("credit/debit");
  function handleChecked(value) {
    setChecked(value);
  }

  function handleCheckout() {
    navigation.navigate('Checkout', {
      screen: 'Client',
      params: {...route.params, payment_method: checked},
    });
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
          <SubsectionTitle text="Resumo da sua viagem" />
          <LegSummary
            origin_aerodrome={origin_aerodrome}
            destination_aerodrome={destination_aerodrome}
            departure_datetime={departure_datetime}
            aircraft={aircraft}
            subtotal={subtotal}
            selected_seats={selected_seats}
          />
          <View style={styles.payment}>
            <Text style={styles.payMethod}>Selecione um meio de pagamento</Text>
            <Inline
              style={styles.radio}
              components={[
                {
                  id: 1,
                  component: (
                    <Radio
                      value="credit/debit"
                      selected={checked}
                      onChange={handleChecked}
                    />
                  ),
                },
                {
                  id: 2,
                  component: (
                    <Text style={styles.radioLabel}>
                      Cartão de Crédito ou Débito
                    </Text>
                  ),
                },
              ]}
            />
            <Inline
              style={styles.radio}
              components={[
                {
                  id: 1,
                  component: (
                    <Radio
                      value="boleto"
                      selected={checked}
                      onChange={handleChecked}
                    />
                  ),
                },
                {
                  id: 2,
                  component: (
                    <Text style={styles.radioLabel}>Boleto Bancário</Text>
                  ),
                },
              ]}
            />
            <Inline
              style={styles.radio}
              components={[
                {
                  id: 1,
                  component: (
                    <Radio
                      value="pix"
                      selected={checked}
                      onChange={handleChecked}
                    />
                  ),
                },
                {
                  id: 2,
                  component: (
                    <Text style={styles.radioLabel}>Pix</Text>
                  ),
                },
              ]}
            />
          </View>
        </ScrollView>
      </Screen>
      <BottomAction>
        <Row>
          <Col size="5">
            <Text style={styles.price}>R$ {currency(subtotal)}</Text>
            <Text style={styles.subtotal}>Subtotal</Text>
          </Col>
          <Col size="5">
            <Button text="Comprar" onPress={handleCheckout} />
          </Col>
        </Row>
      </BottomAction>
    </>
  );
}

const styles = StyleSheet.create({
  subtotal: {
    fontSize: 14,
    color: '#00B2A9',
  },

  price: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#444',
  },
  payment: {
    marginTop: 60,
  },
  payMethod: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#999',
    textTransform: 'uppercase',
  },

  radioLabel: {
    fontSize: 16,
    color: '#666',
  },
  radio: {
    marginTop: 8,
  },
});
