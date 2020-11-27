import React from 'react';
import {ScrollView} from 'react-native';
import {Screen, ArrowBack, SubsectionTitle} from '../../../components';

export default function Instructions({navigation, route}) {
  //const {flight} = route.params;
  return (
    <Screen>
      <ScrollView>
        <ArrowBack
          onPress={() => {
            navigation.goBack();
          }}
        />
        <SubsectionTitle text="Instruções ao passageiro" />
      </ScrollView>
    </Screen>
  );
}
