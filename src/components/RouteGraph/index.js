import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Inline from '../../components/Inline';
import VerticalSpaceBetween from '../../components/VerticalSpaceBetween';
import {getDatetime, getAerodromeName, getTime} from '../../utils';

const OriginIcon = () => (
  <MaterialCommunityIcons
    name="record-circle-outline"
    size={24}
    color="#00B2A9"
  />
);

const DestinIcon = () => (
  <MaterialIcons name="location-on" size={24} color="#00B2A9" />
);

const DateIcon = () => (
  <MaterialCommunityIcons name="calendar" size={24} color="#00B2A9" />
);

const graphs = [
  {
    id: 1,
    symbol: '•',
  },
  {
    id: 2,
    symbol: '•',
  },
  {
    id: 3,
    symbol: '•',
  },
  {
    id: 4,
    symbol: '•',
  },
  {
    id: 5,
    symbol: '•',
  },
  {
    id: 6,
    symbol: '•',
  },
];

function getArrGraph() {
  let drawnGraphs = [
    {
      id: 1,
      component: <OriginIcon />,
    },
  ];

  graphs.forEach((graph, index) => {
    drawnGraphs.push({
      id: index + 2,
      component: <Text style={styles.graphSymbol}>{graph.symbol}</Text>,
    });
  });

  drawnGraphs.push({
    id: drawnGraphs.length + 1,
    component: <DestinIcon />,
  });

  return drawnGraphs;
}

export default function RouteGraph({data}) {
  const {
    origin_aerodrome,
    destination_aerodrome,
    departure_datetime,
    arrival_datetime,
  } = data;
  return (
    <View style={styles.routeGraph}>
      <View style={styles.departureDate}>
        <Inline
          components={[
            {
              id: 1,
              component: <DateIcon />,
            },
            {
              id: 2,
              component: (
                <View>
                  <Text style={styles.day}>Sexta-Feira</Text>
                  <Text style={styles.departureDate}>
                    {getDatetime(departure_datetime)}
                  </Text>
                </View>
              ),
            },
          ]}
        />
      </View>
      <View style={styles.graph}>
        <Inline
          components={[
            {
              id: 1,
              component: (
                <View style={styles.drawnGraph}>
                  <VerticalSpaceBetween
                    align="center"
                    components={getArrGraph()}
                  />
                </View>
              ),
            },
            {
              id: 2,
              component: (
                <View style={styles.routeDetails}>
                  <VerticalSpaceBetween
                    components={[
                      {
                        id: 1,
                        component: (
                          <View style={styles.stretch}>
                            <Text style={styles.time}>
                              {getTime(departure_datetime)}
                            </Text>
                            <Text style={styles.oaci_code}>
                              {origin_aerodrome.oaci_code}
                            </Text>
                            <Text style={styles.airport}>
                              {getAerodromeName(origin_aerodrome.name)} •{' '}
                              <Text style={styles.city}>
                                {origin_aerodrome.city.name}
                              </Text>
                            </Text>
                          </View>
                        ),
                      },
                      {
                        id: 2,
                        component: (
                          <View style={styles.stretch}>
                            <Text style={styles.time}>
                              {getTime(arrival_datetime)}
                            </Text>
                            <Text style={styles.oaci_code}>
                              {destination_aerodrome.oaci_code}
                            </Text>
                            <Text style={styles.airport}>
                              {getAerodromeName(destination_aerodrome.name)} •{' '}
                              <Text style={styles.city}>
                                {destination_aerodrome.city.name}
                              </Text>
                            </Text>
                          </View>
                        ),
                      },
                    ]}
                  />
                </View>
              ),
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  routeGraph: {
    marginTop: '20%',
  },
  graphSymbol: {
    color: '#00B2A9',
    fontWeight: 'bold',
    fontSize: 18,
  },
  graph: {
    marginTop: 20,
    height: 200,
  },
  drawnGraph: {
    height: '100%',
  },
  routeDetails: {
    height: 200,
  },
  time: {
    color: '#00B2A9',
    fontWeight: 'bold',
  },
  oaci_code: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  airport: {
    fontSize: 16,
    color: '#222',
  },
  city: {
    fontWeight: 'bold',
    color: '#999',
  },
  departureDate: {
    fontSize: 16,
    color: '#444',
  },
  day: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
});
