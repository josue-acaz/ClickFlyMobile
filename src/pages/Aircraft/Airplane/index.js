import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';

import Screen from '../../../components/Screen';
import ArrowBack from '../../../components/ArrowBack';
import SubsectionTitle from '../../../components/SubsectionTitle';
import Slider from '../../../components/Slider';
import DiscoverAircraft from '../../../components/DiscoverAircraft';

export default function Airplane({navigation, route}) {
  const {aircraft} = route.params;
  function handleDiscover() {
    navigation.navigate("Discover", {images: aircraft.images});
  }

  return (
    <>
      <ScrollView style={styles.scroll}>
        <Slider images={aircraft.images} />
        <ArrowBack
          color="#FFFFFF"
          style={styles.arrowBack}
          onPress={() => {
            navigation.goBack();
          }}
        />
        {/**<SubsectionTitle text="Detalhes de Aeronave" /> */}
        <Screen>
          <SubsectionTitle text={aircraft.aircraft_model.name} />
          <Text style={styles.description}>{aircraft.description}</Text>
          <Text style={styles.titleDiscover}>Descubra essa aeronave</Text>
          <DiscoverAircraft
            legend="Exterior"
            images={aircraft.images}
            handleDiscover={handleDiscover}
          />
        </Screen>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  arrowBack: {
    position: 'absolute',
    marginLeft: 10,
  },
  scroll: {
    backgroundColor: '#FFFFFF',
  },
  description: {},
  titleDiscover: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 15,
  },
});
