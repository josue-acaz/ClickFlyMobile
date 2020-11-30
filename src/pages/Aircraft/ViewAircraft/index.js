import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Screen, ArrowBack, SubsectionTitle, Slider} from '../../../components';

export default function ViewAircraft({navigation, route}) {
  const {aircraft} = route.params;
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
          <SubsectionTitle text={aircraft.name} />
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
});
