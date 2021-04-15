import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';

import Screen from '../../../components/Screen';
import ArrowBack from '../../../components/ArrowBack';
import SubsectionTitle from '../../../components/SubsectionTitle';
import Ticket from '../../../components/Ticket';
import BottomAction from '../../../components/BottomAction';
import Button from '../../../components/Button';
import BottomSpace from '../../../components/BottomSpace';

import {getBottomSpace} from 'react-native-iphone-x-helper';

export default function Tickets({navigation, route}) {
  const {
    booking: {passengers, flight_segment},
  } = route.params;

  function handleInstructions() {
    navigation.navigate("Instructions", {flight_segment});
  }

  return (
    <>
      <Screen>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ArrowBack
            onPress={() => {
              navigation.goBack();
            }}
          />
          <SubsectionTitle text="Meus bilhetes" />
          <View style={styles.tickets}>
            {passengers.map((passenger, index) => (
              <Ticket
                key={index}
                booking={{passenger, flight: flight_segment}}
              />
            ))}
          </View>
          <BottomSpace />
        </ScrollView>
      </Screen>
      <BottomAction>
        <Button
          color="#00B2A9"
          text="Instruções ao passageiro"
          onPress={handleInstructions}
        />
      </BottomAction>
    </>
  );
}

const styles = StyleSheet.create({
  tickets: {
    paddingBottom: getBottomSpace(),
  },
});
