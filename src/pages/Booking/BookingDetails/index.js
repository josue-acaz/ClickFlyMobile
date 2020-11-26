import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Screen, ArrowBack, SubsectionTitle} from '../../../components';

export default function BookingDetails({navigation, route}) {
  return (
    <Screen>
      <ScrollView>
        <ArrowBack />
        <SubsectionTitle text="Detalhes da reserva" />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({});
