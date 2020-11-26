import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Bootstrap, Inline, VerticalSpaceBetween} from '../../components';

const {Row, Col} = Bootstrap;

const AirplaneIcon = () => (
  <MaterialIcons name="airplanemode-active" size={24} color="#00B2A9" />
);

export default function Aircraft({aircraft, onRequestMore}) {
  const {name, thumbnail, passengers} = aircraft;

  return (
    <View style={styles.aircraft}>
      <Text style={styles.title}>Detalhes da aeronave</Text>
      <View style={styles.content}>
        <Row>
          <Col size="5">
            <Inline
              components={[
                {
                  id: 1,
                  component: <AirplaneIcon />,
                },
                {
                  id: 2,
                  component: (
                    <View style={styles.details}>
                      <VerticalSpaceBetween
                        components={[
                          {
                            id: 1,
                            component: (
                              <Text style={styles.aircraftName}>{name}</Text>
                            ),
                          },
                          {
                            id: 2,
                            component: (
                              <Text style={styles.aircraftType}>
                                Aeronave •{' '}
                                <Text style={styles.aircraftSeats}>
                                  {passengers} assentos
                                </Text>
                              </Text>
                            ),
                          },
                          {
                            id: 3,
                            component: (
                              <TouchableOpacity
                                onPress={() => {
                                  onRequestMore(aircraft);
                                }}>
                                <Text style={styles.more}>Saiba mais</Text>
                              </TouchableOpacity>
                            ),
                          },
                        ]}
                      />
                    </View>
                  ),
                },
              ]}
            />
          </Col>
          <Col style={styles.colRight} size="5">
            <Image style={styles.aircraftThumbnail} source={{uri: thumbnail}} />
          </Col>
        </Row>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  aircraft: {
    marginTop: 10,
    marginBottom: 10,
    height: 70,
  },
  aircraftThumbnail: {
    width: 150,
    height: 70,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  aircraftName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444444',
  },
  aircraftType: {
    fontSize: 14,
    color: '#444',
  },
  aircraftSeats: {
    fontWeight: 'bold',
    color: '#999',
  },
  more: {
    fontSize: 12,
    color: '#00B2A9',
  },
  details: {
    height: '100%',
  },
  content: {
    marginTop: 20,
  },
  colRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
