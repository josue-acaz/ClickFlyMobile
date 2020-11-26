import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Screen, ArrowBack, SubsectionTitle} from '../../components';

export default function Aircraft({navigation, route}) {
  return (
    <Screen>
      <ScrollView>
        <ArrowBack
          onPress={() => {
            navigation.goBack();
          }}
        />
        <SubsectionTitle text="Detalhes de Aeronave" />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({});
