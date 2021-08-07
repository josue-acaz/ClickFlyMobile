import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import {MaterialIndicator} from 'react-native-indicators';

import Screen from '../../../components/Screen';
import Profile from '../../../components/Profile';
import Center from '../../../components/Center';
import BottomSpace from '../../../components/BottomSpace';

import {useAuth} from '../../../contexts/auth';
import {useScreen} from '../../../contexts/screen';
import api from '../../../services/api';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

const menu_options = [
  {
    title: 'Informações Pessoais',
    subtitle: 'Meus dados',
    icon: 'person',
    route: 'PersonalInformation',
  },
  {
    title: 'Formas de Pagamento',
    subtitle: 'Minhas formas de pagamento',
    icon: 'payment',
    route: 'PaymentMethods',
  },
  {
    title: 'Endereços',
    subtitle: 'Meus endereços de pagamento',
    icon: 'home',
    route: 'Addresses',
  },
  {
    title: 'Passageiros',
    subtitle: 'Passageiros recorrentes',
    icon: 'supervisor-account',
    route: 'Friends',
  },
  {
    title: 'Sair',
    subtitle: 'Sair do aplicativo',
    icon: 'exit-to-app',
    route: '',
  },
];

export default function Menu({navigation, route}) {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const {refresh} = useScreen();
  const {user, signOut} = useAuth();
  const {id} = user;

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

  // Primeira vez que é aberto
  useEffect(() => {
    getUserAsync(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params]);

  // Se houver o refresh de algum dos componentes filhos
  useEffect(() => {
    if (refresh.value && refresh.screen === 'Menu') {
      getUserAsync(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  function handleChangeProfile() {
    navigation.navigate("Photo", {customer});
  }

  return (
    <Screen>
      {loading ? (
        <Center>
          <MaterialIndicator color="#09354B" />
        </Center>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {error ? (
            <Center>
              <Text style={styles.errorTxt}>Ocorreu em erro!</Text>
            </Center>
          ) : (
            <>
              <View style={styles.header}>
                <View style={styles.profile}>
                  <Profile
                    thumbnail={customer.thumbnail}
                    onPress={handleChangeProfile}
                  />
                </View>
                <Text style={styles.customerName}>{customer.name}</Text>
              </View>
              <View style={styles.content}>
                {menu_options.map((item, index) => (
                  <ListItem
                    key={index}
                    bottomDivider
                    onPress={() => {
                      if (item.title === "Sair") {
                        signOut();
                      } else {
                        navigation.navigate(item.route, {
                          customer,
                          returnRoute: 'Menu',
                        });
                      }
                    }}>
                    <Icon color="#666" name={item.icon} />
                    <ListItem.Content>
                      <ListItem.Title style={styles.itemTitle}>
                        {item.title}
                      </ListItem.Title>
                      <ListItem.Subtitle style={styles.subtitleItem}>
                        {item.subtitle}
                      </ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
                  </ListItem>
                ))}
              </View>
            </>
          )}
          <BottomSpace />
        </ScrollView>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: getStatusBarHeight(),
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 18,
    color: '#222',
  },
  subtitleItem: {
    fontSize: 14,
    color: '#666',
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
