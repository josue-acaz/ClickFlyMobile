import React, {useState, useEffect} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';

import Screen from '../../../components/Screen';
import SectionTitle from '../../../components/SectionTitle';
import Loader from '../../../components/Loader';
import Subtitle from '../../../components/Subtitle';
import FlightList from '../../../components/FlightList';

import api from '../../../services/api';

export default function EmptyLegs({navigation, route}) {
  const [loading, setLoading] = useState(true);
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    async function index() {
      try {
        const response = await api.get("/find-flights");
        setFlights(response.data);
        setLoading(false);
      } catch (err) {
        // handle error
        setLoading(false);
      }
    }

    index();
  }, []);

  return (
    <Screen>
      {loading ? (
        <Loader showText={false} />
      ) : (
        <ScrollView>
          <SectionTitle text="Compartilhe um voo" align="left" />
          <Subtitle text="Encontre a sua próxima viagem a um preço acessível" />
          <View style={styles.flightList}>
            {flights.map((flight) => (
              <FlightList key={flight.id} data={flight} />
            ))}
          </View>
        </ScrollView>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  flightList: {
    marginTop: 15,
  },
  sectionDescription: {
    fontSize: 16,
    color: '#666',
  },
});
