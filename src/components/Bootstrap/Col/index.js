import React from 'react';
import {View} from 'react-native';

//size = 2, 4, 6, 8, 10
const Col = ({children, size, style}) => (
  <View style={{width: `${size}0%`, ...style}}>{children}</View>
);

export default Col;
