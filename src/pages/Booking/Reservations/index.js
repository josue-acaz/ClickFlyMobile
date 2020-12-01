import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, Text, View, Image} from 'react-native';
import {
  Screen,
  SetionTitle,
  Subtitle,
  Loader,
  Center,
  BookingItem,
  BottomOverlay,
  Helpers,
} from '../../../components';
import {useAuth} from '../../../contexts/auth';
import api from '../../../services/api';
import ticket from '../../../assets/ticket.png';

export default function Reservations({navigation, route}) {
  const {user} = useAuth();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [visible, setVisible] = useState(false);
  function handleVisible() {
    setVisible(!visible);
  }

  useEffect(() => {
    async function index(customer_id) {
      console.log(customer_id);
      setLoading(true);
      try {
        const response = await api.get(`/customer/${customer_id}/bookings`);
        setBookings(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }

    index(user.customer.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params]);

  const Header = () => (
    <>
      <SetionTitle align="left" text="Minhas reservas" />
      <Subtitle text="Gerencie as suas reservas" />
    </>
  );

  function handleShow(booking) {
    navigation.navigate('Tickets', {booking});
  }

  return (
    <Screen>
      {loading ? (
        <Loader
          title="Estamos verificando suas reservas..."
          subtitle="Por favor, aguarde!"
        />
      ) : (
        <>
          {bookings.length > 0 ? (
            <ScrollView>
              <Header />
              <View style={styles.bookings}>
                {bookings.map((booking) => (
                  <BookingItem
                    key={booking.id + ''}
                    booking={booking}
                    handleShow={() => {
                      if (booking.approved) {
                        handleShow(booking);
                      } else {
                        handleVisible();
                      }
                    }}
                  />
                ))}
              </View>
            </ScrollView>
          ) : (
            <>
              <Header />
              <Center style={styles.center}>
                <Image style={styles.ticket} source={ticket} />
                <Text style={styles.noBookingsTxt}>
                  Você não possui reservas
                </Text>
              </Center>
            </>
          )}
        </>
      )}
      <BottomOverlay visible={visible} handleVisible={handleVisible}>
        <Helpers.AwaitPay onDimiss={handleVisible} />
      </BottomOverlay>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    marginBottom: '-40%',
  },
  noBookingsTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
  },
  ticket: {
    width: 200,
    height: 120,
    resizeMode: 'contain',
    borderRadius: 5,
    transform: [
      {
        rotateZ: '45deg',
      },
    ],
    marginBottom: 15,
  },
  bookings: {
    marginTop: 20,
  },
});
