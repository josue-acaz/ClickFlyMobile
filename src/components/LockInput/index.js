import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Input} from '../../components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function LockInput({
  placeholder = '',
  error = false,
  errorTxt = 'Este campo é obrigatório',
  value,
  onChangeText,
  iconColor = '#09354B',
}) {
  const [showPassword, setShowPassword] = useState(false);
  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  const EyeOnIcon = () => (
    <MaterialCommunityIcons name="eye-outline" size={24} color={iconColor} />
  );
  const EyeOffIcon = () => (
    <MaterialCommunityIcons
      name="eye-off-outline"
      size={24}
      color={iconColor}
    />
  );

  return (
    <Input
      adorment={
        <TouchableOpacity style={styles.btn} onPress={handleShowPassword}>
          {showPassword ? <EyeOnIcon /> : <EyeOffIcon />}
        </TouchableOpacity>
      }
      secureTextEntry={!showPassword}
      adormentPosition="end"
      placeholder={placeholder}
      error={error}
      errorTxt={errorTxt}
      value={value}
      onChangeText={onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  btn: {
    marginTop: -4,
  },
});
