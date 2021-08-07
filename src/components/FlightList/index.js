import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getDatetime, currency} from '../../utils';
import Inline from '../../components/Inline';
import {useNavigation} from '@react-navigation/native';

const ArrowIcon = () => (
  <MaterialIcons name="arrow-forward" size={22} color="#333" />
);

const {width, height} = Dimensions.get('screen');

function getRouteLabel(Icon, route) {
  const {
    originAerodromePrefix,
    destinationAerodromePrefix,
    availableSeats,
  } = route;

  return (
    <View style={styles.routeLabel}>
      <Inline
        components={[
          {
            id: 1,
            component: (
              <Text style={styles.prefix}>{originAerodromePrefix}</Text>
            ),
          },
          {
            id: 2,
            component: <Icon />,
          },
          {
            id: 3,
            component: (
              <Text style={styles.prefix}>{destinationAerodromePrefix},</Text>
            ),
          },
          {
            id: 4,
            component: (
              <Text style={styles.availableSeats}>
                {availableSeats} assentos disponíveis
              </Text>
            ),
          },
        ]}
      />
    </View>
  );
}

export default function FlightList({data}) {
  const navigation = useNavigation();
  const {origin_city, destination_city, flights} = data;

  function handleShowFlight(flight) {
    navigation.navigate("FlightDetails", {flight});
  }

  return (
    <View style={styles.leg}>
      <Text style={styles.origin}>Saindo de {origin_city.name}</Text>
      <Text style={styles.destination}>Para {destination_city.name}</Text>
      <View style={styles.list}>
        <FlatList
          data={flights}
          horizontal
          style={styles.flatlist}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id + ''}
          renderItem={({item}, index) => {
            const {aircraft, origin_aerodrome, destination_aerodrome} = item;
            return (
              <TouchableOpacity
                style={
                  index === flights.length - 1
                    ? {...styles.item, ...styles.removeMarginRight}
                    : styles.item
                }
                onPress={() => handleShowFlight(item)}>
                <Image
                  style={styles.thumbnail}
                  source={{uri: aircraft.thumbnail.url}}
                />
                <View style={styles.content}>
                  <Text style={styles.departureDate}>
                    {getDatetime(item.departure_datetime)}
                  </Text>
                  {getRouteLabel(ArrowIcon, {
                    originAerodromePrefix: origin_aerodrome.oaci_code,
                    destinationAerodromePrefix: destination_aerodrome.oaci_code,
                    availableSeats: 2,
                  })}
                  <Text style={styles.price}>
                    R$ {currency(item.price_per_seat)} por assento
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  leg: {
    marginTop: 15,
  },
  origin: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#444444',
  },
  destination: {
    fontSize: 18,
    color: '#666666',
  },
  list: {
    marginTop: 10,
  },
  flatlist: {},
  item: {
    marginRight: 10,
  },
  removeMarginRight: {
    marginRight: 0,
  },
  thumbnail: {
    width: width * 0.82,
    height: height * 0.22,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  content: {
    marginTop: 5,
  },
  departureDate: {
    fontSize: 14,
    textTransform: 'uppercase',
    color: '#00B2A9',
    fontWeight: 'bold',
  },
  prefix: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  availableSeats: {
    fontSize: 16,
    color: '#444',
  },
  price: {
    fontSize: 12,
    color: '#444',
  },
});
