import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';

import Screen from '../../../components/Screen';
import ArrowBack from '../../../components/ArrowBack';
import SubsectionTitle from '../../../components/SubsectionTitle';
import Loader from '../../../components/Loader';
import Center from '../../../components/Center';
import BottomAction from '../../../components/BottomAction';
import Button from '../../../components/Button';

import api from '../../../services/api';
import {useAuth} from '../../../contexts/auth';
import {
  provideInformation,
  readableCpf,
  maskCnpj,
} from '../../../utils';
import {EnumCustomerTypes} from '../../../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const UserIcon = () => <FontAwesome name="user-o" size={24} color="#09354B" />;

function ClientData({customer, payment_method}) {
  const document =
    customer.type === EnumCustomerTypes.PF
      ? readableCpf(customer[customer.type].cpf)
      : maskCnpj(customer[customer.type].cnpj);

  return (
    <View style={styles.client}>
      <View style={styles.userCircle}>
        <UserIcon />
      </View>
      <View style={styles.client}>
        <Text style={styles.clientName}>{customer.name}</Text>
        <Text style={styles.payMethod}>
          Meio de pagamento:{' '}
          <Text style={styles.pay}>
            {payment_method === 'credit/debit'
              ? 'Cartão de Crédito/Débito'
              : payment_method === 'pix' 
              ? 'PIX' 
              : 'Boleto Bancário'}
          </Text>
        </Text>
        <Text style={styles.document}>{document}</Text>
      </View>
    </View>
  );
}

export default function Client({navigation, route}) {
  const {user} = useAuth();
  const {payment_method} = route.params;
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState(null);
  const [provide, setProvide] = useState({
    is_provide: false,
    steps: [],
  });

  useEffect(() => {
    async function show(customer_id) {
      try {
        const response = await api.get(`customers/${customer_id}/show`);
        setCustomer(response.data);

        const provide_information = provideInformation(response.data, payment_method);
        setProvide(provide_information);

        setLoading(false);
      } catch (err) {
        // handle error
        setLoading(false);
      }
    }

    show(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params]);

  function handleNext() {
    // Necessário informações adicionais
    if (provide.is_provide) {
      navigation.navigate(provide.steps[0].route, {
        ...route.params,
        customer: customer,
        returnRoute: "Client",
        steps: provide.steps, // Passos a serem executados
      });
      return;
    }

    // Seguinte
    navigation.navigate("Passengers", {...route.params, customer});
  }

  return (
    <>
      <Screen>
        {loading ? <Loader showText={false} /> : (
          <>
            <ArrowBack
              onPress={() => {
                navigation.goBack();
              }}
            />
            <SubsectionTitle text="Dados do faturamento" />
            <Center style={styles.center}>
              {provide.is_provide ? (
                <Text style={styles.provideTxt}>
                  Você precisa fornecer informações adicionais.
                </Text>
              ) : (
                <ClientData
                  customer={customer}
                  payment_method={payment_method}
                />
              )}
            </Center>
          </>
        )}
      </Screen>
      {!loading && (
        <BottomAction>
          <Button text="Continuar" onPress={handleNext} />
        </BottomAction>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  provideTxt: {
    fontSize: 18,
    color: '#444',
    marginBottom: '30%',
  },
  userCircle: {
    padding: 25,
    backgroundColor: '#f1f1f1',
    borderRadius: 20000,
    width: 75,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  client: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '30%',
  },
  clientName: {
    fontSize: 22,
    color: '#999',
  },
  payMethod: {
    fontSize: 14,
    textTransform: 'uppercase',
    color: '#00B2A9',
    fontWeight: 'bold',
  },
  pay: {
    color: '#b3b3b3',
    fontWeight: 'normal',
  },
  document: {
    fontSize: 16,
    color: '#444',
  },
});
