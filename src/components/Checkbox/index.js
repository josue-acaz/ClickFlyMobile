import React from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CheckedIcon = () => (
  <MaterialIcons name="check-box" size={24} color="#999999" />
);

const NoCheckedIcon = () => (
  <MaterialIcons name="check-box-outline-blank" size={24} color="#999999" />
);

const Checkbox = ({onPress, checked = false}) => (
  <TouchableOpacity onPress={onPress}>
    {checked ? <CheckedIcon /> : <NoCheckedIcon />}
  </TouchableOpacity>
);

export default Checkbox;
