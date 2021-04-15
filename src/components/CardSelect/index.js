import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import Checkbox from '../../components/Checkbox';
import BottomOverlay from '../../components/BottomOverlay';
import Inline from '../../components/Inline';
import Bootstrap from '../../components/Bootstrap';
import SlimButton from '../../components/SlimButton';
import CardItem from '../../components/CardItem';
import VerticalSpaceBetween from '../../components/VerticalSpaceBetween';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ArrowIcon = () => (
  <MaterialIcons name="arrow-drop-down" size={30} color="#333" />
);

const {height} = Dimensions.get('screen');
const {Row, Col} = Bootstrap;
export default function CardSelect({
  cards,
  cardSelected,
  handleCardSelect,
  onAddPayment,
  onChangeMethod,
  method = "credit",
}) {
  const [visible, setVisible] = useState(false);
  function handleVisible() {
    setVisible(!visible);
  }
  return (
    <>
      <TouchableOpacity style={styles.cardBtn} onPress={handleVisible}>
        <VerticalSpaceBetween
          align="flex-start"
          components={[
            {
              id: 1,
              component: (
                <Inline
                  justify="space-between"
                  cmpStyle={styles.cmpStyle}
                  components={[
                    {
                      id: 1,
                      component: (
                        <Text style={styles.cardTxt}>
                          Cartão de {method === 'credit' ? 'Crédito' : 'Débito'}
                        </Text>
                      ),
                    },
                    {
                      id: 2,
                      component: <ArrowIcon />,
                    },
                  ]}
                />
              ),
            },
            {
              id: 2,
              component: (
                <Text style={styles.cardFinal}>
                  FINAL{' '}
                  <Text style={styles.lastFourDigits}>
                    {cardSelected.card_number.split(' ')[1]}
                  </Text>
                </Text>
              ),
            },
          ]}
        />
      </TouchableOpacity>
      <BottomOverlay visible={visible} handleVisible={handleVisible}>
        <View style={styles.overlayCards}>
          <Row>
            <Col size="5">
              <Inline
                components={[
                  {
                    id: 1,
                    component: (
                      <Checkbox
                        checked={method === 'debit'}
                        onPress={onChangeMethod}
                      />
                    ),
                  },
                  {
                    id: 2,
                    component: (
                      <Text style={styles.methodtxt}>Pagar com Débito</Text>
                    ),
                  },
                ]}
              />
            </Col>
            <Col style={styles.colRight} size="5">
              <SlimButton
                text="Adicionar meio de pagamento"
                onPress={() => {
                  handleVisible();
                  onAddPayment();
                }}
              />
            </Col>
          </Row>

          <View style={styles.separator} />
          <View style={styles.cards}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {cards.map((card, index) => (
                <CardItem
                  key={index}
                  card={card}
                  onPress={() => {
                    handleVisible();
                    handleCardSelect(card);
                  }}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </BottomOverlay>
    </>
  );
}

const styles = StyleSheet.create({
  cardBtn: {
    height: '100%',
  },
  cardTxt: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  cmpStyle: {
    marginLeft: 0,
    marginRight: 0,
  },
  cardFinal: {
    color: '#00B2A9',
  },
  colRight: {
    alignItems: 'flex-end',
  },
  separator: {
    paddingBottom: 10,
    paddingTop: 10,
    borderBottomColor: '#999',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  cards: {
    height: height / 3,
  },
  lastFourDigits: {
    color: '#888',
    fontWeight: 'bold',
  },
  methodtxt: {
    fontSize: 16,
    color: '#333',
  },
});
