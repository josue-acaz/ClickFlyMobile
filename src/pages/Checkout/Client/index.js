import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {
  Screen,
  ArrowBack,
  SubsectionTitle,
  Loader,
  Center,
  BottomAction,
  Button,
} from '../../../components';
import api from '../../../services/api';
import {useAuth} from '../../../contexts/auth';
import {
  provideInformation,
  getFormattedCustomerType,
  rmCPF,
  maskCnpj,
} from '../../../utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const UserIcon = () => <FontAwesome name="user-o" size={24} color="#09354B" />;

function ClientData({customer, payment_method}) {
  const document =
    customer.type === 'physical-entity'
      ? rmCPF(customer[getFormattedCustomerType(customer.type)].cpf)
      : maskCnpj(customer[getFormattedCustomerType(customer.type)].cnpj);

  return (
    <View style={styles.client}>
      <View style={styles.userCircle}>
        <UserIcon />
      </View>
      <View style={styles.client}>
        <Text style={styles.clientName}>{customer.user.name}</Text>
        <Text style={styles.payMethod}>
          Meio de pagamento:{' '}
          <Text style={styles.pay}>
            {payment_method === 'credit/debit'
              ? 'Cartão de Crédito/Débito'
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
  const [provide, setProvide] = useState(null);

  useEffect(() => {
    async function show(customer_id) {
      try {
        const response = await api.get(`customers/${customer_id}/show`);
        setCustomer(response.data);
        setProvide(provideInformation(response.data, payment_method));
        setLoading(false);
      } catch (err) {
        // handle error
        setLoading(false);
      }
    }

    show(user.customer.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params]);

  function handleNext() {
    // Necessário informações adicionais
    if (provide.isProvide) {
      const {steps} = provide;
      navigation.navigate(steps[0].route, {
        ...route.params,
        customer,
        returnRoute: 'Client',
        steps, // Passos a serem executados
      });
      return;
    }

    // Seguinte
    navigation.navigate('Passengers', {...route.params, customer});
  }

  return (
    <>
      <Screen>
        {loading ? (
          <Loader showText={false} />
        ) : (
          <>
            <ArrowBack
              onPress={() => {
                navigation.goBack();
              }}
            />
            <SubsectionTitle text="Dados do faturamento" />
            <Center style={styles.center}>
              {provide.isProvide ? (
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
