import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Bootstrap from '../../components/Bootstrap';
import Checkbox from '../../components/Checkbox';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const {Row, Col} = Bootstrap;

const ArrowIcon = () => (
  <MaterialIcons name="arrow-forward" size={24} color="#00B2A9" />
);

export default function ListItem({
  id,
  children,
  checked,
  handleChecked,
  handleEdit,
  activeSelection = false,
}) {
  return (
    <View
      style={checked ? {...styles.listItem, ...styles.selected} : styles.listItem}>
      <Row>
        <Col size="1">
          <Checkbox
            onPress={() => {
              handleChecked(id);
            }}
            checked={checked}
          />
        </Col>
        <Col size="7">
          {children}
        </Col>
        {!activeSelection && (
          <Col size="2" style={styles.colEnd}>
            <TouchableOpacity onPress={() => handleEdit(id)}>
              <ArrowIcon />
            </TouchableOpacity>
          </Col>
        )}
      </Row>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomColor: '#d9d9d9',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  selected: {
    backgroundColor: '#fafafa',
  },
  colEnd: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  listItemName: {
    fontSize: 16,
    color: '#444444',
  },
  listItemPhone: {
    fontSize: 16,
    color: '#00B2A9',
  },
});
