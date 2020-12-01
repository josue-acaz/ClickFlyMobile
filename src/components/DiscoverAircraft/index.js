import React, {useState, useEffect} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Inline} from '../../components';

const {width} = Dimensions.get('screen');

export default function DiscoverAircraft({
  images = [],
  handleDiscover = () => {},
  legend = '',
}) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    for (let index = 0; index < 3; index++) {
      const element = images[index];
      setRows((rows) => [...rows, element]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TouchableOpacity onPress={handleDiscover} style={styles.discoverComponent}>
      <Inline
        justify="space-between"
        components={rows.map((row, index) => {
          return {
            id: row.id,
            component: (
              <Image
                key={row.id}
                style={styles.thumb}
                source={{uri: row.url}}
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
