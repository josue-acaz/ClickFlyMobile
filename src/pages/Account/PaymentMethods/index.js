import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {MaterialIndicator} from 'react-native-indicators';
import {
  Screen,
  ArrowBack,
  SubsectionTitle,
  Center,
  Card,
  Subtitle,
  Alert,
} from '../../../components';
import api from '../../../services/api';

export default function PaymentMethods({route, navigation}) {
  const {customer} = route.params;
  const [payment, setPayment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [cardId, setCardId] = useState(0);
  function handleRefresh() {
    setRefresh(!refresh);
  }

  const [alert, setAlert] = useState({
    open: false,
    processing: false,
    error: false,
    success: false,
  });
  function handleAlert(e) {
    const {name, value} = e;
    setAlert((alert) => ({...alert, [name]: value}));
  }

  useEffect(() => {
    setLoading(true);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params, refresh]);

  const handleAddPay = () => {
    navigation.navigate('AddPay', {customer, returnRoute: 'PaymentMethods'});
  };

  async function handleDelete() {
    handleAlert({name: 'processing', value: true});

    try {
      await api.delete(`/customers/cards/${cardId}/delete`);
      handleAlert({name: 'success', value: true});
      handleAlert({name: 'processing', value: false});
    } catch (err) {
      handleAlert({name: 'error', value: true});
      handleAlert({name: 'processing', value: false});
    }
  }

  function handleFinish() {
    handleAlert({name: 'open', value: false});
    handleAlert({name: 'error', value: false});
    handleAlert({name: 'success', value: false});
    handleRefresh();
  }

  return (
    <Screen>
      <Alert
        open={alert.open}
        title="Você deseja mesmo excluir este cartão?"
        message="Todos os dados salvos serão apagados do aplicativo."
        onConfirm={handleDelete}
        colorConfirmBtn="#ff1a40"
        confirmTxt="Apagar cartão"
        colorCancelTxt="#ff1a40"
        onCancel={() => {
          handleAlert({name: 'open', value: false});
        }}
        processing={alert.processing}
        processingTitle="Excluindo cartão..."
        processingMessage="Por favor, aguarde!"
        error={alert.error}
        errorTitle="Erro"
        errorMessage="Desculpe, não foi possível excluir o cartão."
        success={alert.success}
        successTitle="Sucesso"
        successMessage="O cartão foi excluido."
        onOk={handleFinish}
      />
      <ArrowBack
        onPress={() => {
          navigation.goBack();
        }}
      />
      <SubsectionTitle text="Formas de pagamento" />
      <Subtitle text="Seus cartões" />
      {loading ? (
        <Center>
          <MaterialIndicator style={styles.loading} color="#09354B" />
        </Center>
      ) : (
        <View style={styles.content}>
          {payment.length > 0 ? (
            <View style={styles.cards}>
              <ScrollView>
                {payment.map((pay, index) => (
                  <Card
                    key={pay.id}
                    card={pay}
                    onDelete={(card_id) => {
                      setCardId(card_id);
                      handleAlert({name: 'open', value: true});
                    }}
                    style={index === payment.length - 1 ? styles.lastCard : {}}
                  />
                ))}
              </ScrollView>
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
