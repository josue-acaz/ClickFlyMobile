import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ListItem} from 'react-native-elements';
import {MaterialIndicator} from 'react-native-indicators';
import {Screen, Profile, Center} from '../../../components';
import {useAuth} from '../../../contexts/auth';
import api from '../../../services/api';

const list = [
  {
    id: 1,
    title: 'Informações pessoais',
    icon: 'person',
    route: 'PersonalInformation',
  },
  {
    id: 2,
    title: 'Formas de Pagamento',
    icon: 'payment',
    route: 'PaymentMethods',
  },
  {
    id: 3,
    title: 'Meu Endereço',
    icon: 'home',
    route: 'Address',
  },
  {
    id: 4,
    title: 'Amigos',
    icon: 'supervisor-account',
    route: 'Friends',
  },
  {
    id: 5,
    title: 'Sair',
    icon: 'exit-to-app',
    route: '',
  },
];
export default function Menu({navigation, route}) {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const {user, signOut} = useAuth();
  const {id} = user.customer;

  useEffect(() => {
    async function getUserAsync(customer_id) {
      try {
        const response = await api.get(`/customers/${customer_id}/show`);
        setCustomer(response.data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    }

    getUserAsync(id);
  }, [id]);

  function handleChangeProfile() {
    navigation.navigate('ChangeProfilePhoto', {customer});
  }

  return (
    <Screen>
      {loading ? (
        <Center>
          <MaterialIndicator color="#09354B" />
        </Center>
      ) : (
        <View>
          {error ? (
            <Center>
              <Text style={styles.errorTxt}>Ocorreu em erro!</Text>
            </Center>
          ) : (
            <>
              <View style={styles.header}>
                <View style={styles.profile}>
                  <Profile
                    thumbnail={customer.user.thumbnail}
                    onPress={handleChangeProfile}
                  />
                </View>
                <Text style={styles.customerName}>{customer.user.name}</Text>
              </View>
              <View style={styles.content}>
                {list.map((item, i) => (
                  <ListItem
                    key={item.id}
                    title={item.title}
                    leftIcon={{name: item.icon}}
                    chevron={true}
                    onPress={() => {
                      if (item.id === 5) {
                        signOut();
                      } else {
                        navigation.navigate(item.route, {customer});
                      }
                    }}
                  />
                ))}
              </View>
            </>
          )}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 50,
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  content: {
    marginTop: 20,
  },
  errorTxt: {
    fontSize: 18,
    color: '#444444',
  },
  customerName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginLeft: 15,
    color: '#444444',
  },
});
