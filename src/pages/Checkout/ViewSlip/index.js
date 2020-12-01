import React from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import {
  Screen,
  ArrowBack,
  SubsectionTitle,
  BottomAction,
  Button,
  Subtitle,
  Bootstrap,
  DecoratedButton,
  BottomSpace,
} from '../../../components';
import {maskBarCode, formatShortDate, currency} from '../../../utils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Share from 'react-native-share';
import Clipboard from '@react-native-community/clipboard';
import {CommonActions} from '@react-navigation/native';

/**
 * @field Single Sharing
 * const options = {
    title: 'ClickFly',
    message: 'Boleto para pagamento',
    url: booking.pdf,
    social: Share.Social.WHATSAPP,
    filename: 'boleto.pdf',
  };
 */

const {Row, Col} = Bootstrap;

const CopyIcon = () => (
  <MaterialIcons name="content-copy" size={24} color="#09354B" />
);

const CheckIcon = () => (
  <AntDesign name="checkcircleo" size={24} color="#09354B" />
);

const ShareIcon = () => <Feather name="share-2" size={24} color="#09354B" />;

export default function ViewSlip({navigation, route}) {
  const {booking, subtotal} = route.params;

  const share = async () => {
    await Share.open({
      title: 'ClickFly',
      message: 'Boleto para pagamento',
      url: booking.pdf,
      filename: 'boleto.pdf',
    });
  };

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
  };

  // Navega para a tela de reservas
  function handleFinish() {
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

  return (
    <>
      <Screen>
        <ScrollView>
          <ArrowBack
            onPress={() => {
              navigation.goBack();
            }}
          />
          <SubsectionTitle text="Boleto" />
          <Subtitle text="Efetue o pagamento em até 24hrs" />

          <View style={styles.boleto}>
            <Text style={styles.price}>R$ {currency(subtotal)}</Text>
            <Text style={styles.dueAt}>
              Vencimento {formatShortDate(booking.due_at)}
            </Text>

            <Text style={styles.instructionsTxt}>
              Utilize o número do código de barras abaixo para realizar o
              pagamento:
            </Text>
            <Text style={styles.barcode}>{maskBarCode(booking.line)}</Text>
          </View>
          <BottomSpace />
        </ScrollView>
      </Screen>
      <BottomAction>
        <View>
          <Row>
            <Col size="5">
              <DecoratedButton
                text="Copiar código"
                transit={true}
                IconPrimmary={CopyIcon}
                IconTransition={CheckIcon}
                onPress={() => {
                  copyToClipboard(booking.line);
                }}
              />
            </Col>
            <Col size="5">
              <DecoratedButton
                text="Enviar para"
                transit={false}
                IconPrimmary={ShareIcon}
                onPress={share}
              />
            </Col>
          </Row>
        </View>
        <Button color="#00B2A9" text="OK, voltar" onPress={handleFinish} />
      </BottomAction>
    </>
  );
}

const styles = StyleSheet.create({
  boleto: {
    marginTop: '18%',
    alignItems: 'center',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00B2A9',
  },
  dueAt: {
    marginTop: 20,
    fontSize: 18,
    color: '#666',
  },
  instructionsTxt: {
    fontSize: 16,
    color: '#666',
    marginTop: 30,
    textAlign: 'center',
  },
  barcode: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});
