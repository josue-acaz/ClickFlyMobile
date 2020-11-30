import React from 'react';
import {} from 'react-native';
import {Screen, ArrowBack, SubsectionTitle} from '../../../components';

export default function Discover({navigation, images = []}) {
  return (
    <Screen>
      <ArrowBack
        onPress={() => {
          navigation.goBack();
        }}
      />
      <SubsectionTitle text="Interior" />
      <SubsectionTitle text="Exterior" />
    </Screen>
  );
}
