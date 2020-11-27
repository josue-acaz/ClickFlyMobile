import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Bootstrap, Checkbox} from '../../components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {cutText} from '../../utils';

const {Row, Col} = Bootstrap;

const ArrowIcon = () => (
  <MaterialIcons name="arrow-forward" size={24} color="#00B2A9" />
);

export default function Friend({
  friend,
  checked,
  handleChecked,
  activeSelection = false,
}) {
  return (
    <View
      style={checked ? {...styles.friend, ...styles.selected} : styles.friend}>
      <Row>
        <Col size="1">
          <Checkbox
            onPress={() => {
              handleChecked(friend.id);
            }}
            checked={checked}
          />
        </Col>
        <Col size="7">
          <Text style={styles.friendName}>{cutText(friend.name, 30)}</Text>
          <Text style={styles.friendPhone}>{friend.phone}</Text>
        </Col>
        {!activeSelection && (
          <Col size="2" style={styles.colEnd}>
            <TouchableOpacity>
              <ArrowIcon />
            </TouchableOpacity>
          </Col>
        )}
      </Row>
    </View>
  );
}

const styles = StyleSheet.create({
  friend: {
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomColor: '#d9d9d9',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  /*borderTopWidth: 1,
    borderTopColor: '#d9d9d9',*/
  selected: {
    backgroundColor: '#fafafa',
  },
  colEnd: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  friendName: {
    fontSize: 16,
    color: '#444444',
  },
  friendPhone: {
    fontSize: 16,
    color: '#00B2A9',
  },
});
