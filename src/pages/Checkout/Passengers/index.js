import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';

import Screen from '../../../components/Screen';
import ArrowBack from '../../../components/ArrowBack';
import SubsectionTitle from '../../../components/SubsectionTitle';
import Subtitle from '../../../components/Subtitle';
import Button from '../../../components/Button';
import BottomAction from '../../../components/BottomAction';
import Inline from '../../../components/Inline';
import Loader from '../../../components/Loader';
import Passenger from '../../../components/Passenger';
import BottomSpace from '../../../components/BottomSpace';
import {EnumCustomerTypes} from '../../../constants';

// Icons
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import api from '../../../services/api';

const PassengerIcon = () => (
  <FontAwesome name="user-circle" size={24} color="#666" />
);

export default function Passengers({navigation, route}) {
  const {selected_seats, customer} = route.params;
  const [loading, setLoading] = useState(true);
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    function init() {
      if (customer.type === EnumCustomerTypes.PF) {
        // Se for entidade física, adiciona o primeiro passageiro
        const first_passenger = {
          id: customer.id,
          name: customer.name,
          email: customer.email,
          phone_number: customer.phone_number,
          dob: customer.pf.dob,
          rg: customer.pf.rg,
          cnh: customer.pf.cnh,
          ctps: customer.pf.ctps,
          active: false,
          is_friend: false, // Diz se vai ser colocado na lista de adição de amigos do cliente
        };

        setPassengers((passengers) => [...passengers, first_passenger]);
      }

      index();
    }

    async function index() {
      try {
        const response = await api.get("/customer-friends", {
          params: {
            text: "",
            limit: 10,
            offset: 0,
            order: "DESC",
            order_by: "created_at"
          }
        });
        
        const {rows, count} = response.data;
        rows.forEach(customer_friend => {
          const passenger = {
            ...customer_friend,
            is_friend: true,
            active: false,
          };

          setPassengers(passengers => [...passengers, passenger]);
        });

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    }

    init();
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
  // Array com o ID de cada passageiro
  function getCheckedPassengers() {
    const active_passengers = passengers.filter((passenger) => passenger.active).map(passenger => ({
      id: passenger.id,
      is_friend: passenger.is_friend,
    }));  
    console.log(active_passengers);
    return active_passengers;
  }

  // Retorna o número de assentos restantes
  function remainingSeats() {
    return selected_seats - getCheckedPassengers().length;
  }

  function handleAddPassenger() {
    navigation.navigate("AddFriend", {returnRoute: "Passengers"});
  }

  function handleNext() {
    navigation.navigate("Purchase", {
      ...route.params,
      passengers: getCheckedPassengers(),
    });
  }

  // Informa quando pode prosseguir
  const next = remainingSeats() === 0;

  return (
    <>
      <Screen>
        {loading ? <Loader /> : (
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
        )}
      </Screen>
      {!loading && (
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
      )}
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
