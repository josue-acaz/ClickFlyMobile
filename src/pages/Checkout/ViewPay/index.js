import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {
  Screen,
  ArrowBack,
  SubsectionTitle,
  PayStatus,
  Center,
  Button,
  BottomAction,
} from '../../../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AwaitIcon = ({style}) => (
  <MaterialCommunityIcons
    style={style}
    name="timer-sand"
    size={42}
    color="#8888"
  />
);

const ErrorIcon = ({style}) => (
  <AntDesign style={style} name="close" size={42} color="#ff4d4d" />
);

const SuccessICon = ({style}) => (
  <Feather style={style} name="check" size={42} color="#00B2A9" />
);

export default function ViewPay({navigation, route}) {
  const {status} = route.params.booking;

  function handleFinish() {
    function navigateToBookings() {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'Reservas',
              params: {screen: 'Reservations', params: {loading: true}},
            },
          ],
        }),
      );
    }

    switch (status) {
      case true:
        navigateToBookings();
        break;
      case false:
        navigation.goBack();
        break;
      case null:
        navigateToBookings();
        break;
      default:
        break;
    }
  }

  return (
    <>
      <Screen>
        <ArrowBack
          onPress={() => {
            navigation.goBack();
          }}
        />
        <SubsectionTitle text="Resumo do pagamento" />
        <Center>
          <View style={styles.content}>
            {status ? (
              <PayStatus
                Icon={SuccessICon}
                title="O pagamento foi processado com êxito!"
                message="Acesse o menu de reservas para ver seus bilhetes."
              />
            ) : status === null ? (
              <PayStatus
                Icon={ErrorIcon}
                title="Não foi possível processar o pagamento!"
                message="O seu pagamento não foi processado, por favor verifique seus dados de pagamento."
              />
            ) : (
              <PayStatus
                Icon={AwaitIcon}
                title="O seu pagamento está em análise!"
                message="Os seus bilhetes serão liberados assim que confirmado o pagamento."
              />
            )}
          </View>
        </Center>
      </Screen>
      <BottomAction>
        <Button onPress={handleFinish} color="#00B2A9" text="OK" />
      </BottomAction>
    </>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginTop: 20,
  },
  content: {
    marginBottom: '20%',
    width: '100%',
  },
});
