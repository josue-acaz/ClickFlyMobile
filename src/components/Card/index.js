import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Bootstrap} from '../../components';
import {findBrand} from '../../utils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

const {Row, Col} = Bootstrap;
const MoreVertIcon = () => (
  <MaterialIcons name="more-vert" size={24} color="#09354B" />
);
const MoreHorzIcon = () => (
  <MaterialIcons name="more-horiz" size={24} color="#09354B" />
);
const EditIcon = () => <Feather name="edit-3" size={24} color="#09354B" />;
const TrashIcon = () => <Feather name="trash-2" size={24} color="#09354B" />;

export default function Card({card, style}) {
  const {card_number, brand} = card;
  const flag = findBrand(brand).img;

  const [openActions, setOpenActions] = useState(false);
  const handleOpenActions = () => {
    setOpenActions(!openActions);
  };

  return (
    <View style={{...styles.card, ...style}}>
      <Row>
        {openActions && (
          <Col size="2">
            <View style={styles.actions}>
              <TouchableOpacity style={styles.editBtn}>
                <EditIcon />
              </TouchableOpacity>
              <TouchableOpacity style={styles.rmBtn}>
                <TrashIcon />
              </TouchableOpacity>
            </View>
          </Col>
        )}
        <Col size="6">
          <Text style={styles.title}>Cartão de Crédito</Text>
          <Text style={styles.card_number}>
            {brand.toUpperCase()} {card_number}
          </Text>
        </Col>
        <Col size={openActions ? '2' : '4'} style={styles.colRight}>
          <View style={styles.actions}>
            <Image style={styles.flag} source={flag} />
            <TouchableOpacity
              style={styles.moreBtn}
              onPress={handleOpenActions}>
              {openActions ? <MoreHorzIcon /> : <MoreVertIcon />}
            </TouchableOpacity>
          </View>
        </Col>
      </Row>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderTopColor: '#f1f1f1',
  },
  flag: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    color: '#333',
  },
  card_number: {
    fontSize: 16,
    color: '#666',
  },
  colRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreBtn: {
    marginLeft: 10,
  },
  rmBtn: {
    marginLeft: 10,
  },
});
