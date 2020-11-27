import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Input} from '../../components';
import RNPickerSelect from 'react-native-picker-select';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const DropdownIcon = () => (
  <MaterialIcons
    style={styles.icon}
    name="arrow-drop-down"
    size={26}
    color="#666"
  />
);

export default function PickerInput({
  value,
  placeholder,
  onChangeText,
  onChangePicker = () => {},
  picked,
  items = [],
  error,
}) {
  return (
    <View style={styles.pickerInput}>
      <Input
        value={value}
        error={error}
        style={styles.input}
        adorment={
          <RNPickerSelect
            Icon={DropdownIcon}
            style={styles.select}
            placeholder={{
              label: 'Selecione...',
            }}
            value={picked}
            textInputProps={{
              style: styles.pickerTxt,
            }}
            items={items}
            onValueChange={onChangePicker}
          />
        }
        styleAdorment={styles.select}
        adormentPosition="start"
        placeholder={placeholder}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pickerInput: {},
  pickerTxt: {
    color: '#444',
    fontSize: 16,
  },
  input: {
    paddingLeft: 74,
  },
  icon: {
    left: 10,
    top: -4,
  },
  select: {
    width: 50,
  },
});
