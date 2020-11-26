import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Screen, ArrowBack, SubsectionTitle} from '../../../components';

export default function Tickets({navigation, route}) {
  return (
    <Screen>
      <ScrollView>
        <ArrowBack />
        <SubsectionTitle text="Meus bilhetes" />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({});
