import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Inline from '../../components/Inline';
import Checkbox from '../../components/Checkbox';
import {cutText, maskPhone} from '../../utils';

export default function Passenger({passenger, checked = false, handleCheck}) {
  return (
    <TouchableOpacity
      onPress={handleCheck}
      style={
        checked
          ? {...styles.passenger, ...styles.passengerSelected}
          : styles.passenger
      }>
      <Inline
        justify="space-between"
        components={[
          {
            id: 1,
            component: (
              <View style={styles.passengerProper}>
                <Text style={styles.passengerName}>
                  {cutText(passenger.name, 26)} {!passenger.is_friend && "(EU)"}
                </Text>
                <Text style={styles.passengerPhone}>{maskPhone(passenger.phone_number)}</Text>
              </View>
            ),
          },
          {
            id: 2,
            component: (
              <View style={checked ? styles.checkActive : styles.check}>
                <Checkbox onPress={handleCheck} checked={checked} />
              </View>
            ),
          },
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  passenger: {
    borderBottomColor: '#d9d9d9',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 12,
    paddingTop: 12,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 5,
  },
  passengerSelected: {
    borderRadius: 5,
    borderColor: '#00B2A9',
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
  },
  checkActive: {
    padding: 5,
    backgroundColor: '#f1f1f1',
    borderRadius: 20000,
  },
  passengerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  passengerPhone: {
    fontSize: 16,
    color: '#00B2A9',
  },
});
