import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView,
} from 'react-native';
import {BottomOverlay, Inline} from '../../components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {currency} from '../../utils';

const ArrowIcon = () => (
  <MaterialIcons name="arrow-drop-down" size={30} color="#333" />
);

const {height} = Dimensions.get('screen');

// Regras aplicáveis
// A cada R$ 100,00 uma parcela
export default function Installments({subtotal, onSelect = () => {}}) {
  const [installments, setInstallments] = useState([]);
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(false);
  function handleVisible() {
    setVisible(!visible);
  }

  function calcInstallments(subtotal = 0, max = 8) {
    let installments = [];

    // verifa se o valor total é parcelável
    if (subtotal < 100) {
      installments.push({
        id: 1,
        value: subtotal,
        text: `À vista por R$ ${currency(subtotal)}`,
      });

      return installments;
    }

    max = subtotal < 800 ? Math.trunc(subtotal / 100) : max;

    for (let installment = 1; installment <= max; installment++) {
      let value = (subtotal / installment).toFixed(2);
      installments.push({
        id: installment,
        value,
        installment,
        text:
          installment === 1 ? (
            <Text style={styles.installmentText}>
              <Text style={styles.bold}>À vista por R$ </Text>
              {currency(value)}
            </Text>
          ) : (
            <Text style={styles.installmentText}>
              <Text style={styles.bold}>{installment}x de </Text>R${' '}
              {currency(value)} sem juros
            </Text>
          ),
      });
    }

    return installments;
  }

  useEffect(() => {
    const calculated = calcInstallments(subtotal, 8);
    setInstallments(calculated);
    setSelected(calculated[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSelect(installment) {
    handleVisible();
    setSelected(installment);
    onSelect(installment.installment);
  }

  return (
    <>
      <View style={styles.select}>
        <Inline
          justify="space-between"
          style={styles.cmpStyle}
          components={[
            {
              id: 1,
              component: (
                <>
                  {!!selected && (
                    <Text style={styles.installTxt}>{selected.text}</Text>
                  )}
                  <Text style={styles.subtotal}>Parcelas</Text>
                </>
              ),
            },
            {
              id: 2,
              component: (
                <TouchableOpacity
                  style={styles.changeBtn}
                  onPress={handleVisible}>
                  <Text style={styles.changeBtnTxt}>Alterar</Text>
                </TouchableOpacity>
              ),
            },
          ]}
        />
      </View>
      <BottomOverlay visible={visible} handleVisible={handleVisible}>
        <Text style={styles.title}>Parcelamento</Text>
        <View style={styles.installments}>
          <ScrollView>
            {installments.map((installment, index) => (
              <TouchableOpacity
                key={installment.id}
                style={
                  index === installments.length - 1
                    ? {...styles.installment, ...styles.noBorderBottom}
                    : styles.installment
                }
                onPress={() => {
                  handleSelect(installment);
                }}>
                <Text style={styles.installmentText}>{installment.text}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </BottomOverlay>
    </>
  );
}

const styles = StyleSheet.create({
  installments: {
    height: height * 0.25,
  },
  installment: {
    paddingBottom: 15,
    paddingTop: 15,
    marginBottom: 5,
    borderStyle: 'solid',
    borderColor: '#999',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  subtotal: {
    fontSize: 14,
    color: '#00B2A9',
    marginTop: 8,
  },
  installTxt: {
    fontSize: 16,
    color: '#444',
  },
  installmentText: {
    fontSize: 16,
    color: '#222',
  },
  noBorderBottom: {
    borderBottomWidth: 0,
  },
  title: {
    fontSize: 20,
    color: '#09354B',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  cmpStyle: {
    marginLeft: 0,
    marginRight: 0,
  },
  select: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 20,
  },
  changeBtn: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderColor: '#00B2A9',
    borderRadius: 5,
  },
  changeBtnTxt: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
});
