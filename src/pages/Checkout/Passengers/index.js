import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {
  Screen,
  ArrowBack,
  SubsectionTitle,
  Subtitle,
  Button,
  BottomAction,
  Inline,
  Passenger,
  BottomSpace,
} from '../../../components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {mergeCustomer} from '../../../utils';

const PassengerIcon = () => (
  <FontAwesome name="user-circle" size={24} color="#666" />
);

export default function Passengers({navigation, route}) {
  const {selected_seats} = route.params;
  const customer = mergeCustomer(route.params.customer);
  const [passengers, setPassengers] = useState(customer.customer_friends);

  useEffect(() => {
    function addFirstPassenger() {
      if (customer.type === 'physical-entity') {
        // Se for entidade física, adiciona o primeiro passageiro
        setPassengers((passengers) => [
          ...passengers,
          {
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            dob: customer.dob,
            rg: customer.rg,
            isFriend: false, // Diz se vai ser colocado na lista de adição de amigos do cliente
            active: false,
          },
        ]);
      }
    }

    addFirstPassenger();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Monitora a adição de novo passageiro
  useEffect(() => {
    if (route.params.new_passenger) {
      setPassengers((passengr) => [...passengr, route.params.new_passenger]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params]);

  function handleCheckPassenger(index) {
    if (
      getCheckedPassengers().length < selected_seats ||
      passengers[index].active
    ) {
      let arr = passengers.slice();
      arr[index].active = !passengers[index].active;
      setPassengers(arr);
    }
  }

  // Verifica quantos estão reservados
  function getCheckedPassengers() {
    const arr = passengers.filter((passenger) => passenger.active);
    return arr;
  }

  // Retorna o número de assentos restantes
  function remainingSeats() {
    return selected_seats - getCheckedPassengers().length;
  }

  function handleAddPassenger() {
    navigation.navigate('AddFriend', {returnRoute: 'Passengers'});
  }

  function handleNext() {
    navigation.navigate('Purchase', {
      ...route.params,
      passengers: getCheckedPassengers(),
    });
  }

  // Informa quando pode prosseguir
  const next = remainingSeats() === 0;

  return (
    <>
      <Screen>
        <ScrollView>
          <ArrowBack
            onPress={() => {
              navigation.goBack();
            }}
          />
          <SubsectionTitle text="Passageiros" />
          <Subtitle text="Selecione os passageiros" />

          <View style={styles.banner}>
            <Inline
              style={styles.feedback}
              justify="space-between"
              components={[
                {
                  id: 1,
                  component: (
                    <Text style={styles.bannerTxt}>
                      {remainingSeats() > 0
                        ? `${remainingSeats()} assentos restantes`
                        : 'Nenhum assento restantes'}
                    </Text>
                  ),
                },
                {
                  id: 2,
                  component: (
                    <>
                      {remainingSeats() > 0 && (
                        <View style={styles.passengerIcon}>
                          <PassengerIcon />
                        </View>
                      )}
                    </>
                  ),
                },
              ]}
            />

            <View style={styles.passengers}>
              {passengers
                .sort((a, b) => a.id - b.id)
                .map((passenger, index) => (
                  <Passenger
                    key={index + ''}
                    passenger={passenger}
                    checked={passenger.active}
                    handleCheck={() => {
                      handleCheckPassenger(index);
                    }}
                  />
                ))}
              {passengers.length === 0 && (
                <Text style={styles.noPassengers}>
                  Nenhum passageiro disponível, por favor, adicione um para vêlo
                  aqui!
                </Text>
              )}
            </View>
          </View>
          <BottomSpace />
        </ScrollView>
      </Screen>
      <BottomAction>
        <Button
          text={next ? 'Continuar' : 'Novo passageiro'}
          onPress={() => {
            if (next) {
              handleNext();
            } else {
              handleAddPassenger();
            }
          }}
        />
      </BottomAction>
    </>
  );
}

const styles = StyleSheet.create({
  banner: {
    marginTop: 20,
  },
  bannerTxt: {
    fontSize: 18,
    color: '#444',
  },
  feedback: {
    height: 40,
  },
  passengerIcon: {
    padding: 4,
    backgroundColor: '#f2f2f2',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2000000,
  },
  passengers: {
    marginTop: 20,
  },
  noPassengers: {
    fontSize: 20,
    color: '#333',
  },
});
