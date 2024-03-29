import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  Platform,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import MapView, {Marker} from 'react-native-maps';
import {capitalize} from '../../../utils';
import {mapstyle} from '../../../constants';

import Screen from '../../../components/Screen';
import ArrowBack from '../../../components/ArrowBack';
import SubsectionTitle from '../../../components/SubsectionTitle';
import Instruction from '../../../components/Instruction';
import Loader from '../../../components/Loader';
import BottomSpace from '../../../components/BottomSpace';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const {height} = Dimensions.get('screen');
const TimerIcon = () => (
  <MaterialIcons name="timer" size={24} color="#09354B" />
);
const TicketIcon = () => <Entypo name="ticket" size={22} color="#09354B" />;
const CardIcon = () => <AntDesign name="idcard" size={22} color="#09354B" />;

export default function Instructions({navigation, route}) {
  const {flight_segment} = route.params;
  const [originAddress, setOriginAddress] = useState(null);
  const [destinAddress, setDestinAddress] = useState(null);
  const [slider, setSlider] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const origin_aerodrome = flight_segment.origin_aerodrome;
  const destination_aerodrome = flight_segment.destination_aerodrome;
  const air_taxi = flight_segment.flight.air_taxi;

  const instructions = [
    {
      text: 'Chegue com até 1h de antecedência do voo.',
      Icon: TimerIcon,
    },
    {
      text: 'Apresente seu bilhete para fazer o embarque.',
      Icon: TicketIcon,
    },
    {
      text: 'Leve seu documento de identificação que consta no bilhete de embarque',
      Icon: CardIcon,
    },
  ];

  const oRegion = {
    latitude: origin_aerodrome.latitude,
    longitude: origin_aerodrome.longitude,
    latitudeDelta: 0.0922 / 12,
    longitudeDelta: 0.0421 / 12,
  };
  const dRegion = {
    latitude: destination_aerodrome.latitude,
    longitude: destination_aerodrome.longitude,
    latitudeDelta: 0.0922 / 12,
    longitudeDelta: 0.0421 / 12,
  };

  const oCoordinate = {latitude: origin_aerodrome.latitude, longitude: origin_aerodrome.longitude};
  const dCoordinate = {latitude: destination_aerodrome.latitude, longitude: destination_aerodrome.longitude};
  const oName = origin_aerodrome.name.split('/')[1] ? origin_aerodrome.name.split('/')[1] : origin_aerodrome.name;
  const dName = destination_aerodrome.name.split('/')[1] ? destination_aerodrome.name.split('/')[1] : destination_aerodrome.name;

  useEffect(() => {
    Geocoder.init("AIzaSyBgFaxqLR02XM-MeJAvctBDDSVdMj5zyWM");
    Geocoder.from(origin_aerodrome.latitude, origin_aerodrome.longitude)
      .then((json) => {
        setOriginAddress(json.results[1].formatted_address);

        Geocoder.from(destination_aerodrome.latitude, destination_aerodrome.longitude).then((json) => {
          setDestinAddress(json.results[1].formatted_address);
          setLoading(false);
        });
      })
      .catch((error) => setError(true));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeSlider = () => {
    setSlider(!slider);
  };

  const getCurrentSliderStyle = (boolean) => {
    if (boolean) {
      return styles.sliderBtnSelected;
    } else {
      return styles.sliderBtnNoSelected;
    }
  };

  const handleOpenMaps = (coordinate) => {
    if (Platform.OS === 'android') {
      Linking.openURL(
        `http://maps.google.com/maps?daddr=${coordinate.latitude},${coordinate.longitude}`,
      );
    } else if (Platform.OS === 'ios') {
      Linking.openURL(
        `http://maps.apple.com/maps?daddr=${coordinate.latitude},${coordinate.longitude}`,
      );
    }
  };

  function MapViewComponent({slider}) {
    return (
      <View style={styles.map}>
        <MapView
          style={styles.map_view}
          initialRegion={slider ? oRegion : dRegion}
          customMapStyle={mapstyle}>
          <Marker
            coordinate={slider ? oCoordinate : dCoordinate}
            title={slider ? origin_aerodrome.oaci_code : destination_aerodrome.oaci_code}
            description={capitalize(slider ? oName : dName)}
          />
        </MapView>
        <TouchableOpacity
          onPress={() => {
            handleOpenMaps(slider ? oCoordinate : dCoordinate);
          }}
          style={styles.openMapBtn}>
          <Feather name="external-link" size={22} color="#00B2A9" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Screen>
      {loading ? (
        <Loader
          indicatorColor="#00B2A9"
          title="Obtendo instruções..."
          subtitle="Por favor, aguarde!"
        />
      ) : (
        <ScrollView>
          <ArrowBack
            onPress={() => {
              navigation.goBack();
            }}
          />
          <SubsectionTitle text="Instruções ao passageiro" />
          <View style={styles.general_instructions}>
            <View style={styles.company}>
              <Text style={styles.company_txt}>
                Este voo será operado por{' '}
                <Text style={styles.companyName}>{air_taxi.user.name}</Text>
              </Text>
              <Text style={styles.email}>{air_taxi.user.email}</Text>
            </View>

            {instructions.map((instruction, index) => (
              <Instruction
                key={index}
                Icon={instruction.Icon}
                instruction={instruction.text}
              />
            ))}
          </View>

          <View style={styles.instructions_container}>
            <View style={styles.instructions_header}>
              <TouchableOpacity
                onPress={() => {
                  if (!slider) {
                    handleChangeSlider();
                  }
                }}
                style={{
                  ...getCurrentSliderStyle(slider),
                  ...styles.borderTopLeftRadius,
                }}>
                <Text
                  style={
                    slider
                      ? styles.btn_selected_txt
                      : styles.btn_no_selected_txt
                  }>
                  Embarque
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (slider) {
                    handleChangeSlider();
                  }
                }}
                style={{
                  ...getCurrentSliderStyle(!slider),
                  ...styles.borderTopRightRadius,
                }}>
                <Text
                  style={
                    slider
                      ? styles.btn_no_selected_txt
                      : styles.btn_selected_txt
                  }>
                  Desembarque
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.instructions_content}>
              <MapViewComponent slider={slider} />
              {slider ? (
                <View style={styles.boarding}>
                  <Text style={styles.airport}>
                    Aeroporto{' '}
                    {capitalize(
                      origin_aerodrome.name.split('/')[1] ? origin_aerodrome.name.split('/')[1] : origin_aerodrome.name,
                    )}
                  </Text>
                  <Text style={styles.address}>
                    <Text style={styles.bold}>Endereço: </Text>
                    {originAddress}
                  </Text>
                </View>
              ) : (
                <View style={styles.landing}>
                  <Text style={styles.airport}>
                    Aeroporto{' '}
                    {capitalize(
                      destination_aerodrome.name.split('/')[1] ? destination_aerodrome.name.split('/')[1] : destination_aerodrome.name,
                    )}
                  </Text>
                  <Text style={styles.address}>
                    <Text style={styles.bold}>Endereço: </Text>
                    {destinAddress}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <BottomSpace />
        </ScrollView>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  general_instructions: {
    marginTop: 10,
  },
  timer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '92%',
  },
  borderTopLeftRadius: {
    borderTopLeftRadius: 5,
  },
  borderTopRightRadius: {
    borderTopRightRadius: 5,
  },
  company: {
    fontSize: 16,
    marginBottom: 10,
  },
  ticket: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '92%',
  },
  ticket_txt: {
    marginLeft: 5,
  },
  timer_txt: {
    marginLeft: 5,
  },
  instructions_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  companyName: {fontWeight: 'bold', color: '#09354B'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    top: 10,
    marginBottom: 20,
  },
  airport: {
    fontSize: 18,
    color: '#09354B',
    marginTop: 10,
    fontWeight: 'bold',
  },
  address: {
    color: '#444',
    fontSize: 14,
  },
  company_txt: {
    fontSize: 16,
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#00B2A9',
  },
  backButton: {
    width: 40,
    height: 28,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  instructions_container: {
    marginTop: 20,
  },
  instructions_content: {},
  sliderBtnSelected: {
    backgroundColor: '#00B2A9',
    padding: 10,
    paddingBottom: 15,
    paddingTop: 15,
    width: '50%',
    alignItems: 'center',
  },
  sliderBtnNoSelected: {
    backgroundColor: '#e8f6fc',
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    width: '50%',
    alignItems: 'center',
  },
  btn_selected_txt: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btn_no_selected_txt: {
    color: '#09354B',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  map_view: {
    height: height * 0.5,
    width: '100%',
  },
  map: {
    position: 'relative',
  },
  openMapBtn: {
    position: 'absolute',
    right: 2,
    top: 2,
  },
  process_txt: {
    marginTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#09354B',
    marginTop: 50,
  },
});
