import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import Divider from './Divider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {MaterialIndicator} from 'react-native-indicators';
import QRCode from 'react-native-qrcode-svg';
import cLogo from '../../assets/cLogo.png';
import {
  capitalize,
  getAerodromeName,
  cutText,
  getDate,
  getTime,
  getCityUF,
} from '../../utils';

const width = Dimensions.get('window').width;
const CircleIcon = () => (
  <FontAwesome name="circle" size={14} color="#00B2A9" />
);
const CircleOutIcon = () => (
  <FontAwesome name="circle-o" size={14} color="#09354B" />
);

export default function Ticket({booking}) {
  const {
    passenger,
    flight: {
      origin_aerodrome,
      destination_aerodrome,
      departure_datetime,
      arrival_datetime,
      aircraft,
    },
  } = booking;
  const [index, setIndex] = useState([]);
  useEffect(() => {
    if (index.length === 0) {
      for (let i = 0; i < width / 10; i++) {
        setIndex((index) => [...index, i]);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      {index.length > 0 ? (
        <React.Fragment>
          <View style={styles.header}>
            <View style={styles.headerInfo}>
              <Text style={styles.title}>{aircraft.name}</Text>
              <Text style={styles.minInfo}>ClickFly</Text>
            </View>
            <Image style={styles.logo} source={cLogo} />
          </View>

          <Divider arr={index} />

          <View style={styles.info}>
            <View style={styles.datetime}>
              <View>
                <Text style={styles.minTitle}>
                  {getTime(departure_datetime)}
                </Text>
                <Text style={styles.minInfo}>
                  {getDate(departure_datetime)}
                </Text>
              </View>
              <Text style={styles.timeFlightTxt}>{/*3h 20min*/}</Text>
              <View>
                <Text style={styles.minTitle}>{getTime(arrival_datetime)}</Text>
                <Text style={styles.minInfo}>{getDate(arrival_datetime)}</Text>
              </View>
            </View>

            <View style={styles.tracejado}>
              <CircleOutIcon />
              <Text style={styles.tr}>╏</Text>
              <Text style={styles.tr}>╏</Text>
              <Text style={styles.tr}>╏</Text>
              <Text style={styles.tr}>╏</Text>
              <CircleIcon />
            </View>

            <View style={styles.airports}>
              <View>
                <Text style={styles.minTitle}>
                  {cutText(getAerodromeName(origin_aerodrome.name), 18)}
                </Text>
                <Text style={styles.minInfo}>
                  {getCityUF(origin_aerodrome)}
                </Text>
              </View>
              <View>
                <Text style={styles.minTitle}>
                  {cutText(getAerodromeName(destination_aerodrome.name), 18)}
                </Text>
                <Text style={styles.minInfo}>
                  {getCityUF(destination_aerodrome)}
                </Text>
              </View>
            </View>
          </View>

          <Divider arr={index} />

          <View style={styles.qrCode}>
            <View style={styles.airlineCode}>
              <QRCode value={'click_fly_ticket_0' + passenger.id} />
            </View>
          </View>

          <Divider arr={index} />

          <View style={styles.footer}>
            <View style={styles.ps_info}>
              <Text style={styles.passenger}>Passageiro</Text>
              <Text style={styles.passengerTxt}>
                {cutText(capitalize(passenger.name), 20)}
              </Text>
            </View>
            <View style={styles.detailsBtn}>
              <Text style={styles.document}>
                {passenger.rg
                  ? `RG: ${passenger.rg}`
                  : passenger.cnh
                  ? `CNH: ${passenger.cnh}`
                  : `CTPS: ${passenger.ctps}`}
              </Text>
            </View>
          </View>
        </React.Fragment>
      ) : (
        <MaterialIndicator color="#09354B" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    padding: 15,
    marginBottom: 10,
    width: '99%',
    marginTop: 10,
    shadowColor: '#666',
    shadowOpacity: 0.1,
    elevation: 10,
    shadowOffset: {
      width: 6,
      height: 6,
    },
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  airports: {
    justifyContent: 'space-between',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
    paddingTop: 5,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  code: {
    fontSize: 18,
    color: '#09354B',
    marginRight: 10,
  },
  airlineCode: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  minTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#09354B',
  },
  timeFlightTxt: {
    fontSize: 14,
    color: '#444',
    marginTop: 5,
    marginBottom: 5,
  },
  passenger: {
    fontSize: 18,
    fontWeight: '600',
    color: '#09354B',
  },
  tracejado: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#09354B',
  },
  passengerTxt: {
    fontSize: 16,
    color: '#333',
  },
  btnDetails: {
    padding: 5,
    backgroundColor: '#00B2A9',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
  },
  btnDetailsTxt: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tr: {
    color: '#888',
  },
  minInfo: {
    fontSize: 14,
    color: '#444',
  },
  document: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  qrCode: {
    paddingBottom: 5,
    paddingTop: 5,
  },
});
