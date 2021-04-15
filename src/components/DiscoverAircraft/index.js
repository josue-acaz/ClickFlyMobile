import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Inline from '../../components/Inline';

const {width} = Dimensions.get("screen");

export default function DiscoverAircraft({images, handleDiscover, legend}) {
  return (
    <TouchableOpacity onPress={handleDiscover} style={styles.discoverComponent}>
      <Inline
        justify="space-between"
        components={images.map((aircraft_image, index) => {
          return {
            id: aircraft_image.id,
            component: (
              <Image
                key={index}
                style={styles.thumb}
                source={{uri: aircraft_image.file.url}}
              />
            ),
          };
        })}
      />
      <Inline
        style={styles.footer}
        justify="space-between"
        components={[
          {
            id: 1,
            component: (
              <Text style={styles.txt}>
                {legend} • {images.length} fotos disponíveis
              </Text>
            ),
          },
          {
            id: 2,
            component: <Text style={styles.more}>VER MAIS</Text>,
          },
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  discoverComponent: {
    marginTop: 20,
    marginBottom: 20,
  },
  thumb: {
    width: width * 0.3,
    height: 85,
    borderRadius: 5,
  },
  footer: {
    marginTop: 10,
  },
  txt: {
    fontSize: 14,
    color: '#666',
  },
  more: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#00B2A9',
  },
});
