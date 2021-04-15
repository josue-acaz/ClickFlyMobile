import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Inline from '../../components/Inline';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getDatetime} from '../../utils';

const SeatIcon = ({style}) => (
  <MaterialIcons
    style={style}
    name="airline-seat-recline-extra"
    size={24}
    color="#00B2A9"
  />
);

const ArrowIcon = ({style}) => (
  <MaterialIcons
    style={style}
    name="keyboard-arrow-right"
    size={28}
    color="#00B2A9"
  />
);

export default function BookingItem({booking, handleShow}) {
  const {approved, selected_seats, aircraft, flight_segment} = booking;
  const {departure_datetime, origin_aerodrome, destination_aerodrome} = flight_segment;
  
  return (
    <TouchableOpacity onPress={handleShow} style={styles.booking}>
      <Inline
        justify="space-between"
        components={[
          {
            id: 1,
            component: (
              <Inline
                components={[
                  {
                    id: 1,
                    component: (
                      <View style={styles.passengers}>
                        <Inline
                          components={[
                            {
                              id: 1,
                              component: <SeatIcon style={styles.icon} />,
                            },
                            {
                              id: 2,
                              component: (
                                <Text style={styles.seats}>
                                  {selected_seats}
                                </Text>
                              ),
                            },
                          ]}
                        />
                      </View>
                    ),
                  },
                  {
                    id: 2,
                    component: (
                      <View style={styles.informations}>
                        <Text style={styles.leg}>
                          {origin_aerodrome.city.name} •{' '}
                          {destination_aerodrome.city.name}
                        </Text>
                        <Text style={styles.departure}>
                          {getDatetime(departure_datetime)}
                        </Text>
                        <Text style={styles.status}>
                          {approved
                            ? "Aguardando embarque"
                            : "Pagamento pendente"}
                        </Text>
                      </View>
                    ),
                  },
                ]}
              />
            ),
          },
          {
            id: 3,
            component: (
              <TouchableOpacity onPress={handleShow}>
                <ArrowIcon />
              </TouchableOpacity>
            ),
          },
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  booking: {
    paddingBottom: 10,
    paddingTop: 10,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#cccccc',
    marginBottom: 8,
  },
  passengers: {
    backgroundColor: '#fafafa',
    borderRadius: 20000,
    height: 60,
    width: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#cccccc',
  },
  seats: {
    fontSize: 16,
    color: '#00B2A9',
  },
  leg: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
  },
  departure: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#00B2A9',
  },
  status: {
    fontSize: 18,
    color: '#666',
  },
});
