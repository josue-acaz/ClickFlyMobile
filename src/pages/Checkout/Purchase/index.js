import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';

import Screen from '../../../components/Screen';
import SubsectionTitle from '../../../components/SubsectionTitle';
import ArrowBack from '../../../components/ArrowBack';
import LegSummary from '../../../components/LegSummary';
import BottomAction from '../../../components/BottomAction';
import Button from '../../../components/Button';
import Inline from '../../../components/Inline';
import VerticalSpaceBetween from '../../../components/VerticalSpaceBetween';
import CardSelect from '../../../components/CardSelect';
import Loader from '../../../components/Loader';
import Alert from '../../../components/Alert';
import SlipPayment from '../../../components/SlipPayment';
import BottomOverlay from '../../../components/BottomOverlay';
import Helpers from '../../../components/Helpers';
import Installments from '../../../components/Installments';

import {currency} from '../../../utils';
import api from '../../../services/api';
import {EnumPaymentMethods} from '../../../constants';

export default function Purchase({navigation, route}) {
  const {
    subtotal,
    customer,
    selected_seats,
    passengers,
    payment_method,
    flight,
  } = route.params;

  const {
    origin_aerodrome,
    destination_aerodrome,
    departure_datetime,
    aircraft,
  } = flight;

  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [customerCards, setCustomerCards] = useState([]);
  const [cardSelected, setCardSelected] = useState(null);
  const [installments, setInstallments] = useState(1);
  const [method, setMethod] = useState(EnumPaymentMethods.CREDIT_CARD); // Nos casos com compra em cartão
  function handleChangeMethod() {
    setMethod(method === EnumPaymentMethods.CREDIT_CARD ? EnumPaymentMethods.DEBIT_CARD : EnumPaymentMethods.CREDIT_CARD);
  }

  const [alert, setAlert] = useState({
    open: false,
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

  function handleCardSelect(card) {
    setCardSelected(card);
  }

  useEffect(() => {
    setLoading(true);
    async function index() {
      try {
        const response = await api.get(`/customer-cards`, {
          headers: {
            customer_id: customer.id
          }
        });
        const cards = response.data;
        setCustomerCards(cards);
        setCardSelected(cards[cards.length - 1]); // Pega o último cartão
        setLoading(false);
      } catch (error) {
        // handle error
        setLoading(false);
      }
    }

    index();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params]);

  function handleAddPayment() {
    navigation.navigate("AddPay", {customer, returnRoute: "Purchase"});
  }

  function handleSubmit() {
    handleAlert({name: "error", value: false});
    handleAlert({name: "success", value: false});
    handleAlert({name: "open", value: true});
  }

  async function handleBooking() {
    setSubmitted(true);
    setLoading(true);
    handleAlert({name: "open", value: false});

    const data = {passengers};

    try {
      const response = await api.post("bookings", data, {
        headers: {
          customer_card_id: cardSelected.id,
          flight_segment_id: flight.id,
          payment_method: method,
          installments: installments,
        }
      });

      const booking = response.data;

      switch (payment_method) {
        case "credit/debit":
          navigation.navigate("ViewPay", {booking});
          break;
        case "pix":
          navigation.navigate("ViewPix", {booking});
          break;
        case "boleto":
          navigation.navigate("ViewSlip", {booking, subtotal});
          break;
        default:
          break;
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      handleAlert({name: "error", value: true});
      handleAlert({name: "open", value: true});
      setLoading(false);
    }
  }

  // Fecha alert se o pagamento falhar
  function handleOk() {
    handleAlert({name: "open", value: false});
  }

  return (
    <>
      <Screen>
        <Alert
          open={alert.open}
          title="Efetuar reserva"
          message={
            payment_method === "credit/debit" || payment_method === "pix"
              ? `Confirmar a reserva e efetuar o pagamento no valor de R$ ${currency(subtotal)}?`
              : `Gerar o boleto de pagamento no valor de R$ ${currency(subtotal)}?`
          }
          onConfirm={handleBooking}
          onCancel={() => {
            handleAlert({name: "open", value: false});
          }}
          success={alert.success}
          successTitle="Boleto gerado!"
          successMessage="Siga as instruções de pagamento"
          error={alert.error}
          errorTitle="Erro"
          errorMessage="Não foi possível finalizar sua reserva"
          onOk={handleOk}
        />
        {loading ? (
          submitted && (
            <Loader
              title="Efetuando reserva..."
              subtitle="Por favor, aguarde!"
            />
          )
        ) : (
          <>
            <ArrowBack
              onPress={() => {
                navigation.goBack();
              }}
            />
            <SubsectionTitle text="Finalizar compra" />
            <LegSummary
              origin_aerodrome={origin_aerodrome}
              destination_aerodrome={destination_aerodrome}
              departure_datetime={departure_datetime}
              aircraft={aircraft}
              subtotal={subtotal}
              selected_seats={selected_seats}
            />
            {payment_method === "credit/debit" && method === EnumPaymentMethods.CREDIT_CARD && (
              <Installments
                onSelect={(installment) => {
                  setInstallments(installment);
                }}
                subtotal={subtotal}
              />
            )}
          </>
        )}
        <BottomOverlay visible={visible} handleVisible={handleVisible}>
          <Helpers.SlipPay onDimiss={handleVisible} />
        </BottomOverlay>
      </Screen>
      {!loading && (
        <BottomAction>
          <View style={styles.actions}>
            <Inline
              style={styles.inline}
              justify="space-between"
              components={[
                {
                  id: 1,
                  component: (
                    <VerticalSpaceBetween
                      components={[
                        {
                          id: 1,
                          component: (
                            <Text style={styles.price}>
                              R$ {currency(subtotal)}
                            </Text>
                          ),
                        },
                        {
                          id: 2,
                          component: <Text style={styles.subtotal}>Total</Text>,
                        },
                      ]}
                    />
                  ),
                },
                {
                  id: 2,
                  component:
                    payment_method === "credit/debit" ? (
                      <CardSelect
                        cards={customerCards}
                        cardSelected={cardSelected}
                        handleCardSelect={handleCardSelect}
                        onAddPayment={handleAddPayment}
                        onChangeMethod={handleChangeMethod}
                        method={method}
                      />
                    ) : (
                      <SlipPayment onHelp={handleVisible} />
                    ),
                },
              ]}
            />
          </View>
          <Button text="Reservar" onPress={handleSubmit} />
        </BottomAction>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    height: 60,
  },
  actions: {
    height: 70,
    paddingTop: 10,
    paddingBottom: 10,
  },
  inline: {
    height: '100%',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#444',
  },
  subtotal: {
    fontSize: 14,
    color: '#00B2A9',
  },
});
