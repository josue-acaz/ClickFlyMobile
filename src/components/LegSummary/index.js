import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Bootstrap, Inline} from '../../components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getDatetime, currency} from '../../utils';

const {Row, Col} = Bootstrap;

const ArrowIcon = () => (
  <MaterialIcons name="arrow-forward" size={22} color="#333" />
);

const getRouteLabel = ({
  origin_aerodrome_prefix,
  destination_aerodrome_prefix,
}) => (
  <Inline
    components={[
      {
        id: 1,
        component: (
          <Text style={styles.routeLabel}>{origin_aerodrome_prefix}</Text>
        ),
      },
      {
        id: 2,
        component: <ArrowIcon />,
      },
      {
        id: 3,
        component: (
          <Text style={styles.routeLabel}>{destination_aerodrome_prefix}</Text>
        ),
      },
    ]}
  />
);

export default function LegSummary({
  origin_aerodrome,
  destination_aerodrome,
  aircraft,
  departure_datetime,
  selected_seats,
  subtotal,
}) {
  return (
    <View style={styles.summary}>
      <Text style={styles.tripTitle}>
        {origin_aerodrome.city.name} • {destination_aerodrome.city.name}
      </Text>

      <Inline
        components={[
          {
            id: 1,
            component: (
              <Image
                style={styles.thumbnail}
                source={{uri: aircraft.thumbnail}}
              />
            ),
          },
          {
            id: 2,
            component: (
              <View>
                <Text style={styles.departureDate}>
                  {getDatetime(departure_datetime)}
                </Text>
                {getRouteLabel({
                  origin_aerodrome_prefix: origin_aerodrome.oaci_code,
                  destination_aerodrome_prefix: destination_aerodrome.oaci_code,
                })}
                <Text style={styles.selectedSeats}>
                  {selected_seats}{' '}
                  {selected_seats > 1
                    ? 'assentos selecionados'
                    : 'assento selecionado'}
                </Text>
                <Text style={styles.priceItem}>R$ {currency(subtotal)}</Text>
              </View>
            ),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tripTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#444444',
    marginBottom: 10,
  },
  summary: {
    marginTop: 40,
  },
  thumbnail: {
    width: 150,
    height: 90,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  departureDate: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#00B2A9',
  },
  selectedSeats: {
    fontSize: 16,
    color: '#666',
  },
  routeLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  priceItem: {
    fontSize: 14,
    color: '#333',
  },
});
