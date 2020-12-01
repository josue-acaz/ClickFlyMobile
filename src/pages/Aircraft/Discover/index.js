import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
} from 'react-native';
import {Screen, ArrowBack, SubsectionTitle} from '../../../components';

const {width, height} = Dimensions.get('screen');

export default function Discover({navigation, route}) {
  const {images} = route.params;
  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ArrowBack
          onPress={() => {
            navigation.goBack();
          }}
        />
        <SubsectionTitle text="Exterior" />
        <Text style={styles.txt}>{images.length} fotos disponíveis</Text>
        <View style={styles.exterior}>
          {images.map((image) => (
            <Image
              key={image.id}
              style={styles.thumb}
              source={{uri: image.url}}
            />
          ))}
        </View>
        <SubsectionTitle text="Interior" />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  exterior: {},
  thumb: {
    width: width * 0.95,
    height: height * 0.25,
    marginBottom: 15,
    borderRadius: 5,
  },
  txt: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
});
