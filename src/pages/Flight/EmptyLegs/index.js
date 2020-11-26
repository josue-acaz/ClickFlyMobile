import React, {useState, useEffect} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {
  Screen,
  SetionTitle,
  Loader,
  Subtitle,
  FlightList,
} from '../../../components';
import api from '../../../services/api';

export default function EmptyLegs({navigation, route}) {
  const [loading, setLoading] = useState(true);
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    async function index() {
      try {
        const response = await api.get('/empty_legs');
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
          <SetionTitle text="Oportunidade de voos" align="left" />
          <Subtitle text="Encontre a sua próxima viagem a um preço acessível" />
          <View style={styles.flightList}>
            {flights.map((flight) => (
              <FlightList key={flight.id} legs={flight} />
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
