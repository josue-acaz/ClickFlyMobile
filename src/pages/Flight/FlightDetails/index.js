import React, {useState} from 'react';
import {ScrollView, Text, StyleSheet, View} from 'react-native';
import NumericInput from 'react-native-numeric-input';
import {
  Screen,
  SubsectionTitle,
  ArrowBack,
  BottomAction,
  Button,
  Bootstrap,
  BottomOverlay,
  Aircraft,
  RouteGraph,
  BottomSpace,
} from '../../../components';
import {currency, calcSubtotal} from '../../../utils';

const {Row, Col} = Bootstrap;

export default function FlightDetails({navigation, route}) {
  const {flight} = route.params;
  const [visible, setVisible] = useState(false);
  function handleVisible() {
    setVisible(!visible);
  }

  const [seats, setSeats] = useState(1);

  function handleTripSummary() {
    handleVisible();
    navigation.navigate('TripSummary', {
      flight,
      selected_seats: seats,
      subtotal: calcSubtotal(flight.price_per_seat, seats),
    });
  }

  function handleMoreAircraft(aircraft) {
    navigation.navigate('Aircraft', {aircraft});
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
          <SubsectionTitle text="Detalhes do voo" />
          <Aircraft
            aircraft={flight.aircraft}
            onRequestMore={handleMoreAircraft}
          />
          <RouteGraph
            data={{
              origin_aerodrome: flight.origin_aerodrome,
              destination_aerodrome: flight.destination_aerodrome,
              arrival_datetime: flight.arrival_datetime,
              departure_datetime: flight.departure_datetime,
            }}
          />
          <BottomSpace />
        </ScrollView>
      </Screen>
      <BottomAction>
        <Row>
          <Col size="5">
            <Text style={styles.priceTxt}>
              <Text style={styles.price}>
                R$ {currency(flight.price_per_seat)}
              </Text>{' '}
              por assento
            </Text>
            <Text style={styles.availableSeats}>
              {flight.available_seats} assentos disponíveis
            </Text>
          </Col>
          <Col size="5">
            <Button text="Reservar" onPress={handleVisible} />
          </Col>
        </Row>
      </BottomAction>
      <BottomOverlay visible={visible} handleVisible={handleVisible}>
        <Text style={styles.chooseSeatTxt}>
          Escolha o número de assentos necessários
        </Text>
        <View style={styles.seatsContent}>
          <NumericInput
            value={seats}
            onChange={(value) => {
              setSeats(value);
            }}
            totalWidth={240}
            totalHeight={52}
            iconSize={25}
            step={1}
            valueType="integer"
            type="up-down"
            textColor="#444"
            iconStyle={styles.seatsInputColor}
            minValue={1}
            maxValue={28}
          />
        </View>
        <Row>
          <Col size="5">
            <Text style={styles.priceOverlay}>
              R$ {currency(calcSubtotal(flight.price_per_seat, seats))}
            </Text>
            <Text style={styles.seatsTxtOverlay}>
              {flight.available_seats} assento selecionado
            </Text>
          </Col>
          <Col size="5">
            <Button text="Reservar" onPress={handleTripSummary} />
          </Col>
        </Row>
      </BottomOverlay>
    </>
  );
}

const styles = StyleSheet.create({
  price: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#444',
  },
  priceTxt: {
    fontSize: 16,
    color: '#444',
  },
  availableSeats: {
    color: '#00B2A9',
    fontSize: 14,
  },
  chooseSeatTxt: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#444',
  },
  seatsInputColor: {color: '#00B2A9'},
  seatsContent: {
    paddingBottom: 50,
    paddingTop: 50,
  },
  priceOverlay: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
  },
  seatsTxtOverlay: {
    fontSize: 14,
    color: '#444',
  },
});
