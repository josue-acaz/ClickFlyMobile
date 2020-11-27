import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {
  Screen,
  ArrowBack,
  SubsectionTitle,
  Ticket,
  BottomAction,
  Button,
  BottomSpace,
} from '../../../components';
import {getBottomSpace} from 'react-native-iphone-x-helper';

export default function Tickets({navigation, route}) {
  const {
    booking: {customer_bookings, stretch},
  } = route.params;

  function handleInstructions() {
    navigation.navigate('Instructions', {flight: stretch});
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
            {customer_bookings.map((customer_booking) => (
              <Ticket
                key={customer_booking.id + ''}
                booking={{passenger: customer_booking, flight: stretch}}
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
