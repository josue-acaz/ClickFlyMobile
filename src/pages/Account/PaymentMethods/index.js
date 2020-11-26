import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {MaterialIndicator} from 'react-native-indicators';
import {
  Screen,
  ArrowBack,
  SubsectionTitle,
  Center,
  Card,
} from '../../../components';
import api from '../../../services/api';

export default function PaymentMethods({route, navigation}) {
  const {customer} = route.params;
  const [payment, setPayment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function index() {
      try {
        const response = await api.get(`customers/${customer.id}/cards`);
        setPayment(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }

    index();
  }, [route, refresh, customer.id]);

  const handleAddPay = () => {
    navigation.navigate('AddPay', {customer, returnRoute: 'PaymentMethods'});
  };

  return (
    <Screen>
      <ArrowBack
        onPress={() => {
          navigation.goBack();
        }}
      />
      <SubsectionTitle text="Formas de pagamento" />
      {loading ? (
        <Center>
          <MaterialIndicator style={styles.loading} color="#09354B" />
        </Center>
      ) : (
        <View style={styles.content}>
          <Text style={styles.cardsTxt}>Seus cartões</Text>
          {payment.length > 0 ? (
            <View style={styles.cards}>
              {payment.map((pay, index) => (
                <Card
                  key={pay.id}
                  card={pay}
                  style={index === payment.length - 1 ? styles.lastCard : {}}
                />
              ))}
            </View>
          ) : (
            <Text style={styles.emptyTxt}>
              Você ainda não possui cartões. Adicione um para vêlo aqui.
            </Text>
          )}
          <TouchableOpacity style={styles.btn} onPress={handleAddPay}>
            <Text style={styles.btnTxt}>Adicionar cartão</Text>
          </TouchableOpacity>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  loading: {
    marginBottom: '25%',
  },
  cardsTxt: {
    fontSize: 16,
    color: '#444',
    fontWeight: '500',
  },
  content: {
    marginTop: 20,
  },
  emptyTxt: {
    fontSize: 26,
    marginTop: 25,
    color: '#666',
  },
  btn: {
    marginTop: 15,
  },
  btnTxt: {
    color: '#00B2A9',
  },
  cards: {
    marginTop: 15,
  },
  lastCard: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
});
